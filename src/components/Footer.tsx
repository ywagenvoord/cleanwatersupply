'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const SECTORS = [
  { id: 'hoteller',         label: 'Hoteller' },
  { id: 'svoemmehaller',    label: 'Svømmehaller' },
  { id: 'hospitaler',       label: 'Hospitaler' },
  { id: 'campingpladser',   label: 'Campingpladser' },
  { id: 'det-private-hjem', label: 'Det private hjem' },
  { id: 'foedevare',        label: 'Fødevareindustri' },
  { id: 'landbruget',       label: 'Landbrug' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#0a2540] text-gray-400" role="contentinfo">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-5" aria-label="Clean Water Supply – tilbage til forsiden">
              <img
                src="/images/logo.png"
                alt="Clean Water Supply – Danmarks specialist i vandhygiejne"
                className="h-20 w-auto"
                width={180}
                height={56}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm font-semibold text-green-400 italic mb-3">
              ECHA Article 95 godkendt · 7 log retention · Made in EU
            </p>
            <a
              href="https://www.aqua-free.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-green-400 transition-colors mb-3"
            >
              Autoriseret forhandler af Aqua Free-produkter
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <address className="not-italic mt-3">
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <a href="tel:+4551215800" className="text-white hover:text-green-400 transition-colors">
                    +45 51 21 58 00
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <a href="mailto:info@cleanwatersupply.dk" className="text-white hover:text-green-400 transition-colors">
                    info@cleanwatersupply.dk
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-green-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-white">Strømøvej 3, 8700 Horsens<br /><span className="text-xs text-gray-500">CVR 44405563</span></span>
                </li>
              </ul>
            </address>
          </div>

          {/* Solutions / Products */}
          <nav aria-label="Produkter & løsninger">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Løsninger</h2>
            <ul className="space-y-3">
              {[
                { href: '/legionella',    label: 'Legionella-filtre' },
                { href: '/eca-vand',      label: 'ECA-vand & HClO' },
                { href: '/shop',          label: 'Shop alle produkter' },
                { href: '/solutions',     label: 'Alle løsninger' },
                { href: '/fordele',       label: 'Fordele' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-green-500 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sectors */}
          <nav aria-label="Sektorer">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Områder</h2>
            <ul className="space-y-3">
              {SECTORS.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/omraader/${s.id}`} className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-green-500 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/omraader" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                  Alle områder →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Virksomhed">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Virksomhed</h2>
            <ul className="space-y-3">
              {[
                { href: '/about',     label: 'Om os' },
                { href: '/business',  label: 'Erhverv' },
                { href: '/contact',   label: 'Kontakt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-green-500 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Partners */}
          <nav aria-label="Samarbejdspartnere">
            <h2 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Samarbejdspartnere</h2>
            <ul className="space-y-3">
              {[
                { name: 'JVT', url: 'https://www.jvt.dk' },
                { name: 'Aqua Free', url: 'https://www.aqua-free.com' },
                { name: 'Kirkmayer', url: 'https://www.kirkmayer.com' },
              ].map((p) => (
                <li key={p.name}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 text-green-500 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Clean Water Supply ApS · Alle rettigheder forbeholdes.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privatlivspolitik" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privatlivspolitik</Link>
            <Link href="/handelsbetingelser" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Handelsbetingelser</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
