'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, CheckCircle, Filter, Droplets, Zap, Tag } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import ImageCarousel from '@/components/ImageCarousel'

const solutionData = [
  {
    key: 'filtration',
    id: 'filtration',
    icon: Filter,
    iconBg: 'from-blue-600 to-blue-700',
    accentColor: 'blue',
    imgSrc: '/images/solution-undervask.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1612966809548-4f4a8e1c9e7d?w=900&q=80&fit=crop',
    imgFit: 'object-contain',
    imgBg: 'bg-white',
    images: [] as string[],
    reverse: false,
  },
  {
    key: 'softening',
    id: 'softening',
    icon: Droplets,
    iconBg: 'from-sky-500 to-sky-600',
    accentColor: 'sky',
    imgSrc: '/images/softener-talent100b.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80&fit=crop',
    imgFit: 'object-contain',
    imgBg: 'bg-white',
    images: [
      'https://cleanwatersupply.dk/wp-content/uploads/2025/07/2-3.png',
      'https://cleanwatersupply.dk/wp-content/uploads/2025/07/1-3.png',
      'https://cleanwatersupply.dk/wp-content/uploads/2025/07/3-3.png',
    ] as string[],
    reverse: true,
  },
  {
    key: 'drinking',
    id: 'drinking',
    icon: Zap,
    iconBg: 'from-emerald-500 to-emerald-600',
    accentColor: 'emerald',
    imgSrc: '/images/technician-system.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=900&q=80&fit=crop',
    imgFit: 'object-contain',
    imgBg: 'bg-white',
    images: [
      '/images/product-tr5.jpg',
      '/images/product-tl6.jpg',
      'https://cleanwatersupply.dk/wp-content/uploads/2025/10/Hjemmeside-2-300x300.png',
      '/images/as-tube-155.jpg',
      'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915',
    ] as string[],
    reverse: false,
  },
]

export default function SolutionsPage() {
  const { t } = useLanguage()

  return (
    <main>
      {/* ─── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        <div className="absolute inset-0">
          <video
            src="/videos/loesninger-cover.mp4"
            poster="/images/loesninger-cover-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            {t('solutionsPage.hero.badge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('solutionsPage.hero.headline')}
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {t('solutionsPage.hero.subheadline')}
          </p>
        </div>
      </section>

      {/* ─── SOLUTIONS ─────────────────────────────────────────── */}
      {solutionData.map((sol) => {
        const Icon = sol.icon
        const benefits: string[] = t(`solutionsPage.${sol.key}.benefits`)
        const useCases: string[] = t(`solutionsPage.${sol.key}.useCases`)

        const accentText: Record<string, string> = {
          blue: 'text-blue-700',
          sky: 'text-sky-700',
          emerald: 'text-emerald-600',
        }
        const accentBg: Record<string, string> = {
          blue: 'bg-blue-50',
          sky: 'bg-sky-50',
          emerald: 'bg-emerald-50',
        }
        const accentBorder: Record<string, string> = {
          blue: 'border-blue-100',
          sky: 'border-sky-100',
          emerald: 'border-emerald-100',
        }

        return (
          <section key={sol.key} id={sol.id} className="py-24 scroll-mt-20 even:bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${sol.reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
                {/* Content */}
                <ScrollReveal direction={sol.reverse ? 'right' : 'left'} duration={700}>
                <div>
                  <div className={`inline-flex items-center gap-2.5 ${accentBg[sol.accentColor]} border ${accentBorder[sol.accentColor]} ${accentText[sol.accentColor]} text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5`}>
                    <Icon className="w-3.5 h-3.5" />
                    {t(`solutionsPage.${sol.key}.title`)}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
                    {t(`solutionsPage.${sol.key}.headline`)}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {t(`solutionsPage.${sol.key}.description`)}
                  </p>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Fordele</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(benefits || []).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use cases */}
                  <div className="mb-9">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Typiske anvendelsesområder</h4>
                    <div className="flex flex-wrap gap-2">
                      {(useCases || []).map((uc, i) => (
                        <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-full ${accentBg[sol.accentColor]} ${accentText[sol.accentColor]} border ${accentBorder[sol.accentColor]}`}>
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" className="btn-primary">
                    {t(`solutionsPage.${sol.key}.cta`)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                </ScrollReveal>

                {/* Image */}
                <ScrollReveal direction={sol.reverse ? 'left' : 'right'} duration={700} delay={100}>
                <div className="relative pb-10 lg:pb-0">
                  <div className={`aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl ${sol.imgBg}`}>
                    {sol.images && sol.images.length > 0 ? (
                      <ImageCarousel
                        images={sol.images.map((src) => ({ src, alt: t(`solutionsPage.${sol.key}.title`) as string }))}
                      />
                    ) : (
                      <img
                        src={sol.imgSrc}
                        alt={t(`solutionsPage.${sol.key}.title`) as string}
                        className={`w-full h-full ${sol.imgFit}`}
                        onError={(e) => { e.currentTarget.src = sol.fallbackSrc }}
                      />
                    )}
                  </div>
                </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        )
      })}

      {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
            {t('solutionsPage.bottomCta.headline')}
          </h2>
          <p className="text-blue-100/80 mb-9 text-lg">
            {t('solutionsPage.bottomCta.subheadline')}
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-9 py-4 rounded-full font-bold text-base transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5">
            {t('solutionsPage.bottomCta.cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
