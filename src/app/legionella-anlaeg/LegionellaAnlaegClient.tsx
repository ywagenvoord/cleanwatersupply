'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollReveal from '@/components/ScrollReveal'
import {
  ShieldCheck, ArrowRight, Layers, Droplets, Zap, Thermometer,
  Wind, CheckCircle2, Building2, FileCheck, Phone,
} from 'lucide-react'

export default function LegionellaAnlaegClient() {
  const { language } = useLanguage()
  const da = language !== 'en'

  const barriers = [
    {
      Icon: Zap,
      title: da ? 'Central behandling af vandet' : 'Central water treatment',
      body: da
        ? 'Anlægget doserer HClO (hypoklorsyre) direkte ind i vandforsyningen og fjerner bakterier, vira og svampe i hele systemet – kemikaliefrit, produceret on-site af blot salt, vand og strøm.'
        : 'The system doses HClO (hypochlorous acid) directly into the water supply and eliminates bacteria, viruses and fungi throughout the system – chemical-free, produced on-site from just salt, water and electricity.',
    },
    {
      Icon: Droplets,
      title: da ? 'Rene rør uden biofilm' : 'Clean pipes without biofilm',
      body: da
        ? 'Den løbende behandling forhindrer, at biofilm og bakterier sætter sig i rørnettet. Problemet fjernes ved kilden – i hele vandforsyningen – i stedet for kun ved det enkelte tappested.'
        : 'The continuous treatment prevents biofilm and bacteria from building up in the pipework. The problem is removed at the source – across the whole supply – instead of only at the individual outlet.',
    },
    {
      Icon: ShieldCheck,
      title: da ? 'Sikker, overvåget drift' : 'Safe, monitored operation',
      body: da
        ? 'Automatisk styring og dosering sikrer en stabil og dokumenterbar drift døgnet rundt, så I undgår problemer med bakterier i vandet – uden at nogen skal håndtere farlig kemi.'
        : 'Automatic control and dosing ensure stable, documentable operation around the clock, so you avoid problems with bacteria in the water – without anyone handling hazardous chemicals.',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3160] to-[#123a7a]">
        <div className="pointer-events-none absolute -top-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#284eff]/25 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="pointer-events-none absolute -bottom-20 -left-24 w-96 h-96 rounded-full bg-[#3aad4a]/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Tekst */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                {da ? 'Erhverv · kører 24/7' : 'Business · runs 24/7'}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.06]">
                {da ? (
                  <>Legionella-anlæg der holder <span className="text-[#5ed36e]">hele vandforsyningen</span> ren og sikker</>
                ) : (
                  <>A legionella system that keeps <span className="text-[#5ed36e]">the whole water supply</span> clean and safe</>
                )}
              </h1>
              <p className="text-lg text-white/70 mt-5 leading-relaxed">
                {da
                  ? 'Et centralt anlæg der løbende behandler vandet og holder rørnettet fri for bakterier og biofilm – kemikaliefrit, automatisk og dokumenterbart.'
                  : 'A central system that continuously treats the water and keeps the pipework free of bacteria and biofilm – chemical-free, automatic and documentable.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-0.5">
                  {da ? 'Få et tilbud' : 'Get a quote'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#saadan" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
                  {da ? 'Se hvordan det virker' : 'See how it works'}
                </Link>
              </div>
              {/* Quick trust-facts */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
                {[
                  { Icon: Zap, t: da ? 'Kemikaliefri HClO' : 'Chemical-free HClO' },
                  { Icon: ShieldCheck, t: da ? 'Automatisk drift' : 'Automatic operation' },
                  { Icon: FileCheck, t: da ? 'Dokumenterbar' : 'Documentable' },
                ].map(({ Icon, t }) => (
                  <span key={t} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                    <Icon className="w-4 h-4 text-green-400" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Visuel */}
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-2xl">
                <img
                  src="/images/legionella-anlaeg-3.jpg"
                  alt={da ? 'Legionella-anlæg – SICURSAN styring installeret' : 'Legionella system – SICURSAN controller installed'}
                  className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover"
                />
              </div>
              {/* Lille flydende billede */}
              <div className="hidden sm:block absolute -top-6 -right-4 lg:-right-8 w-28 h-36 rounded-2xl overflow-hidden ring-4 ring-[#0a2540] shadow-xl rotate-3">
                <img src="/images/legionella-anlaeg-7.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              {/* Flydende stat-kort */}
              <div className="absolute -bottom-5 -left-3 lg:-left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3aad4a] to-[#2e9a3d] flex items-center justify-center shadow-lg shadow-green-500/25">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-extrabold text-[#0a2540]">{da ? 'Rene rør – i hele bygningen' : 'Clean pipes – whole building'}</p>
                  <p className="text-xs text-gray-500">{da ? 'Fjerner bakterier, vira & svampe' : 'Removes bacteria, viruses & fungi'}</p>
                </div>
              </div>
            </div>
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
                  ? 'Legionella trives i stillestående vand mellem 30 og 40 °C og bliver farlig, når den spredes via små vanddråber, der indåndes – fx i brusere – og kan give alvorlige luftvejsinfektioner. I bygninger med lange rørføringer eller perioder med lavt forbrug sætter bakterierne sig som biofilm i rørnettet. Et legionella-anlæg behandler vandet centralt og holder hele rørnettet rent, så problemet fjernes ved kilden – ikke først, når det er opstået.'
                  : 'Legionella thrives in stagnant water between 30 and 40 °C and becomes dangerous when spread via small water droplets that are inhaled – e.g. in showers – and can cause serious respiratory infections. In buildings with long pipe runs or periods of low usage, the bacteria settle as biofilm in the pipework. A legionella system treats the water centrally and keeps the entire pipe network clean, so the problem is removed at the source – not only once it has arisen.'}
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
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <span className="text-[11px] font-black text-[#3aad4a] uppercase tracking-widest">{da ? 'Central behandling' : 'Central treatment'}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mt-1.5">{da ? 'Sådan holder anlægget jeres vand rent og sikkert' : 'How the system keeps your water clean and safe'}</h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{da ? 'Anlægget behandler vandet centralt og forebygger, at bakterier og biofilm sætter sig i rørnettet – så hele vandforsyningen holdes ren.' : 'The system treats the water centrally and prevents bacteria and biofilm from settling in the pipework – keeping the whole water supply clean.'}</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {barriers.map(({ Icon, title, body }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 100} className="h-full">
                <div className="relative h-full rounded-3xl bg-white ring-1 ring-blue-100/70 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-7">
                  <span className="absolute -top-3.5 left-7 w-9 h-9 rounded-full bg-gradient-to-br from-[#284eff] to-[#1b32c9] text-white text-sm font-black flex items-center justify-center shadow-lg shadow-[#284eff]/25">
                    {i + 1}
                  </span>
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#284eff] to-[#1b32c9] flex items-center justify-center mb-4 mt-2 shadow-lg shadow-[#284eff]/20">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </span>
                  <h3 className="text-lg font-extrabold text-[#0a2540] leading-tight">{title}</h3>
                  <p className="text-[15px] text-gray-600 mt-2 leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
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
            {benefits.map(({ Icon, title, body }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 80} className="h-full">
                <div className="flex h-full gap-4 rounded-3xl bg-white ring-1 ring-blue-100/70 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-6">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3aad4a] to-[#2e9a3d] flex items-center justify-center shrink-0 shadow-lg shadow-green-500/20">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0a2540] leading-tight">{title}</h3>
                    <p className="text-[15px] text-gray-600 mt-1.5 leading-relaxed">{body}</p>
                  </div>
                </div>
              </ScrollReveal>
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

      {/* ─── ANLÆGGET I DRIFT (galleri) ────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-black text-[#3aad4a] uppercase tracking-widest">{da ? 'Fra virkeligheden' : 'From the field'}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mt-1.5">{da ? 'Anlægget i drift' : 'The system in operation'}</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{da ? 'Eksempler på installerede anlæg – styring, salt/syre-tanke og filtre monteret centralt i teknikrummet.' : 'Examples of installed systems – controller, brine/acid tanks and filters fitted centrally in the plant room.'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
              <ScrollReveal key={n} direction="up" delay={(i % 4) * 80}>
                <div className="group rounded-2xl overflow-hidden ring-1 ring-blue-100/70 shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-50">
                  <img
                    src={`/images/legionella-anlaeg-${n}.jpg`}
                    alt={da ? `Installeret legionella-anlæg ${n}` : `Installed legionella system ${n}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </ScrollReveal>
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
