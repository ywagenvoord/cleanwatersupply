'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Droplets, Check, Loader2, Trophy, ChevronRight } from 'lucide-react'
import { readAudience } from '@/lib/useAudience'

/* ─────────────────────────────────────────────────────────────
   INDSTILLINGER – ret her, uden at røre resten af koden
   ───────────────────────────────────────────────────────────── */

/**
 * SAMTYKKE-MODEL
 *   true  = tilmelding til nyhedsbrevet er en BETINGELSE for at deltage (bundtet).
 *           Giver flest tilmeldinger, men samtykket er ikke "frit givet" efter
 *           GDPR og kan anfægtes.
 *   false = deltagelse kræver kun e-mail; nyhedsbrevet er et VALGFRIT flueben.
 *           Juridisk sikreste model.
 */
const BUNDLED_CONSENT = true

/** Præmie og frist – vises i modalen og i betingelserne. */
const PRIZE        = 'et Baclyser® neo TR-filter (værdi 625 kr)'
const PRIZE_SHORT  = 'Baclyser® neo TR'
const DEADLINE     = '31. august 2026'

/** Sekunder før pop-up'en vises. */
const DELAY_SECONDS = 25

/** localStorage-nøgle, så quizzen kun vises én gang. */
const SEEN_KEY = 'cws-quiz-seen'

/* ─────────────────────────────────────────────────────────────
   QUIZ-SPØRGSMÅL
   ───────────────────────────────────────────────────────────── */

type Question = {
  q: string
  options: string[]
  correct: number
  explain: string
}

const QUESTIONS: Question[] = [
  {
    q: 'Ved hvilken temperatur trives Legionella-bakterien bedst?',
    options: ['5–15 °C', '30–40 °C', '70–80 °C'],
    correct: 1,
    explain: 'Legionella trives i stillestående vand mellem 30 og 40 grader – præcis den temperatur, mange bruger i bruseren.',
  },
  {
    q: 'Hvordan spredes Legionella typisk i hjemmet?',
    options: [
      'Gennem små vanddråber i luften, fx fra bruseren',
      'Ved at drikke vandet',
      'Gennem isterninger i køleskabet',
    ],
    correct: 0,
    explain: 'Bakterien indåndes via forstøvet vand – derfor er bruseren et af de vigtigste steder at filtrere.',
  },
  {
    q: 'Hvad sker der med koldtvandsrørene om sommeren?',
    options: [
      'De køles ned af grundvandet',
      'Der sker ingenting',
      'De varmes op og nærmer sig bakteriernes yndlingstemperatur',
    ],
    correct: 2,
    explain: 'Sommervarmen varmer vandet i rørene op – og lige dér trives bakterierne allerbedst.',
  },
  {
    q: 'Hvor stor en del af bakterierne stopper et medicinsk godkendt filter (7 log)?',
    options: ['Ca. 90 %', 'Ca. 99 %', 'Over 99,9999 %'],
    correct: 2,
    explain: '7 log-retention betyder, at over 99,99999 % af bakterierne tilbageholdes – inkl. Legionella og Pseudomonas.',
  },
]

/* ───────────────────────────────────────────────────────────── */

