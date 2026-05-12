'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Droplets, Search } from 'lucide-react'
import Link from 'next/link'

const slides = [
  {
    id: 0,
    label: 'Legionella beskyttelse',
    headline: 'Legionella problemer?',
    sub: 'Aqua-free brusfiltre fjerner 99,9% af bakterier inkl. Legionella – godkendt til medicinsk brug og anvendt af 1000+ hospitaler i Europa.',
    badge: 'Medicinsk godkendt',
    color: 'from-blue-900 to-[#0a2540]',
    accent: 'text-blue-300',
    img: '/images/filters-legionella.jpg',
    position: 'object-center',
  },
  {
    id: 1,
    label: 'Blødgøringsanlæg',
    headline: 'Et kalkfrit hjem',
    sub: 'TALENT 100B – pladsbesparende og fleksibelt blødgøringsanlæg med separat salttank. Designet til stabil og effektiv drift.',
    badge: 'TALENT 100B',
    color: 'from-sky-900 to-[#0a2540]',
    accent: 'text-sky-300',
    img: '/images/softener-talent100b.jpg',
    position: 'object-center',
  },
  {
    id: 2,
    label: 'Erhvervsløsninger',
    headline: 'Nemt, driftsikkert og effektivt',
    sub: 'Professionelle vandbehandlingsanlæg til industri, hoteller, skoler og institutioner. Vi tilpasser løsningen til jeres behov.',
    badge: 'Erhverv',
    color: 'from-emerald-900 to-[#0a2540]',
    accent: 'text-emerald-300',
    img: '/images/technician-system.jpg',
    position: 'object-top',
  },
]

export default function LegionellaSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[active]

  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Search className="w-3.5 h-3.5" />
            Vores produkter i fokus
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Løsninger der virker</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: content */}
          <div className="order-2 lg:order-1">
            {/* Tab buttons */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    active === i
                      ? 'bg-white text-gray-900'
                      : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 text-xs font-bold ${slide.accent} bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest transition-all`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {slide.badge}
            </div>

            {/* Text */}
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight transition-all">
              {slide.headline}
            </h3>
            <p className="text-white/65 text-base leading-relaxed mb-8 transition-all">
              {slide.sub}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '99,9%', label: 'Bakteriefri' },
                { value: '1000+', label: 'Hospitaler' },
                { value: '5 år', label: 'Garanti' },
              ].map((st) => (
                <div key={st.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-xl font-extrabold text-white">{st.value}</p>
                  <p className="text-xs text-white/50 mt-1">{st.label}</p>
                </div>
              ))}
            </div>

            <Link href="/solutions" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20">
              Se alle løsninger
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: image */}
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10">
              <img
                key={slide.id}
                src={slide.img}
                alt={slide.headline}
                className={`w-full h-full object-cover ${slide.position} transition-all duration-700`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${slide.color} opacity-20`} />
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${active === i ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => setActive((active - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActive((active + 1) % slides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
