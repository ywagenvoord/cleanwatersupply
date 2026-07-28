'use client'

import { useState } from 'react'

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [active, setActive] = useState(0)
  const list = images.filter(Boolean)
  if (list.length === 0) return null

  return (
    <div>
      {/* Hovedbillede */}
      <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <img
          src={list[active]}
          alt={alt}
          width={768}
          height={768}
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain p-8"
        />
      </div>

      {/* Miniaturer */}
      {list.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {list.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Vis billede ${i + 1}`}
              className={`aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ring-2 transition-all ${
                active === i ? 'ring-[#3aad4a]' : 'ring-transparent hover:ring-gray-200'
              }`}
            >
              <img
                src={src}
                alt={`${alt} – vinkel ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
