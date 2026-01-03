# 贡献指南

感谢你对 **Anx Forever Blog** 项目的关注！欢迎任何形式的贡献。

## 如何贡献

### 报告 Bug

如果你发现了 bug，请创建一个 [Issue](https://github.com/AnxForever/v0-avant-garde-programmer-blog/issues)，并包含：

- 问题的详细描述
- 复现步骤
- 期望的行为
- 实际的行为
- 截图（如果适用）
- 浏览器和操作系统信息

### 功能建议

欢迎提出新功能建议！请在 Issue 中描述：

- 你想要的功能
- 为什么这个功能有用
- 可能的实现方式（可选）

### 提交代码

1. **Fork 仓库**

   点击右上角的 Fork 按钮

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/你的用户名/v0-avant-garde-programmer-blog.git
   cd v0-avant-garde-programmer-blog
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/你的功能名称
   # 或
   git checkout -b fix/你要修复的问题
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **开发**
   ```bash
   npm run dev
   ```

6. **确保代码质量**
   ```bash
   # 运行 lint 检查
   npm run lint

   # 运行测试
   npm test

   # 构建测试
   npm run build
   ```

7. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加某功能"
   # 或
   git commit -m "fix: 修复某问题"
   ```

8. **推送并创建 PR**
   ```bash
   git push origin feature/你的功能名称
   ```

   然后在 GitHub 上创建 Pull Request

## 提交信息规范

请使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具相关 |

示例：
```
feat: 添加深色模式支持
fix: 修复移动端菜单无法关闭的问题
docs: 更新 README 安装说明
```

## 代码风格

- 使用 TypeScript
- 遵循 ESLint 配置
- 使用 Tailwind CSS 进行样式编写
- 组件使用函数式组件 + Hooks
- 保持 Neo-Brutalist 设计风格

## 项目结构

```
├── app/                 # 页面路由
├── components/          # React 组件
│   ├── experiments/    # 实验性组件
│   └── ui/             # UI 基础组件
├── lib/                # 工具函数
└── public/             # 静态资源
```

## 需要帮助？

如果有任何问题，可以：

- 创建 [Issue](https://github.com/AnxForever/v0-avant-garde-programmer-blog/issues)
- 发送邮件至 anxforever@qq.com

再次感谢你的贡献！
