import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HelpCircle } from 'lucide-react'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/faq`

// ─── Q&A – forbrugervenlige spørgsmål (læses af AI-søgemaskiner via FAQPage-markup) ───
const FAQS = [
  {
    q: 'Hvad er bakteriefrit vand?',
    a: 'Bakteriefrit vand er vand, der er renset for sygdomsfremkaldende bakterier som Legionella og Pseudomonas. Vores medicinsk certificerede filtre tilbageholder op til 99,9999 % af alle vandbårne bakterier direkte ved hanen eller bruseren.',
  },
  {
    q: 'Hvorfor skal jeg filtrere mit vand, når postevandet i Danmark er rent?',
    a: 'Det danske postevand er rent, når det forlader vandværket, men bakterier som Legionella kan opformere sig i husets egne rør og varmtvandsbeholder – især ved stillestående, lunkent vand. Et filter ved tappestedet giver et ekstra lag sikkerhed dér, hvor risikoen er størst.',
  },
  {
    q: 'Hvad er Legionella, og hvordan undgår jeg det?',
    a: 'Legionella er en bakterie, der trives i lunkent, stillestående vand (ca. 25–45 °C) og kan give en alvorlig lungebetændelse, hvis man indånder små vanddråber – fx under et brusebad. Du mindsker risikoen ved at holde varmt vand over 55 °C, skylle sjældent brugte haner og bruge et filter ved bruser og hane.',
  },
  {
    q: 'Kan man få Legionella af at drikke vand?',
    a: 'Nej – Legionella smitter normalt ikke ved at drikke vand, men ved at indånde små forstøvede vanddråber, for eksempel under et brusebad. Derfor er et brusefilter en effektiv beskyttelse mod Legionella.',
  },
  {
    q: 'Hvad er symptomerne på Legionella?',
    a: 'Legionella (legionærsygdom) giver typisk høj feber, kulderystelser, hoste, hovedpine og muskelsmerter, som regel 2–10 dage efter smitte. Har du mistanke, bør du kontakte din læge. Sygdommen smitter ikke fra person til person.',
  },
  {
    q: 'Kan man drikke vandet under et kogepåbud?',
    a: 'Under et kogepåbud skal alt vand til drikke, madlavning, tandbørstning og isterninger koges i mindst 2 minutter, før det bruges. Kogepåbud gives typisk, når vandværket har fundet bakterier som E. coli eller coliforme bakterier. Følg altid vandværkets anvisninger.',
  },
  {
    q: 'Hvorfor får man kogepåbud?',
    a: 'Et kogepåbud udstedes, når vandværket finder bakterier – oftest E. coli eller coliforme bakterier – der viser, at vandet kan være forurenet. Det sker fx efter ledningsbrud, reparationer eller forurening af en boring.',
  },
  {
    q: 'Hvad betyder coliforme bakterier i vandet?',
    a: 'Coliforme bakterier fungerer som en advarselslampe: de er ikke altid farlige i sig selv, men deres tilstedeværelse betyder, at vandet kan indeholde sygdomsfremkaldende mikroorganismer. Findes de, bør du følge vandværkets anvisninger og eventuelt koge vandet.',
  },
  {
    q: 'Dræber det bakterier at koge vandet?',
    a: 'Ja. Koger du vandet i mindst 2 minutter, dræbes bakterier, virus og parasitter. Det er dog en midlertidig løsning – et filter ved tappestedet giver løbende beskyttelse, uden at du skal koge vandet hver gang.',
  },
  {
    q: 'Hvordan fjerner jeg bakterier i mit vand?',
    a: 'Bakterier fjernes mest effektivt med et filter direkte ved hanen eller bruseren, der mekanisk tilbageholder dem gennem en fin 0,2 µm membran. Kogning dræber også bakterier midlertidigt, men et fast filter giver løbende beskyttelse uden besvær.',
  },
  {
    q: 'Hvordan får jeg testet mit vand?',
    a: 'Har du kommunalt vand, tester dit lokale vandværk løbende og offentliggør resultaterne. Har du egen brønd, kan du få vandet analyseret hos et akkrediteret laboratorium. Er du i tvivl om, hvad resultaterne betyder, er du velkommen til at kontakte os.',
  },
  {
    q: 'Hvorfor lugter eller smager vandet dårligt?',
    a: 'Dårlig smag eller lugt skyldes ofte klor, jern, svovlbrinte eller organiske stoffer – og kan i nogle tilfælde være tegn på bakterievækst. Et kulfilter fjerner klor og lugt, mens et bakteriefilter håndterer mikroorganismer.',
  },
  {
    q: 'Hvad gør et blødgøringsanlæg (kalkanlæg)?',
    a: 'Et kalkanlæg fjerner kalken fra vandet via ionbytning, så du får blødt vand i hele huset. Det giver mindre kalk på fliser og armaturer, blødere hud og hår, mindre sæbeforbrug og længere levetid på hvidevarer og rør.',
  },
  {
    q: 'Hvordan ved jeg, om jeg har hårdt vand?',
    a: 'Store dele af Danmark – især øst for Storebælt – har hårdt, kalkholdigt vand. Tegnene er hvide kalkrande på fliser, glas og armaturer, og at sæbe skummer dårligt. Du kan tjekke hårdheden på dit lokale vandværks hjemmeside.',
  },
  {
    q: 'Passer filtrene til brøndvand?',
    a: 'Ja. Vi har løsninger til både kommunalt vand og egen brønd. Har du egen brønd, anbefaler vi ofte et centralt filter i vandforsyningen kombineret med filtre ved tappestederne.',
  },
  {
    q: 'Hvor tit skal filteret skiftes?',
    a: 'Det afhænger af filtertypen. Hanefiltre skiftes typisk hver 62. eller 93. dag, og brusefiltre ca. hver 2.–3. måned. Det er nemt at holde styr på, og du skifter selv filteret på under et minut.',
  },
  {
    q: 'Er det svært at montere filtrene?',
    a: 'Nej. De fleste filtre klikkes eller skrues direkte på hanen eller bruseren uden værktøj og uden VVS. Et kalkanlæg kan du få monteret af os som tilkøb.',
  },
  {
    q: 'Fjerner et vandfilter kalk?',
    a: 'Almindelige bakterie- og kulfiltre reducerer klor, urenheder og bakterier, men fjerner ikke kalk. Vil du af med kalk i hele huset, er det et blødgøringsanlæg (kalkanlæg), du skal bruge.',
  },
  {
    q: 'Er filtrene medicinsk godkendte?',
    a: 'Vores Baclyser-filtre er medicinsk certificerede (CE-mærket medicinsk udstyr) og bruges blandt andet på hospitaler og plejehjem. Det er samme dokumenterede beskyttelse, du kan få i dit eget hjem.',
  },
  {
    q: 'Hvad koster en løsning?',
    a: 'Priserne afhænger af behovet – fra enkelte filtre i shoppen til komplette kalkanlæg med montering. Du er altid velkommen til at kontakte os for et uforpligtende tilbud.',
  },
  {
    q: 'Hvordan får jeg hjælp til at vælge den rigtige løsning?',
    a: 'Kontakt os, så hjælper vi dig med at finde den rette løsning til netop dit hjem og din vandtype. Vi rådgiver altid uforpligtende.',
  },
]

export const metadata: Metadata = {
  title: 'Ofte stillede spørgsmål (FAQ) om vandfiltre og blødt vand',
  description:
    'Svar på de mest almindelige spørgsmål om bakteriefrit vand, Legionella, vandfiltre, blødgøringsanlæg og hårdt vand – til det private hjem.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title: 'Ofte stillede spørgsmål | Clean Water Supply',
    description: 'Svar på spørgsmål om bakteriefrit vand, Legionella, vandfiltre og blødgøringsanlæg.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function FaqPage() {
  return (
    <main>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd crumbs={[{ name: 'Forside', url: SITE_URL }, { name: 'FAQ', url: URL }]} />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-24 bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            Ofte stillede spørgsmål
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Spørgsmål og svar om rent vand
          </h1>
          <p className="text-lg text-blue-100/80">
            De spørgsmål vi oftest får om bakteriefrit vand, Legionella, filtre og blødt vand i hjemmet.
          </p>
        </div>
      </section>

      {/* ─── Q&A ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-gray-200 bg-gray-50 open:bg-white open:shadow-sm transition-all">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-bold text-[#0a2540]">
                {f.q}
                <span className="shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-5 pb-5 -mt-1 text-gray-600 leading-relaxed text-[15px]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-3">Fik du ikke svar på dit spørgsmål?</h2>
          <p className="text-gray-600 mb-7">Vi sidder klar til at hjælpe dig med at finde den rigtige løsning.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-lg">
            Kontakt os
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
