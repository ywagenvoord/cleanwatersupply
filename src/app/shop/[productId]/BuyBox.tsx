'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ArrowRight, ShoppingBag, Check, Phone, Wrench } from 'lucide-react'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe-products'
import { INSTALLATION_PRICE, type Product } from '@/lib/products'

/* ─── Montering-valg (radio) ─────────────────────────────────────── */
function OptionCard({
  selected, onClick, title, sub, price,
}: { selected: boolean; onClick: () => void; title: string; sub: string; price: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all ${
        selected ? 'border-[#3aad4a] bg-[#3aad4a]/5' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? 'border-[#3aad4a]' : 'border-gray-300'}`}>
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#3aad4a]" />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-bold text-gray-900">{title}</span>
        <span className="block text-xs text-gray-500">{sub}</span>
      </span>
      <span className="text-sm font-extrabold text-[#0a2540] shrink-0">{price.toLocaleString('da-DK')} kr</span>
    </button>
  )
}

export default function BuyBox({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded]           = useState(false)
  const [withInstall, setWithInstall] = useState(true)
  const stripe  = getStripe(product.id)
  const buyable = stripe && !product.comingSoon && product.price !== undefined
  const isSoftener = product.category === 'blosgoringsanlaeg'
  const base  = product.price ?? 0
  const total = base + (isSoftener && withInstall ? INSTALLATION_PRICE : 0)

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

  /* Montering-vælger (kun blødgøringsanlæg med pris) */
  const selector = isSoftener && buyable ? (
    <div className="space-y-2 mb-4">
      <OptionCard
        selected={!withInstall}
        onClick={() => setWithInstall(false)}
        title="Uden montering"
        sub="Du monterer selv"
        price={base}
      />
      <OptionCard
        selected={withInstall}
        onClick={() => setWithInstall(true)}
        title="Med montering"
        sub={`Vi monterer anlægget (+${INSTALLATION_PRICE.toLocaleString('da-DK')} kr.)`}
        price={base + INSTALLATION_PRICE}
      />
      <div className="flex items-baseline justify-between pt-1 px-1">
        <span className="text-sm text-gray-500">I alt</span>
        <span className="text-xl font-extrabold text-[#0a2540]">{total.toLocaleString('da-DK')} kr</span>
      </div>
      <p className="text-xs text-gray-400 px-1">Montering tilbydes kun sammen med et af vores kalkanlæg.</p>
    </div>
  ) : null

  /* Ikke købbar online (kommer snart / intet betalingslink) */
  if (!buyable) {
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

  /* Med montering valgt → bestilles via kontakt (kræver teknikerbesøg) */
  if (isSoftener && withInstall) {
    return (
      <div className="space-y-3">
        {selector}
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-4 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20"
        >
          <Wrench className="w-4 h-4" />
          Bestil med montering – kontakt os
        </Link>
        <button
          onClick={handleAdd}
          className={`w-full inline-flex items-center justify-center gap-2 border-2 py-3 px-6 rounded-full font-bold text-sm transition-all ${
            added ? 'border-[#3aad4a] bg-[#3aad4a]/5 text-[#3aad4a]' : 'border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white'
          }`}
        >
          {added ? (<><Check className="w-4 h-4" /> Tilføjet til kurv</>) : (<><ShoppingBag className="w-4 h-4" /> Tilføj kun anlægget til kurv</>)}
        </button>
        <p className="text-xs text-gray-400 text-center">Montering kræver et kort tjek af adresse og forhold – derfor bestilles den via kontakt.</p>
      </div>
    )
  }

  /* Standard (uden montering / ikke-anlæg) */
  return (
    <div className="space-y-3">
      {selector}
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
