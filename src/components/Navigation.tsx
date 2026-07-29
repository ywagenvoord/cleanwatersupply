'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { useAudience } from '@/lib/useAudience'
import { useB2bLoggedIn } from '@/lib/useB2b'
import { useUser } from '@clerk/nextjs'
import { Menu, X, ChevronDown, ShoppingBag, Home, Building2 } from 'lucide-react'

export default function Navigation() {
  const { t } = useLanguage()
  const { itemCount, setOpen: setCartOpen } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const [audience, setAudience] = useAudience()
  const b2bLoggedIn = useB2bLoggedIn()
  const { user } = useUser()
  const firmaName =
    ((user?.unsafeMetadata as any)?.firma?.firmanavn as string) ||
    ((user?.publicMetadata as any)?.firma?.firmanavn as string) ||
    user?.firstName ||
    'Erhvervskonto'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [audOpen, setAudOpen] = useState(false)

  const audienceLabel = audience === 'erhverv' ? 'Erhverv' : audience === 'privat' ? 'Privat' : 'Privat/Erhverv'

  const chooseAudience = (value: 'privat' | 'erhverv') => {
    setAudience(value)
    setAudOpen(false)
    router.push(value === 'erhverv' ? '/' : '/private')
  }

  const loesningerChildren = [
    { href: '/loesninger/filtre-paa-tappestedet', label: 'Håndvask' },
    { href: '/loesninger/brusefilter', label: 'Bruser' },
    { href: '/loesninger/filtre-i-vandforsyningen', label: 'Vandforsyningen' },
    { href: '/loesninger/kalkanlaeg', label: 'Kalkanlæg' },
  ]

  const omraaderChildren = [
    { href: '/omraader/hoteller', label: 'Hoteller' },
    { href: '/omraader/svoemmehaller', label: 'Svømmehaller' },
    { href: '/omraader/hospitaler', label: 'Hospitaler' },
    { href: '/omraader/campingpladser', label: 'Campingpladser' },
    { href: '/omraader/foedevare', label: 'Fødevareindustri' },
    { href: '/omraader/landbruget', label: 'Landbrug' },
    { href: '/spildevand', label: 'Spildevand' },
  ]

  type NavLink = { href: string; label: string; children?: { href: string; label: string }[] }

  // Erhverv (og standard): fuld, teknisk menu med Områder-dropdown
  const erhvervLinks: NavLink[] = [
    { href: '/omraader', label: 'Løsninger', children: omraaderChildren },
    { href: '/legionella-anlaeg', label: 'Legionella-anlæg' },
    { href: '/eca-vand', label: 'ECA-VAND' },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ]

  // Privat: forenklet, hjem-fokuseret menu
  const privatLinks: NavLink[] = [
    { href: '/solutions', label: t('nav.solutions'), children: loesningerChildren },
    { href: '/legionella', label: 'Bakterier' },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const navLinks: NavLink[] = audience === 'erhverv' ? erhvervLinks : privatLinks

  // Hjem/logo: privat → den private forside; erhverv (og standard) → den originale forside
  const homeHref = audience === 'privat' ? '/private' : '/'
  // Shop-knap følger valget: erhverv → erhvervs-shoppen, ellers privat-shoppen
  const shopHref = audience === 'erhverv' ? '/shop/erhverv' : '/shop'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a2540] shadow-lg" aria-label="Hovednavigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">

          {/* Logo */}
          <Link
            href={homeHref}
            className="flex items-center"
            aria-label="Clean Water Supply – tilbage til forsiden"
          >
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
            {navLinks.map((link) => {
              const active = pathname === link.href || (!!link.children && pathname.startsWith(link.href))
              const linkClass = `px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${
                active ? 'text-white bg-white/15' : 'text-white/75 hover:text-white hover:bg-white/10'
              }`

              if (link.children) {
                return (
                  <div key={link.href} className="relative group">
                    <Link href={link.href} className={`${linkClass} inline-flex items-center gap-1`}>
                      {link.label}
                      <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                    </Link>
                    {/* Hover dropdown */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                      <div className="w-56 bg-[#0a2540] border border-white/15 rounded-xl shadow-xl overflow-hidden py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              pathname === child.href
                                ? 'text-green-400 font-semibold bg-white/10'
                                : 'text-white/75 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                        <Link
                          href={link.href}
                          className="block px-4 py-2.5 text-sm font-semibold text-green-400 hover:bg-white/10 border-t border-white/10"
                        >
                          Se alle →
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {audience === 'erhverv' && !b2bLoggedIn && (
              <Link
                href="/min-konto/login"
                className="whitespace-nowrap px-4 py-2 rounded-full border border-white/25 text-white/85 hover:text-white hover:bg-white/10 text-sm font-semibold transition-colors"
              >
                Log ind
              </Link>
            )}
            <Link
              href={shopHref}
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
            {/* Audience switcher – skjules når man er logget ind som erhverv */}
            {!b2bLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setAudOpen(!audOpen)}
                onBlur={() => setTimeout(() => setAudOpen(false), 150)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-xs font-medium"
              >
                {audience === 'erhverv' ? <Building2 className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
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
            )}
            {/* Firmanavn – klikbar chip helt til højre, fører til Min konto */}
            {b2bLoggedIn && (
              <Link
                href="/min-konto"
                title={`${firmaName} – gå til min konto`}
                className="flex items-center gap-2 pl-3 ml-1 border-l border-white/15 group"
              >
                <span className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 group-hover:border-[#3aad4a]/40 text-white/90 group-hover:text-white text-sm font-semibold whitespace-nowrap max-w-[200px] transition-colors">
                  <Building2 className="w-4 h-4 text-[#3aad4a] shrink-0" />
                  <span className="truncate">{firmaName}</span>
                </span>
              </Link>
            )}
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
          {audience === 'erhverv' && !b2bLoggedIn && (
            <Link
              href="/min-konto/login"
              onClick={() => setMobileOpen(false)}
              className="block border border-white/25 text-white/85 text-center px-6 py-3 rounded-full text-sm font-semibold mt-3"
            >
              Log ind
            </Link>
          )}
          <Link
            href={shopHref}
            onClick={() => setMobileOpen(false)}
            className="block bg-[#3aad4a] text-white text-center px-6 py-3 rounded-full text-sm font-bold mt-3"
          >
            {t('nav.shop')}
          </Link>
          {b2bLoggedIn ? (
            <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 px-1">Logget ind som</p>
              <Link
                href="/min-konto"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-1 text-white font-semibold"
              >
                <Building2 className="w-4 h-4 text-[#3aad4a]" /> {firmaName}
              </Link>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </nav>
  )
}
