'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Language } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Oversættelse håndteres nu af Weglot. Siden renderes altid på dansk (kilde-sprog),
  // og Weglot oversætter DOM'en til engelsk/tysk. Derfor er sproget låst til 'da'.
  const [language] = useState<Language>('da')

  const setLanguage = (_lang: Language) => {
    /* no-op – sprogskift sker via Weglots egen vælger */
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
