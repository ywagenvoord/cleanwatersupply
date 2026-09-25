'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, ArrowRight, ChevronDown } from 'lucide-react'

type Tier = 'blod' | 'middel' | 'haard'
type Zone = {
  area: string
  dh: string
  cat: string
  color: string
  advice: string
  tier: Tier
}
type Product = { name: string; price: number; img: string; href: string }

// Vejledende hårdhed pr. postnummer-område (regionalt estimat efter GEUS-mønster).
function lookup(pn: number): Zone | null {
  if (pn < 1000 || pn > 9999) return null
  if (pn <= 2999) return { area: 'København og omegn', dh: 'ca. 12–18 °dH', cat: 'Hårdt', color: '#f97316', tier: 'haard', advice: 'Hårdt vand – men flere værker (bl.a. HOFOR) blødgør i dag ned mod ~8–10 °dH. Et filter eller blødgøring mærkes tydeligt.' }
  if (pn <= 3699) return { area: 'Nordsjælland', dh: 'ca. 15–24 °dH', cat: 'Hårdt – meget hårdt', color: '#dc2626', tier: 'haard', advice: 'Noget af Danmarks hårdeste vand. Et blødgøringsanlæg betaler sig typisk hurtigt.' }
  if (pn <= 3799) return { area: 'Bornholm', dh: 'ca. 8–15 °dH', cat: 'Middel – temmelig hårdt', color: '#f5b301', tier: 'middel', advice: 'Varierer en del. Ved kalkgener kan et filter eller blødgøring være relevant.' }
  if (pn <= 4999) return { area: 'Sjælland, Lolland-Falster og Møn', dh: 'ca. 14–22 °dH', cat: 'Hårdt', color: '#f97316', tier: 'haard', advice: 'Hårdt vand med tydelige kalkgener. Blødgøring anbefales ofte.' }
  if (pn <= 5999) return { area: 'Fyn', dh: 'ca. 10–16 °dH', cat: 'Temmelig hårdt', color: '#f5b301', tier: 'middel', advice: 'Middel til hårdt vand. Kalk kan mærkes – et filter eller blødgøring hjælper.' }
  if (pn <= 6999) return { area: 'Sønderjylland og Sydvestjylland', dh: 'ca. 8–14 °dH', cat: 'Middel – temmelig hårdt', color: '#f5b301', tier: 'middel', advice: 'Middelhårdt vand. Blødgøring kan overvejes ved kalkgener.' }
  if (pn <= 7999) return { area: 'Vest- og Midtjylland', dh: 'ca. 5–10 °dH', cat: 'Blødt – middel', color: '#3aad4a', tier: 'blod', advice: 'Blødt til middelhårdt vand – kalk er sjældent et stort problem her.' }
  if (pn <= 8999) return { area: 'Østjylland (Aarhus-området)', dh: 'ca. 12–18 °dH', cat: 'Hårdt', color: '#f97316', tier: 'haard', advice: 'Hårdt vand med kalkgener. Blødgøring eller filter mærkes tydeligt.' }
  return { area: 'Nordjylland (Aalborg-området)', dh: 'ca. 8–15 °dH', cat: 'Middel – temmelig hårdt', color: '#f5b301', tier: 'middel', advice: 'Middel til temmelig hårdt vand. Ved kalkgener kan blødgøring være relevant.' }
}

const P = {
  blodgoring: { name: 'Blødgøringsanlæg 100M', price: 11250, img: '/images/blosgoringsanlaeg-100m.jpg', href: '/shop/blosgoringsanlaeg-100m' },
  brusehoved: { name: 'Brusehoved med vandfilter – komplet', price: 525, img: '/images/product-kalkbruser.jpg', href: '/shop/brusehoved-filter-acf' },
  germstop: { name: 'Germ-STOP filterkande', price: 399, img: '/images/kande-germ-stop.png', href: '/vandkander/mikroplastik-stop' },
  carmen: { name: 'Filterkande med udskifteligt filter', price: 189, img: '/images/kande-carmen-t.png', href: '/shop/kande-carmen' },
  vandhane: { name: 'Baclyser® neo TL (3M) – vandhanefilter', price: 625, img: '/images/baclyser-neo-tl.jpg', href: '/shop/baclyser-neo-tl-3m' },
} satisfies Record<string, Product>

