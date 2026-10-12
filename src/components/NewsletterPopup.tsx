'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, Check, Loader2, X, Sparkles, FileDown } from 'lucide-react'

const STORAGE_KEY = 'cws_newsletter_popup_v1'
const GUIDE_URL = '/guides/beskyt-dig-mod-bakterier.pdf'
const SHOW_AFTER_MS = 3500

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false) // styrer slide-in animationen
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  // Vis kortet efter 3-4 sek. – kun hvis det ikke er set/lukket før.
  // Test: tilføj ?popup=1 i adressen for altid at fremtvinge det.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const force = new URLSearchParams(window.location.search).get('popup') === '1'
    let seen = false
    try { seen = localStorage.getItem(STORAGE_KEY) === '1' } catch { /* ignorér */ }
    if (seen && !force) return
    const t = setTimeout(() => {
      setOpen(true)
      requestAnimationFrame(() => setShown(true))
    }, force ? 300 : SHOW_AFTER_MS)
    return () => clearTimeout(t)
  }, [])

  function remember() {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignorér */ }
  }

  function close() {
    remember()
    setShown(false)
    setTimeout(() => setOpen(false), 250) // vent på slide-out
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, tags: ['Nyhedsbrev-popup'] }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setMessage(data.error || 'Noget gik galt. Prøv igen.')
        return
      }
      setStatus('success')
      remember()
    } catch {
      setStatus('error')
      setMessage('Kunne ikke oprette forbindelse. Prøv igen.')
    }
  }

  if (!open) return null

  return (
    <div
      className={`fixed z-[100] bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 w-auto sm:w-[370px] transition-all duration-300 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      role="dialog"
      aria-label="Tilmeld nyhedsbrev"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Luk */}
        <button
          onClick={close}
          aria-label="Luk"
          className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white/80 hover:bg-gray-100 text-[#0a2540] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Topbånd med jeres farver */}
        <div className="relative h-16 bg-gradient-to-br from-[#0a2540] via-[#123a63] to-[#1b4f86] overflow-hidden">
          <div className="pointer-events-none absolute -top-8 -left-6 w-28 h-28 rounded-full bg-[#284eff]/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 right-6 w-28 h-28 rounded-full bg-[#3aad4a]/30 blur-2xl" />
          <span className="absolute left-4 bottom-2.5 inline-flex items-center gap-1.5 text-white text-[11px] font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#8fd39a]" /> GRATIS GUIDE
          </span>
        </div>

        <div className="p-4 sm:p-5">
          {status === 'success' ? (
            <div className="text-center py-1">
              <div className="w-11 h-11 mx-auto rounded-full bg-[#3aad4a] text-white flex items-center justify-center mb-2.5">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-[#0a2540]">Tak for din tilmelding!</h3>
              <p className="text-xs text-gray-600 mt-1">Hent din gratis guide her:</p>
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold text-sm px-5 py-2.5 transition-colors"
              >
                <FileDown className="w-4 h-4" /> Hent guiden (PDF)
              </a>
            </div>
          ) : (
            <>
              <h3 className="text-[15px] font-extrabold text-[#0a2540] leading-snug">
                Beskyt dig mod bakterier i vandet
              </h3>
              <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                Tilmeld dig nyhedsbrevet og få vores gratis guide med gode råd, fif og
                varsling ved udbrud i dit område.
              </p>

              <form onSubmit={handleSubmit} className="mt-3">
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <label htmlFor="popup-email" className="sr-only">E-mailadresse</label>
                  <input
                    id="popup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@mail.dk"
                    className="w-full rounded-xl pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-300 text-[#0a2540] placeholder:text-gray-400 outline-none focus:border-[#3aad4a] focus:ring-1 focus:ring-[#3aad4a] transition-colors"
                  />
                </div>

                <label className="flex items-start gap-2 mt-2.5 text-[11px] text-gray-500 cursor-pointer leading-snug">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded border-gray-400 text-[#3aad4a] focus:ring-[#3aad4a] shrink-0"
                  />
                  <span>
                    Ja tak til guiden og nyhedsbrevet. Afmeld når du vil. Se vores{' '}
                    <Link href="/privatlivspolitik" className="underline hover:text-[#0a2540]">privatlivspolitik</Link>.
                  </span>
                </label>

                {status === 'error' && (
                  <p className="mt-2 text-[11px] font-medium text-red-500" role="alert">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-3 w-full rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white font-bold text-sm px-5 py-2.5 transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Tilmelder…</>
                  ) : (
                    <><FileDown className="w-4 h-4" /> Send mig guiden</>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
