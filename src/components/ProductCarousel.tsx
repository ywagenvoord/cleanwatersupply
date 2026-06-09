'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/lib/products'

function price(p?: number) {
  return p ? `${p.toLocaleString('da-DK')} kr.` : 'Kommer snart'
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  // Duplicate the list so the auto-scroll can loop seamlessly.
  const items = [...products, ...products]

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf = 0
    let pos = el.scrollLeft // float accumulator (browsers round scrollLeft)
    const tick = () => {
      if (!pausedRef.current) {
        pos += 0.6 // slow, continuous roll
        const half = el.scrollWidth / 2
        if (half > 0 && pos >= half) pos -= half
        el.scrollLeft = pos
      } else {
        pos = el.scrollLeft // stay in sync after hover / arrow use
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const nudge = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' })
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div ref={trackRef} className="flex gap-4 overflow-x-auto no-scrollbar py-1">
        {items.map((p, i) => (
          <Link
            key={`${p.id}-${i}`}
            href={`/shop/${p.id}`}
            className="group w-56 shrink-0 bg-white rounded-xl border-2 border-[#0044c4]/25 hover:border-[#0044c4]/60 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
          >
            <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
              <img src={p.imgSrc} alt={p.name} className="w-full h-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-3 flex flex-col flex-1">
              {p.badge && (
                <span className="inline-block w-fit text-[10px] font-semibold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 mb-1.5">{p.badge}</span>
              )}
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{p.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1">{p.tagline}</p>
              <p className="mt-2 font-extrabold text-gray-900 text-sm">{price(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Forrige produkter"
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#0a2540] hover:bg-gray-50 transition-colors z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Næste produkter"
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#0a2540] hover:bg-gray-50 transition-colors z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
