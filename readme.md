# 溢得承 - QQ Bot Web 控制台

这是溢得承智能系统的Web控制台，基于Next.js构建，融合自主能力与智能问答功能，可以部署到Render.com上运行。

## 溢得承核心功能

- **品牌特色**：溢得承智能交互系统，提供人性化对话体验
- **双模式切换**：支持自主能力模式和溢得承智能问答模式

- **双模式切换**：支持自主能力模式和溢得承模式
- **实时消息处理**：可以与机器人进行实时交互
- **现代化UI**：使用Tailwind CSS构建的响应式界面
- **状态管理**：使用Redux管理应用状态
- **API支持**：提供完整的API接口
- **Render.com部署**：配置完全适配Render.com平台

## 技术栈

- **前端框架**：Next.js 14
- **状态管理**：Redux Toolkit
- **UI框架**：Tailwind CSS（通过CDN引入）
- **编程语言**：TypeScript
- **HTTP客户端**：Axios

## 部署指南

### 在Render.com上部署

1. **准备工作**
   - 确保您拥有Render.com账号
   - 将代码推送到GitHub或GitLab仓库

2. **创建Web服务**
   - 在Render.com控制台点击"New" -> "Web Service"
   - 连接您的代码仓库
   - 配置构建命令和启动命令：
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run start`
   - 设置环境变量（如有需要）
   - 选择实例类型（可选择免费实例）

3. **部署完成**
   - 等待构建和部署完成
   - 访问分配的URL即可使用应用

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── bot.ts   # API路由
│   │   ├── _app.tsx     # 应用入口
│   │   ├── _document.tsx # 自定义文档结构
│   │   └── index.tsx    # 首页组件
│   ├── services/
│   │   └── botService.ts # 机器人服务逻辑
│   ├── store/
│   │   ├── index.ts     # Redux存储配置
│   │   └── botSlice.ts  # 机器人状态管理
│   └── styles/
│       └── globals.css  # 全局样式
├── .gitignore           # Git忽略文件
├── next.config.js       # Next.js配置
├── package.json         # 项目配置和依赖
└── tsconfig.json        # TypeScript配置
```

## 环境变量

本项目可以通过以下环境变量进行配置（创建.env文件）：

```
# 可选的环境变量示例
NODE_ENV=production
# QQ_BOT_TOKEN=your_token_here
```

## 联系我们

- 邮箱：a123580910@qq.com

## 注意事项

- 本项目当前使用的是模拟数据，在实际部署时需要替换为真实的API调用
- 项目已经配置为支持Render.com的独立模式（output: 'standalone'）
- 如有问题，请查看Render.com的日志以获取详细错误信息

## License

MIT