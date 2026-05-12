import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type CartLine = {
  stripeProductId: string
  quantity:        number
}

export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY mangler i environment variables' },
        { status: 500 },
      )
    }
    const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })

    const { items } = (await req.json()) as { items: CartLine[] }

    if (!items?.length) {
      return NextResponse.json({ error: 'Kurven er tom' }, { status: 400 })
    }

    // Resolve each Stripe product to its active price.
    // Try default_price first; fall back to first active price for the product.
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await stripe.products.retrieve(item.stripeProductId)
        let priceId: string | undefined =
          typeof product.default_price === 'string'
            ? product.default_price
            : product.default_price?.id

        if (!priceId) {
          const prices = await stripe.prices.list({
            product: item.stripeProductId,
            active: true,
            limit: 1,
          })
          priceId = prices.data[0]?.id
        }

        if (!priceId) throw new Error(`Mangler pris for produkt ${item.stripeProductId}`)
        return { price: priceId, quantity: item.quantity }
      }),
    )

    const origin = req.headers.get('origin') || 'https://cleanwatersupply-rose.vercel.app'

    // NOTE: by NOT passing payment_method_types or automatic_payment_methods,
    // Stripe Checkout will show every payment method enabled for your account
    // (cards + MobilePay + any future methods you activate in the dashboard).
    //
    // adaptive_pricing.enabled = false → forces DKK as the only currency,
    // which is required for MobilePay to appear (MobilePay is DKK-only).
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      adaptive_pricing: { enabled: false },
      shipping_address_collection: {
        allowed_countries: ['DK', 'SE', 'NO', 'DE', 'NL', 'BE'],
      },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      success_url: `${origin}/cart?success=true`,
      cancel_url:  `${origin}/cart`,
      locale: 'da',
      allow_promotion_codes: true,
    } as any)

    return NextResponse.json({ url: session.url, id: session.id })
  } catch (e: any) {
    console.error('Checkout error:', e)
    return NextResponse.json(
      { error: e.message || 'Kunne ikke oprette checkout-session' },
      { status: 500 },
    )
  }
}
