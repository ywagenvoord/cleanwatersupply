import { KANDER } from '@/lib/kander'
import { FILTRE } from '@/lib/filtre'
import { SITE_URL } from '@/lib/site'
import { stockFor } from '@/lib/stock'

// Google Merchant / Shopping produktfeed (RSS 2.0 med g:-namespace).
// Google Merchant Center henter denne URL på skema. Dækker Laica-kander og -filtre
// til gratis fortegnelser (free listings) – ingen annoncekroner nødvendige.
export const dynamic = 'force-static'

// Nogle kander har deres kanoniske produktside i shoppen frem for /vandkander/[slug].
const KANDE_LINK_OVERRIDE: Record<string, string> = {
  carmen: '/shop/kande-carmen',
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function abs(path?: string): string {
  if (!path) return ''
  return path.startsWith('http') ? path : `${SITE_URL}${path}`
}

type FeedItem = {
  id: string
  name: string
  description: string
  link: string
  image: string
  extraImage?: string
  price?: number
  productType: string
}

function availabilityBlock(name: string, varenr?: string): string {
  const s = stockFor({ name, varenr })
  if (s) {
    return `      <g:availability>backorder</g:availability>\n      <g:availability_date>${s.restockISO}T00:00:00+0200</g:availability_date>`
  }
  return `      <g:availability>in_stock</g:availability>`
}

function renderItem(it: FeedItem, name: string, varenr?: string): string {
  return `    <item>
      <g:id>${esc(it.id)}</g:id>
      <g:title>${esc(it.name)}</g:title>
      <g:description>${esc(it.description)}</g:description>
      <g:link>${esc(it.link)}</g:link>
      <g:image_link>${esc(it.image)}</g:image_link>${it.extraImage && it.extraImage !== it.image ? `\n      <g:additional_image_link>${esc(it.extraImage)}</g:additional_image_link>` : ''}
${availabilityBlock(name, varenr)}
${it.price !== undefined ? `      <g:price>${it.price}.00 DKK</g:price>` : ''}
      <g:brand>Laica</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:mpn>${esc(it.id)}</g:mpn>
      <g:google_product_category>Home &amp; Garden &gt; Kitchen &amp; Dining &gt; Water Coolers &amp; Filters</g:google_product_category>
      <g:product_type>${esc(it.productType)}</g:product_type>
    </item>`
}

export async function GET() {
  const kandeItems = KANDER.filter((k) => k.price !== undefined).map((k) => {
    const it: FeedItem = {
      id: k.varenr || k.slug,
      name: k.name,
      description: (k.intro || k.tagline || '').replace(/\s+/g, ' ').trim(),
      link: `${SITE_URL}${KANDE_LINK_OVERRIDE[k.slug] || `/vandkander/${k.slug}`}`,
      image: abs(k.img),
      extraImage: abs(k.ogImage),
      price: k.price,
      productType: 'Vandkander med filter',
    }
    return renderItem(it, k.name, k.varenr)
  })

  const filterItems = FILTRE.filter((f) => f.price !== undefined).map((f) => {
    const it: FeedItem = {
      id: f.varenr || f.slug,
      name: `${f.name}${f.titleSuffix ? ' ' + f.titleSuffix : ''} – filter til vandkande`,
      description: (f.description || f.tagline || '').replace(/\s+/g, ' ').trim().slice(0, 400),
      link: `${SITE_URL}/vandkande-filtre/${f.slug}`,
      image: abs(f.images?.[0] || f.img),
      price: f.price,
      productType: 'Filtre til vandkande',
    }
    return renderItem(it, f.name, f.varenr)
  })

  const itemXml = [...kandeItems, ...filterItems].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Clean Water Supply – produktfeed</title>
    <link>${SITE_URL}</link>
    <description>Google Shopping produktfeed for Clean Water Supply</description>
${itemXml}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
