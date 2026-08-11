import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, ShieldCheck, Droplets, Zap, FileCheck, Building2,
  Leaf, CheckCircle2, Phone,
} from 'lucide-react'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/anlaeg`

export const metadata: Metadata = {
  title: 'Legionella-anlæg & HOCl-anlæg til erhverv',
  description:
    'Central, kemikaliefri vandbehandling til erhverv: Legionella-anlæg og HOCl-anlæg (ECA-vand) fra Kirkmayer/SICURSAN. Producerer hypoklorsyre on-site af salt, vand og strøm – fjerner bakterier og biofilm i hele installationen.',
  keywords: [
    'Legionella-anlæg',
    'HOCl-anlæg',
    'HOCl generator',
    'ECA-vand anlæg',
    'hypoklorsyre anlæg',
    'SICURSAN',
    'Kirkmayer',
    'central vandbehandling erhverv',
    'Legionellabekæmpelse anlæg',
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title: 'Legionella-anlæg & HOCl-anlæg til erhverv | Clean Water Supply',
    description:
      'Kemikaliefri anlæg der holder hele vandforsyningen fri for bakterier og biofilm – produceret on-site af salt, vand og strøm.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

const legionellaPoints = [
  'Doserer HOCl (hypoklorsyre) direkte ind i vandforsyningen',
  'Fjerner bakterier, vira og svampe i hele systemet – ikke kun ved tappestedet',
  'Forhindrer biofilm i at sætte sig i rørnettet',
  'Automatisk styret og overvåget drift døgnet rundt',
  'Medicinsk certificerede komponenter · dokumenterbar effekt',
  'Skalerbart fra enkelte tappesteder til hele bygningen',
]

const hoclPoints = [
  'Producerer Anolyt (hypoklorsyre) – op til 80 % mere effektivt end traditionelt klor',
  'Producerer også Katolyt – et skånsomt rengøringsmiddel',
  'Fremstilles on-site af blot salt, vand og strøm',
  'Kemikaliefrit · nedbrydes hurtigt · ingen skadelige rester',
  'ECHA Article 95-godkendt aktivstof',
  'Kompakt Kirkmayer-anlæg med markedets mindste footprint',
]

const sectors = ['Hospitaler', 'Plejehjem', 'Hoteller', 'Svømmehaller', 'Fødevareindustri', 'Landbrug']

export default function AnlaegPage() {
  return (
    <main className="bg-white">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] via-[#0d3160] to-[#123a7a]">
        <div className="pointer-events-none absolute -top-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#284eff]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-24 w-96 h-96 rounded-full bg-[#3aad4a]/20 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            <Building2 className="w-3.5 h-3.5" /> Erhverv · anlæg
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.07] mb-6">
            Legionella-anlæg &amp; HOCl-anlæg til erhverv
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Central, kemikaliefri vandbehandling der holder hele installationen fri for bakterier og biofilm –
            produceret on-site af blot salt, vand og strøm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
            <Link href="#legionella-anlaeg" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors">
              Se anlæggene <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
              Få en teknisk gennemgang
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LEGIONELLA-ANLÆG ─────────────────────────────────── */}
      <section id="legionella-anlaeg" className="py-20 bg-white scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-3xl bg-gray-50 ring-1 ring-gray-200 p-6 md:p-8 flex items-center justify-center">
              <img src="/images/legionella-anlaeg-hero.jpg" alt="Legionella-anlæg – SICURSAN styreenhed fra Kirkmayer" className="max-h-[440px] w-full object-contain" />
            </div>
            <div>
              <span className="inline-block text-[11px] font-black text-[#284eff] uppercase tracking-widest mb-2">Legionella-anlæg</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] leading-tight mb-4">
                Beskyt hele vandforsyningen – ikke kun ét tappested
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Legionella-anlægget doserer hypoklorsyre (HOCl) direkte ind i vandforsyningen og fjerner bakterier,
                vira og svampe i hele systemet. Problemet fjernes ved kilden, så biofilm ikke får fat i rørnettet –
                kemikaliefrit og med stabil, dokumenterbar drift døgnet rundt.
              </p>
              <ul className="space-y-3 mb-8">
                {legionellaPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/legionella-anlaeg" className="inline-flex items-center justify-center gap-2 bg-[#0a2540] hover:bg-[#123a63] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                  Læs mere om Legionella-anlæg <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-[#0a2540] px-7 py-3.5 rounded-full font-semibold text-sm transition-colors">
                  Kontakt erhvervsteam
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOCl-ANLÆG (ECA) ─────────────────────────────────── */}
      <section id="hocl-anlaeg" className="py-20 bg-gray-50 border-y border-gray-100 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2 rounded-3xl bg-white ring-1 ring-gray-200 p-6 md:p-8 flex items-center justify-center">
              <img src="/images/sicursan-anlaeg.jpg" alt="HOCl-anlæg – Kirkmayer/SICURSAN ECA-generator med filtre og salttanke" className="max-h-[460px] w-full object-contain" />
            </div>
            <div className="lg:order-1">
              <span className="inline-block text-[11px] font-black text-[#2e9a3d] uppercase tracking-widest mb-2">HOCl-anlæg · ECA-vand</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] leading-tight mb-4">
                Dit eget desinfektionsmiddel – produceret on-site
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                HOCl-anlægget bruger elektrolyse til at lave to nyttige væsker af salt, vand og strøm: Anolyt
                (hypoklorsyre), der hurtigt dræber bakterier, vira, svampe og sporer, og Katolyt, et skånsomt
                rengøringsmiddel. Anolyt er dokumenteret op til 80 % mere effektivt end traditionelt klor – helt
                uden at håndtere eller opbevare farlig kemi.
              </p>
              <ul className="space-y-3 mb-8">
                {hoclPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/eca-vand" className="inline-flex items-center justify-center gap-2 bg-[#0a2540] hover:bg-[#123a63] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                  Læs mere om ECA-vand &amp; HOCl <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-white text-[#0a2540] px-7 py-3.5 rounded-full font-semibold text-sm transition-colors">
                  Kontakt erhvervsteam
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HVORFOR / FORDELE ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-3">Hvorfor et centralt anlæg?</h2>
            <p className="text-gray-600 leading-relaxed">
              Et anlæg behandler vandet i hele installationen på én gang – sikkert, kemikaliefrit og dokumenterbart.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Zap, title: 'Kemikaliefrit', body: 'Produceres on-site af salt, vand og strøm – ingen opbevaring af farlig kemi.' },
              { Icon: Droplets, title: 'Rene rør uden biofilm', body: 'Løbende behandling forhindrer bakterier og biofilm i hele rørnettet.' },
              { Icon: FileCheck, title: 'Dokumenterbar drift', body: 'Automatisk styring og målbar effekt gør det nemt at leve op til hygiejnekrav.' },
              { Icon: Leaf, title: 'Bæredygtigt', body: 'Energivenligt, nedbrydes hurtigt og efterlader ingen skadelige rester.' },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="bg-gray-50 rounded-2xl border border-gray-100 p-7">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#3aad4a]" />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Områder */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs text-gray-400 font-medium w-full text-center mb-1">Anvendes til:</span>
            {sectors.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3aad4a]" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0c3a73] to-[#0044c4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="w-10 h-10 text-green-400 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Skal vi dimensionere et anlæg til jeres installation?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Få en uforpligtende teknisk gennemgang og et tilbud tilpasset jeres branche, vandkvalitet og driftsbehov.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors">
            Kontakt vores erhvervsteam <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
