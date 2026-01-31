/**
 * 获取站点基础 URL
 * 优先使用环境变量，回退到默认值
 */
export function getBaseUrl(): string {
  // 服务端：优先使用 NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  // Vercel 自动注入的 URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }

  // 生产环境默认值
  return 'https://anxforever-blog.vercel.app'
}

// 导出常量供静态使用
export const BASE_URL = getBaseUrl()
