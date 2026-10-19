'use client'

import { useState, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

/**
 * Vores egen sprog-vælger – matcher resten af topmenuen.
 * Weglot kører skjult (hide_switcher: true) og styrer selve oversættelsen
 * via window.Weglot.switchTo(). Så har vi fuld kontrol over udseendet.
 */

type WeglotGlobal = {
  switchTo?: (code: string) => void
  getCurrentLang?: () => string
  on?: (event: string, cb: (arg?: unknown) => void) => void
}

const LANGS = [
  { code: 'da', label: 'Dansk', short: 'DA', flag: '🇩🇰' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: '🇩🇪' },
]

export default function LanguageSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('da')

  useEffect(() => {
    const getW = () => (window as unknown as { Weglot?: WeglotGlobal }).Weglot
    const sync = () => {
      try {
        const c = getW()?.getCurrentLang?.()
        if (c) setLang(c)
      } catch { /* Weglot ikke klar endnu */ }
    }
    sync()
    try {
      getW()?.on?.('languageChanged', (nl) => { if (typeof nl === 'string') setLang(nl) })
      getW()?.on?.('initialized', sync)
    } catch { /* ignore */ }
    // Weglot kan loade efter mount – synk kort indtil den er klar
    const t = setInterval(sync, 1000)
    const stop = setTimeout(() => clearInterval(t), 10000)
    return () => { clearInterval(t); clearTimeout(stop) }
  }, [])

  const choose = (code: string) => {
    try { (window as unknown as { Weglot?: WeglotGlobal }).Weglot?.switchTo?.(code) } catch { /* ignore */ }
    setLang(code)
    setOpen(false)
  }

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0]

  if (variant === 'mobile') {
    return (
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => choose(l.code)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${lang === l.code ? 'text-green-400 bg-white/10' : 'text-white/70 bg-white/5 hover:bg-white/10 hover:text-white'}`}
          >
            <span className="text-base leading-none">{l.flag}</span> {l.short}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label="Skift sprog"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-xs font-medium"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{current.short}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-[#0a2540] border border-white/15 rounded-xl shadow-xl overflow-hidden z-50">
          <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-white/40">Sprog</p>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onMouseDown={() => choose(l.code)}
              className={`flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm transition-colors ${lang === l.code ? 'text-green-400 font-semibold bg-white/10' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
            >
              <span className="text-base leading-none">{l.flag}</span> {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
