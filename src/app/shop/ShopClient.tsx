'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/contexts/CartContext'
import { Filter, Droplets, Droplet, ShowerHead, GlassWater, ShieldCheck, FlaskConical, Waves, ArrowRight, ShoppingBag, Check } from 'lucide-react'
import { isGratisMonteringActive } from '@/lib/campaign'
import { INSTALLATION_PRICE } from '@/lib/products'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import ShopifyBuyButton from '@/components/ShopifyBuyButton'
import { PRODUCTS, shopPrice, MEDICAL_PRODUCT_IDS, type Product } from '@/lib/products'
import { getStripe } from '@/lib/stripe-products'
import { stockFor, lowStockFor } from '@/lib/stock'

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
    key: 'vandhane',
    labelDa: 'Vandhane',
    labelEn: 'Tap',
    icon: Droplet,
    color: 'blue',
    descDa: 'Filtre og tilbehør der monteres direkte på vandhanen.',
    descEn: 'Filters and accessories mounted directly on the tap.',
    imgSrc: '/images/baclyser-tl.jpg',
  },
  {
    key: 'bruser',
    labelDa: 'Bruser',
    labelEn: 'Shower',
    icon: ShowerHead,
    color: 'sky',
    descDa: 'Brusefiltre og brusehoveder der renser badevandet for klor, kalk og urenheder.',
    descEn: 'Shower filters and heads that clean your water of chlorine, lime and impurities.',
    imgSrc: '/images/product-brusehoved-sort.jpg',
  },
  {
    key: 'vandkande',
    labelDa: 'Vandkande',
    labelEn: 'Water jug',
    icon: GlassWater,
    color: 'sky',
    descDa: 'Filterkander og udskiftningsfiltre til renere vand direkte fra kanden.',
    descEn: 'Filter jugs and replacement filters for cleaner water straight from the jug.',
    imgSrc: 'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915',
  },
  {
    key: 'filtre',
    labelDa: 'Filtre',
    labelEn: 'Filters',
    icon: Filter,
    color: 'blue',
    descDa: 'Inline-filtre, filterhuse og øvrige vandfiltre til hus og installation.',
    descEn: 'Inline filters, housings and other water filters for home and installation.',
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
  {
    key: 'anlaeg',
    labelDa: 'Anlæg',
    labelEn: 'Systems',
    icon: FlaskConical,
    color: 'emerald',
    descDa: 'Professionelle vandbehandlingsanlæg – ECA-vand (Kirkmayer HOCl-generatorer) til erhverv.',
    descEn: 'Professional water treatment systems – ECA water (Kirkmayer HOCl generators) for business.',
    imgSrc: '/images/sicursan-anlaeg.jpg',
  },
]

const COLOR = {
  blue:    { tab: 'bg-blue-600 text-white',    tabIdle: 'text-blue-700 hover:bg-blue-50',    badge: 'bg-blue-50 text-blue-700 border-blue-100',    icon: 'from-blue-600 to-blue-700'    },
  sky:     { tab: 'bg-sky-500 text-white',     tabIdle: 'text-sky-700 hover:bg-sky-50',      badge: 'bg-sky-50 text-sky-700 border-sky-100',       icon: 'from-sky-500 to-sky-600'      },
  emerald: { tab: 'bg-emerald-600 text-white', tabIdle: 'text-emerald-700 hover:bg-emerald-50', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: 'from-emerald-500 to-emerald-600' },
  violet:  { tab: 'bg-violet-600 text-white',  tabIdle: 'text-violet-700 hover:bg-violet-50',  badge: 'bg-violet-50 text-violet-700 border-violet-100',  icon: 'from-violet-500 to-violet-600'  },
}

/* ─── PRODUCT CARD ─────────────────────────────────────────────────────── */

