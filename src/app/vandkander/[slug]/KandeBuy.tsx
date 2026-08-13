'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ArrowRight, ShoppingBag, Check, Loader2 } from 'lucide-react'

/* Køb direkte fra kande-siden: "Køb nu" (dynamisk Stripe Checkout) + "Tilføj til kurv". */
export default function KandeBuy({
  stripeProductId, name, price, image,
}: { stripeProductId: string; name: string; price: number; image?: string }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [buying, setBuying] = useState(false)

  function add() {
    addItem({ id: stripeProductId, stripeProductId, name, price, image: image ?? '' })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  async function buyNow() {
    if (buying) return
    setBuying(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ stripeProductId, quantity: 1 }] }),
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
        return
      }
      setBuying(false)
      alert(data.error || 'Kunne ikke starte betalingen. Prøv igen.')
    } catch {
      setBuying(false)
      alert('Kunne ikke oprette forbindelse. Prøv igen.')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8">
      <button
        onClick={buyNow}
        disabled={buying}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white font-bold px-8 py-4 text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
      >
        {buying ? (<><Loader2 className="w-4 h-4 animate-spin" /> Åbner betaling…</>) : (<>Køb nu <ArrowRight className="w-4 h-4" /></>)}
      </button>
      <button
        onClick={add}
        className={`inline-flex items-center justify-center gap-2 rounded-full border-2 font-semibold px-8 py-4 text-sm transition-all ${
          added ? 'border-[#3aad4a] bg-[#3aad4a]/5 text-[#3aad4a]' : 'border-gray-300 text-[#0a2540] hover:bg-gray-50'
        }`}
      >
        {added ? (<><Check className="w-4 h-4" /> Tilføjet til kurv</>) : (<><ShoppingBag className="w-4 h-4" /> Tilføj til kurv</>)}
      </button>
    </div>
  )
}
