'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { useAudience } from '@/lib/useAudience'
import { Menu, X, ChevronDown, ShoppingBag, Home, Building2 } from 'lucide-react'

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage()
  const { itemCount, setOpen: setCartOpen } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const [audience, setAudience] = useAudience()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [audOpen, setAudOpen] = useState(false)

  const audienceLabel = audience === 'erhverv' ? 'Erhverv' : audience === 'privat' ? 'Privat' : 'Jeg handler som'

  const chooseAudience = (value: 'privat' | 'erhverv') => {
    setAudience(value)
    setAudOpen(false)
    router.push(value === 'erhverv' ? '/erhverv' : '/private')
  }

  const navLinks = [
    { href: '/solutions', label: t('nav.solutions') },
    { href: '/legionella', label: 'Legionella' },
    { href: '/eca-vand', label: 'ECA-VAND' },
    { href: '/omraader', label: 'Områder' },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a2540] shadow-lg" aria-label="Hovednavigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">

          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Clean Water Supply – tilbage til forsiden">
            <img
              src="/images/logo.png"
              alt="Clean Water Supply – Danmarks specialist i Legionella-filtre"
              className="h-16 w-auto"
              width={200}
              height={64}
              decoding="async"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                  pathname === link.href
                    ? 'text-white bg-white/15'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/shop"
              className="px-5 py-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white text-sm font-bold transition-colors"
            >
              {t('nav.shop')}
            </Link>

            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Åbn kurv"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#3aad4a] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </button>
            {/* Audience switcher – far right */}
            <div className="relative">
              <button
                onClick={() => setAudOpen(!audOpen)}
                onBlur={() => setTimeout(() => setAudOpen(false), 150)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
              >
                {audience === 'erhverv' ? <Building2 className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                <span>{audienceLabel}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${audOpen ? 'rotate-180' : ''}`} />
              </button>
              {audOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-[#0a2540] border border-white/15 rounded-xl shadow-xl overflow-hidden z-50">
                  <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-white/40">Jeg handler som</p>
                  <button
                    onClick={() => chooseAudience('privat')}
                    className={`flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm transition-colors ${audience === 'privat' ? 'text-green-400 font-semibold bg-white/10' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Home className="w-4 h-4" /> Privat
                  </button>
                  <button
                    onClick={() => chooseAudience('erhverv')}
                    className={`flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm transition-colors ${audience === 'erhverv' ? 'text-green-400 font-semibold bg-white/10' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Building2 className="w-4 h-4" /> Erhverv
                  </button>
                </div>
              )}
            </div>
            {/* Language switcher – far right */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <span className="text-base leading-none">{language === 'da' ? '🇩🇰' : '🇬🇧'}</span>
                <span className="uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-[#0a2540] border border-white/15 rounded-xl shadow-xl overflow-hidden z-50">
                  <button
                    onClick={() => { setLanguage('da'); setLangOpen(false) }}
                    className={`flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm transition-colors ${language === 'da' ? 'text-green-400 font-semibold bg-white/10' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span>🇩🇰</span> Dansk
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setLangOpen(false) }}
                    className={`flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm transition-colors ${language === 'en' ? 'text-green-400 font-semibold bg-white/10' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span>🇬🇧</span> English
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile cart + menu */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Åbn kurv"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0 -right-0 bg-[#3aad4a] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="p-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a2540] border-t border-white/10 px-4 pt-4 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                pathname === link.href ? 'text-white bg-white/15' : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setMobileOpen(false)}
            className="block bg-[#3aad4a] text-white text-center px-6 py-3 rounded-full text-sm font-bold mt-3"
          >
            {t('nav.shop')}
          </Link>
          <div className="pt-4 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 px-1">Jeg handler som</p>
            <div className="flex gap-2">
              <button
                onClick={() => { chooseAudience('privat'); setMobileOpen(false) }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${audience === 'privat' ? 'text-green-400 bg-white/10' : 'text-white/70 bg-white/5 hover:bg-white/10 hover:text-white'}`}
              >
                <Home className="w-4 h-4" /> Privat
              </button>
              <button
                onClick={() => { chooseAudience('erhverv'); setMobileOpen(false) }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${audience === 'erhverv' ? 'text-green-400 bg-white/10' : 'text-white/70 bg-white/5 hover:bg-white/10 hover:text-white'}`}
              >
                <Building2 className="w-4 h-4" /> Erhverv
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={() => { setLanguage('da'); setMobileOpen(false) }}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${language === 'da' ? 'text-green-400 bg-white/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              🇩🇰 DA
            </button>
            <button
              onClick={() => { setLanguage('en'); setMobileOpen(false) }}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${language === 'en' ? 'text-green-400 bg-white/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
