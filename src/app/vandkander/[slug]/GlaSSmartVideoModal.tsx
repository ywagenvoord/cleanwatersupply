'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

/* Hjørne-pop-up med GlaSSmart-video (muted autoplay). Vises kun på GlaSSmart-siden,
   én gang pr. besøg (på localhost dog ved hver reload, så den er nem at arbejde med). */
const SEEN_KEY = 'cws-glassmart-video-seen'
const DELAY_SECONDS = 2.5

export default function GlaSSmartVideoModal() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDev = process.env.NODE_ENV !== 'production'
    try { if (!isDev && localStorage.getItem(SEEN_KEY)) return } catch { return }
    const t = setTimeout(() => {
      setOpen(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }, DELAY_SECONDS * 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function dismiss() {
    try { localStorage.setItem(SEEN_KEY, '1') } catch {}
    setVisible(false)
    setTimeout(() => setOpen(false), 320)
  }

  function buy() {
    dismiss()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="GlaSSmart video"
      className="fixed bottom-6 right-6 z-[90] w-[calc(100%-3rem)] max-w-[360px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
        transition: 'opacity 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="relative rounded-[26px] overflow-hidden bg-white ring-1 ring-gray-100 shadow-[0_12px_32px_-8px_rgba(10,37,64,0.35),0_32px_64px_-16px_rgba(10,20,80,0.30)]">
        <button
          onClick={dismiss}
          aria-label="Luk"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur flex items-center justify-center text-white transition-all duration-200 hover:rotate-90"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <video
          src="/videos/glassmart-promo.mp4"
          poster="/images/glassmart-life-hand.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[300px] object-cover"
        />

        <div className="p-5">
          <p className="text-[11px] font-black text-[#2e9a3d] uppercase tracking-[0.16em]">GlaSSmart™</p>
          <p className="text-lg font-extrabold text-[#0a2540] leading-tight mt-1">Altid koldt, filtreret vand</p>
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">Filtrerer mens du hælder – klar i køleskabet.</p>
          <button
            onClick={buy}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3aad4a] hover:bg-[#2e9a3d] px-5 py-3.5 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5"
          >
            Køb GlaSSmart – 199 kr
          </button>
        </div>
      </div>
    </div>
  )
}
