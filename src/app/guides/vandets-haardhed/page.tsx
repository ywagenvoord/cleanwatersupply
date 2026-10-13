import type { Metadata } from 'next'
import Link from 'next/link'
import { Gauge, CheckCircle2, ArrowRight, MapPin, Home, ShowerHead } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import type { FAQ } from '@/lib/products'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import PostnummerHaardhed from '@/components/PostnummerHaardhed'

export const metadata: Metadata = {
  title: 'Hvor hårdt er dit vand? Find vandets hårdhed (°dH) | Clean Water Supply',
  description:
    'Hvor hårdt er dit vand? Se hvad vandets hårdhed (°dH) betyder, hvordan du finder den for din adresse, og hvornår hårdt vand kalder på et blødgøringsanlæg.',
  alternates: { canonical: `${SITE_URL}/guides/vandets-haardhed` },
  keywords: [
    'vandets hårdhed', 'hvor hårdt er mit vand', 'vandhårdhed', 'dH vand',
    'hårdt vand danmark', 'blødt vand', 'find vandhårdhed', 'blødgøringsanlæg',
  ],
}

const FAQS: FAQ[] = [
  {
    q: 'Hvad betyder vandets hårdhed?',
    a: 'Vandets hårdhed er et mål for, hvor meget kalk (calcium og magnesium) vandet indeholder. Den måles i tyske hårdhedsgrader, °dH. Jo højere °dH, jo mere kalk – og jo hårdere vand.',
  },
  {
    q: 'Hvor hårdt er vandet i Danmark?',
    a: 'I Danmark ligger vandets hårdhed typisk mellem 8 og 30 °dH. Vestjylland har generelt det blødeste vand, mens Sjælland og øerne ofte har det hårdeste. Over 12 °dH regnes som hårdt vand.',
  },
  {
    q: 'Hvordan finder jeg vandets hårdhed for min adresse?',
    a: 'Din vandhårdhed står på dit lokale vandværks hjemmeside – søg på vandværkets navn og "hårdhed". Du kan også se den på din vandregning eller kontakte vandværket direkte. Værdien angives i °dH.',
  },
  {
    q: 'Hvornår er vand hårdt?',
    a: 'Som tommelfingerregel: under 8 °dH er blødt til middelhårdt, 8–12 °dH er middelhårdt, 12–18 °dH er hårdt, og over 18 °dH er meget hårdt. Ved 12 °dH og derover mærker de fleste tydeligt kalkgener.',
  },
  {
    q: 'Hvornår kan et blødgøringsanlæg betale sig?',
    a: 'Et blødgøringsanlæg er relevant, når vandhårdheden er omkring 8–12 °dH eller derover, og du oplever kalk på armaturer, skjolder på glas og kort levetid på hvidevarer. Jo hårdere vand, jo hurtigere betaler anlægget sig hjem i sparet vedligehold og el.',
  },
]

const HAARDHED = [
  { range: '0–8', unit: '°dH', label: 'Blødt til middelhårdt', note: 'Få kalkgener. Blødgøring sjældent nødvendigt.', color: '#3aad4a', bg: 'from-green-50', ring: 'ring-green-100' },
  { range: '8–12', unit: '°dH', label: 'Middelhårdt', note: 'Begyndende kalk. Blødgøring kan overvejes.', color: '#f5b301', bg: 'from-amber-50', ring: 'ring-amber-100' },
  { range: '12–18', unit: '°dH', label: 'Hårdt', note: 'Tydelige kalkgener. Blødgøring anbefales.', color: '#f97316', bg: 'from-orange-50', ring: 'ring-orange-100' },
  { range: 'Over 18', unit: '°dH', label: 'Meget hårdt', note: 'Kraftige aflejringer. Blødgøring betaler sig hurtigt.', color: '#dc2626', bg: 'from-red-50', ring: 'ring-red-100' },
]

const KORT = [
  'Vandets hårdhed måles i °dH og fortæller, hvor meget kalk vandet indeholder.',
  'I Danmark ligger den typisk mellem 8 og 30 °dH – over 12 °dH regnes som hårdt.',
  'Du finder din hårdhed på dit lokale vandværks hjemmeside eller vandregning.',
  'Ved hårdt vand (ca. 12 °dH+) kan et blødgøringsanlæg hurtigt betale sig.',
]

