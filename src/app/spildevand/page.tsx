import type { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, Leaf, ShieldCheck, Zap, Recycle, FlaskConical, ArrowRight, CheckCircle2 } from 'lucide-react'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/spildevand`

export const metadata: Metadata = {
  title: 'Spildevand – klorfri desinfektion med Kirkmayer HOCl',
  description:
    'Vi løser spildevandsprojekter med Kirkmayer HOCl-anlæg, der producerer hypoklorsyre (HOCl) på stedet – effektiv, klorfri desinfektion uden skadelige kemikalier.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website', url: URL,
    title: 'Spildevand – desinfektion med HOCl | Clean Water Supply',
    description: 'Klorfri desinfektion af spildevand med Kirkmayer HOCl-anlæg.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

const BENEFITS = [
  { Icon: Leaf,        title: 'Klor- og kemikaliefri', body: 'Desinfektion uden skrappe kemikalier – skånsom i brug.' },
  { Icon: Zap,         title: 'Produceres på stedet',  body: 'HOCl dannes on-site af blot salt, vand og strøm – ingen transport eller lager af farlige stoffer.' },
  { Icon: ShieldCheck, title: 'Effektiv desinfektion', body: 'Hypoklorsyre bekæmper bakterier, vira, svampe og sporer hurtigt og effektivt.' },
  { Icon: FlaskConical,title: 'ECHA Article 95-godkendt', body: 'Kirkmayer HOCl-generatorerne er godkendte til professionel brug.' },
  { Icon: Recycle,     title: 'Klorfri metode',        body: 'Et alternativ til traditionelle klorbaserede metoder – uden lager af farlige klorprodukter.' },
  { Icon: Droplets,    title: 'Skalerbart',            body: 'Anlæg tilpasses projektets størrelse og behov – fra mindre anlæg til større installationer.' },
]

export default function SpildevandPage() {
  return (
    <main>
      <BreadcrumbJsonLd crumbs={[{ name: 'Forside', url: SITE_URL }, { name: 'Spildevand', url: URL }]} />

      {/* HERO */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <img src="/images/area-spildevand.jpg" alt="Spildevandsanlæg" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/95 via-[#0a2540]/55 to-[#0a2540]/15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 pt-32">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <Droplets className="w-3.5 h-3.5" /> Spildevand
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">Bæredygtig desinfektion af spildevand</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Vores spildevandsprojekter bygger på Kirkmayer HOCl-anlæg, der producerer hypoklorsyre (HOCl) på stedet – effektiv, klorfri desinfektion uden skadelige kemikalier.
          </p>
        </div>
      </section>

      {/* HVAD */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-[#0a2540] mb-5">HOCl – det effektive, skånsomme desinfektionsmiddel</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Hypoklorsyre (HOCl) er et kraftfuldt, men skånsomt desinfektionsmiddel, der hurtigt bekæmper bakterier, vira, svampe og sporer. Med et Kirkmayer-anlæg produceres HOCl direkte på stedet ud fra salt, vand og elektricitet – så I undgår transport og opbevaring af farlige kemikalier. Vi rådgiver og leverer anlæg, der er tilpasset netop jeres spildevandsprojekt.
          </p>
        </div>
      </section>

      {/* FORDELE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#0a2540] mb-12 text-center">Fordele ved HOCl-løsningen</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="w-11 h-11 rounded-xl bg-[#3aad4a]/10 text-[#3aad4a] flex items-center justify-center mb-4"><b.Icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-[#0a2540] mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJEKTER / KONTAKT */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 sm:p-10">
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-4">Har I et spildevandsprojekt?</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Hvert spildevandsprojekt er forskelligt. Vi ser på jeres behov og dimensionerer den rigtige HOCl-løsning sammen med jer. Kontakt os for en uforpligtende snak, så finder vi ud af, hvordan vi bedst kan hjælpe.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {['Rådgivning og dimensionering', 'Levering af Kirkmayer HOCl-anlæg', 'Fuldautomatiske anlæg', 'Løsninger tilpasset jeres behov'].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" /> {f}</li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all">
                Kontakt os om jeres projekt <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/eca-vand" className="inline-flex items-center justify-center gap-2 border-2 border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all">
                Læs mere om ECA-vand &amp; HOCl
              </Link>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 min-h-[320px] flex items-center justify-center">
            <img src="/images/sicursan-anlaeg.jpg" alt="Kirkmayer HOCl-anlæg (Sicursan)" className="w-full h-full object-contain p-8" />
          </div>
        </div>
      </section>
    </main>
  )
}
