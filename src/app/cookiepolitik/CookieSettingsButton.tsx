'use client'

import { Cookie } from 'lucide-react'
import { openCookiePreferences } from '@/components/CookieConsent'

export default function CookieSettingsButton() {
  return (
    <button
      onClick={openCookiePreferences}
      className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
    >
      <Cookie size={16} />
      Åbn cookie-indstillinger
    </button>
  )
}
