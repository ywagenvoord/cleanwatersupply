'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  ArrowRight, Building2, GraduationCap, Plane, Coffee,
  Factory, Briefcase, TrendingDown, Heart, Leaf, ShieldCheck,
  Handshake, Clock, CheckCircle, Info
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const INDUSTRY_ICONS = [Building2, GraduationCap, Plane, Briefcase, Coffee, Factory]
const BENEFIT_ICONS = [TrendingDown, Heart, Leaf, ShieldCheck, Handshake, Clock]

export default function BusinessPage() {
  const { t } = useLanguage()

  const industries: { title: string; description: string }[] = t('businessPage.industries.items')
  const benefits: { title: string; description: string }[] = t('businessPage.benefits.items')
  const industryOptions: string[] = t('businessPage.form.industries')

  return (
    <main>
      {/* ─── HERO – SPLIT LAYOUT ──────────────────────────────── */}
      <section className="bg-[#0a2540] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: content */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                <Building2 className="w-3.5 h-3.5" />
                {t('businessPage.hero.badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.08]">
                {t('businessPage.hero.headline')}
              </h1>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                {t('businessPage.hero.subheadline')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#inquiry" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-0.5">
                  {t('businessPage.hero.cta1')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
                  {t('businessPage.hero.cta2')}
                </Link>
              </div>

              {/* Trust points */}
              <div className="mt-12 flex flex-wrap gap-6">
                {['1000+ hospitaler i Europa', 'Lufthansa partner', 'Medicinsk godkendt'].map((pt) => (
                  <div key={pt} className="flex items-center gap-2 text-white/60 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image in rounded card */}
            <div className="relative pb-10 lg:pb-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <img
                  src="/images/tradeshow.jpg"
                  alt="Clean Water Supply på messen"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1497366754035-f200968a677a?w=900&q=80&fit=crop' }}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-4 lg:-bottom-5 left-4 lg:-left-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-medium">Erhvervskunder</p>
                <p className="text-xl font-extrabold text-[#0a2540]">500+ virksomheder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge">{t('businessPage.industries.badge')}</span>
            <h2 className="section-heading">{t('businessPage.industries.headline')}</h2>
            <p className="section-subheading">{t('businessPage.industries.subheadline')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {(industries || []).map((industry, i) => {
              const Icon = INDUSTRY_ICONS[i] || Building2
              const gradients = [
                'from-blue-600 to-blue-700',
                'from-sky-500 to-sky-600',
                'from-indigo-500 to-indigo-600',
                'from-violet-500 to-violet-600',
                'from-emerald-500 to-emerald-600',
                'from-teal-500 to-teal-600',
              ]
              return (
                <ScrollReveal key={i} delay={i * 80} direction="up" scale>
                <div className="card p-7 hover:-translate-y-1 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{industry.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{industry.description}</p>
                </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── TECHNICIAN VISUAL ────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/images/technician-system.jpg"
            alt="Clean Water Supply technicus"
            className="w-full h-full object-cover object-top opacity-40"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80&fit=crop' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/95 via-[#0a2540]/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-green-400 text-sm font-bold uppercase tracking-widest mb-4">Kundeoplevelse</p>
            <blockquote className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
              "Clean Water Supply leverede en komplet vandbehandlingsløsning til vores hotel. Vores gæster mærker tydeligt forskel."
            </blockquote>
            <p className="text-blue-200 text-sm font-medium">— Maria Jensen, Hoteldirektør, Aarhus</p>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge">{t('businessPage.benefits.badge')}</span>
            <h2 className="section-heading">{t('businessPage.benefits.headline')}</h2>
            <p className="section-subheading">{t('businessPage.benefits.subheadline')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(benefits || []).map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i] || CheckCircle
              return (
                <ScrollReveal key={i} delay={i * 80} direction="up">
                <div className="flex gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a2540] to-blue-700 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5">{benefit.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── INQUIRY FORM ─────────────────────────────────────── */}
      <section id="inquiry" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge">{t('businessPage.hero.badge')}</span>
            <h2 className="section-heading">{t('businessPage.form.headline')}</h2>
            <p className="section-subheading">{t('businessPage.form.subheadline')}</p>
          </div>

          <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8 text-sm text-amber-800">
            <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <span>{t('businessPage.form.note')}</span>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { label: t('businessPage.form.nameLabel'), placeholder: t('businessPage.form.namePlaceholder'), type: 'text' },
                { label: t('businessPage.form.companyLabel'), placeholder: t('businessPage.form.companyPlaceholder'), type: 'text' },
                { label: t('businessPage.form.emailLabel'), placeholder: t('businessPage.form.emailPlaceholder'), type: 'email' },
                { label: t('businessPage.form.phoneLabel'), placeholder: t('businessPage.form.phonePlaceholder'), type: 'tel' },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder as string} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 text-sm placeholder:text-gray-300 cursor-not-allowed focus:outline-none" />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{t('businessPage.form.industryLabel')}</label>
                <select disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-300 text-sm cursor-not-allowed focus:outline-none appearance-none">
                  <option value="">{t('businessPage.form.industryPlaceholder')}</option>
                  {(industryOptions || []).map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{t('businessPage.form.messageLabel')}</label>
                <textarea rows={5} placeholder={t('businessPage.form.messagePlaceholder') as string} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 text-sm placeholder:text-gray-300 cursor-not-allowed focus:outline-none resize-none" />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <p className="text-xs text-gray-400 max-w-sm">{t('businessPage.form.disclaimer')}</p>
              <button disabled className="inline-flex items-center gap-2 bg-[#0a2540] opacity-50 cursor-not-allowed text-white px-8 py-3.5 rounded-full font-bold text-sm shrink-0">
                {t('businessPage.form.submitButton')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
