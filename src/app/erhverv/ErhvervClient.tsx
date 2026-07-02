'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  ArrowRight, Building2, Droplets, Zap, Layers, ShieldCheck,
  FlaskConical, Gauge, FileCheck2, CheckCircle, MapPin, Filter,
  HelpCircle, Phone, Mail, ListChecks, Beaker,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

export default function ErhvervClient() {
  const { language } = useLanguage()
  const da = language !== 'en'

  /* ─── Erhvervsbrancher (uden privat) ─────────────────────── */
  const sectors = [
    { label: da ? 'Hospitaler' : 'Hospitals', slug: 'hospitaler', img: '/images/area-hospitaler.jpg' },
    { label: da ? 'Hoteller' : 'Hotels', slug: 'hoteller', img: '/images/area-hoteller.jpg' },
    { label: da ? 'Svømmehaller' : 'Swimming pools', slug: 'svoemmehaller', img: '/images/area-svoemmehaller.jpg' },
    { label: da ? 'Campingpladser' : 'Campsites', slug: 'campingpladser', img: '/images/area-campingpladser.jpg' },
    { label: da ? 'Landbrug' : 'Agriculture', slug: 'landbruget', img: '/images/area-landbruget.jpg' },
    {
      label: da ? 'Fødevareindustri' : 'Food industry', slug: 'foedevare', img: '/images/area-foedevare.jpg',
      fallback: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&q=80&fit=crop',
    },
  ]

  /* ─── Anlæg & systemer (teknisk) ─────────────────────────── */
  const systems = [
    {
      Icon: ShieldCheck,
      title: da ? 'Legionella-bekæmpelse · Baclyser®' : 'Legionella control · Baclyser®',
      featured: true,
      body: da
        ? 'Legionella trives i stillestående vand mellem 30 og 40 °C og bliver farlig, når den spredes via små vanddråber, der indåndes og kan give alvorlige luftvejsinfektioner. Baclyser® neo er medicinsk certificerede 0,2 µm engangsfiltre, der danner en steril barriere direkte på armatur og bruser – dokumenterbar beskyttelse på tappestedet, hvor risikoen er størst. Anvendes på hospitaler, plejehjem og hoteller med skærpede hygiejnekrav.'
        : 'Legionella thrives in stagnant water between 30 and 40 °C and becomes dangerous when spread via small water droplets that are inhaled and can cause serious respiratory infections. Baclyser® neo are medically certified 0.2 µm disposable filters that form a sterile barrier directly on taps and showers – documentable protection at the outlet, where the risk is greatest. Used in hospitals, care homes and hotels with strict hygiene requirements.',
      specs: da
        ? ['0,2 µm membran', 'Medicinsk certificeret', 'Barriere ved tappested']
        : ['0.2 µm membrane', 'Medically certified', 'Barrier at the outlet'],
      id: 'anlaeg-legionella',
      href: '/legionella',
    },
    {
      Icon: Zap,
      title: da ? 'Kirkmayer-anlæg · HClO-generator' : 'Kirkmayer systems · HClO generator',
      featured: true,
      body: da
        ? 'Kirkmayer-anlæggene er HClO-generatorer (BMI-, LAMI- og AMI-serien), der producerer Anolyt – hypoklorsyre – on-site af blot salt, vand og strøm. Et ikke-toksisk desinfektionsmiddel, der eliminerer bakterier, vira og svampe på sekunder. I landbruget er anlæggene især stærke til dyrehold som kyllinge- og svineproduktion: de fjerner og forebygger biofilm i drikkelinjerne, så dyrene får bakteriefrit vand. Bakterierne bekæmpes helt ude ved dyrene, hvilket hæver deres trivsel, sundhed og levestandard. Aktivstoffet er godkendt under ECHA Article 95.'
        : 'The Kirkmayer systems are HClO generators (BMI, LAMI and AMI series) that produce Anolyte – hypochlorous acid – on-site from only salt, water and electricity. A non-toxic disinfectant that eliminates bacteria, viruses and fungi within seconds. In agriculture the systems are especially strong for livestock such as poultry and pig production: they remove and prevent biofilm in the drinking water lines so the animals get clean drinking water. Bacteria are fought right at the animals, raising their welfare, health and living standard. The active substance is approved under ECHA Article 95.',
      specs: da
        ? ['Anolyt / HClO', 'Kemikaliefri – on-site', 'Fjerner biofilm i drikkelinjer']
        : ['Anolyte / HClO', 'Chemical-free – on-site', 'Removes biofilm in drinking lines'],
      id: 'anlaeg-eca',
      href: '/eca-vand',
    },
    {
      Icon: Layers,
      title: da ? 'Centrale filteranlæg · AS Tube' : 'Central filtration · AS Tube',
      body: da
        ? 'AS Tube er en inline hulfibermembran-patron til point-of-entry. Monteret centralt i vandforsyningen tilbageholder den bakterier og partikler, før vandet fordeles i bygningen – en mekanisk barriere der beskytter hele installationen frem til hvert tappested.'
        : 'AS Tube is an inline hollow-fibre membrane cartridge for point-of-entry. Installed centrally in the water supply it retains bacteria and particles before the water is distributed through the building – a mechanical barrier protecting the entire installation up to every outlet.',
      specs: da
        ? ['Hulfibermembran', 'Inline / point-of-entry', 'Beskytter hele bygningen']
        : ['Hollow-fibre membrane', 'Inline / point-of-entry', 'Whole-building protection'],
      id: 'anlaeg-central',
      href: '/shop/as-tube',
    },
    {
      Icon: Droplets,
      title: da ? 'Blødgøringsanlæg' : 'Water softening systems',
      body: da
        ? 'Kompakte og hydraulisk drevne blødgøringsanlæg reducerer vandets kalk- og calciumindhold via ionbytning og beskytter installationer, armaturer og hvidevarer mod tilkalkning – med lavere energiforbrug og mindre vedligehold. Fuldautomatiske og leveret i hele Danmark.'
        : 'Compact and hydraulically driven softening systems reduce the limescale and calcium content via ion exchange and protect installations, fittings and appliances from scaling – with lower energy consumption and less maintenance. Fully automated and delivered across Denmark.',
      specs: da
        ? ['Ionbytning', 'Kompakt eller hydraulisk drevet', 'Fuldautomatisk drift']
        : ['Ion exchange', 'Compact or hydraulically driven', 'Fully automated'],
      id: 'anlaeg-blodgoring',
      href: '/shop/blosgoringsanlaeg-100m',
    },
  ]

  /* ─── Compliance / certificeringer ───────────────────────── */
  const compliance = [
    { label: 'ISO 9001:2015', sub: da ? 'Kvalitetsledelse' : 'Quality management' },
    { label: 'ISO 13485:2016', sub: da ? 'Medicinsk udstyr' : 'Medical devices' },
    { label: 'ISO 14001', sub: da ? 'Miljøledelse' : 'Environmental' },
    { label: 'ECHA Article 95', sub: da ? 'Godkendt aktivstof' : 'Approved active substance' },
  ]

  /* ─── Behovsvælger (find ud fra problem, ikke kun branche) ── */
  const needs = [
    { Icon: ShieldCheck, label: da ? 'Vi skal sikre mod Legionella' : 'We need to protect against Legionella', target: '#anlaeg-legionella' },
    { Icon: Beaker, label: da ? 'Vi vil desinficere uden kemikalier' : 'We want chemical-free disinfection', target: '#anlaeg-eca' },
    { Icon: Droplets, label: da ? 'Vi vil sikre bakteriefrit vand til vores dyr' : 'We want clean drinking water for our animals', target: '#anlaeg-eca' },
    { Icon: Layers, label: da ? 'Vi vil beskytte hele bygningen' : 'We want to protect the whole building', target: '#anlaeg-central' },
    { Icon: FileCheck2, label: da ? 'Vi har brug for dokumentation' : 'We need documentation', target: '#compliance' },
    { Icon: HelpCircle, label: da ? 'Vi er i tvivl – eller har et andet behov' : 'We are unsure – or have another need', target: '#kontakt' },
  ]

  /* ─── Sammenligningsoverblik ─────────────────────────────── */
  const matrix = [
    {
      need: da ? 'Legionella på tappesteder' : 'Legionella at outlets',
      system: da ? 'Baclyser® POU-filtre' : 'Baclyser® POU filters',
      sectors: da ? 'Hospitaler · Plejehjem · Hoteller' : 'Hospitals · Care homes · Hotels',
    },
    {
      need: da ? 'Kemikaliefri desinfektion' : 'Chemical-free disinfection',
      system: da ? 'Kirkmayer HClO-anlæg' : 'Kirkmayer HClO systems',
      sectors: da ? 'Fødevareindustri · Mejeri · Svømmehaller' : 'Food industry · Dairy · Pools',
    },
    {
      need: da ? 'Bakteriefrit vand til dyr' : 'Clean drinking water for animals',
      system: da ? 'Kirkmayer HClO-anlæg' : 'Kirkmayer HClO systems',
      sectors: da ? 'Landbrug · Kyllinge- & svineproduktion' : 'Agriculture · Poultry & pig farming',
    },
    {
      need: da ? 'Central bygningsbeskyttelse' : 'Central building protection',
      system: da ? 'AS Tube / filteranlæg' : 'AS Tube / filtration',
      sectors: da ? 'Alle med eget vandsystem' : 'Anyone with their own water system',
    },
    {
      need: da ? 'Kalk & hårdt vand' : 'Limescale & hard water',
      system: da ? 'Blødgøringsanlæg' : 'Softening system',
      sectors: da ? 'Hoteller · Svømmehaller · Landbrug' : 'Hotels · Pools · Agriculture',
    },
  ]

  /* ─── FAQ ────────────────────────────────────────────────── */
  const faqs = [
    {
      q: da ? 'Hvor hurtigt kan I levere?' : 'How quickly can you deliver?',
      a: da ? 'Filtre og mindre produkter sendes typisk 2-3 hverdage. Anlæg aftales individuelt efter dimensionering af jeres behov.' : 'Filters and smaller products usually ship in 2-3 business days. Systems are scheduled individually after sizing your needs.',
    },
    {
      q: da ? 'Kommer I ud og dimensionerer anlægget?' : 'Do you come out and size the system?',
      a: da ? 'Ja. Vi vurderer jeres vandkvalitet, forbrug og installation og foreslår den rette løsning og kapacitet.' : 'Yes. We assess your water quality, consumption and installation and propose the right solution and capacity.',
    },
    {
      q: da ? 'Tilbyder I service og vedligehold?' : 'Do you offer service and maintenance?',
      a: da ? 'Ja. Vi tilbyder service samt udskiftning af filtre og forbrugsdele, så anlægget kører optimalt år efter år.' : 'Yes. We offer service and replacement of filters and consumables, so the system runs optimally year after year.',
    },
    {
      q: da ? 'Får vi dokumentation til tilsyn og audit?' : 'Do we get documentation for inspection and audit?',
      a: da ? 'Ja. Vores anlæg og filtre leveres med certificering og dokumentation, så I står stærkt ved tilsyn og revision.' : 'Yes. Our systems and filters come with certification and documentation, so you are well prepared for inspection and audit.',
    },
    {
      q: da ? 'Hvad koster en løsning?' : 'What does a solution cost?',
      a: da ? 'Det afhænger af behov og dimensionering. Kontakt os for et uforpligtende tilbud tilpasset netop jer.' : 'It depends on your needs and sizing. Contact us for a no-obligation quote tailored to you.',
    },
    {
      q: da ? 'Vores branche er ikke nævnt – kan I hjælpe?' : 'Our sector is not listed – can you help?',
      a: da ? 'Ja. Vi løser vandbehandling for mange typer virksomheder. Kontakt os, så finder vi den rette løsning sammen.' : 'Yes. We handle water treatment for many types of business. Contact us and we will find the right solution together.',
    },
  ]

  return (
    <main>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="bg-[#0a2540] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                <Building2 className="w-3.5 h-3.5" />
                {da ? 'Erhverv · B2B' : 'Business · B2B'}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.08]">
                {da ? 'Legionella-bekæmpelse og kemikaliefri desinfektion til erhverv' : 'Legionella control and chemical-free disinfection for business'}
              </h1>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                {da
                  ? 'Med medicinsk certificerede Legionella-filtre og Kirkmayers HClO-anlæg leverer vi dokumenteret vandhygiejne til hospitaler, hoteller, svømmehaller, fødevareindustri og landbrug – helt ud til hvert tappested og hvert dyr.'
                  : "With medically certified Legionella filters and Kirkmayer's HClO systems, we deliver documented water hygiene to hospitals, hotels, pools, the food industry and agriculture – right out to every outlet and every animal."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-0.5">
                  {da ? 'Få et erhvervstilbud' : 'Request a business quote'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#anlaeg" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
                  {da ? 'Se vores anlæg' : 'Explore our systems'}
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-6">
                {(da
                  ? ['ISO- & ECHA-godkendt', 'Validerbar dokumentation', 'Skalérbar dimensionering']
                  : ['ISO & ECHA approved', 'Validatable documentation', 'Scalable sizing']
                ).map((pt) => (
                  <div key={pt} className="flex items-center gap-2 text-white/60 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative pb-10 lg:pb-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <img
                  src="/images/technician-system.jpg"
                  alt={da ? 'Teknisk vandbehandlingsanlæg' : 'Technical water treatment system'}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&q=80&fit=crop' }}
                />
              </div>
              <div className="absolute bottom-4 lg:-bottom-5 left-4 lg:-left-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium">{da ? 'Erhvervskunder' : 'Business clients'}</p>
                <p className="text-xl font-extrabold text-[#0a2540]">{da ? '500+ virksomheder' : '500+ companies'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BEHOVSVÆLGER ──────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-badge"><ListChecks className="w-3.5 h-3.5" /> {da ? 'Hvad har I brug for?' : 'What do you need?'}</span>
          <h2 className="section-heading">{da ? 'Find løsningen ud fra jeres behov' : 'Find the solution by your need'}</h2>
          <p className="section-subheading">{da ? 'Vælg det, der ligner jeres situation – så fører vi jer direkte til den rette løsning.' : 'Choose what matches your situation – we will take you straight to the right solution.'}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 text-left">
            {needs.map(({ Icon, label, target }, i) => (
              <ScrollReveal key={label} direction="up" delay={i * 60} className="h-full">
                <a
                  href={target}
                  className="group h-full flex items-center gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-[#3aad4a]/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-[#0044c4] group-hover:bg-green-100 group-hover:text-[#3aad4a] flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="font-semibold text-gray-900 text-[15px] leading-snug flex-1">{label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#3aad4a] group-hover:translate-x-1 transition-all shrink-0" />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OMRÅDER (BRANCHEVÆLGER) ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-badge"><MapPin className="w-3.5 h-3.5" /> {da ? 'Områder' : 'Sectors'}</span>
            <h2 className="section-heading">{da ? 'Find jeres branche' : 'Find your sector'}</h2>
            <p className="section-subheading">
              {da
                ? 'Hver branche har sine egne krav til vandkvalitet, dokumentation og drift. Vælg jeres område og se den løsning, der matcher netop jeres installation.'
                : 'Every sector has its own demands for water quality, documentation and operation. Choose your area and see the solution that matches your facility.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(({ label, slug, img, fallback }, i) => (
              <ScrollReveal key={slug} direction="up" scale delay={i * 70}>
                <Link
                  href={`/omraader/${slug}`}
                  className="group relative block aspect-[3/2] rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    onError={fallback ? (e) => { e.currentTarget.src = fallback } : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/85 via-[#0a2540]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between">
                    <h3 className="text-white font-extrabold text-xl drop-shadow">{label}</h3>
                    <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#3aad4a] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANLÆG & SYSTEMER ──────────────────────────────────── */}
      <section id="anlaeg" className="py-24 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge"><FlaskConical className="w-3.5 h-3.5" /> {da ? 'Anlæg & systemer' : 'Systems & equipment'}</span>
            <h2 className="section-heading">{da ? 'Komplet vandbehandling – fra indføring til tappested' : 'Complete water treatment – from inlet to outlet'}</h2>
            <p className="section-subheading">
              {da
                ? 'Vi kombinerer central behandling med beskyttelse helt ude ved brugeren, så hele vandsystemet er dækket – mekanisk, kemisk og mikrobiologisk.'
                : 'We combine central treatment with protection right at the point of use, covering the entire water system – mechanically, chemically and microbiologically.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {systems.map(({ Icon, title, body, specs, href, id, featured }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 80} className="h-full">
                <div id={id} className={`group h-full flex flex-col rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 scroll-mt-28 ${featured ? 'border-2 border-[#3aad4a]/40 ring-1 ring-[#3aad4a]/10' : 'border border-gray-100'}`}>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${featured ? 'bg-[#3aad4a] text-white group-hover:bg-[#2e9a3d]' : 'bg-[#0a2540] text-white group-hover:bg-[#0044c4]'}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    {featured && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#3aad4a] bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
                        {da ? 'I fokus' : 'In focus'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-3">{title}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed mb-5">{body}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {specs.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a2540] bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
                        <Gauge className="w-3 h-3 text-blue-500" /> {s}
                      </span>
                    ))}
                  </div>
                  <Link href={href} className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] hover:text-[#2e9a3d] transition-colors">
                    {da ? 'Læs mere' : 'Learn more'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO · HYPOKLORSYRE ──────────────────────────────── */}
      <section className="py-20 bg-[#0a2540]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5" /> {da ? 'Video · ECA-vand' : 'Video · ECA water'}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                {da ? 'Se hvordan hypoklorsyre virker' : 'See how hypochlorous acid works'}
              </h2>
              <p className="text-white/70 leading-relaxed mb-7">
                {da
                  ? 'Hypoklorsyre (HOCl) er et kraftfuldt, men ikke-toksisk desinfektionsmiddel, der produceres on-site af salt, vand og strøm. Se, hvordan det bekæmper bakterier, vira og biofilm – helt uden kemikalier.'
                  : 'Hypochlorous acid (HOCl) is a powerful yet non-toxic disinfectant produced on-site from salt, water and electricity. See how it fights bacteria, viruses and biofilm – completely chemical-free.'}
              </p>
              <ul className="space-y-3">
                {(da
                  ? ['Kemikaliefri desinfektion', 'Nedbryder biofilm i rør og systemer', 'Effektiv mod bakterier, vira og svampe']
                  : ['Chemical-free disinfection', 'Breaks down biofilm in pipes and systems', 'Effective against bacteria, viruses and fungi']
                ).map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
              <video
                controls
                preload="metadata"
                poster="/images/hypoklorsyre-poster.jpg"
                className="w-full h-full block"
                aria-label={da ? 'Video om hypoklorsyre' : 'Video about hypochlorous acid'}
              >
                <source src="/videos/hypoklorsyre.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SAMMENLIGNINGSOVERBLIK ────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-badge"><ListChecks className="w-3.5 h-3.5" /> {da ? 'Overblik' : 'Overview'}</span>
            <h2 className="section-heading">{da ? 'Hvilket anlæg passer til hvad?' : 'Which system fits what?'}</h2>
            <p className="section-subheading">{da ? 'Et hurtigt overblik over behov, anbefalet løsning og typiske brancher.' : 'A quick overview of needs, recommended solution and typical sectors.'}</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            {/* Header (desktop) */}
            <div className="hidden md:grid grid-cols-12 bg-[#0a2540] text-white text-xs font-bold uppercase tracking-widest">
              <div className="col-span-4 px-6 py-4">{da ? 'Behov' : 'Need'}</div>
              <div className="col-span-4 px-6 py-4">{da ? 'Anbefalet anlæg' : 'Recommended system'}</div>
              <div className="col-span-4 px-6 py-4">{da ? 'Typiske brancher' : 'Typical sectors'}</div>
            </div>
            {matrix.map((row, i) => (
              <div
                key={row.need}
                className={`grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-0 px-6 py-5 ${i % 2 ? 'bg-gray-50' : 'bg-white'} border-t border-gray-100`}
              >
                <div className="md:col-span-4 flex items-center gap-2 font-bold text-gray-900">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-gray-400 mr-1">{da ? 'Behov:' : 'Need:'}</span>
                  {row.need}
                </div>
                <div className="md:col-span-4 flex items-center gap-2 text-[#0044c4] font-semibold">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-gray-400 mr-1">{da ? 'Anlæg:' : 'System:'}</span>
                  {row.system}
                </div>
                <div className="md:col-span-4 flex items-center gap-2 text-gray-500 text-sm">
                  <span className="md:hidden text-[10px] uppercase tracking-widest text-gray-400 mr-1">{da ? 'Brancher:' : 'Sectors:'}</span>
                  {row.sectors}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge"><HelpCircle className="w-3.5 h-3.5" /> {da ? 'Spørgsmål & svar' : 'Questions & answers'}</span>
            <h2 className="section-heading">{da ? 'Det spørger erhvervskunder oftest om' : 'What business clients ask most'}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl bg-white border border-gray-100 shadow-sm open:shadow-md transition-shadow">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-gray-900">
                  {q}
                  <ArrowRight className="w-4 h-4 text-[#3aad4a] shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="px-6 pb-5 -mt-1 text-gray-600 text-[15px] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE / DOKUMENTATION ────────────────────────── */}
      <section id="compliance" className="py-20 bg-[#0a2540] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                <FileCheck2 className="w-3.5 h-3.5" />
                {da ? 'Certificering & dokumentation' : 'Certification & documentation'}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                {da ? 'Dokumentation, I kan stå inde for' : 'Documentation you can stand behind'}
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                {da
                  ? 'Vores anlæg og filtre er certificeret efter anerkendte standarder og leveres med den dokumentation, jeres branche kræver – fra medicinsk udstyrsgodkendelse til godkendt aktivstof. Det giver et revisions- og tilsynssikkert grundlag for jeres vandhygiejne.'
                  : 'Our systems and filters are certified to recognised standards and supplied with the documentation your sector requires – from medical device approval to approved active substance. This gives an audit- and inspection-ready basis for your water hygiene.'}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                {da ? 'Anmod om dokumentation' : 'Request documentation'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {compliance.map(({ label, sub }) => (
                <div key={label} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <Filter className="w-6 h-6 text-green-400 mb-3" />
                  <p className="text-white font-extrabold text-lg leading-tight">{label}</p>
                  <p className="text-white/50 text-sm mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATCH-ALL KONTAKT ─────────────────────────────────── */}
      <section id="kontakt" className="py-20 bg-blue-50/60 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-8 md:p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0044c4] flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              {da ? 'Kan I ikke finde jeres branche eller behov?' : "Can't find your sector or need?"}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              {da
                ? 'Vi løser vandbehandling for mange typer virksomheder – også dem, der ikke står på listen. Ring eller skriv, så finder vi den rette løsning sammen.'
                : 'We handle water treatment for many types of business – including those not on the list. Call or write, and we will find the right solution together.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+4551215800" className="inline-flex items-center justify-center gap-2 bg-[#0a2540] hover:bg-[#0c3a73] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                <Phone className="w-4 h-4" /> +45 51 21 58 00
              </a>
              <a href="mailto:info@cleanwatersupply.dk" className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-800 px-7 py-3.5 rounded-full font-semibold text-sm transition-colors">
                <Mail className="w-4 h-4 text-[#3aad4a]" /> info@cleanwatersupply.dk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0c3a73] to-[#0044c4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-10 h-10 text-green-400 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {da ? 'Skal vi dimensionere en løsning til jeres installation?' : 'Shall we size a solution for your facility?'}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            {da
              ? 'Få en uforpligtende teknisk gennemgang og et tilbud tilpasset jeres branche, vandkvalitet og driftsbehov.'
              : 'Get a no-obligation technical review and a quote tailored to your sector, water quality and operational needs.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors">
              {da ? 'Kontakt vores erhvervsteam' : 'Contact our business team'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
              {da ? 'Se alle produkter' : 'See all products'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
