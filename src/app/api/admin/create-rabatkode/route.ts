import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Engangs: opret en rabatkode på 25 % af hele ordren.
// Kunden indtaster koden i Stripe Checkout (rabatkode-feltet er allerede aktivt).
const TOKEN = 'rabat2026create'

const CODE = 'FAM25'
const PERCENT_OFF = 25

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('token') !== TOKEN) {
    return NextResponse.json({ error: 'Uautoriseret' }, { status: 401 })
  }
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY mangler' }, { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })

  try {
    // Idempotent: findes koden allerede?
    const existing = await stripe.promotionCodes.list({ code: CODE, limit: 1 })
    if (existing.data.length > 0) {
      const pc = existing.data[0] as any
      return NextResponse.json({
        ok: true,
        status: 'findes allerede',
        code: pc.code,
        active: pc.active,
        promotionCodeId: pc.id,
        couponId: typeof pc.coupon === 'string' ? pc.coupon : pc.coupon?.id,
      })
    }

    // 1) Kupon: 25 % rabat, gælder hele ordren, uden udløb.
    const coupon = await stripe.coupons.create({
      percent_off: PERCENT_OFF,
      duration: 'once',
      name: `${CODE} – ${PERCENT_OFF}%`,
    })

    // 2) Rabatkode (det kunden indtaster), uden udløb.
    const promo = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: CODE,
      active: true,
    } as any)

    return NextResponse.json({
      ok: true,
      status: 'oprettet',
      code: promo.code,
      percentOff: PERCENT_OFF,
      promotionCodeId: promo.id,
      couponId: coupon.id,
    })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}
