# 阿里云手动部署指南

这是一个简单的手动部署步骤指南，你只需要复制粘贴命令即可。

## 前提条件

- 你已经在阿里云 ECS 上安装了 Node.js (>= 20)
- 你已经在服务器上克隆了项目
- 你已经安装了 PM2

## 快速部署（5 步完成）

### 1️⃣ 连接到服务器

```bash
ssh root@your-server-ip
```

替换 `your-server-ip` 为你的实际服务器 IP。

---

### 2️⃣ 进入项目目录

```bash
cd /var/www/Anxforever-blog
```

如果项目在其他位置，请修改路径。

---

### 3️⃣ 拉取最新代码

```bash
git pull origin main
```

你应该看到类似这样的输出：
```
From github.com:AnxForever/Anxforever-blog
 * branch            main       -> FETCH_HEAD
Updating c229812..bcacad8
Fast-forward
 56 files changed, 43785 insertions(+), 331 deletions(-)
```

---

### 4️⃣ 安装依赖并构建

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

构建过程大约需要 1-2 分钟。你应该看到：
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (33/33)
✓ Finalizing page optimization
```

---

### 5️⃣ 重启应用

**如果是第一次部署：**

```bash
# 启动应用
pm2 start npm --name "anxforever-blog" -- start

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup
```

**如果已经部署过：**

```bash
# 重启应用
pm2 restart anxforever-blog
```

---

### ✅ 验证部署

检查应用状态：

```bash
pm2 status
```

你应该看到：
```
┌─────┬──────────────────┬─────────┬─────────┬──────────┐
│ id  │ name             │ status  │ restart │ uptime   │
├─────┼──────────────────┼─────────┼─────────┼──────────┤
│ 0   │ anxforever-blog  │ online  │ 0       │ 2s       │
└─────┴──────────────────┴─────────┴─────────┴──────────┘
```

查看日志：

```bash
pm2 logs anxforever-blog --lines 20
```

你应该看到：
```
▲ Next.js 16.1.1
- Local:        http://localhost:3000
✓ Ready in 1.2s
```

---

## 🌐 访问网站

如果你配置了 Nginx 反向代理，访问你的域名：
```
https://your-domain.com
```

如果没有配置 Nginx，直接访问：
```
http://your-server-ip:3000
```

---

## 🔧 常用命令

### PM2 管理

```bash
# 查看应用状态
pm2 status

# 查看实时日志
pm2 logs anxforever-blog

# 重启应用
pm2 restart anxforever-blog

# 停止应用
pm2 stop anxforever-blog

# 删除应用
pm2 delete anxforever-blog
```

### 查看应用信息

```bash
# 查看详细信息
pm2 show anxforever-blog

# 查看监控
pm2 monit
```

---

## 🐛 故障排查

### 问题 1: 构建失败

**错误信息**: `npm ERR! code ELIFECYCLE`

**解决方案**:
```bash
# 清理缓存
rm -rf .next node_modules
npm install
npm run build
```

### 问题 2: PM2 应用无法启动

**错误信息**: `Error: listen EADDRINUSE: address already in use :::3000`

**解决方案**:
```bash
# 查找占用 3000 端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 重启应用
pm2 restart anxforever-blog
```

### 问题 3: 内存不足

**错误信息**: `JavaScript heap out of memory`

**解决方案**:
```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

或者在 PM2 中配置：
```bash
pm2 delete anxforever-blog
pm2 start npm --name "anxforever-blog" --node-args="--max-old-space-size=4096" -- start
pm2 save
```

---

## 📊 性能验证

部署完成后，验证性能优化是否生效：

### 1. 检查 Bundle 大小

在浏览器开发者工具中：
1. 打开 Network 面板
2. 访问 `/blog` 页面
3. 查看 JavaScript 文件大小

你应该看到：
- 初始 JS bundle < 15 KB
- framer-motion 在单独的 chunk 中（按需加载）

### 2. 测试 Core Web Vitals

使用 Google PageSpeed Insights：
```
https://pagespeed.web.dev/
```

输入你的网站 URL，应该看到：
- FCP < 1s
- LCP < 2.5s (桌面) / < 4s (移动)
- Performance Score > 90

---

## 🔄 后续更新

每次有新的代码更新时，只需要重复这 5 步：

```bash
# 1. 连接服务器
ssh root@your-server-ip

# 2. 进入项目目录
cd /var/www/Anxforever-blog

# 3. 拉取代码
git pull origin main

# 4. 安装依赖并构建
npm install && npm run build

# 5. 重启应用
pm2 restart anxforever-blog
```

或者使用我们提供的自动化脚本：
```bash
# Linux/Mac
./deploy-to-aliyun.sh

# Windows PowerShell
.\deploy-to-aliyun.ps1
```

---

## 📞 需要帮助？

如果遇到问题：

1. **查看日志**: `pm2 logs anxforever-blog`
2. **检查状态**: `pm2 status`
3. **重启应用**: `pm2 restart anxforever-blog`
4. **查看文档**: `DEPLOYMENT.md`

---

## 🎉 完成！

恭喜！你的博客已经成功部署到阿里云。

现在你可以：
- ✅ 访问你的网站
- ✅ 享受 94% 的性能提升
- ✅ 体验超快的加载速度

祝你使用愉快！🚀
