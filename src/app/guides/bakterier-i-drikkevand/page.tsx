import type { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, CheckCircle2, ArrowRight, Sparkles, FlaskConical, ShieldCheck } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import type { FAQ } from '@/lib/products'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

// NB: Sundheds- og effektpåstande på denne side bør kvalitetssikres af en fagansvarlig
// før publicering. Teksten er bevidst neutral og giver ingen generel garanti om sikkert drikkevand.

export const metadata: Metadata = {
  title: 'Bakterier i drikkevand: årsager og muligheder | Clean Water Supply',
  description:
    'Bakterier i drikkevand kan skyldes forhold i vandforsyning eller installationer. Få overblik over typiske fund, hvad en vandprøve kan betyde, og hvornår vandværk, kommune eller en fagperson bør kontaktes.',
  alternates: { canonical: `${SITE_URL}/guides/bakterier-i-drikkevand` },
  keywords: [
    'bakterier i vand', 'bakterier i drikkevand', 'coliforme bakterier', 'E. coli i vand',
    'vandprøve bakterier', 'forurenet drikkevand', 'kogeanbefaling', 'bakteriefilter',
  ],
}

const FAQS: FAQ[] = [
  {
    q: 'Hvilke bakterier kan findes i drikkevand?',
    a: 'De fund, man oftest hører om, er coliforme bakterier og E. coli, som bruges som indikatorer for, at vandet kan være påvirket. Der kan også forekomme fx Pseudomonas eller kimtal over det normale. Hvilken type der er tale om, har betydning for, hvad der bør gøres.',
  },
  {
    q: 'Hvordan testes drikkevand for bakterier?',
    a: 'Vand testes ved, at der udtages en vandprøve, som analyseres på et laboratorium. Har du egen brønd eller boring, kan du få taget en prøve via et godkendt laboratorium. Er du på alment vandværk, overvåger vandværket vandkvaliteten løbende.',
  },
  {
    q: 'Hvad gør man ved fund af bakterier i drikkevandet?',
    a: 'Ved mistanke eller påvist forurening bør du kontakte dit vandværk eller kommunen, som vejleder om eventuel kogeanbefaling og videre skridt. Det er vigtigt at kende typen og årsagen, før man vælger en løsning.',
  },
  {
    q: 'Kan et vandfilter hjælpe mod bakterier?',
    a: 'Det afhænger af filteret. Et almindeligt smags- eller kalkfilter er ikke beregnet til at fjerne bakterier. Mikrobiologisk validerede bakteriefiltre (fx membranfiltre ved tappestedet) er derimod dokumenteret til at tilbageholde bakterier. Et filter er et supplement og erstatter ikke rådgivning fra vandværk eller kommune ved en egentlig forurening.',
  },
]

const KORT = [
  'Bakterier i drikkevand kan skyldes forhold i vandforsyningen eller i husets installationer.',
  'Coliforme bakterier og E. coli bruges som indikatorer for, at vandet kan være påvirket.',
  'Ved mistanke eller fund: kontakt vandværk eller kommune, før du vælger en løsning.',
  'Skeln mellem smags-/kalkfiltre og mikrobiologisk validerede bakteriefiltre.',
]

const SOLUTIONS = [
  { Icon: ShieldCheck, title: 'Bakteriefiltre ved tappestedet', text: 'Membranfiltre, der er dokumenteret til at tilbageholde bakterier – lige ved hanen.', href: '/loesninger/filtre-paa-tappestedet' },
  { Icon: Droplets, title: 'Filterkander', text: 'Til smag og udvalgte stoffer i drikkevandet – uden installation.', href: '/vandkander' },
  { Icon: FlaskConical, title: 'Guide: vælg vandfilter', text: 'Find ud af, hvilken filtertype der passer til dit behov.', href: '/guides/vaelg-vandfilter' },
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Bakterier i drikkevand', url: `${SITE_URL}/guides/bakterier-i-drikkevand` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guide til bakterier i drikkevand
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Bakterier i drikkevand – hvad skal du være opmærksom på?</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Bakterier i drikkevand kan skyldes forskellige forhold i vandforsyning eller installationer. Hvis en
            vandprøve viser bakterier, er det vigtigt at kende typen og årsagen, før man vælger løsning. Her
            gennemgår vi typiske fund, hvad prøveresultater kan betyde, og hvornår vandværk, kommune eller en
            fagperson bør kontaktes.
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

      {/* BODY */}
      <section className="py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvilke bakterier kan findes i drikkevand?</h2>
            <p className="text-gray-600 leading-relaxed">
              Når man taler om bakterier i drikkevand, handler det ofte om coliforme bakterier og E. coli. De
              bruges som indikatorer for, at vandet kan være påvirket af fx overfladevand eller forurening.
              Der kan også være tale om et forhøjet kimtal eller andre bakterietyper. Typen af fund er afgørende
              for, hvad der bør gøres.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvordan testes drikkevand?</h2>
            <p className="text-gray-600 leading-relaxed">
              Vandet undersøges ved at udtage en vandprøve, som analyseres på et laboratorium. Er du tilsluttet
              et alment vandværk, overvåges vandkvaliteten løbende. Har du egen brønd eller boring, er det dig
              selv, der er ansvarlig for at få vandet kontrolleret via et godkendt laboratorium.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvad gør man ved fund af bakterier?</h2>
            <p className="text-gray-600 leading-relaxed">
              Ved mistanke om eller påvist forurening bør du kontakte dit vandværk eller kommune, som kan vejlede
              om en eventuel kogeanbefaling og de næste skridt. Det er vigtigt at kende årsagen, før man vælger en
              løsning – en forurening kan skyldes alt fra et midlertidigt brud til forhold i egne installationer.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Kan et vandfilter hjælpe?</h2>
            <p className="text-gray-600 leading-relaxed">
              Det afhænger af filtertypen. Et almindeligt smags- eller kalkfilter er ikke beregnet til bakterier,
              mens mikrobiologisk validerede bakteriefiltre er dokumenteret til at tilbageholde bakterier ved
              tappestedet. Et filter er et supplement og erstatter ikke rådgivning fra vandværk eller kommune ved
              en egentlig forurening. Er du i tvivl om filtertyper, så se vores{' '}
              <Link href="/guides/vaelg-vandfilter" className="text-[#284eff] font-semibold hover:underline">guide til valg af vandfilter</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* LØSNINGER */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Relevante løsninger</h2>
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
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Spørgsmål og svar om bakterier i drikkevand</h2>
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
