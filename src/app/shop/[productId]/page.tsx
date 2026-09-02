import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { PRODUCTS, getProduct, getRelated, ADDON_PRODUCTS, type Product } from '@/lib/products'
import { overrideImage, galleryFor, videoFor } from '@/lib/stripe-image-overrides'
import { stockFor } from '@/lib/stock'
import { CheckCircle2, ChevronRight, ShieldCheck, Droplets, Droplet, ShowerHead, GlassWater, Filter, Waves, ArrowRight, Phone, Wrench, Sparkles, Heart, Zap, Shirt, Users, Clock } from 'lucide-react'
import BuyBox from './BuyBox'
import ProductGallery from './ProductGallery'
import ProductPrice from './ProductPrice'
import AddonProducts from './AddonProducts'
import FilterAddToCart from './FilterAddToCart'
import GratisMonteringBanner from '@/components/GratisMonteringBanner'
import { getActiveStripeProducts } from '@/lib/stripe-fetch'
import ProductJsonLd from '@/components/seo/ProductJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import FaqJsonLd from '@/components/seo/FaqJsonLd'

import { SITE_URL } from '@/lib/site'

/* ─── STATIC PARAMS ──────────────────────────────────────────────────────── */

// allow on-demand rendering for new Stripe products
export const dynamicParams = true
export const revalidate = 60

export function generateStaticParams() {
  // Pre-render hardcoded products at build time; Stripe-only products
  // are rendered on-demand the first time they're visited (then cached).
  return PRODUCTS.map(p => ({ productId: p.id }))
}

/* ─── DATA FETCH (hardcoded → Stripe fallback) ───────────────────────────── */

const STORY_ICONS: Record<string, typeof ShieldCheck> = {
  shield: ShieldCheck, heart: Heart, glass: GlassWater, spark: Sparkles, drop: Droplets, zap: Zap,
}

// Fangende hero-highlights: ikon + farve skifter pr. punkt
const HL_ICONS = [ShieldCheck, Heart, Droplets, Sparkles]
const HL_COLORS = [
  'from-[#3aad4a] to-[#2e9a3d]',
  'from-rose-500 to-rose-600',
  'from-[#284eff] to-[#1b32c9]',
  'from-amber-400 to-amber-500',
]

async function fetchProduct(idOrStripeId: string): Promise<Product | undefined> {
  // 1. Try hardcoded list first (fast, rich content)
  const hardcoded = getProduct(idOrStripeId)
  if (hardcoded) {
    // Optionally enrich price from Stripe (so price changes in Stripe show up live)
    const stripeProducts = await getActiveStripeProducts()
    const match = stripeProducts.find(sp => sp.cwsId === idOrStripeId)
    if (match) {
      return { ...hardcoded, price: match.price, stripeProductId: match.stripeProductId }
    }
    return hardcoded
  }

  // 2. Fall back to Stripe lookup by Stripe product ID (prod_...)
  const stripeProducts = await getActiveStripeProducts()
  const sp = stripeProducts.find(p => p.stripeProductId === idOrStripeId)
  if (!sp) return undefined

  // Hvis Stripe-produktet er koblet til et hardcodet produkt via cws_id,
  // så vis det rige indhold – også når man tilgår via Stripe-id-URL'en.
  if (sp.cwsId) {
    const enriched = getProduct(sp.cwsId)
    if (enriched) {
      return { ...enriched, price: sp.price, stripeProductId: sp.stripeProductId }
    }
  }

  return {
    id:              sp.stripeProductId,
    name:            sp.name,
    tagline:         'Tilgængelig via Stripe',
    description:     sp.description || sp.name,
    longDescription: sp.description || undefined,
    category:        'filtre',
    price:           sp.price,
    imgSrc:          overrideImage(sp.stripeProductId, sp.images[0] || ''),
    imgLarge:        overrideImage(sp.stripeProductId, sp.images[0] || ''),
    images:          galleryFor(sp.stripeProductId) ?? (sp.images.length ? sp.images : undefined),
    lifestyleVideo:  videoFor(sp.stripeProductId),
    highlights:      [],
    features:        [],
    specs:           [],
    faqs:            [],
    useCases:        [],
    stripeProductId: sp.stripeProductId,
  }
}

