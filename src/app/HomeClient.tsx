'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  ArrowRight, CheckCircle, Droplets, Filter, Zap, Award,
  Wrench, Leaf, ShieldCheck, Star, Users, Clock, Building2,
  Home, ChevronRight, Quote
} from 'lucide-react'
import LegionellaSlider from '@/components/LegionellaSlider'
import ScrollReveal from '@/components/ScrollReveal'

const SOLUTIONS_ICONS = [
  <Filter key="f" className="w-7 h-7" />,
  <Droplets key="d" className="w-7 h-7" />,
  <Zap key="z" className="w-7 h-7" />,
]

const WHY_ICONS = [Award, Wrench, Leaf, ShieldCheck, Zap, CheckCircle]

export default function HomePage() {
  const { t } = useLanguage()

  const solutions = [
    { key: 'filtration', color: 'blue', href: '/solutions#filtration' },
    { key: 'softening', color: 'sky', href: '/solutions#softening' },
    { key: 'drinking', color: 'emerald', href: '/solutions#drinking' },
  ]

  const whyFeatures: { title: string; description: string }[] = t('whyUs.features')

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* YouTube background video – covers full hero, no controls */}
          <iframe
            src="https://www.youtube.com/embed/R-HfHwUlZbc?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=R-HfHwUlZbc&start=3"
            allow="autoplay; fullscreen"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',   /* 16:9 */
              minHeight: '100%',
              minWidth: '177.78vh', /* 100/56.25*100 */
              transform: 'translate(-50%, -50%)',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/75 to-blue-800/65" />
          {/* Decorative circles */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              {t('hero.badge')}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.07] tracking-tight">
              {t('hero.headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl leading-relaxed">
              {t('hero.subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-base font-bold transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                {t('hero.cta1')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-full text-base font-semibold transition-all"
              >
                {t('hero.cta2')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10">
              {[
                { value: t('hero.stat1Value'), label: t('hero.stat1Label') },
                { value: t('hero.stat2Value'), label: t('hero.stat2Label') },
                { value: t('hero.stat3Value'), label: t('hero.stat3Label') },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</span>
                  <span className="text-sm text-blue-200 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* ─── TRUST TICKER ──────────────────────────────────────── */}
      <section className="bg-gray-950 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, round) =>
            ['CE Certificeret', 'NSF Godkendt', 'ISO 9001', 'Drikkevandsgodkendt', 'Energimærket A+',
             'Legionella specialist', '5 års garanti', 'Landsdækkende service'].map((cert) => (
              <span key={`${round}-${cert}`} className="inline-flex items-center gap-2.5 text-gray-400 text-xs font-semibold uppercase tracking-widest mx-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {cert}
              </span>
            ))
          )}
        </div>
      </section>

      {/* ─── ABOUT INTRO ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="section-badge">{t('homeAbout.badge')}</span>
              <h2 className="section-heading mb-6">
                {t('homeAbout.headline')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-base">{t('homeAbout.body')}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-base">{t('homeAbout.body2')}</p>

              <ul className="space-y-3 mb-10">
                {[t('homeAbout.point1'), t('homeAbout.point2'), t('homeAbout.point3')].map((pt, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>

              <Link href="/about" className="btn-primary">
                {t('homeAbout.cta')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative pb-10 lg:pb-0">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/team-owner.jpg"
                  alt="Clean Water Supply"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80&fit=crop' }}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-4 lg:-bottom-6 left-4 lg:-left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Kvalitet</p>
                    <p className="text-sm font-bold text-gray-900">100% Certificeret</p>
                  </div>
                </div>
              </div>
              {/* Green accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge">{t('solutions.badge')}</span>
            <h2 className="section-heading">{t('solutions.headline')}</h2>
            <p className="section-subheading">{t('solutions.subheadline')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {solutions.map((sol, i) => {
              const Icon = SOLUTIONS_ICONS[i]
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-50 text-blue-700 border-blue-100',
                sky: 'bg-sky-50 text-sky-700 border-sky-100',
                emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
              }
              const bgMap: Record<string, string> = {
                blue: 'from-blue-600 to-blue-700',
                sky: 'from-sky-500 to-sky-600',
                emerald: 'from-emerald-500 to-emerald-600',
              }
              return (
                <ScrollReveal key={sol.key} delay={i * 120} direction="up" scale>
                <div className="card p-8 group hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bgMap[sol.color]} flex items-center justify-center mb-6 shadow-sm`}>
                    <div className="text-white">{Icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`solutions.${sol.key}.title`)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{t(`solutions.${sol.key}.description`)}</p>

                  <ul className="space-y-2 mb-7">
                    {[1, 2, 3].map((n) => (
                      <li key={n} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        {t(`solutions.${sol.key}.benefit${n}`)}
                      </li>
                    ))}
                  </ul>

                  <Link href={sol.href} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${colorMap[sol.color].split(' ')[1]} group-hover:gap-2.5 transition-all`}>
                    {t(`solutions.${sol.key}.cta`)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                </ScrollReveal>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/solutions" className="btn-secondary">
              {t('common.seeAllSolutions')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge">{t('whyUs.badge')}</span>
            <h2 className="section-heading">{t('whyUs.headline')}</h2>
            <p className="section-subheading">{t('whyUs.subheadline')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(whyFeatures || []).map((feature, i) => {
              const Icon = WHY_ICONS[i] || CheckCircle
              return (
                <ScrollReveal key={i} delay={i * 80} direction="up">
                <div className="group flex gap-5 p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SERVICE PROCESS ──────────────────────────────── */}
      <section className="py-24 bg-[#0a2540] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              {t('serviceSteps.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t('serviceSteps.headline')}</h2>
            <p className="text-blue-100/70 leading-relaxed">{t('serviceSteps.subheadline')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('serviceSteps.steps') as { number: string; title: string; description: string }[]).map((step, i) => (
              <ScrollReveal key={i} delay={i * 80} direction="up">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <span className="text-4xl font-extrabold text-emerald-400/40 leading-none block mb-4">{step.number}</span>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-blue-100/60 leading-relaxed">{step.description}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEGIONELLA PRODUCT SLIDER ─────────────────────────── */}
      <LegionellaSlider />

      {/* ─── PRIVATE & BUSINESS ────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading">{t('segments.headline')}</h2>
            <p className="section-subheading max-w-xl mx-auto">{t('segments.subheadline')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {/* Private */}
            <ScrollReveal direction="left" delay={0} className="h-full">
            <div className="relative rounded-3xl overflow-hidden min-h-[420px] group h-full">
              <img
                src="/images/filters-legionella.jpg"
                alt="Clean Water Supply filters"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop' }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/50 to-transparent" />
              <div className="relative p-10 flex flex-col h-full justify-end min-h-[420px]">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 uppercase tracking-widest mb-3">
                  <Home className="w-3.5 h-3.5" />
                  {t('segments.private.badge')}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">{t('segments.private.headline')}</h3>
                <p className="text-blue-100/80 text-sm mb-6 leading-relaxed">{t('segments.private.description')}</p>
                <Link href="/solutions" className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full text-sm font-bold transition-all self-start">
                  {t('segments.private.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            </ScrollReveal>

            {/* Business */}
            <ScrollReveal direction="right" delay={120} className="h-full">
            <div className="relative rounded-3xl overflow-hidden min-h-[420px] group h-full">
              <img
                src="/images/tradeshow.jpg"
                alt="Clean Water Supply beurs"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop' }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/50 to-transparent" />
              <div className="relative p-10 flex flex-col h-full justify-end min-h-[420px]">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200 uppercase tracking-widest mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  {t('segments.business.badge')}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">{t('segments.business.headline')}</h3>
                <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">{t('segments.business.description')}</p>
                <Link href="/business" className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-full text-sm font-bold transition-all self-start">
                  {t('segments.business.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge">{t('testimonials.badge')}</span>
            <h2 className="section-heading">{t('testimonials.headline')}</h2>
            <p className="section-subheading">{t('testimonials.subheadline')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {(t('testimonials.items') as any[]).map((item, i) => (
              <ScrollReveal key={i} delay={i * 120} direction="up" scale>
              <div className="card p-8 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
                <div className="flex mb-4">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            {t('ctaBanner.headline')}
          </h2>
          <p className="text-lg text-blue-100/80 mb-10 max-w-xl mx-auto">
            {t('ctaBanner.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-9 py-4 rounded-full font-bold text-base transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5">
              {t('ctaBanner.cta1')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+45XXXXXXXX" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-9 py-4 rounded-full font-semibold text-base transition-all">
              {t('ctaBanner.cta2')}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
