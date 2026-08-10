import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs-opgave: sætter produktbilleder på de nye Laica-Stripe-produkter,
// så de vises i shoppen (i stedet for placeholder). Idempotent.
// Kør: https://cleanwatersupply.dk/api/admin/set-laica-images?token=<TOKEN>

const TOKEN = 'BjXw3vl97rrGQZKrQfDmp6QV_Fj6wb1y'

const MAP: { productId: string; image: string }[] = [
  { productId: 'prod_V2wDbJ1i8O20Kj', image: 'https://cleanwatersupply.dk/images/kande-mikroplastik.jpg' },        // Mikroplastik+Stop kande
  { productId: 'prod_V2wFs5adWhY4cF', image: 'https://cleanwatersupply.dk/images/glassmart-bottle.jpg' },          // GlaSSmart
  { productId: 'prod_V2wHIQrdoXx6RG', image: 'https://cleanwatersupply.dk/images/fast-disk-pack.jpg' },            // FAST DISK 3-pak
  { productId: 'prod_V2wJ7p8aJ9zKMK', image: 'https://www.laica.com/wp-content/uploads/healthexpert-prod.webp' },  // HealthExpert 2-pak
  { productId: 'prod_V2wL6AYWrva1IO', image: 'https://www.laica.com/wp-content/uploads/limescalestop-filter.webp' }, // LimescaleSTOP 2-pak
  { productId: 'prod_V2wMXNiLmbLutN', image: 'https://cleanwatersupply.dk/images/product-filter-udskift.jpg' },    // Universal 2-pak
  { productId: 'prod_V2wPTqJRnKDYJu', image: 'https://cleanwatersupply.dk/images/kande-carmen.jpg' },              // Carmen Slim
]

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })

  const results: Array<Record<string, unknown>> = []
  for (const m of MAP) {
    try {
      await stripe.products.update(m.productId, { images: [m.image] })
      results.push({ productId: m.productId, image: m.image, ok: true })
    } catch (e) {
      results.push({ productId: m.productId, image: m.image, error: (e as Error).message })
    }
  }

  return NextResponse.json({ updated: results.filter((r) => r.ok).length, total: MAP.length, results })
}
