'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Home, Building2, X } from 'lucide-react'
import { writeAudience } from '@/lib/useAudience'

// Nøgle i sessionStorage: vælgeren vises kun én gang per browsersession.
const SESSION_SEEN_KEY = 'cws-audience-modal-shown'

export default function AudienceModal() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (!isLoaded) return
    // Logget ind som erhverv → altid erhverv, aldrig mulighed for at vælge 'Privat'.
    if (isSignedIn) {
      writeAudience('erhverv')
      setOpen(false)
      return
    }
    // Vis vælgeren når man LANDER på forsiden – én gang per browsersession, så
    // alle der kommer ind via fx et Google-link ser, at der både er Privat og
    // Erhverv. Den vises ikke igen ved intern navigation i samme session, og
    // ikke ved refresh – men et nyt besøg (ny fane/session) viser den igen.
    if (typeof window === 'undefined' || window.location.pathname !== '/') return
    try {
      if (sessionStorage.getItem(SESSION_SEEN_KEY)) return
    } catch { /* sessionStorage utilgængelig – vis alligevel */ }
    setOpen(true)
  }, [isLoaded, isSignedIn])

  // Marker som vist i denne session + flag så quiz-popup'en kan vente på os.
  useEffect(() => {
    if (typeof window === 'undefined') return
    ;(window as unknown as { __cwsAudienceModalOpen?: boolean }).__cwsAudienceModalOpen = open
    if (open) {
      try { sessionStorage.setItem(SESSION_SEEN_KEY, '1') } catch {}
    }
  }, [open])

  useEffect(() => {
    // Logo-klik åbner vælgeren – men aldrig for indloggede erhvervskunder.
    const handler = () => { if (!isSignedIn) setOpen(true) }
    window.addEventListener('cws-open-audience', handler)
    return () => window.removeEventListener('cws-open-audience', handler)
  }, [isSignedIn])

  const choose = (value: 'privat' | 'erhverv') => {
    writeAudience(value)
    setOpen(false)
    router.push(value === 'erhverv' ? '/' : '/private')
  }

  const close = () => {
    writeAudience('skipped')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Luk"
          className="absolute top-4 right-4 w-9 h-9 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Velkommen til Clean Water Supply</h2>
          <p className="text-gray-600">Vælg hvad der passer til dig, så viser vi de mest relevante løsninger.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => choose('privat')}
            className="group flex flex-col items-center text-center gap-4 rounded-2xl border-2 border-gray-100 hover:border-emerald-400 hover:bg-emerald-50/50 p-6 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-emerald-100 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Privat</p>
              <p className="text-sm text-gray-500 mt-1">Løsninger til dit hjem</p>
            </div>
          </button>

          <button
            onClick={() => choose('erhverv')}
            className="group flex flex-col items-center text-center gap-4 rounded-2xl border-2 border-gray-100 hover:border-emerald-400 hover:bg-emerald-50/50 p-6 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-emerald-100 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Erhverv</p>
              <p className="text-sm text-gray-500 mt-1">Løsninger til din virksomhed</p>
            </div>
          </button>
        </div>

        <button
          onClick={close}
          className="block mx-auto mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Spring over
        </button>
      </div>
    </div>
  )
}
