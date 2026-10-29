'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Tag, Clock } from 'lucide-react'
import {
  BLACK_MONTH,
  BLACK_MONTH_PREVIEW,
  BLACK_CATEGORIES,
  BLACK_MAX,
  isBlackMonthDate,
  isBlackMonthActive,
  blackPercentFor,
} from '@/lib/blackmonth'
import { isBirthdayDate } from '@/lib/birthday'

const GOLD = '#E8B64C'

/** True når Black Month-temaet skal vises (og fødselsdagen IKKE kører). */
export function useBlackMonthActive(): boolean {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let preview = BLACK_MONTH_PREVIEW
    try {
      if (params.has('blackmonth')) {
        sessionStorage.setItem('cws-preview-blackmonth', '1')
        preview = true
      } else if (sessionStorage.getItem('cws-preview-blackmonth') === '1') {
        preview = true
      }
    } catch {}
    const on = preview || isBlackMonthDate()
    // Fødselsdagen har forrang
    setActive(on && !isBirthdayDate())
  }, [])
  return active
}

/** Rabatprocent for en kategori, kun når Black Month er aktiv (ellers 0). */
export function useBlackDealPercent(category?: string): number {
  const active = useBlackMonthActive()
  return active ? blackPercentFor(category) : 0
}

/* ── Nedtælling til kampagnens slut ──────────────────────── */
function useCountdown(to: Date) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  if (!now) return null
  const diff = Math.max(0, to.getTime() - now.getTime())
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  }
}
const pad = (n: number) => String(n).padStart(2, '0')

