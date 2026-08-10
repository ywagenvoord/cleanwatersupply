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
  const idx = Math.min(active, imgs.length - 1)
  const current = imgs[idx]
  // Billede 0 = produktet (vises helt); øvrige = livsstilsfotos (fylder rammen).
  const isProduct = idx === 0

  return (
    <div>
      {/* Hovedbillede – stort */}
      <div className="relative rounded-[2rem] bg-gray-50 ring-1 ring-gray-100 shadow-[0_24px_70px_-24px_rgba(10,37,64,0.25)] overflow-hidden h-[440px] md:h-[560px]">
        {highlight && (
          <span className="absolute top-5 left-5 z-10 rounded-full bg-[#3aad4a] text-white text-xs font-black px-3.5 py-1.5 shadow-lg shadow-green-500/30">
            {highlight}
          </span>
        )}
        {isProduct ? (
          <div className="w-full h-full flex items-center justify-center p-8">
            <img src={current} alt={alt} className="max-h-full max-w-full object-contain drop-shadow-2xl" />
          </div>
        ) : (
          <img src={current} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>

      {/* Miniaturer */}
      {imgs.length > 1 && (
        <div className="mt-3.5 grid grid-cols-4 gap-3">
          {imgs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Vis billede ${i + 1}`}
              className={`h-20 md:h-24 rounded-2xl overflow-hidden bg-white flex items-center justify-center ring-2 transition-all ${
                active === i ? 'ring-[#3aad4a]' : 'ring-gray-200 hover:ring-gray-300'
              }`}
            >
              <img
                src={src}
                alt=""
                className={i === 0 ? 'max-h-full max-w-full object-contain p-1.5' : 'w-full h-full object-cover'}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
