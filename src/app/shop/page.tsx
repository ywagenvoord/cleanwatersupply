// Server component: fetches Stripe products at request time and merges with
// hardcoded enrichment data. Anyone adding a product in Stripe sees it here
// within `revalidate` seconds without a redeploy.

import type { Metadata } from 'next'
import { getActiveStripeProducts } from '@/lib/stripe-fetch'
import { PRODUCTS, type Product } from '@/lib/products'
import ShopClient from './ShopClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'

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
  const stripeProducts = await getActiveStripeProducts()

  const breadcrumb = (
    <BreadcrumbJsonLd
      crumbs={[
        { name: 'Hjem', url: SITE_URL },
        { name: 'Shop', url: `${SITE_URL}/shop` },
      ]}
    />
  )

  // If Stripe fetch failed/empty (no key, error, etc.) → fall back to hardcoded list
  if (stripeProducts.length === 0) {
    return (
      <>
        {breadcrumb}
        <ShopClient products={PRODUCTS} />
      </>
    )
  }

  const merged: Product[] = []
  const usedHardcodedIds = new Set<string>()

  for (const sp of stripeProducts) {
    const hardcoded = sp.cwsId ? PRODUCTS.find(p => p.id === sp.cwsId) : undefined

    if (hardcoded) {
      // Enrich with Stripe live data (price, etc.) but keep rich content
      merged.push({
        ...hardcoded,
        price:           sp.price,
        stripeProductId: sp.stripeProductId,
      })
      usedHardcodedIds.add(hardcoded.id)
    } else {
      // Stripe-only product (test products, new ones added directly in Stripe)
      merged.push({
        id:              sp.stripeProductId,           // use Stripe ID as URL slug
        name:            sp.name,
        tagline:         'Tilgængelig via Stripe',
        description:     sp.description || sp.name,
        category:        'filtre',                     // default category
        price:           sp.price,
        imgSrc:          sp.images[0] || '',
        imgLarge:        sp.images[0] || '',
        highlights:      [],
        features:        [],
        specs:           [],
        faqs:            [],
        useCases:        [],
        stripeProductId: sp.stripeProductId,
      })
    }
  }

  // Add any hardcoded "coming soon" products that aren't in Stripe yet
  for (const p of PRODUCTS) {
    if (!usedHardcodedIds.has(p.id) && p.comingSoon) {
      merged.push(p)
    }
  }

  return (
    <>
      {breadcrumb}
      <ShopClient products={merged} />
    </>
  )
}
