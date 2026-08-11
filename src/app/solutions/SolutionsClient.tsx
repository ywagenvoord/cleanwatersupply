'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAudience } from '@/lib/useAudience'
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
      '/images/blosgoringsanlaeg-100m.jpg',
      '/images/blosgoringsanlaeg-100bs.jpg',
      '/images/blosgoringsanlaeg-100b-v2.jpg',
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
      '/images/cblue-sc3-2.jpg',
      '/images/as-tube-155.jpg',
      'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915',
    ] as string[],
    reverse: false,
  },
]

/* Erhvervs-varianter af de hjem-orienterede tekster (kun dansk).
   Bruges når audience === 'erhverv', ellers falder vi tilbage på de private tekster. */
const ERHVERV_OVERRIDES: Record<string, string | string[]> = {
  'solutionsPage.hero.badge': 'Løsninger til erhverv',
  'solutionsPage.hero.headline': 'Rent, blødt og bakteriefrit vand i hele ejendommen',
  'solutionsPage.hero.subheadline':
    'Fra kalkfrit vand til bakteriefrie filtre – vi gør vandet i jeres ejendom renere, blødere og sikrere. Løsninger til bygninger og installationer af enhver størrelse.',

  'solutionsPage.filtration.headline': 'Rent og sikkert bakteriefrit vand i hele ejendommen',
  'solutionsPage.filtration.description':
    'Vores vandfiltre fjerner uønskede stoffer fra vandet i jeres bygning – uanset om I er på kommunalt vand eller egen boring. Filteret monteres centralt i rørledningen, så hvert eneste tappested i ejendommen leverer rent vand.',
  'solutionsPage.filtration.benefits': [
    'Fjerner bakterier, virus og parasitter',
    'Fjerner tungmetaller og pesticider',
    'Bedre smag og lugt på vandet',
    'Central montering i rørledningen',
    'Rent vand ved hvert tappested',
    'Til både kommunalt vand og egen boring',
  ],
  'solutionsPage.filtration.useCases': ['Hele ejendommen', 'Kontorer & institutioner', 'Egen boring', 'Produktion & køkken'],

  'solutionsPage.softening.headline': 'Blødt vand i hele ejendommen – uden kalk',
  'solutionsPage.softening.description':
    'Hårdt, kalkholdigt vand slider på rør, installationer og driftsudstyr. Vores blødgøringsanlæg fjerner kalken via ionbytning, så I får blødt vand i hele ejendommen: mindre kalk, lavere energiforbrug og længere levetid på udstyr og installationer.',
  'solutionsPage.softening.benefits': [
    'Mindre kalk på armaturer, fliser og udstyr',
    'Lavere energiforbrug på opvarmning af vand',
    'Mindre sæbe og rengøringsmiddel',
    'Forlænger levetiden på installationer og udstyr',
    'Beskytter rør og varmtvandsbeholdere',
    'Lavt vedligehold – service kun hvert 2. år',
  ],
  'solutionsPage.softening.useCases': ['Hele ejendommen', 'Hoteller & restauranter', 'Områder med hårdt vand', 'Produktion'],

  'solutionsPage.drinking.description':
    'Vores filtre monteres direkte på hane eller bruser og danner en barriere mod bakterier på det sidste stykke frem til tappestedet – dér, hvor risikoen er størst. Ideelt til hoteller, plejehjem, hospitaler og andre steder med sårbare brugere.',
  'solutionsPage.drinking.benefits': [
    'Filtrerer bakterier fra ved hane og bruser',
    'Ekstra tryghed for sårbare brugere',
    'Renere vand til bad og hår',
    'Nem, værktøjsfri montering',
    'Ingen ændring af jeres vandinstallation',
    'Medicinsk certificeret kvalitet',
  ],
  'solutionsPage.drinking.useCases': ['Hoteller', 'Plejehjem & hospitaler', 'Svømmehaller', 'Kontorer & institutioner'],

  'solutionsPage.bottomCta.headline': 'Ikke sikker på hvilken løsning der passer til jeres ejendom?',
  'solutionsPage.bottomCta.subheadline': 'Kontakt os, så hjælper vi jer med at finde den rigtige løsning til netop jeres installation.',
}

export default function SolutionsPage() {
  const { t, language } = useLanguage()
  const [audience] = useAudience()
  const erh = audience === 'erhverv' && language !== 'en'
  // Erhvervs-tekst hvis den findes, ellers den almindelige (private) tekst
  const tx = (key: string): any => (erh && key in ERHVERV_OVERRIDES ? ERHVERV_OVERRIDES[key] : t(key))

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
            {tx('solutionsPage.hero.badge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {tx('solutionsPage.hero.headline')}
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {tx('solutionsPage.hero.subheadline')}
          </p>
        </div>
      </section>

      {/* ─── SOLUTIONS ─────────────────────────────────────────── */}
      {solutionData.map((sol) => {
        const Icon = sol.icon
        const benefits: string[] = tx(`solutionsPage.${sol.key}.benefits`)
        const useCases: string[] = tx(`solutionsPage.${sol.key}.useCases`)

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
                    {tx(`solutionsPage.${sol.key}.headline`)}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {tx(`solutionsPage.${sol.key}.description`)}
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
            {tx('solutionsPage.bottomCta.headline')}
          </h2>
          <p className="text-blue-100/80 mb-9 text-lg">
            {tx('solutionsPage.bottomCta.subheadline')}
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
