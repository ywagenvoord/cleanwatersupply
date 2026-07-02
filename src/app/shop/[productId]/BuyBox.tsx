'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ArrowRight, ShoppingBag, Check, Phone, Wrench, MapPin, Plus, X, ChevronDown, Camera } from 'lucide-react'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe-products'
import { INSTALLATION_PRICE, type Product } from '@/lib/products'
import { zoneForPostnummer, ZONE_INFO } from '@/lib/zones'

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
  const [showZones, setShowZones]   = useState(false)
  const [postnummer, setPostnummer] = useState('')
  const [showTilbehor, setShowTilbehor] = useState(false)
  const zone = postnummer.length === 4 ? zoneForPostnummer(postnummer) : undefined
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
        sub={`Med standard montering (+${INSTALLATION_PRICE.toLocaleString('da-DK')} kr.)`}
        price={base + INSTALLATION_PRICE}
      />
      <div className="flex items-baseline justify-between pt-1 px-1">
        <span className="text-sm text-gray-500">I alt</span>
        <span className="text-xl font-extrabold text-[#0a2540]">{total.toLocaleString('da-DK')} kr</span>
      </div>
      <p className="text-xs text-gray-400 px-1">Montering tilbydes kun sammen med et af vores kalkanlæg.</p>
    </div>
  ) : null

  /* Info om kørsel + tilbehør (vises kun ved "Med montering") */
  const installInfo = (
    <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 space-y-3 text-sm">
      {/* Kørsel – postnummer-beregner */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 font-bold text-[#0a2540]">
            <MapPin className="w-4 h-4 text-[#3aad4a]" />
            Kørsel
          </div>
          <button
            type="button"
            onClick={() => setShowZones(true)}
            className="text-xs font-semibold text-[#3aad4a] hover:text-[#2e9a3d] underline underline-offset-2"
          >
            Se zoner
          </button>
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={postnummer}
          onChange={(e) => setPostnummer(e.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="Indtast postnummer for at se kørselspris"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]"
        />
        {postnummer.length === 4 && (
          zone ? (
            <div className="mt-2 flex items-center justify-between gap-2.5 rounded-lg bg-white border border-gray-200 px-3 py-2.5">
              <span className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ZONE_INFO[zone].color }} />
                <span className="font-bold text-gray-900">{ZONE_INFO[zone].label}</span>
              </span>
              <span className="font-semibold text-gray-900">{zone === 'bla' ? 'Inkluderet' : ZONE_INFO[zone].surcharge.toLocaleString('da-DK') + ' kr.'}</span>
            </div>
          ) : (
            <p className="mt-2 text-xs text-gray-500">Ukendt postnummer – vi oplyser din zone ved bestilling.</p>
          )
        )}
        <p className="text-xs text-gray-400 mt-1.5">Vejledende, ekskl. moms. Bekræftes ved bestilling.</p>
      </div>

      {/* Tilbehør – foldes ud */}
      <div className="border-t border-gray-200 pt-3">
        <button
          type="button"
          onClick={() => setShowTilbehor(v => !v)}
          className="flex items-center justify-between w-full font-bold text-[#0a2540]"
        >
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#3aad4a]" />
            Tilbehør (tilkøb)
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showTilbehor ? 'rotate-180' : ''}`} />
        </button>
        {showTilbehor && (
          <div className="mt-2.5">
            <ul className="space-y-1.5 text-gray-600">
              <li className="flex justify-between gap-3">
                <span>Forlængerslange 2 m (¾&quot;) – hvis anlægget står langt fra vandtilslutningen</span>
                <span className="font-semibold text-gray-900 whitespace-nowrap">495 kr./stk.</span>
              </li>
            </ul>
            <p className="text-xs text-gray-400 mt-1.5">Ekskl. moms. Aftales sammen med monteringen. Vægbeslag kan tilkøbes nedenfor.</p>
          </div>
        )}
      </div>
    </div>
  )

  /* Kontakt for info (anlæg uden online-køb) */
  if (product.quoteOnly) {
    return (
      <div className="space-y-3">
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-4 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg"
        >
          <Phone className="w-4 h-4" />
          Kontakt for info
        </Link>
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white py-3 px-6 rounded-full font-bold text-sm transition-all"
        >
          Få et uforpligtende tilbud
        </Link>
      </div>
    )
  }

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

  /* Pop op med zone-kort */
  const zoneModal = showZones ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={() => setShowZones(false)}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowZones(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          aria-label="Luk"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-extrabold text-[#0a2540] mb-1">Kørselszoner</h3>
        <p className="text-sm text-gray-500 mb-4">Blå zone er inkluderet. Grøn zone +750 kr. og rød zone +1.500 kr. (ekskl. moms).</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/zone-kort.png" alt="Kort over kørselszoner i Danmark" className="w-full h-auto rounded-xl" />
      </div>
    </div>
  ) : null

  /* Med montering valgt → bestilles via kontakt (kræver teknikerbesøg) */
  if (isSoftener && withInstall) {
    return (
      <div className="space-y-3">
        {zoneModal}
        {selector}
        {installInfo}
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-4 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20"
        >
          <Wrench className="w-4 h-4" />
          Bestil med montering – kontakt os
        </Link>
        <Link
          href="/montering"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#3aad4a] hover:text-[#2e9a3d] -mt-1"
        >
          <Camera className="w-3.5 h-3.5" />
          Send billede af monteringsstedet – få en pris
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
