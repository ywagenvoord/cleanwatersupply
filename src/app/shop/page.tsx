// Server component: fetches Stripe products at request time and merges with
// hardcoded enrichment data. Anyone adding a product in Stripe sees it here
// within `revalidate` seconds without a redeploy.

import type { Metadata } from 'next'
import { getMergedShopProducts } from '@/lib/shop-data'
import ShopClient from './ShopClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'
import { BLACK_MONTH, BLACK_MAX } from '@/lib/blackmonth'


export const revalidate = 60 // ISR: refresh every 60 seconds

export function generateMetadata(): Metadata {
  // Black Month-link-preview (Open Graph) vises frem til og med kampagnens slut,
  // så delte links til /shop viser Black Month-grafikken. Bagefter: standard.
  const black = Date.now() <= BLACK_MONTH.end.getTime()

  const ogTitle = black
    ? `BLACK MONTH 🖤 Spar op til ${BLACK_MAX}% – hele november`
    : 'Shop | Clean Water Supply'
  const ogDesc = black
    ? `Black Month hos Clean Water Supply! Spar op til ${BLACK_MAX}% på udvalgte vandfiltre, brusehoveder og filterkander – hele november.`
    : 'Vandfiltre, blødgøringsanlæg og tilbehør – fra 99 kr.'
  const ogImages = black
    ? [{ url: '/images/og-blackmonth.jpg', width: 1200, height: 630, alt: 'Black Month hos Clean Water Supply – spar op til 25%' }]
    : undefined

  return {
    title: 'Shop vandfiltre & blødgøringsanlæg',
    description:
      'Køb Legionella-filtre, blødgøringsanlæg og ECA-vand systemer online. Medicinsk certificeret – fra 99 kr. Hurtig levering i hele Danmark.',
    keywords: [
      'køb vandfilter',
      'Legionella filter pris',
      'Baclyser filter',
      'cBlue brusehoved',
      'blødgøringsanlæg pris',
      'vandfilter online',
      'Coupling M22',
      'Coupling M24',
    ],
    alternates: { canonical: `${SITE_URL}/shop` },
    openGraph: {
      type: 'website', url: `${SITE_URL}/shop`,
      title: ogTitle,
      description: ogDesc,
      locale: 'da_DK', siteName: 'Clean Water Supply',
      images: ogImages,
    },
    twitter: black
      ? { card: 'summary_large_image', title: ogTitle, description: ogDesc, images: ['/images/og-blackmonth.jpg'] }
      : undefined,
  }
}

export default async function ShopPage() {
  const products = await getMergedShopProducts()

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem', url: SITE_URL },
          { name: 'Shop', url: `${SITE_URL}/shop` },
        ]}
      />
      {/* Privat-shop: erhverv-kun produkter skjules automatisk */}
      <ShopClient products={products} />
    </>
  )
}
