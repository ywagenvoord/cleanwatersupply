import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs: peger Mikroplastik-produktets Stripe-billede på den hvide kande (nyt filnavn = cache-sikkert).
const TOKEN = 'I5cQedXxrtbj3YgbpRKyyShc'
const PRODUCT_ID = 'prod_V2wDbJ1i8O20Kj'
const IMAGE = 'https://cleanwatersupply.dk/images/kande-mikroplastik-hvid.jpg'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })
  try {
    const p = await stripe.products.update(PRODUCT_ID, { images: [IMAGE] })
    return NextResponse.json({ ok: true, productId: p.id, image: IMAGE })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
