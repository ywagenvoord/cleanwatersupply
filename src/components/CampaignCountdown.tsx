'use client'

import { useState, useEffect } from 'react'
import { GRATIS_MONTERING } from '@/lib/campaign'

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  }
}

const pad = (n: number) => n.toString().padStart(2, '0')

/**
 * Live nedtælling til kampagnens slutdato. Viser intet, når tiden er udløbet,
 * eller før den er hydreret på klienten (undgår hydration-mismatch).
 */
export default function CampaignCountdown({ className = '' }: { className?: string }) {
  const target = GRATIS_MONTERING.end.getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (now === null) return null
  const left = target - now
  if (left <= 0) return null

  const { d, h, m, s } = parts(left)
  const units: [number, string][] = [
    [d, 'dage'],
    [h, 'timer'],
    [m, 'min'],
    [s, 'sek'],
  ]

  return (
    <div className={className}>
      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
        Tilbuddet slutter om
      </p>
      <div className="flex gap-2.5">
        {units.map(([value, label]) => (
          <div
            key={label}
            className="min-w-[62px] rounded-xl bg-white/15 border border-white/20 px-2 py-2 text-center"
          >
            <span className="block text-2xl font-extrabold leading-none tabular-nums">{pad(value)}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/60 mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
