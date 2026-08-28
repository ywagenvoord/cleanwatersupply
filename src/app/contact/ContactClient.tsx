'use client'

import { useState, FormEvent } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Phone, Mail, MapPin, ArrowRight, Info, Clock, MessageSquare, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const teamMembers = [
  {
    name: 'Kenneth',
    role: 'Stifter & indehaver',
    phone: '+45 51 21 58 00',
    email: 'ksj@cleanwatersupply.dk',
    photo: '/images/team-kenneth-sq.jpg',
  },
  {
    name: 'Kristoffer',
    role: 'Tekniker & Rejsemontør',
    phone: '+45 22 32 01 56',
    email: 'kristoffer@cleanwatersupply.dk',
    photo: '/images/team-kristoffer-sq.jpg',
  },
  {
    name: 'Camilla',
    role: 'Sale & Marketing Manager',
    phone: '+45 40 73 70 53',
    email: 'caj@cleanwatersupply.dk',
    photo: '/images/team-camilla-sq.jpg',
  },
  {
    name: 'Heidi',
    role: 'Bogholder',
    phone: null,
    email: 'bogholderi@cleanwatersupply.dk',
    photo: '/images/team-heidi-sq.jpg',
  },
]

export default function ContactPage() {
  const { t } = useLanguage()
  const typeOptions: string[] = t('contactPage.form.typeOptions')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('https://formsubmit.co/ajax/ksj@cleanwatersupply.dk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:     formData.name,
          phone:    formData.phone,
          email:    formData.email,
          type:     formData.type,
          message:  formData.message,
          _subject: `Ny henvendelse fra ${formData.name} – ${formData.type || 'Generel'}`,
          _template: 'table',
          _captcha: 'false',
          _cc: 'pj@cleanwatersupply.dk',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', type: '', message: '' })
      } else {
        throw new Error(data.message || 'Indsendelse mislykkedes')
      }
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Der opstod en fejl. Prøv venligst igen eller send os en e-mail direkte.')
    }
  }

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80&fit=crop"
            alt="Contact"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            {t('contactPage.hero.badge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {t('contactPage.hero.headline')}
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {t('contactPage.hero.subheadline')}
          </p>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ───────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-12">
            {[
              {
                icon: Phone,
                label: t('contactPage.info.phoneLabel'),
                value: '+45 51 21 58 00',
                href: 'tel:+4551215800',
                desc: 'Mandag–fredag 08:00–16:00',
                color: 'from-blue-600 to-blue-700',
              },
              {
                icon: Mail,
                label: t('contactPage.info.emailLabel'),
                value: 'info@cleanwatersupply.dk',
                href: 'mailto:info@cleanwatersupply.dk',
                desc: 'Vi svarer inden for 24 timer',
                color: 'from-sky-500 to-sky-600',
              },
              {
                icon: MapPin,
                label: t('contactPage.info.addressLabel'),
                value: 'Strømøvej 3, 8700 Horsens',
                href: 'https://www.google.com/maps/search/?api=1&query=Str%C3%B8m%C3%B8vej%203%2C%208700%20Horsens',
                desc: 'CVR: 44405563',
                color: 'from-emerald-500 to-emerald-600',
              },
            ].map((info, i) => {
              const Icon = info.icon
              return (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow p-8 flex gap-5 items-start">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1.5">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="font-extrabold text-gray-900 hover:text-[#0044c4] text-lg leading-snug break-words transition-colors"
                      >{info.value}</a>
                    ) : (
                      <p className="font-extrabold text-gray-900 text-lg leading-snug break-words">{info.value}</p>
                    )}
                    <p className="text-sm text-gray-400 mt-1.5">{info.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FORM + MAP ───────────────────────────────────────── */}
      <section className="py-16 pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{t('contactPage.form.headline')}</h2>
                <p className="text-gray-500 text-sm">{t('contactPage.form.subheadline')}</p>
              </div>

              {status === 'success' ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Tak for din henvendelse!</h3>
                  <p className="text-gray-600 mb-5">Vi har modtaget din besked og vender tilbage hurtigst muligt – typisk inden for 24 timer.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Send en ny besked
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{t('contactPage.form.nameLabel')} *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('contactPage.form.namePlaceholder') as string}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{t('contactPage.form.phoneLabel')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('contactPage.form.phonePlaceholder') as string}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{t('contactPage.form.emailLabel')} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contactPage.form.emailPlaceholder') as string}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{t('contactPage.form.typeLabel')}</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="">{t('contactPage.form.typePlaceholder')}</option>
                      {(typeOptions || []).map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">{t('contactPage.form.messageLabel')} *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contactPage.form.messagePlaceholder') as string}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between pt-2">
                    <p className="text-xs text-gray-400 max-w-xs">{t('contactPage.form.disclaimer')}</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full font-bold text-sm shrink-0 transition-all hover:shadow-lg hover:shadow-green-500/20"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sender...
                        </>
                      ) : (
                        <>
                          {t('contactPage.form.submitButton')}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right column – map placeholder + info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Google Maps embed */}
              <div className="flex-1 rounded-3xl overflow-hidden min-h-[300px] shadow-lg border border-gray-100">
                <iframe
                  src="https://maps.google.com/maps?q=Str%C3%B8m%C3%B8vej%203%2C%208700%20Horsens&t=m&z=11&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ minHeight: '300px', border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clean Water Supply – Service i hele Danmark"
                />
              </div>

              {/* Opening hours */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-700" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">Åbningstider</p>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    { day: 'Mandag – fredag', hours: '08:00 – 16:00' },
                    { day: 'Lørdag – søndag', hours: 'Lukket' },
                  ].map((row, i) => (
                    <li key={i} className="flex justify-between text-gray-600">
                      <span>{row.day}</span>
                      <span className={`font-medium ${row.hours === 'Lukket' ? 'text-gray-400' : 'text-gray-900'}`}>{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ─── TEAM ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Mød teamet</h2>
            <p className="text-gray-500">Vi er klar til at hjælpe dig</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-lg transition-shadow">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-36 h-36 rounded-3xl object-cover object-top mx-auto mb-5 bg-gray-100"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-[#0a2540] to-blue-700 flex items-center justify-center mx-auto mb-5">
                    <span className="text-4xl font-extrabold text-white">{member.name[0]}</span>
                  </div>
                )}
                <p className="font-bold text-[#0a2540] text-xl">{member.name}</p>
                <p className="text-[#3aad4a] text-sm font-medium mb-4">{member.role}</p>
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-1.5 text-gray-500 hover:text-[#0a2540] text-xs mb-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#3aad4a]" />
                    {member.phone}
                  </a>
                )}
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center gap-1.5 text-gray-500 hover:text-[#0a2540] text-xs transition-colors whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5 text-[#3aad4a] shrink-0" />
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
