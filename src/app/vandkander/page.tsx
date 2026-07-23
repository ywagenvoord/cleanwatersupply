import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Droplets } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vandkander & filterflasker – rent vand uden installation | Clean Water Supply',
  description:
    'Se vores Laica filtervandkander og filterflasker: Carmen, MikroPLASTIK-STOP og GlaSSmart glasflaske. Rent vand med god smag – helt uden installation.',
}

type Jug = {
  name: string
  art: string
  img: string
  tagline: string
  capacity?: string
  points: string[]
  highlight?: string
}

const JUGS: Jug[] = [
  {
    name: 'Filtervandkande Carmen',
    art: 'Art. J35-DA',
    img: 'https://www.laica.com/wp-content/uploads/J35-DA.jpg',
    tagline: 'Klassisk, let og nem filtervandkande til hverdagen.',
    capacity: '2,3 L total · 1,2 L filtreret',
    points: [
      'Hurtigfyldnings-låge – fyld direkte under hanen',
      'Passer i køleskabsdøren',
      'Batterifri “eco-friendly” skift-indikator',
      'Bruger Bi-flux®-filterpatron',
      'Made in Italy',
    ],
  },
  {
    name: 'Filtervandkande MikroPLASTIK-STOP™',
    art: 'Art. UFSBE02',
    img: 'https://www.laica.com/wp-content/uploads/Caraffa-MikroPlastik.jpg',
    tagline: 'Den første kande med dobbelt filter, der stopper mikroplast.',
    capacity: '3 L total · 2 L filtreret',
    highlight: 'Fjerner 99,99 % mikroplast',
    points: [
      'Dobbelt filtersystem: Bi-flux® + MikroPLASTIK-STOP™',
      'Fjerner >99,99 % af mikroplast ≥ 1 µm (testet af uafhængige labs)',
      'Bevarer de nyttige mineralsalte i vandet',
      '“Flow ’n go” hæld-gennem-låg med støvbeskyttelse',
      'Fødevaregodkendte materialer · 100 % genanvendelig emballage',
    ],
  },
  {
    name: 'GlaSSmart™ glas-filterflaske',
    art: 'FAST DISK™',
    img: 'https://www.laica.com/wp-content/uploads/glassmart-lifestyle01.jpg',
    tagline: 'Filtrerer vandet med det samme – med dig på farten.',
    capacity: 'Glasflaske til on-the-go',
    points: [
      'FAST DISK™ instant-filtrering med aktivt kul',
      'Forbedrer smagen og reducerer klor',
      'Bevarer mineralsalte',
      'Glas bevarer vandets naturlige karakter · tåler opvaskemaskine',
      'Reducerer plastflaske-forbrug med ca. 99 %',
    ],
  },
]

export default function VandkanderPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 px-4 py-1.5 mb-6">
            <Droplets className="w-3.5 h-3.5 text-[#3aad4a]" />
            <span className="text-xs font-bold text-[#3aad4a] uppercase tracking-widest">Til hjemmet</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] mb-5 leading-tight">
            Filtervandkander &amp; filterflasker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rent vand med god smag – så nemt som at hælde op. Ingen installation, ingen værktøj.
            Vælg den løsning, der passer til dit hjem og dit forbrug.
          </p>
        </div>
      </section>

      {/* Kander */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 space-y-8">
        {JUGS.map((j, i) => (
          <div
            key={j.name}
            className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white"
          >
            <div className={`relative min-h-[240px] bg-gray-50 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <img src={j.img} alt={j.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs font-bold text-[#3aad4a] uppercase tracking-wider mb-1">{j.art}</p>
              <h2 className="text-2xl font-extrabold text-[#0a2540] leading-tight">{j.name}</h2>
              <p className="text-gray-600 mt-2">{j.tagline}</p>

              {j.highlight && (
                <span className="inline-flex self-start items-center gap-1.5 rounded-full bg-green-50 text-[#2e9a3d] text-xs font-bold px-3 py-1 mt-4">
                  {j.highlight}
                </span>
              )}

              {j.capacity && (
                <p className="text-sm font-semibold text-gray-500 mt-4">{j.capacity}</p>
              )}

              <ul className="mt-4 space-y-2">
                {j.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Filtre-krydslink */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="rounded-3xl bg-blue-50 border border-blue-100 p-8 text-center">
          <h2 className="text-xl font-extrabold text-[#0a2540] mb-2">Skal filteret skiftes?</h2>
          <p className="text-gray-600 mb-5 max-w-xl mx-auto">
            Vi har flere typer udskiftningsfiltre til vandkanden – fra standard til
            kalk-, PFAS- og magnesium-varianter.
          </p>
          <Link
            href="/vandkande-filtre"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a2540] hover:bg-[#0d3050] text-white font-bold px-7 py-3.5 text-sm transition-colors"
          >
            Se filtre til vandkande <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl bg-[#0a2540] p-8 md:p-10 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Klar til rent vand fra kanden?</h2>
          <p className="text-blue-100/80 mb-6 max-w-xl mx-auto">
            Se kanderne i shoppen, eller kontakt os for gratis rådgivning om, hvad der passer bedst
            til jer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-7 py-3.5 text-sm transition-colors"
            >
              Se i shoppen <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold px-7 py-3.5 text-sm transition-colors"
            >
              Få gratis rådgivning
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
