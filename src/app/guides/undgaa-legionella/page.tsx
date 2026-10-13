import type { Metadata } from 'next'
import Link from 'next/link'
import { Thermometer, ShowerHead, Droplets, Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import type { FAQ } from '@/lib/products'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: '4 gode råd til at undgå Legionella i hjemmet | Clean Water Supply',
  description:
    'Få 4 gode råd til at undgå Legionella i hjemmet – især efter ferie. Lær hvad Legionella er, hvordan det smitter, og hvordan du nemt forebygger bakterien.',
  alternates: { canonical: `${SITE_URL}/guides/undgaa-legionella` },
  keywords: [
    'undgå legionella', 'legionella i hjemmet', 'gode råd legionella', 'legionella bruser',
    'legionella efter ferie', 'legionærsyge', 'legionella bakterie', 'legionella temperatur',
  ],
}

const FAQS: FAQ[] = [
  {
    q: 'Hvad er Legionella?',
    a: 'Legionella er en bakterie, der trives i lunkent, stillestående vand – typisk mellem 20 og 50 °C. Den findes naturligt i jord og vand og kan følge med vandet ind i husets installationer som vandhaner og brusere.',
  },
  {
    q: 'Hvordan smitter Legionella?',
    a: 'Man bliver smittet ved at indånde små vanddråber (aerosoler), der indeholder bakterien – for eksempel under et brusebad. Man bliver ikke smittet ved at drikke vandet.',
  },
  {
    q: 'Hvad er legionærsyge?',
    a: 'Legionærsyge er en alvorlig form for lungebetændelse, der kan opstå efter man er blevet smittet med Legionella. Symptomerne minder om influenza med høj feber, hovedpine og muskelsmerter. Ældre og svækkede personer er mest udsatte.',
  },
  {
    q: 'Hvornår er risikoen størst?',
    a: 'Risikoen er størst, når vandet har stået stille og været lunkent i længere tid – for eksempel efter en ferie, i et sommerhus eller i rør og brusere, der sjældent bruges.',
  },
  {
    q: 'Hvor varmt skal det varme vand være?',
    a: 'Det varme brugsvand bør være over 52 °C ved hanen, så bakterien ikke kan formere sig. Mål det bedst ved køkkenhanen, der ofte sidder tæt på varmtvandsbeholderen.',
  },
  {
    q: 'Er risikoen stor i Danmark?',
    a: 'Nej. I langt de fleste tilfælde kan vi trygt bruge vores vandhaner og brusere, fordi der stilles høje krav til brugsvandsinstallationer i Danmark. Med nogle få gode vaner – og eventuelt et filter ved tappestedet – mindsker du risikoen yderligere.',
  },
]

const RAAD = [
  {
    Icon: Thermometer,
    title: 'Mål temperaturen på det varme vand',
    text: 'Brug et termometer og mål det varme vand – bedst ved køkkenhanen, som ofte sidder tæt på varmtvandsbeholderen. Vandet bør være over 52 °C, så Legionella ikke kan formere sig.',
  },
  {
    Icon: ShowerHead,
    title: 'Tøm bruser og slange efter bad',
    text: 'Der samler sig let vand i bruserhoved og slange. Lad bruseren hænge nedad eller læg slangen på gulvet efter brug, så vandet løber ud. Skal du i bad efter længere tids pause, så lad vandet løbe i 30 sekunder først.',
  },
  {
    Icon: Sparkles,
    title: 'Rengør bruser og slange jævnligt',
    text: 'Afkalk og gennemskyl bruserhoved og slange med jævne mellemrum. En ren bruser uden stillestående vand giver ikke bakterien gode vækstbetingelser.',
  },
  {
    Icon: Clock,
    title: 'Lad vandet løbe efter ferie',
    text: 'Har du været væk i mere end 3–4 dage, så lad alle haner og brusere løbe i cirka 5 minutter – både koldt og varmt vand. Så skyller du eventuelle bakterier ud, før vandet bruges igen.',
  },
]

const KORT = [
  'Legionella trives i lunkent, stillestående vand (20–50 °C) – fx efter ferie.',
  'Man smittes ved at indånde vanddråber, typisk under brusebad – ikke ved at drikke.',
  'Hold det varme vand over 52 °C, og lad vandet løbe efter længere tids pause.',
  'Rene brusere og et filter ved tappestedet giver ekstra tryghed.',
]

