'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  ArrowRight, CheckCircle2, ShieldCheck, Droplets, ShowerHead, Baby,
  HeartPulse, ThermometerSun, Wind, Waves, Users, Sparkles, Info,
} from 'lucide-react'

export default function LegionellaPage() {
  const { language } = useLanguage()
  const da = language !== 'en'

  const shortFacts = [
    {
      Icon: ThermometerSun,
      title: da ? 'Den elsker lunkent vand' : 'It loves lukewarm water',
      body: da
        ? 'Legionella trives bedst ved 30–45 °C – præcis den lune temperatur, de fleste af os holder mest af, når vi står i bruseren.'
        : 'Legionella thrives best at 30–45 °C – exactly the lukewarm temperature most of us prefer in the shower.',
    },
    {
      Icon: Wind,
      title: da ? 'Den spreder sig i dampen' : 'It spreads in the mist',
      body: da
        ? 'Faren opstår, når bakterien følger med de fine vanddråber ud i luften – fx når du bader – og bliver indåndet ned i lungerne.'
        : 'The danger arises when the bacterium travels with the fine water droplets into the air – for example when you shower – and is inhaled into the lungs.',
    },
    {
      Icon: Waves,
      title: da ? 'Den gemmer sig, hvor vandet står stille' : 'It hides where the water stands still',
      body: da
        ? 'I rør, varmtvandsbeholderen og i haner eller brusere, der sjældent bruges, kan bakterien få ro til at vokse sig talstærk.'
        : 'In pipes, the water heater and in taps or showers that are rarely used, the bacterium can grow undisturbed.',
    },
  ]

  const vulnerable = [
    { Icon: Baby, title: da ? 'Småbørn' : 'Young children', body: da ? 'Spæde og små børn har små, følsomme luftveje.' : 'Infants and small children have small, sensitive airways.' },
    { Icon: Users, title: da ? 'Ældre' : 'Elderly', body: da ? 'Modstandskraften falder naturligt med alderen.' : 'Resistance naturally declines with age.' },
    { Icon: HeartPulse, title: da ? 'Nedsat immunforsvar' : 'Weakened immune system', body: da ? 'Fx under behandling eller ved kronisk sygdom.' : 'For example during treatment or with chronic illness.' },
    { Icon: Wind, title: da ? 'KOL & astma' : 'COPD & asthma', body: da ? 'Svage lunger er mere udsatte for luftvejsinfektioner.' : 'Weak lungs are more exposed to respiratory infections.' },
  ]

  const everyday = [
    { Icon: ShowerHead, title: da ? 'Morgenbruseren' : 'The morning shower', body: da ? 'Varmt vand og masser af damp – bakteriens yndlingssted, hvis vandet har stået stille om natten.' : 'Warm water and plenty of steam – the bacterium’s favourite spot if the water has been standing overnight.' },
    { Icon: Baby, title: da ? 'Børnenes bad' : 'The children’s bath', body: da ? 'Karbad og håndbruser skaber fine dråber tæt på små ansigter.' : 'Bath tubs and hand showers create fine droplets close to small faces.' },
    { Icon: Droplets, title: da ? 'Håndvasken' : 'The sink', body: da ? 'Sjældent brugte haner – fx på gæstetoilettet – kan stå med lunkent vand i dagevis.' : 'Rarely used taps – e.g. in the guest toilet – can hold lukewarm water for days.' },
    { Icon: Waves, title: da ? 'Gæstebruseren' : 'The guest shower', body: da ? 'Bruseren i kælderen eller gæsteværelset, der næsten aldrig bruges, er et klassisk skjulested.' : 'The shower in the basement or guest room that is almost never used is a classic hiding place.' },
  ]

  const steps = [
    {
      n: '1',
      title: da ? 'Skyl det, du sjældent bruger' : 'Flush what you rarely use',
      body: da ? 'Lad vandet løbe et par minutter i gæstebadet og haner, der ikke bruges dagligt – især efter ferie. Så ryger det stillestående vand ud.' : 'Let the water run for a couple of minutes in the guest bathroom and taps not used daily – especially after holidays. This flushes out the stagnant water.',
    },
    {
      n: '2',
      title: da ? 'Hold det varme vand varmt' : 'Keep the hot water hot',
      body: da ? 'Varmtvandsbeholderen bør stå på mindst 55–60 °C. Lunkent vand er lige det, bakterien vokser i – rigtig varmt vand holder den nede.' : 'The water heater should be set to at least 55–60 °C. Lukewarm water is exactly what the bacterium grows in – properly hot water keeps it down.',
    },
    {
      n: '3',
      title: da ? 'Sæt et filter på' : 'Fit a filter',
      body: da ? 'Det nemmeste og mest direkte: et Legionella-filter på hane og bruser stopper bakterien lige dér, hvor vandet kommer ud.' : 'The easiest and most direct: a Legionella filter on the tap and shower stops the bacterium right where the water comes out.',
    },
  ]

  const filterPoints = da
    ? ['Sættes på uden VVS’er – du klarer det selv på få minutter', 'Medicinsk certificeret og brugt på hospitaler', 'Passer til almindelige haner og brusere i hjemmet']
    : ['Fitted without a plumber – you do it yourself in minutes', 'Medically certified and used in hospitals', 'Fits ordinary taps and showers at home']

  const products = [
    { id: 'baclyser-neo-tl-3m', name: 'Baclyser® neo TL (3M)', desc: da ? 'Vandhanefilter med blødt udløb – op til 93 dages beskyttelse' : 'Tap filter with soft outflow – up to 93 days of protection', img: '/images/product-tl6.jpg' },
    { id: 'baclyser-neo-tr-3m', name: 'Baclyser® neo TR (3M)', desc: da ? 'Vandhanefilter med bruserstråle – op til 93 dages beskyttelse' : 'Tap filter with shower spray – up to 93 days of protection', img: '/images/product-tr5.jpg' },
    { id: 'cblue-sc3',          name: da ? 'cBlue SC3 brusehoved' : 'cBlue SC3 shower head',  desc: da ? 'Flot brusehoved med indbygget Legionella-filter' : 'Elegant shower head with built-in Legionella filter', img: '/images/cblue-sc3-2.jpg' },
  ]

  const otherBacteria = [
    { name: 'Legionella', body: da ? 'Trives i stillestående, lunkent vand (ca. 30–45 °C) – fx i varmtvandsbeholdere og brusere. Indåndes via små dråber og kan give legionærsyge, en alvorlig lungebetændelse.' : 'Thrives in stagnant, lukewarm water (approx. 30–45 °C) – e.g. in water heaters and showers. Inhaled via small droplets and can cause Legionnaires’ disease, a serious pneumonia.' },
    { name: 'Pseudomonas aeruginosa', body: da ? 'En hårdfør bakterie, der kan give infektioner i hud, øjne, ører og luftveje. Særligt uheldig for personer med svækket immunforsvar.' : 'A hardy bacterium that can cause infections in skin, eyes, ears and airways. Particularly harmful for people with a weakened immune system.' },
    { name: da ? 'E. coli (colibakterier)' : 'E. coli (coliform bacteria)', body: da ? 'Stammer typisk fra forurening. Kan give mavepine, diarré og opkast – ses oftere i brøndvand end i vand fra vandværket.' : 'Typically comes from contamination. Can cause stomach ache, diarrhoea and vomiting – seen more often in well water than in mains water.' },
    { name: da ? 'Coliforme bakterier' : 'Coliform bacteria', body: da ? 'Bruges som et varsel: er de til stede, kan vandet også indeholde andre sygdomsfremkaldende mikroorganismer.' : 'Used as a warning sign: if present, the water may also contain other disease-causing microorganisms.' },
    { name: 'Campylobacter', body: da ? 'En af de hyppigste årsager til maveinfektion i Danmark. Giver diarré, mavekramper og feber, og kan overføres via forurenet vand.' : 'One of the most common causes of gastrointestinal infection in Denmark. Causes diarrhoea, stomach cramps and fever, and can be transmitted via contaminated water.' },
    { name: 'Biofilm', body: da ? 'Et tyndt slimlag i rør og installationer, hvor bakterier gemmer sig og formerer sig – grundlaget for mange vandproblemer.' : 'A thin slime layer in pipes and installations where bacteria hide and multiply – the basis of many water problems.' },
  ]

  return (
    <main className="bg-white">
      {/* ─── HERO (lyst) ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl -z-0" />
        <div className="absolute -bottom-20 left-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl -z-0" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Droplets className="w-3.5 h-3.5 text-[#3aad4a]" />
            {da ? 'Legionella – forklaret enkelt' : 'Legionella – explained simply'}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0a2540] mb-6 leading-tight">
            {da ? <>Legionella i vandet – <span className="text-[#284eff]">forstå risikoen</span> i dit eget hjem</> : <>Legionella in the water – <span className="text-[#284eff]">understand the risk</span> in your own home</>}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {da
              ? 'Legionella er en bakterie, der kan gemme sig i helt almindeligt brugsvand – fx i din bruser. Den gode nyhed: med lidt viden og et enkelt filter er din familie nemt beskyttet.'
              : 'Legionella is a bacterium that can hide in completely ordinary tap water – for example in your shower. The good news: with a little knowledge and a simple filter, your family is easily protected.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3.5 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-green-500/20"
            >
              {da ? 'Se filtre til hjemmet' : 'See filters for the home'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-[#0a2540] px-7 py-3.5 rounded-full font-bold ring-1 ring-blue-100 hover:ring-blue-200 shadow-sm transition-all"
            >
              {da ? 'Få gratis rådgivning' : 'Get free advice'}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HVAD ER LEGIONELLA – KORT FORTALT ────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">{da ? 'Hvad er Legionella – kort fortalt' : 'What is Legionella – in short'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {da ? 'Tre ting er værd at vide. Så giver resten næsten sig selv.' : 'Three things are worth knowing. Then the rest almost follows by itself.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {shortFacts.map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-[#0a2540] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HVORFOR DET BETYDER NOGET FOR FAMILIEN ───────────── */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-5">
                {da ? 'Hvorfor det betyder noget for din familie' : 'Why it matters for your family'}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                {da
                  ? <>Først det beroligende: Legionella <strong>smitter ikke</strong> fra person til person. Man bliver kun syg ved at indånde små vanddråber med bakterien. For de fleste raske voksne går det oftest godt.</>
                  : <>First the reassuring part: Legionella <strong>does not spread</strong> from person to person. You only get ill by inhaling small water droplets containing the bacterium. For most healthy adults it usually goes well.</>}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                {da
                  ? <>Men nogle i familien er mere sårbare – og det er dem, det handler om at passe på. Bliver man syg, minder det om en kraftig lungebetændelse med høj feber, kulderystelser, hoste og muskelsmerter. Det kaldes <em>legionærsyge</em>.</>
                  : <>But some family members are more vulnerable – and they are the ones to look after. If you fall ill, it resembles a severe pneumonia with high fever, chills, coughing and muscle pain. It is called <em>Legionnaires’ disease</em>.</>}
              </p>
              <div className="inline-flex items-start gap-3 rounded-2xl bg-white ring-1 ring-blue-100 shadow-sm p-4 text-sm text-gray-600">
                <Info className="w-5 h-5 text-[#284eff] shrink-0 mt-0.5" />
                <span>{da ? 'Er man i tvivl om symptomer, skal man altid kontakte egen læge. Denne side er til information – ikke lægelig rådgivning.' : 'If in doubt about symptoms, always contact your own doctor. This page is for information – not medical advice.'}</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {vulnerable.map(({ Icon, title, body }) => (
                <div key={title} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-5">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-400 ring-1 ring-rose-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0a2540] mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HVOR MØDER DU DEN I HVERDAGEN ────────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">{da ? 'Hvor møder du den i hverdagen?' : 'Where do you meet it in everyday life?'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {da ? 'Ikke for at gøre dig bange – men for at vise, hvor lidt der egentlig skal til at være på forkant.' : 'Not to frighten you – but to show how little it really takes to stay ahead.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {everyday.map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-6">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SÅDAN BESKYTTER DU DIT HJEM ──────────────────────── */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">
              {da ? 'Sådan beskytter du dit hjem – helt enkelt' : 'How to protect your home – simply'}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {da ? 'Effektiv Legionellabekæmpelse behøver ikke være besværligt. Tre gode vaner rækker langt derhjemme.' : 'Effective Legionella control need not be complicated. Three good habits go a long way at home.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ n, title, body }) => (
              <div key={n} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-8">
                <div className="w-10 h-10 rounded-full bg-[#3aad4a] text-white font-extrabold flex items-center justify-center mb-5">
                  {n}
                </div>
                <h3 className="font-bold text-[#0a2540] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            {da
              ? <>Bor du i en større ejendom, udlejning eller driver du erhverv? Så gælder der flere krav til fx cirkulation og dokumentation – <Link href="/kontakt" className="text-[#284eff] font-semibold hover:underline">dem hjælper vi også med</Link>.</>
              : <>Do you live in a larger property, a rental, or run a business? Then more requirements apply for e.g. circulation and documentation – <Link href="/kontakt" className="text-[#284eff] font-semibold hover:underline">we help with those too</Link>.</>}
          </p>
        </div>
      </section>

      {/* ─── FILTER GØR DET NEMT (highlight) ──────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-blue-100 p-10 text-center shadow-sm order-last lg:order-first">
              <div className="w-16 h-16 rounded-2xl bg-white ring-1 ring-blue-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#3aad4a]" />
              </div>
              <p className="text-5xl font-extrabold text-[#0a2540] mb-2">99,9999<span className="text-[#3aad4a]">%</span></p>
              <p className="text-gray-600 text-sm">{da ? 'af alle vandbårne bakterier tilbageholdes – inkl. Legionella og Pseudomonas' : 'of all waterborne bacteria are retained – incl. Legionella and Pseudomonas'}</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-5">
                {da ? 'Et filter gør det nemt' : 'A filter makes it easy'}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                {da
                  ? 'Et sterilt brusefilter eller vandhanefilter er den mest direkte beskyttelse. Det tilbageholder 99,9999 % af alle vandbårne bakterier – inkl. Legionella og Pseudomonas – lige dér, hvor vandet kommer ud og bliver til damp.'
                  : 'A sterile shower filter or tap filter is the most direct protection. It retains 99.9999% of all waterborne bacteria – incl. Legionella and Pseudomonas – right where the water comes out and turns to mist.'}
              </p>
              <ul className="space-y-3">
                {filterPoints.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANBEFALEDE PRODUKTER ─────────────────────────────── */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">{da ? 'Anbefalede Legionella-filtre' : 'Recommended Legionella filters'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{da ? 'Medicinsk certificerede filtre til vandhaner og brusere. Nemme at sætte på – klar til hjemmet.' : 'Medically certified filters for taps and showers. Easy to fit – ready for the home.'}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <Link
                key={p.id}
                href={`/shop/${p.id}`}
                className="group bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-3xl p-6 transition-all hover:shadow-lg shadow-sm"
              >
                <div className="h-40 mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-white ring-1 ring-blue-50 overflow-hidden p-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2 group-hover:text-[#3aad4a] transition-colors">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">
                  {da ? 'Se produktet' : 'View product'} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a2540] hover:text-[#3aad4a] transition-colors">
              {da ? 'Se alle Legionella-filtre i shoppen' : 'See all Legionella filters in the shop'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ANDRE BAKTERIER (fakta / SEO) ────────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">{da ? 'Legionella er ikke den eneste' : 'Legionella is not the only one'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {da
                ? 'Andre bakterier kan også findes i vand – især i ældre installationer, stillestående vand og ved egen brønd. Her er de mest almindelige, forklaret kort.'
                : 'Other bacteria can also be found in water – especially in older installations, stagnant water and with a private well. Here are the most common ones, explained briefly.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherBacteria.map((b) => (
              <div key={b.name} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-50 ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5 text-[#3aad4a]" />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2">{b.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-8 max-w-2xl mx-auto text-center">
            <Sparkles className="w-4 h-4 text-[#3aad4a] shrink-0" />
            <span>{da ? 'Et filter ved hanen eller bruseren tilbageholder 99,9999 % af vandbårne bakterier – uanset type.' : 'A filter at the tap or shower retains 99.9999% of waterborne bacteria – regardless of type.'}</span>
          </div>
        </div>
      </section>

      {/* ─── LÆS OGSÅ ─────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#0a2540] mb-5">{da ? 'Læs også' : 'Read also'}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/faq" className="bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-2xl p-5 transition-all hover:shadow-md">
              <p className="font-bold text-sm text-[#0a2540] mb-1">{da ? 'Spørgsmål & svar om bakterier' : 'Questions & answers about bacteria'}</p>
              <p className="text-xs text-gray-500">{da ? 'Kogepåbud, Legionella, filtre og meget mere' : 'Boil-water notices, Legionella, filters and much more'}</p>
            </Link>
            <Link href="/loesninger/filtre-paa-tappestedet" className="bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-2xl p-5 transition-all hover:shadow-md">
              <p className="font-bold text-sm text-[#0a2540] mb-1">{da ? 'Bakteriefrit vand ved hanen' : 'Clean water at the tap'}</p>
              <p className="text-xs text-gray-500">{da ? 'Vandhanefilter til hjemmet' : 'Tap filter for the home'}</p>
            </Link>
            <Link href="/loesninger/brusefilter" className="bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-2xl p-5 transition-all hover:shadow-md">
              <p className="font-bold text-sm text-[#0a2540] mb-1">{da ? 'Renere bruservand' : 'Cleaner shower water'}</p>
              <p className="text-xs text-gray-500">{da ? 'Brusefilter til hud, hår og luftveje' : 'Shower filter for skin, hair and airways'}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA (lyst) ───────────────────────────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-sky-50 via-blue-50 to-emerald-50 ring-1 ring-blue-100 px-6 py-14 text-center shadow-sm">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-4">{da ? 'Skab tryghed i vandet derhjemme' : 'Create peace of mind about the water at home'}</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              {da ? 'Er du i tvivl om, hvad der passer til jeres hjem? Vi hjælper dig gerne med at finde det rette – helt uforpligtende.' : 'Not sure what suits your home? We are happy to help you find the right solution – with no obligation.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                {da ? 'Se alle Legionella-filtre' : 'See all Legionella filters'} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-white text-[#0a2540] px-8 py-4 rounded-full font-bold ring-1 ring-blue-100 hover:ring-blue-200 shadow-sm transition-all"
              >
                {da ? 'Få gratis rådgivning' : 'Get free advice'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
