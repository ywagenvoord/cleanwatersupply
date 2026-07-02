'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'
import { Lock, ArrowRight } from 'lucide-react'
import { useB2bLoggedIn } from '@/lib/useB2b'

/** Viser kun kontosiden, når man er logget ind (demo). Ellers en login-opfordring. */
export default function MinKontoGate({ children }: { children: ReactNode }) {
  const loggedIn = useB2bLoggedIn()
  const [ready, setReady] = useState(false)
  useEffect(() => { setReady(true) }, [])

  if (!ready) return <div className="min-h-[60vh]" />

  // Preview-tilstand (chef-gennemgang): vis kontoen uden login
  const previewOpen = process.env.NEXT_PUBLIC_PREVIEW_OPEN === '1'

  if (!loggedIn && !previewOpen) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a2540] mb-3">Log ind for at se din konto</h1>
          <p className="text-gray-600 mb-8">
            Din erhvervskonto med ordrer, faste priser og faktura-oversigt vises kun, når du er logget ind.
          </p>
          <Link
            href="/min-konto/login"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3 rounded-full font-bold text-sm transition-all"
          >
            Log ind <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
