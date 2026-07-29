import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { STRIPE_MAPPING } from '@/lib/stripe-products'
import { PRODUCTS } from '@/lib/products'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs-vedligeholdelse: sætter hvert Stripe-produkts billede til den live
// billed-URL fra sitet, så produktbilledet i Stripe Checkout ikke er et dødt
// (gammelt WordPress-)link. Idempotent og ikke-destruktiv – kan køres igen.
//
// Kør: https://cleanwatersupply.dk/api/admin/sync-stripe-images?token=<TOKEN>
// Ruten kan slettes igen, når den er kørt én gang.

const TOKEN    = 'i9Zpy9ic7k9e9PNik1jZ20nSNinP8EbR'
const IMG_BASE = 'https://cleanwatersupply.dk'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  }
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })

  const byId = new Map(PRODUCTS.map((p) => [p.id, p]))
  const results: Array<Record<string, unknown>> = []

  for (const [cwsId, meta] of Object.entries(STRIPE_MAPPING)) {
    const img = byId.get(cwsId)?.imgSrc
    if (!img) {
      results.push({ cwsId, skipped: 'ingen billede i katalog' })
      continue
    }
    const url = img.startsWith('http') ? img : `${IMG_BASE}${img}`
    try {
      await stripe.products.update(meta.productId, { images: [url] })
      results.push({ cwsId, image: url, ok: true })
    } catch (e) {
      results.push({ cwsId, image: url, error: (e as Error).message })
    }
  }

  return NextResponse.json({
    updated: results.filter((r) => r.ok).length,
    total:   results.length,
    results,
  })
}
