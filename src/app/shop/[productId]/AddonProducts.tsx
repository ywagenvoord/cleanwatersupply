'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { getStripe } from '@/lib/stripe-products'
import { ShoppingBag, Check, Plus } from 'lucide-react'
import type { Product } from '@/lib/products'

export default function AddonProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Plus className="w-4 h-4 text-[#3aad4a]" />
        <h3 className="text-sm font-bold text-gray-900">Tilbehør – tilkøb til dit anlæg</h3>
      </div>
      <div className="space-y-3">
        {products.map(p => <AddonRow key={p.id} product={p} />)}
      </div>
    </div>
  )
}

function AddonRow({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const stripeProductId = product.stripeProductId ?? getStripe(product.id)?.productId
  const buyable = !!stripeProductId && product.price !== undefined

  function add() {
    if (!stripeProductId || product.price === undefined) return
    addItem({ id: product.id, stripeProductId, name: product.name, price: product.price, image: product.imgSrc })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.imgSrc}
        alt={product.name}
        className="w-16 h-16 rounded-lg object-contain bg-gray-50 border border-gray-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-snug">{product.name}</p>
        <p className="mt-0.5">
          <span className="text-base font-extrabold text-[#0a2540]">{product.price?.toLocaleString('da-DK')} kr</span>
          <span className="ml-1 text-[11px] font-medium text-gray-400">{product.priceExMoms ? 'ekskl. moms' : 'inkl. moms'}</span>
        </p>
      </div>
      {buyable ? (
        <button
          onClick={add}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white transition-all ${
            added ? 'bg-[#2e9a3d]' : 'bg-[#3aad4a] hover:bg-[#2e9a3d]'
          }`}
        >
          {added ? <><Check className="w-3.5 h-3.5" /> Tilføjet</> : <><ShoppingBag className="w-3.5 h-3.5" /> Tilføj</>}
        </button>
      ) : (
        <span className="shrink-0 text-xs font-semibold text-gray-400">Kontakt os</span>
      )}
    </div>
  )
}
