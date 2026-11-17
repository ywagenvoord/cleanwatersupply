import type { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, CheckCircle2, ArrowRight, Sparkles, FlaskConical, ShieldCheck, Microscope, Phone, Filter, AlertTriangle, Search, ClipboardCheck } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import type { FAQ } from '@/lib/products'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

// NB: Sundheds- og effektpåstande på denne side bør kvalitetssikres af en fagansvarlig
// før publicering. Teksten er bevidst neutral og giver ingen generel garanti om sikkert drikkevand.

export const metadata: Metadata = {
  title: 'Bakterier i drikkevand: årsager og muligheder | Clean Water Supply',
  description:
    'Bakterier i drikkevand kan skyldes forhold i vandforsyning eller installationer. Få overblik over typiske fund, hvad en vandprøve kan betyde, og hvornår vandværk, kommune eller en fagperson bør kontaktes.',
  alternates: { canonical: `${SITE_URL}/guides/bakterier-i-drikkevand` },
  keywords: [
    'bakterier i vand', 'bakterier i drikkevand', 'coliforme bakterier', 'E. coli i vand',
    'vandprøve bakterier', 'forurenet drikkevand', 'kogeanbefaling', 'bakteriefilter',
  ],
}

const FAQS: FAQ[] = [
  {
    q: 'Hvilke bakterier kan findes i drikkevand?',
    a: 'De fund, man oftest hører om, er coliforme bakterier og E. coli, som bruges som indikatorer for, at vandet kan være påvirket. Der kan også forekomme fx Pseudomonas eller kimtal over det normale. Hvilken type der er tale om, har betydning for, hvad der bør gøres.',
  },
  {
    q: 'Hvordan testes drikkevand for bakterier?',
    a: 'Vand testes ved, at der udtages en vandprøve, som analyseres på et laboratorium. Har du egen brønd eller boring, kan du få taget en prøve via et godkendt laboratorium. Er du på alment vandværk, overvåger vandværket vandkvaliteten løbende.',
  },
  {
    q: 'Hvad gør man ved fund af bakterier i drikkevandet?',
    a: 'Ved mistanke eller påvist forurening bør du kontakte dit vandværk eller kommunen, som vejleder om eventuel kogeanbefaling og videre skridt. Det er vigtigt at kende typen og årsagen, før man vælger en løsning.',
  },
  {
    q: 'Kan et vandfilter hjælpe mod bakterier?',
    a: 'Det afhænger af filteret. Et almindeligt smags- eller kalkfilter er ikke beregnet til at fjerne bakterier. Mikrobiologisk validerede bakteriefiltre (fx membranfiltre ved tappestedet) er derimod dokumenteret til at tilbageholde bakterier. Et filter er et supplement og erstatter ikke rådgivning fra vandværk eller kommune ved en egentlig forurening.',
  },
]

const KORT = [
  'Bakterier i drikkevand kan skyldes forhold i vandforsyningen eller i husets installationer.',
  'Coliforme bakterier og E. coli bruges som indikatorer for, at vandet kan være påvirket.',
  'Ved mistanke eller fund: kontakt vandværk eller kommune, før du vælger en løsning.',
  'Skeln mellem smags-/kalkfiltre og mikrobiologisk validerede bakteriefiltre.',
]

