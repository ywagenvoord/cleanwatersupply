// Server component: fetches Stripe products at request time and merges with
// hardcoded enrichment data. Anyone adding a product in Stripe sees it here
// within `revalidate` seconds without a redeploy.

import type { Metadata } from 'next'
import { getMergedShopProducts } from '@/lib/shop-data'
import ShopClient from './ShopClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'


export const revalidate = 60 // ISR: refresh every 60 seconds

export const metadata: Metadata = {
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
    title: 'Shop | Clean Water Supply',
    description: 'Vandfiltre, blødgøringsanlæg og tilbehør – fra 99 kr.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
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
