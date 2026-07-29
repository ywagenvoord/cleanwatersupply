'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  ShieldCheck, ArrowRight, Layers, Droplets, Zap, Thermometer,
  Wind, CheckCircle2, Building2, FileCheck, Phone,
} from 'lucide-react'

export default function LegionellaAnlaegClient() {
  const { language } = useLanguage()
  const da = language !== 'en'

  const barriers = [
    {
      Icon: Layers,
      title: da ? 'Central barriere' : 'Central barrier',
      body: da
        ? 'Et inline hulfibermembran-filteranlæg (AS Tube) monteres centralt i vandforsyningen (point-of-entry) og tilbageholder bakterier og partikler, før vandet fordeles i bygningen.'
        : 'An inline hollow-fibre filtration system (AS Tube) is installed centrally (point-of-entry) and retains bacteria and particles before the water is distributed through the building.',
    },
    {
      Icon: ShieldCheck,
      title: da ? 'Barriere ved tappestedet' : 'Barrier at the outlet',
      body: da
        ? 'Medicinsk certificerede 0,2 µm Baclyser®-filtre danner en steril barriere direkte på armatur og bruser – præcis dér, hvor risikoen for smitte er størst.'
        : 'Medically certified 0.2 µm Baclyser® filters form a sterile barrier directly on taps and showers – exactly where the risk of infection is greatest.',
    },
    {
      Icon: Zap,
      title: da ? 'Løbende desinfektion' : 'Continuous disinfection',
      body: da
        ? 'Til centrale systemer kan Kirkmayer HClO-dosering holde rørnet og drikkelinjer fri for biofilm – kemikaliefrit, produceret on-site af salt, vand og strøm.'
        : 'For central systems, Kirkmayer HClO dosing keeps pipework and drinking lines free of biofilm – chemical-free, produced on-site from salt, water and electricity.',
    },
  ]

  const benefits = [
    {
      Icon: FileCheck,
      title: da ? 'Dokumenterbar beskyttelse' : 'Documentable protection',
      body: da
        ? 'Medicinsk certificerede komponenter og målbar effekt gør det nemt at leve op til skærpede hygiejnekrav og dokumentere indsatsen.'
        : 'Medically certified components and measurable effect make it easy to meet strict hygiene requirements and document the effort.',
    },
    {
      Icon: ShieldCheck,
      title: da ? 'Tryghed for gæster og patienter' : 'Safety for guests and patients',
      body: da
        ? 'Rent, bakteriefrit vand ved hvert tappested beskytter sårbare brugere – og jeres omdømme.'
        : 'Clean, bacteria-free water at every outlet protects vulnerable users – and your reputation.',
    },
    {
      Icon: Wind,
      title: da ? 'Forebygger driftstop' : 'Prevents downtime',
      body: da
        ? 'Ved smittefund kan filtre monteres med det samme som akut barriere, mens en varig løsning etableres – uden at lukke ned.'
        : 'If contamination is found, filters can be fitted immediately as an emergency barrier while a permanent solution is established – without shutting down.',
    },
    {
      Icon: Building2,
      title: da ? 'Skalerbart til hele bygningen' : 'Scalable to the whole building',
      body: da
        ? 'Fra enkelte tappesteder til centrale anlæg for hele installationen – anlægget tilpasses jeres bygning og behov.'
        : 'From individual outlets to central systems for the whole installation – the system is adapted to your building and needs.',
    },
  ]

  const sectors = da
    ? ['Hospitaler', 'Plejehjem', 'Hoteller', 'Svømmehaller', 'Kontorer & institutioner', 'Feriecentre']
    : ['Hospitals', 'Care homes', 'Hotels', 'Swimming pools', 'Offices & institutions', 'Holiday centres']

  return (
    <main className="bg-white">
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a2540]">
        <div className="pointer-events-none absolute -top-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#284eff]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-[#3aad4a]/15 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            {da ? 'Erhverv · Legionella-anlæg' : 'Business · Legionella system'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] max-w-3xl">
            {da ? 'Legionella-anlæg der sikrer hele bygningen' : 'A legionella system that protects the whole building'}
          </h1>
          <p className="text-lg text-white/70 mt-6 max-w-2xl leading-relaxed">
            {da
              ? 'Komplet, flertrins beskyttelse mod Legionella – fra en central barriere i vandforsyningen til medicinsk certificerede filtre ved hvert tappested. Dokumenterbart, sikkert og tilpasset jeres bygning.'
              : 'Complete, multi-stage protection against Legionella – from a central barrier in the water supply to medically certified filters at every outlet. Documentable, safe and adapted to your building.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-0.5">
              {da ? 'Få et tilbud' : 'Get a quote'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#saadan" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
              {da ? 'Se hvordan det virker' : 'See how it works'}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HVAD ER LEGIONELLA ────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">{da ? 'Baggrund' : 'Background'}</span>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mt-1.5 mb-4">{da ? 'Hvorfor et legionella-anlæg?' : 'Why a legionella system?'}</h2>
              <p className="text-gray-600 leading-relaxed">
                {da
                  ? 'Legionella trives i stillestående vand mellem 30 og 40 °C og bliver farlig, når den spredes via små vanddråber, der indåndes – fx i brusere – og kan give alvorlige luftvejsinfektioner. I bygninger med mange tappesteder, lange rørføringer eller perioder med lavt forbrug er risikoen særligt høj. Et legionella-anlæg fjerner og forebygger risikoen både centralt og helt ude ved tappestedet.'
                  : 'Legionella thrives in stagnant water between 30 and 40 °C and becomes dangerous when spread via small water droplets that are inhaled – e.g. in showers – and can cause serious respiratory infections. In buildings with many outlets, long pipe runs or periods of low usage, the risk is especially high. A legionella system removes and prevents the risk both centrally and right at the outlet.'}
              </p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#f5fbff] to-white ring-1 ring-blue-100/70 p-7">
              <ul className="space-y-4">
                {[
                  { Icon: Thermometer, t: da ? 'Trives ved 30–40 °C' : 'Thrives at 30–40 °C', b: da ? 'Præcis den temperatur, mange brugsvands- og bruseranlæg holder.' : 'Exactly the temperature many hot-water and shower systems hold.' },
                  { Icon: Wind, t: da ? 'Spredes via vanddråber' : 'Spread via droplets', b: da ? 'Indåndes fra bruser og tappested og kan give luftvejsinfektion.' : 'Inhaled from showers and taps and can cause respiratory infection.' },
                  { Icon: Droplets, t: da ? 'Biofilm i rørnettet' : 'Biofilm in pipework', b: da ? 'Bakterierne gemmer sig i biofilm og genopstår, hvis kun symptomet behandles.' : 'Bacteria hide in biofilm and return if only the symptom is treated.' },
                ].map(({ Icon, t, b }) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-10 h-10 rounded-xl bg-white ring-1 ring-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#284eff]" />
                    </span>
                    <div>
                      <p className="font-bold text-[#0a2540] text-sm">{t}</p>
                      <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{b}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SÅDAN VIRKER ANLÆGGET (flertrins) ─────────────────── */}
      <section id="saadan" className="py-16 md:py-20 bg-gradient-to-b from-white to-[#f5fbff] border-y border-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-black text-[#3aad4a] uppercase tracking-widest">{da ? 'Flertrins beskyttelse' : 'Multi-stage protection'}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mt-1.5">{da ? 'Sådan sikrer anlægget jeres vand' : 'How the system secures your water'}</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{da ? 'Vi kombinerer barrierer, så Legionella bekæmpes både før vandet fordeles og helt ude ved brugeren.' : 'We combine barriers so Legionella is fought both before the water is distributed and right at the user.'}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {barriers.map(({ Icon, title, body }, i) => (
              <div key={title} className="relative rounded-3xl bg-white ring-1 ring-blue-100/70 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-7">
                <span className="absolute -top-3.5 left-7 w-9 h-9 rounded-full bg-gradient-to-br from-[#284eff] to-[#1b32c9] text-white text-sm font-black flex items-center justify-center shadow-lg shadow-[#284eff]/25">
                  {i + 1}
                </span>
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#284eff] to-[#1b32c9] flex items-center justify-center mb-4 mt-2 shadow-lg shadow-[#284eff]/20">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </span>
                <h3 className="text-lg font-extrabold text-[#0a2540] leading-tight">{title}</h3>
                <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORDELE ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">{da ? 'Fordele' : 'Benefits'}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mt-1.5">{da ? 'Derfor vælger erhverv vores anlæg' : 'Why businesses choose our system'}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-4 rounded-3xl bg-white ring-1 ring-blue-100/70 shadow-sm p-6">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3aad4a] to-[#2e9a3d] flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-[#0a2540] leading-tight">{title}</h3>
                  <p className="text-[15px] text-gray-600 mt-1.5 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIL HVEM ──────────────────────────────────────────── */}
      <section className="py-14 bg-[#f5fbff] border-y border-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mb-2">{da ? 'Til bygninger med skærpede hygiejnekrav' : 'For buildings with strict hygiene requirements'}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{da ? 'Vi rådgiver og dimensionerer anlægget efter jeres installation og behov.' : 'We advise and dimension the system to your installation and needs.'}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-blue-100 px-5 py-2.5 text-sm font-semibold text-[#0a2540] shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#3aad4a]" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0c3a73] to-[#0044c4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{da ? 'Klar til at sikre jeres vandanlæg?' : 'Ready to secure your water system?'}</h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto leading-relaxed">
            {da
              ? 'Kontakt os for en uforpligtende vurdering. Vi gennemgår jeres installation og anbefaler det rette legionella-anlæg – akut barriere eller varig løsning.'
              : 'Contact us for a no-obligation assessment. We review your installation and recommend the right legionella system – emergency barrier or permanent solution.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:-translate-y-0.5">
              <Phone className="w-4 h-4" /> {da ? 'Kontakt os' : 'Contact us'}
            </Link>
            <Link href="/legionella" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
              {da ? 'Læs mere om Legionella' : 'Learn more about Legionella'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
