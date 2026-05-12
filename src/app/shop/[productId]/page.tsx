import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { PRODUCTS, getProduct, getRelated, type Product } from '@/lib/products'
import { CheckCircle2, ChevronRight, ShieldCheck, Droplets, Filter, Waves, ArrowRight, Phone } from 'lucide-react'
import BuyBox from './BuyBox'
import { getActiveStripeProducts } from '@/lib/stripe-fetch'
import ProductJsonLd from '@/components/seo/ProductJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import FaqJsonLd from '@/components/seo/FaqJsonLd'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'

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

  return {
    id:              sp.stripeProductId,
    name:            sp.name,
    tagline:         'Tilgængelig via Stripe',
    description:     sp.description || sp.name,
    longDescription: sp.description || undefined,
    category:        'filtre',
    price:           sp.price,
    imgSrc:          sp.images[0] || '',
    imgLarge:        sp.images[0] || '',
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
  filtre: Filter,
  blosgoringsanlaeg: Waves,
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId)
  if (!product) notFound()

  const related = getRelated(product, 3)
  const CatIcon = CAT_ICONS[product.category] ?? Droplets

  const catLabel: Record<string, string> = {
    filtre: 'Filtre',
    blosgoringsanlaeg: 'Blødgøringsanlæg',
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
      <section className="bg-white pt-8 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* LEFT: Product image */}
            <div className="relative">
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
              <p className="text-lg text-gray-500 font-medium mb-6">{product.tagline}</p>

              {/* Short description */}
              <p className="text-gray-700 leading-relaxed mb-8 text-[15px]">
                {product.description}
              </p>

              {/* Key highlights */}
              {product.highlights.length > 0 && (
                <div className="grid gap-3 mb-8">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0" />
                      <span className="text-sm font-semibold text-gray-800">{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Buy section */}
              <div className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-6">
                {/* Price */}
                {product.comingSoon || product.price === undefined ? (
                  <div className="mb-5">
                    <p className="text-2xl font-extrabold text-gray-400">Kommer snart</p>
                    <p className="text-xs text-gray-400 mt-1">Kontakt os for opdateret leveringsdato</p>
                  </div>
                ) : (
                  <div className="mb-5">
                    <p className="text-3xl font-extrabold text-[#0a2540]">
                      {product.price.toLocaleString('da-DK')} kr
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Inkl. moms · Hurtig levering</p>
                  </div>
                )}

                <BuyBox product={product} />
                <p className="text-xs text-gray-400 text-center mt-4">
                  🚚 Hurtig levering · 🔒 Sikker betaling · 💬 Gratis rådgivning
                </p>
              </div>

              {/* Use cases */}
              {product.useCases.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
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

      {/* ─── FEATURES + SPECS ─────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Features */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">Hvad er inkluderet</h2>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            {product.specs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <h2 className="text-xl font-extrabold text-gray-900 mb-6">Tekniske specifikationer</h2>
                <div className="divide-y divide-gray-50">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-start gap-4 py-3 first:pt-0 last:pb-0">
                      <span className="text-sm text-gray-500 shrink-0 font-medium">{spec.label}</span>
                      <span className="text-sm text-gray-900 font-semibold text-right">{spec.value}</span>
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
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Om produktet</h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">{product.longDescription}</p>
          </div>
        </section>
      )}

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      {product.faqs.length > 0 && (
        <section className="py-16 bg-gray-50">
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
              <h2 className="text-2xl font-extrabold text-gray-900">Lignende produkter</h2>
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
