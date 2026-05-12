'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const sectors = [
  {
    title: 'Hoteller',
    slug: 'hoteller',
    desc: 'Beskyt gæster og omdømme mod skjulte bakterier i vandinstallationer',
  },
  {
    title: 'Svømmehaller',
    slug: 'svoemmehaller',
    desc: 'Effektiv vandhygiejne i bassiner, jacuzzier og skyllerum',
  },
  {
    title: 'Hospitaler',
    slug: 'hospitaler',
    desc: 'Dokumenterbar patientbeskyttelse mod Legionella og Pseudomonas',
  },
  {
    title: 'Campingpladser',
    slug: 'campingpladser',
    desc: 'Sikker vandkvalitet til sæsonbetonede installationer',
  },
  {
    title: 'Det private hjem',
    slug: 'det-private-hjem',
    desc: 'Rent og sikkert vand til hele familien',
  },
  {
    title: 'Fødevareindustri',
    slug: 'foedevare',
    desc: 'Kemikaliefri desinfektion til fødevareproduktion',
  },
  {
    title: 'Landbrug',
    slug: 'landbruget',
    desc: 'Mikrobiologisk rent vand øger indtjeningen',
  },
]

export default function OmraaderPage() {
  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-[#0a2540]/60" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            OMRÅDER
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Vælg dit område
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Og din løsning til bakteriefrit vand...
          </p>
        </div>
      </section>

      {/* ─── SECTOR CARDS ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {sectors.map((sector) => (
              <Link
                key={sector.slug}
                href={`/omraader/${sector.slug}`}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-2xl p-8 flex flex-col gap-4 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <h2 className="text-xl font-extrabold text-[#0a2540] group-hover:text-[#3aad4a] transition-colors">
                  {sector.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{sector.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[#3aad4a] font-bold text-sm">
                  Læs mere <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
