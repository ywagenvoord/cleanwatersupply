'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = { src: string; alt: string }

export default function ImageCarousel({
  images,
  interval = 4500,
  className = '',
}: {
  images: Slide[]
  interval?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const count = images.length

  const go = useCallback((i: number) => setIndex((i + count) % count), [count])
  const next = useCallback(() => setIndex((p) => (p + 1) % count), [count])
  const prev = useCallback(() => setIndex((p) => (p - 1 + count) % count), [count])

  useEffect(() => {
    if (count <= 1) return
    const id = setInterval(() => setIndex((p) => (p + 1) % count), interval)
    return () => clearInterval(id)
  }, [count, interval])

  return (
    <div className={`group relative w-full h-full overflow-hidden bg-white ${className}`}>
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Forrige billede"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Næste billede"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Gå til billede ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
