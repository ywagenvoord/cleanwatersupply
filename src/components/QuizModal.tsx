'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import { readAudience } from '@/lib/useAudience'
import { PRIZE_SHORT, DEADLINE, DELAY_SECONDS, SEEN_KEY, QUESTIONS } from '@/lib/quiz'

/**
 * Farverig hjørne-popup ("weblayer") nede i højre hjørne.
 * Indeholder ikke selve quizzen – sender besøgende videre til /quiz.
 */
export default function QuizModal() {
  const [open, setOpen]       = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Under udvikling (localhost) vises pop-up'en ved hver reload, så den er nem
    // at arbejde med. På det live site vises den kun én gang per besøgende.
    const isDev = process.env.NODE_ENV !== 'production'

    try {
      if (!isDev && localStorage.getItem(SEEN_KEY)) return
    } catch { return }

    if (window.location.pathname.startsWith('/quiz')) return

    /* AudienceModal vises kun når der endnu ikke er valgt privat/erhverv OG man
       er på forsiden. Kun i den situation venter vi – ellers ville pop-up'en
       blokere sig selv for evigt (fx hvis localStorage er ryddet). */
    const audienceModalOpen = () =>
      readAudience() === null && window.location.pathname === '/'

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

  return (
    <div
      role="dialog"
      aria-label="Konkurrence – vandquiz"
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

        {/* Lifestyle: filteret monteret på køkkenhanen */}
        <div className="relative h-[165px]">
          <img
            src="/images/solution-tappested.jpg"
            alt="Baclyser neo-filter monteret på vandhane"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient så teksten nedenunder glider ind */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1b32c9] to-transparent" />

          {/* Konkurrence-badge */}
          <div
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              boxShadow: '0 4px 14px rgba(34,197,94,0.5)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.75} aria-hidden="true" />
            <span className="text-[13px] font-black text-white uppercase tracking-[0.14em]">
              Konkurrence
            </span>
          </div>
        </div>

        <div className="relative p-6 pt-4">
          <p className="text-[11px] font-bold text-green-300 uppercase tracking-[0.16em]">
            Vind · værdi 625 kr
          </p>
          <p className="text-[23px] font-extrabold text-white leading-tight tracking-[-0.02em] mt-1">
            {PRIZE_SHORT}
          </p>

          <p className="text-[14px] text-blue-50/90 leading-[1.6] mt-3">
            Svar rigtigt på {QUESTIONS.length} spørgsmål om rent vand, og kom med i lodtrækningen.
            Deltag gratis.
          </p>

          <Link
            href="/quiz"
            onClick={dismiss}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-[15px] font-extrabold text-[#1b32c9] transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
          >
            Deltag i konkurrencen
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={3}
            />
          </Link>

          <p className="mt-3.5 text-[11px] text-blue-100/60 text-center tracking-wide">
            Gratis · under 2 min · lodtrækning {DEADLINE}
          </p>
        </div>
      </div>
    </div>
  )
}
