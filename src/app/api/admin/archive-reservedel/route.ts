import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs: arkiver det gamle "Løst filter til vandkande" (60 kr) i Stripe,
// så det ikke længere dukker op som "Tilgængelig via Stripe" i shoppen.
const TOKEN = 'I5cQedXxrtbj3YgbpRKyyShc'
const ARCHIVE_PRODUCT_ID = 'prod_USJ9wTiZe0YzTS'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })
  try {
    const p = await stripe.products.update(ARCHIVE_PRODUCT_ID, { active: false })
    return NextResponse.json({ ok: true, archived: p.id, active: p.active })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
