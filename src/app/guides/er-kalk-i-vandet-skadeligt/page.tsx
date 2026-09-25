import type { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, CheckCircle2, ArrowRight, Sparkles, Home, ShowerHead } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import type { FAQ } from '@/lib/products'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Er kalk i vandet skadeligt? Sådan hænger det sammen | Clean Water Supply',
  description:
    'Er kalk i vandet skadeligt? Nej – kalk er ikke farligt at drikke, men hårdt vand slider på hud, hår, rør og hvidevarer. Se hvad du kan gøre ved kalk i vandet.',
  alternates: { canonical: `${SITE_URL}/guides/er-kalk-i-vandet-skadeligt` },
  keywords: [
    'er kalk i vandet skadeligt', 'er kalk i vandet farligt', 'kalk i vandet',
    'hårdt vand', 'kalk på huden', 'kalk i håret', 'fjerne kalk fra vand', 'blødgøringsanlæg',
  ],
}

const FAQS: FAQ[] = [
  {
    q: 'Er kalk i vandet skadeligt at drikke?',
    a: 'Nej. Kalk i drikkevand er ikke skadeligt for helbredet – kalk er calcium og magnesium, som kroppen har brug for. Problemet ved kalk er praktisk: hårdt vand sætter aflejringer i rør og hvidevarer og kan tørre hud og hår ud.',
  },
  {
    q: 'Hvad er hårdt vand?',
    a: 'Hårdt vand er vand med et højt indhold af kalk (calcium og magnesium). Vandets hårdhed måles i °dH. I Danmark ligger den typisk mellem 8 og 30 °dH, hvor over 12 °dH regnes som hårdt vand. Jo højere tal, jo mere kalk.',
  },
  {
    q: 'Er kalk i vandet dårligt for huden og håret?',
    a: 'Hårdt vand kan gøre huden tør og stram og håret mat, fordi kalken efterlader et lag og gør det svært for sæbe at skylle helt ud. Et brusefilter reducerer kalk og klor i badevandet og opleves ofte som mildere for hud og hår.',
  },
  {
    q: 'Hvad gør kalk ved rør og hvidevarer?',
    a: 'Kalk aflejrer sig i vandrør, varmtvandsbeholder, opvaskemaskine, vaskemaskine og elkedel. Aflejringerne nedsætter effektiviteten, øger elforbruget og kan forkorte levetiden på hvidevarerne markant.',
  },
  {
    q: 'Hvordan fjerner man kalk i vandet?',
    a: 'Kalk fjernes bedst med et blødgøringsanlæg, der reducerer vandets hårdhed for hele husstanden og beskytter rør og hvidevarer. Vil du kun have blødere badevand, kan et brusefilter være nok. Til drikkevand kan et kalkreducerende filter i en filterkande give blødere, mildere vand.',
  },
  {
    q: 'Skal alle have et blødgøringsanlæg?',
    a: 'Ikke nødvendigvis. Bor du i et område med blødt vand (lav °dH), er behovet lille. Har du hårdt vand og oplever kalk på armaturer, skjolder på glas og kort levetid på hvidevarer, kan et blødgøringsanlæg hurtigt betale sig hjem i sparet vedligehold.',
  },
]

const KORT = [
  'Kalk i drikkevand er ikke skadeligt for helbredet – det er calcium og magnesium.',
  'Problemet ved hårdt vand er praktisk: aflejringer i rør, hvidevarer og på armaturer.',
  'Hårdt vand kan gøre hud tør og hår mat, fordi kalken lægger sig som et lag.',
  'Kalk løses bedst med et blødgøringsanlæg; blødere badevand fås med et brusefilter.',
]

const SOLUTIONS = [
  { Icon: Home, title: 'Blødgøringsanlæg', text: 'Mindre kalk i hele husstanden – beskytter rør og hvidevarer.', href: '/loesninger/kalkanlaeg' },
  { Icon: ShowerHead, title: 'Brusefilter', text: 'Blødere badevand med mindre kalk og klor – mildere for hud og hår.', href: '/loesninger/brusefilter' },
  { Icon: Droplets, title: 'Filterkander', text: 'Blødere, mildere drikkevand med god smag – uden installation.', href: '/vandkander' },
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Er kalk i vandet skadeligt?', url: `${SITE_URL}/guides/er-kalk-i-vandet-skadeligt` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guide til kalk i vandet
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Er kalk i vandet skadeligt?</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nej – kalk er ikke farligt at drikke. Men hårdt vand slider på hud, hår, rør og hvidevarer.
            Her får du de enkle svar på, hvad kalk betyder, og hvad du kan gøre ved det.
          </p>
        </div>
      </section>

      {/* KORT FORTALT */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-5">Kort fortalt</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {KORT.map((t) => (
              <div key={t} className="flex items-start gap-3 bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-4">
                <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Er kalk farligt at drikke?</h2>
            <p className="text-gray-600 leading-relaxed">
              Kalk i vandet er ikke skadeligt for helbredet. Kalk består af calcium og magnesium –
              mineraler, kroppen har brug for. Så du kan trygt drikke vand med kalk i. Det, der generer,
              er de praktiske gener ved hårdt vand: hvide aflejringer, skjolder og slid på rør og maskiner.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvorfor er hårdt vand alligevel et problem?</h2>
            <p className="text-gray-600 leading-relaxed">
              Jo mere kalk vandet indeholder, jo mere aflejrer det sig, når vandet varmes op eller fordamper.
              Det ses som kalkrande på armaturer, skjolder på glas og et gråt lag i elkedlen. Inde i rør,
              varmtvandsbeholder og hvidevarer sætter kalken sig som et isolerende lag, der øger elforbruget
              og slider på maskinerne. Mange oplever også, at hårdt vand gør huden tør og håret mat.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvad kan du gøre ved kalk i vandet?</h2>
            <p className="text-gray-600 leading-relaxed">
              Vil du af med kalken i hele hjemmet, er et blødgøringsanlæg den mest effektive løsning – det
              reducerer vandets hårdhed, før vandet når dine rør. Er det mest badevandet, der generer hud og
              hår, kan et brusefilter være nok. Og til drikkevand giver en filterkande blødere, mildere vand
              med god smag – helt uden installation. Er du i tvivl om, hvor hårdt dit vand er, så start med at
              tjekke <Link href="/guides/vandets-haardhed" className="text-[#284eff] font-semibold hover:underline">dit vands hårdhed</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* LØSNINGER */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Sådan kommer du kalken til livs</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {SOLUTIONS.map(({ Icon, title, text, href }) => (
              <Link key={href} href={href} className="group bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-md transition-all p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-[#0a2540] mb-1">{title}</p>
                <p className="text-sm text-gray-600 mb-3">{text}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">Se mere <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Spørgsmål og svar om kalk i vandet</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-5">
                <h3 className="font-bold text-[#0a2540] mb-1.5">{f.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
