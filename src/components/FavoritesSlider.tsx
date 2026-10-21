'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

type Fav = { name: string; tagline: string; img: string; price: number; href: string }

/**
 * "Vores favoritter"-slider: et lækkert, moderne editorial-kort (billede + tekst side om side)
 * der skifter automatisk mellem favoritterne – med pile, prikker og pause på hover.
 */
export default function FavoritesSlider({ da }: { da: boolean }) {
  const items: Fav[] = [
    { name: 'Bi-flux® HealthExpert', tagline: da ? 'Reducerer PFAS med op til 92 % og tilfører ekstra magnesium – renere, sundere vand hver dag.' : 'Reduces PFAS by up to 92 % and adds extra magnesium – cleaner, healthier water every day.', img: '/images/filter-healthexpert-v2.jpg', price: 109, href: '/vandkande-filtre/bi-flux-healthexpert' },
    { name: 'Baclyser® neo TR (3M)', tagline: da ? 'Rent, bakteriefrit vand direkte fra hanen – med en blød bruserstråle. Samme filter som hospitaler bruger.' : 'Clean, bacteria-free water straight from the tap – the same filter hospitals use.', img: '/images/baclyser-neo-tr.jpg', price: 625, href: '/shop/baclyser-neo-tr-3m' },
    { name: da ? 'Germ-STOP vandfilterkande' : 'Germ-STOP water filter jug', tagline: da ? 'Fjerner 99,999 % af bakterierne i dit drikkevand – frisk, sikkert vand lige ved hånden.' : 'Removes 99.999 % of bacteria from your drinking water.', img: '/images/kande-germ-stop.png', price: 399, href: '/vandkander/mikroplastik-stop' },
  ]

  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = (n: number) => setIdx((n + items.length) % items.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 4200)
    return () => clearInterval(t)
  }, [paused, items.length])

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[2rem] ring-1 ring-gray-100 shadow-[0_20px_60px_-25px_rgba(10,37,64,0.35)]">
        <div
          className="flex transition-transform duration-[650ms] ease-[cubic-bezier(.45,.05,.2,1)]"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {items.map((p) => (
            <div key={p.name} className="w-full shrink-0">
              <div className="grid sm:grid-cols-2 bg-white">
                {/* Billede */}
                <div className="relative flex items-center justify-center p-8 sm:p-10 bg-gradient-to-br from-sky-50 via-blue-50/60 to-white">
                  <div className="pointer-events-none absolute inset-0 opacity-70">
                    <div className="absolute top-6 right-8 w-32 h-32 bg-sky-200/50 rounded-full blur-2xl" />
                  </div>
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-[#0a2540] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                    <Sparkles className="w-3 h-3 text-emerald-300" /> {da ? 'Favorit' : 'Favourite'}
                  </span>
                  <img src={p.img} alt={p.name} className="floaty relative h-44 sm:h-56 w-auto object-contain drop-shadow-xl" />
                </div>
                {/* Tekst */}
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-bold text-[#3aad4a] uppercase tracking-widest mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> {da ? 'Kundefavorit' : 'Customer favourite'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a2540] leading-tight">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{p.tagline}</p>
                  <div className="mt-6 flex items-center gap-4 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0a2540]">{p.price.toLocaleString('da-DK')} kr</span>
                    <Link
                      href={p.href}
                      className="group inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white text-sm font-bold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5"
                    >
                      {da ? 'Se produkt' : 'See product'} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pile */}
      <button
        onClick={() => go(idx - 1)}
        aria-label={da ? 'Forrige' : 'Previous'}
        className="hidden sm:flex absolute top-1/2 -left-4 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white text-[#0a2540] ring-1 ring-gray-100 shadow-lg hover:bg-gray-50 hover:-translate-x-0.5 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(idx + 1)}
        aria-label={da ? 'Næste' : 'Next'}
        className="hidden sm:flex absolute top-1/2 -right-4 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white text-[#0a2540] ring-1 ring-gray-100 shadow-lg hover:bg-gray-50 hover:translate-x-0.5 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Prikker */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`${da ? 'Vis favorit' : 'Show favourite'} ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === idx ? 'w-7 bg-[#3aad4a]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  )
}
