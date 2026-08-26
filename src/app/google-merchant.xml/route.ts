import { getKande } from '@/lib/kander'
import { SITE_URL } from '@/lib/site'

// Google Merchant / Shopping produktfeed (RSS 2.0 med g:-namespace).
// Google Merchant Center henter denne URL på skema.
// Udvid ved at tilføje flere slugs til FEED_SLUGS.
export const dynamic = 'force-static'

const FEED_SLUGS = ['glassmart', 'mikroplastik-stop', 'carmen']

// Nogle kander har deres kanoniske produktside i shoppen frem for /vandkander/[slug].
const LINK_OVERRIDE: Record<string, string> = {
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

export async function GET() {
  const items = FEED_SLUGS.map(getKande).filter(Boolean)

  const itemXml = items
    .map((k: any) => {
      const link = `${SITE_URL}${LINK_OVERRIDE[k.slug] || `/vandkander/${k.slug}`}`
      const image = abs(k.img)
      const extra = abs(k.ogImage)
      const desc = (k.intro || k.tagline || '').replace(/\s+/g, ' ').trim()
      return `    <item>
      <g:id>${esc(k.varenr || k.slug)}</g:id>
      <g:title>${esc(k.name)}</g:title>
      <g:description>${esc(desc)}</g:description>
      <g:link>${esc(link)}</g:link>
      <g:image_link>${esc(image)}</g:image_link>${extra && extra !== image ? `\n      <g:additional_image_link>${esc(extra)}</g:additional_image_link>` : ''}
      <g:availability>in_stock</g:availability>
      <g:price>${k.price}.00 DKK</g:price>
      <g:brand>Laica</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:mpn>${esc(k.varenr || k.slug)}</g:mpn>
      <g:google_product_category>Home &amp; Garden &gt; Kitchen &amp; Dining &gt; Water Coolers &amp; Filters</g:google_product_category>
      <g:product_type>Vandkander med filter &gt; ${esc(k.name)}</g:product_type>
    </item>`
    })
    .join('\n')

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
