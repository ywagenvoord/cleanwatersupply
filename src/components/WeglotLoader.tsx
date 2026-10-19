'use client'

import { useEffect } from 'react'

/**
 * Indlæser Weglot og oversætter siden automatisk.
 * Kilde-sprog (dansk) og mål-sprog (engelsk, tysk) styres i Weglot-dashboardet.
 * Snippet'en behøver kun den offentlige API-nøgle.
 *
 * BEMÆRK: Weglot viser kun sprog-vælgeren/oversættelsen, når projektets ordkvote
 * ikke er opbrugt. Er kvoten nået ("Words limit reached"), svarer Weglots CDN 403,
 * og hverken vælger eller oversættelse vises – det er en konto-/plan-ting, ikke kode.
 */
const WEGLOT_API_KEY = 'wg_b9ca1189f293a7e5371f5f5440650e8b9'

type WeglotGlobal = { initialize: (o: Record<string, unknown>) => void }

export default function WeglotLoader() {
  useEffect(() => {
    const init = () => {
      const w = (window as unknown as { Weglot?: WeglotGlobal }).Weglot
      if (!w) return
      try {
        w.initialize({
          api_key: WEGLOT_API_KEY,
          // Udelad den private forside fra oversættelse (sparer ord på kvoten)
          excluded_paths: [{ value: '/private', type: 'START_WITH' }],
          // Vi bruger vores egen sprog-vælger (LanguageSwitcher) – skjul Weglots egen
          hide_switcher: true,
        })
      } catch {
        /* Weglot ikke tilgængelig – siden fungerer stadig på dansk */
      }
    }

    if ((window as unknown as { Weglot?: WeglotGlobal }).Weglot) { init(); return }

    const existing = document.querySelector<HTMLScriptElement>('script[data-weglot]')
    if (existing) { existing.addEventListener('load', init); return }

    const s = document.createElement('script')
    s.src = 'https://cdn.weglot.com/weglot.min.js'
    s.async = true
    s.setAttribute('data-weglot', '1')
    s.addEventListener('load', init)
    document.head.appendChild(s)
  }, [])

  return null
}
