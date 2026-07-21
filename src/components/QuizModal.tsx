'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Droplets, ArrowRight } from 'lucide-react'
import { readAudience } from '@/lib/useAudience'
import { PRIZE, DEADLINE, DELAY_SECONDS, SEEN_KEY, QUESTIONS } from '@/lib/quiz'

/**
 * Lille "weblayer"-teaser. Indeholder ikke selve quizzen – den sender
 * besøgende videre til /quiz, hvor konkurrencen foregår.
 */
export default function QuizModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (localStorage.getItem(SEEN_KEY)) return
    } catch { return }

    // Vis den ikke oven i quiz-siden selv
    if (window.location.pathname.startsWith('/quiz')) return

    const timer = setTimeout(() => {
      // AudienceModal vises kun når audience === null – undgå to modaler på én gang
      if (readAudience() === null) return
      setOpen(true)
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
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        <button
          onClick={dismiss}
          aria-label="Luk"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-gradient-to-br from-[#0a2540] to-[#0d3a63] px-8 pt-9 pb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 mb-4">
            <Droplets className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[11px] font-bold text-green-400 uppercase tracking-widest">
              Konkurrence
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-3 leading-snug">
            Hvor meget ved du<br />om rent vand?
          </h2>
          <p className="text-sm text-blue-100/80 leading-relaxed">
            Tag vores quiz på {QUESTIONS.length} spørgsmål og vær med i lodtrækningen om{' '}
            <strong className="text-white">{PRIZE}</strong>.
          </p>
        </div>

        <div className="p-8 pt-7 text-center">
          <Link
            href="/quiz"
            onClick={dismiss}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-6 py-3.5 text-sm transition-colors"
          >
            Start quizzen
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={dismiss}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Nej tak
          </button>

          <p className="mt-4 text-[11px] text-gray-400">
            Tager under 2 minutter · Vi trækker lod den {DEADLINE}
          </p>
        </div>
      </div>
    </div>
  )
}