/* ─── METADATA ───────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: { productId: string } }): Promise<Metadata> {
  const product = await fetchProduct(params.productId)
  if (!product) {
    return {
      title: 'Produkt ikke fundet',
      robots: { index: false, follow: false },
    }
  }

  const url = `${SITE_URL}/shop/${product.id}`
  const image = product.imgLarge || product.imgSrc

  // Word-boundary aware truncation (avoids mid-word cuts)
  function truncate(text: string, max: number): string {
    if (text.length <= max) return text
    const sliced = text.substring(0, max)
    const lastSpace = sliced.lastIndexOf(' ')
    return (lastSpace > max * 0.7 ? sliced.substring(0, lastSpace) : sliced).replace(/[,.;:\s]+$/, '') + '…'
  }

  const desc = product.longDescription
    ? truncate(product.longDescription, 155)
    : truncate(`${product.description} Køb online hos Clean Water Supply – hurtig levering i hele Danmark.`, 155)

  return {
    title: `${product.name}${product.tagline ? ' – ' + product.tagline : ''}`,
    description: desc,
    keywords: [product.name, product.category, ...(product.useCases || []), 'Legionella', 'vandfilter', 'Clean Water Supply'],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${product.name} | Clean Water Supply`,
      description: desc,
      images: image ? [{ url: image, alt: product.name }] : undefined,
      locale: 'da_DK',
      siteName: 'Clean Water Supply',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: desc,
      images: image ? [image] : undefined,
    },
  }
}

/* ─── FAQ ITEM ───────────────────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none list-none font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
        <span>{q}</span>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 group-open:rotate-90" />
      </summary>
      <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
        {a}
      </div>
    </details>
  )
}

/* ─── CATEGORY ICON ──────────────────────────────────────────────────────── */

