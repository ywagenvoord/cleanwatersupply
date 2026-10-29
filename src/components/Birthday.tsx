'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Gift, PartyPopper, ArrowRight, Cake } from 'lucide-react'
import {
  BIRTHDAY,
  BIRTHDAY_DISCOUNT,
  BIRTHDAY_OFFERS,
  BIRTHDAY_PREVIEW,
  birthdayPrice,
  isBirthdayDate,
} from '@/lib/birthday'

/**
 * True når fødselsdags-temaet skal vises:
 *  - på selve dagen (dato-styret), ELLER
 *  - i preview (?fodselsdag i URL'en, eller BIRTHDAY_PREVIEW = true).
 */
export function useBirthdayActive(): boolean {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const preview = BIRTHDAY_PREVIEW || params.has('fodselsdag')
    setActive(preview || isBirthdayDate())
  }, [])
  return active
}

/* ── Dannebrog der daler ned (ren CSS/SVG, let) ──────────── */
function DanishFlag({ w = 22 }: { w?: number }) {
  const h = Math.round((w * 28) / 37) // Dannebrog-forhold 37:28
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 37 28"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.25))' }}
    >
      <rect width="37" height="28" fill="#C8102E" />
      <rect x="12" y="0" width="5" height="28" fill="#FFFFFF" />
      <rect x="0" y="11.5" width="37" height="5" fill="#FFFFFF" />
    </svg>
  )
}

/**
 * Flag-regn over HELE siden – ét samlet, fast overlay, der daler ned fra
 * toppen og hele vejen ned over siden (følger med, når man scroller).
 * Vises kun når fødselsdags-temaet er aktivt.
 */
export function BirthdayFlagRain({ count = 34 }: { count?: number }) {
  const active = useBirthdayActive()
  if (!active) return null

  // Jævn fordeling over hele bredden + lille forskydning (deterministisk).
  const flags = Array.from({ length: count }, (_, i) => {
    const left = ((i + 0.5) / count) * 100 + (((i * 29) % 7) - 3)
    const delay = ((i * 23) % 100) / 10 // 0–10s, så det bliver en jævn, kontinuerlig strøm
    const dur = 6 + ((i * 7) % 60) / 10 // 6–12s
    const size = 16 + (i % 4) * 5 // 16–31px
    return { left: Math.max(0, Math.min(98, left)), delay, dur, size, i }
  })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {flags.map((f) => (
        <span
          key={f.i}
          className="flag-rain-piece"
          style={{
            left: `${f.left}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.dur}s`,
          }}
        >
          <DanishFlag w={f.size} />
        </span>
      ))}
    </div>
  )
}

