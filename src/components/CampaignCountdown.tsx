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
export default function CampaignCountdown({
  className = '',
  size = 'md',
}: { className?: string; size?: 'sm' | 'md' }) {
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

  const sm = size === 'sm'
  const boxCls = sm
    ? 'min-w-[46px] rounded-lg bg-white/15 border border-white/20 px-1.5 py-1.5 text-center'
    : 'min-w-[62px] rounded-xl bg-white/15 border border-white/20 px-2 py-2 text-center'
  const numCls = sm ? 'block text-lg font-extrabold leading-none tabular-nums' : 'block text-2xl font-extrabold leading-none tabular-nums'
  const labelCls = sm ? 'block text-[9px] font-semibold uppercase tracking-wide text-white/60 mt-0.5' : 'block text-[10px] font-semibold uppercase tracking-wide text-white/60 mt-1'

  return (
    <div className={className}>
      <p className={`font-bold uppercase tracking-widest text-white/70 ${sm ? 'text-[10px] mb-1.5' : 'text-xs mb-2'}`}>
        Tilbuddet slutter om
      </p>
      <div className={`flex ${sm ? 'gap-1.5' : 'gap-2.5'}`}>
        {units.map(([value, label]) => (
          <div key={label} className={boxCls}>
            <span className={numCls}>{pad(value)}</span>
            <span className={labelCls}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