const PRODUCTS: Record<Tier, Product[]> = {
  haard: [P.blodgoring, P.brusehoved, P.germstop],
  middel: [P.brusehoved, P.germstop, P.vandhane],
  blod: [P.germstop, P.carmen, P.brusehoved],
}

const TIER_HEADING: Record<Tier, string> = {
  haard: 'Anbefalet til hårdt vand',
  middel: 'Anbefalet til dit vand',
  blod: 'Anbefalet til blødt vand',
}

export default function PostnummerHaardhed() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<Zone | null>(null)
  const [error, setError] = useState('')
  const [showProducts, setShowProducts] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const pn = parseInt(value, 10)
    if (!/^\d{4}$/.test(value.trim()) || pn < 1000 || pn > 9999) {
      setResult(null)
      setError('Skriv et gyldigt dansk postnummer (4 cifre).')
      return
    }
    setError('')
    setShowProducts(true)
    setResult(lookup(pn))
  }

  return (
    <div className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-5 sm:p-7">
      <div className="flex items-center gap-2 mb-1.5">
        <MapPin className="w-5 h-5 text-[#284eff]" />
        <h3 className="text-lg font-extrabold text-[#0a2540]">Slå din vandhårdhed op på postnummer</h3>
      </div>
      <p className="text-sm text-gray-500 mb-5 leading-relaxed">
        Skriv dit postnummer, så viser vi et vejledende bud på hårdheden i dit område – og hvilke produkter der passer.
      </p>

      <form onSubmit={submit} className="flex gap-2.5 max-w-sm">
        <input
          inputMode="numeric"
          pattern="\d*"
          maxLength={4}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ''))}
          placeholder="fx 8000"
          aria-label="Postnummer"
          className="flex-1 rounded-xl ring-1 ring-blue-200 focus:ring-2 focus:ring-[#284eff] outline-none px-4 py-3 text-[#0a2540] font-semibold placeholder:text-gray-400 placeholder:font-normal"
        />
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-5 py-3 transition-colors">
          <Search className="w-4 h-4" /> Slå op
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

      {result && (
        <div className="mt-5 rounded-2xl ring-1 ring-blue-100 bg-blue-50/40 p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{result.area}</p>
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-sm shrink-0" style={{ backgroundColor: result.color }} />
            <span className="text-xl font-extrabold text-[#0a2540]">{result.dh}</span>
            <span className="text-sm font-bold text-gray-600">· {result.cat}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2.5 leading-relaxed">{result.advice}</p>

          {/* Produkt-dropdown */}
          <div className="mt-4 rounded-xl ring-1 ring-blue-100 bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setShowProducts((v) => !v)}
              aria-expanded={showProducts}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="font-bold text-[#0a2540] text-sm">{TIER_HEADING[result.tier]}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showProducts ? 'rotate-180 text-[#3aad4a]' : ''}`} />
            </button>
            {showProducts && (
              <div className="px-4 pb-4 grid sm:grid-cols-3 gap-2.5">
                {PRODUCTS[result.tier].map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="group flex items-center gap-3 rounded-xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 hover:shadow-sm transition-all p-2.5"
                  >
                    <span className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-white flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13px] font-bold text-[#0a2540] leading-snug group-hover:text-[#284eff] transition-colors">{p.name}</span>
                      <span className="block text-sm font-extrabold text-[#0a2540] mt-0.5">{p.price.toLocaleString('da-DK')} kr</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
            <Link href="/guides/vaelg-vandfilter" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] hover:gap-2.5 transition-all">
              Se alle løsninger <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://data.geus.dk/geusmap/?mapname=drikkevand&lang=da" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#284eff] hover:underline">
              Se præcis værdi hos GEUS
            </a>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Vejledende områdeestimat – den præcise hårdhed afhænger af dit lokale vandværk. Slå din nøjagtige
        adresse op på <a href="https://data.geus.dk/geusmap/?mapname=drikkevand&lang=da" target="_blank" rel="noopener noreferrer" className="text-[#284eff] hover:underline">GEUS' kort</a> eller hos dit vandværk.
        Data-grundlag: GEUS – Drikkevandets hårdhed i Danmark (2024), <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-[#284eff] hover:underline">CC BY 4.0</a>, bearbejdet.
      </p>
    </div>
  )
}
