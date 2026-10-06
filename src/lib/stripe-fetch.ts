// Server-side helper to fetch active products from Stripe.
// Used by the shop page so newly added Stripe products appear automatically.

import Stripe from 'stripe'

export type StripeProductData = {
  stripeProductId: string                  // prod_...
  cwsId?:          string                  // optional cws_id metadata to match enrichment
  name:            string
  description:     string | null
  images:          string[]
  price:           number                  // DKK (kr, not øre)
  priceId:         string                  // price_...
}

// Fald-tilbage: udled cws_id fra Stripe-produktnavnet, når Stripe-produktet
// mangler metadata.cws_id. Så kobles nye Stripe-produkter automatisk til det
// rige hardcodede indhold (billeder, sælgende sektion, relaterede varer) uden
// at man manuelt skal sætte metadata i Stripe.
function inferCwsId(stripeId: string, name: string): string | undefined {
  // Kendt Stripe-id for Germ-STOP filtret (ét løst filter, ikke selve kanden)
  if (stripeId === 'prod_VOH0TENKrnTQT9') return 'mikroplastik-stop-filter'
  const n = name.toLowerCase()
  // Germ-STOP filter TIL filterkanden (adskiller fra selve "Germ-STOP filterkande")
  if (n.includes('germ-stop') && n.includes('til filterkande')) {
    return 'mikroplastik-stop-filter'
  }
  return undefined
}

export async function getActiveStripeProducts(): Promise<StripeProductData[]> {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return []

  try {
    const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })

    const list = await stripe.products.list({
      active: true,
      limit: 100,
      expand: ['data.default_price'],
    })

    const result: StripeProductData[] = []

    for (const p of list.data) {
      let priceId:    string | undefined
      let unitAmount: number | undefined

      // Try default_price first (expanded)
      if (p.default_price && typeof p.default_price !== 'string') {
        priceId    = p.default_price.id
        unitAmount = p.default_price.unit_amount ?? undefined
      } else if (typeof p.default_price === 'string') {
        priceId = p.default_price
      }

      // Fallback: query active prices for this product
      if (!priceId || unitAmount === undefined) {
        const prices = await stripe.prices.list({
          product: p.id,
          active: true,
          limit: 1,
        })
        const price = prices.data[0]
        if (price) {
          priceId    = price.id
          unitAmount = price.unit_amount ?? undefined
        }
      }

      // Skip products without a usable price
      if (!priceId || unitAmount === undefined) continue

      // Filter out test/internal products from public catalog (SEO + UX hygiene)
      const lower = p.name.toLowerCase().trim()
      if (
        lower === 'test product' ||
        lower.startsWith('test ') ||
        lower.startsWith('[test]') ||
        lower.startsWith('debug') ||
        p.metadata?.hidden === 'true' ||
        p.metadata?.test === 'true'
      ) continue

      result.push({
        stripeProductId: p.id,
        cwsId:           p.metadata?.cws_id || inferCwsId(p.id, p.name),
        name:            p.name,
        description:     p.description,
        images:          p.images,
        price:           unitAmount / 100,
        priceId,
      })
    }

    return result
  } catch (err) {
    console.error('Failed to fetch Stripe products:', err)
    return []
  }
}