/* ── Guld- & sølv-konfetti (daler ned i rask tempo) ──────── */
const CONFETTI_COLORS = ['#E8B64C', '#F4D27A', '#D4AF37', '#C9962E', '#E8EAEE', '#C0C4CC', '#FFFFFF', '#AAB0B8']
export function BlackMonthConfetti({ count = 50 }: { count?: number }) {
  const active = useBlackMonthActive()
  if (!active) return null
  const pieces = Array.from({ length: count }, (_, i) => {
    const left = (i * 53) % 100
    const delay = ((i * 7) % 24) / 10 // 0–2.4s – tæt, kontinuerlig strøm
    const dur = 1.8 + ((i * 11) % 18) / 10 // 1.8–3.5s – rask tempo
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
    const size = 6 + (i % 4) * 2 // 6–12px
    const round = i % 4 === 0
    return { left, delay, dur, color, size, round, i }
  })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.6,
            background: p.color,
            borderRadius: p.round ? '9999px' : '1px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Guld-fyrværkeri (spræng fra flere steder) ───────────── */
export function BlackMonthFireworks() {
  const active = useBlackMonthActive()
  if (!active) return null
  const origins = [
    { l: 14, t: 28, d: 0, c: '#E8B64C' },
    { l: 48, t: 16, d: 0.7, c: '#F4D27A' },
    { l: 84, t: 30, d: 1.3, c: '#FFFFFF' },
    { l: 28, t: 60, d: 2.0, c: '#D4AF37' },
    { l: 70, t: 64, d: 2.6, c: '#E8B64C' },
    { l: 58, t: 44, d: 3.2, c: '#F4D27A' },
  ]
  const SPARKS = 12
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {origins.map((o, oi) => (
        <div key={oi} className="absolute" style={{ left: `${o.l}%`, top: `${o.t}%` }}>
          {Array.from({ length: SPARKS }).map((_, i) => {
            const ang = (i / SPARKS) * 2 * Math.PI
            const r = 44 + (i % 3) * 12
            const dx = Math.cos(ang) * r
            const dy = Math.sin(ang) * r
            return (
              <span
                key={i}
                className="fw-spark"
                style={{
                  background: o.c,
                  boxShadow: `0 0 8px ${o.c}`,
                  // @ts-expect-error CSS custom properties
                  '--dx': `${dx.toFixed(1)}px`,
                  '--dy': `${dy.toFixed(1)}px`,
                  animationDelay: `${o.d}s`,
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* ── Topbånd ─────────────────────────────────────────────── */
export function BlackMonthRibbon() {
  const active = useBlackMonthActive()
  const cd = useCountdown(BLACK_MONTH.end)
  if (!active) return null
  return (
    <div className="relative overflow-hidden bg-black text-white border-b border-[#E8B64C]/30">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-x-3 gap-y-1 flex-wrap text-center">
        <Tag className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
        <span className="text-sm font-extrabold tracking-wide">
          <span style={{ color: GOLD }}>BLACK MONTH</span> · spar op til {BLACK_MAX}% på udvalgte kategorier
        </span>
        {cd && (
          <span className="text-xs font-bold text-white/80 tabular-nums inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" style={{ color: GOLD }} /> {cd.d}d {pad(cd.h)}:{pad(cd.m)}:{pad(cd.s)}
          </span>
        )}
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-bold underline underline-offset-2" style={{ color: GOLD }}>
          Se tilbud <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

/* ── Black Month tilbudssektion ──────────────────────────── */
export function BlackMonthOffers() {
  const active = useBlackMonthActive()
  const cd = useCountdown(BLACK_MONTH.end)
  if (!active) return null

  return (
    <section id="blackmonth" className="relative overflow-hidden py-14 sm:py-20 bg-[#0a0a0c] text-white scroll-mt-24">
      {/* gylden glød */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full blur-3xl" style={{ background: 'rgba(232,182,76,0.14)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]" style={{ background: 'rgba(232,182,76,0.12)', color: GOLD }}>
          <Tag className="w-4 h-4" /> Black Month · hele november
        </div>

        <h2 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight">
          <span style={{ color: GOLD }}>BLACK</span> MONTH
        </h2>
        <p className="mt-3 text-lg sm:text-2xl font-extrabold">
          Spar op til <span style={{ color: GOLD }}>{BLACK_MAX}%</span>
        </p>
        <p className="mt-2 text-white/70 max-w-xl mx-auto">
          Store besparelser på udvalgte kategorier – hele november. Tilbuddet slutter {BLACK_MONTH.endLabel}.
        </p>

        {/* nedtælling */}
        {cd && (
          <div className="mt-6 flex items-end justify-center gap-2 sm:gap-3">
            {[
              { v: cd.d, l: 'dage' },
              { v: cd.h, l: 'timer' },
              { v: cd.m, l: 'min' },
              { v: cd.s, l: 'sek' },
            ].map((t) => (
              <div key={t.l} className="flex flex-col items-center">
                <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/5 ring-1 ring-white/10 text-white tabular-nums text-xl sm:text-3xl font-black flex items-center justify-center">
                  {pad(t.v)}
                </span>
                <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/40">{t.l}</span>
              </div>
            ))}
          </div>
        )}

        {/* kategori-kort */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {BLACK_CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={c.href}
              className="group relative rounded-2xl bg-white/[0.04] ring-1 ring-white/10 hover:ring-[#E8B64C]/50 hover:bg-white/[0.07] transition-all p-6 flex flex-col items-center text-center"
            >
              <span className="text-3xl font-black" style={{ color: GOLD }}>−{c.percent}%</span>
              <span className="mt-2 font-bold">{c.label}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white/70 group-hover:text-white">
                Se tilbud <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/40">
          Tilbuddet gælder i hele november (til og med {BLACK_MONTH.endLabel}) og så længe lager haves. Rabatten trækkes automatisk i kurven.
        </p>
      </div>
    </section>
  )
}

/* ── Lille Black Month-badge (kan bruges på kort) ────────── */
export function BlackMonthBadge({ percent }: { percent: number }) {
  if (!percent) return null
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black text-white text-[11px] font-black px-2.5 py-1 shadow ring-1" style={{ borderColor: GOLD }}>
      <span style={{ color: GOLD }}>BLACK</span> −{percent}%
    </span>
  )
}

export { isBlackMonthActive }
