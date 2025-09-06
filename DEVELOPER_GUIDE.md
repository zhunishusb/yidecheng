# 溢得承 - QQ机器人开发者指南

本指南为开发者提供了溢得承QQ机器人项目的详细架构和开发参考，帮助您快速了解项目结构、核心模块和扩展方法。

## 一、项目架构概述

溢得承QQ机器人采用模块化设计，主要包含以下几层：

1. **应用层**：处理QQ开放平台的请求和事件
2. **业务层**：实现各种机器人功能的核心逻辑
3. **工具层**：提供通用功能支持
4. **数据层**：负责数据存储和管理

![项目架构图](架构图待添加)

## 二、项目目录结构

```
├── config.js             # 主配置文件
├── index.js              # 应用入口文件
├── logger.js             # 日志管理模块
├── datamanager.js        # 数据管理模块
├── welcomeManager.js     # 自动欢迎功能模块
├── scheduledMessage.js   # 定时消息功能模块
├── keywordResponder.js   # 关键词回复功能模块
├── data/                 # 数据存储目录
│   ├── violation_records/ # 违规记录文件
│   └── ...
├── logs/                 # 日志文件目录
├── node_modules/         # 依赖包目录
├── package.json          # 项目配置和依赖声明
├── README.md             # 项目说明文档
└── SIMPLE_STARTUP.md     # 快速启动指南
```

## 三、核心模块说明

### 3.1 入口模块 (index.js)

**功能**：负责启动HTTP服务器、处理QQ开放平台请求和集成各功能模块。

**主要组件**：
- HTTP服务器：监听来自QQ开放平台的请求
- 签名验证器：验证请求的合法性
- 事件处理器：处理不同类型的QQ事件
- 模块初始化器：初始化各个功能模块

### 3.2 日志模块 (logger.js)

**功能**：提供统一的日志记录功能，支持不同日志级别和文件输出。

**核心方法**：
- `init()`：初始化日志目录和文件
- `log(level, message)`：记录日志的通用方法
- `debug(message)`：记录调试日志
- `info(message)`：记录信息日志
- `warn(message)`：记录警告日志
- `error(message)`：记录错误日志

### 3.3 数据管理模块 (datamanager.js)

**功能**：负责数据的存储和读取，特别是违规记录的管理。

**核心方法**：
- `init()`：初始化数据目录
- `saveViolationRecord(userId, violationType)`：保存用户违规记录
- `getViolationCount(userId)`：获取用户违规次数
- `getViolationRecords(userId)`：获取用户所有违规记录

### 3.4 自动欢迎模块 (welcomeManager.js)

**功能**：当新成员加入群组时，自动发送欢迎消息。

**核心方法**：
- `init()`：初始化自动欢迎模块
- `handleMemberJoin(groupId, userId, userName)`：处理成员加入事件
- `setEnabled(enabled)`：启用/禁用自动欢迎功能

### 3.5 定时消息模块 (scheduledMessage.js)

**功能**：按照预定的时间发送定时消息。

**核心方法**：
- `init()`：初始化定时消息模块
- `scheduleMessage(id, cronExpression, groups, content)`：安排定时消息
- `cancelMessage(id)`：取消定时消息
- `sendScheduledMessage(message)`：发送定时消息
- `setEnabled(enabled)`：启用/禁用定时消息功能

### 3.6 关键词回复模块 (keywordResponder.js)

**功能**：根据用户发送的关键词自动回复预设内容。

**核心方法**：
- `init()`：初始化关键词回复模块
- `checkKeyword(message)`：检查消息是否包含关键词
- `getResponse(keyword)`：获取关键词对应的回复
- `handleMessage(message, groupId, userId)`：处理消息并返回回复
- `setEnabled(enabled)`：启用/禁用关键词回复功能

## 四、开发环境搭建

### 4.1 安装依赖

```powershell
# 安装项目依赖
npm install

# 安装开发依赖
npm install --save-dev eslint nodemon
```

### 4.2 配置文件

在开发前，请确保`config.js`文件中的配置项正确设置：

```javascript
// 基本配置示例
module.exports = {
  // 应用信息
  appID: 'YOUR_APP_ID',
  token: 'YOUR_APP_TOKEN',
  appSecret: 'YOUR_APP_SECRET',
  
  // 服务器配置
  serverPort: 8080,
  
  // 功能配置
  welcome: {
    enabled: true,
    // ...其他配置
  },
  
  // ...其他模块配置
};
```

### 4.3 启动开发服务器

```powershell
# 使用nodemon启动开发服务器（支持热重载）
npm run dev
```

## 五、代码风格指南

为了保持代码的一致性和可读性，请遵循以下代码风格指南：

1. **命名规范**
   - 变量和函数：使用小驼峰命名法（camelCase）
   - 常量：使用大驼峰或全大写加下划线（UPPER_CASE）
   - 类：使用大驼峰命名法（PascalCase）

2. **代码格式**
   - 使用2个空格进行缩进
   - 使用单引号代替双引号
   - 每行代码长度不超过100个字符
   - 大括号放在行尾

