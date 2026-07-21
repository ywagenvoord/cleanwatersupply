'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Gift, ArrowRight } from 'lucide-react'
import { readAudience } from '@/lib/useAudience'
import { PRIZE_SHORT, DEADLINE, DELAY_SECONDS, SEEN_KEY, QUESTIONS } from '@/lib/quiz'

/**
 * Diskret hjørne-popup ("weblayer") nede i højre hjørne.
 * Indeholder ikke selve quizzen – sender besøgende videre til /quiz.
 */
export default function QuizModal() {
  const [open, setOpen]       = useState(false)
  const [visible, setVisible] = useState(false)   // styrer ind-glidningen

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (localStorage.getItem(SEEN_KEY)) return
    } catch { return }

    if (window.location.pathname.startsWith('/quiz')) return

    const timer = setTimeout(() => {
      // AudienceModal vises kun når audience === null – undgå to popups på én gang
      if (readAudience() === null) return
      setOpen(true)
      requestAnimationFrame(() => setVisible(true))
    }, DELAY_SECONDS * 1000)

    return () => clearTimeout(timer)
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
    setTimeout(() => setOpen(false), 250)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="Konkurrence – vandquiz"
      className={`fixed bottom-5 right-5 z-[90] w-[calc(100%-2.5rem)] max-w-[340px]
                  transition-all duration-300 ease-out
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">

        <button
          onClick={dismiss}
          aria-label="Luk"
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors shadow-sm"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Konkurrence-banner */}
        <div className="bg-[#3aad4a] px-4 py-2 flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5 text-white shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-extrabold text-white uppercase tracking-[0.12em]">
            Konkurrence
          </span>
        </div>

        <div className="p-4">
          <div className="flex gap-3.5 items-start">
            {/* Præmie-billede */}
            <div className="w-[74px] h-[74px] rounded-xl bg-gray-50 border border-gray-100 shrink-0 overflow-hidden">
              <img
                src="/images/product-tr5.jpg"
                alt={PRIZE_SHORT}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold text-[#3aad4a] uppercase tracking-wider mb-0.5">
                Vind
              </p>
              <p className="text-[15px] font-extrabold text-[#0a2540] leading-tight">
                {PRIZE_SHORT}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Værdi <strong className="text-gray-700">625 kr</strong>
              </p>
            </div>
          </div>

          <p className="text-[13px] text-gray-600 leading-relaxed mt-3.5">
            Svar rigtigt på {QUESTIONS.length} spørgsmål om rent vand – så er du med i
            lodtrækningen.
          </p>

          <Link
            href="/quiz"
            onClick={dismiss}
            className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0a2540] hover:bg-[#0d3050] text-white font-bold px-5 py-3 text-sm transition-colors"
          >
            Deltag i konkurrencen
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="mt-2.5 text-[10.5px] text-gray-400 text-center">
            Gratis · under 2 min · lodtrækning {DEADLINE}
          </p>
        </div>
      </div>
    </div>
  )
}
