'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { Filter, Droplets, ShieldCheck, FlaskConical, Waves, ArrowRight, ShoppingBag, Check } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import ShopifyBuyButton from '@/components/ShopifyBuyButton'
import { PRODUCTS, type Product } from '@/lib/products'
import { getStripe } from '@/lib/stripe-products'

/* ─── CATEGORY CONFIG ──────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    key: 'alle',
    labelDa: 'Alle produkter',
    labelEn: 'All products',
    icon: Droplets,
    color: 'blue',
  },
  {
    key: 'filtre',
    labelDa: 'Filtre',
    labelEn: 'Filters',
    icon: Filter,
    color: 'blue',
    descDa: 'Bakteriefiltre og legionellafiltre til alle vandhaner og brusere.',
    descEn: 'Bacteria and legionella filters for all taps and showers.',
    imgSrc: '/images/filters-legionella.jpg',
  },
  {
    key: 'blosgoringsanlaeg',
    labelDa: 'Blødgøringsanlæg',
    labelEn: 'Water softeners',
    icon: Waves,
    color: 'violet',
    descDa: 'TALENT-serien: effektiv blødgøring der fjerner kalk og beskytter dine hvidevarer.',
    descEn: 'TALENT series: effective softening that removes limescale and protects your appliances.',
    imgSrc: '/images/softener-talent100b.jpg',
  },
]

const COLOR = {
  blue:    { tab: 'bg-blue-600 text-white',    tabIdle: 'text-blue-700 hover:bg-blue-50',    badge: 'bg-blue-50 text-blue-700 border-blue-100',    icon: 'from-blue-600 to-blue-700'    },
  sky:     { tab: 'bg-sky-500 text-white',     tabIdle: 'text-sky-700 hover:bg-sky-50',      badge: 'bg-sky-50 text-sky-700 border-sky-100',       icon: 'from-sky-500 to-sky-600'      },
  emerald: { tab: 'bg-emerald-600 text-white', tabIdle: 'text-emerald-700 hover:bg-emerald-50', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: 'from-emerald-500 to-emerald-600' },
  violet:  { tab: 'bg-violet-600 text-white',  tabIdle: 'text-violet-700 hover:bg-violet-50',  badge: 'bg-violet-50 text-violet-700 border-violet-100',  icon: 'from-violet-500 to-violet-600'  },
}

/* ─── PRODUCT CARD ─────────────────────────────────────────────────────── */

