'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Gift, Check, Loader2, Trophy, ChevronRight, ArrowRight } from 'lucide-react'
import {
  QUESTIONS, PRIZE, PRIZE_SHORT, DEADLINE, BUNDLED_CONSENT, SEEN_KEY, scoreHeadline,
} from '@/lib/quiz'

export default function QuizClient() {
  const [phase, setPhase]   = useState<'intro' | 'quiz' | 'form' | 'done'>('intro')
  const [step, setStep]     = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [picked, setPicked] = useState<number | null>(null)

  const [email, setEmail]     = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus]   = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [showTerms, setShowTerms] = useState(false)

  const score = answers.filter((a, i) => a === QUESTIONS[i]?.correct).length

  function start() {
    // Har man taget quizzen, skal pop-up'en ikke plage senere.
    try { localStorage.setItem(SEEN_KEY, '1') } catch {}
    setPhase('quiz')
  }

  function choose(i: number) {
    if (picked !== null) return
    setPicked(i)
    setAnswers([...answers, i])
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1)
        setPicked(null)
      } else {
        setPhase('form')
      }
    }, 1500)
  }

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
      setPhase('done')
    } catch {
      setStatus('error')
      setMessage('Kunne ikke oprette forbindelse. Prøv igen.')
    }
  }

  const q = QUESTIONS[step]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">

        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3aad4a] px-4 py-1.5 mb-6">
              <Gift className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-extrabold text-white uppercase tracking-[0.12em]">
                Konkurrence
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] mb-5 leading-tight">
              Hvor meget ved du<br />om rent vand?
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
              Tag vores korte vandquiz på {QUESTIONS.length} spørgsmål – og vær med i
              lodtrækningen om præmien.
            </p>

            {/* Præmien */}
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mb-8 text-left">
              <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 shrink-0 overflow-hidden">
                <img src="/images/product-tr5.jpg" alt={PRIZE_SHORT} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#3aad4a] uppercase tracking-wider mb-0.5">
                  Præmie
                </p>
                <p className="font-extrabold text-[#0a2540] leading-tight">{PRIZE_SHORT}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Medicinsk godkendt vandfilter · værdi <strong className="text-gray-700">625 kr</strong>
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-10">
              Gratis at deltage · tager under 2 minutter · vi trækker lod den {DEADLINE}
            </p>

            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-9 py-4 text-base transition-all hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-0.5"
            >
              Start quizzen
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ── SPØRGSMÅL ── */}
        {phase === 'quiz' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-[#3aad4a] uppercase tracking-widest">
                Spørgsmål {step + 1} af {QUESTIONS.length}
              </span>
              <span className="text-xs text-gray-400">Vind {PRIZE_SHORT}</span>
            </div>

            <div className="flex gap-1.5 mb-8">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < step ? 'bg-[#3aad4a]' : i === step ? 'bg-[#0a2540]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-[#0a2540] mb-6 leading-snug">
              {q.q}
            </h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correct
                const isPicked  = picked === i
                let cls = 'border-gray-200 hover:border-[#3aad4a] hover:bg-green-50/40'
                if (picked !== null) {
                  if (isCorrect)     cls = 'border-[#3aad4a] bg-green-50 text-[#0a2540]'
                  else if (isPicked) cls = 'border-red-300 bg-red-50 text-gray-500'
                  else               cls = 'border-gray-200 opacity-50'
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={picked !== null}
                    className={`w-full text-left rounded-2xl border-2 px-5 py-4 text-sm md:text-base font-medium transition-all flex items-center justify-between gap-3 ${cls}`}
                  >
                    <span>{opt}</span>
                    {picked !== null && isCorrect && (
                      <Check className="w-5 h-5 text-[#3aad4a] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {picked !== null && (
              <p className="mt-5 text-sm text-gray-600 bg-blue-50 rounded-2xl p-4 leading-relaxed">
                {q.explain}
              </p>
            )}
          </div>
        )}

        {/* ── TILMELDING ── */}
        {phase === 'form' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mb-5">
              <Trophy className="w-7 h-7" />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mb-2">
              {scoreHeadline(score, QUESTIONS.length)}
            </h2>
            <p className="text-gray-600 mb-6">
              Du fik <strong className="text-[#0a2540]">{score} ud af {QUESTIONS.length}</strong> rigtige.
              Vær med i lodtrækningen om <strong>{PRIZE}</strong> – vi trækker lod den {DEADLINE}
              og giver vinderen besked på mail.
            </p>

            <form onSubmit={submit}>
              <label htmlFor="quiz-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Din e-mailadresse
              </label>
              <input
                id="quiz-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@mail.dk"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm mb-4 focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]"
              />

              <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer mb-5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-400 text-[#3aad4a] focus:ring-[#3aad4a] shrink-0"
                />
                <span className="leading-relaxed">
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
                <p className="mb-4 text-xs font-medium text-red-500" role="alert">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white font-bold text-sm py-3.5 transition-colors flex items-center justify-center gap-2"
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
              className="mt-5 text-xs text-gray-400 underline hover:text-gray-600"
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
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#3aad4a] text-white flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mb-3">
              Du er næsten med!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Vi har sendt dig en mail – klik på bekræftelseslinket, så er du med i lodtrækningen
              om {PRIZE_SHORT}. Husk at tjekke spam-mappen, hvis den ikke dukker op.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a2540] hover:bg-[#0d2f52] text-white font-bold px-7 py-3.5 text-sm transition-colors"
              >
                Se vores produkter <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/legionella"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 text-[#0a2540] font-semibold px-7 py-3.5 text-sm transition-colors"
              >
                Læs om Legionella
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
