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
  { range: '0–8 °dH', label: 'Blødt til middelhårdt', note: 'Få kalkgener. Blødgøring sjældent nødvendigt.' },
  { range: '8–12 °dH', label: 'Middelhårdt', note: 'Begyndende kalk. Blødgøring kan overvejes.' },
  { range: '12–18 °dH', label: 'Hårdt', note: 'Tydelige kalkgener. Blødgøring anbefales.' },
  { range: 'Over 18 °dH', label: 'Meget hårdt', note: 'Kraftige aflejringer. Blødgøring betaler sig hurtigt.' },
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
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Gauge className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guide til vandhårdhed
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Hvor hårdt er dit vand?</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Vandets hårdhed afgør, hvor meget kalk du kæmper med i hverdagen. Her får du de enkle svar på,
            hvad °dH betyder, hvordan du finder din hårdhed, og hvornår det kan betale sig at gøre noget.
          </p>
        </div>
      </section>

      {/* KORT FORTALT */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-5">Kort fortalt</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {KORT.map((t) => (
              <div key={t} className="flex items-start gap-3 bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-4">
                <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HÅRDHEDSSKALA */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-5">Hårdhedsskalaen</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HAARDHED.map((h) => (
              <div key={h.range} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-5">
                <p className="text-lg font-extrabold text-[#284eff]">{h.range}</p>
                <p className="font-bold text-[#0a2540] text-sm mt-1">{h.label}</p>
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSTNUMMER-OPSLAG */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-2">Hvor hårdt er vandet, hvor du bor?</h2>
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
