'use client'

import { useCart } from '@/contexts/CartContext'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import RecommendedProducts from '@/components/RecommendedProducts'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [error, setError] = useState('')

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

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-[60] shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0a2540]" />
            <h2 className="text-lg font-extrabold text-[#0a2540]">Din kurv ({itemCount})</h2>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-1">Din kurv er tom</p>
              <p className="text-sm text-gray-400 mb-5">Tilføj produkter for at komme i gang</p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
              >
                Gå til shop
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 pb-4 mb-0 border-b border-gray-100 last:border-b-0">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} width={64} height={64} loading="lazy" decoding="async" className="w-full h-full object-contain p-1.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 leading-tight mb-1">{item.name}</p>
                    <p className="text-sm font-bold text-[#0a2540] mb-2">
                      {item.price.toLocaleString('da-DK')} kr
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center bg-gray-100 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Compact recommendations inside drawer */}
              <RecommendedProducts variant="compact" count={2} />
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3 bg-gray-50">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-xl font-extrabold text-[#0a2540]">
                {subtotal.toLocaleString('da-DK')} kr
              </span>
            </div>
            <p className="text-xs text-gray-400">Fragt og moms beregnes ved kassen.</p>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20"
            >
              {checkingOut ? 'Indlæser...' : 'Til betaling'}
              {!checkingOut && <ArrowRight className="w-4 h-4" />}
            </button>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 py-1"
            >
              Se hele kurven
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
