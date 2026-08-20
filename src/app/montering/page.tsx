import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, CheckCircle2, MapPin, Ruler, Droplets, ArrowRight } from 'lucide-react'
import MonteringForm from './MonteringForm'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import GratisMonteringBanner from '@/components/GratisMonteringBanner'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/montering`

export const metadata: Metadata = {
  title: 'Send billede af dit monteringssted – få en installationspris',
  description:
    'Send billeder af dit monteringssted, så vurderer vi pladsen og giver dig den rigtige pris på montering af dit kalkanlæg.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website', url: URL,
    title: 'Send billede af dit monteringssted | Clean Water Supply',
    description: 'Upload billeder af monteringsstedet og få en installationspris.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

const INCLUDED = [
  'Montering af slanger og tilslutning',
  'Montering af airgap til afløb',
  'Opstart og idriftsættelse af anlægget',
  'Gennemgang af anlægget med dig',
  'Bortskaffelse af emballage og affald',
  'Kørsel og arbejdstid',
]

const CHECK = [
  { Icon: MapPin,   title: 'Placering', body: 'Hvor anlægget skal stå – gerne nær hovedindføringen/vandmåleren.' },
  { Icon: Ruler,    title: 'Pladsen',   body: 'Hvor meget plads der er omkring anlægget og saltbeholderen.' },
  { Icon: Droplets, title: 'Afløb & tilslutning', body: 'Afstand til afløb og til vandtilslutningen.' },
]

export default function MonteringPage({ searchParams }: { searchParams: { sent?: string } }) {
  const sent = searchParams?.sent === '1'

  return (
    <main>
      <BreadcrumbJsonLd crumbs={[{ name: 'Forside', url: SITE_URL }, { name: 'Montering', url: URL }]} />

      {/* HERO */}
      <section className="relative min-h-[400px] flex items-end overflow-hidden">
        <img src="/images/solution-kalkanlaeg.jpg" alt="Monteret blødgøringsanlæg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/90 via-[#0a2540]/40 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 pt-32">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" /> Montering
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">Send et billede af dit monteringssted</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            For at give dig den rigtige pris på montering har vi brug for at se, hvor anlægget skal stå, og hvor meget plads der er. Upload et par billeder, så vender vi tilbage med en pris.
          </p>
        </div>
      </section>

      <GratisMonteringBanner className="pt-14" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {sent && (
          <div className="mb-10 rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
            <CheckCircle2 className="w-8 h-8 text-[#3aad4a] mx-auto mb-2" />
            <h2 className="text-lg font-extrabold text-[#0a2540]">Tak – vi har modtaget dine billeder!</h2>
            <p className="text-gray-600 text-sm mt-1">Vi kigger på det og vender tilbage med en pris på monteringen hurtigst muligt.</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Venstre: info */}
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-2">Det indgår typisk i en standardmontering</h2>
            <p className="text-sm text-gray-500 mb-5">Nedenfor ser du, hvad en standardmontering som regel omfatter. Den endelige pris og de nødvendige opgaver afhænger af forholdene på stedet – derfor beder vi om billeder.</p>
            <ul className="space-y-2.5 mb-6">
              {INCLUDED.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="mb-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              Bemærk: Særlige forhold (fx ekstra rørarbejde, lang afstand til afløb eller vanskelig adgang) kan påvirke pris og omfang. Vi giver altid en konkret pris ud fra dine billeder, før vi går i gang.
            </div>

            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Hvad vi kigger efter på billederne</h3>
            <div className="space-y-3">
              {CHECK.map((c) => (
                <div key={c.title} className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#3aad4a] flex items-center justify-center shrink-0 shadow-sm"><c.Icon className="w-5 h-5" /></div>
                  <div>
                    <p className="font-bold text-[#0a2540] text-sm">{c.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Er du i tvivl, eller vil du hellere ringe? <Link href="/contact" className="font-bold text-[#0a2540] hover:text-[#3aad4a]">Kontakt os her</Link>.
            </p>
          </div>

          {/* Højre: formular */}
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-4">Upload dine billeder</h2>
            <MonteringForm nextUrl={`${URL}?sent=1`} />
          </div>
        </div>
      </div>
    </main>
  )
}
