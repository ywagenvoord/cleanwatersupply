'use client'

import { Cookie } from 'lucide-react'
import { openCookiePreferences } from './CookieConsent'

/**
 * Flydende knap nederst til venstre, der åbner cookie-indstillingerne.
 * (Sprog-vælgeren ligger i højre hjørne, så denne er i venstre.)
 */
export default function CookieFloatingButton() {
  return (
    <button
      onClick={openCookiePreferences}
      aria-label="Åbn cookie-indstillinger"
      title="Cookie-indstillinger"
      className="fixed bottom-5 left-5 z-40 w-11 h-11 flex items-center justify-center bg-[#0a2540] hover:bg-[#0e2f52] text-white rounded-full shadow-lg hover:shadow-xl ring-1 ring-white/10 transition-all duration-200"
    >
      <Cookie size={18} strokeWidth={2.5} />
    </button>
  )
}
