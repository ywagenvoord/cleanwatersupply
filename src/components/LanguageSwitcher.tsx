'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Vores egen sprog-vælger – gennemsigtig baggrund, kun flaget som symbol.
 * De øvrige flag folder ud. Weglot kører skjult (hide_switcher) og styrer
 * oversættelsen via window.Weglot.switchTo().
 */

type WeglotGlobal = {
  switchTo?: (code: string) => void
  getCurrentLang?: () => string
  on?: (event: string, cb: (arg?: unknown) => void) => void
}

const LANGS = [
  { code: 'da', label: 'Dansk', flag: 'dk' },
  { code: 'en', label: 'English', flag: 'gb' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
]

const flagUrl = (f: string) => `https://cdn.weglot.com/flags/circle/${f}.svg`

function Flag({ code, size = 24 }: { code: string; size?: number }) {
  const l = LANGS.find((x) => x.code === code) ?? LANGS[0]
  return (
    <img
      src={flagUrl(l.flag)}
      alt={l.label}
      width={size}
      height={size}
      className="rounded-full shrink-0"
      style={{ width: size, height: size }}
    />
  )
}

export default function LanguageSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' | 'float' }) {
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
    const t = setInterval(sync, 1000)
    const stop = setTimeout(() => clearInterval(t), 10000)
    return () => { clearInterval(t); clearTimeout(stop) }
  }, [])

  const choose = (code: string) => {
    try { (window as unknown as { Weglot?: WeglotGlobal }).Weglot?.switchTo?.(code) } catch { /* ignore */ }
    setLang(code)
    setOpen(false)
  }

  const others = LANGS.filter((l) => l.code !== lang)

  if (variant === 'float') {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <div className="flex flex-col-reverse items-center gap-2">
          <button
            onClick={() => setOpen(!open)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            aria-label="Skift sprog"
            className="w-11 h-11 rounded-full bg-[#0a2540] ring-1 ring-white/15 shadow-lg flex items-center justify-center hover:ring-white/30 transition-all"
          >
            <Flag code={lang} size={26} />
          </button>
          {open && others.map((l) => (
            <button
              key={l.code}
              onMouseDown={() => choose(l.code)}
              aria-label={l.label}
              title={l.label}
              className="w-11 h-11 rounded-full bg-[#0a2540] ring-1 ring-white/15 shadow-lg flex items-center justify-center hover:ring-white/40 transition-all animate-[fadeUp_.25s_ease]"
            >
              <Flag code={l.code} size={26} />
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'mobile') {
    return (
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => choose(l.code)}
            aria-label={l.label}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${lang === l.code ? 'bg-white/10 ring-1 ring-white/20' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <Flag code={l.code} size={22} />
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
        className="flex items-center gap-1 p-1.5 rounded-full bg-transparent hover:bg-white/10 transition-colors"
      >
        <Flag code={lang} size={24} />
        <ChevronDown className={`w-3 h-3 text-white/60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-[#0a2540] border border-white/15 rounded-xl shadow-xl overflow-hidden z-50 p-1.5 flex flex-col gap-1">
          {others.map((l) => (
            <button
              key={l.code}
              onMouseDown={() => choose(l.code)}
              aria-label={l.label}
              title={l.label}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <Flag code={l.code} size={24} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
