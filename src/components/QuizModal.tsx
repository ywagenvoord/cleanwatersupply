'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import { readAudience } from '@/lib/useAudience'
import { PRIZE_SHORT, DEADLINE, DELAY_SECONDS, SEEN_KEY, QUESTIONS } from '@/lib/quiz'

/**
 * Diskret hjørne-popup ("weblayer") nede i højre hjørne.
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

    const timer = setTimeout(() => {
      if (readAudience() === null) return
      setOpen(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
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
    setTimeout(() => setOpen(false), 320)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="Konkurrence – vandquiz"
      className="fixed bottom-6 right-6 z-[90] w-[calc(100%-3rem)] max-w-[350px]"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
        transition: 'opacity 380ms cubic-bezier(0.22,1,0.36,1), transform 380ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div
        className="group relative rounded-[22px] bg-white overflow-hidden"
        style={{
          boxShadow:
            '0 1px 2px rgba(10,37,64,0.04), 0 8px 24px -6px rgba(10,37,64,0.12), 0 24px 48px -12px rgba(10,37,64,0.18)',
        }}
      >
        {/* Fin accentlinje i toppen */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#3aad4a] via-[#4fc95f] to-[#0a2540]" />

        <button
          onClick={dismiss}
          aria-label="Luk"
          className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-gray-50/80 hover:bg-gray-100 backdrop-blur flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all duration-200 hover:rotate-90"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>

        <div className="p-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 mb-4">
            <Sparkles className="w-3 h-3 text-[#3aad4a]" strokeWidth={2.5} aria-hidden="true" />
            <span className="text-[10px] font-extrabold text-[#2e9a3d] uppercase tracking-[0.14em]">
              Konkurrence
            </span>
          </div>

          {/* Præmie */}
          <div className="flex gap-4 items-center">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-100/60 to-blue-100/40 blur-md" />
              <div className="relative w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-gray-50 to-white ring-1 ring-gray-100 overflow-hidden">
                <img
                  src="/images/product-tr5.jpg"
                  alt={PRIZE_SHORT}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[17px] font-extrabold text-[#0a2540] leading-tight tracking-[-0.01em]">
                Vind et {PRIZE_SHORT}
              </p>
              <p className="text-[12.5px] text-gray-400 mt-1">
                Medicinsk godkendt · værdi 625 kr
              </p>
            </div>
          </div>

          <p className="text-[13.5px] text-gray-500 leading-[1.6] mt-4">
            Svar rigtigt på {QUESTIONS.length} spørgsmål om rent vand, og kom med i lodtrækningen.
          </p>

          <Link
            href="/quiz"
            onClick={dismiss}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0a2540] px-5 py-3.5 text-[14px] font-bold text-white transition-all duration-300 hover:bg-[#0d3050] hover:shadow-lg hover:shadow-[#0a2540]/20"
          >
            Deltag i konkurrencen
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>

          <p className="mt-3 text-[11px] text-gray-300 text-center tracking-wide">
            Gratis · under 2 min · lodtrækning {DEADLINE}
          </p>
        </div>
      </div>
    </div>
  )
}
