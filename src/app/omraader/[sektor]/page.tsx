import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react'
import { sektorer, getSektorById } from '@/lib/sektorer'
import { notFound } from 'next/navigation'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

import { SITE_URL } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return sektorer.map((s) => ({ sektor: s.id }))
}

export async function generateMetadata({ params }: { params: { sektor: string } }): Promise<Metadata> {
  const sektor = getSektorById(params.sektor)
  if (!sektor) return { title: 'Område ikke fundet', robots: { index: false } }

  const url = `${SITE_URL}/omraader/${sektor.id}`

  function truncate(text: string, max: number): string {
    if (text.length <= max) return text
    const sliced = text.substring(0, max)
    const lastSpace = sliced.lastIndexOf(' ')
    return (lastSpace > max * 0.7 ? sliced.substring(0, lastSpace) : sliced).replace(/[,.;:\s]+$/, '') + '…'
  }

  return {
    title: `Vandhygiejne for ${sektor.title.toLowerCase()}`,
    description: truncate(sektor.problemBody, 155),
    keywords: [sektor.title, 'Legionella', 'vandhygiejne', 'vandfilter', sektor.title.toLowerCase()],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${sektor.title} | Clean Water Supply`,
      description: sektor.tagline,
      images: sektor.heroImage ? [{ url: sektor.heroImage, alt: sektor.title }] : undefined,
      locale: 'da_DK',
      siteName: 'Clean Water Supply',
    },
  }
}

const staff = {
  kenneth: {
    name: 'Kenneth',
    role: 'CEO',
    phone: '+45 51 21 58 00',
    email: 'ksj@cleanwatersupply.dk',
    photo: 'https://cleanwatersupply.dk/wp-content/uploads/2025/10/Billeder-til-hjemmeside-e1765262253453-278x300.png',
  },
  kristoffer: {
    name: 'Kristoffer',
    role: 'Tekniker / Service',
    phone: '+45 22 32 01 56',
    email: 'kristoffer@cleanwatersupply.dk',
    photo: 'https://cleanwatersupply.dk/wp-content/uploads/2026/02/Kristoffer-300x200.png',
  },
}

export default function SektorPage({ params }: { params: { sektor: string } }) {
  const sektor = getSektorById(params.sektor)
  if (!sektor) notFound()

  const contact = staff[sektor.contactPerson]

  return (
    <main>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem',     url: SITE_URL },
          { name: 'Områder',  url: `${SITE_URL}/omraader` },
          { name: sektor.title, url: `${SITE_URL}/omraader/${sektor.id}` },
        ]}
      />
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="absolute inset-0">
          <img
            src={sektor.heroImage}
            alt=""
            width={1920}
            height={800}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-[#0a2540]/60" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            {sektor.title.toUpperCase()}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {sektor.intro}
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {sektor.tagline}
          </p>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-7">
            {sektor.values.map((val, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                <div className="w-10 h-10 rounded-full bg-[#3aad4a]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#3aad4a]" />
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-3">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM + BENEFITS ───────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-6">
                {sektor.problemHeading}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">{sektor.problemBody}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a2540] mb-5">Fordele for {sektor.title.toLowerCase()}</h3>
              <ul className="space-y-4">
                {sektor.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT PERSON ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-4">
                Kontakt os i dag
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                Vi er klar til at hjælpe dig med den rette løsning til {sektor.title.toLowerCase()}.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                Kontakt os <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Contact card */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 flex gap-6 items-start">
              <img
                src={contact.photo}
                alt={`${contact.name}, ${contact.role} hos Clean Water Supply`}
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="w-20 h-20 rounded-2xl object-cover shrink-0"
              />
              <div>
                <p className="font-extrabold text-[#0a2540] text-lg">{contact.name}</p>
                <p className="text-[#3aad4a] text-sm font-medium mb-4">{contact.role}</p>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0a2540] text-sm mb-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#3aad4a]" />
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0a2540] text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#3aad4a]" />
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Klar til at sikre din vandkvalitet?
          </h2>
          <p className="text-blue-100/70 mb-8">
            Se alle vores løsninger eller kontakt os direkte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20"
            >
              Se produkter <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/omraader"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
            >
              Alle områder
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
