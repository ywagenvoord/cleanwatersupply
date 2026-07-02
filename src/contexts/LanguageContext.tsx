'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language } from '@/lib/translations'

const LANG_KEY = 'cws-lang'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('da')

  // Ved første besøg: brug gemt valg hvis det findes, ellers auto ud fra browseren
  // (dansk browser → dansk, alle andre → engelsk). Manuelt valg i vælgeren huskes.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY)
      if (saved === 'da' || saved === 'en' || saved === 'de') {
        setLanguageState(saved)
        return
      }
    } catch {}
    if (typeof navigator !== 'undefined') {
      const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
      const lower = langs.map((l) => (l || '').toLowerCase())
      if (lower.some((l) => l.startsWith('da'))) setLanguageState('da')
      else if (lower.some((l) => l.startsWith('de'))) setLanguageState('de')
      else setLanguageState('en')
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try { localStorage.setItem(LANG_KEY, lang) } catch {}
  }

  const t = (path: string): any => {
    const keys = path.split('.')
    const lookup = (lang: Language): any => {
      let value: any = translations[lang]
      for (const key of keys) {
        if (value === undefined || value === null) return undefined
        value = value[key]
      }
      return value
    }
    // Aktivt sprog → engelsk → dansk → nøglen (så intet vises tomt/i stykker)
    return lookup(language) ?? lookup('en') ?? lookup('da') ?? path
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
