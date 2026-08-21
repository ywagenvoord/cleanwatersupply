import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs: opret Stripe-produkter for de to blødgøringsanlæg (100B + 100BS),
// så de kan købes direkte på hjemmesiden. Idempotent – springer over hvis
// et produkt med samme cws_id allerede findes.
const TOKEN = 'blodgoring2026create'

const SITE = 'https://cleanwatersupply.dk'

const ITEMS = [
  {
    cwsId: 'blosgoringsanlaeg-100b',
    name: 'Blødgøringsanlæg 100B',
    description:
      'Blødgøringsanlæg med separat 10 kg salttank og kompakt design – 3 L harpiks, 1.500 l/t. Blødt vand i hele huset.',
    image: `${SITE}/images/blosgoringsanlaeg-100b-v2.jpg`,
    priceOere: 1125000, // 11.250 kr
  },
  {
    cwsId: 'blosgoringsanlaeg-100bs',
    name: 'Blødgøringsanlæg 100BS',
    description:
      'Blødgøringsanlæg med separat 25 kg salttank til sjældnere genopfyldning – 3 L harpiks, 1.500 l/t. Blødt vand i hele huset.',
    image: `${SITE}/images/blosgoringsanlaeg-100bs.jpg`,
    priceOere: 1125000, // 11.250 kr
  },
]

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })

  try {
    // Hent eksisterende produkter, så vi ikke opretter dubletter.
    const existing = await stripe.products.list({ active: true, limit: 100 })
    const byCwsId = new Map<string, string>()
    for (const p of existing.data) {
      const c = p.metadata?.cws_id
      if (c) byCwsId.set(c, p.id)
    }

    const results: Array<Record<string, unknown>> = []

    for (const item of ITEMS) {
      if (byCwsId.has(item.cwsId)) {
        results.push({ cwsId: item.cwsId, status: 'findes allerede', productId: byCwsId.get(item.cwsId) })
        continue
      }

      const product = await stripe.products.create({
        name: item.name,
        description: item.description,
        images: [item.image],
        metadata: { cws_id: item.cwsId },
      })

      const price = await stripe.prices.create({
        product: product.id,
        currency: 'dkk',
        unit_amount: item.priceOere,
      })

      await stripe.products.update(product.id, { default_price: price.id })

      results.push({
        cwsId: item.cwsId,
        status: 'oprettet',
        productId: product.id,
        priceId: price.id,
        pris: item.priceOere / 100,
      })
    }

    return NextResponse.json({ ok: true, results })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
