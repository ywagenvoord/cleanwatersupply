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

    const origin = req.headers.get('origin') || 'https://cleanwatersupply.dk'

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
      // Opret automatisk en Stripe-faktura (med fakturanummer + PDF) ved hvert køb,
      // så den kan sendes til bogholderiet.
      invoice_creation: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ['DK', 'SE', 'NO', 'DE', 'NL', 'BE'],
      },
      // Fragtmuligheder: almindelig levering + "Afhent selv" ved butikken.
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 6900, currency: 'dkk' },
            display_name: 'Levering',
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'dkk' },
            display_name: 'Afhent selv – Strømøvej 3, 8700 Horsens',
          },
        },
      ],
      custom_text: {
        shipping_address: {
          message:
            'Vælger du "Afhent selv", kan varen hentes hos Clean Water Supply, Strømøvej 3, 8700 Horsens. Du får besked, når den er klar til afhentning.',
        },
      },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      success_url: `${origin}/ordre-bekraeftelse?session_id={CHECKOUT_SESSION_ID}`,
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
