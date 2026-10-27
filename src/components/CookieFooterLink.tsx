'use client'

import { Cookie } from 'lucide-react'
import { openCookiePreferences } from './CookieConsent'

/** Footer-link der åbner cookie-indstillingerne (GDPR: samtykke kan altid trækkes tilbage). */
export default function CookieFooterLink() {
  return (
    <button
      onClick={openCookiePreferences}
      className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
    >
      <Cookie size={12} />
      <span>Cookie-indstillinger</span>
    </button>
  )
}
