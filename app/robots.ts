import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://anxforever-blog.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/archive/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
