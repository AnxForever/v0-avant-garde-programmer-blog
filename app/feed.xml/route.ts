import { posts } from '@/lib/data'
import { BASE_URL } from '@/lib/url'

export async function GET() {
  const feedItems = posts
    .map((post) => {
      // 提取纯文本摘要
      const plainTextContent = post.content.replace(/[#*`\[\]]/g, '').trim()
      const description = plainTextContent.slice(0, 200) + (plainTextContent.length > 200 ? '...' : '')

      // 转换日期格式 (yyyy.mm.dd -> RFC 2822)
      const dateParts = post.date.split('.')
      const pubDate = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
      ).toUTCString()

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${description}]]></description>
      <category>${post.category}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Anx Forever Blog</title>
    <link>${BASE_URL}</link>
    <description>一个专注于数据科学、AI、前端开发与创意编程的个人博客。探索 BERT、GPT 等前沿技术，分享编程心得与创意实验。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/og-image.png</url>
      <title>Anx Forever Blog</title>
      <link>${BASE_URL}</link>
    </image>
    ${feedItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