const SOLUTIONS = [
  { Icon: ShieldCheck, title: 'Bakteriefiltre ved tappestedet', text: 'Membranfiltre, der er dokumenteret til at tilbageholde bakterier – lige ved hanen.', href: '/loesninger/filtre-paa-tappestedet' },
  { Icon: Droplets, title: 'Filterkander', text: 'Til smag og udvalgte stoffer i drikkevandet – uden installation.', href: '/vandkander' },
  { Icon: FlaskConical, title: 'Guide: vælg vandfilter', text: 'Find ud af, hvilken filtertype der passer til dit behov.', href: '/guides/vaelg-vandfilter' },
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Bakterier i drikkevand', url: `${SITE_URL}/guides/bakterier-i-drikkevand` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guide til bakterier i drikkevand
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Bakterier i drikkevand – hvad skal du være opmærksom på?</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Bakterier i drikkevand kan skyldes forskellige forhold i vandforsyning eller installationer. Hvis en
            vandprøve viser bakterier, er det vigtigt at kende typen og årsagen, før man vælger løsning. Her
            gennemgår vi typiske fund, hvad prøveresultater kan betyde, og hvornår vandværk, kommune eller en
            fagperson bør kontaktes.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {[
              { Icon: Microscope, t: 'Typiske fund' },
              { Icon: FlaskConical, t: 'Vandprøve' },
              { Icon: Phone, t: 'Hvem kontakter jeg?' },
              { Icon: Filter, t: 'Kan filter hjælpe?' },
            ].map(({ Icon, t }) => (
              <span key={t} className="inline-flex items-center gap-2 bg-white ring-1 ring-blue-100 shadow-sm text-[#0a2540] text-xs font-semibold px-3.5 py-2 rounded-full">
                <Icon className="w-3.5 h-3.5 text-[#284eff]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* VIGTIGT-CALLOUT */}
      <section className="pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 rounded-3xl bg-gradient-to-br from-amber-50 to-white ring-1 ring-amber-200/70 p-6 sm:p-7">
            <span className="w-11 h-11 shrink-0 rounded-2xl bg-white text-amber-500 ring-1 ring-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <p className="font-extrabold text-[#0a2540] mb-1">Akut mistanke om forurenet vand?</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Hvis du har mistanke om forurenet drikkevand, så kontakt dit vandværk eller kommune med det samme –
                de vejleder om en eventuel kogeanbefaling. Denne guide er til at forstå baggrunden, ikke en erstatning
                for deres rådgivning.
              </p>
            </div>
          </div>
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

      {/* BODY – farvede ikon-kort */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-white ring-1 ring-sky-100 p-7">
            <span className="w-12 h-12 rounded-2xl bg-white text-[#284eff] ring-1 ring-sky-100 flex items-center justify-center mb-5"><Microscope className="w-6 h-6" /></span>
            <h2 className="text-xl font-extrabold text-[#0a2540] mb-2.5">Hvilke bakterier kan findes i drikkevand?</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Oftest handler det om coliforme bakterier og E. coli, der bruges som indikatorer for, at vandet
              kan være påvirket af fx overfladevand eller forurening. Der kan også være et forhøjet kimtal eller
              andre bakterietyper. Typen af fund er afgørende for, hvad der bør gøres.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-white ring-1 ring-teal-100 p-7">
            <span className="w-12 h-12 rounded-2xl bg-white text-teal-600 ring-1 ring-teal-100 flex items-center justify-center mb-5"><FlaskConical className="w-6 h-6" /></span>
            <h2 className="text-xl font-extrabold text-[#0a2540] mb-2.5">Hvordan testes drikkevand?</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Vandet undersøges ved at udtage en vandprøve, som analyseres på et laboratorium. Er du tilsluttet
              et alment vandværk, overvåges vandkvaliteten løbende. Har du egen brønd eller boring, er det dig
              selv, der er ansvarlig for at få vandet kontrolleret via et godkendt laboratorium.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-white ring-1 ring-amber-100 p-7">
            <span className="w-12 h-12 rounded-2xl bg-white text-amber-500 ring-1 ring-amber-100 flex items-center justify-center mb-5"><Phone className="w-6 h-6" /></span>
            <h2 className="text-xl font-extrabold text-[#0a2540] mb-2.5">Hvad gør man ved fund af bakterier?</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Ved mistanke om eller påvist forurening bør du kontakte dit vandværk eller kommune, som kan vejlede
              om en eventuel kogeanbefaling og de næste skridt. Det er vigtigt at kende årsagen først – det kan
              skyldes alt fra et midlertidigt brud til forhold i egne installationer.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-white ring-1 ring-emerald-100 p-7">
            <span className="w-12 h-12 rounded-2xl bg-white text-[#2e9a3d] ring-1 ring-emerald-100 flex items-center justify-center mb-5"><Filter className="w-6 h-6" /></span>
            <h2 className="text-xl font-extrabold text-[#0a2540] mb-2.5">Kan et vandfilter hjælpe?</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              Det afhænger af filtertypen. Et almindeligt smags- eller kalkfilter er ikke beregnet til bakterier,
              mens mikrobiologisk validerede bakteriefiltre er dokumenteret til at tilbageholde bakterier ved
              tappestedet – et supplement, der ikke erstatter rådgivning ved en egentlig forurening. Se vores{' '}
              <Link href="/guides/vaelg-vandfilter" className="text-[#284eff] font-semibold hover:underline">guide til valg af vandfilter</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* TRIN – sådan griber du det an */}
      <section className="py-12 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-9">
            <span className="inline-flex items-center gap-2 bg-white text-[#3aad4a] ring-1 ring-[#3aad4a]/20 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Trin for trin
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] leading-tight">Sådan griber du det an</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { Icon: Search, n: '1', t: 'Afdæk mistanken', d: 'Læg mærke til fx ændret smag, lugt eller farve – men vær opmærksom på, at bakterier ikke altid kan ses eller smages.' },
              { Icon: ClipboardCheck, n: '2', t: 'Få taget en vandprøve', d: 'Kontakt vandværk/kommune, eller få en prøve analyseret på et godkendt laboratorium ved egen brønd/boring.' },
              { Icon: ShieldCheck, n: '3', t: 'Vælg den rette løsning', d: 'Følg vandværkets/kommunens råd – og overvej et dokumenteret bakteriefilter ved udsatte tappesteder.' },
            ].map(({ Icon, n, t, d }) => (
              <div key={n} className="relative rounded-3xl bg-white ring-1 ring-blue-100 shadow-sm p-7">
                <span className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-[#284eff] text-white text-sm font-extrabold flex items-center justify-center shadow-md">{n}</span>
                <span className="w-11 h-11 rounded-2xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></span>
                <p className="font-extrabold text-[#0a2540] mb-1.5">{t}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LØSNINGER */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Relevante løsninger</h2>
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
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Spørgsmål og svar om bakterier i drikkevand</h2>
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
