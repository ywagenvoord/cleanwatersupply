'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ArrowRight, ShoppingBag, Check, Phone } from 'lucide-react'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe-products'
import type { Product } from '@/lib/products'

export default function BuyBox({ product }: { product: Product }) {
  const { addItem, setOpen } = useCart()
  const [added, setAdded]   = useState(false)
  const stripe = getStripe(product.id)
  const buyable = stripe && !product.comingSoon && product.price !== undefined

  function handleAdd() {
    if (!stripe || !product.price) return
    addItem({
      id:              product.id,
      stripeProductId: stripe.productId,
      name:            product.name,
      price:           product.price,
      image:           product.imgSrc,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (!buyable) {
    // Coming soon or no Stripe link
    return (
      <div className="space-y-3">
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-4 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg"
        >
          <Phone className="w-4 h-4" />
          {product.comingSoon ? 'Forhåndsbestil – kontakt os' : 'Bestil – kontakt os'}
        </Link>
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white py-3 px-6 rounded-full font-bold text-sm transition-all"
        >
          Få et gratis tilbud
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <a
        href={stripe!.paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-4 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20"
      >
        Køb nu
        <ArrowRight className="w-4 h-4" />
      </a>
      <button
        onClick={handleAdd}
        className={`w-full inline-flex items-center justify-center gap-2 border-2 py-3 px-6 rounded-full font-bold text-sm transition-all ${
          added
            ? 'border-[#3aad4a] bg-[#3aad4a]/5 text-[#3aad4a]'
            : 'border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white'
        }`}
      >
        {added ? (
          <><Check className="w-4 h-4" /> Tilføjet til kurv</>
        ) : (
          <><ShoppingBag className="w-4 h-4" /> Tilføj til kurv</>
        )}
      </button>
    </div>
  )
}
