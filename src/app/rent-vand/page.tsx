import type { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, CheckCircle2, ArrowRight, ShieldCheck, GlassWater, FlaskConical } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import { getKande } from '@/lib/kander'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Rent vand – sådan får du rent drikkevand i hjem, sommerhus og båd | Clean Water Supply',
  description:
    'Rent vand betyder vand uden sundhedsskadelige bakterier, kemikalier og partikler. Se hvordan du får rent drikkevand hjemme, i sommerhus, campingvogn og båd – med filter, blødgøring og desinfektion.',
  alternates: { canonical: `${SITE_URL}/rent-vand` },
  keywords: [
    'rent vand', 'rent drikkevand', 'hvordan får man rent vand', 'rent vand derhjemme',
    'filtreret vand', 'fjerne kalk fra vand', 'fjerne klor fra vand', 'fjerne mikroplast fra vand',
    'rent vand sommerhus', 'rent vand campingvogn', 'rent vand båd', 'vandhygiejne',
  ],
}

// Korte, citérbare svar (GEO): hvert svar starter med en direkte konklusion.
const FAQS = [
  {
    q: 'Hvad er rent vand?',
    a: 'Rent vand er vand, der er frit for sundhedsskadelige bakterier, kemikalier og partikler og er sikkert at drikke. I praksis handler rent drikkevand om at fjerne eller reducere bakterier (som Legionella), klor, kalk, tungmetaller og mikroplast, så vandet både er sikkert og smager godt.',
  },
  {
    q: 'Er postevand i Danmark rent?',
    a: 'Ja, dansk postevand er blandt verdens reneste, når det forlader vandværket. Men på vejen gennem husets egne rør og varmtvandsbeholder kan vandet optage kalk, klorsmag, mikroplast og i nogle tilfælde bakterier – især hvor vandet står stille. Derfor giver et filter ved hanen, en filterkande eller et anlæg et ekstra lag sikkerhed dér, hvor vandet bruges.',
  },
  {
    q: 'Hvordan får man rent vand derhjemme?',
    a: 'Den nemmeste måde er en filterkande, der renser vandet, mens du hælder – uden installation. Vil du have rent vand direkte fra hanen eller bruseren, kan du montere et filter ved tappestedet. Har du problemer med kalk, løser et blødgøringsanlæg det for hele husstanden.',
  },
  {
    q: 'Hvordan fjerner man kalk fra vand?',
    a: 'Kalk fjernes bedst med et blødgøringsanlæg, der reducerer vandets hårdhed for hele husstanden og beskytter rør og hvidevarer. Til drikkevand kan et kalkreducerende filter (fx bi-flux® LimescaleSTOP) i en filterkande reducere kalk og give blødere, mildere vand.',
  },
  {
    q: 'Hvordan fjerner man klor og dårlig smag fra vand?',
    a: 'Klor og dårlig smag fjernes med et aktivt kul-filter. Både filterkander og filtre ved hanen med aktivt kul reducerer klor, lugt og bismag, så vandet smager rent og friskt – uden at fjerne de nyttige mineraler.',
  },
  {
    q: 'Hvordan fjerner man mikroplast fra drikkevand?',
    a: 'Mikroplast fjernes med et filter, der er designet til det – fx MikroPLASTIK-STOP™-filterkanden, der tilbageholder over 99,99 % af mikroplast ned til 1 mikrometer, mens de nyttige mineralsalte bevares.',
  },
  {
    q: 'Hvordan får man rent vand i sommerhus, campingvogn eller båd?',
    a: 'I vandtanke på campingvogn, autocamper og båd holdes vandet rent med et desinfektionsmiddel til drikkevand. Bright Water doseres 1,0 ml pr. liter vand (1 dl pr. 100 liter) og holder tankvandet frit for bakterier, så det er sikkert at drikke.',
  },
  {
    q: 'Hvordan sikrer man rent vand mod Legionella?',
    a: 'Legionella bekæmpes med et bakteriefilter ved tappestedet – typisk på bruser og hane. Medicinsk certificerede filtre tilbageholder op til 99,9999 % af vandbårne bakterier og bruges på hospitaler, hoteller og i private hjem, hvor sikkert vand er kritisk.',
  },
  {
    q: 'Er filtreret vand sundere end postevand?',
    a: 'Filtreret vand er ikke nødvendigvis sundere, men det er ofte renere og smager bedre, fordi klor, kalk, mikroplast og visse urenheder reduceres. For husstande med kalkholdigt vand, følsomme personer eller ældre rørinstallationer giver filtrering et ekstra lag tryghed.',
  },
]

