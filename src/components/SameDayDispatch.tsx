'use client'

import { useState, useEffect } from 'react'
import { Truck } from 'lucide-react'

/**
 * Nedtællingsur: bestil inden kl. 11:30 på en hverdag → varen sendes samme dag.
 * Efter cut-off (eller i weekender) vises, hvornår den sendes i stedet.
 *
 * variant:
 *  - 'card'   (default): venstrestillet info-kort (produktsider)
 *  - 'banner': centreret, grafisk banner (fx shop-forsiden)
 */
const CUTOFF_H = 11
const CUTOFF_M = 30

function isWeekday(d: Date) {
  const day = d.getDay()
  return day >= 1 && day <= 5
}

export default function SameDayDispatch({ variant = 'card' }: { variant?: 'card' | 'banner' | 'inline' }) {
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

  // Nedtælling til cut-off (timer, minutter, sekunder)
  const diff = Math.max(0, cutoff.getTime() - now.getTime())
  const h = Math.floor(diff / 3_600_000)
  const m = Math.floor((diff % 3_600_000) / 60_000)
  const s = Math.floor((diff % 60_000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')

  // Næste hverdag (til efter cut-off / weekend)
  const next = new Date(now)
  next.setDate(next.getDate() + 1)
  while (!isWeekday(next)) next.setDate(next.getDate() + 1)
  const isTomorrow = next.getDate() === now.getDate() + 1 && next.getMonth() === now.getMonth()
  const dayLabels = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
  const nextLabel = isTomorrow ? 'i morgen' : dayLabels[next.getDay()]

  /* ───────────────────────── BANNER (kompakt pille) ───────────────────── */
  if (variant === 'banner') {
    return (
      <div className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full bg-gradient-to-r from-[#3aad4a]/12 to-[#284eff]/10 ring-1 ring-[#3aad4a]/20 px-3.5 py-1.5">
        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white ${sameDay ? 'bg-[#3aad4a]' : 'bg-[#284eff]'}`}>
          <Truck className="w-3.5 h-3.5" />
        </span>
        {sameDay ? (
          <span className="text-sm font-bold text-[#0a2540]">
            Bestil inden kl. 11:30 – sendes <span className="text-[#2e7d34]">i dag</span>
            <span className="ml-2 inline-block rounded-full bg-white ring-1 ring-[#3aad4a]/30 px-2 py-0.5 text-xs font-black tabular-nums text-[#0a2540]">
              om {h} t {pad(m)} min
            </span>
          </span>
        ) : (
          <span className="text-sm font-bold text-[#0a2540]">
            Bestil nu – sendes <span className="text-[#284eff]">{nextLabel}</span>
          </span>
        )}
      </div>
    )
  }

  /* ───────────────────────── INLINE (kompakt linje på kort) ───────────── */
  if (variant === 'inline') {
    return (
      <p className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold leading-tight">
        <Truck className={`w-3.5 h-3.5 shrink-0 ${sameDay ? 'text-[#3aad4a]' : 'text-[#284eff]'}`} />
        {sameDay ? (
          <span className="text-[#2e7d34]">
            Bestil inden 11:30 – sendes <span className="text-[#0a2540] font-bold">i dag</span>
          </span>
        ) : (
          <span className="text-[#284eff]">Sendes {nextLabel}</span>
        )}
      </p>
    )
  }

  /* ───────────────────────── CARD (default) ───────────────────────────── */
  if (sameDay) {
    return (
      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-[#3aad4a]/12 via-white to-white ring-1 ring-[#3aad4a]/25 px-4 py-3.5 shadow-sm">
        <span className="shrink-0 w-11 h-11 rounded-full bg-[#3aad4a] text-white flex items-center justify-center shadow-sm">
          <Truck className="w-5 h-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-extrabold text-[#0a2540] leading-snug">
            Sendes <span className="text-[#2e7d34]">i dag</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Bestil inden kl. 11:30 på hverdage</p>
        </div>
        <div className="shrink-0 flex flex-col items-center rounded-xl bg-white ring-1 ring-[#3aad4a]/30 px-3 py-1.5 shadow-sm">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Bestil om</span>
          <span className="flex items-baseline gap-0.5 font-black tabular-nums text-[#0a2540] leading-none mt-0.5">
            <span className="text-base">{pad(h)}</span>
            <span className="text-[10px] font-semibold text-gray-400">t</span>
            <span className="text-base ml-0.5">{pad(m)}</span>
            <span className="text-[10px] font-semibold text-gray-400">m</span>
            <span className="text-base ml-0.5">{pad(s)}</span>
            <span className="text-[10px] font-semibold text-gray-400">s</span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-[#284eff]/10 via-white to-white ring-1 ring-blue-200/70 px-4 py-3.5 shadow-sm">
      <span className="shrink-0 w-11 h-11 rounded-full bg-[#284eff] text-white flex items-center justify-center shadow-sm">
        <Truck className="w-5 h-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-extrabold text-[#0a2540] leading-snug">
          Sendes <span className="text-[#284eff]">{nextLabel}</span>
        </p>
        <p className="text-xs text-gray-500 mt-0.5">Bestil på hverdage inden kl. 11:30 for afsendelse samme dag.</p>
      </div>
    </div>
  )
}
