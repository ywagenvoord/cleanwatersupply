import { PRODUCTS, type Product } from '@/lib/products'
import { SITE_URL, BRAND } from '@/lib/site'

/**
 * Google Merchant Center produktfeed (RSS 2.0 med g:-namespace).
 * Tilgængeligt på /merchant-feed.xml – indsæt den adresse i Merchant Center.
 * Genereres ved build ud fra produktdataene, så det opdaterer sig ved hvert deploy.
 */

// XML-escape
const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// Absolut billed-URL
function imageUrl(p: Product): string {
  const img = p.images?.[0] || p.imgLarge || p.imgSrc || ''
  if (!img) return ''
  // Billeder på det gamle WordPress-site findes ikke længere – udelad dem,
  // så feedet ikke får afviste varer pga. 404-billeder.
  if (/\/wp-content\//.test(img)) return ''
  if (/^https?:\/\//.test(img)) return img
  return `${SITE_URL}${img.startsWith('/') ? '' : '/'}${img}`
}

// Kun salgbare produkter med en privatpris kommer med i feedet
function feedProducts(): Product[] {
  return PRODUCTS.filter(
    (p) =>
      !p.comingSoon &&
      !p.quoteOnly &&
      typeof p.price === 'number' &&
      p.price > 0 &&
      !!imageUrl(p),
  )
}

function itemXml(p: Product): string {
  const link = `${SITE_URL}/shop/${p.id}`
  const price = `${(p.price as number).toFixed(2)} DKK` // privatpris inkl. moms
  const desc = p.longDescription || p.description || p.tagline || p.name
  const mpn = p.productNr ? `\n      <g:mpn>${esc(p.productNr)}</g:mpn>` : ''

  return `    <item>
      <g:id>${esc(p.id)}</g:id>
      <g:title>${esc(p.name)}</g:title>
      <g:description>${esc(desc)}</g:description>
      <g:link>${esc(link)}</g:link>
      <g:image_link>${esc(imageUrl(p))}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${esc(price)}</g:price>
      <g:brand>${esc(BRAND.name)}</g:brand>${mpn}
      <g:identifier_exists>no</g:identifier_exists>
    </item>`
}

export async function GET() {
  const items = feedProducts().map(itemXml).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(BRAND.name)}</title>
    <link>${SITE_URL}</link>
    <description>Produktfeed til Google Merchant Center</description>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
