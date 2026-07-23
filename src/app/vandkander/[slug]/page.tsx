import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, ChevronRight, Droplets } from 'lucide-react'
import { KANDER, getKande } from '@/lib/kander'

export function generateStaticParams() {
  return KANDER.map((k) => ({ slug: k.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const k = getKande(params.slug)
  if (!k) return { title: 'Ikke fundet', robots: { index: false, follow: false } }
  return {
    title: `${k.name} | Clean Water Supply`,
    description: k.tagline,
    openGraph: { title: k.name, description: k.tagline, type: 'website' },
  }
}

export default function KandePage({ params }: { params: { slug: string } }) {
  const k = getKande(params.slug)
  if (!k) notFound()

  return (
    <main className="bg-white">
      {/* Brødkrumme */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <nav className="text-sm text-gray-400 flex items-center gap-1.5">
          <Link href="/vandkander" className="hover:text-[#0a2540]">Vandkander</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-600">{k.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Billede */}
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 to-white ring-1 ring-blue-100/70 flex items-center justify-center p-10 min-h-[340px]">
            {k.highlight && (
              <span className="absolute top-5 left-5 rounded-full bg-green-100 text-[#2e7d34] text-xs font-black px-3 py-1">
                {k.highlight}
              </span>
            )}
            <img src={k.img} alt={k.name} className="max-h-[320px] max-w-full object-contain drop-shadow-xl" />
          </div>

          {/* Tekst */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 mb-4">
              <Droplets className="w-3.5 h-3.5 text-[#3aad4a]" />
              <span className="text-[11px] font-bold text-[#2e9a3d] uppercase tracking-widest">{k.art}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] leading-tight">{k.name}</h1>
            <p className="text-lg text-gray-600 mt-3">{k.tagline}</p>
            {k.capacity && <p className="text-base font-bold text-[#284eff] mt-4">{k.capacity}</p>}

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-7 py-3.5 text-sm transition-colors"
              >
                Køb i shoppen <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 text-[#0a2540] font-semibold px-7 py-3.5 text-sm transition-colors"
              >
                Få rådgivning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Om produktet + fordele */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-extrabold text-[#0a2540] mb-3">Om {k.name.replace('Vandkaraffel ', '')}</h2>
            <p className="text-gray-600 leading-relaxed">{k.intro}</p>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#0a2540] mb-3">Fordele</h2>
            <ul className="space-y-2.5">
              {k.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specifikationer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#0a2540] px-6 py-4">
            <h2 className="text-white font-extrabold">Specifikationer</h2>
          </div>
          <dl className="divide-y divide-gray-100">
            {k.specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4 px-6 py-3.5">
                <dt className="text-sm text-gray-500">{s.label}</dt>
                <dd className="text-sm font-semibold text-[#0a2540] text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Krydslink filtre */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-3xl bg-blue-50 border border-blue-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h2 className="text-lg font-extrabold text-[#0a2540]">Filter: {k.filter}</h2>
            <p className="text-gray-600 text-sm mt-1">Se udskiftningsfiltrene og hvornår de skal skiftes.</p>
          </div>
          <Link
            href="/vandkande-filtre"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0a2540] hover:bg-[#0d3050] text-white font-bold px-6 py-3 text-sm transition-colors"
          >
            Se filtre <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tilbage / andre kander */}
        <div className="mt-8 text-center">
          <Link href="/vandkander" className="text-sm font-semibold text-gray-500 hover:text-[#0a2540]">
            ← Se alle vandkander
          </Link>
        </div>
      </section>
    </main>
  )
}
