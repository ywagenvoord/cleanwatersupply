'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import WaterBackground from '@/components/WaterBackground'
import ImageCarousel from '@/components/ImageCarousel'
import { ArrowRight, Heart, Eye, Leaf, Lightbulb, ShieldCheck, Users, Star, Droplets, Facebook, Instagram } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const VALUE_ICONS = [ShieldCheck, Leaf, Lightbulb, Heart, Users, Star]

export default function AboutPage() {
  const { t } = useLanguage()
  const values: { title: string; description: string }[] = t('aboutPage.values.items')

  return (
    <main>
      {/* ─── HERO – SPLIT LAYOUT ──────────────────────────────── */}
      <section className="relative bg-[#0a2540] overflow-hidden">
        <div className="absolute inset-0">
          <WaterBackground />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540] via-[#0a2540]/85 to-[#0a2540]/40" />
          <div className="absolute -top-32 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: content */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                <Droplets className="w-3.5 h-3.5" />
                {t('aboutPage.hero.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.08]">
                {t('aboutPage.hero.headline')}
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                {t('aboutPage.hero.subheadline')}
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="flex">
                  {Array.from({length: 5}).map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-amber-400' : 'text-amber-400/50'} fill-current`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className="text-white/70 text-sm">4,5/5 baseret på 2.900+ anmeldelser</span>
              </div>
            </div>

            {/* Right: følg os */}
            <div className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 p-8">
              <h2 className="text-2xl font-extrabold text-white mb-2">Følg os</h2>
              <p className="text-white/70 mb-6">Hold dig opdateret med nyheder, tips og løsninger på Facebook og Instagram.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61580903496592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center gap-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-4 text-white transition-all hover:-translate-y-0.5"
                >
                  <span className="w-11 h-11 rounded-xl bg-[#1877F2] flex items-center justify-center shrink-0">
                    <Facebook className="w-5 h-5 text-white" />
                  </span>
                  <span>
                    <span className="block font-bold leading-tight">Facebook</span>
                    <span className="block text-xs text-white/60">Følg os</span>
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/cleanwatersupply/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center gap-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-4 text-white transition-all hover:-translate-y-0.5"
                >
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </span>
                  <span>
                    <span className="block font-bold leading-tight">Instagram</span>
                    <span className="block text-xs text-white/60">Følg os</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image — first in DOM = left column */}
            <ScrollReveal direction="left" duration={700}>
            <div className="relative pb-10 lg:pb-0">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/kenneth-kontor.jpg"
                  alt="Kenneth fra Clean Water Supply"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Overlay card */}
              <div className="absolute bottom-4 lg:-bottom-6 left-4 lg:-left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 max-w-[220px]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-sm font-bold text-gray-900 leading-snug">Sundt vand til mennesker og dyr</p>
                <p className="text-xs text-gray-400 mt-1">Clean Water Supply</p>
              </div>
            </div>
            </ScrollReveal>
            {/* Text — second in DOM = right column */}
            <ScrollReveal direction="right" duration={700} delay={100}>
            <div>
              <span className="section-badge">{t('aboutPage.mission.badge')}</span>
              <h2 className="section-heading mb-6">{t('aboutPage.mission.headline')}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{t('aboutPage.mission.body')}</p>
              <p className="text-gray-600 leading-relaxed">{t('aboutPage.mission.body2')}</p>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── VISION ───────────────────────────────────────────── */}
      <section className="py-20 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <Eye className="w-3.5 h-3.5" />
            {t('aboutPage.vision.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {t('aboutPage.vision.headline')}
          </h2>
          <p className="text-blue-100/75 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('aboutPage.vision.body')}
          </p>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge">{t('aboutPage.values.badge')}</span>
            <h2 className="section-heading">{t('aboutPage.values.headline')}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {(values || []).map((value, i) => {
              const Icon = VALUE_ICONS[i] || Heart
              return (
                <ScrollReveal key={i} delay={i * 90} direction="up" scale>
                <div className="card p-7 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-5 shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SUSTAINABILITY ───────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1 pb-14 lg:pb-0">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <ImageCarousel
                  images={[
                    { src: '/images/anlaeg-tekniker.jpg', alt: 'Clean Water Supply tekniker ved ECA-anlæg' },
                    { src: '/images/sicursan-anlaeg.jpg', alt: 'Sicursan / Kirkmayer ECA-anlæg' },
                    { src: '/images/softener-talent100b.jpg', alt: 'Blødgøringsanlæg' },
                    { src: '/images/product-kalkbruser.jpg', alt: 'Brusehoved med vandfilter' },
                    { src: '/images/product-tr5.jpg', alt: 'Baclyser filter' },
                  ]}
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute inset-x-4 bottom-4 lg:-bottom-8 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  {[
                    { value: t('aboutPage.sustainability.stat1Value'), label: t('aboutPage.sustainability.stat1Label') },
                    { value: t('aboutPage.sustainability.stat2Value'), label: t('aboutPage.sustainability.stat2Label') },
                    { value: t('aboutPage.sustainability.stat3Value'), label: t('aboutPage.sustainability.stat3Label') },
                  ].map((stat, i) => (
                    <div key={i} className="text-center px-3">
                      <p className="text-xl font-extrabold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="section-badge">
                <Leaf className="w-3.5 h-3.5" />
                {t('aboutPage.sustainability.badge')}
              </span>
              <h2 className="section-heading mb-6">{t('aboutPage.sustainability.headline')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('aboutPage.sustainability.body')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden mt-16">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">{t('aboutPage.cta.headline')}</h2>
          <p className="text-blue-100/80 mb-9 text-lg">{t('aboutPage.cta.subheadline')}</p>
          <Link href="/contact" className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-9 py-4 rounded-full font-bold text-base transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5">
            {t('aboutPage.cta.button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