3. **注释规范**
   - 为所有函数和重要代码块添加注释
   - 使用JSDoc格式为函数添加文档注释
   - 注释应简洁明了，说明代码的目的和逻辑

## 六、功能扩展流程

如果您需要为机器人添加新功能，请按照以下流程进行：

### 6.1 创建功能模块文件

创建一个新的JavaScript文件（例如`newFeature.js`），实现该功能的核心逻辑。

### 6.2 实现模块结构

```javascript
// newFeature.js
const logger = require('./logger');

// 模块配置
let config = {
  enabled: true,
  // 其他配置项...
};

// 初始化模块
function init(featureConfig = {}) {
  // 合并配置
  config = { ...config, ...featureConfig };
  
  if (config.enabled) {
    logger.info('【溢得承】新功能模块初始化成功');
    // 执行初始化操作
  }
}

// 核心功能方法
function coreFunction() {
  if (!config.enabled) return;
  
  try {
    // 功能实现逻辑
  } catch (error) {
    logger.error(`【溢得承】新功能执行错误: ${error.message}`);
  }
}

// 导出模块
module.exports = {
  init,
  coreFunction,
  // 其他公共方法...
};
```

### 6.3 在配置文件中添加配置项

在`config.js`文件中添加新功能的配置项：

```javascript
module.exports = {
  // 现有配置...
  
  // 新功能配置
  newFeature: {
    enabled: true,
    // 其他配置项...
  }
};
```

### 6.4 在入口文件中集成新模块

在`index.js`文件中引入并初始化新模块：

```javascript
// 引入新模块
const newFeature = require('./newFeature');

// 在服务器启动后初始化
// ...现有代码...

// 初始化新功能模块
if (config.newFeature) {
  newFeature.init(config.newFeature);
}

// ...现有代码...
```

### 6.5 编写测试用例

为新功能编写测试用例，确保功能的正确性和稳定性。

## 七、API参考

### 7.1 HTTP接口

机器人提供以下HTTP接口供QQ开放平台调用：

#### POST /api/qq/callback

**功能**：接收QQ开放平台发送的事件通知

**请求参数**：
- signature：请求签名
- timestamp：时间戳
- nonce：随机数
- body：事件数据（JSON格式）

**响应**：
- 成功：返回空字符串
- 失败：返回错误信息

### 7.2 模块API

#### 日志模块API

```javascript
// 记录日志
logger.log(level, message);
logger.debug(message);
logger.info(message);
logger.warn(message);
logger.error(message);
```

#### 数据管理模块API

```javascript
// 保存违规记录
dataManager.saveViolationRecord(userId, violationType);

// 获取违规次数
dataManager.getViolationCount(userId);

// 获取所有违规记录
dataManager.getViolationRecords(userId);
```

#### 自动欢迎模块API

```javascript
// 处理成员加入事件
welcomeManager.handleMemberJoin(groupId, userId, userName);

// 启用/禁用自动欢迎
welcomeManager.setEnabled(enabled);
```

#### 定时消息模块API

```javascript
// 安排定时消息
scheduledMessage.scheduleMessage(id, cronExpression, groups, content);

// 取消定时消息
scheduledMessage.cancelMessage(id);

// 启用/禁用定时消息
scheduledMessage.setEnabled(enabled);
```

#### 关键词回复模块API

```javascript
// 处理消息并返回回复
const response = keywordResponder.handleMessage(message, groupId, userId);

// 启用/禁用关键词回复
keywordResponder.setEnabled(enabled);
```

## 八、部署与发布

### 8.1 构建项目

```powershell
# 安装依赖
npm install

# 构建项目（如果有构建步骤）
npm run build
```

### 8.2 生产环境部署

推荐使用PM2进行进程管理：

```powershell
# 全局安装PM2
npm install pm2 -g

# 使用PM2启动机器人
npm run pm2:start

# 查看进程状态
npm run pm2:list

# 监控进程
npm run pm2:monitor
```

### 8.3 发布新版本

1. 更新版本号（在package.json中）
2. 提交代码并打标签
3. 构建并部署新版本
4. 更新文档

## 九、常见问题解决

### 9.1 调试技巧

- 使用`logger.debug()`记录调试信息
- 利用Node.js的调试工具进行断点调试
- 使用`console.log()`临时输出变量值

### 9.2 错误排查

- 查看`logs`目录下的日志文件
- 检查QQ开放平台的错误码和错误信息
- 确认网络连接和防火墙设置
- 验证配置文件中的参数是否正确

## 十、贡献指南

我们欢迎社区成员为溢得承QQ机器人项目做出贡献。如果您有兴趣参与项目开发，请遵循以下流程：

1. Fork项目仓库
2. 创建您的特性分支
3. 提交您的更改
4. 推送到您的分支
5. 提交Pull Request

在提交代码前，请确保您的代码符合项目的代码风格指南，并通过了所有测试。

---

**溢得承QQ机器人开发者指南 v1.0**

© 2023 溢得承 - 保留所有权利