'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

type Item = { src: string; cover?: boolean; video?: boolean }

export default function ProductGallery({
  items,
  alt,
  highlight,
}: {
  items: Item[]
  alt: string
  highlight?: string
}) {
  const imgs = items.filter((it) => it.src)
  const [active, setActive] = useState(0)
  if (imgs.length === 0) return null
  const idx = Math.min(active, imgs.length - 1)
  const current = imgs[idx]

  return (
    <div>
      {/* Hovedvisning – stort */}
      <div className="relative rounded-[2rem] bg-gray-50 ring-1 ring-gray-100 shadow-[0_24px_70px_-24px_rgba(10,37,64,0.25)] overflow-hidden h-[300px] md:h-[560px]">
        {highlight && !current.video && (
          <span className="absolute top-5 left-5 z-10 rounded-full bg-[#3aad4a] text-white text-xs font-black px-3.5 py-1.5 shadow-lg shadow-green-500/30">
            {highlight}
          </span>
        )}
        {current.video ? (
          <video
            key={current.src}
            src={current.src}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        ) : current.cover ? (
          <img src={current.src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8">
            <img src={current.src} alt={alt} className="max-h-full max-w-full object-contain drop-shadow-2xl" />
          </div>
        )}
      </div>

      {/* Miniaturer */}
      {imgs.length > 1 && (
        <div className="mt-3.5 grid grid-cols-4 gap-3">
          {imgs.map((it, i) => (
            <button
              key={it.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={it.video ? 'Vis video' : `Vis billede ${i + 1}`}
              className={`relative h-20 md:h-24 rounded-2xl overflow-hidden bg-white flex items-center justify-center ring-2 transition-all ${
                active === i ? 'ring-[#3aad4a]' : 'ring-gray-200 hover:ring-gray-300'
              }`}
            >
              {it.video ? (
                <>
                  <video src={it.src} muted playsInline preload="metadata" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </span>
                </>
              ) : (
                <img
                  src={it.src}
                  alt=""
                  className={it.cover ? 'w-full h-full object-cover' : 'max-h-full max-w-full object-contain p-1.5'}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
