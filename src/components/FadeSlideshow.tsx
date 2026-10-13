'use client'

import { useEffect, useState } from 'react'

type Slide = { src: string; alt: string }

export default function FadeSlideshow({
  images,
  interval = 3500,
  className = '',
}: {
  images: Slide[]
  interval?: number
  className?: string
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setActive((p) => (p + 1) % images.length), interval)
    return () => clearInterval(t)
  }, [images.length, interval])

  return (
    <div className={`relative ${className}`}>
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i === active ? undefined : true}
        />
      ))}
      {/* prikker */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
