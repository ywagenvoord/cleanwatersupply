'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

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
      <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
