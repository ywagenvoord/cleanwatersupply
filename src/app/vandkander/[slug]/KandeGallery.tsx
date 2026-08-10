'use client'

import { useState } from 'react'

export default function KandeGallery({
  images,
  alt,
  highlight,
}: {
  images: string[]
  alt: string
  highlight?: string
}) {
  const imgs = images.filter(Boolean)
  const [active, setActive] = useState(0)
  if (imgs.length === 0) return null
  const current = imgs[Math.min(active, imgs.length - 1)]

  return (
    <div>
      {/* Hovedbillede */}
      <div className="relative rounded-[2rem] bg-gray-50 ring-1 ring-gray-100 shadow-[0_20px_60px_-20px_rgba(10,37,64,0.15)] flex items-center justify-center p-8 min-h-[360px] overflow-hidden">
        {highlight && (
          <span className="absolute top-5 left-5 z-10 rounded-full bg-[#3aad4a] text-white text-xs font-black px-3.5 py-1.5 shadow-lg shadow-green-500/30">
            {highlight}
          </span>
        )}
        <img
          src={current}
          alt={alt}
          className="relative max-h-[340px] max-w-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* Miniaturer */}
      {imgs.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {imgs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Vis billede ${i + 1}`}
              className={`aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center p-1 ring-2 transition-all ${
                active === i ? 'ring-[#3aad4a]' : 'ring-gray-200 hover:ring-gray-300'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
