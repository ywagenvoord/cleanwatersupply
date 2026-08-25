import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Modtager af ordre-mails (jer)
const ORDER_EMAIL_TO = ['ksj@cleanwatersupply.dk', 'pj@cleanwatersupply.dk', 'caj@cleanwatersupply.dk']
// Afsender – Resends fælles domæne virker uden domæneopsætning
const ORDER_EMAIL_FROM = 'Clean Water Supply <onboarding@resend.dev>'

function kr(amountOre: number | null | undefined): string {
  return `${((amountOre ?? 0) / 100).toLocaleString('da-DK')} kr`
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Mangler Stripe-nøgler i environment' }, { status: 500 })
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-04-10' as any })

  // Verificér at kaldet rent faktisk kommer fra Stripe (rå body + signatur)
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Ugyldig signatur: ${err.message}` }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session

    // Hent ordrelinjer (produkter) med produktnavne
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
      limit: 100,
    })

    const rows = lineItems.data
      .map((li) => {
        const name = (li.description as string) || 'Produkt'
        const qty = li.quantity ?? 1
        const line = kr(li.amount_total)
        return `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">${name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${qty}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${line}</td>
        </tr>`
      })
      .join('')

    const cd = session.customer_details
    const ship = (session as any).shipping_details || (session as any).collected_information?.shipping_details
    const addr = ship?.address || cd?.address
    const addressStr = addr
      ? [addr.line1, addr.line2, `${addr.postal_code || ''} ${addr.city || ''}`.trim(), addr.country]
          .filter(Boolean)
          .join(', ')
      : '—'

    const shippingAmount = session.total_details?.amount_shipping
    const subject = `Ny ordre – ${kr(session.amount_total)}`

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#0a2540;">
        <div style="background:#0a2540;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0;">
          <h1 style="margin:0;font-size:20px;">Ny ordre modtaget 🎉</h1>
        </div>
        <div style="border:1px solid #eee;border-top:none;border-radius:0 0 14px 14px;padding:24px;">
          <h2 style="font-size:15px;margin:0 0 10px;">Produkter</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead>
              <tr style="text-align:left;color:#888;font-size:12px;">
                <th style="padding-bottom:6px;">Vare</th>
                <th style="padding-bottom:6px;text-align:center;">Antal</th>
                <th style="padding-bottom:6px;text-align:right;">Beløb</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>

          <table style="width:100%;font-size:14px;margin-top:12px;">
            ${shippingAmount != null ? `<tr><td style="color:#888;padding:2px 0;">Fragt</td><td style="text-align:right;">${kr(shippingAmount)}</td></tr>` : ''}
            <tr><td style="font-weight:bold;padding:8px 0 0;">I alt</td><td style="text-align:right;font-weight:bold;padding:8px 0 0;font-size:16px;">${kr(session.amount_total)}</td></tr>
          </table>

          <h2 style="font-size:15px;margin:22px 0 10px;">Kunde</h2>
          <table style="width:100%;font-size:14px;">
            <tr><td style="color:#888;width:120px;padding:3px 0;">Navn</td><td>${cd?.name || '—'}</td></tr>
            <tr><td style="color:#888;padding:3px 0;">E-mail</td><td>${cd?.email || '—'}</td></tr>
            <tr><td style="color:#888;padding:3px 0;">Telefon</td><td>${cd?.phone || '—'}</td></tr>
            <tr><td style="color:#888;padding:3px 0;vertical-align:top;">Leveringsadresse</td><td>${addressStr}</td></tr>
          </table>

          <p style="margin-top:22px;font-size:12px;color:#aaa;">Sendt automatisk fra cleanwatersupply.dk · Ordre-id: ${session.id}</p>
        </div>
      </div>`

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: ORDER_EMAIL_FROM,
      to: ORDER_EMAIL_TO,
      replyTo: cd?.email || undefined,
      subject,
      html,
    })

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Webhook order-email error:', err)
    // Svar 200 så Stripe ikke prøver igen i det uendelige – vi har modtaget eventet
    return NextResponse.json({ received: true, emailError: err.message })
  }
}
