'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Wrench, ArrowRight } from 'lucide-react'
import { isGratisMonteringActive, GRATIS_MONTERING } from '@/lib/campaign'
import { INSTALLATION_PRICE } from '@/lib/products'

/**
 * Farverig hjørne-popup ("weblayer") nede i højre hjørne.
 * Promoverer gratis montering-kampagnen på blødgøringsanlæg.
 * Vises kun mens kampagnen er aktiv (slutter 20/9-2026 kl. 23:59) og
 * slukker derfor af sig selv.
 */
const SEEN_KEY = 'cws_montering_seen'
const DELAY_SECONDS = 5

export default function MonteringModal() {
  const [open, setOpen]       = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Kampagne slut → vis aldrig pop-up'en.
    if (!isGratisMonteringActive()) return

    // Under udvikling (localhost) vises pop-up'en ved hver reload, så den er nem
    // at arbejde med. På det live site vises den kun én gang per besøgende.
    const isDev = process.env.NODE_ENV !== 'production'

    try {
      if (!isDev && localStorage.getItem(SEEN_KEY)) return
    } catch { return }

    // Vis ikke på montering-/anlægssiderne (der kender de allerede tilbuddet).
    const path = window.location.pathname
    if (path.startsWith('/montering') || path.startsWith('/anlaeg')) return

    const audienceModalOpen = () =>
      !!(window as unknown as { __cwsAudienceModalOpen?: boolean }).__cwsAudienceModalOpen

    let retry: ReturnType<typeof setInterval> | undefined

    const show = () => {
      setOpen(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }

    const timer = setTimeout(() => {
      if (!audienceModalOpen()) { show(); return }
      retry = setInterval(() => {
        if (!audienceModalOpen()) {
          if (retry) clearInterval(retry)
          show()
        }
      }, 1500)
    }, DELAY_SECONDS * 1000)

    return () => {
      clearTimeout(timer)
      if (retry) clearInterval(retry)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function dismiss() {
    try { localStorage.setItem(SEEN_KEY, '1') } catch {}
    setVisible(false)
    setTimeout(() => setOpen(false), 320)
  }

  if (!open) return null

  const priceLabel = INSTALLATION_PRICE.toLocaleString('da-DK')

  return (
    <div
      role="dialog"
      aria-label="Kampagne – gratis montering af blødgøringsanlæg"
      className="fixed bottom-6 right-6 z-[90] w-[calc(100%-3rem)] max-w-[410px]"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
        transition: 'opacity 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div
        className="group relative rounded-[26px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #284eff 0%, #3a5cff 45%, #1b32c9 100%)',
          boxShadow:
            '0 2px 8px rgba(40,78,255,0.20), 0 12px 32px -8px rgba(40,78,255,0.45), 0 32px 64px -16px rgba(10,20,80,0.35)',
        }}
      >
        {/* Dekorative lysskær */}
        <div
          className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 65%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-12 w-56 h-56 rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.45) 0%, transparent 65%)' }}
        />

        <button
          onClick={dismiss}
          aria-label="Luk"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur flex items-center justify-center text-white/90 hover:text-white transition-all duration-200 hover:rotate-90"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {/* Lifestyle: blødgøringsanlæg */}
        <div className="relative h-[165px]">
          <img
            src="/images/solution-kalkanlaeg.jpg"
            alt="Blødgøringsanlæg til blødt vand i hele huset"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient så teksten nedenunder glider ind */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1b32c9] to-transparent" />

          {/* Kampagne-badge */}
          <div
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              boxShadow: '0 4px 14px rgba(34,197,94,0.5)',
            }}
          >
            <Wrench className="w-3.5 h-3.5 text-white" strokeWidth={2.75} aria-hidden="true" />
            <span className="text-[13px] font-black text-white uppercase tracking-[0.14em]">
              Kampagne
            </span>
          </div>
        </div>

        <div className="relative p-6 pt-4">
          <p className="text-[11px] font-bold text-green-300 uppercase tracking-[0.16em]">
            Spar {priceLabel} kr
          </p>
          <p className="text-[23px] font-extrabold text-white leading-tight tracking-[-0.02em] mt-1">
            Gratis montering
          </p>

          <p className="text-[14px] text-blue-50/90 leading-[1.6] mt-3">
            Vi monterer dit nye blødgøringsanlæg helt gratis – du sparer {priceLabel} kr.
            i monteringsomkostninger. Kun i kampagneperioden.
          </p>

          <Link
            href="/anlaeg"
            onClick={dismiss}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-[15px] font-extrabold text-[#1b32c9] transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
          >
            Se blødgøringsanlæg
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={3}
            />
          </Link>

          <p className="mt-3.5 text-[11px] text-blue-100/60 text-center tracking-wide">
            Kampagnen slutter {GRATIS_MONTERING.endLabel}
          </p>
        </div>
      </div>
    </div>
  )
}
