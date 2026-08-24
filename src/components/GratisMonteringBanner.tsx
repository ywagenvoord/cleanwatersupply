import Link from 'next/link'
import { Wrench, Sparkles, ArrowRight, MapPin } from 'lucide-react'
import { isGratisMonteringActive, GRATIS_MONTERING } from '@/lib/campaign'
import { INSTALLATION_PRICE } from '@/lib/products'
import CampaignCountdown from '@/components/CampaignCountdown'

type Props = {
  /** 'full' = stor sektion (forside/anlæg). 'compact' = slankt kort (produktsider). */
  variant?: 'full' | 'compact'
  className?: string
  showCtas?: boolean
}

/**
 * Flot kampagne-banner for "Gratis montering".
 * Viser intet, når kampagnen ikke er aktiv (dato-styret i src/lib/campaign.ts).
 */
export default function GratisMonteringBanner({ variant = 'full', className = '', showCtas = true }: Props) {
  if (!isGratisMonteringActive()) return null

  const pris = INSTALLATION_PRICE.toLocaleString('da-DK')

  if (variant === 'compact') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#0f766e] text-white p-5 ${className}`}>
        <div className="absolute -right-6 -top-8 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute right-10 bottom-[-30px] w-20 h-20 rounded-full bg-white/5" />
        <div className="relative flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/70">Kampagne · spar {pris} kr.</p>
            <p className="text-xl font-extrabold leading-tight">Gratis montering</p>
            <p className="text-sm text-white/85 mt-1">
              Vi monterer dit blødgøringsanlæg gratis – til og med {GRATIS_MONTERING.endLabel}.
            </p>
            <p className="text-[11px] text-white/60 mt-1.5 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Kørsel tillægges fortsat uden for blå zone.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#0e4f5c] to-[#0f766e] text-white shadow-xl">
        {/* dekorative vand-cirkler */}
        <div className="absolute -right-16 -top-20 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute right-24 bottom-[-60px] w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute left-[-40px] bottom-[-50px] w-48 h-48 rounded-full bg-[#3aad4a]/20" />

        <div className="relative grid md:grid-cols-[1.4fr,1fr] gap-8 items-center p-8 md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#3aad4a] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Tidsbegrænset tilbud
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.05] mb-4">
              Gratis montering<br />
              <span className="text-white/85 text-2xl md:text-3xl font-bold">af dit blødgøringsanlæg</span>
            </h2>
            <p className="text-lg text-white/90 max-w-xl">
              Køb et blødgøringsanlæg nu, og vi monterer det <strong className="text-white">helt gratis</strong> – du sparer{' '}
              <span className="whitespace-nowrap font-bold">{pris} kr.</span>
            </p>
            <p className="text-sm text-white/70 mt-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              Tilbuddet gælder til og med {GRATIS_MONTERING.endLabel}. Kørsel tillægges fortsat uden for blå zone.
            </p>

            <CampaignCountdown className="mt-6" />

            {showCtas && (
              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  href="/shop/blosgoringsanlaeg-100m"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0a2540] hover:bg-white/90 py-3 px-6 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Se blødgøringsanlæg <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/montering"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 py-3 px-6 rounded-xl text-sm font-bold transition-all"
                >
                  Sådan foregår monteringen
                </Link>
              </div>
            )}
          </div>

          {/* pris-visual */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-52 h-52 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center text-center">
              <Wrench className="w-8 h-8 text-white/80 mb-1" />
              <span className="text-white/60 text-sm line-through">{pris} kr.</span>
              <span className="text-5xl font-extrabold leading-none mt-1">0 kr.</span>
              <span className="text-white/80 text-sm font-semibold mt-1">montering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