const CAT_ICONS = {
  vandhane: Droplet,
  bruser: ShowerHead,
  vandkande: GlassWater,
  filtre: Filter,
  blosgoringsanlaeg: Waves,
  anlaeg: Droplets,
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId)
  if (!product) notFound()

  const related = product.alsoBought && product.alsoBought.length > 0
    ? product.alsoBought.map((id) => getProduct(id)).filter((p): p is Product => !!p)
    : getRelated(product, 3)
  const CatIcon = CAT_ICONS[product.category] ?? Droplets

  // Montering/installation: kalkanlæg + produkter med showInstallation (fx Filter Housing)
  const isSoftener = product.category === 'blosgoringsanlaeg'
  const showInstall = isSoftener || !!product.showInstallation

  // Udsolgt-status (central styring i stock.ts)
  const stock = stockFor(product)
  const soldOut = !!product.soldOut || !!stock
  const restockLabel = product.restockLabel ?? stock?.restockLabel

  // Levetid vist tydeligt øverst: eksplicit lifespan, ellers hentet fra "Levetid"-specen.
  // Vises kun på filtre (ikke selve kanderne) og kun hvis værdien er en reel varighed.
  const lifespanText = (
    product.lifespan ??
    product.specs?.find((s) => /^\s*levetid\s*$/i.test(s.label))?.value
  )
  const showLifespan =
    !!lifespanText &&
    !product.id.startsWith('kande-') &&
    /(dag|uge|måned|år|liter)/i.test(lifespanText)

  const catLabel: Record<string, string> = {
    vandhane: 'Vandhane',
    bruser: 'Bruser',
    vandkande: 'Vandkande',
    filtre: 'Filtre',
    blosgoringsanlaeg: 'Blødgøringsanlæg',
    anlaeg: 'Anlæg',
  }

  const crumbs = [
    { name: 'Hjem',  url: SITE_URL },
    { name: 'Shop',  url: `${SITE_URL}/shop` },
    { name: product.name, url: `${SITE_URL}/shop/${product.id}` },
  ]

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* JSON-LD structured data */}
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd crumbs={crumbs} />
      <FaqJsonLd faqs={product.faqs} />

      {/* ─── BREADCRUMB ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Hjem</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-gray-700 transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ─── HERO SPLIT ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef6ff] via-[#f5fbff] to-white pt-6 pb-6 lg:pb-8">
        <div className="pointer-events-none absolute -top-28 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#284eff]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -left-24 w-80 h-80 rounded-full bg-[#3aad4a]/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start [&>*]:min-w-0">

            {/* LEFT: Product image / galleri (billeder + evt. stemningsbillede & video) */}
            <div className="relative">
              {(() => {
                const baseImgs = product.images && product.images.length > 0
                  ? product.images
                  : [product.imgLarge ?? product.imgSrc].filter(Boolean) as string[]
                const galleryImgs = [
                  ...(product.lifestyleImage ? [product.lifestyleImage] : []),
                  ...baseImgs,
                ]
                const hasGallery = galleryImgs.length + (product.lifestyleVideo ? 1 : 0) > 1
                if (hasGallery) {
                  return <ProductGallery images={galleryImgs} video={product.lifestyleVideo} videoFirst={product.videoFirst} alt={product.name} />
                }
                return (
                  <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    {product.imgLarge || product.imgSrc ? (
                      <img
                        src={product.imgLarge ?? product.imgSrc}
                        alt={product.name}
                        width={768}
                        height={768}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-contain p-8"
                      />
                    ) : (
                      <CatIcon className="w-32 h-32 text-gray-200" />
                    )}
                  </div>
                )
              })()}
              {/* Badge overlay */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0a2540] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {product.badge}
                  </span>
                </div>
              )}
              {product.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#3aad4a] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    ⭐ Anbefalet
                  </span>
                </div>
              )}

              {/* Anbefalet husstandsstørrelse */}
              {product.recommendedFor && (
                <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-white text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#0a2540]">Anbefales til husstande på {product.recommendedFor}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Dimensioneret til en almindelig husstand på {product.recommendedFor} – passer til lejligheder, rækkehuse og mindre huse. Er I flere, eller har I et højt vandforbrug? Kontakt os, så finder vi den rette størrelse.
                    </p>
                  </div>
                </div>
              )}

              {/* Førstegangs-guide – udfylder venstre kolonne under billederne */}
              {product.firstUse && product.firstUse.length > 0 && (
                <div className="mt-6 rounded-3xl border border-blue-100 bg-gradient-to-b from-[#f5fbff] to-white p-6 shadow-sm">
                  <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Kom godt i gang</span>
                  <h2 className="text-lg font-extrabold text-[#0a2540] mt-1 mb-4">Sådan tager du filteret i brug første gang</h2>
                  <ol className="space-y-3">
                    {product.firstUse.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#284eff] to-[#1b32c9] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-md">
                          {i + 1}
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Fordele ved blødt vand – udfylder venstre kolonne (kun blødgøringsanlæg) */}
              {product.category === 'blosgoringsanlaeg' && (
                <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                  <h2 className="text-lg font-extrabold text-gray-900 mb-1">Derfor blødt vand</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    Hårdt, kalkholdigt vand slider på dit hjem – og på dig. Anlægget fjerner kalken via ionbytning, så du får blødt vand i hele huset. Det mærker du hver dag:
                  </p>
                  <ul className="space-y-4">
                    {[
                      { Icon: Sparkles, title: 'Mindre kalk & rengøring', body: 'Slut med kalkrande på fliser, glas og armaturer – mindre tid og færre kemikalier.' },
                      { Icon: Droplets, title: 'Mindre sæbe & produkt', body: 'Blødt vand skummer bedre, så du bruger markant mindre sæbe, shampoo og vaskemiddel.' },
                      { Icon: Heart, title: 'Blødere hud & hår', body: 'Uden kalk føles huden mindre tør, og håret bliver blødere og lettere at rede.' },
                      { Icon: ShieldCheck, title: 'Beskytter installationer', body: 'Mindre kalk i rør, varmtvandsbeholder og hvidevarer forlænger levetiden og sparer reparationer.' },
                      { Icon: Zap, title: 'Lavere energiforbrug', body: 'Kalkfri varmelegemer varmer vandet mere effektivt – det sænker dine regninger.' },
                      { Icon: Shirt, title: 'Blødere tøj', body: 'Tøj vasket i blødt vand bliver blødere og holder bedre på farverne.' },
                    ].map(({ Icon, title, body }) => (
                      <li key={title} className="flex gap-3">
                        <span className="w-9 h-9 rounded-lg bg-white text-blue-700 flex items-center justify-center shrink-0 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{title}</p>
                          <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* RIGHT: Info + buy */}
            <div className="flex flex-col">
              {/* Category pill */}
              <div className="flex items-center gap-2 mb-4">
                <CatIcon className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
                  {catLabel[product.category]}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              {soldOut && (
                <div className="inline-flex items-center gap-2.5 rounded-xl bg-red-50 ring-1 ring-red-200 px-4 py-2.5 mb-4">
                  <span className="inline-flex items-center rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wide px-3 py-1">Udsolgt</span>
                  {restockLabel && (
                    <span className="text-sm font-semibold text-red-700">Forventet på lager igen {restockLabel}</span>
                  )}
                </div>
              )}

              <p className="text-lg text-gray-500 font-medium mb-4">{product.tagline}</p>

              {/* Levetid – tydeligt øverst */}
              {showLifespan && (
                <div className="order-1 lg:order-none inline-flex items-center gap-2.5 self-start bg-[#3aad4a]/10 ring-1 ring-[#3aad4a]/30 rounded-full pl-3 pr-4 py-2 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#3aad4a] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-sm font-bold text-[#0a2540]">Holder {lifespanText}</span>
                </div>
              )}

              {/* Short description */}
              <p className="order-1 lg:order-none text-gray-700 leading-relaxed mb-8 text-[15px]">
                {product.description}
              </p>

              {/* Key highlights – fangende ikon-kort */}
              {product.highlights.length > 0 && (
                <div className="order-1 lg:order-none grid gap-2.5 mb-8">
                  {product.highlights.map((h, i) => {
                    const Icon = HL_ICONS[i % HL_ICONS.length]
                    const color = HL_COLORS[i % HL_COLORS.length]
                    return (
                      <div
                        key={i}
                        className="group flex items-center gap-3.5 bg-white ring-1 ring-blue-100 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" strokeWidth={2.3} />
                        </span>
                        <span className="text-[15px] font-extrabold text-[#0a2540] leading-snug">{h}</span>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Vælg levetid (varianter, fx 2M / 3M) */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-6">
                  <p className="text-sm font-bold text-[#0a2540] mb-1">Vælg levetid</p>
                  <p className="text-xs text-gray-500 mb-3">Filteret fås i to udgaver – vælg den, der passer til dit forbrug. Samme filter, kun forskellig levetid.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((v) => {
                      const isCurrent = v.id === product.id
                      const inner = (
                        <>
                          <span className="text-base font-extrabold text-[#0a2540]">{v.label}</span>
                          <span className="text-xs text-gray-500 mt-0.5">{v.sub}</span>
                          {isCurrent && (
                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#284eff]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Valgt
                            </span>
                          )}
                        </>
                      )
                      return isCurrent ? (
                        <div key={v.id} className="flex flex-col rounded-2xl px-4 py-3 ring-2 ring-[#284eff] bg-blue-50/60">
                          {inner}
                        </div>
                      ) : (
                        <Link
                          key={v.id}
                          href={`/shop/${v.id}`}
                          className="flex flex-col rounded-2xl px-4 py-3 ring-1 ring-gray-200 bg-white hover:ring-[#284eff] hover:-translate-y-0.5 transition-all"
                        >
                          {inner}
                          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-gray-400">Skift til denne →</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Buy section */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white p-6 shadow-sm shadow-[#284eff]/5">
                {/* Price (erhverv ser grossistpris) */}
                <ProductPrice product={product} />

                {product.priceNote && (
                  <div className="mb-5 mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#3aad4a]/10 ring-1 ring-[#3aad4a]/25 px-3 py-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2e9a3d] shrink-0" />
                    <span className="text-[13px] font-bold text-[#2e7d34] leading-snug">{product.priceNote}</span>
                  </div>
                )}

                {isSoftener && !product.addon && (
                  <GratisMonteringBanner variant="compact" className="mb-4" showCtas={false} />
                )}

                <BuyBox product={product} />
                <p className="text-xs text-gray-400 text-center mt-4">
                  🚚 Hurtig levering · 🔒 Sikker betaling · 💬 Gratis rådgivning
                </p>
              </div>

              {/* Tilbehør – kun på selve kalkanlæg-siderne (ikke på tilbehørets egne sider) */}
              {product.category === 'blosgoringsanlaeg' && !product.addon && (
                <div className="order-2 lg:order-none">
                  <AddonProducts products={ADDON_PRODUCTS} />
                </div>
              )}

              {/* Bestil montering & upload billeder – kalkanlæg + produkter med showInstallation */}
              {showInstall && !product.addon && (
                <div className="order-2 lg:order-none mt-6 rounded-2xl border border-gray-200 bg-white p-5">
                  <h3 className="font-bold text-[#0a2540] mb-1.5">Bestil montering &amp; installering</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Du kan tilkøbe montering af {isSoftener ? 'dit nye blødgøringsanlæg' : 'dit nye filterhus'}. For at vi kan beregne den bedste pris, beder vi dig uploade billeder af installationsstedet.
                  </p>
                  <Link href="/montering" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] hover:text-[#2e9a3d]">
                    Bestil montering og upload dine billeder her <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Use cases */}
              {product.useCases.length > 0 && (
                <div className="order-2 lg:order-none mt-6 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-400 font-medium w-full mb-1">Anvendes til:</span>
                  {product.useCases.map((uc, i) => (
                    <span key={i} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium">
                      {uc}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SÆLGENDE STORY (fx sundhed) ─────────────────────────── */}
      {product.sellStory && (
        <section className="py-11 bg-gradient-to-b from-white to-[#f5fbff] border-y border-blue-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-7">
              {product.sellStory.eyebrow && (
                <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">{product.sellStory.eyebrow}</span>
              )}
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mt-2 mb-3 leading-tight">{product.sellStory.heading}</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">{product.sellStory.intro}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.sellStory.cards.map((c) => {
                const Icon = STORY_ICONS[c.icon] ?? Droplets
                return (
                  <div key={c.title} className="rounded-2xl bg-white ring-1 ring-blue-100 shadow-sm p-5">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3aad4a] to-[#2e9a3d] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                    </span>
                    <h3 className="text-[15px] font-extrabold text-[#0a2540] mb-1 leading-snug">{c.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{c.text}</p>
                  </div>
                )
              })}
            </div>
            {product.sellStory.closing && (
              <p className="text-center text-lg font-extrabold text-[#0a2540] mt-7">{product.sellStory.closing}</p>
            )}
          </div>
        </section>
      )}

      {/* ─── TILKØB: FILTRE DER PASSER (fx til kanden) ────────────── */}
      {product.compatibleFilters && product.compatibleFilters.length > 0 && (() => {
        const filters = product.compatibleFilters
          .map((id) => getProduct(id))
          .filter((f): f is Product => !!f)
        if (filters.length === 0) return null
        const isKande = product.category === 'vandkande'
        return (
          <section className="py-14 bg-gradient-to-b from-[#f5fbff] to-white border-y border-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-1.5">
                <Filter className="w-4 h-4 text-[#284eff]" />
                <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Tilkøb</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mb-2">
                {isKande ? 'Filtre der passer til kanden' : 'Filtre der passer i huset'}
              </h2>
              <p className="text-gray-500 mb-8 max-w-2xl">
                Vælg den filterpatron, der passer til dit behov – alle passer i {isKande ? 'denne kande' : 'dette filterhus'}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {filters.map((f) => (
                  <div
                    key={f.id}
                    className="group flex flex-col rounded-3xl bg-white ring-1 ring-blue-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                  >
                    <Link href={`/shop/${f.id}`} className="block h-56 bg-white flex items-center justify-center p-3 border-b border-gray-50 overflow-hidden">
                      {f.imgSrc ? (
                        <img src={f.imgSrc} alt={f.name} className="max-h-full max-w-full object-contain scale-[1.35] group-hover:scale-150 transition-transform duration-500" />
                      ) : (
                        <Filter className="w-12 h-12 text-gray-200" />
                      )}
                    </Link>
                    <div className="flex flex-col flex-1 p-6">
                      <Link href={`/shop/${f.id}`} className="hover:text-[#284eff] transition-colors">
                        <h3 className="text-base font-extrabold text-[#0a2540] leading-tight">{f.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{f.tagline}</p>
                      {f.removes && (
                        <p className="text-sm text-[#2e9a3d] mt-3 leading-snug flex items-start gap-1.5 flex-1">
                          <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{f.removes}</span>
                        </p>
                      )}
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          {f.price !== undefined && (
                            <span className="text-lg font-extrabold text-[#0a2540]">{f.price.toLocaleString('da-DK')} kr</span>
                          )}
                          <Link href={`/shop/${f.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] hover:gap-2.5 transition-all">
                            Se filter <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                        <FilterAddToCart id={f.id} name={f.name} price={f.price} image={f.imgSrc} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ─── KANDER DER PASSER TIL FILTERET ──────────────────────── */}
      {product.compatibleJugs && product.compatibleJugs.length > 0 && (() => {
        const jugs = product.compatibleJugs
          .map((id) => getProduct(id))
          .filter((j): j is Product => !!j)
        if (jugs.length === 0) return null
        return (
          <section className="py-14 bg-white border-b border-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-1.5">
                <GlassWater className="w-4 h-4 text-[#284eff]" />
                <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Passer til</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mb-2">Kander der passer til dette filter</h2>
              <p className="text-gray-500 mb-8 max-w-2xl">
                Bi-flux®-filteret passer i disse Laica-filterkander – og i de fleste Brita®-kander.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {jugs.map((j) => (
                  <div
                    key={j.id}
                    className="group flex flex-col sm:flex-row rounded-3xl bg-white ring-1 ring-blue-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                  >
                    <Link href={`/shop/${j.id}`} className="sm:w-2/5 h-56 sm:h-auto bg-white flex items-center justify-center p-5 border-b sm:border-b-0 sm:border-r border-gray-50">
                      {j.imgSrc ? (
                        <img src={j.imgSrc} alt={j.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <GlassWater className="w-12 h-12 text-gray-200" />
                      )}
                    </Link>
                    <div className="flex flex-col flex-1 p-6">
                      <Link href={`/shop/${j.id}`} className="hover:text-[#284eff] transition-colors">
                        <h3 className="text-base font-extrabold text-[#0a2540] leading-tight">{j.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 flex-1">{j.tagline}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          {j.price !== undefined && (
                            <span className="text-lg font-extrabold text-[#0a2540]">{j.price.toLocaleString('da-DK')} kr</span>
                          )}
                          <Link href={`/shop/${j.id}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] hover:gap-2.5 transition-all">
                            Se kande <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                        <FilterAddToCart id={j.id} name={j.name} price={j.price} image={j.imgSrc} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ─── SÅDAN MONTERER DU (monteringsvideo) ──────────────────── */}
      {product.installVideo && (
        <section className="py-12 bg-gradient-to-b from-white to-[#f5fbff] border-y border-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[11px] font-black text-[#3aad4a] uppercase tracking-widest">Video</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mt-1.5">Sådan monterer du den</h2>
              <p className="text-gray-500 mt-2">Se hvor nemt koblingen sættes på – helt uden værktøj.</p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-black">
              <video
                src={product.installVideo}
                controls
                playsInline
                preload="metadata"
                aria-label="Monteringsvideo"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* ─── HUSK KOBLING (nødvendigt tilbehør) ───────────────────── */}
      {product.requiresCoupling && (() => {
        const couplings = ['coupling-m22', 'coupling-m24']
          .map((id) => getProduct(id))
          .filter((c): c is Product => !!c)
        if (couplings.length === 0) return null
        return (
          <section className="py-10 bg-amber-50/70 border-y border-amber-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-3 mb-6">
                <span className="w-11 h-11 shrink-0 rounded-2xl bg-amber-400/90 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#0a2540]">Husk en kobling – den skal bruges til filteret</h2>
                  <p className="text-gray-600 text-[15px] mt-1.5 leading-relaxed max-w-2xl">
                    Filteret klikkes fast på din vandhane med en lille kobling. Vælg den, der passer til din hanes gevind –
                    den købes kun én gang og bliver siddende, når du skifter filter.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {couplings.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop/${c.id}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-white ring-1 ring-amber-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5"
                  >
                    <div>
                      <h3 className="font-extrabold text-[#0a2540]">{c.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{c.tagline}</p>
                      {c.price !== undefined && (
                        <p className="text-base font-bold text-[#0a2540] mt-2">{c.price.toLocaleString('da-DK')} kr</p>
                      )}
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] group-hover:gap-2.5 transition-all">
                      Se kobling <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                I tvivl om, hvilken kobling din hane skal bruge? <Link href="/contact" className="font-semibold text-[#284eff]">Kontakt os</Link>, så hjælper vi dig.
              </p>
            </div>
          </section>
        )
      })()}

      {/* ─── FEATURES + SPECS ─────────────────────────────────────── */}
      <section className="py-11 bg-gradient-to-b from-white to-[#f5fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Features */}
            <div className="bg-white rounded-3xl p-8 ring-1 ring-blue-100/70 shadow-sm">
              <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Det får du</span>
              <h2 className="text-xl font-extrabold text-[#0a2540] mt-1 mb-6">Hvad er inkluderet</h2>
              <ul className="space-y-3.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#284eff] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            {product.specs.length > 0 && (
              <div className="bg-white rounded-3xl ring-1 ring-blue-100/70 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#0a2540] via-[#173a7a] to-[#284eff] px-8 py-5">
                  <h2 className="text-white font-extrabold text-lg">Tekniske specifikationer</h2>
                </div>
                <div className="p-8 divide-y divide-blue-50">
                  {product.specs.map((spec, i) => (
                    <div key={i} className={`flex justify-between items-start gap-4 py-3.5 first:pt-0 ${i % 2 === 1 ? '' : ''}`}>
                      <span className="text-sm text-gray-500 shrink-0 font-medium">{spec.label}</span>
                      <span className="text-sm text-[#0a2540] font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── LONG DESCRIPTION ─────────────────────────────────────── */}
      {product.longDescription && (
        <section className="py-14 bg-white border-y border-blue-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Om produktet</span>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mt-1 mb-5">Det skal du vide</h2>
            <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">{product.longDescription}</p>
          </div>
        </section>
      )}

      {/* ─── MONTERING (monteringsvejledning) ─────────────────────── */}
      {product.installNote && (
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-white ring-1 ring-amber-100 p-7 flex gap-4">
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-amber-400/90 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Wrench className="w-6 h-6 text-white" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-[#0a2540] mb-2">Montering</h2>
                <p className="text-gray-700 leading-relaxed text-[15px]">{product.installNote}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── STANDARD INSTALLATION (kalkanlæg + showInstallation) ──── */}
      {showInstall && (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">

              {/* Header */}
              <div className="bg-[#0a2540] px-8 py-7 text-white">
                <div className="flex items-center gap-2 text-green-300 text-xs font-bold uppercase tracking-widest mb-2">
                  <Wrench className="w-4 h-4" /> Tilkøb
                </div>
                <h2 className="text-2xl font-extrabold">{isSoftener ? 'Standard installation af kalkanlæg' : 'Standard installation af filterhus'}</h2>
                <p className="text-white/70 text-[15px] mt-2 max-w-2xl">
                  Vælg vores standard installation, så sørger vi for en komplet og professionel montering{isSoftener ? ' af dit nye anlæg' : ' af dit nye filterhus på rørledningen'} – korrekt installeret og klar til brug fra dag ét.
                </p>
                <p className="text-green-300 text-xs font-semibold mt-3">
                  Monteringen tilbydes kun i kombination med køb af {isSoftener ? 'et af vores kalkanlæg' : 'et filterhus hos os'}.
                </p>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-8">
                {/* Inkluderet */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Inkluderet i installationen</h3>
                  <ul className="space-y-2.5">
                    {(isSoftener
                      ? [
                          'Indskæring og tilslutning på hovedvandledningen (koldt vand)',
                          'Montering og opsætning på gulv, hylde eller plan overflade',
                          'Tilslutning med medfølgende slanger (op til 1 meter)',
                          'Tilslutning til eksisterende afløb',
                          'Måling af vandets hårdhed og korrekt indstilling efter lokale forhold',
                          'Kontrolmåling af vandet før og efter installation',
                          'Påfyldning af første omgang regenereringssalt',
                        ]
                      : [
                          'Indskæring og tilslutning af filterhuset på rørledningen (koldt vand)',
                          'Montering på væg eller plan overflade med god serviceadgang',
                          'Tilslutning med medfølgende fittings',
                          'Montering af første filterpatron',
                          'Trykprøvning og kontrol for tæthed efter installation',
                        ]
                    ).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Forudsætninger + ekstra tilkøb */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Forudsætninger</h3>
                  <ul className="space-y-2.5 mb-7">
                    {(isSoftener
                      ? [
                          'Adressen ligger inden for 50 km fra Horsens (ellers kørselstillæg)',
                          'Plads til anlægget på gulv eller hylde',
                          'Velfungerende afløb maks. 1 meter fra anlægget',
                          'Slangerne er 1 meter – længere afstand kræver et længere slangesæt',
                        ]
                      : [
                          'Adressen ligger inden for 50 km fra Horsens (ellers kørselstillæg)',
                          'Adgang til rørledningen med plads til filterhuset',
                          'Mulighed for at lukke for vandet under installationen',
                          'God serviceadgang til senere patronskift',
                        ]
                    ).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-bold text-gray-900 mb-4">Ekstra tilkøb</h3>
                  <ul className="space-y-2.5">
                    {(isSoftener
                      ? [
                          'Vægbeslag til vægmontering',
                          '2 meter tilslutningsslangesæt',
                          'Ekstra kørsel ud over 50 km fra Horsens',
                        ]
                      : [
                          'Ekstra filterpatroner',
                          'Bypass-ventil til nem service',
                          'Ekstra kørsel ud over 50 km fra Horsens',
                        ]
                    ).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3aad4a] shrink-0 mt-2" />
                        <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="px-8 pb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-blue-50 rounded-2xl p-5">
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                    I tvivl om forholdene hos jer? Vi rådgiver gerne og finder den rette løsning. Kontakt os for pris og book installation sammen med dit{isSoftener ? ' anlæg' : ' filterhus'}.
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shrink-0">
                    Kontakt os
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      {product.faqs.length > 0 && (
        <section className="py-11 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">Ofte stillede spørgsmål</h2>
            <div className="space-y-3">
              {product.faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── RELATED PRODUCTS ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-extrabold text-gray-900">{product.alsoBought && product.alsoBought.length > 0 ? 'Andre købte også …' : 'Lignende produkter'}</h2>
              <Link href="/shop" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">
                Se alle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.id} href={`/shop/${rp.id}`} className="group bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="h-48 bg-white overflow-hidden flex items-center justify-center p-6">
                    {rp.imgSrc ? (
                      <img
                        src={rp.imgSrc}
                        alt={rp.name}
                        width={300}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <CatIcon className="w-16 h-16 text-gray-200" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {rp.badge && (
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide mb-2 w-fit">
                        {rp.badge}
                      </span>
                    )}
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{rp.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 flex-1 leading-relaxed">{rp.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                      Se produkt <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ───────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Brug for rådgivning?
          </h2>
          <p className="text-blue-100/80 mb-9 text-lg">
            Vores vandbehandlingseksperter hjælper dig gratis med at vælge den rigtige løsning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-9 py-4 rounded-full font-bold text-base transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              Kontakt os
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-9 py-4 rounded-full font-bold text-base transition-all"
            >
              Tilbage til shop
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