const PRODUKTER = [
  {
    name: 'Baclyser® neo TR',
    text: 'Filter til vandhanen med bruserudløb – stopper bakterier lige ved hanen.',
    img: '/images/baclyser-neo-tr.jpg',
    href: '/shop/baclyser-neo-tr-2m',
  },
  {
    name: 'Baclyser® neo TL',
    text: 'Filter til vandhanen med laminart udløb – til køkken og badeværelse.',
    img: '/images/baclyser-neo-tl.jpg',
    href: '/shop/baclyser-neo-tl-2m',
  },
  {
    name: 'cBlue SC3 brusefilter',
    text: 'Filter direkte på bruseren – trygt, bakteriefrit vand, mens du bader.',
    img: '/images/cblue-sc3-2.jpg',
    href: '/shop/cblue-sc3',
  },
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: '4 gode råd til at undgå Legionella', url: `${SITE_URL}/guides/undgaa-legionella` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="pointer-events-none absolute -top-16 -right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 w-96 h-96 bg-[#3aad4a]/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3aad4a]" />
                Guide til Legionella i hjemmet
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] leading-[1.1] mb-4">
                4 gode råd til at undgå Legionella
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-7">
                Legionella-bakterien trives i lunkent, stillestående vand – især hvis dine haner og brusere
                ikke har været brugt i et stykke tid. Her får du fire enkle råd til at forebygge Legionella
                i hjemmet, plus baggrundsviden om bakterien.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#raad" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5">
                  Se de 4 råd <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/legionella" className="inline-flex items-center gap-2 bg-white text-[#0a2540] ring-1 ring-blue-100 hover:ring-blue-200 px-7 py-3.5 rounded-full font-bold text-sm transition-all">
                  Se vores Legionella-filtre
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-[#284eff]/15" />
              <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 aspect-[4/3]">
                <img
                  src="/images/area-det-private-hjem.jpg"
                  alt="Rent, bakteriefrit vand i badet"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
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

      {/* 4 GODE RÅD */}
      <section id="raad" className="py-10 scroll-mt-24 bg-gradient-to-b from-white to-sky-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Forebyg nemt</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] mt-2">4 gode råd til at undgå Legionella</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {RAAD.map(({ Icon, title, text }, i) => (
              <div key={title} className="relative bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm hover:shadow-md transition-shadow p-6 pt-7">
                <div className="flex items-center gap-4 mb-3">
                  <span className="relative shrink-0">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#284eff] to-[#1b3fd0] text-white flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#3aad4a] text-white text-xs font-black flex items-center justify-center ring-2 ring-white">{i + 1}</span>
                  </span>
                  <h3 className="font-extrabold text-[#0a2540] leading-snug">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAGGRUND */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvad er Legionella?</h2>
            <p className="text-gray-600 leading-relaxed">
              Legionella er en bakterie, der trives i lunkent og stillestående vand mellem cirka 20 og 50 °C.
              Den findes naturligt i jord og vand og kan følge med vandet ind i husets installationer – fx
              vandhaner og brusere. Har du været på ferie og ikke brugt vandet i en periode, giver det
              gode betingelser for, at bakterien kan formere sig.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvordan smitter Legionella?</h2>
            <p className="text-gray-600 leading-relaxed">
              Man bliver smittet ved at indånde små vanddråber (aerosoler), der indeholder bakterien – for
              eksempel under et brusebad. Man bliver altså ikke smittet ved at drikke vandet. Derfor er det
              især brusere og haner, der forstøver vandet, man skal være opmærksom på.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Hvad er legionærsyge – og hvem rammer det?</h2>
            <p className="text-gray-600 leading-relaxed">
              Legionærsyge er en alvorlig form for lungebetændelse, der kan opstå efter smitte med Legionella.
              Symptomerne minder om influenza: høj feber, hovedpine og muskelsmerter. De mest udsatte er ældre
              og svækkede personer, blandt andet på plejehjem og sygehuse.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Risikoen er lille i Danmark</h2>
            <p className="text-gray-600 leading-relaxed">
              Selvom antallet af smittede er steget, kan vi i Danmark i langt de fleste tilfælde bruge vores
              vandhaner og brusere helt uden bekymring. Det skyldes, at der stilles høje krav til
              brugsvandsinstallationer. Med de fire gode råd ovenfor – og eventuelt et filter ved tappestedet –
              mindsker du risikoen yderligere.
            </p>
          </div>
        </div>
      </section>

      {/* VORES LEGIONELLA-PRODUKTER */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">Ekstra tryghed</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] mt-2">Vores Legionella-filtre til hjemmet</h2>
            <p className="text-gray-600 text-[15px] mt-2">
              Medicinsk certificerede filtre, der sættes direkte på vandhanen eller bruseren og stopper bakterier
              lige ved tappestedet – enkelt at montere, uden værktøj.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {PRODUKTER.map((p) => (
              <Link key={p.href} href={p.href} className="group bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col">
                <div className="h-44 bg-white flex items-center justify-center p-4">
                  <img src={p.img} alt={p.name} width={300} height={300} loading="lazy" className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 border-t border-gray-50 flex flex-col flex-1">
                  <h3 className="font-bold text-[#0a2540] mb-1">{p.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{p.text}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#3aad4a]">Se produktet <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/legionella" className="inline-flex items-center gap-2 bg-[#0a2540] hover:bg-[#0d3050] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors">
              Se alle Legionella-løsninger <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Spørgsmål og svar om Legionella</h2>
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
