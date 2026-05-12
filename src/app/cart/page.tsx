'use client'

import { useCart } from '@/contexts/CartContext'
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck, CreditCard, CheckCircle2, Star, Award, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import RecommendedProducts from '@/components/RecommendedProducts'

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <CartPageContent />
    </Suspense>
  )
}

function CartPageContent() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const success = searchParams.get('success') === 'true'

  // Clear cart after successful payment
  useEffect(() => {
    if (success) clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  async function handleCheckout() {
    setCheckingOut(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          items: items.map(i => ({ stripeProductId: i.stripeProductId, quantity: i.quantity })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout-fejl')
      window.location.href = data.url
    } catch (e: any) {
      setError(e.message || 'Der opstod en fejl. Prøv igen.')
      setCheckingOut(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a2540] mb-3">Tak for din ordre!</h1>
          <p className="text-gray-600 mb-7">Vi har modtaget din betaling og sender en bekræftelsesmail til dig. Vi pakker og leverer din ordre hurtigst muligt.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3 rounded-full font-bold text-sm"
          >
            Tilbage til shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0a2540] mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Fortsæt med at handle
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540]">Din kurv</h1>
            <p className="text-gray-500 mt-2">{itemCount > 0 ? `${itemCount} produkter` : 'Tom'}</p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
              <ShoppingBag className="w-14 h-14 text-gray-200 mx-auto mb-5" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Din kurv er tom</h2>
              <p className="text-gray-500 mb-6">Find noget du kan lide i vores shop.</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3 rounded-full font-bold text-sm"
              >
                Gå til shop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items list */}
              <div className="lg:col-span-2 space-y-3">
                {items.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 items-start shadow-sm">
                    <div className="w-24 h-24 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/${item.id}`} className="block">
                        <h3 className="font-bold text-gray-900 hover:text-blue-700 transition-colors mb-1">{item.name}</h3>
                      </Link>
                      <p className="text-sm font-bold text-[#0a2540] mb-3">
                        {item.price.toLocaleString('da-DK')} kr
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center bg-gray-100 rounded-full">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-sm text-gray-400 hover:text-red-500 inline-flex items-center gap-1 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                          Fjern
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-extrabold text-[#0a2540]">
                        {(item.price * item.quantity).toLocaleString('da-DK')} kr
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-28">
                  <h2 className="text-lg font-extrabold text-[#0a2540] mb-5">Ordreoversigt</h2>

                  <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold text-gray-900">{subtotal.toLocaleString('da-DK')} kr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Fragt</span>
                      <span className="text-gray-400">Beregnes ved kassen</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-base font-bold text-[#0a2540]">Total</span>
                    <span className="text-2xl font-extrabold text-[#0a2540]">{subtotal.toLocaleString('da-DK')} kr</span>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20 mb-3"
                  >
                    {checkingOut ? 'Indlæser betaling...' : 'Til betaling'}
                    {!checkingOut && <ArrowRight className="w-4 h-4" />}
                  </button>

                  <p className="text-xs text-center text-gray-400 mb-5">Sikker betaling via Stripe</p>

                  <div className="space-y-2.5 pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ShieldCheck className="w-4 h-4 text-[#3aad4a] shrink-0" />
                      <span>Sikker SSL-kryptering</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Truck className="w-4 h-4 text-[#3aad4a] shrink-0" />
                      <span>Hurtig levering i hele DK</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CreditCard className="w-4 h-4 text-[#3aad4a] shrink-0" />
                      <span>Kort & MobilePay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── RECOMMENDED PRODUCTS (UPSELL) ───────────────────── */}
            <RecommendedProducts variant="grid" count={3} />

            {/* ─── SOCIAL PROOF / TRUST SECTION ────────────────────── */}
            <section className="mt-14 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-700">4,9 / 5</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0a2540] mb-2">Hvorfor handle hos Clean Water Supply?</h2>
                <p className="text-sm text-gray-500 max-w-xl mx-auto">
                  Vi er Danmarks specialist i vandhygiejne og har leveret pålidelige løsninger til hospitaler, hoteller og private hjem siden 2020.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-blue-700" />
                  </div>
                  <p className="text-2xl font-extrabold text-[#0a2540]">1.500+</p>
                  <p className="text-xs text-gray-500 mt-1">Tilfredse kunder i Danmark</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-5 h-5 text-emerald-700" />
                  </div>
                  <p className="text-2xl font-extrabold text-[#0a2540]">7 log</p>
                  <p className="text-xs text-gray-500 mt-1">Dokumenteret retention mod Legionella</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                  </div>
                  <p className="text-2xl font-extrabold text-[#0a2540]">ECHA</p>
                  <p className="text-xs text-gray-500 mt-1">Article 95 godkendt teknologi</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-5 h-5 text-violet-700" />
                  </div>
                  <p className="text-2xl font-extrabold text-[#0a2540]">24/7</p>
                  <p className="text-xs text-gray-500 mt-1">Online support & rådgivning</p>
                </div>
              </div>

              {/* Customer quote */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="flex justify-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed mb-4">
                    "Vi installerede Baclyser-filtre på alle brusere på vores hotel. Hurtig levering, professionel rådgivning og 100% tryghed for vores gæster."
                  </p>
                  <div>
                    <p className="font-bold text-sm text-[#0a2540]">Lars Nielsen</p>
                    <p className="text-xs text-gray-400">Driftsleder, Comwell Aarhus</p>
                  </div>
                </div>
              </div>
            </section>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
