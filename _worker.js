import { createPagesFunctionHandler } from '@cloudflare/next-on-pages';

// 导入Next.js构建产物
const buildOutput = require('./.next/server/pages-manifest.json');

// 创建Cloudflare Pages处理器
const handler = createPagesFunctionHandler({
  buildOutput,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  middlewarePath: './.next/server/middleware.js'
});

// 导出Cloudflare Workers处理函数
export default { fetch: handler };

// 定时任务处理（Cloudflare Triggers兼容层）
export async function scheduled(event, env, ctx) {
  const response = await fetch(`${env.CF_PAGES_URL}/api/cron-task`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.CRON_SECRET}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp: Date.now() })
  });

  if (!response.ok) {
    console.error('定时任务执行失败:', await response.text());
  }

  ctx.waitUntil(response);
}