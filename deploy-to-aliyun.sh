#!/bin/bash

# 阿里云 ECS 自动部署脚本
# 使用方法: ./deploy-to-aliyun.sh

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  AnxForever Blog - 阿里云部署脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 配置变量（请根据你的实际情况修改）
SERVER_USER="root"  # 你的服务器用户名
SERVER_IP="your-server-ip"  # 你的服务器 IP
PROJECT_PATH="/var/www/Anxforever-blog"  # 服务器上的项目路径
PM2_APP_NAME="anxforever-blog"  # PM2 应用名称

# 检查是否已配置服务器信息
if [ "$SERVER_IP" = "your-server-ip" ]; then
    echo -e "${RED}❌ 错误: 请先编辑脚本，配置你的服务器信息！${NC}"
    echo ""
    echo "需要修改的变量："
    echo "  - SERVER_USER: 服务器用户名（默认 root）"
    echo "  - SERVER_IP: 服务器 IP 地址"
    echo "  - PROJECT_PATH: 项目在服务器上的路径"
    echo "  - PM2_APP_NAME: PM2 应用名称"
    echo ""
    exit 1
fi

echo -e "${YELLOW}📋 部署配置:${NC}"
echo "  服务器: $SERVER_USER@$SERVER_IP"
echo "  项目路径: $PROJECT_PATH"
echo "  PM2 应用: $PM2_APP_NAME"
echo ""

# 确认部署
read -p "确认开始部署? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  部署已取消${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}🚀 开始部署...${NC}"
echo ""

# 步骤 1: 连接服务器并拉取最新代码
echo -e "${YELLOW}📥 步骤 1/5: 拉取最新代码...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/Anxforever-blog || exit 1
echo "当前目录: $(pwd)"
echo "拉取最新代码..."
git pull origin main
echo "✅ 代码拉取完成"
ENDSSH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 代码拉取成功${NC}"
else
    echo -e "${RED}❌ 代码拉取失败${NC}"
    exit 1
fi

echo ""

# 步骤 2: 安装依赖
echo -e "${YELLOW}📦 步骤 2/5: 安装依赖...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/Anxforever-blog || exit 1
echo "安装 npm 依赖..."
npm install --production=false
echo "✅ 依赖安装完成"
ENDSSH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 依赖安装成功${NC}"
else
    echo -e "${RED}❌ 依赖安装失败${NC}"
    exit 1
fi

echo ""

# 步骤 3: 构建项目
echo -e "${YELLOW}🔨 步骤 3/5: 构建项目...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/Anxforever-blog || exit 1
echo "开始构建..."
npm run build
echo "✅ 构建完成"
ENDSSH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 项目构建成功${NC}"
else
    echo -e "${RED}❌ 项目构建失败${NC}"
    exit 1
fi

echo ""

# 步骤 4: 重启 PM2 应用
echo -e "${YELLOW}🔄 步骤 4/5: 重启应用...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
cd /var/www/Anxforever-blog || exit 1

# 检查 PM2 应用是否存在
if pm2 list | grep -q "anxforever-blog"; then
    echo "重启现有应用..."
    pm2 restart anxforever-blog
else
    echo "首次启动应用..."
    pm2 start npm --name "anxforever-blog" -- start
    pm2 save
fi

echo "✅ 应用重启完成"
ENDSSH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 应用重启成功${NC}"
else
    echo -e "${RED}❌ 应用重启失败${NC}"
    exit 1
fi

echo ""

# 步骤 5: 检查应用状态
echo -e "${YELLOW}🔍 步骤 5/5: 检查应用状态...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
echo "PM2 应用状态:"
pm2 list
echo ""
echo "应用日志 (最后 10 行):"
pm2 logs anxforever-blog --lines 10 --nostream
ENDSSH

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ 部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}📊 后续操作:${NC}"
echo "  1. 访问你的网站检查是否正常"
echo "  2. 查看实时日志: ssh $SERVER_USER@$SERVER_IP 'pm2 logs anxforever-blog'"
echo "  3. 查看应用状态: ssh $SERVER_USER@$SERVER_IP 'pm2 status'"
echo ""
echo -e "${GREEN}🎉 祝你使用愉快！${NC}"
