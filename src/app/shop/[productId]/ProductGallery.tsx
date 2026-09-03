'use client'

import { useState } from 'react'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'

type MediaItem = { type: 'image' | 'video'; src: string }

export default function ProductGallery({
  images,
  video,
  videoFirst = false,
  alt,
}: {
  images: string[]
  video?: string
  videoFirst?: boolean
  alt: string
}) {
  const imageItems: MediaItem[] = images.filter(Boolean).map((src) => ({ type: 'image' as const, src }))
  const videoItem: MediaItem[] = video ? [{ type: 'video' as const, src: video }] : []
  const media: MediaItem[] = videoFirst ? [...videoItem, ...imageItems] : [...imageItems, ...videoItem]
  const [active, setActive] = useState(0)
  if (media.length === 0) return null
  const current = media[Math.min(active, media.length - 1)]

  return (
    <div>
      {/* Hovedmedie */}
      <div className="group relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        {current.type === 'image' ? (
          <img
            src={current.src}
            alt={alt}
            width={768}
            height={768}
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain p-8"
          />
        ) : (
          <video
            src={current.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
            className="w-full h-full object-cover"
          />
        )}

        {media.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Forrige billede"
              onClick={() => setActive((active - 1 + media.length) % media.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white shadow-md ring-1 ring-gray-200 flex items-center justify-center text-[#0a2540] transition-all hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Næste billede"
              onClick={() => setActive((active + 1) % media.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white shadow-md ring-1 ring-gray-200 flex items-center justify-center text-[#0a2540] transition-all hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {media.map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${active === i ? 'w-5 bg-[#0a2540]' : 'w-1.5 bg-gray-300'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Miniaturer */}
      {media.length > 1 && (
        <div className="mt-4 min-w-0 flex flex-wrap gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none sm:overflow-visible sm:mx-0 sm:px-0">
          {media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Vis ${m.type === 'video' ? 'video' : `billede ${i + 1}`}`}
              className={`relative w-16 h-16 shrink-0 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ring-2 transition-all ${
                active === i ? 'ring-[#3aad4a]' : 'ring-transparent hover:ring-gray-200'
              }`}
            >
              {m.type === 'image' ? (
                <img
                  src={m.src}
                  alt={`${alt} – ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <>
                  <video src={m.src} muted preload="metadata" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-4 h-4 text-[#0a2540] ml-0.5" fill="currentColor" />
                    </span>
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