// Produkter der "passer til" et andet produkt – vises som lille rund markering
const HOUSING_IMG = '/images/filter-housing.jpg'
const JUG_IMG = 'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915'
const ASTUBE_IMG = 'https://technolab.nl/wp-content/uploads/2024/04/AS-TUBE-Cartridge-MF5.jpg'
const CBLUE_IMG = '/images/cblue-sc3-1.jpg'
const FITS_WITH: Record<string, { img: string; label: string }> = {
  'dualstage-mf-10-cl':           { img: HOUSING_IMG, label: 'Filter Housing' },
  'kulblokfilter-10-cl':          { img: HOUSING_IMG, label: 'Filter Housing' },
  'cartridge-mf5':                { img: ASTUBE_IMG,  label: 'AS Tube' },
  'cartridge-sc3':                { img: ASTUBE_IMG,  label: 'AS Tube' },
  'cblue-sc3-filter':             { img: CBLUE_IMG,   label: 'cBlue SC3' },
  // Filterkander → hvilket filter der passer til dem
  'kande-carmen':                 { img: '/images/filter-biflux-universal.png', label: 'Bi-flux®-filter' },
  'prod_V2wDbJ1i8O20Kj':          { img: '/images/filter-biflux-universal.png', label: 'Bi-flux®-filter' }, // MikroPLASTIK-STOP
  'prod_V2wFs5adWhY4cF':          { img: '/images/fast-disk-pack.jpg',          label: 'FAST DISK™-filter' }, // GlaSSmart
}

// Produkter der skal linke til en dedikeret side i stedet for standard /shop/{id}.
// Nøgle = produkt-id (for Stripe-only produkter er det Stripe-produkt-id'et).
const DETAIL_LINK_OVERRIDES: Record<string, string> = {
  'prod_V2wFs5adWhY4cF': '/vandkander/glassmart', // GlaSSmart glas-filterkaraffel
  'prod_V2wDbJ1i8O20Kj': '/vandkander/mikroplastik-stop', // MikroPLASTIK-STOP filterkande (rig side)
}

