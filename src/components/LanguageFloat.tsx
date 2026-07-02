'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronUp } from 'lucide-react'

/** Lille flydende sprog-vælger nede i venstre hjørne – fylder ikke i topmenuen. */
export default function LanguageFloat() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div className="relative">
        {open && (
          <div className="absolute bottom-full mb-2 left-0 w-36 bg-[#0a2540] border border-white/15 rounded-xl shadow-2xl overflow-hidden">
            <button
              onClick={() => { setLanguage('da'); setOpen(false) }}
              className={`flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm transition-colors ${language === 'da' ? 'text-green-400 font-semibold bg-white/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              <span>🇩🇰</span> Dansk
            </button>
            <button
              onClick={() => { setLanguage('en'); setOpen(false) }}
              className={`flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm transition-colors ${language === 'en' ? 'text-green-400 font-semibold bg-white/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              <span>🇬🇧</span> English
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          aria-label="Skift sprog"
          className="flex items-center gap-2 bg-[#0a2540] text-white shadow-lg border border-white/15 rounded-full pl-4 pr-3 py-2.5 text-sm font-semibold hover:bg-[#0e2f52] transition-colors"
        >
          <span className="text-base leading-none">{language === 'da' ? '🇩🇰' : '🇬🇧'}</span>
          <span className="uppercase">{language}</span>
          <ChevronUp className={`w-3.5 h-3.5 transition-transform ${open ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </div>
  )
}