function ProductCard({ product, catColor }: { product: Product; catColor: string }) {
  const c = COLOR[catColor as keyof typeof COLOR] ?? COLOR.blue
  const CatIcon = CATEGORIES.find(c => c.key === product.category)?.icon ?? Droplets
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  // Use live Stripe product ID if available, fallback to static mapping
  const stripeProductId = product.stripeProductId ?? getStripe(product.id)?.productId
  const buyable = !!stripeProductId && !product.comingSoon

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (!stripeProductId || !product.price) return
    addItem({
      id:              product.id,
      stripeProductId,
      name:            product.name,
      price:           product.price,
      image:           product.imgSrc,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group h-full">
      {/* Image / icon top */}
      <Link href={`/shop/${product.id}`} className="block">
        {product.imgSrc ? (
          <div className="h-44 overflow-hidden bg-white flex items-center justify-center p-4">
            <img
              src={product.imgSrc}
              alt={product.name}
              width={300}
              height={300}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className={`h-44 bg-gradient-to-br ${c.icon} flex items-center justify-center`}>
            <CatIcon className="w-16 h-16 text-white/30" />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-bold text-gray-900 text-sm leading-snug hover:text-blue-700 transition-colors">{product.name}</h3>
          </Link>
          {product.badge && (
            <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${c.badge}`}>
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{product.tagline}</p>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{product.description}</p>

        {/* ── PRICE ─────────────────────────────────────────────── */}
        <div className="mt-4">
          {product.comingSoon || product.price === undefined ? (
            <p className="text-base font-bold text-gray-400">Kommer snart</p>
          ) : (
            <p className="text-xl font-extrabold text-[#0a2540]">
              {product.price.toLocaleString('da-DK')} kr
            </p>
          )}
        </div>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="mt-3 space-y-2">
          {buyable ? (
            <>
              <Link
                href={`/shop/${product.id}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3 px-4 rounded-xl text-sm font-bold transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                Køb nu
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleAdd}
                className={`w-full inline-flex items-center justify-center gap-2 border-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                  added
                    ? 'border-[#3aad4a] bg-[#3aad4a]/5 text-[#3aad4a]'
                    : 'border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white'
                }`}
              >
                {added ? <><Check className="w-3.5 h-3.5" /> Tilføjet</> : <><ShoppingBag className="w-3.5 h-3.5" /> Tilføj til kurv</>}
              </button>
            </>
          ) : product.comingSoon ? (
            <Link
              href={`/shop/${product.id}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-bold transition-all"
            >
              Kommer snart
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={`/shop/${product.id}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-bold transition-all"
            >
              Se produkt
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── PAGE ─────────────────────────────────────────────────────────────── */

export default function ShopClient({ products }: { products: Product[] }) {
  const { language } = useLanguage()
  const da = language === 'da'
  const [activeCategory, setActiveCategory] = useState('alle')

  const filtered = activeCategory === 'alle'
    ? products
    : products.filter(p => p.category === activeCategory)

  const activeCat = CATEGORIES.find(c => c.key === activeCategory)!
  const catColor = activeCat.color ?? 'blue'

  return (
    <main>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="absolute inset-0">
          <img
            src="/images/filters-legionella.jpg"
            alt=""
            width={1920}
            height={600}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-10"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540]/90 to-blue-800/80" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <Droplets className="w-3.5 h-3.5" />
            {da ? 'Vores produkter' : 'Our products'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            {da ? 'Shop Clean Water Supply' : 'Shop Clean Water Supply'}
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {da
              ? 'Professionelle vandbehandlingsløsninger til private og erhvervskunder. Vælg den løsning der passer til dit behov.'
              : 'Professional water treatment solutions for private and business customers. Choose the solution that suits your needs.'}
          </p>
        </div>
      </section>

      {/* ─── CATEGORY TABS ──────────────────────────────────────── */}
      <section className="sticky top-24 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.key
              const c = COLOR[cat.color as keyof typeof COLOR]
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive ? c.tab : `text-gray-500 hover:bg-gray-50 ${c.tabIdle}`
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {da ? cat.labelDa : cat.labelEn}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {cat.key === 'alle' ? products.length : products.filter(p => p.category === cat.key).length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY INTRO BANNER ──────────────────────────────── */}
      {activeCategory !== 'alle' && activeCat.imgSrc && (
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-6">
              <div className="hidden sm:block w-20 h-20 rounded-2xl overflow-hidden bg-gray-200 shrink-0">
                <img src={activeCat.imgSrc} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">
                  {da ? activeCat.labelDa : activeCat.labelEn}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {da ? activeCat.descDa : activeCat.descEn}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── PRODUCT GRID ───────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading with count */}
          <div className="flex items-center justify-between mb-10">
            <p className="text-sm text-gray-400 font-medium">
              {filtered.length} {da ? 'produkter' : 'products'}
              {activeCategory !== 'alle' && (
                <> {da ? 'i' : 'in'} <span className="text-gray-700 font-semibold">{da ? activeCat.labelDa : activeCat.labelEn}</span></>
              )}
            </p>
            <Link href="/contact" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors">
              {da ? 'Få rådgivning' : 'Get advice'}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 50} direction="up" scale threshold={0.05}>
                <ProductCard product={product} catColor={catColor} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {da ? 'Ikke sikker på hvad du har brug for?' : 'Not sure what you need?'}
          </h2>
          <p className="text-blue-100/80 mb-9 text-lg">
            {da
              ? 'Vores specialister hjælper dig gratis med at finde den rigtige løsning til dit hjem eller din virksomhed.'
              : 'Our specialists will help you find the right solution for your home or business — completely free.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-9 py-4 rounded-full font-bold text-base transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5"
          >
            {da ? 'Få gratis rådgivning' : 'Get free advice'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
