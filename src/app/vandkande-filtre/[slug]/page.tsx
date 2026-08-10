import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, ChevronRight, Filter, BadgeCheck, Truck, Droplets } from 'lucide-react'
import { FILTRE, getFilter } from '@/lib/filtre'
import { SITE_URL } from '@/lib/site'
import ProductGallery from '@/components/ProductGallery'

export function generateStaticParams() {
  return FILTRE.map((f) => ({ slug: f.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFilter(params.slug)
  if (!f) return { title: 'Ikke fundet', robots: { index: false, follow: false } }
  return {
    title: `${f.name} – filter til vandkande | Clean Water Supply`,
    description: f.description.slice(0, 155),
    alternates: { canonical: `${SITE_URL}/vandkande-filtre/${f.slug}` },
    openGraph: { title: f.name, description: f.tagline, type: 'website' },
  }
}

export default function FilterPage({ params }: { params: { slug: string } }) {
  const f = getFilter(params.slug)
  if (!f) notFound()
  const others = FILTRE.filter((x) => x.slug !== f.slug)

  return (
    <main className="bg-white">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-7">
          <nav className="text-sm text-gray-400 flex items-center gap-1.5">
            <Link href="/vandkande-filtre" className="hover:text-[#0a2540] transition-colors">Filtre til vandkande</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-600">{f.name}</span>
          </nav>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Billede */}
            <ProductGallery items={(f.images ?? [f.img]).map((src) => ({ src }))} alt={f.name} />


            {/* Tekst */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-gray-200 px-3.5 py-1.5 mb-5 shadow-sm">
                <Filter className="w-3.5 h-3.5 text-[#3aad4a]" />
                <span className="text-[11px] font-bold text-[#2e9a3d] uppercase tracking-widest">{f.art}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-[1.05] tracking-tight">{f.name}</h1>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">{f.tagline}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {f.brita && (
                  <span className="rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold px-3 py-1.5 uppercase tracking-wide">Passer også Brita®</span>
                )}
                {f.glassmart && (
                  <span className="rounded-full bg-[#3aad4a]/10 text-[#3aad4a] text-[11px] font-bold px-3 py-1.5 uppercase tracking-wide">Passer til GlaSSmart</span>
                )}
                <span className="rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold px-3 py-1.5 uppercase tracking-wide">{f.best.replace('Bedst til: ', '')}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-8 py-4 text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
                >
                  Køb i shoppen <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/60 hover:bg-white text-[#0a2540] font-semibold px-8 py-4 text-sm transition-all"
                >
                  Få rådgivning
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Droplets className="w-4 h-4 text-[#284eff]" /> {f.life}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <BadgeCheck className="w-4 h-4 text-[#284eff]" /> Made in EU
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Truck className="w-4 h-4 text-[#284eff]" /> Levering 2-3 hverdage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OM + DET FILTRERER ───────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="rounded-3xl bg-gray-50 ring-1 ring-gray-200 p-7 md:p-8">
            <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Om filteret</span>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mt-1.5 mb-3 leading-tight">{f.name}</h2>
            <p className="text-gray-600 leading-relaxed">{f.description}</p>
          </div>
          <div className="rounded-3xl bg-gray-50 ring-1 ring-gray-200 p-7 md:p-8">
            <span className="text-[11px] font-black text-[#2e9a3d] uppercase tracking-widest">Det får du</span>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mt-1.5 mb-4 leading-tight">Sådan virker det</h2>
            <ul className="space-y-3">
              {f.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#3aad4a] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── SPECIFIKATIONER ──────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-3xl ring-1 ring-gray-200 overflow-hidden">
          <div className="bg-[#0a2540] px-7 py-5">
            <h2 className="text-lg font-extrabold text-white">Specifikationer</h2>
          </div>
          <dl className="divide-y divide-gray-100">
            {f.specs.map((s, i) => (
              <div key={s.label} className={`flex items-center justify-between gap-4 px-7 py-4 ${i % 2 === 1 ? 'bg-gray-50/60' : ''}`}>
                <dt className="text-sm text-gray-500">{s.label}</dt>
                <dd className="text-sm font-semibold text-[#0a2540] text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── ANDRE FILTRE ─────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-xl font-extrabold text-[#0a2540] mb-5">Andre filtre</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/vandkande-filtre/${o.slug}`}
              className="group rounded-2xl ring-1 ring-gray-200 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col"
            >
              <div className="h-36 bg-white flex items-center justify-center p-4">
                <img src={o.img} alt={o.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="px-5 pb-5">
                <p className="text-[10px] font-bold text-[#3aad4a] uppercase tracking-wider">{o.art}</p>
                <h3 className="text-sm font-extrabold text-[#0a2540] leading-tight mt-0.5">{o.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{o.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#0a2540] to-[#123a63] p-9 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Usikker på hvilket filter du skal bruge?</h2>
          <p className="text-blue-100/80 mb-7 max-w-xl mx-auto leading-relaxed">
            Vi hjælper dig gratis med at finde det rigtige filter til dit vand og din kande.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-8 py-4 text-sm transition-all">
              Se i shoppen <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/vandkande-filtre" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 text-sm transition-all">
              Se alle filtre
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
