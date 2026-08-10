import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs: retter Filtervandkande (MikroPLASTIK-STOP + Bi-flux) i Stripe:
//  1) pris -> 349 kr inkl. moms (ny pris, sat som default, gammel arkiveres)
//  2) produktbillede -> den hvide Laica-kande (samme som paa sitet)
const TOKEN = 'I5cQedXxrtbj3YgbpRKyyShc'
const PRODUCT_ID = 'prod_V2wDbJ1i8O20Kj'
const IMAGE =
  'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915'
const NEW_AMOUNT = 34900 // 349,00 DKK

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })
  try {
    const product = await stripe.products.retrieve(PRODUCT_ID)
    const oldPriceId =
      typeof product.default_price === 'string'
        ? product.default_price
        : product.default_price?.id

    // Ny pris (priser er immutable i Stripe)
    const newPrice = await stripe.prices.create({
      product: PRODUCT_ID,
      currency: 'dkk',
      unit_amount: NEW_AMOUNT,
      tax_behavior: 'inclusive',
    })

    // Saet ny pris som default + opdater billede
    await stripe.products.update(PRODUCT_ID, {
      default_price: newPrice.id,
      images: [IMAGE],
    })

    // Arkiver den gamle pris
    if (oldPriceId && oldPriceId !== newPrice.id) {
      await stripe.prices.update(oldPriceId, { active: false })
    }

    return NextResponse.json({
      ok: true,
      productId: PRODUCT_ID,
      newPriceId: newPrice.id,
      amount: NEW_AMOUNT / 100,
      archivedPriceId: oldPriceId ?? null,
      image: IMAGE,
    })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
