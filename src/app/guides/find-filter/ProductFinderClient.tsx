'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, RotateCcw, Star, Building2, Sparkles, Pencil } from 'lucide-react'

type PKey = 'blodgoring' | 'brusehoved' | 'germstop' | 'carmen' | 'glassmart' | 'limescale' | 'vandhane' | 'dualstage' | 'healthexpert' | 'bakterie' | 'erhverv'

type Product = {
  name: string
  price?: number
  img?: string
  icon?: typeof Building2
  href: string
  cta: string
  blurb: string
}

const PRODUCTS: Record<PKey, Product> = {
  blodgoring: { name: 'Blødgøringsanlæg 100M', price: 11250, img: '/images/blosgoringsanlaeg-100m.jpg', href: '/shop/blosgoringsanlaeg-100m', cta: 'Se produkt', blurb: 'Fjerner kalk i hele huset – beskytter rør og hvidevarer.' },
  brusehoved: { name: 'Brusehoved med vandfilter', price: 525, img: '/images/product-kalkbruser.jpg', href: '/shop/brusehoved-filter-acf', cta: 'Se produkt', blurb: 'Blødere badevand med mindre kalk og klor – mildere for hud og hår.' },
  germstop: { name: 'Germ-STOP filterkande', price: 399, img: '/images/kande-germ-stop.png', href: '/vandkander/mikroplastik-stop', cta: 'Se produkt', blurb: 'Fjerner bakterier og mikroplast mens du hælder – tryghed til familien.' },
  carmen: { name: 'Filterkande med udskifteligt filter', price: 189, img: '/images/kande-carmen-t.png', href: '/shop/kande-carmen', cta: 'Se produkt', blurb: 'Bedre smag med det samme – nem hverdagskande uden installation.' },
  glassmart: { name: 'GlaSSmart – vandkaraffel med filter', price: 199, img: '/images/glassmart-flaske-t.png', href: '/vandkander/glassmart', cta: 'Se produkt', blurb: 'Køligt, filtreret vand klar i køleskabet – elegant glaskaraffel.' },
  limescale: { name: 'Bi-flux® LimescaleSTOP – kalkfilter', price: 99, img: '/images/filter-limescalestop-v2.jpg', href: '/vandkande-filtre/bi-flux-limescalestop', cta: 'Se produkt', blurb: 'Filter til din kande, der reducerer kalk – blødere, mildere drikkevand.' },
  vandhane: { name: 'Baclyser® neo TL (3M) – vandhanefilter', price: 625, img: '/images/baclyser-neo-tl.jpg', href: '/shop/baclyser-neo-tl-3m', cta: 'Se produkt', blurb: 'Renere vand direkte fra hanen til madlavning og drikke.' },
  dualstage: { name: 'DualStage MF 10-CL', price: 749, img: '/images/dualstage-mf-10cl.jpg', href: '/shop/dualstage-mf-10-cl', cta: 'Se produkt', blurb: 'Grundig rensning – bedre smag, fjerner tungmetaller og medicinrester.' },
  healthexpert: { name: 'Bi-flux® HealthExpert – tilsætter magnesium', price: 109, img: '/images/filter-healthexpert-v2.jpg', href: '/vandkande-filtre/bi-flux-healthexpert', cta: 'Se produkt', blurb: 'Filter til din kande, der tilfører magnesium og reducerer PFAS, kalk og mikroplast.' },
  bakterie: { name: 'Baclyser® neo TR (2M) – bakteriefilter', price: 450, img: '/images/baclyser-neo-tr.jpg', href: '/shop/baclyser-neo-tr-2m', cta: 'Se produkt', blurb: 'Medicinsk certificeret beskyttelse mod Legionella ved hanen.' },
  erhverv: { name: 'Erhvervsløsning', icon: Building2, href: '/erhverv', cta: 'Kontakt os', blurb: 'Legionella-sikring og vandbehandling til virksomheder og institutioner.' },
}