function ProductCard({ product, catColor, showErhverv }: { product: Product; catColor: string; showErhverv: boolean }) {
  const c = COLOR[catColor as keyof typeof COLOR] ?? COLOR.blue
  const CatIcon = CATEGORIES.find(c => c.key === product.category)?.icon ?? Droplets
  const { addItem } = useCart()
  const [added, setAdded]       = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  // Erhverv ser grossistpris (ekskl. moms), privat ser privatpris
  const { amount: displayPrice, exMoms } = shopPrice(product, showErhverv)

  // Midlertidigt udsolgt (central styring)
  const stock = stockFor(product)
  const soldOut = !!product.soldOut || !!stock
  const restockLabel = product.restockLabel ?? stock?.restockLabel

  // Use live Stripe product ID if available, fallback to static mapping
  const stripeProductId = product.stripeProductId ?? getStripe(product.id)?.productId
  const stockLeft = !soldOut ? lowStockFor({ stripeProductId, id: product.id }) : undefined
  const freeMontering = product.category === 'blosgoringsanlaeg' && isGratisMonteringActive()
  const buyable = !!stripeProductId && !product.comingSoon && !soldOut

  // Nogle produkter linker til en dedikeret side (fx GlaSSmart → /vandkander/glassmart)
  const detailHref = DETAIL_LINK_OVERRIDES[product.id] ?? `/shop/${product.id}`
  const isMedical = MEDICAL_PRODUCT_IDS.has(product.id)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (!stripeProductId || displayPrice == null) return
    addItem({
      id:              product.id,
      stripeProductId,
      name:            product.name,
      price:           displayPrice,
      image:           product.imgSrc,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col overflow-hidden group h-full min-w-0">
      {/* Image / icon top */}
      <Link href={detailHref} className="block relative">
        {product.badge && !/medicinsk/i.test(product.badge) && !soldOut && (
          <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${c.badge}`}>
            {product.badge}
          </span>
        )}
        {soldOut && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide bg-red-600 text-white">
            Udsolgt
          </span>
        )}
        {product.imgSrc && !imgFailed ? (
          <div className="h-40 sm:h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-3 sm:p-4">
            <img
              src={product.imgSrc}
              alt={product.name}
              width={300}
              height={300}
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className={`h-40 sm:h-64 bg-gradient-to-br ${c.icon} flex items-center justify-center`}>
            <CatIcon className="w-16 h-16 text-white/30" />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <Link href={detailHref}>
          <h3 className="font-bold text-gray-900 text-[15px] leading-snug hover:text-blue-700 transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">{product.tagline}</p>

        {isMedical && (
          <span className="mt-2.5 inline-flex items-center gap-1 self-start rounded-full bg-[#3aad4a]/10 text-[#2e7d34] text-[10px] font-bold px-2 py-1 uppercase tracking-wide">
            <ShieldCheck className="w-3 h-3" /> Medicinsk godkendt
          </span>
        )}

        {FITS_WITH[product.id] && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 self-start rounded-full border border-gray-200 bg-gray-50 py-1 pl-1 pr-2.5">
            <img
              src={FITS_WITH[product.id].img}
              alt={FITS_WITH[product.id].label}
              className="w-5 h-5 rounded-full object-contain bg-white border border-gray-200"
            />
            <span className="text-[11px] font-medium text-gray-500">Passer til <span className="font-semibold text-gray-700">{FITS_WITH[product.id].label}</span></span>
          </div>
        )}

        <div className="flex-1" />

        {/* ── KAMPAGNE (rullende) ───────────────────────────────── */}
        {freeMontering && (
          <div className="mt-4 w-full min-w-0 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-md shadow-blue-500/25 py-1.5">
            <div className="animate-marquee inline-flex whitespace-nowrap" style={{ animationDuration: '26s' }}>
              {[0, 1].map((g) => (
                <span key={g} className="inline-flex">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="mx-4 text-[11px] font-black uppercase tracking-wider text-white">
                      ✨ Kampagne · Gratis montering · Spar {INSTALLATION_PRICE.toLocaleString('da-DK')} kr ✨
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── PRICE ─────────────────────────────────────────────── */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          {product.quoteOnly ? (
            <p className="text-base font-bold text-[#0a2540]">Kontakt for info</p>
          ) : product.comingSoon || displayPrice === undefined ? (
            <p className="text-base font-bold text-gray-400">Kommer snart</p>
          ) : (
            <p className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#0a2540]">{displayPrice.toLocaleString('da-DK')} kr</span>
              <span className="text-[11px] font-medium text-gray-400">{exMoms ? 'ekskl. moms' : 'inkl. moms'}</span>
            </p>
          )}
          {soldOut && (
            <p className="mt-1.5 text-xs font-semibold text-red-600">
              Udsolgt{restockLabel ? ` · forventet på lager igen ${restockLabel}` : ''}
            </p>
          )}
          {stockLeft != null && stockLeft > 0 && (
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-red-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              {stockLeft === 1 ? 'Kun 1 tilbage på lager' : `Kun ${stockLeft} tilbage på lager`}
            </p>
          )}
        </div>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="mt-3 space-y-2">
          {product.quoteOnly ? (
            <Link
              href={detailHref}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3 px-4 rounded-xl text-sm font-bold transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              Kontakt for info
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : buyable ? (
            <>
              <Link
                href={detailHref}
                className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white py-2.5 px-4 rounded-xl text-sm font-bold transition-all"
              >
                Se vare
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleAdd}
                className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white transition-all ${
                  added
                    ? 'bg-[#2e9a3d]'
                    : 'bg-[#3aad4a] hover:bg-[#2e9a3d] hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {added ? <><Check className="w-3.5 h-3.5" /> Tilføjet</> : <><ShoppingBag className="w-3.5 h-3.5" /> Tilføj til kurv</>}
              </button>
            </>
          ) : soldOut ? (
            <>
              <Link
                href={detailHref}
                className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white py-2.5 px-4 rounded-xl text-sm font-bold transition-all"
              >
                Se vare
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-3 px-4 rounded-xl text-sm font-bold cursor-not-allowed">
                Udsolgt
              </span>
            </>
          ) : product.comingSoon ? (
            <Link
              href={detailHref}
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-bold transition-all"
            >
              Kommer snart
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={detailHref}
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

export default function ShopClient({ products: allProducts, showErhverv = false }: { products: Product[]; showErhverv?: boolean }) {
  const { language } = useLanguage()
  const da = language === 'da'
  const [activeCategory, setActiveCategory] = useState('alle')

  // Filtrér efter shop: kun-erhverv vises kun i erhvervs-shop, kun-privat kun i privat-shop.
  const products = allProducts.filter(p => {
    if (p.audience === 'erhverv') return showErhverv
    if (p.audience === 'privat') return !showErhverv
    return true
  })

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
            {CATEGORIES.filter(cat => cat.key === 'alle' || products.some(p => p.category === cat.key)).map((cat) => {
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 [&>*]:min-w-0">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 50} direction="up" scale threshold={0.05}>
                <ProductCard product={product} catColor={catColor} showErhverv={showErhverv} />
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
