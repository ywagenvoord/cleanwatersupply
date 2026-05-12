'use client'

import { useCart } from '@/contexts/CartContext'
import { getRecommendations } from '@/lib/recommendations'
import { getStripe } from '@/lib/stripe-products'
import { Sparkles, Plus, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

type Variant = 'compact' | 'grid'

export default function RecommendedProducts({
  variant = 'grid',
  count = 3,
}: {
  variant?: Variant
  count?: number
}) {
  const { items, addItem } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  if (items.length === 0) return null

  const recs = getRecommendations(items.map(i => i.id), count)
  if (recs.length === 0) return null

  function handleAdd(productId: string) {
    const product = recs.find(r => r.id === productId)
    if (!product || !product.price) return
    const stripe = getStripe(productId)
    if (!stripe) return
    addItem({
      id:              product.id,
      stripeProductId: stripe.productId,
      name:            product.name,
      price:           product.price,
      image:           product.imgSrc,
    })
    setAddedId(productId)
    setTimeout(() => setAddedId(null), 1200)
  }

  if (variant === 'compact') {
    return (
      <div className="border-t border-gray-100 pt-4 mt-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#3aad4a]" />
          <p className="text-xs font-bold text-[#0a2540] uppercase tracking-wide">Glemmer du noget?</p>
        </div>
        <div className="space-y-2">
          {recs.slice(0, 2).map(p => (
            <div key={p.id} className="flex gap-3 items-center bg-gray-50 rounded-xl p-2.5">
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden">
                <img src={p.imgSrc} alt={p.name} width={48} height={48} loading="lazy" decoding="async" className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/shop/${p.id}`} className="block">
                  <p className="font-semibold text-xs text-gray-900 leading-tight truncate hover:text-blue-700 transition-colors">{p.name}</p>
                </Link>
                <p className="text-xs font-bold text-[#0a2540]">{p.price?.toLocaleString('da-DK')} kr</p>
              </div>
              <button
                onClick={() => handleAdd(p.id)}
                className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                  addedId === p.id
                    ? 'bg-[#3aad4a] text-white'
                    : 'bg-white border-2 border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white'
                }`}
                aria-label="Tilføj"
              >
                {addedId === p.id ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Grid variant for /cart page
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#3aad4a]/10 text-[#3aad4a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Anbefales til dig
          </div>
          <h2 className="text-2xl font-extrabold text-[#0a2540]">Andre kunder købte også</h2>
          <p className="text-sm text-gray-500 mt-1">Kompletér dit køb med disse anbefalede produkter.</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recs.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
            <Link href={`/shop/${p.id}`} className="block">
              <div className="h-36 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
                <img src={p.imgSrc} alt={p.name} width={300} height={144} loading="lazy" decoding="async" className="h-full w-full object-contain hover:scale-105 transition-transform duration-300" />
              </div>
            </Link>
            <div className="p-4 flex flex-col flex-1">
              <Link href={`/shop/${p.id}`}>
                <h3 className="font-bold text-sm text-gray-900 hover:text-blue-700 transition-colors mb-1 leading-tight">{p.name}</h3>
              </Link>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2 flex-1">{p.tagline}</p>
              <div className="flex items-center justify-between gap-2 mt-auto">
                <p className="text-base font-extrabold text-[#0a2540]">{p.price?.toLocaleString('da-DK')} kr</p>
                <button
                  onClick={() => handleAdd(p.id)}
                  className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                    addedId === p.id
                      ? 'bg-[#3aad4a] text-white'
                      : 'bg-[#0a2540] text-white hover:bg-[#3aad4a]'
                  }`}
                >
                  {addedId === p.id ? (
                    <><Check className="w-3 h-3" /> Tilføjet</>
                  ) : (
                    <><Plus className="w-3 h-3" /> Tilføj</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
