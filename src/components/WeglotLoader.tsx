'use client'

import Script from 'next/script'

/**
 * Indlæser Weglot og oversætter siden automatisk.
 * Kilde-sprog (dansk) og mål-sprog (engelsk, tysk) styres i Weglot-dashboardet
 * under projektets Settings. Snippet'en behøver kun den offentlige API-nøgle.
 */
const WEGLOT_API_KEY = 'wg_7ae52435c2ee505a1b7dd071006fe78b0'

export default function WeglotLoader() {
  return (
    <Script
      src="https://cdn.weglot.com/weglot.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          const style = { full_name: false, with_name: true, is_dropdown: true, with_flags: true, flag_type: 'circle', invert_flags: false }
          ;(window as unknown as { Weglot?: { initialize: (o: Record<string, unknown>) => void } })
            .Weglot?.initialize({
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
      }}
    />
  )
}