type Option = { label: string; pts: Partial<Record<PKey, number>> }
type Question = { q: string; help?: string; options: Option[] }
type QId = 'formaal' | 'drikkevand' | 'bakteriehvor' | 'haardhed' | 'hvor' | 'hvem'

const KALK = 0 // index i formaal-options: "Jeg er træt af kalk"
const SMAG = 2 // index i formaal-options: "Bedre smag i drikkevandet"
const BAKTERIER = 3 // index i formaal-options: "tryghed mod bakterier"

const Q: Record<QId, Question> = {
  formaal: {
    q: 'Hvad vil du helst løse?',
    options: [
      { label: 'Jeg er træt af kalk – kalkrande, skjolder og hvidevarer, der kalker til', pts: { carmen: 5, limescale: 4, blodgoring: 3 } },
      { label: 'Min hud føles tør, og håret er mat efter et bad', pts: { brusehoved: 5, germstop: 1 } },
      { label: 'Jeg vil bare have vand, der smager bedre', pts: {} },
      { label: 'Jeg vil være helt tryg ved, at vandet er rent og sikkert', pts: { bakterie: 1 } },
    ],
  },
  drikkevand: {
    q: 'Hvordan vil du helst have dit rene drikkevand?',
    help: 'Vælg det, der passer bedst – vi anbefaler et filter derefter.',
    options: [
      { label: 'Helst noget nemt – en kande, jeg bare fylder op', pts: { carmen: 4, glassmart: 3, germstop: 1 } },
      { label: 'Rent vand direkte fra hanen', pts: { vandhane: 4 } },
      { label: 'Jeg vil være ekstra tryg – uden bakterier og mikroplast', pts: { germstop: 5 } },
      { label: 'Jeg vil gerne have lidt ekstra mineraler i vandet', pts: { healthexpert: 5, carmen: 1 } },
      { label: 'Jeg vil have det så rent som overhovedet muligt', pts: { germstop: 4, vandhane: 2 } },
    ],
  },
  bakteriehvor: {
    q: 'Hvor vil du helst have den ekstra tryghed?',
    options: [
      { label: 'Ved køkkenhanen, hvor jeg henter drikkevand', pts: { bakterie: 5 } },
      { label: 'En fast installation under vasken, der gør vandet bakteriefrit', pts: { dualstage: 5, bakterie: 1 } },
      { label: 'Flere steder i hjemmet (både hane og bad)', pts: { bakterie: 3, brusehoved: 2 } },
    ],
  },
  haardhed: {
    q: 'Hvor hårdt er dit vand?',
    help: 'Er du i tvivl, kan du slå det op på postnummer i guiden om vandhårdhed.',
    options: [
      { label: 'Blødt – eller jeg er ikke helt sikker', pts: { carmen: 1 } },
      { label: 'Sådan midt imellem', pts: { vandhane: 1, limescale: 1 } },
      { label: 'Hårdt – jeg kan tydeligt se kalken', pts: { limescale: 2 } },
    ],
  },
  hvor: {
    q: 'Hvor vil du helst løse det?',
    options: [
      { label: 'Helst noget nemt, uden at skulle installere noget', pts: { carmen: 3, germstop: 2 } },
      { label: 'Ved køkkenvasken, hvor jeg henter drikkevand', pts: { vandhane: 4, germstop: 1 } },
      { label: 'I badet', pts: { brusehoved: 4 } },
      { label: 'I hele hjemmet', pts: { blodgoring: 4 } },
    ],
  },
  hvem: {
    q: 'Hvem skal have glæde af det?',
    options: [
      { label: 'Mig og min husstand', pts: {} },
      { label: 'Min familie – vi har børn eller nogen med et sart helbred', pts: { germstop: 3, bakterie: 2 } },
      { label: 'En virksomhed eller institution', pts: { erhverv: 6, bakterie: 2 } },
    ],
  },
}

