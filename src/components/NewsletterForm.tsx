'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Check, Loader2 } from 'lucide-react'

type Variant = 'footer' | 'section'

export default function NewsletterForm({ variant = 'section' }: { variant?: Variant }) {
  const [email, setEmail]     = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const dark = variant === 'footer'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const res  = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, consent }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error || 'Noget gik galt. Prøv igen.')
        return
      }

      setStatus('success')
      setEmail('')
      setConsent(false)
    } catch {
      setStatus('error')
      setMessage('Kunne ikke oprette forbindelse. Prøv igen.')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`flex items-start gap-3 rounded-2xl p-4 ${
          dark ? 'bg-white/5 text-gray-300' : 'bg-white border border-[#3aad4a]/30'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#3aad4a] text-white flex items-center justify-center shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <div>
          <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-[#0a2540]'}`}>
            Tak for din tilmelding!
          </p>
          <p className={`text-xs mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Du er nu tilmeldt nyhedsbrevet. Du kan altid afmelde igen.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex flex-col sm:flex-row gap-2 ${dark ? '' : 'sm:gap-3'}`}>
        <div className="relative flex-1">
          <Mail
            className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              dark ? 'text-gray-500' : 'text-gray-400'
            }`}
            aria-hidden="true"
          />
          <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
            E-mailadresse
          </label>
          <input
            id={`newsletter-email-${variant}`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@mail.dk"
            className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none transition-colors ${
              dark
                ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#3aad4a]'
                : 'bg-white border border-gray-300 text-[#0a2540] placeholder:text-gray-400 focus:border-[#3aad4a] focus:ring-1 focus:ring-[#3aad4a]'
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-xl bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Tilmelder…
            </>
          ) : (
            'Tilmeld'
          )}
        </button>
      </div>

      {/* Samtykke (GDPR) */}
      <label
        className={`flex items-start gap-2 mt-3 text-xs cursor-pointer ${
          dark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-3.5 h-3.5 rounded border-gray-400 text-[#3aad4a] focus:ring-[#3aad4a] shrink-0"
        />
        <span>
          Ja tak, jeg vil gerne modtage nyheder og tilbud fra Clean Water Supply. Du kan altid
          afmelde igen. Se vores{' '}
          <Link
            href="/privatlivspolitik"
            className={`underline ${dark ? 'hover:text-white' : 'hover:text-[#0a2540]'}`}
          >
            privatlivspolitik
          </Link>
          .
        </span>
      </label>

      {status === 'error' && (
        <p className="mt-2 text-xs font-medium text-red-500" role="alert">
          {message}
        </p>
      )}
    </form>
  )
}
