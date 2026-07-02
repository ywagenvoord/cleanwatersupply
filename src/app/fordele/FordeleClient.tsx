'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, CheckCircle, Droplets, Zap, Leaf, Heart, Wrench, TrendingDown } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const benefits = [
  {
    icon: Droplets,
    iconBg: 'from-blue-600 to-blue-700',
    imgSrc: 'https://amysoft.nl/wp-content/uploads/2025/01/SHOT-3_1129-scaled.jpg',
    reverse: false,
    key: 'scale',
  },
  {
    icon: Wrench,
    iconBg: 'from-sky-500 to-sky-600',
    imgSrc: 'https://amysoft.nl/wp-content/uploads/2025/02/Thebrandwagon-34October-17-2024161914-scaled.jpg',
    reverse: true,
    key: 'appliances',
  },
  {
    icon: Leaf,
    iconBg: 'from-emerald-500 to-emerald-600',
    imgSrc: 'https://amysoft.nl/wp-content/uploads/2025/01/shutterstock_2042393249-1.jpg',
    reverse: false,
    key: 'environment',
  },
  {
    icon: Heart,
    iconBg: 'from-pink-500 to-rose-500',
    imgSrc: 'https://amysoft.nl/wp-content/uploads/2024/12/Thebrandwagon-22September-23-2024210203.png',
    reverse: true,
    key: 'skin',
  },
  {
    icon: TrendingDown,
    iconBg: 'from-violet-500 to-violet-600',
    imgSrc: 'https://amysoft.nl/wp-content/uploads/2025/01/Waterontharder-energierekening-1.jpg',
    reverse: false,
    key: 'energy',
  },
]

export default function FordelePage() {
  const { t } = useLanguage()
  const page: any = t('benefitsPage')

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        <div className="absolute inset-0">
          <img
            src="https://amysoft.nl/wp-content/uploads/2025/01/Thebrandwagon-23November-27-2024140806-e1738683543933.png"
            alt=""
            className="w-full h-full object-cover object-top opacity-20"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/75 to-blue-800/60" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <Droplets className="w-3.5 h-3.5" />
            {page.hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {page.hero.headline}
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed mb-10">
            {page.hero.subheadline}
          </p>
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { value: '100%', label: page.hero.stat1 },
              { value: '50%', label: page.hero.stat3 },
              { value: '2.900+', label: page.hero.stat4 },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-blue-200/70 mt-1 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFIT SECTIONS ─────────────────────────────────── */}
      {benefits.map((b, idx) => {
        const Icon = b.icon
        const data = page.benefits[b.key]
        return (
          <section key={b.key} className={`py-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${b.reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>

                {/* Content */}
                <ScrollReveal direction={b.reverse ? 'right' : 'left'} duration={700}>
                <div>
                  <div className={`inline-flex items-center gap-2.5 bg-gradient-to-br ${b.iconBg} text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5`}>
                    <Icon className="w-3.5 h-3.5" />
                    {data.badge}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
                    {data.headline}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-5">{data.body}</p>
                  {data.body2 && <p className="text-gray-600 leading-relaxed mb-7">{data.body2}</p>}
                  <ul className="space-y-3 mb-8">
                    {(data.points as string[]).map((pt: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary">
                    {page.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                </ScrollReveal>

                {/* Image */}
                <ScrollReveal direction={b.reverse ? 'left' : 'right'} duration={700} delay={100}>
                <div className="relative pb-0">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                    <img
                      src={b.imgSrc}
                      alt={data.headline}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&fit=crop' }}
                    />
                  </div>
                </div>
                </ScrollReveal>

              </div>
            </div>
          </section>
        )
      })}

      {/* ─── SUMMARY BANNER ───────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://amysoft.nl/wp-content/uploads/2025/02/Thebrandwagon-23November-27-2024140806.jpg"
            alt=""
            className="w-full h-full object-cover object-top opacity-30"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/95 via-[#0a2540]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              {page.summary.headline}
            </h2>
            <ul className="space-y-4 mb-10">
              {(page.summary.points as string[]).map((pt: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-9 py-4 rounded-full font-bold text-base transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              {page.summary.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
