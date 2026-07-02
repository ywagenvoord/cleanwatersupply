import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'
import { sektorer } from '@/lib/sektorer'
import { SITE_URL } from '@/lib/site'


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/shop`,        lastModified: now, changeFrequency: 'daily',   priority: 0.95 },
    { url: `${SITE_URL}/solutions`,   lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/legionella`,  lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/faq`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/montering`,   lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/eca-vand`,    lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/spildevand`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/fordele`,     lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/business`,    lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/omraader`,    lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privatlivspolitik`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/handelsbetingelser`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map(p => ({
    url:            `${SITE_URL}/shop/${p.id}`,
    lastModified:   now,
    changeFrequency: 'weekly',
    priority:        p.featured ? 0.9 : 0.8,
  }))

  const sectorRoutes: MetadataRoute.Sitemap = sektorer.map(s => ({
    url:            `${SITE_URL}/omraader/${s.id}`,
    lastModified:   now,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  return [...staticRoutes, ...productRoutes, ...sectorRoutes]
}
