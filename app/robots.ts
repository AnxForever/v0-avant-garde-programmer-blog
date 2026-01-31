import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/archive/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
