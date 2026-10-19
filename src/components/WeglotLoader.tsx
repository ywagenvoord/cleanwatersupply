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
const WEGLOT_API_KEY = 'wg_7ae52435c2ee505a1b7dd071006fe78b0'

type WeglotGlobal = { initialize: (o: Record<string, unknown>) => void }

export default function WeglotLoader() {
  useEffect(() => {
    const init = () => {
      const w = (window as unknown as { Weglot?: WeglotGlobal }).Weglot
      if (!w) return
      const style = { full_name: false, with_name: true, is_dropdown: true, with_flags: true, flag_type: 'circle', invert_flags: false }
      try {
        w.initialize({
          api_key: WEGLOT_API_KEY,
          // Placér sprog-vælgeren fast i topmenuen (desktop + mobil)
          switchers: [
            { style, location: { target: '#weglot-switcher-desktop', sibling: null } },
            { style, location: { target: '#weglot-switcher-mobile', sibling: null } },
          ],
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
