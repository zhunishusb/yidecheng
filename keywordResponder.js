/**
 * 溢得承 - 关键词回复模块
 * 根据用户发送的关键词自动回复预设内容
 */

const config = require('./config');
const logger = require('./logger');

/**
 * 检查消息是否包含关键词
 * @param {string} message - 消息内容
 * @param {string[]|string} keywords - 关键词列表或单个关键词
 * @param {boolean} exactMatch - 是否精确匹配
 * @returns {boolean} 是否包含关键词
 */
function containsKeyword(message, keywords, exactMatch = false) {
  if (!message || !keywords) return false;
  
  const lowerMessage = message.toLowerCase();
  
  if (Array.isArray(keywords)) {
    for (const keyword of keywords) {
      if (containsKeyword(lowerMessage, keyword, exactMatch)) {
        return true;
      }
    }
    return false;
  }
  
  const lowerKeyword = keywords.toLowerCase();
  
  if (exactMatch) {
    // 精确匹配：消息内容与关键词完全相同或包含独立的关键词（前后有空格或标点）
    const regex = new RegExp(`(^|\s|\p{Punctuation})${escapeRegExp(lowerKeyword)}($|\s|\p{Punctuation})`, 'u');
    return regex.test(lowerMessage);
  } else {
    // 模糊匹配：消息内容包含关键词即可
    return lowerMessage.includes(lowerKeyword);
  }
}

/**
 * 转义正则表达式特殊字符
 * @param {string} string - 待转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 根据消息内容获取回复
 * @param {string} message - 消息内容
 * @returns {string|null} 回复内容或null
 */
function getKeywordResponse(message) {
  if (!config.keywordResponses || !config.keywordResponses.enabled) {
    return null;
  }
  
  const { responses } = config.keywordResponses;
  
  if (!responses || responses.length === 0) {
    return null;
  }
  
  for (const response of responses) {
    const { keywords, replies, exactMatch = false } = response;
    
    if (containsKeyword(message, keywords, exactMatch)) {
      // 从多个回复中随机选择一个
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return randomReply;
    }
  }
  
  return null;
}

/**
 * 处理关键词回复
 * @param {Object} bot - 机器人实例
 * @param {Object} event - 事件对象
 * @returns {boolean} 是否处理了回复
 */
async function handleKeywordReply(bot, event) {
  try {
    const message = event.message || '';
    const groupId = event.group_id;
    const userId = event.user_id;
    
    // 获取关键词回复
    const reply = getKeywordResponse(message);
    
    if (reply) {
      // 发送回复消息
      await bot.sendGroupMsg(groupId, `[溢得承] ${reply}`);
      logger.info(`已向群 ${groupId} 用户 ${userId} 发送关键词回复`);
      return true;
    }
    
    return false;
  } catch (error) {
    logger.error(`处理关键词回复失败: ${error.message}`);
    return false;
  }
}

/**
 * 添加关键词回复配置
 * @param {Object} config - 回复配置对象
 * @returns {boolean} 是否添加成功
 */
function addKeywordResponse(configData) {
  try {
    if (!config.keywordResponses || !config.keywordResponses.enabled) {
      return false;
    }
    
    if (!configData.keywords || !configData.replies) {
      return false;
    }
    
    config.keywordResponses.responses.push({
      keywords: configData.keywords,
      replies: configData.replies,
      exactMatch: configData.exactMatch || false
    });
    
    logger.info(`已添加关键词回复配置: ${JSON.stringify(configData.keywords)}`);
    return true;
  } catch (error) {
    logger.error(`添加关键词回复配置失败: ${error.message}`);
    return false;
  }
}

module.exports = {
  handleKeywordReply,
  addKeywordResponse,
  containsKeyword,
  getKeywordResponse
};