# 部署指南

本文档提供了将博客部署到 Vercel 和阿里云的详细步骤。

## 📦 部署前准备

### 环境要求
- Node.js >= 20.9.0
- npm 或 pnpm
- Git

### 构建测试
在部署前，建议先在本地测试生产构建：

```bash
# 1. 安装依赖
npm install

# 2. 运行测试
npm test

# 3. 生产构建
npm run build

# 4. 启动生产服务器
npm start
```

访问 http://localhost:3000 确认一切正常。

## 🚀 Vercel 部署

### 方式一：通过 Vercel Dashboard（推荐）

1. **登录 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 GitHub 仓库：`AnxForever/Anxforever-blog`
   - 点击 "Import"

3. **配置项目**
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `./`（默认）
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `.next`（默认）
   - **Install Command**: `npm install`（默认）

4. **环境变量**（可选）
   - 如果需要环境变量，在 "Environment Variables" 部分添加
   - 本项目目前不需要额外的环境变量

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成（通常 2-3 分钟）
   - 部署成功后会获得一个 `.vercel.app` 域名

6. **自定义域名**（可选）
   - 在项目设置中点击 "Domains"
   - 添加你的自定义域名
   - 按照提示配置 DNS 记录

### 方式二：通过 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 生产部署
vercel --prod
```

### 自动部署

Vercel 会自动监听 GitHub 仓库的变化：
- **Push to main**: 自动部署到生产环境
- **Pull Request**: 自动创建预览部署
- **其他分支**: 自动创建预览部署

## ☁️ 阿里云部署

### 方式一：使用 Docker（推荐）

#### 1. 创建 Dockerfile

在项目根目录创建 `Dockerfile`：

```dockerfile
# 使用官方 Node.js 镜像
FROM node:20-alpine AS base

# 安装依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制 package 文件
COPY package.json package-lock.json* ./
RUN npm ci

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 禁用遥测
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### 2. 创建 .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
.env*.local
```

#### 3. 更新 next.config.mjs

添加 standalone 输出配置：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // ... 其他配置
}

export default nextConfig
```

#### 4. 构建和部署

```bash
# 构建 Docker 镜像
docker build -t anxforever-blog .

# 运行容器
docker run -p 3000:3000 anxforever-blog

# 推送到阿里云容器镜像服务
docker tag anxforever-blog registry.cn-hangzhou.aliyuncs.com/your-namespace/anxforever-blog:latest
docker push registry.cn-hangzhou.aliyuncs.com/your-namespace/anxforever-blog:latest
```

### 方式二：直接部署到 ECS

#### 1. 连接到 ECS 实例

```bash
ssh root@your-server-ip
```

#### 2. 安装 Node.js

```bash
# 使用 nvm 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

#### 3. 克隆项目

```bash
cd /var/www
git clone https://github.com/AnxForever/Anxforever-blog.git
cd Anxforever-blog
```

#### 4. 安装依赖和构建

```bash
npm install
npm run build
```

#### 5. 使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "anxforever-blog" -- start

# 设置开机自启
pm2 startup
pm2 save

# 查看日志
pm2 logs anxforever-blog

# 重启应用
pm2 restart anxforever-blog
```

#### 6. 配置 Nginx 反向代理

创建 Nginx 配置文件 `/etc/nginx/sites-available/anxforever-blog`：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用配置：

```bash
ln -s /etc/nginx/sites-available/anxforever-blog /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

#### 7. 配置 SSL（可选）

```bash
# 安装 Certbot
apt-get install certbot python3-certbot-nginx

# 获取 SSL 证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

### 自动部署脚本

创建 `deploy.sh` 脚本：

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# 拉取最新代码
git pull origin main

# 安装依赖
npm install

# 构建项目
npm run build

# 重启 PM2 进程
pm2 restart anxforever-blog

echo "✅ Deployment completed!"
```

使用方式：

```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔧 环境变量配置

如果需要环境变量，创建 `.env.local` 文件：

```bash
# 示例环境变量
# NEXT_PUBLIC_API_URL=https://api.example.com
# DATABASE_URL=postgresql://...
```

**注意**：
- `.env.local` 不应提交到 Git
- Vercel 中在项目设置中配置环境变量
- 阿里云 ECS 中直接在服务器上创建 `.env.local` 文件

## 📊 性能监控

### Vercel Analytics

1. 在 Vercel Dashboard 中启用 Analytics
2. 在项目中安装 `@vercel/analytics`：

```bash
npm install @vercel/analytics
```

3. 在 `app/layout.tsx` 中添加：

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 自定义监控

可以使用以下工具监控性能：
- **Lighthouse CI**: 持续性能测试
- **Web Vitals**: 实时 Core Web Vitals 监控
- **Sentry**: 错误追踪
- **Google Analytics**: 用户行为分析

## 🔄 CI/CD 配置

### GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🐛 故障排查

### 构建失败

1. **检查 Node.js 版本**
   ```bash
   node --version  # 应该 >= 20.9.0
   ```

2. **清理缓存**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

3. **检查依赖**
   ```bash
   npm audit
   npm update
   ```

### 运行时错误

1. **查看日志**
   - Vercel: 在 Dashboard 的 "Deployments" 页面查看日志
   - 阿里云: `pm2 logs anxforever-blog`

2. **检查环境变量**
   - 确保所有必需的环境变量都已配置

3. **内存问题**
   - Vercel: 升级到 Pro 计划获得更多内存
   - 阿里云: 增加 ECS 实例内存或优化代码

## 📝 部署检查清单

部署前确认：

- [ ] 所有测试通过 (`npm test`)
- [ ] 生产构建成功 (`npm run build`)
- [ ] 本地生产环境测试通过 (`npm start`)
- [ ] 环境变量已配置
- [ ] 域名 DNS 已配置（如使用自定义域名）
- [ ] SSL 证书已配置（如使用 HTTPS）
- [ ] 性能监控已设置
- [ ] 错误追踪已配置

## 🎉 部署成功

部署成功后，你的博客将在以下地址可访问：

- **Vercel**: `https://your-project.vercel.app`
- **自定义域名**: `https://your-domain.com`
- **阿里云**: `http://your-server-ip:3000` 或通过 Nginx 配置的域名

享受你的高性能博客吧！🚀

---

**需要帮助？**
- Vercel 文档: https://vercel.com/docs
- Next.js 部署文档: https://nextjs.org/docs/deployment
- 阿里云文档: https://help.aliyun.com/

**问题反馈**
- GitHub Issues: https://github.com/AnxForever/Anxforever-blog/issues
- Email: anxforever@qq.com
