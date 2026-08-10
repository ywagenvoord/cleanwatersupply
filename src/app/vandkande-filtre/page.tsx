import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Filter } from 'lucide-react'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Filtre til vandkande – Bi-flux®, kalk, PFAS & FAST DISK | Clean Water Supply',
  description:
    'Udskiftningsfiltre til Laica filtervandkander: Bi-flux® Universal, LimescaleSTOP (kalk), HealthExpert (PFAS + magnesium) og FAST DISK til flasken. Find det rette filter.',
  alternates: { canonical: `${SITE_URL}/vandkande-filtre` },
}

type FilterType = {
  name: string
  art: string
  img: string
  tagline: string
  best: string
  points: string[]
  life: string
  brita?: boolean
}

const FILTERS: FilterType[] = [
  {
    name: 'Bi-flux® Universal',
    art: 'Art. F0M',
    img: '/images/product-filter-udskift.jpg',
    tagline: 'Det alsidige hverdagsfilter.',
    best: 'Bedst til: daglig brug, alsidig filtrering',
    life: '1 måned · ca. 150 L pr. filter',
    points: [
      'Reducerer klor, visse tungmetaller, pesticider og forebygger kalk',
      'Bevarer de nyttige mineralsalte (calcium, magnesium, kalium)',
      '6-trins filtrering ved kontrolleret hastighed',
      '100 % BPA-fri · Made in Italy · testet af uafhængige labs',
    ],
  },
  {
    name: 'Bi-flux® LimescaleSTOP',
    art: 'Art. H0L',
    img: 'https://www.laica.com/wp-content/uploads/limescalestop-filter.webp',
    tagline: 'Mod kalk og hårdt vand.',
    best: 'Bedst til: områder med hårdt vand',
    life: '1 måned · ca. 150 L pr. filter',
    brita: true,
    points: [
      'Reducerer kalk og hårdhed med op til 90 %',
      'Reducerer også mikroplast, tungmetaller og klor (5-trins)',
      'Giver let, blødt vand med bedre smag',
      'Passer også til Brita®-kander (LAICA-Key medfølger)',
    ],
  },
  {
    name: 'Bi-flux® HealthExpert',
    art: 'Art. P3M',
    img: 'https://www.laica.com/wp-content/uploads/healthexpert-prod.webp',
    tagline: 'Mod PFAS – med ekstra magnesium.',
    best: 'Bedst til: maksimal beskyttelse',
    life: '1 måned · ca. 150 L pr. filter',
    brita: true,
    points: [
      'Reducerer PFAS (“evighedskemikalier”) med op til 92 %',
      'Øger magnesium-indholdet i vandet (godt for hjerte & hjerne)',
      'Reducerer også mikroplast, klor, kalk og tungmetaller (5-trins)',
      'Passer også til Brita®-kander (LAICA-Key medfølger)',
    ],
  },
  {
    name: 'FAST DISK™',
    art: 'Til GlaSSmart-flasken',
    img: '/images/fast-disk.jpg',
    tagline: 'Instant-filtrering til flasken.',
    best: 'Bedst til: on-the-go / GlaSSmart-flasken',
    life: 'Skivefilter til instant-filtrering',
    points: [
      'Filtrerer øjeblikkeligt, mens du drikker/hælder',
      'Aktivt kul-mikrofilament – forbedrer smagen og reducerer klor',
      'Bevarer mineralsalte',
      'Reducerer plastflaske-forbrug med ca. 99 %',
    ],
  },
]

export default function VandkandeFiltrePage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 px-4 py-1.5 mb-6">
            <Filter className="w-3.5 h-3.5 text-[#3aad4a]" />
            <span className="text-xs font-bold text-[#3aad4a] uppercase tracking-widest">Udskiftningsfiltre</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] mb-5 leading-tight">
            Filtre til vandkande
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Skift filteret, og bevar rent vand med god smag. Vælg mellem vores Bi-flux®-filtre –
            fra alsidig hverdagsbrug til kalk-, PFAS- og magnesium-varianter.
          </p>
        </div>
      </section>

      {/* Filtre-grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {FILTERS.map((f) => (
            <div
              key={f.name}
              className="rounded-3xl border border-gray-100 shadow-sm bg-white overflow-hidden flex flex-col"
            >
              {/* Billede */}
              <div className="h-60 bg-white flex items-center justify-center p-4">
                <img src={f.img} alt={f.name} className="max-h-full max-w-full object-contain" />
              </div>

              <div className="p-8 pt-6 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[#3aad4a] uppercase tracking-wider mb-1">{f.art}</p>
                  <h2 className="text-xl font-extrabold text-[#0a2540] leading-tight">{f.name}</h2>
                </div>
                {f.brita && (
                  <span className="shrink-0 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
                    Passer også Brita®
                  </span>
                )}
              </div>

              <p className="text-gray-600 mt-2">{f.tagline}</p>
              <p className="text-[13px] font-semibold text-[#0a2540] mt-3">{f.best}</p>

              <ul className="mt-4 space-y-2 flex-1">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400 mt-5 pt-4 border-t border-gray-100">
                Levetid: <span className="font-semibold text-gray-600">{f.life}</span>
              </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hjælp / CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-20">
        <div className="rounded-3xl bg-[#0a2540] p-8 md:p-10 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Usikker på hvilket filter du skal bruge?</h2>
          <p className="text-blue-100/80 mb-6 max-w-xl mx-auto">
            Vi hjælper dig gratis med at finde det rigtige filter til dit vand og din kande.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-7 py-3.5 text-sm transition-colors"
            >
              Se i shoppen <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/vandkander"
              className="inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold px-7 py-3.5 text-sm transition-colors"
            >
              Se vandkanderne
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
