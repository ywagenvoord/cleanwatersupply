import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight, Check, ChevronRight, Droplets,
  Zap, Leaf, Recycle, Sparkles, ShieldCheck, GlassWater, Timer, Droplet,
  Truck, BadgeCheck, Heart,
} from 'lucide-react'
import { KANDER, getKande } from '@/lib/kander'
import { SITE_URL } from '@/lib/site'
import ProductGallery from '@/components/ProductGallery'
import KandeBuy from './KandeBuy'
import GlaSSmartVideoModal from './GlaSSmartVideoModal'
import LaicaProductJsonLd from '@/components/seo/LaicaProductJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

const HIGHLIGHT_ICONS: Record<string, typeof Zap> = {
  zap: Zap,
  leaf: Leaf,
  recycle: Recycle,
  sparkles: Sparkles,
  shield: ShieldCheck,
  glass: GlassWater,
  timer: Timer,
  droplet: Droplet,
}

// Ikoner til trin-for-trin tidslinjen (går på skift efter trinnets nummer)
const STEP_ICONS = [Droplets, Droplet, Recycle, GlassWater, Timer, Heart]

export function generateStaticParams() {
  return KANDER.map((k) => ({ slug: k.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const k = getKande(params.slug)
  if (!k) return { title: 'Ikke fundet', robots: { index: false, follow: false } }
  return {
    title: `${k.name} | Clean Water Supply`,
    description: `${k.tagline} Filtrér vandet nemt med ${k.name} fra Laica – rent vand med god smag, uden installation.`.slice(0, 160),
    keywords: [k.name, 'Laica', 'filterkande', 'vandkande med filter', 'filtervandkande', 'rent vand', 'filter til vandkande'],
    alternates: { canonical: `${SITE_URL}/vandkander/${k.slug}` },
    openGraph: k.ogVideo
      ? {
          type: 'video.other',
          title: k.name,
          description: k.tagline,
          url: `${SITE_URL}/vandkander/${k.slug}`,
          locale: 'da_DK',
          siteName: 'Clean Water Supply',
          videos: [{ url: `${SITE_URL}${k.ogVideo}`, secureUrl: `${SITE_URL}${k.ogVideo}`, type: 'video/mp4', width: 1080, height: 1920 }],
          images: k.ogImage ? [{ url: `${SITE_URL}${k.ogImage}`, width: 1200, height: 630, alt: k.name }] : undefined,
        }
      : {
          type: 'website',
          title: k.name,
          description: k.tagline,
          url: `${SITE_URL}/vandkander/${k.slug}`,
          locale: 'da_DK',
          siteName: 'Clean Water Supply',
          images: k.ogImage ? [{ url: `${SITE_URL}${k.ogImage}`, width: 1200, height: 630, alt: k.name }] : undefined,
        },
    twitter: {
      card: k.ogVideo ? 'player' : 'summary_large_image',
      title: k.name,
      description: k.tagline,
      images: k.ogImage ? [`${SITE_URL}${k.ogImage}`] : undefined,
    },
  }
}

export default function KandePage({ params }: { params: { slug: string } }) {
  const k = getKande(params.slug)
  if (!k) notFound()

  return (
    <main className="bg-white">
      <LaicaProductJsonLd
        name={k.name}
        path={`/vandkander/${k.slug}`}
        image={k.ogImage || k.img}
        description={k.tagline}
        price={k.price}
        sku={k.varenr}
        category="Vandkande med filter"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Vandkander', url: `${SITE_URL}/vandkander` },
          { name: k.name, url: `${SITE_URL}/vandkander/${k.slug}` },
        ]}
      />
      {k.slug === 'glassmart' && <GlaSSmartVideoModal />}
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-7">
          {/* Brødkrumme */}
          <nav className="text-sm text-gray-400 flex items-center gap-1.5">
            <Link href="/vandkander" className="hover:text-[#0a2540] transition-colors">Vandkander</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-600">{k.name}</span>
          </nav>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start [&>*]:min-w-0">
            {/* Billede */}
            <div className="order-2 md:order-none md:col-start-1 md:row-start-1">
              <ProductGallery
                items={[
                  { src: k.img },
                  ...(k.lifestyle ?? []).map((src) => ({ src, cover: true })),
                  ...(k.gallery ?? []).map((src) => ({ src })),
                  ...(k.lifestyleEnd ?? []).map((src) => ({ src, cover: true })),
                ]}
                alt={k.name}
                highlight={k.highlight}
              />
            </div>

            {/* Tekst */}
            <div className="order-1 md:order-none md:col-start-2 md:row-start-1 md:row-span-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-gray-200 px-3.5 py-1.5 mb-5 shadow-sm">
                <Droplets className="w-3.5 h-3.5 text-[#3aad4a]" />
                <span className="text-[11px] font-bold text-[#2e9a3d] uppercase tracking-widest">{k.art}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-[1.05] tracking-tight">{k.name}</h1>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">{k.tagline}</p>
              {k.capacity && (
                <p className="inline-flex items-center gap-2 text-sm font-bold text-[#284eff] bg-gray-100 rounded-full px-4 py-1.5 mt-5">
                  <Droplet className="w-3.5 h-3.5" /> {k.capacity}
                </p>
              )}

              {k.price != null && (
                <div className="mt-6 flex items-baseline flex-wrap gap-x-2 gap-y-1">
                  <span className="text-3xl font-extrabold text-[#0a2540]">{k.price.toLocaleString('da-DK')} kr</span>
                  <span className="text-sm text-gray-400">inkl. moms</span>
                  {k.varenr && <span className="text-xs text-gray-400">· Varenr. {k.varenr}</span>}
                </div>
              )}

              {k.stockLeft != null && k.stockLeft > 0 && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-50 ring-1 ring-red-200 px-3.5 py-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                  </span>
                  <span className="text-sm font-bold text-red-700">
                    {k.stockLeft === 1 ? 'Kun 1 tilbage på lager' : `Kun ${k.stockLeft} tilbage på lager`}
                  </span>
                </div>
              )}

              {k.stripeProductId && k.price != null ? (
                <KandeBuy stripeProductId={k.stripeProductId} name={k.name} price={k.price} image={k.img} />
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-8 py-4 text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
                  >
                    Køb i shoppen <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/60 hover:bg-white text-[#0a2540] font-semibold px-8 py-4 text-sm transition-all"
                  >
                    Få rådgivning
                  </Link>
                </div>
              )}

              {/* Trust-chips */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <BadgeCheck className="w-4 h-4 text-[#284eff]" /> Made in EU
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Truck className="w-4 h-4 text-[#284eff]" /> Levering 2-3 hverdage
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Leaf className="w-4 h-4 text-[#3aad4a]" /> Fri for engangsplast
                </span>
              </div>

              {/* Produktvideo – ramme i højre kolonne, matcher tilkøbsboksens størrelse */}
              {k.video && (
                <>
                <h2 className="mt-8 mb-3 text-lg font-extrabold text-[#0a2540] flex items-center gap-2">
                  Tryghed til hele familien
                  <Heart className="w-5 h-5 text-[#e0245e] fill-[#e0245e]" />
                </h2>
                <div className="w-full rounded-2xl overflow-hidden ring-1 ring-gray-200 bg-black shadow-sm">
                  <video
                    src={k.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-[380px] object-cover block"
                  />
                </div>
                </>
              )}

            </div>

            {/* Tilkøb: matchende filter – under billedet (desktop) / under køb (mobil) */}
            {k.addon && (
              <div className="order-3 md:order-none md:col-start-1 md:row-start-2">
                <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 shadow-sm p-5">
                  <p className="text-sm font-extrabold text-[#0a2540] leading-snug">
                    Skal du være dækket ind fra start?
                  </p>
                  <p className="text-[13px] text-gray-600 mt-1 mb-4">
                    Køb 3 nye filtre med til udskiftning – så er du klar fra dag ét.
                  </p>
                  <Link
                    href={k.addon.link ?? '/shop'}
                    className="group flex items-center gap-4 rounded-xl -m-1 p-1 hover:bg-white/70 transition-colors"
                  >
                    <div className="w-32 h-32 shrink-0 rounded-xl bg-white flex items-center justify-center p-2">
                      <img src={k.addon.img} alt={k.addon.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-black text-[#2e9a3d] uppercase tracking-widest">Tilkøb · filter</p>
                      <h2 className="text-sm font-extrabold text-[#0a2540] leading-snug mt-0.5 group-hover:text-[#2e9a3d] transition-colors">{k.addon.name}</h2>
                      <p className="text-xs text-gray-500 mt-1">{k.addon.life}</p>
                      {k.addon.price != null && (
                        <p className="text-base font-extrabold text-[#0a2540] mt-1.5">
                          {k.addon.price.toLocaleString('da-DK')} kr <span className="text-xs font-medium text-gray-400">inkl. moms</span>
                        </p>
                      )}
                    </div>
                  </Link>
                  <Link
                    href={k.addon.link ?? '/shop'}
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold text-sm px-4 py-2.5 transition-all hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5"
                  >
                    Se filteret <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHTS ────────────────────────────────────── */}
      {k.highlights && k.highlights.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {k.highlights.map((h) => {
              const Icon = HIGHLIGHT_ICONS[h.icon] ?? Droplets
              return (
                <div
                  key={h.title}
                  className="group rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-300/40 hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col"
                >
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#284eff] to-[#1b32c9] flex items-center justify-center mb-3.5 shadow-lg shadow-[#284eff]/25">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </span>
                  <h3 className="text-sm font-extrabold text-[#0a2540] leading-tight">{h.title}</h3>
                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">{h.text}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ─── OM + FORDELE ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="rounded-3xl bg-gray-50 ring-1 ring-gray-200 p-7 md:p-8">
            <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Om produktet</span>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mt-1.5 mb-3 leading-tight">
              {k.name.replace('Vandkande med filter ', '')}
            </h2>
            <p className="text-gray-600 leading-relaxed">{k.intro}</p>
          </div>
          <div className="rounded-3xl bg-gray-50 ring-1 ring-gray-200 p-7 md:p-8">
            <span className="text-[11px] font-black text-[#2e9a3d] uppercase tracking-widest">Fordele</span>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mt-1.5 mb-4 leading-tight">Derfor er den god</h2>
            <ul className="space-y-3">
              {k.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#3aad4a] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── SÅDAN BRUGER DU DEN – tidslinje ───────────────── */}
      {k.steps && k.steps.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-white to-blue-50/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Samlingsguide</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mt-1.5">Sådan samler du den</h2>
              <p className="text-gray-500 mt-2 text-sm">Fra pakke til friskt vand på få minutter.</p>
            </div>

            <div className="rounded-3xl bg-white ring-1 ring-blue-100 shadow-sm p-6 sm:p-9">
            <div className="relative">
              {/* Vandret forbindelseslinje (vises når alle trin står på én række) */}
              <div className="hidden lg:block absolute top-[26px] left-[8%] right-[8%] border-t-2 border-dashed border-blue-200" />
              <ol className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-9">
                {k.steps.map((step, i) => {
                  const Icon = STEP_ICONS[i % STEP_ICONS.length]
                  const last = i === k.steps!.length - 1
                  return (
                    <li key={step} className="relative flex flex-col items-center text-center">
                      <span
                        className={`relative z-10 w-[52px] h-[52px] rounded-full text-white flex items-center justify-center shadow-lg ring-4 ring-white mb-3 ${
                          last
                            ? 'bg-gradient-to-br from-[#3aad4a] to-[#2e9a3d] shadow-green-500/30'
                            : 'bg-gradient-to-br from-[#284eff] to-[#1b32c9] shadow-[#284eff]/30'
                        }`}
                      >
                        <Icon className="w-5 h-5" strokeWidth={2.2} />
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white text-[10px] font-black text-[#0a2540] flex items-center justify-center ring-1 ring-gray-200">
                          {i + 1}
                        </span>
                      </span>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${last ? 'text-[#2e9a3d]' : 'text-[#284eff]'}`}>
                        {last ? 'Færdig' : `Trin ${i + 1}`}
                      </p>
                      <p className="text-[13px] text-gray-700 leading-relaxed mt-1 max-w-[180px]">{step}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── SPECIFIKATIONER ───────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="rounded-3xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
          <div className="bg-[#0a2540] px-7 py-5 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#9db8ff]" />
            <h2 className="text-white font-extrabold text-lg">Specifikationer</h2>
          </div>
          <dl className="divide-y divide-gray-100">
            {k.specs.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center justify-between gap-4 px-7 py-4 ${i % 2 === 1 ? 'bg-gray-50/60' : ''}`}
              >
                <dt className="text-sm text-gray-500">{s.label}</dt>
                <dd className="text-sm font-semibold text-[#0a2540] text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── MILJØ / BESPARELSE ────────────────────────────── */}
      {k.eco && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="relative overflow-hidden rounded-3xl bg-gray-50 ring-1 ring-gray-200 p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <span className="relative w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#3aad4a] to-[#2e9a3d] flex items-center justify-center shadow-lg shadow-green-500/25">
              <Leaf className="w-8 h-8 text-white" strokeWidth={2} />
            </span>
            <div className="relative">
              <h2 className="text-xl font-extrabold text-[#0a2540]">Godt for både dig og miljøet</h2>
              <p className="text-gray-600 text-sm md:text-base mt-1.5 leading-relaxed max-w-xl">{k.eco}</p>
            </div>
          </div>
        </section>
      )}

      {/* ─── AFSLUTTENDE CTA ───────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a2540] to-[#123a63] p-9 md:p-12 text-center">
          <div className="pointer-events-none absolute -top-16 -left-10 w-64 h-64 rounded-full bg-[#3aad4a]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-[#284eff]/20 blur-3xl" />
          <h2 className="relative text-2xl md:text-3xl font-extrabold text-white mb-3">Klar til rent vand fra kanden?</h2>
          <p className="relative text-blue-100/80 mb-7 max-w-xl mx-auto leading-relaxed">
            Se {k.name.replace('Vandkande med filter ', '')} i shoppen, eller få gratis rådgivning om,
            hvad der passer bedst til jer.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-8 py-4 text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
            >
              Se i shoppen <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 text-sm transition-all"
            >
              Få gratis rådgivning
            </Link>
          </div>
        </div>

        {/* Tilbage */}
        <div className="text-center mt-8">
          <Link href="/vandkander" className="text-sm font-semibold text-gray-500 hover:text-[#0a2540] transition-colors">
            ← Se alle vandkander
          </Link>
        </div>
      </section>
    </main>
  )
}