const SOLUTIONS = [
  { Icon: Home, title: 'Blødgøringsanlæg', text: 'Reducerer hårdheden for hele husstanden.', href: '/loesninger/kalkanlaeg' },
  { Icon: ShowerHead, title: 'Brusefilter', text: 'Blødere badevand med mindre kalk og klor.', href: '/loesninger/brusefilter' },
  { Icon: Gauge, title: 'Find dit filter', text: 'Svar på fire spørgsmål og bliv guidet til den rette løsning.', href: '/guides/find-filter' },
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Hvor hårdt er dit vand?', url: `${SITE_URL}/guides/vandets-haardhed` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/50 to-white">
        <div className="pointer-events-none absolute -top-16 -right-10 w-[28rem] h-[28rem] bg-sky-300/30 rounded-full blur-3xl animate-[shopText_8s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 w-96 h-96 bg-[#284eff]/15 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 text-center">
          <span className="reveal inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm" style={{ animationDelay: '0ms' }}>
            <Gauge className="w-3.5 h-3.5 text-[#284eff]" />
            Guide til vandhårdhed
          </span>
          <h1 className="reveal text-4xl sm:text-6xl font-extrabold text-[#0a2540] leading-[1.05] mb-5" style={{ animationDelay: '80ms' }}>
            Hvor hårdt er dit vand?
          </h1>
          <p className="reveal text-lg sm:text-xl text-gray-600 leading-relaxed" style={{ animationDelay: '160ms' }}>
            Vandets hårdhed afgør, hvor meget kalk du kæmper med i hverdagen. Få de enkle svar på,
            hvad °dH betyder, hvordan du finder din hårdhed – og hvornår det kan betale sig at gøre noget.
          </p>
          <div className="reveal flex flex-wrap gap-3 justify-center mt-8" style={{ animationDelay: '240ms' }}>
            <a href="#opslag" className="inline-flex items-center gap-2 bg-[#284eff] hover:bg-[#1b3fd0] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5">
              <MapPin className="w-4 h-4" /> Slå dit postnummer op
            </a>
            <a href="#skala" className="inline-flex items-center gap-2 bg-white text-[#0a2540] ring-1 ring-blue-100 hover:ring-blue-200 px-7 py-3.5 rounded-full font-bold text-sm transition-all">
              Se hårdhedsskalaen
            </a>
          </div>
        </div>
      </section>

      {/* KORT FORTALT */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] mb-6">Kort fortalt</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {KORT.map((t, i) => (
              <div key={t} className="reveal flex items-start gap-4 bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm hover:shadow-md transition-shadow p-5" style={{ animationDelay: `${i * 90}ms` }}>
                <span className="w-9 h-9 rounded-xl bg-[#284eff]/10 text-[#284eff] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <p className="text-[15px] text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HÅRDHEDSSKALA */}
      <section id="skala" className="py-12 scroll-mt-24 bg-gradient-to-b from-white to-sky-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Fra blødt til meget hårdt</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] mt-2">Hårdhedsskalaen</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HAARDHED.map((h, i) => (
              <div key={h.range} className={`reveal relative bg-gradient-to-b ${h.bg} to-white rounded-3xl ring-1 ${h.ring} shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 pt-6 overflow-hidden`} style={{ animationDelay: `${i * 110}ms` }}>
                <span className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: h.color }} />
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold" style={{ color: h.color }}>{h.range}</span>
                  <span className="text-sm font-bold text-gray-400">{h.unit}</span>
                </div>
                <p className="font-extrabold text-[#0a2540] text-sm mt-2">{h.label}</p>
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSTNUMMER-OPSLAG */}
      <section id="opslag" className="py-12 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] mb-2">Hvor hårdt er vandet, hvor du bor?</h2>
          <p className="text-gray-600 mb-6 text-sm max-w-2xl leading-relaxed">
            Groft sagt er vandet blødest i Vestjylland og bliver hårdere, jo længere mod øst man kommer –
            hårdest på Sjælland og øerne. Slå dit postnummer op og få et vejledende bud på hårdheden hos dig.
          </p>
          <PostnummerHaardhed />
        </div>
      </section>

      {/* FIND DIN HÅRDHED */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0a2540] to-[#284eff] rounded-3xl p-7 text-white">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5" />
              <h2 className="text-xl font-extrabold">Sådan finder du din hårdhed</h2>
            </div>
            <p className="text-white/90 leading-relaxed text-sm">
              Din vandhårdhed står på dit lokale vandværks hjemmeside – søg på vandværkets navn efterfulgt
              af "hårdhed". Du kan også finde den på din vandregning eller ved at ringe til vandværket.
              Værdien angives i °dH, og så kan du bruge skalaen ovenfor til at se, hvor hårdt dit vand er.
            </p>
          </div>
        </div>
      </section>

      {/* LØSNINGER */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Hvad gør du ved hårdt vand?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {SOLUTIONS.map(({ Icon, title, text, href }) => (
              <Link key={href} href={href} className="group bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-md transition-all p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-[#0a2540] mb-1">{title}</p>
                <p className="text-sm text-gray-600 mb-3">{text}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">Se mere <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Spørgsmål og svar om vandhårdhed</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-5">
                <h3 className="font-bold text-[#0a2540] mb-1.5">{f.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
