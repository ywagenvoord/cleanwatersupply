import type { Metadata } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import { CheckCircle2, Package, Truck, CreditCard, MapPin, ArrowRight } from 'lucide-react'
import ClearCart from './ClearCart'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ordrebekræftelse',
  robots: { index: false, follow: false },
}

function kr(ore: number | null | undefined): string {
  return `${((ore ?? 0) / 100).toLocaleString('da-DK')} kr`
}

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id
  const key = process.env.STRIPE_SECRET_KEY

  let session: Stripe.Checkout.Session | null = null
  if (sessionId && key) {
    try {
      const stripe = new Stripe(key, { apiVersion: '2024-04-10' as any })
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items.data.price.product', 'shipping_cost.shipping_rate'],
      })
    } catch {
      session = null
    }
  }

  // Fallback hvis vi ikke kan hente ordren (fx direkte besøg uden gyldigt id)
  if (!session) {
    return (
      <main className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <ClearCart />
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a2540] mb-3">Tak for din ordre!</h1>
          <p className="text-gray-600 mb-7">Vi har modtaget din betaling og sender en bekræftelse på e-mail.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3 rounded-full font-bold text-sm">
            Tilbage til shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    )
  }

  const items = session.line_items?.data ?? []
  const cd = session.customer_details
  const ship = (session as any).shipping_details || (session as any).collected_information?.shipping_details
  const addr = ship?.address || cd?.address
  const addressStr = addr
    ? [addr.line1, addr.line2, `${addr.postal_code || ''} ${addr.city || ''}`.trim()].filter(Boolean).join(', ')
    : null

  const shippingRate = (session.shipping_cost as any)?.shipping_rate
  const shippingName: string | undefined =
    typeof shippingRate === 'object' ? shippingRate?.display_name : undefined
  const isPickup = (shippingName || '').toLowerCase().includes('afhent')
  const country = addr?.country || 'DK'
  const deliveryEstimate = isPickup
    ? 'Vi giver dig besked, når din ordre er klar til afhentning.'
    : country === 'DK'
      ? 'Forventet levering: 1-3 hverdage.'
      : 'Forventet levering: 3-5 hverdage.'

  const shippingAmount = session.total_details?.amount_shipping ?? 0
  const subtotal = (session.amount_subtotal ?? 0)
  const orderNo = session.id.replace(/^cs_(test_|live_)?/, '').slice(0, 10).toUpperCase()

  return (
    <main className="bg-gray-50 min-h-screen py-12 sm:py-16">
      <ClearCart />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] mb-2">Tak for din ordre!</h1>
          <p className="text-gray-600">
            Vi har modtaget din betaling og går straks i gang. Du får også en bekræftelse på e-mail
            {cd?.email ? <> til <span className="font-semibold">{cd.email}</span></> : null}.
          </p>
          <p className="text-sm text-gray-400 mt-2">Ordrenr.: {orderNo}</p>
        </div>

        {/* Produkter */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <Package className="w-5 h-5 text-[#3aad4a]" />
            <h2 className="font-extrabold text-[#0a2540]">Din bestilling</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {items.map((li) => {
              const product = (li.price?.product as any) || {}
              const img = Array.isArray(product.images) ? product.images[0] : undefined
              return (
                <div key={li.id} className="flex items-center gap-4 py-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={li.description || 'Produkt'} className="w-full h-full object-contain p-1.5" />
                    ) : (
                      <Package className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 leading-tight">{li.description}</p>
                    <p className="text-sm text-gray-500 mt-0.5">Antal: {li.quantity}</p>
                  </div>
                  <p className="font-bold text-[#0a2540] shrink-0">{kr(li.amount_total)}</p>
                </div>
              )
            })}
          </div>
        </section>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Betaling */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="w-5 h-5 text-[#3aad4a]" />
              <h2 className="font-extrabold text-[#0a2540]">Betaling</h2>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold text-gray-900">{kr(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Fragt</span><span className="font-semibold text-gray-900">{shippingAmount > 0 ? kr(shippingAmount) : 'Gratis'}</span></div>
              <div className="flex justify-between items-baseline pt-3 mt-1 border-t border-gray-100">
                <span className="font-bold text-[#0a2540]">Betalt i alt</span>
                <span className="text-xl font-extrabold text-[#0a2540]">{kr(session.amount_total)}</span>
              </div>
              <p className="text-xs text-green-600 font-semibold pt-1">✓ Betaling gennemført</p>
            </div>
          </section>

          {/* Levering */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Truck className="w-5 h-5 text-[#3aad4a]" />
              <h2 className="font-extrabold text-[#0a2540]">Levering</h2>
            </div>
            <div className="text-sm space-y-2.5">
              <div>
                <p className="text-gray-500">Metode</p>
                <p className="font-semibold text-gray-900">{shippingName || 'Levering'}</p>
              </div>
              <p className="text-gray-700">{deliveryEstimate}</p>
              {!isPickup && addressStr && (
                <div className="flex items-start gap-2 pt-2 border-t border-gray-100 mt-2">
                  <MapPin className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-gray-500">Leveringsadresse</p>
                    <p className="font-semibold text-gray-900">{cd?.name ? `${cd.name}, ` : ''}{addressStr}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="text-center mt-10">
          <Link href="/shop" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all">
            Fortsæt med at handle <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">Spørgsmål til din ordre? Skriv til info@cleanwatersupply.dk</p>
        </div>
      </div>
    </main>
  )
}
