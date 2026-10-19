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
          ;(window as unknown as { Weglot?: { initialize: (o: { api_key: string }) => void } })
            .Weglot?.initialize({ api_key: WEGLOT_API_KEY })
        } catch {
          /* Weglot ikke tilgængelig – siden fungerer stadig på dansk */
        }
      }}
    />
  )
}
