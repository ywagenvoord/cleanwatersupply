'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useCart } from '@/contexts/CartContext'
import { ArrowRight, ShoppingBag, Check, Phone, Wrench, MapPin, Plus, X, ChevronDown, Camera, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe-products'
import { INSTALLATION_PRICE, shopPrice, getProduct, type Product } from '@/lib/products'
import { useB2bLoggedIn } from '@/lib/useB2b'
import { zoneForPostnummer, ZONE_INFO } from '@/lib/zones'
import { isGratisMonteringActive } from '@/lib/campaign'
import { stockFor } from '@/lib/stock'

/* ─── Montering-valg (radio) ─────────────────────────────────────── */
function OptionCard({
  selected, onClick, title, sub, price, oldPrice, badge,
}: { selected: boolean; onClick: () => void; title: string; sub: string; price: number; oldPrice?: number; badge?: string }) {
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
        <span className="flex items-center gap-2 text-sm font-bold text-gray-900">
          {title}
          {badge && <span className="inline-block rounded-full bg-[#3aad4a] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">{badge}</span>}
        </span>
        <span className="block text-xs text-gray-500">{sub}</span>
      </span>
      <span className="shrink-0 text-right">
        {oldPrice !== undefined && (
          <span className="block text-xs text-gray-400 line-through">{oldPrice.toLocaleString('da-DK')} kr</span>
        )}
        <span className="text-sm font-extrabold text-[#0a2540]">{price.toLocaleString('da-DK')} kr</span>
      </span>
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
  const [buying, setBuying] = useState(false)
  const [showUpsell, setShowUpsell] = useState(false)
  const [chosen, setChosen] = useState<Set<string>>(new Set())
  const zone = postnummer.length === 4 ? zoneForPostnummer(postnummer) : undefined
  const erhverv = useB2bLoggedIn()
  const { amount: unitPrice } = shopPrice(product, erhverv)
  // Foretræk live Stripe-id (sat af fetchProduct via cws_id-match) over statisk mapping,
  // så nye Stripe-produkter er købbare uden at skulle tilføjes i STRIPE_MAPPING.
  const stripe  = getStripe(product.id)
  const stripeProductId = product.stripeProductId ?? stripe?.productId
  const stock = stockFor(product)
  const soldOut = !!product.soldOut || !!stock
  const restockLabel = product.restockLabel ?? stock?.restockLabel
  const buyable = !!stripeProductId && !product.comingSoon && unitPrice !== undefined && !soldOut
  const isSoftener = product.category === 'blosgoringsanlaeg'
  const showInstall = isSoftener || !!product.showInstallation
  const base  = unitPrice ?? 0
  const monteringGratis = showInstall && isGratisMonteringActive()
  const installCost = monteringGratis ? 0 : INSTALLATION_PRICE
  const total = base + (showInstall && withInstall ? installCost : 0)

  function handleAdd() {
    if (!stripeProductId || unitPrice == null) return
    addItem({
      id:              product.id,
      stripeProductId: stripeProductId,
      name:            product.name,
      price:           unitPrice,
      image:           product.imgSrc,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  // Filtre der kan tilbydes som "Tilføj også" ved køb (upsell)
  const upsell = (product.compatibleFilters ?? [])
    .map((id) => {
      const p = getProduct(id)
      const s = getStripe(id)
      return p && s
        ? {
            id, name: p.name, price: p.price ?? 0, img: p.imgSrc, stripeProductId: s.productId,
            blurb: p.removes ?? p.tagline ?? '',
            pack: p.specs.find((sp) => sp.label === 'Pakke')?.value ?? '',
          }
        : null
    })
    .filter((x): x is { id: string; name: string; price: number; img: string; stripeProductId: string; blurb: string; pack: string } => !!x)

  function toggleUpsell(id: string) {
    setChosen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  // "Køb nu": har produktet tilbehør, så vis upsell-pop-up først – ellers direkte til betaling.
  function startBuy() {
    if (upsell.length > 0) { setShowUpsell(true); return }
    buyNow()
  }

  // Køb nu → dynamisk Stripe Checkout med den AKTUELLE pris (aldrig et dødt link).
  async function buyNow(extraStripeIds: string[] = []) {
    if (!stripeProductId || unitPrice == null || buying) return
    setBuying(true)
    try {
      const items = [
        { stripeProductId: stripeProductId, quantity: 1 },
        ...extraStripeIds.map((id) => ({ stripeProductId: id, quantity: 1 })),
      ]
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items }),
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

  /* Montering-vælger (kalkanlæg + produkter med montering, med pris) */
  const selector = showInstall && buyable ? (
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
        sub={monteringGratis
          ? `Standard montering – normalt ${INSTALLATION_PRICE.toLocaleString('da-DK')} kr.`
          : `Med standard montering (+${INSTALLATION_PRICE.toLocaleString('da-DK')} kr.)`}
        price={base + installCost}
        oldPrice={monteringGratis ? base + INSTALLATION_PRICE : undefined}
        badge={monteringGratis ? 'Gratis nu' : undefined}
      />
      {monteringGratis && (
        <p className="text-xs text-[#3aad4a] font-semibold px-1">
          🎉 Gratis montering i kampagneperioden – du sparer {INSTALLATION_PRICE.toLocaleString('da-DK')} kr. Kørsel tillægges fortsat uden for blå zone.
        </p>
      )}
      <div className="flex items-baseline justify-between pt-1 px-1">
        <span className="text-sm text-gray-500">I alt</span>
        <span className="text-xl font-extrabold text-[#0a2540]">{total.toLocaleString('da-DK')} kr</span>
      </div>
      <p className="text-xs text-gray-400 px-1">Montering tilbydes kun sammen med {isSoftener ? 'et af vores kalkanlæg' : 'et filterhus hos os'}.</p>
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
              {isSoftener ? (
                <li className="flex justify-between gap-3">
                  <span>Forlængerslange 2 m (¾&quot;) – hvis anlægget står langt fra vandtilslutningen</span>
                  <span className="font-semibold text-gray-900 whitespace-nowrap">495 kr./stk.</span>
                </li>
              ) : (
                <li className="flex justify-between gap-3">
                  <span>Bypass-ventil – gør senere filterskift nemt uden at lukke for vandet</span>
                  <span className="font-semibold text-gray-900 whitespace-nowrap">Kontakt os</span>
                </li>
              )}
            </ul>
            <p className="text-xs text-gray-400 mt-1.5">Ekskl. moms. Aftales sammen med monteringen.{isSoftener ? ' Vægbeslag kan tilkøbes nedenfor.' : ''}</p>
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

  /* Midlertidigt udsolgt */
  if (soldOut) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 font-bold text-xs px-2.5 py-1 ring-1 ring-red-200">Udsolgt</span>
        {restockLabel && <span className="text-xs text-gray-500">på lager igen {restockLabel}</span>}
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
  if (showInstall && withInstall) {
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
          {added ? (<><Check className="w-4 h-4" /> Tilføjet til kurv</>) : (<><ShoppingBag className="w-4 h-4" /> Tilføj kun {isSoftener ? 'anlægget' : 'filterhuset'} til kurv</>)}
        </button>
        <p className="text-xs text-gray-400 text-center">Montering kræver et kort tjek af adresse og forhold – derfor bestilles den via kontakt.</p>
      </div>
    )
  }

  /* Standard (uden montering / ikke-anlæg) */
  const chosenSum = upsell.filter((u) => chosen.has(u.id)).reduce((a, u) => a + u.price, 0)
  const grandTotal = (unitPrice ?? 0) + chosenSum
  const upsellModal = showUpsell && typeof document !== 'undefined' ? createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={() => { if (!buying) setShowUpsell(false) }}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowUpsell(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          aria-label="Luk"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#3aad4a] mb-2">Gør det komplet</span>
        <h3 className="text-xl font-extrabold text-[#0a2540] mb-1.5">Vil du tilføje ekstra filtre?</h3>
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
          Læg filtre der passer til <span className="font-semibold text-[#0a2540]">{product.name}</span> i samme ordre – så er du{' '}
          <span className="font-bold text-[#3aad4a]">dækket fra start</span> og{' '}
          <span className="font-bold text-[#284eff]">sparer en ekstra levering</span>.
        </p>
        <div className="space-y-2.5">
          {upsell.map((u) => {
            const on = chosen.has(u.id)
            const qty = u.pack.match(/\d+/)?.[0]
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => toggleUpsell(u.id)}
                className={`w-full flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all ${on ? 'border-[#3aad4a] bg-[#3aad4a]/5' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="w-14 h-14 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center p-1.5">
                  {u.img ? <img src={u.img} alt={u.name} className="max-h-full max-w-full object-contain" /> : <ShoppingBag className="w-5 h-5 text-gray-300" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#0a2540] leading-tight">{u.name}</p>
                  {u.blurb && <p className="text-xs text-gray-500 mt-0.5 leading-snug">{u.blurb}</p>}
                  {qty && (
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-extrabold text-[#2e9a3d] bg-[#3aad4a]/10 rounded-full px-2 py-0.5">
                      <Check className="w-3 h-3" /> Pakken indeholder {qty}× filter
                    </span>
                  )}
                  <p className={`text-sm mt-1.5 font-bold ${on ? 'text-[#2e9a3d]' : 'text-[#284eff]'}`}>{on ? '+ ' : ''}{u.price.toLocaleString('da-DK')} kr</p>
                </div>
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${on ? 'border-[#3aad4a] bg-[#3aad4a] text-white' : 'border-gray-300 text-transparent'}`}>
                  <Check className="w-4 h-4" />
                </span>
              </button>
            )
          })}
        </div>
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 mt-5 mb-4 space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{product.name}</span>
            <span className="font-semibold text-[#0a2540]">{(unitPrice ?? 0).toLocaleString('da-DK')} kr</span>
          </div>
          {chosenSum > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#2e9a3d] font-medium">Tilbehør ({chosen.size} valgt)</span>
              <span className="font-bold text-[#2e9a3d]">+ {chosenSum.toLocaleString('da-DK')} kr</span>
            </div>
          )}
          <div className="flex items-baseline justify-between pt-2 border-t border-gray-200">
            <span className="text-sm font-bold text-[#0a2540]">I alt</span>
            <span className="text-2xl font-extrabold text-[#0a2540]">{grandTotal.toLocaleString('da-DK')} kr</span>
          </div>
        </div>
        <button
          onClick={() => buyNow(Array.from(chosen))}
          disabled={buying}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white py-4 px-6 rounded-full font-bold text-sm transition-all"
        >
          {buying ? (<><Loader2 className="w-4 h-4 animate-spin" /> Åbner betaling…</>) : (<>Fortsæt til betaling <ArrowRight className="w-4 h-4" /></>)}
        </button>
        <button
          onClick={() => buyNow([])}
          disabled={buying}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-3 disabled:opacity-60"
        >
          Nej tak – fortsæt uden tilbehør
        </button>
      </div>
    </div>,
    document.body,
  ) : null

  return (
    <div className="space-y-3">
      {upsellModal}
      {selector}
      <button
        onClick={startBuy}
        disabled={buying}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white py-4 px-6 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20"
      >
        {buying ? (<><Loader2 className="w-4 h-4 animate-spin" /> Åbner betaling…</>) : (<>Køb nu <ArrowRight className="w-4 h-4" /></>)}
      </button>
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
