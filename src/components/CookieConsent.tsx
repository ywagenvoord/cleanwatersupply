'use client'

import { useState, useEffect, useCallback } from 'react'
import { Cookie, X, Shield, BarChart3, Target } from 'lucide-react'
import Link from 'next/link'

/**
 * GDPR-compliant cookie consent banner med Google Consent Mode v2.
 * Nødvendige cookies er altid aktive; statistik og marketing er valgfri.
 * Brugerens valg gemmes i localStorage og synkroniseres med Google via dataLayer.
 */

const STORAGE_KEY = 'cws-cookie-consent-v1'
const CONSENT_EVENT = 'cws-consent-updated'
const OPEN_EVENT = 'cws-open-cookie-preferences'

export type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

function updateGoogleConsent(consent: ConsentState) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  gtag('consent', 'update', {
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    personalization_storage: consent.marketing ? 'granted' : 'denied',
    security_storage: 'granted',
  })
  window.dataLayer.push({
    event: 'cookie_consent_update',
    cookie_consent: {
      analytics: consent.analytics ? 'granted' : 'denied',
      marketing: consent.marketing ? 'granted' : 'denied',
      necessary: 'granted',
    },
  })
}

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed.timestamp) return null
    return parsed
  } catch {
    return null
  }
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [choices, setChoices] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      setVisible(true)
      updateGoogleConsent(DEFAULT_CONSENT)
    } else {
      updateGoogleConsent(stored)
      setChoices({ analytics: stored.analytics, marketing: stored.marketing })
    }
    const openHandler = () => {
      const current = getStoredConsent()
      if (current) setChoices({ analytics: current.analytics, marketing: current.marketing })
      setShowDetails(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_EVENT, openHandler)
    return () => window.removeEventListener(OPEN_EVENT, openHandler)
  }, [])

  const save = useCallback((consent: Omit<ConsentState, 'timestamp' | 'necessary'>) => {
    const full: ConsentState = { necessary: true, analytics: consent.analytics, marketing: consent.marketing, timestamp: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full))
    updateGoogleConsent(full)
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: full }))
    setVisible(false)
    setShowDetails(false)
  }, [])

  const acceptAll = () => save({ analytics: true, marketing: true })
  const rejectAll = () => save({ analytics: false, marketing: false })
  const saveChoices = () => save({ analytics: choices.analytics, marketing: choices.marketing })

  if (!visible) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[100]"
        aria-hidden="true"
        onClick={() => { if (showDetails && getStoredConsent()) setVisible(false) }}
      />
      <div
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-description"
        className="fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl sm:bottom-6 sm:left-6 sm:right-6 sm:max-w-2xl sm:mx-auto border border-gray-100 max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-11 h-11 rounded-xl bg-[#3aad4a]/12 flex items-center justify-center flex-shrink-0">
              <Cookie size={22} className="text-[#3aad4a]" />
            </div>
            <div className="flex-1">
              <h2 id="cookie-title" className="text-xl sm:text-2xl font-extrabold text-[#0a2540] leading-tight mb-1">Vi bruger cookies 💧</h2>
              <p id="cookie-description" className="text-sm text-gray-600 leading-relaxed">
                Vi bruger cookies for at få hjemmesiden til at fungere, forstå hvordan du bruger den, og vise dig relevante annoncer. Du bestemmer selv.
              </p>
            </div>
          </div>

          {showDetails && (
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Shield size={18} className="text-[#3aad4a] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-sm text-[#0a2540]">Nødvendige cookies</strong>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Altid aktive</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">Sørger for at hjemmesiden fungerer korrekt — fx indkøbskurv og sikkerhed. Kan ikke slås fra.</p>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer hover:border-[#3aad4a]/40 transition-colors">
                <BarChart3 size={18} className="text-[#3aad4a] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-sm text-[#0a2540]">Statistik</strong>
                    <input type="checkbox" checked={choices.analytics} onChange={(e) => setChoices((c) => ({ ...c, analytics: e.target.checked }))} className="w-5 h-5 rounded accent-[#3aad4a] cursor-pointer" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">Hjælper os med at forstå hvordan hjemmesiden bruges (Google Analytics) — sider, klik, søgninger. Vi sælger aldrig dine data.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer hover:border-[#3aad4a]/40 transition-colors">
                <Target size={18} className="text-[#3aad4a] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-sm text-[#0a2540]">Marketing</strong>
                    <input type="checkbox" checked={choices.marketing} onChange={(e) => setChoices((c) => ({ ...c, marketing: e.target.checked }))} className="w-5 h-5 rounded accent-[#3aad4a] cursor-pointer" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">Bruges til at vise relevante annoncer (Google Ads, Meta) på andre hjemmesider, og måle effekten af vores markedsføring.</p>
                </div>
              </label>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {!showDetails ? (
              <>
                <button onClick={rejectAll} className="order-3 sm:order-1 flex-1 px-4 py-3 rounded-full border border-gray-200 text-[#0a2540] text-sm font-semibold hover:bg-gray-50 transition-colors">Afvis alle</button>
                <button onClick={() => setShowDetails(true)} className="order-2 flex-1 px-4 py-3 rounded-full border border-gray-200 text-[#0a2540] text-sm font-semibold hover:bg-gray-50 transition-colors">Vælg selv</button>
                <button onClick={acceptAll} className="order-1 sm:order-3 flex-1 px-4 py-3 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white text-sm font-bold transition-colors">Accepter alle</button>
              </>
            ) : (
              <>
                <button onClick={rejectAll} className="flex-1 px-4 py-3 rounded-full border border-gray-200 text-[#0a2540] text-sm font-semibold hover:bg-gray-50 transition-colors">Afvis alle</button>
                <button onClick={saveChoices} className="flex-1 px-4 py-3 rounded-full border border-[#0a2540] text-[#0a2540] text-sm font-semibold hover:bg-gray-50 transition-colors">Gem mine valg</button>
                <button onClick={acceptAll} className="flex-1 px-4 py-3 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white text-sm font-bold transition-colors">Accepter alle</button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <Link href="/cookiepolitik" className="text-xs text-gray-500 hover:text-[#3aad4a] transition-colors underline underline-offset-2">Læs vores cookiepolitik</Link>
            {getStoredConsent() && (
              <button onClick={() => setVisible(false)} className="w-7 h-7 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-400" aria-label="Luk">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
