# 溢得承 - QQ机器人详细启动验证教程

本教程提供了完整的QQ机器人启动验证步骤，帮助您确保机器人能够正常运行并解决可能遇到的问题。

## 前提条件检查

在开始之前，请确认您已完成以下准备工作：

1. **安装Node.js**
   - 版本要求：12.16.x（与Heroku配置匹配）
   - 验证方法：打开命令提示符(CMD)或PowerShell，执行
     ```powershell
     node -v
     ```
   - 如果显示版本号（如`v12.16.3`），则表示安装成功

2. **安装npm**
   - 通常与Node.js一起安装
   - 验证方法：
     ```powershell
     npm -v
     ```
   - 如果显示版本号，则表示安装成功

3. **获取QQ开放平台配置**
   - 您需要在QQ开放平台注册应用并获取以下信息：
     - AppID
     - Token
     - AppSecret

## 详细启动步骤

### 1. 准备项目环境

#### 1.1 检查项目文件完整性
确保项目包含以下关键文件：
- `package.json` - 项目配置文件
- `package-lock.json` - 依赖锁文件（已创建）
- `index.js` - 主入口文件
- `config.js` - 配置文件

#### 1.2 配置机器人参数

打开`config.js`文件，修改以下核心配置：

```javascript
// 服务器配置
server: {
  port: 8080, // 监听端口
  token: '您的token', // 替换为您的QQ开放平台Token
  appId: '您的appId', // 替换为您的QQ开放平台AppID
  appSecret: '您的appSecret' // 替换为您的QQ开放平台AppSecret
},
```

同时检查`index.js`文件中的配置是否与`config.js`一致：

```javascript
// 机器人配置
const config = {
  appID: '您的appId',
  token: '您的token',
  appSecret: '您的appSecret',
  port: 3000 // 注意：这里的端口应与config.js中的port保持一致
};
```

### 2. 安装依赖

在项目目录下执行以下命令安装依赖：

```powershell
cd c:\Users\ASUS\Desktop\qq bot
npm install
```

如果遇到权限问题，可以尝试以管理员身份运行命令提示符或PowerShell。

### 3. 本地测试运行

#### 3.1 直接启动（开发模式）

```powershell
npm start
```

启动成功后，您将看到类似以下输出：

```
[溢得承] QQ机器人服务器启动成功，监听端口: 3000
请将回调地址设置为: http://your-server-ip:3000
注意：在正式环境中，请配置HTTPS和域名解析
```

#### 3.2 使用PM2管理（生产模式）

如果您需要在生产环境中运行机器人，推荐使用PM2进行进程管理：

```powershell
# 全局安装PM2
npm install pm2 -g

# 使用PM2启动机器人
pm run pm2:start

# 查看PM2进程状态
npm run pm2:list

# 查看机器人日志
npm run pm2:logs
```

### 4. 验证机器人运行状态

机器人启动后，您需要验证以下几个方面：

#### 4.1 服务可访问性验证

打开浏览器，访问以下地址：
```
http://localhost:3000 （根据您配置的端口调整）
```

如果页面显示`Invalid signature`，说明服务器已经正常启动，正在等待有效的签名请求。

#### 4.2 回调地址配置

登录QQ开放平台，在您的应用设置中将回调地址设置为：
```
http://您的服务器IP:3000 （生产环境）
```

**本地测试注意事项**：
- 如果是在本地测试，您需要使用内网穿透工具（如ngrok）获取公网可访问的地址
- ngrok使用示例：
  ```powershell
  ngrok http 3000
  ```
  然后将生成的公网地址配置到QQ开放平台

#### 4.3 功能测试

1. **关键词回复测试**
   - 在频道中发送包含关键词的消息（如"你好"、"帮助"）
   - 验证机器人是否能正确回复

2. **自动欢迎测试**
   - 邀请新成员加入频道
   - 验证机器人是否发送欢迎消息

3. **定时消息测试**
   - 等待设定的定时消息发送时间
   - 验证机器人是否按时发送消息

## 常见问题解决

### 1. Node.js或npm命令未找到

