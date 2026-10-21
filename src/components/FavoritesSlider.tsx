'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

type Fav = { name: string; tagline: string; img: string; price: number; href: string }

/**
 * "Vores favoritter"-slider: skifter automatisk mellem favoritterne (ét kort ad gangen),
 * med prikker og pause på hover.
 */
export default function FavoritesSlider({ da }: { da: boolean }) {
  const items: Fav[] = [
    { name: 'Bi-flux® HealthExpert', tagline: da ? 'Mod PFAS – med ekstra magnesium' : 'Against PFAS – with extra magnesium', img: '/images/filter-healthexpert-v2.jpg', price: 109, href: '/vandkande-filtre/bi-flux-healthexpert' },
    { name: 'Baclyser® neo TR (3M)', tagline: da ? 'Rent, bakteriefrit vand fra hanen' : 'Clean, bacteria-free water from the tap', img: '/images/baclyser-neo-tr.jpg', price: 625, href: '/shop/baclyser-neo-tr-3m' },
    { name: da ? 'Germ-STOP vandfilterkande' : 'Germ-STOP water filter jug', tagline: da ? 'Fjerner 99,999 % af bakterierne' : 'Removes 99.999 % of bacteria', img: '/images/kande-germ-stop.png', price: 399, href: '/vandkander/mikroplastik-stop' },
  ]

  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 3800)
    return () => clearInterval(t)
  }, [paused, items.length])

  return (
    <div
      className="max-w-sm mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(.45,.05,.2,1)]"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {items.map((p, i) => (
            <div key={p.name} className="w-full shrink-0 px-1">
              <Link
                href={p.href}
                className="group relative flex flex-col rounded-[1.75rem] bg-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-[#3aad4a] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow uppercase tracking-wide">
                  <Sparkles className="w-3 h-3" /> {da ? 'Favorit' : 'Favourite'} #{i + 1}
                </span>
                <div className="h-48 bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-5">
                  <img src={p.img} alt={p.name} className="floaty h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1 border-t border-gray-100">
                  <h3 className="font-extrabold text-[#0a2540] text-base leading-snug">{p.name}</h3>
                  <p className="text-[13px] text-gray-500 mt-1 leading-relaxed flex-1">{p.tagline}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-xl font-extrabold text-[#0a2540]">{p.price.toLocaleString('da-DK')} kr</span>
                    <span className="inline-flex items-center gap-1.5 bg-[#3aad4a] group-hover:bg-[#2e9a3d] text-white text-[13px] font-bold px-4 py-2 rounded-full transition-colors shrink-0">
                      {da ? 'Se produkt' : 'See product'} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Prikker */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`${da ? 'Vis favorit' : 'Show favourite'} ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-[#3aad4a]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  )
}