export default function QuizModal() {
  const [open, setOpen]         = useState(false)
  const [step, setStep]         = useState(0)          // 0..QUESTIONS.length-1
  const [answers, setAnswers]   = useState<number[]>([])
  const [picked, setPicked]     = useState<number | null>(null)
  const [phase, setPhase]       = useState<'quiz' | 'form' | 'done'>('quiz')

  const [email, setEmail]       = useState('')
  const [consent, setConsent]   = useState(false)
  const [status, setStatus]     = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage]   = useState('')
  const [showTerms, setShowTerms] = useState(false)

  /* Vis pop-up efter X sekunder – kun én gang, og kun når
     audience-vælgeren ikke er i vejen (så to modaler ikke overlapper). */
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (localStorage.getItem(SEEN_KEY)) return
    } catch { return }

    const timer = setTimeout(() => {
      // AudienceModal vises kun når audience === null. Vent til den er væk.
      if (readAudience() === null) return
      setOpen(true)
    }, DELAY_SECONDS * 1000)

    return () => clearTimeout(timer)
  }, [])

  /* Luk med Escape */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function markSeen() {
    try { localStorage.setItem(SEEN_KEY, '1') } catch {}
  }

  function close() {
    markSeen()
    setOpen(false)
  }

  function choose(i: number) {
    if (picked !== null) return
    setPicked(i)
    const next = [...answers, i]
    setAnswers(next)

    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1)
        setPicked(null)
      } else {
        setPhase('form')
      }
    }, 1400)
  }

  const score = answers.filter((a, i) => a === QUESTIONS[i]?.correct).length

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return

    if (BUNDLED_CONSENT && !consent) {
      setStatus('error')
      setMessage('Sæt flueben for at deltage i konkurrencen.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          email,
          consent: BUNDLED_CONSENT ? true : consent,
          tags: ['Quiz-konkurrence'],
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error || 'Noget gik galt. Prøv igen.')
        return
      }

      markSeen()
      setPhase('done')
    } catch {
      setStatus('error')
      setMessage('Kunne ikke oprette forbindelse. Prøv igen.')
    }
  }

  if (!open) return null

  const q = QUESTIONS[step]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        <button
          onClick={close}
          aria-label="Luk"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── QUIZ ── */}
        {phase === 'quiz' && (
          <div className="p-8">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-[#3aad4a]" />
              <span className="text-xs font-bold text-[#3aad4a] uppercase tracking-widest">
                Vandquiz · vind {PRIZE_SHORT}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-[#0a2540] mb-1">
              Hvor meget ved du om rent vand?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              {QUESTIONS.length} hurtige spørgsmål – så er du med i lodtrækningen.
            </p>

            {/* Fremdrift */}
            <div className="flex gap-1.5 mb-6">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < step ? 'bg-[#3aad4a]' : i === step ? 'bg-[#0a2540]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <p className="font-bold text-[#0a2540] mb-4">
              {step + 1}. {q.q}
            </p>

            <div className="space-y-2.5">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correct
                const isPicked  = picked === i
                let cls = 'border-gray-200 hover:border-[#3aad4a] hover:bg-green-50/40'
                if (picked !== null) {
                  if (isCorrect)      cls = 'border-[#3aad4a] bg-green-50 text-[#0a2540]'
                  else if (isPicked)  cls = 'border-red-300 bg-red-50 text-gray-500'
                  else                cls = 'border-gray-200 opacity-50'
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={picked !== null}
                    className={`w-full text-left rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all flex items-center justify-between gap-3 ${cls}`}
                  >
                    <span>{opt}</span>
                    {picked !== null && isCorrect && (
                      <Check className="w-4 h-4 text-[#3aad4a] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {picked !== null && (
              <p className="mt-4 text-xs text-gray-600 bg-blue-50 rounded-xl p-3 leading-relaxed">
                {q.explain}
              </p>
            )}
          </div>
        )}

        {/* ── TILMELDING ── */}
        {phase === 'form' && (
          <div className="p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-extrabold text-[#0a2540] mb-1">
              Du fik {score} ud af {QUESTIONS.length} rigtige!
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Vær med i lodtrækningen om <strong>{PRIZE}</strong>. Vi trækker lod den {DEADLINE} og
              giver vinderen besked på mail.
            </p>

            <form onSubmit={submit}>
              <label htmlFor="quiz-email" className="sr-only">E-mailadresse</label>
              <input
                id="quiz-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@mail.dk"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm mb-3 focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]"
              />

              <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-3.5 h-3.5 rounded border-gray-400 text-[#3aad4a] focus:ring-[#3aad4a] shrink-0"
                />
                <span>
                  {BUNDLED_CONSENT ? (
                    <>
                      Ja tak – jeg deltager i konkurrencen og tilmelder mig samtidig nyhedsbrevet
                      fra Clean Water Supply. <strong>Tilmelding er en betingelse for at deltage.</strong>{' '}
                      Du kan altid afmelde igen. Se vores{' '}
                      <Link href="/privatlivspolitik" className="underline hover:text-[#0a2540]">
                        privatlivspolitik
                      </Link>.
                    </>
                  ) : (
                    <>
                      Ja tak, jeg vil gerne modtage nyheder og tilbud fra Clean Water Supply
                      (valgfrit). Du kan altid afmelde igen. Se vores{' '}
                      <Link href="/privatlivspolitik" className="underline hover:text-[#0a2540]">
                        privatlivspolitik
                      </Link>.
                    </>
                  )}
                </span>
              </label>

              {status === 'error' && (
                <p className="mb-3 text-xs font-medium text-red-500" role="alert">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white font-semibold text-sm py-3 transition-colors flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sender…</>
                ) : (
                  <>Deltag i konkurrencen <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <button
              onClick={() => setShowTerms(!showTerms)}
              className="mt-4 text-xs text-gray-400 underline hover:text-gray-600"
            >
              {showTerms ? 'Skjul' : 'Se'} konkurrencebetingelser
            </button>

            {showTerms && (
              <div className="mt-3 text-[11px] leading-relaxed text-gray-500 bg-gray-50 rounded-xl p-4 space-y-1.5">
                <p><strong>Præmie:</strong> {PRIZE}. Præmien kan ikke ombyttes til kontanter.</p>
                <p><strong>Frist:</strong> Deltagelse senest den {DEADLINE}. Vinderen findes ved
                  tilfældig lodtrækning blandt alle gyldige tilmeldinger og får besked på mail
                  senest 14 dage efter fristen.</p>
                <p><strong>Hvem kan deltage:</strong> Personer på 18 år og derover med bopæl i
                  Danmark. Ansatte hos Clean Water Supply ApS kan ikke deltage.</p>
                <p><strong>Persondata:</strong> Clean Water Supply ApS, Strømøvej 3, 8700 Horsens
                  (CVR 44405563) er dataansvarlig. Din e-mail bruges til at administrere
                  konkurrencen{BUNDLED_CONSENT ? ' og til at sende dig vores nyhedsbrev' : ''}.
                  Du kan til enhver tid afmelde nyhedsbrevet og få dine data slettet.</p>
              </div>
            )}
          </div>
        )}

        {/* ── KVITTERING ── */}
        {phase === 'done' && (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#3aad4a] text-white flex items-center justify-center mx-auto mb-5">
              <Check className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0a2540] mb-2">
              Du er næsten med!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Vi har sendt dig en mail – klik på bekræftelseslinket, så er du med i lodtrækningen
              om {PRIZE_SHORT}. Husk at tjekke spam-mappen, hvis den ikke dukker op.
            </p>
            <button
              onClick={close}
              className="rounded-xl bg-[#0a2540] hover:bg-[#0d2f52] text-white font-semibold text-sm px-6 py-3 transition-colors"
            >
              Luk
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