/* ── Topbånd (tynd festlig bjælke) ───────────────────────── */
export function BirthdayRibbon() {
  const active = useBirthdayActive()
  if (!active) return null

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#C8102E] via-[#e2213a] to-[#C8102E] text-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-x-3 gap-y-1 flex-wrap text-center">
        <PartyPopper className="w-4 h-4 shrink-0 text-white" />
        <span className="text-sm font-extrabold">
          Vi fylder {BIRTHDAY.years} år! Spar {BIRTHDAY_DISCOUNT.percent}% på filterkander &amp; vandkande-filtre – kun i dag
        </span>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-bold underline underline-offset-2"
        >
          Se tilbud
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

/* ── Fødselsdags-pris til produktsider ───────────────────────
 * Overtager hele prisvisningen:
 *  - fødselsdag aktiv → stor rød nypris + lille overstreget normalpris + "Kun i dag"
 *  - ellers           → normal pris (navy)
 * `meta` er den lille tekst efter prisen (fx "inkl. moms · Varenr. X").
 */
export function BirthdayPrice({ price, meta }: { price?: number | null; meta?: ReactNode }) {
  const active = useBirthdayActive()
  if (price == null) return null

  if (!active) {
    return (
      <div className="mt-6 flex items-baseline flex-wrap gap-x-2 gap-y-1">
        <span className="text-3xl font-extrabold text-[#0a2540]">{price.toLocaleString('da-DK')} kr</span>
        {meta}
      </div>
    )
  }

  const ny = birthdayPrice(price)
  return (
    <div className="mt-6">
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
        <span className="text-3xl font-black text-[#C8102E] leading-none">
          {ny.toLocaleString('da-DK')} kr
        </span>
        <span className="text-base font-semibold text-gray-400 line-through">
          {price.toLocaleString('da-DK')} kr
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#C8102E] text-white text-xs font-black px-2.5 py-1 shadow-sm">
          <Gift className="w-3.5 h-3.5" /> Kun i dag
        </span>
      </div>
      <p className="mt-1.5 text-sm text-gray-400">Fødselsdagstilbud −{BIRTHDAY_DISCOUNT.percent}% · {meta}</p>
    </div>
  )
}

/* ── Lille rabat-badge (kategori-kort) ───────────────────── */
export function BirthdayDealBadge() {
  const active = useBirthdayActive()
  if (!active) return null
  return (
    <span
      className="pointer-events-none absolute right-2 top-2 z-10 flex flex-col items-center leading-none rounded-xl bg-[#C8102E] text-white px-2.5 py-1.5 shadow-lg ring-2 ring-white"
      aria-hidden="true"
    >
      <span className="text-[8px] font-bold uppercase tracking-wider">Fødselsdag</span>
      <span className="text-base font-black">−{BIRTHDAY_DISCOUNT.percent}%</span>
    </span>
  )
}

/* ── Fødselsdags-tilbud (sektion på forsiden) ────────────── */
export function BirthdayOffers() {
  const active = useBirthdayActive()
  if (!active) return null

  return (
    <section
      id="fodselsdag"
      className="relative overflow-hidden py-14 sm:py-20 bg-[#E30613] bg-gradient-to-br from-[#E30613] via-[#E30613] to-[#C8102E] text-white scroll-mt-24"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C8102E]">
          <Cake className="w-4 h-4" /> Clean Water Supply fylder {BIRTHDAY.years} år
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 sm:gap-5">
          <span className="text-6xl sm:text-8xl font-black leading-none text-white drop-shadow">
            {BIRTHDAY.years}
          </span>
          <span className="text-left text-2xl sm:text-4xl font-black leading-tight">
            ÅRS
            <br />
            FØDSELSDAG
          </span>
        </div>

        <h2 className="mt-6 text-3xl sm:text-5xl font-black">
          Spar{' '}
          <span className="text-white underline decoration-white/40 decoration-4 underline-offset-4">
            {BIRTHDAY_DISCOUNT.percent}%
          </span>{' '}
          i dag
        </h2>
        <p className="mt-3 text-white/90 text-base sm:text-lg max-w-xl mx-auto">
          Vi fejrer {BIRTHDAY.years} år! Få {BIRTHDAY_DISCOUNT.percent}% på{' '}
          <span className="font-bold text-white">alle filterkander og vandkande-filtre</span> –{' '}
          <span className="font-bold text-white">kun i dag, {BIRTHDAY.dateLabel}</span>.
        </p>

        {/* Rullende karrusel af små Laica-bokse med −30 %-priser */}
        <div className="birthday-marquee-mask mt-10 relative overflow-hidden">
          <div className="birthday-marquee flex w-max gap-4 sm:gap-5">
            {[...BIRTHDAY_OFFERS, ...BIRTHDAY_OFFERS].map((o, i) => {
              const nyPris = birthdayPrice(o.price)
              return (
                <Link
                  key={`${o.name}-${i}`}
                  href={o.href}
                  className="group shrink-0 w-40 rounded-2xl bg-white text-[#0a2540] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative flex items-center justify-center bg-gradient-to-b from-sky-50 to-white pt-5 pb-3">
                    <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 shadow ring-1 ring-white">
                      <Gift className="w-3 h-3" /> −{BIRTHDAY_DISCOUNT.percent}%
                    </span>
                    {/* Fast kvadrat – samme billedstørrelse på alle produkter */}
                    <div className="h-24 w-24 flex items-center justify-center">
                      <img
                        src={o.img}
                        alt={o.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="px-3 py-3 text-left">
                    <h3 className="text-xs font-bold leading-snug line-clamp-1">{o.name}</h3>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-base font-black text-[#C8102E]">
                        {nyPris.toLocaleString('da-DK')} kr
                      </span>
                      <span className="text-[11px] text-gray-400 line-through">
                        {o.price.toLocaleString('da-DK')} kr
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Kategori-knapper */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {BIRTHDAY_DISCOUNT.categories.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-white text-[#0a2540] font-bold px-6 py-3.5 shadow-xl hover:bg-[#ffe9ec] transition-colors"
            >
              <Gift className="w-4 h-4 text-[#C8102E]" />
              Se alle {c.label.toLowerCase()}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/70">
          Tilbuddet gælder kun {BIRTHDAY.dateLabel}. Rabatten trækkes automatisk i kurven.
        </p>
      </div>
    </section>
  )
}
