import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'


export default function robots(): MetadataRoute.Robots {
  // AI-svarmaskiner (ChatGPT, Perplexity, Googles AI-svar m.fl.) må gerne læse
  // og citere sitet – det er en forudsætning for GEO (Generative Engine Optimization).
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/cart',           // shopping cart isn't useful in search
          '/cart?*',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
