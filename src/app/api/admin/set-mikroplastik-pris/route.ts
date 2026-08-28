import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs: sæt ny pris (375 kr) på MikroPLASTIK-STOP-kanden i Stripe.
// Opretter en ny pris og gør den til default. Den gamle 349-pris arkiveres.
const TOKEN = 'mikroplastik375'
const PRODUCT_ID = 'prod_V2wDbJ1i8O20Kj' // MikroPLASTIK-STOP filterkande
const NEW_PRICE_OERE = 37500 // 375 kr

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })

  try {
    const product = await stripe.products.retrieve(PRODUCT_ID)
    const oldDefault = typeof product.default_price === 'string' ? product.default_price : product.default_price?.id

    // Opret ny pris og gør den til default
    const price = await stripe.prices.create({
      product: PRODUCT_ID,
      currency: 'dkk',
      unit_amount: NEW_PRICE_OERE,
    })
    await stripe.products.update(PRODUCT_ID, { default_price: price.id })

    // Deaktivér den gamle pris, så den ikke bruges ved en fejl
    if (oldDefault && oldDefault !== price.id) {
      await stripe.prices.update(oldDefault, { active: false })
    }

    return NextResponse.json({
      ok: true,
      productId: PRODUCT_ID,
      nyPrisId: price.id,
      nyPris: NEW_PRICE_OERE / 100,
      gammelPrisDeaktiveret: oldDefault ?? null,
    })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
