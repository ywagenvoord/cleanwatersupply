import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Droplets } from 'lucide-react'
import { KANDER } from '@/lib/kander'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Vandkander med filter & filterflasker – rent vand uden installation | Clean Water Supply',
  description:
    'Se vores Laica filtervandkander og filterflasker: Carmen, MikroPLASTIK-STOP og GlaSSmart glasflaske. Rent vand med god smag – helt uden installation.',
  alternates: { canonical: `${SITE_URL}/vandkander` },
}

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
            Vandkander med filter &amp; filterflasker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rent vand med god smag – så nemt som at hælde op. Ingen installation, ingen værktøj.
            Vælg den løsning, der passer til dit hjem og dit forbrug.
          </p>
        </div>
      </section>

      {/* Kort-grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KANDER.map((k) => (
            <Link
              key={k.slug}
              href={`/vandkander/${k.slug}`}
              className="group flex flex-col rounded-3xl overflow-hidden bg-white ring-1 ring-blue-100/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Billede */}
              <div className="relative h-56 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
                {k.highlight && (
                  <span className="absolute top-4 left-4 rounded-full bg-green-100 text-[#2e7d34] text-[11px] font-black px-3 py-1">
                    {k.highlight}
                  </span>
                )}
                <img
                  src={k.img}
                  alt={k.name}
                  className="max-h-[200px] max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Tekst */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-[11px] font-bold text-[#2e9a3d] uppercase tracking-wider mb-1">{k.art}</p>
                <h2 className="text-lg font-extrabold text-[#0a2540] leading-tight">{k.name}</h2>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{k.tagline}</p>

                {k.capacity && (
                  <p className="text-sm font-bold text-[#284eff] mt-3">{k.capacity}</p>
                )}

                <div className="flex-1" />

                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0a2540] mt-5 group-hover:text-[#284eff] transition-colors">
                  Læs mere
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Filtre-krydslink */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
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
