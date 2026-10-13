import type { Metadata } from 'next'
import Link from 'next/link'
import { Thermometer, ShowerHead, Droplets, Clock, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
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
    title: 'Råd 1: Mål temperaturen på det varme vand',
    text: 'Brug et termometer og mål det varme vand – bedst ved køkkenhanen, som ofte sidder tæt på varmtvandsbeholderen. Vandet bør være over 52 °C, så Legionella ikke kan formere sig.',
  },
  {
    Icon: ShowerHead,
    title: 'Råd 2: Tøm bruser og slange efter bad',
    text: 'Der samler sig let vand i bruserhoved og slange. Lad bruseren hænge nedad eller læg slangen på gulvet efter brug, så vandet løber ud. Skal du i bad efter længere tids pause, så lad vandet løbe i 30 sekunder først.',
  },
  {
    Icon: Sparkles,
    title: 'Råd 3: Rengør bruser og slange jævnligt',
    text: 'Afkalk og gennemskyl bruserhoved og slange med jævne mellemrum. En ren bruser uden stillestående vand giver ikke bakterien gode vækstbetingelser.',
  },
  {
    Icon: Clock,
    title: 'Råd 4: Lad vandet løbe efter ferie',
    text: 'Har du været væk i mere end 3–4 dage, så lad alle haner og brusere løbe i cirka 5 minutter – både koldt og varmt vand. På den måde skyller du eventuelle bakterier ud, før vandet bruges igen.',
  },
]

const KORT = [
  'Legionella trives i lunkent, stillestående vand (20–50 °C) – fx efter ferie.',
  'Man smittes ved at indånde vanddråber, typisk under brusebad – ikke ved at drikke.',
  'Hold det varme vand over 52 °C, og lad vandet løbe efter længere tids pause.',
  'Rene brusere og et filter ved tappestedet giver ekstra tryghed.',
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
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guide til Legionella i hjemmet
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">4 gode råd til at undgå Legionella</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Legionella-bakterien trives i lunkent, stillestående vand – især hvis dine haner og brusere
            ikke har været brugt i et stykke tid. Her får du fire enkle råd til at forebygge Legionella
            i hjemmet, plus baggrundsviden om hvad bakterien er, og hvordan den smitter.
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

      {/* 4 GODE RÅD */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">4 gode råd til at undgå Legionella</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {RAAD.map(({ Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-1.5">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAGGRUND */}
      <section className="py-10">
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

      {/* CWS-LØSNING */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a2540] via-[#0e2f52] to-[#123a63] text-white p-8 sm:p-10 text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest ring-1 ring-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8fd39a]" /> Ekstra tryghed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Filter direkte ved hanen og bruseren</h2>
            <p className="text-blue-100/85 max-w-xl mx-auto mb-7 leading-relaxed">
              Vil du være ekstra tryg – fx i et hjem med små børn, ældre eller ældre rørinstallationer? Vores
              medicinsk certificerede Legionella-filtre sættes direkte på vandhanen eller bruseren og stopper
              bakterier lige ved tappestedet. Enkelt at montere, uden værktøj.
            </p>
            <Link
              href="/legionella"
              className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
            >
              Se Legionella-filtrene <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10">
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
