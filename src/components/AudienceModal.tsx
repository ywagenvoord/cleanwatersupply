'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Home, Building2, X } from 'lucide-react'
import { readAudience, writeAudience } from '@/lib/useAudience'

export default function AudienceModal() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!readAudience()) setOpen(true)
  }, [])

  const choose = (value: 'privat' | 'erhverv') => {
    writeAudience(value)
    setOpen(false)
    router.push(value === 'erhverv' ? '/erhverv' : '/private')
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