**问题表现**：执行`node -v`或`npm -v`时提示"无法识别为cmdlet、函数、脚本文件或可运行程序的名称"

**解决方法**：
- 检查Node.js是否正确安装
- 确认Node.js安装路径已添加到系统环境变量PATH中
- 重启命令提示符或PowerShell后再次尝试

### 2. 端口占用

**问题表现**：启动时提示"Error: listen EADDRINUSE: address already in use :::3000"

**解决方法**：
- 修改`index.js`和`config.js`中的端口号为其他未使用的端口
- 关闭占用相同端口的其他程序

### 3. 签名验证失败

**问题表现**：日志中显示"Invalid signature"

**解决方法**：
- 确保`config.js`和`index.js`中的appID、token和appSecret配置正确
- 检查QQ开放平台的回调地址配置是否与实际地址一致
- 验证请求参数是否被正确传递

### 4. 机器人不响应消息

**问题表现**：发送消息后机器人没有回复

**解决方法**：
- 检查QQ开放平台的权限配置，确保机器人有发送消息的权限
- 查看机器人日志是否有错误信息
- 确认回调地址配置正确且可访问

### 5. 依赖安装失败

**问题表现**：执行`npm install`时出现错误

**解决方法**：
- 检查网络连接是否正常
- 尝试使用管理员权限运行命令
- 清理npm缓存：`npm cache clean --force`，然后重新安装

## 日志检查与问题排查

机器人运行过程中会生成详细的日志，这些日志对于排查问题非常重要：

```powershell
# 查看机器人控制台输出
npm run pm2:logs

# 查看日志文件
cd logs
ls
```

通过分析日志，您可以了解：
- 签名验证过程
- 消息接收和处理情况
- 错误发生的具体位置和原因

## 部署到Heroku

如果您想将机器人部署到Heroku，请确保：

1. **package-lock.json文件已创建**（本教程已完成此步骤）
2. **Procfile文件配置正确**（如果需要）
3. **Heroku环境变量设置**：在Heroku应用设置中配置以下环境变量
   - NODE_ENV=production
   - PORT=（使用Heroku分配的端口）
   - QQ_BOT_APPID=您的appId
   - QQ_BOT_TOKEN=您的token
   - QQ_BOT_APPSECRET=您的appSecret

部署命令：
```powershell
# 安装Heroku CLI
npm install -g heroku

# 登录Heroku
heroku login

# 创建或关联Heroku应用
heroku create

# 部署代码
git push heroku master

# 查看Heroku应用日志
heroku logs --tail
```

## 功能配置指南

您可以根据需要调整`config.js`文件中的各项配置：

### 自动欢迎配置
```javascript
welcome: {
  enabled: true,
  rulesMessage: '📝 请遵守群规，文明发言，共同维护良好的交流环境！',
  helpMessage: '💡 输入 /help 查看可用命令，如有问题请@管理员'
}
```

### 定时消息配置
```javascript
scheduledMessages: {
  enabled: true,
  messages: [
    {
      id: 'morning-greeting',
      cron: '0 8 * * *', // 每天早上8点
      groups: ['all'],
      content: '🌞 早上好！新的一天开始了，祝您有个愉快的心情！'
    }
  ]
}
```

### 关键词回复配置
```javascript
keywordResponses: {
  enabled: true,
  responses: [
    {
      keywords: ['你好', 'hello'],
      replies: ['你好呀！请问有什么可以帮到你的吗？']
    }
  ]
}
```

## 停止机器人

### 直接停止（开发模式）
在命令行窗口中按下 `Ctrl + C` 可以停止机器人运行。

### PM2停止（生产模式）
```powershell
npm run pm2:stop
# 或
pm run pm2:delete
```

## 总结

通过本教程，您应该能够：
1. 准备好机器人运行环境
2. 正确配置机器人参数
3. 启动机器人并验证其功能
4. 解决常见问题
5. 了解如何部署到Heroku

如果您在使用过程中遇到任何问题，请参考日志信息进行排查，或查阅项目中的`DEVELOPER_GUIDE.md`获取更多技术细节。