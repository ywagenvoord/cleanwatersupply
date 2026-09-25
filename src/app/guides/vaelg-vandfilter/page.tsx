import type { Metadata } from 'next'
import Link from 'next/link'
import { Filter, CheckCircle2, ArrowRight } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import type { FAQ } from '@/lib/products'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import VaelgFilterAccordion from './VaelgFilterAccordion'

export const metadata: Metadata = {
  title: 'Hvilket vandfilter skal du vælge? Guide til det rigtige filter | Clean Water Supply',
  description:
    'Hvilket vandfilter skal du vælge? Se hvornår du skal bruge brusefilter, vandhanefilter, filterkande eller blødgøringsanlæg – og find det rigtige filter til dit behov.',
  alternates: { canonical: `${SITE_URL}/guides/vaelg-vandfilter` },
  keywords: [
    'vælg vandfilter', 'hvilket vandfilter', 'vandfilter til hane', 'brusefilter',
    'filterkande', 'blødgøringsanlæg', 'kalkfilter', 'vandhanefilter',
  ],
}

const FAQS: FAQ[] = [
  {
    q: 'Hvilket vandfilter skal jeg vælge?',
    a: 'Det afhænger af, hvad du vil løse. Vil du have bedre badevand, vælg et brusefilter. Vil du have renere vand fra hanen, vælg et vandhanefilter. Vil du have bedre drikkevand uden installation, vælg en filterkande. Og skal du af med kalk i hele huset, vælg et blødgøringsanlæg.',
  },
  {
    q: 'Hvad er forskellen på et brusefilter og et vandhanefilter?',
    a: 'Et brusefilter sidder på bruseren og forbedrer badevandet – mindre kalk og klor, mildere for hud og hår. Et vandhanefilter sidder ved køkken- eller håndvasken og renser det vand, du bruger til madlavning og drikke.',
  },
  {
    q: 'Hvornår skal jeg vælge en filterkande?',
    a: 'En filterkande er den nemmeste løsning til bedre drikkevand. Den renser vandet, mens du hælder – bedre smag, mindre klor, kalk og for nogle modeller mikroplast – helt uden installation. Perfekt til køkkenet, sommerhuset og på farten.',
  },
  {
    q: 'Hvornår skal jeg vælge et blødgøringsanlæg frem for et filter?',
    a: 'Et blødgøringsanlæg vælger du, når kalk er et problem i hele husstanden – aflejringer i rør, skjolder på glas og kort levetid på hvidevarer. Anlægget behandler alt vandet, før det når dine rør. Et filter løser derimod ét sted ad gangen (bruser, hane eller kande).',
  },
  {
    q: 'Kan jeg kombinere flere filtre?',
    a: 'Ja. Mange kombinerer fx et blødgøringsanlæg til kalk i hele huset med en filterkande til godt drikkevand og et brusefilter til badet. Løsningerne arbejder fint sammen og dækker hver deres behov.',
  },
  {
    q: 'Hvilket filter beskytter mod bakterier som Legionella?',
    a: 'Mod vandbårne bakterier som Legionella bruges et medicinsk certificeret bakteriefilter, der monteres ved tappestedet på hane eller bruser. Det er den samme type filter, som bruges på hospitaler og hoteller.',
  },
]

const KORT = [
  'Vælg efter behov: bruser → brusefilter, hane → vandhanefilter, drikkevand → filterkande.',
  'Kalk i hele huset løses bedst med et blødgøringsanlæg, ikke et enkelt filter.',
  'Mod bakterier som Legionella bruges et medicinsk certificeret bakteriefilter.',
  'Er du i tvivl, så brug vores vandvejviser og bliv guidet til den rette løsning.',
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Hvilket filter skal du vælge?', url: `${SITE_URL}/guides/vaelg-vandfilter` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Filter className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guide til valg af filter
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Hvilket vandfilter skal du vælge?</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Der findes et filter til hvert behov. Her får du den enkle guide til, hvornår du skal vælge
            brusefilter, vandhanefilter, filterkande eller blødgøringsanlæg – så du rammer rigtigt første gang.
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

      {/* VÆLG EFTER BEHOV */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-2">Vælg efter dit behov</h2>
          <p className="text-gray-600 mb-6 text-sm">Klik på en løsning for at se de produkter, der passer til den.</p>
          <VaelgFilterAccordion />
        </div>
      </section>

      {/* QUIZ CTA */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0a2540] to-[#284eff] rounded-3xl p-7 text-white text-center">
            <h2 className="text-xl font-extrabold mb-2">Stadig i tvivl?</h2>
            <p className="text-white/90 leading-relaxed text-sm mb-5 max-w-md mx-auto">
              Brug vores vandvejviser – svar på fire korte spørgsmål, så guider vi dig til det filter, der passer bedst til dit behov.
            </p>
            <Link href="/guides/find-filter" className="inline-flex items-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-6 py-3 transition-all hover:shadow-lg">
              Find dit filter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Spørgsmål og svar om valg af filter</h2>
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
