'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { getStripe } from '@/lib/stripe-products'
import { stockFor } from '@/lib/stock'
import { ShoppingBag, Check, Minus, Plus } from 'lucide-react'

/* Lille "Tilføj til kurv"-knap til filter-tilkøb-kortene (kurven er client-side). */
export default function FilterAddToCart({
  id, name, price, image,
}: { id: string; name: string; price?: number; image?: string }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const stripe = getStripe(id)
  const stock = stockFor({ id, name })
  if (stock) {
    return (
      <div className="w-full text-center">
        <span className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
          Udsolgt
        </span>
        <p className="mt-1 text-xs font-semibold text-red-600">Forventet på lager igen {stock.restockLabel}</p>
      </div>
    )
  }
  if (!stripe || price == null) return null

  function add() {
    if (!stripe || price == null) return
    addItem({ id, stripeProductId: stripe.productId, name, price, image: image ?? '' }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3 mb-2.5">
        <button
          type="button"
          aria-label="Færre"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className="w-8 h-8 rounded-full ring-1 ring-gray-200 bg-white text-[#0a2540] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center text-sm font-extrabold text-[#0a2540] tabular-nums">{qty}</span>
        <button
          type="button"
          aria-label="Flere"
          onClick={() => setQty((q) => Math.min(20, q + 1))}
          className="w-8 h-8 rounded-full ring-1 ring-gray-200 bg-white text-[#0a2540] flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={add}
        className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm transition-all ${
          added
            ? 'bg-[#3aad4a]/10 text-[#2e9a3d] ring-1 ring-[#3aad4a]'
            : 'bg-[#3aad4a] hover:bg-[#2e9a3d] text-white hover:shadow-lg hover:shadow-green-500/20'
        }`}
      >
        {added ? (<><Check className="w-4 h-4" /> Tilføjet til kurv</>) : (<><ShoppingBag className="w-4 h-4" /> Tilføj til kurv</>)}
      </button>
    </div>
  )
}