const SHORT: Record<QId, string> = {
  formaal: 'Behov',
  drikkevand: 'Drikkevand',
  bakteriehvor: 'Placering',
  haardhed: 'Hårdhed',
  hvor: 'Placering',
  hvem: 'Hvem',
}

// Forgrenet flow: vælger man "bedre smag", kommer drikkevands-spørgsmålet (og vi springer det generiske "hvor" over).
function flow(ans: Partial<Record<QId, number>>): QId[] {
  if (ans.formaal == null) return ['formaal']
  if (ans.formaal === SMAG) return ['formaal', 'drikkevand', 'haardhed', 'hvem']
  if (ans.formaal === BAKTERIER) return ['formaal', 'bakteriehvor', 'haardhed', 'hvem']
  return ['formaal', 'haardhed', 'hvor', 'hvem']
}

function recommend(ans: Partial<Record<QId, number>>, ids: QId[]): PKey[] {
  const score: Record<string, number> = {}
  for (const id of ids) {
    const ai = ans[id]
    if (ai == null) continue
    const opt = Q[id].options[ai]
    if (!opt) continue
    for (const [k, v] of Object.entries(opt.pts)) score[k] = (score[k] || 0) + (v as number)
  }
  // Kalk-sporet: aldrig Germ-stop (kunden vil af med kalk, ikke bakterier)
  if (ans.formaal === KALK) delete score['germstop']
  return (Object.entries(score) as [PKey, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k)
}

export default function ProductFinderClient() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<Record<QId, number>>>({})

  const ids = flow(answers)
  const done = step >= ids.length && ids.length > 1
  const currentId = ids[step]
  const question = currentId ? Q[currentId] : null
  const total = 4

  function choose(oi: number) {
    if (!currentId) return
    setAnswers({ ...answers, [currentId]: oi })
    setStep(step + 1)
  }
  function back() { if (step > 0) setStep(step - 1) }
  function restart() { setStep(0); setAnswers({}) }

  const answeredChips = (upto: number, center = false) => (
    <div className={`flex flex-wrap gap-2 mb-5 ${center ? 'justify-center' : ''}`}>
      {ids.slice(0, upto).map((id, i) => {
        const oi = answers[id]
        if (oi == null) return null
        return (
          <button
            key={id}
            type="button"
            onClick={() => setStep(i)}
            title="Klik for at rette dit svar"
            className="group inline-flex items-center gap-1.5 rounded-full bg-blue-50 ring-1 ring-blue-100 px-3 py-1.5 text-xs text-[#0a2540] hover:ring-[#3aad4a]/50 transition-all"
          >
            <span className="font-bold">{SHORT[id]}:</span>
            <span className="text-gray-600 max-w-[160px] truncate">{Q[id].options[oi].label}</span>
            <Pencil className="w-3 h-3 text-gray-400 group-hover:text-[#3aad4a]" />
          </button>
        )
      })}
    </div>
  )

  const recs = done ? recommend(answers, ids) : []
  const primary = recs[0]
  const others = recs.slice(1)

  return (
    <main className="bg-white min-h-[70vh]">
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3aad4a]" />
            Vandvejviser
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2540] mb-3">Find den rette løsning til dit vand</h1>
          <p className="text-gray-600 leading-relaxed">
            Svar på {total} korte spørgsmål, så hjælper vi dig med at blive afklaret – og anbefaler det,
            der passer bedst til dit vand og dit behov. Ingen tilmelding, helt uforpligtende.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {!done && question && (
            <div>
              {step > 0 && (
                <button type="button" onClick={back} className="mb-4 inline-flex items-center gap-1.5 rounded-full ring-1 ring-blue-200 bg-white px-4 py-2 text-sm font-bold text-[#0a2540] hover:ring-[#3aad4a]/50 hover:shadow-sm transition-all">
                  <ArrowLeft className="w-4 h-4" /> Forrige spørgsmål
                </button>
              )}
              <div className="flex items-center gap-2 mb-6">
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-[#3aad4a]' : 'bg-blue-100'}`} />
                ))}
              </div>

              {step > 0 && answeredChips(step)}

              <p className="text-xs font-bold text-[#3aad4a] uppercase tracking-widest mb-2">Spørgsmål {step + 1} af {total}</p>
              <h2 className="text-2xl font-extrabold text-[#0a2540] mb-1.5">{question.q}</h2>
              {question.help ? <p className="text-sm text-gray-500 mb-5">{question.help}</p> : <div className="mb-5" />}

              <div className="space-y-2.5">
                {question.options.map((o, oi) => (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => choose(oi)}
                    className={`w-full text-left rounded-2xl ring-1 px-5 py-4 font-semibold text-[#0a2540] transition-all flex items-center justify-between gap-3 ${
                      answers[currentId] === oi ? 'ring-[#3aad4a] bg-[#3aad4a]/5' : 'ring-blue-100 hover:ring-[#3aad4a]/40 hover:shadow-sm bg-white'
                    }`}
                  >
                    {o.label}
                    <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </button>
                ))}
              </div>

            </div>
          )}

          {done && primary && (
            <div>
              <p className="text-xs font-bold text-[#3aad4a] uppercase tracking-widest mb-2 text-center">Vores anbefaling til dig</p>
              <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6 text-center">Det her passer bedst til dit vand</h2>

              {(() => {
                const p = PRODUCTS[primary]
                const Icon = p.icon
                return (
                  <div className="rounded-3xl ring-2 ring-[#3aad4a]/30 bg-[#3aad4a]/5 p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Star className="w-4 h-4 text-[#3aad4a] fill-[#3aad4a]" />
                      <span className="text-xs font-black text-[#2e9a3d] uppercase tracking-widest">Bedste match</span>
                    </div>
                    <Link href={p.href} className="group flex items-center gap-4">
                      <span className="w-24 h-24 rounded-2xl bg-white ring-1 ring-blue-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {p.img ? <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                          : Icon ? <Icon className="w-9 h-9 text-[#284eff]" /> : null}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-extrabold text-[#0a2540] text-lg leading-snug group-hover:text-[#284eff] transition-colors">{p.name}</span>
                        <span className="block text-sm text-gray-600 mt-1 leading-relaxed">{p.blurb}</span>
                        <span className="mt-2 flex items-center gap-3">
                          {p.price != null && <span className="text-lg font-extrabold text-[#0a2540]">{p.price.toLocaleString('da-DK')} kr</span>}
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3aad4a] group-hover:bg-[#2e9a3d] text-white font-bold text-sm px-4 py-2 transition-all">
                            {p.cta} <ArrowRight className="w-4 h-4" />
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                )
              })()}

              {others.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5">Du kan også overveje</p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {others.map((k) => {
                      const p = PRODUCTS[k]
                      const Icon = p.icon
                      return (
                        <Link key={k} href={p.href} className="group flex items-center gap-3 rounded-xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 hover:shadow-sm transition-all p-3">
                          <span className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-50 to-white flex items-center justify-center shrink-0 overflow-hidden">
                            {p.img ? <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                              : Icon ? <Icon className="w-6 h-6 text-[#284eff]" /> : null}
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[13px] font-bold text-[#0a2540] leading-snug group-hover:text-[#284eff] transition-colors">{p.name}</span>
                            {p.price != null && <span className="block text-sm font-extrabold text-[#0a2540] mt-0.5">{p.price.toLocaleString('da-DK')} kr</span>}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-blue-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Dine svar – klik for at rette</p>
                {answeredChips(ids.length, true)}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
                <button type="button" onClick={restart} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] hover:gap-2.5 transition-all">
                  <RotateCcw className="w-4 h-4" /> Start forfra
                </button>
                <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#284eff] hover:underline">
                  Se alle produkter <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
