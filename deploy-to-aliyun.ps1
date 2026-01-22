# 阿里云 ECS 自动部署脚本 (PowerShell 版本)
# 使用方法: .\deploy-to-aliyun.ps1

# 配置变量（请根据你的实际情况修改）
$SERVER_USER = "root"  # 你的服务器用户名
$SERVER_IP = "your-server-ip"  # 你的服务器 IP
$PROJECT_PATH = "/var/www/Anxforever-blog"  # 服务器上的项目路径
$PM2_APP_NAME = "anxforever-blog"  # PM2 应用名称

Write-Host "========================================" -ForegroundColor Green
Write-Host "  AnxForever Blog - 阿里云部署脚本" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# 检查是否已配置服务器信息
if ($SERVER_IP -eq "your-server-ip") {
    Write-Host "❌ 错误: 请先编辑脚本，配置你的服务器信息！" -ForegroundColor Red
    Write-Host ""
    Write-Host "需要修改的变量："
    Write-Host "  - `$SERVER_USER: 服务器用户名（默认 root）"
    Write-Host "  - `$SERVER_IP: 服务器 IP 地址"
    Write-Host "  - `$PROJECT_PATH: 项目在服务器上的路径"
    Write-Host "  - `$PM2_APP_NAME: PM2 应用名称"
    Write-Host ""
    exit 1
}

Write-Host "📋 部署配置:" -ForegroundColor Yellow
Write-Host "  服务器: $SERVER_USER@$SERVER_IP"
Write-Host "  项目路径: $PROJECT_PATH"
Write-Host "  PM2 应用: $PM2_APP_NAME"
Write-Host ""

# 确认部署
$confirmation = Read-Host "确认开始部署? (y/n)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "⚠️  部署已取消" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🚀 开始部署..." -ForegroundColor Green
Write-Host ""

# 步骤 1: 拉取最新代码
Write-Host "📥 步骤 1/5: 拉取最新代码..." -ForegroundColor Yellow
$cmd1 = @"
cd $PROJECT_PATH && git pull origin main
"@
ssh "$SERVER_USER@$SERVER_IP" $cmd1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 代码拉取成功" -ForegroundColor Green
} else {
    Write-Host "❌ 代码拉取失败" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 步骤 2: 安装依赖
Write-Host "📦 步骤 2/5: 安装依赖..." -ForegroundColor Yellow
$cmd2 = @"
cd $PROJECT_PATH && npm install --production=false
"@
ssh "$SERVER_USER@$SERVER_IP" $cmd2

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 依赖安装成功" -ForegroundColor Green
} else {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 步骤 3: 构建项目
Write-Host "🔨 步骤 3/5: 构建项目..." -ForegroundColor Yellow
$cmd3 = @"
cd $PROJECT_PATH && npm run build
"@
ssh "$SERVER_USER@$SERVER_IP" $cmd3

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 项目构建成功" -ForegroundColor Green
} else {
    Write-Host "❌ 项目构建失败" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 步骤 4: 重启 PM2 应用
Write-Host "🔄 步骤 4/5: 重启应用..." -ForegroundColor Yellow
$cmd4 = @"
cd $PROJECT_PATH && if pm2 list | grep -q '$PM2_APP_NAME'; then pm2 restart $PM2_APP_NAME; else pm2 start npm --name '$PM2_APP_NAME' -- start && pm2 save; fi
"@
ssh "$SERVER_USER@$SERVER_IP" $cmd4

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 应用重启成功" -ForegroundColor Green
} else {
    Write-Host "❌ 应用重启失败" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 步骤 5: 检查应用状态
Write-Host "🔍 步骤 5/5: 检查应用状态..." -ForegroundColor Yellow
$cmd5 = @"
pm2 list && pm2 logs $PM2_APP_NAME --lines 10 --nostream
"@
ssh "$SERVER_USER@$SERVER_IP" $cmd5

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ 部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 后续操作:" -ForegroundColor Yellow
Write-Host "  1. 访问你的网站检查是否正常"
Write-Host "  2. 查看实时日志: ssh $SERVER_USER@$SERVER_IP 'pm2 logs $PM2_APP_NAME'"
Write-Host "  3. 查看应用状态: ssh $SERVER_USER@$SERVER_IP 'pm2 status'"
Write-Host ""
Write-Host "🎉 祝你使用愉快！" -ForegroundColor Green
