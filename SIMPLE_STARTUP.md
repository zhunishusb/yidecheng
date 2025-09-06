# 溢得承 - QQ机器人基础版本启动指南

本指南提供了运行溢得承QQ机器人的简洁步骤，该机器人支持消息接收、自动回复、内容审核、智能处罚、自动欢迎、定时消息和关键词回复等丰富功能。

## 溢得承机器人 - 前提条件

在运行此QQ机器人之前，您需要安装：
- Node.js 12.16.x 或更高版本
- npm（通常与Node.js一起安装）

## 快速开始

### 1. 安装项目依赖

打开命令提示符(CMD)或PowerShell，导航到项目目录并安装依赖：

```powershell
cd c:\Users\ASUS\Desktop\qq bot
npm install
```

### 2. 配置机器人参数

打开`index.js`文件，修改以下配置参数以匹配您的QQ开放平台应用信息：

```javascript
// 机器人配置
const config = {
  appID: '您的appID',         // 替换为您的QQ开放平台AppID
  token: '您的token',         // 替换为您的QQ开放平台Token
  appSecret: '您的appSecret', // 替换为您的QQ开放平台AppSecret
  port: 3000                 // 服务器端口（可根据需要修改）
};
```

### 3. 运行机器人

在项目目录下执行以下命令启动机器人：

```powershell
npm start
```

启动成功后，您将看到类似以下输出：

```
QQ机器人服务器启动成功，监听端口: 3000
请将回调地址设置为: http://your-server-ip:3000
注意：在正式环境中，请配置HTTPS和域名解析
```

### 4. 配置QQ开放平台回调地址

登录QQ开放平台，在您的应用设置中将回调地址设置为：
```
http://您的服务器IP:3000
```

> **注意**：如果是在本地测试，您可能需要使用内网穿透工具（如ngrok）获取公网可访问的地址。

## 功能说明

机器人实现的主要功能：

1. **👋 自动欢迎**：新成员加入时自动发送欢迎消息和群规提示
2. **⏰ 定时消息**：按照设定的时间自动发送问候、通知等消息
3. **💬 关键词回复**：根据用户发送的关键词自动回复预设内容
4. **🔒 内容审核**：自动检测并过滤敏感词、广告、色情及危险内容
5. **⚖️ 智能处罚**：根据违规类型自动应用不同级别的处罚（警告、禁言、踢出、封禁）
6. **🧹 缓存清理**：自动清理过期日志和数据文件，保持系统整洁
7. **📝 日志系统**：详细的操作日志，便于问题排查和运行监控

## 查看日志

机器人运行过程中会输出调试日志，包括签名验证信息和请求处理状态。这些日志将帮助您排查可能出现的问题。

## 停止机器人

在命令行窗口中按下 `Ctrl + C` 可以停止机器人运行。

## 常见问题

### Node.js未找到

如果执行`node -v`或`npm -v`命令时提示"无法识别"，请检查Node.js是否正确安装并添加到系统PATH中。

### 端口占用

如果启动时提示端口已被占用，可以修改`index.js`中的`config.port`值为其他未使用的端口。

### 签名验证失败

如果日志中显示签名验证失败，请确保：
- `index.js`中的appID、token配置与QQ开放平台一致
- 回调地址配置正确
- 请求参数未被修改

## 功能配置指南

机器人的所有功能都可以在`config.js`文件中进行配置：

### 自动欢迎功能配置
```javascript
welcome: {
  enabled: true,        // 是否启用自动欢迎功能
  rulesMessage: '请遵守群规...', // 群规提示消息
  helpMessage: '输入 /help...'   // 帮助提示消息
}
```

### 定时消息功能配置
```javascript
scheduledMessages: {
  enabled: true,        // 是否启用定时消息功能
  messages: [
    {
      id: 'morning-greeting',  // 消息ID
      cron: '0 8 * * *',       // cron表达式（每天早上8点）
      groups: ['all'],         // 目标群ID列表，'all'表示所有群
      content: '早上好！...'     // 消息内容
    }
  ]
}
```

### 关键词回复功能配置
```javascript
keywordResponses: {
  enabled: true,        // 是否启用关键词回复功能
  responses: [
    {
      keywords: ['你好', 'hello'], // 触发关键词
      replies: ['你好呀！...']    // 可能的回复内容列表
    }
  ]
}
```

### 缓存清理功能配置
```javascript
cacheCleaner: {
  enabled: true,              // 是否启用缓存清理功能
  directories: ['logs', 'data'], // 需要清理的目录
  maxAgeDays: 7,              // 文件最大保留天数
  schedule: '0 0 * * *'       // 清理执行时间（每天凌晨）
}
```

## 生产环境部署

对于生产环境，我们推荐使用PM2进行进程管理：

```powershell
# 全局安装PM2
npm install pm2 -g

# 使用PM2启动机器人
pm run deploy
pm run pm2:start

# 查看PM2进程状态
pm run pm2:list

# 查看机器人日志
npm run pm2:logs
```

## 常见问题排查

1. **机器人不响应消息**
   - 检查`config.js`中的appID、token和appSecret是否正确
   - 确认QQ开放平台的回调地址配置正确
   - 查看机器人日志是否有错误信息

2. **自动欢迎功能不工作**
   - 检查`config.js`中`welcome.enabled`是否设置为`true`
   - 确认机器人有发送消息的权限

3. **定时消息没有按时发送**
   - 检查cron表达式格式是否正确
   - 确认服务器时间设置正确

4. **缓存清理功能不工作**
   - 检查`config.js`中`cacheCleaner.enabled`是否设置为`true`
   - 确认机器人有文件系统的读写权限

5. **关键词回复不准确**
   - 调整关键词配置，避免过于简单或歧义的关键词
   - 可以为同一组关键词配置多个回复内容