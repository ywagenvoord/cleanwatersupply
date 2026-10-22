'use client'

import { useState, useEffect } from 'react'
import { Truck, Clock } from 'lucide-react'

/**
 * Nedtællingsur: bestil inden kl. 11:30 på en hverdag → varen sendes samme dag.
 * Efter cut-off (eller i weekender) vises, hvornår den sendes i stedet.
 */
const CUTOFF_H = 11
const CUTOFF_M = 30

function isWeekday(d: Date) {
  const day = d.getDay()
  return day >= 1 && day <= 5
}

export default function SameDayDispatch() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Undgå hydration-mismatch: render intet før klienten kender tiden
  if (!now) return null

  const cutoff = new Date(now)
  cutoff.setHours(CUTOFF_H, CUTOFF_M, 0, 0)

  const sameDay = isWeekday(now) && now < cutoff

  if (sameDay) {
    const diff = Math.max(0, cutoff.getTime() - now.getTime())
    const h = Math.floor(diff / 3_600_000)
    const m = Math.floor((diff % 3_600_000) / 60_000)
    const s = Math.floor((diff % 60_000) / 1000)
    const pad = (n: number) => String(n).padStart(2, '0')
    return (
      <div className="flex items-start gap-3 rounded-xl bg-[#3aad4a]/10 ring-1 ring-[#3aad4a]/20 px-4 py-3">
        <span className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-[#3aad4a] text-white flex items-center justify-center">
          <Truck className="w-4 h-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#2e7d34] leading-snug">
            Bestil inden{' '}
            <span className="inline-flex items-center gap-1 font-mono tabular-nums text-[#0a2540]">
              <Clock className="w-3.5 h-3.5 text-[#3aad4a]" /> {pad(h)}:{pad(m)}:{pad(s)}
            </span>{' '}
            – så sender vi varen <span className="underline decoration-[#3aad4a]/40">i dag</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Bestil på hverdage inden kl. 11:30 for afsendelse samme dag.</p>
        </div>
      </div>
    )
  }

  // Efter cut-off / weekend: find næste hverdag
  const next = new Date(now)
  next.setDate(next.getDate() + 1)
  while (!isWeekday(next)) next.setDate(next.getDate() + 1)
  const today = new Date(now)
  const isTomorrow = next.getDate() === today.getDate() + 1 && next.getMonth() === today.getMonth()
  const dayLabels = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
  const nextLabel = isTomorrow ? 'i morgen' : dayLabels[next.getDay()]

  return (
    <div className="flex items-start gap-3 rounded-xl bg-blue-50 ring-1 ring-blue-100 px-4 py-3">
      <span className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-[#284eff] text-white flex items-center justify-center">
        <Truck className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#0a2540] leading-snug">Bestil nu – så sender vi varen {nextLabel}</p>
        <p className="text-xs text-gray-500 mt-0.5">Bestil på hverdage inden kl. 11:30 for afsendelse samme dag.</p>
      </div>
    </div>
  )
}
