import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SOLUTIONS, getSolution } from '@/lib/solutions'
import { getProduct } from '@/lib/products'
import { ArrowRight, ChevronRight, CheckCircle2, Droplets, Info, Settings2, Sparkles, XCircle, Coins, ShieldCheck, Heart } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sol = getSolution(params.slug)
  if (!sol) return { title: 'Løsning ikke fundet', robots: { index: false, follow: false } }
  const url = `${SITE_URL}/loesninger/${sol.slug}`
  return {
    title: `${sol.label} – sådan hjælper det dig i hverdagen | Clean Water Supply`,
    description: sol.intro,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', url, title: `${sol.label} | Clean Water Supply`,
      description: sol.intro, images: [{ url: sol.heroImg, alt: sol.label }],
      locale: 'da_DK', siteName: 'Clean Water Supply',
    },
  }
}

function price(p?: number) {
  return p ? `${p.toLocaleString('da-DK')} kr` : 'Kommer snart'
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const sol = getSolution(params.slug)
  if (!sol) notFound()

  const products = sol.productIds.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p)

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[360px] flex items-end overflow-hidden">
        {sol.heroVideo ? (
          <video
            src={sol.heroVideo}
            poster={sol.heroPoster ?? sol.heroImg}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img src={sol.heroImg} alt={sol.label} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540] via-[#0a2540]/70 to-[#0a2540]/20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 pt-28">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-4">
            <Link href="/private" className="hover:text-white transition-colors">Privat</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90 font-medium">{sol.label}</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <Droplets className="w-3.5 h-3.5 text-green-400" /> Løsning til hjemmet
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{sol.label}</h1>
          <p className="text-lg text-blue-100/90 max-w-2xl leading-relaxed">{sol.intro}</p>
        </div>
      </section>

      {/* ─── SÆLGENDE HOOK ────────────────────────────────────── */}
      {sol.sell && (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3a6e] to-[#0a2540]">
          <div className="pointer-events-none absolute -top-28 -right-28 w-[32rem] h-[32rem] rounded-full bg-[#284eff]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#3aad4a]/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <ScrollReveal>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-7">
                <Droplets className="w-3.5 h-3.5" /> Blødt vand
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">{sol.sell.hook}</h2>
              <p className="text-blue-100/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">{sol.sell.hookSub}</p>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ─── GENKENDELIGE FRUSTRATIONER ───────────────────────── */}
      {sol.sell && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <span className="section-badge">Kan du genkende det?</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a2540] leading-tight tracking-tight">Hårdt vand lister sig ind alle steder</h2>
            </div>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {sol.sell.pains.map((p) => (
                  <div key={p} className="flex items-start gap-4 rounded-2xl bg-gray-50/70 ring-1 ring-gray-100 p-5 transition-all hover:bg-white hover:ring-gray-200 hover:shadow-md">
                    <span className="w-9 h-9 shrink-0 rounded-full bg-red-50 text-red-400 flex items-center justify-center">
                      <XCircle className="w-5 h-5" />
                    </span>
                    <p className="text-[15px] text-gray-700 leading-relaxed pt-1.5">{p}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── HVAD / HVORDAN ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6 items-stretch">
          {/* Venstre: to tekstkort i samme bredde, stablet */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
              <div className="w-12 h-12 rounded-xl bg-white text-blue-700 flex items-center justify-center mb-5 shadow-sm">
                <Info className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">Hvad er det?</h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{sol.what}</p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
              <div className="w-12 h-12 rounded-xl bg-white text-blue-700 flex items-center justify-center mb-5 shadow-sm">
                <Settings2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">Sådan virker det</h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{sol.how}</p>
            </div>
          </div>
          {/* Højre: cover-billede i fuld højde */}
          <div className="relative rounded-3xl overflow-hidden border border-gray-100 min-h-[320px] md:min-h-full">
            <img src={sol.heroImg} alt={sol.label} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ─── FORVANDLINGEN (sælgende) ─────────────────────────── */}
      {sol.sell && (
        <section className="py-20 bg-gradient-to-b from-[#f5faff] to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="section-badge"><Sparkles className="w-3.5 h-3.5" /> Forvandlingen</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a2540] leading-tight tracking-tight">Sådan føles hverdagen med blødt vand</h2>
            </div>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sol.sell.transform.map((b) => (
                  <div key={b.title} className="group rounded-3xl bg-white ring-1 ring-gray-100 shadow-sm p-7 transition-all hover:shadow-xl hover:-translate-y-1">
                    <span className="w-12 h-12 rounded-2xl bg-[#3aad4a]/10 text-[#2e9a3d] flex items-center justify-center mb-5 transition-colors group-hover:bg-[#3aad4a] group-hover:text-white">
                      <Heart className="w-6 h-6" />
                    </span>
                    <h3 className="font-extrabold text-[#0a2540] text-[17px] mb-2">{b.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── DET BETALER SIG SELV ─────────────────────────────── */}
      {sol.sell && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="section-badge"><Coins className="w-3.5 h-3.5" /> Økonomi</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a2540] leading-tight tracking-tight">Det betaler sig selv over tid</h2>
            </div>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-6">
                {sol.sell.savings.map((b) => (
                  <div key={b.title} className="flex gap-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-white ring-1 ring-emerald-100 p-7 transition-shadow hover:shadow-md">
                    <span className="w-11 h-11 shrink-0 rounded-2xl bg-white text-[#2e9a3d] ring-1 ring-emerald-100 flex items-center justify-center">
                      <Coins className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-extrabold text-[#0a2540] mb-1.5">{b.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── HVERDAGSFORDELE (kun uden sælgende lag) ──────────── */}
      {!sol.sell && (
        <section className="py-16 bg-blue-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <span className="section-badge"><Sparkles className="w-3.5 h-3.5" /> I hverdagen</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">Sådan hjælper det dig i hverdagen</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {sol.everyday.map((b) => (
                <div key={b.title} className="flex gap-4 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-[#3aad4a] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5">{b.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── NEMT & TRYGT (sælgende) ──────────────────────────── */}
      {sol.sell && (
        <section className="py-16 bg-gradient-to-b from-white to-[#f5faff]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="rounded-[2rem] bg-white ring-1 ring-gray-100 shadow-[0_24px_70px_-30px_rgba(10,37,64,0.25)] p-8 md:p-12">
                <div className="flex items-center gap-2.5 mb-7">
                  <span className="w-10 h-10 rounded-2xl bg-[#3aad4a]/10 text-[#2e9a3d] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#0a2540]">Nemt at få – og nemt at leve med</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {sol.sell.reassure.map((r) => (
                    <div key={r} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0 mt-0.5" />
                      <p className="text-[15px] text-gray-700 leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>
                {products[0] && (
                  <div className="mt-9">
                    <Link href={`/shop/${products[0].id}`} className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5">
                      Se blødgøringsanlægget <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── PRODUKTER ────────────────────────────────────────── */}
      {products.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="max-w-xl">
                <span className="section-badge">Produkter</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">Produkter til {sol.label.toLowerCase()}</h2>
              </div>
              <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
                Se alle produkter <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.id}`}
                  className="group bg-white rounded-2xl border-2 border-[#0044c4]/15 hover:border-[#0044c4]/50 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img src={p.imgSrc} alt={p.name} className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {p.badge && (
                      <span className="inline-block w-fit text-[10px] font-semibold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 mb-2">{p.badge}</span>
                    )}
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{p.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1">{p.tagline}</p>
                    <p className="mt-3 font-extrabold text-gray-900 text-sm">{price(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0c3a73] to-[#0044c4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">I tvivl om, hvad der passer til dit hjem?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Få gratis, uforpligtende rådgivning, så finder vi den rette løsning til netop dit vand og dit behov.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors">
              Få gratis rådgivning <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
              Se alle produkter
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
