'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { getStripe } from '@/lib/stripe-products'
import { ShoppingBag, Check } from 'lucide-react'

/* Lille "Tilføj til kurv"-knap til filter-tilkøb-kortene (kurven er client-side). */
export default function FilterAddToCart({
  id, name, price, image,
}: { id: string; name: string; price?: number; image?: string }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const stripe = getStripe(id)
  if (!stripe || price == null) return null

  function add() {
    if (!stripe || price == null) return
    addItem({ id, stripeProductId: stripe.productId, name, price, image: image ?? '' })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
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
  )
}
