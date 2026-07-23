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

  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
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
          name,
          phone,
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
    <main className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-10">

        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 mb-7"
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                boxShadow: '0 6px 20px rgba(34,197,94,0.4)',
              }}
            >
              <Gift className="w-5 h-5 text-white" strokeWidth={2.5} />
              <span className="text-lg md:text-xl font-black text-white uppercase tracking-[0.12em]">
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

            {/* Præmie-hero */}
            <div
              className="relative rounded-3xl overflow-hidden mb-8 text-left shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #284eff 0%, #3a5cff 45%, #1b32c9 100%)',
                boxShadow: '0 20px 50px -15px rgba(40,78,255,0.45)',
              }}
            >
              {/* lysskær */}
              <div className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-full opacity-50"
                   style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 65%)' }} />
              <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full opacity-40"
                   style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.5) 0%, transparent 65%)' }} />

              <div className="relative grid md:grid-cols-2 gap-0 items-stretch">
                {/* Lifestyle: filteret monteret på køkkenhanen */}
                <div className="relative min-h-[240px] md:min-h-[320px]">
                  <img
                    src="/images/solution-tappested.jpg"
                    alt="Baclyser neo-filter monteret på vandhane"
                    className="absolute inset-0 w-full h-full object-cover object-[center_28%]"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 shadow-lg">
                    <span className="text-xs font-black text-[#1b32c9] uppercase tracking-wider">Præmie</span>
                  </div>
                </div>

                {/* Tekst + produktvinkler */}
                <div className="p-7 md:p-8 flex flex-col justify-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-[-0.02em]">
                    Baclyser® neo TR
                  </p>
                  <p className="text-blue-100/80 mt-2 text-sm leading-relaxed">
                    Medicinsk godkendt vandfilter, der stopper Legionella og bakterier direkte ved
                    hanen. Samme filter, som hospitaler bruger.
                  </p>

                  <div className="flex items-center gap-2.5 mt-5">
                    {['product-tr.png', 'product-tr4.jpg', 'product-tr5.jpg'].map((img) => (
                      <div key={img} className="w-14 h-14 rounded-xl bg-white p-1 shadow-md">
                        <img src={`/images/${img}`} alt="" className="w-full h-full object-cover rounded-lg" />
                      </div>
                    ))}
                    <div className="ml-auto text-right">
                      <p className="text-[11px] text-blue-100/70 uppercase tracking-wider">Værdi</p>
                      <p className="text-2xl font-extrabold text-white leading-none">625 kr</p>
                    </div>
                  </div>
                </div>
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
          <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-[#3aad4a] uppercase tracking-widest">
                Spørgsmål {step + 1} af {QUESTIONS.length}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#1b32c9]">
                <Gift className="w-3 h-3" /> Vind {PRIZE_SHORT}
              </span>
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
              Vær med i lodtrækningen om <strong>{PRIZE}</strong> – vi trækker lod den {DEADLINE}{' '}
              og giver vinderen besked på mail.
            </p>

            <form onSubmit={submit}>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="quiz-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Navn
                  </label>
                  <input
                    id="quiz-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dit navn"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]"
                  />
                </div>
                <div>
                  <label htmlFor="quiz-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Telefon
                  </label>
                  <input
                    id="quiz-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="12 34 56 78"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]"
                  />
                </div>
              </div>

              <label htmlFor="quiz-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                E-mailadresse
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
              Du er med i konkurrencen!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Din tilmelding er registreret. Vi trækker lod den {DEADLINE} og giver vinderen
              af {PRIZE_SHORT} besked på mail. Held og lykke!
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

      {/* Billed-loop af konkurrence-produktet */}
      <ProductLoop />
    </main>
  )
}

/* ── Billed-loop (fade) af Baclyser neo TR ────────────────────── */

type Media = { type: 'img' | 'video'; src: string; alt?: string }

// KUN konkurrence-produktet – Baclyser neo TR
const PRODUCT_MEDIA: Media[] = [
  { type: 'img',   src: '/images/solution-tappested.jpg', alt: 'Baclyser neo TR monteret på vandhane' },
  { type: 'img',   src: '/images/product-tr.png',         alt: 'Baclyser neo TR' },
  { type: 'video', src: '/videos/hjem.mp4' },
  { type: 'img',   src: '/images/product-tr4.jpg',        alt: 'Baclyser neo TR' },
  { type: 'img',   src: '/images/product-tr5.jpg',        alt: 'Baclyser neo TR' },
]

function ProductLoop() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % PRODUCT_MEDIA.length), 3800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative z-10 pb-16 px-4">
      <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-5">
        Præmien: Baclyser® neo TR
      </p>

      <div className="relative mx-auto w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl ring-1 ring-black/5">
        {PRODUCT_MEDIA.map((m, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: idx === i ? 1 : 0 }}
            aria-hidden={idx !== i}
          >
            {m.type === 'video' ? (
              <video
                src={m.src}
                autoPlay muted loop playsInline preload="metadata"
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={m.src}
                alt={m.alt || ''}
                className={`w-full h-full ${m.src.endsWith('.png') ? 'object-contain p-8 bg-white' : 'object-cover'}`}
              />
            )}
          </div>
        ))}

        {/* Prikker */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {PRODUCT_MEDIA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Vis billede ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
