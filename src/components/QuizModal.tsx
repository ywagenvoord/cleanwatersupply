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
    try {
      if (localStorage.getItem(SEEN_KEY)) return
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
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 hover:rotate-90"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <div className="relative p-6">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              boxShadow: '0 4px 14px rgba(34,197,94,0.45)',
            }}
          >
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2.75} aria-hidden="true" />
            <span className="text-[14px] font-black text-white uppercase tracking-[0.14em]">
              Konkurrence
            </span>
          </div>

          <p className="text-[15px] font-bold text-white/90 mb-5 leading-snug">
            Deltag gratis – vi trækker lod blandt alle deltagere
          </p>

          {/* Præmie */}
          <div className="flex gap-4 items-center mb-5">
            <div className="relative shrink-0">
              <div className="absolute -inset-1.5 rounded-[20px] bg-white/25 blur-lg" />
              <div className="relative w-[84px] h-[84px] rounded-[18px] bg-white p-1.5 shadow-lg">
                <img
                  src="/images/product-tr5.jpg"
                  alt={PRIZE_SHORT}
                  className="w-full h-full object-cover rounded-[13px] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold text-green-300 uppercase tracking-[0.14em] mb-1">
                Vind
              </p>
              <p className="text-[20px] font-extrabold text-white leading-[1.15] tracking-[-0.02em]">
                {PRIZE_SHORT}
              </p>
              <p className="text-[12.5px] text-blue-100/70 mt-1.5">
                Medicinsk godkendt · værdi{' '}
                <span className="font-bold text-white">625 kr</span>
              </p>
            </div>
          </div>

          <p className="text-[14px] text-blue-50/90 leading-[1.6]">
            Svar rigtigt på {QUESTIONS.length} spørgsmål om rent vand, og kom med i lodtrækningen.
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
