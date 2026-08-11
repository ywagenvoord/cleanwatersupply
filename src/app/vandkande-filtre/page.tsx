import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Filter } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import { FILTRE } from '@/lib/filtre'

export const metadata: Metadata = {
  title: 'Filtre til vandkande – Bi-flux®, kalk, PFAS & FAST DISK | Clean Water Supply',
  description:
    'Udskiftningsfiltre til Laica filtervandkander: Bi-flux® Universal, LimescaleSTOP (kalk), HealthExpert (PFAS + magnesium) og FAST DISK til flasken. Find det rette filter.',
  alternates: { canonical: `${SITE_URL}/vandkande-filtre` },
}

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
          {FILTRE.map((f) => (
            <Link
              key={f.slug}
              href={`/vandkande-filtre/${f.slug}`}
              className="group rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-white overflow-hidden flex flex-col"
            >
              {/* Billede */}
              <div className="h-72 bg-white flex items-center justify-center p-3">
                <img src={f.img} alt={f.name} className="h-full w-full object-contain" />
              </div>

              <div className="p-8 pt-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#3aad4a] uppercase tracking-wider mb-1">{f.art}</p>
                    <h2 className="text-xl font-extrabold text-[#0a2540] leading-tight">{f.name}{f.titleSuffix ? ` ${f.titleSuffix}` : ''}</h2>
                  </div>
                  {f.brita && (
                    <span className="shrink-0 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
                      Passer også Brita®
                    </span>
                  )}
                  {f.glassmart && (
                    <span className="shrink-0 rounded-full bg-[#3aad4a]/10 text-[#3aad4a] text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide">
                      Passer til GlaSSmart
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

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Levetid: <span className="font-semibold text-gray-600">{f.life}</span>
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#3aad4a] group-hover:gap-2 transition-all">
                    Se filter <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
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