// Laica-filterkander der løfter drikkeoplevelsen (sælgende produktsektion)
const FEATURED = [
  { slug: 'mikroplastik-stop', link: '/vandkander/mikroplastik-stop', sell: 'Stopper >99,99 % mikroplast – rent vand du kan smage forskel på.' },
  { slug: 'glassmart', link: '/vandkander/glassmart', sell: 'Elegant glaskaraffel med altid koldt, filtreret vand i køleskabet.' },
  { slug: 'carmen', link: '/shop/kande-carmen', sell: 'Den enkle hverdagskande – bedre smag, mindre klor og kalk.' },
].map(({ slug, link, sell }) => ({ k: getKande(slug), link, sell }))
  .filter((x): x is { k: NonNullable<ReturnType<typeof getKande>>; link: string; sell: string } => !!x.k)

const solutions = [
  { Icon: GlassWater, title: 'Filterkander', text: 'Rent vand med god smag – uden installation.', href: '/vandkander' },
  { Icon: ShieldCheck, title: 'Filter mod Legionella', text: 'Bakteriefrit vand ved hane og bruser.', href: '/legionella' },
  { Icon: FlaskConical, title: 'Bright Water til vandtanke', text: 'Rent drikkevand i campingvogn, autocamper og båd.', href: '/bright-water' },
]

export default function RentVandPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Rent vand', url: `${SITE_URL}/rent-vand` },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Droplets className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guide til rent drikkevand
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Rent vand – sådan får du det</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Rent vand er vand uden sundhedsskadelige bakterier, kemikalier og partikler. Her får du de
            enkle svar på, hvordan du sikrer rent drikkevand – hjemme, i sommerhuset, campingvognen og på båden.
          </p>
        </div>
      </section>

      {/* KORT FORTALT */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-5">Kort fortalt</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Dansk postevand er rent fra vandværket, men kan optage kalk, klor, mikroplast og bakterier i husets rør.',
              'En filterkande er den nemmeste vej til rent vand med god smag – helt uden installation.',
              'Kalk løses med et blødgøringsanlæg; klor og smag med aktivt kul; mikroplast med et dedikeret filter.',
              'I vandtanke (campingvogn, båd) holdes vandet rent med desinfektion doseret pr. liter.',
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-4">
                <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUKTER – filterkander der løfter drikkeoplevelsen */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-2">Rent vand med god smag – hver dag</h2>
          <p className="text-gray-600 mb-7 max-w-2xl leading-relaxed">
            Den nemmeste vej til rent drikkevand derhjemme er en Laica filterkande. Den renser vandet,
            mens du hælder – bedre smag, mindre klor, kalk og mikroplast, helt uden installation.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map(({ k, link, sell }) => (
              <div key={k.slug} className="group flex flex-col bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden">
                <Link href={link} className="block h-52 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
                  <img src={k.img} alt={k.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="flex flex-col flex-1 p-5">
                  <Link href={link}>
                    <h3 className="font-extrabold text-[#0a2540] text-[15px] leading-snug hover:text-[#284eff] transition-colors">{k.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed flex-1">{sell}</p>
                  <div className="mt-4 flex items-center justify-between">
                    {k.price != null && (
                      <span className="text-lg font-extrabold text-[#0a2540]">{k.price.toLocaleString('da-DK')} kr</span>
                    )}
                    <Link href={link} className="inline-flex items-center gap-1.5 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold text-sm px-4 py-2 transition-all hover:shadow-md">
                      Se produkt <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/vandkander" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3aad4a] hover:gap-2.5 transition-all">
              Se alle filterkander <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Spørgsmål og svar om rent vand</h2>
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

      {/* LØSNINGER */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Vores løsninger til rent vand</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {solutions.map(({ Icon, title, text, href }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-[#0a2540] mb-1">{title}</p>
                <p className="text-sm text-gray-600 mb-3">{text}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">
                  Se mere <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
