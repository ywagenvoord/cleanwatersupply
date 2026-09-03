import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Phone, Mail, Wind } from 'lucide-react'
import { sektorer, getSektorById } from '@/lib/sektorer'
import { notFound } from 'next/navigation'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

import { SITE_URL } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return sektorer.map((s) => ({ sektor: s.id }))
}

export async function generateMetadata({ params }: { params: { sektor: string } }): Promise<Metadata> {
  const sektor = getSektorById(params.sektor)
  if (!sektor) return { title: 'Område ikke fundet', robots: { index: false } }

  const url = `${SITE_URL}/omraader/${sektor.id}`

  function truncate(text: string, max: number): string {
    if (text.length <= max) return text
    const sliced = text.substring(0, max)
    const lastSpace = sliced.lastIndexOf(' ')
    return (lastSpace > max * 0.7 ? sliced.substring(0, lastSpace) : sliced).replace(/[,.;:\s]+$/, '') + '…'
  }

  return {
    title: `Vandhygiejne for ${sektor.title.toLowerCase()}`,
    description: truncate(sektor.problemBody, 155),
    keywords: [sektor.title, 'Legionella', 'vandhygiejne', 'vandfilter', sektor.title.toLowerCase()],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${sektor.title} | Clean Water Supply`,
      description: sektor.tagline,
      images: sektor.heroImage ? [{ url: sektor.heroImage, alt: sektor.title }] : undefined,
      locale: 'da_DK',
      siteName: 'Clean Water Supply',
    },
  }
}

const staff = {
  kenneth: {
    name: 'Kenneth',
    role: 'Stifter & indehaver',
    phone: '+45 51 21 58 00',
    email: 'ksj@cleanwatersupply.dk',
    photo: '/images/team-kenneth-sq.jpg',
  },
  kristoffer: {
    name: 'Kristoffer',
    role: 'Tekniker & Rejsemontør',
    phone: '+45 22 32 01 56',
    email: 'kristoffer@cleanwatersupply.dk',
    photo: '/images/team-kristoffer-sq.jpg',
  },
}

// Konkrete eksempler (udfordring → løsning) pr. område – typiske situationer
const HELP_EXAMPLES: Record<string, { problem: string; solution: string }[]> = {
  hoteller: [
    { problem: 'Legionella påvist i brusere eller vandprøver', solution: 'Vi monterer medicinsk certificerede point-of-use-filtre på brusere og haner, så gæsterne er beskyttet med det samme – uden at lukke værelser.' },
    { problem: 'Værelser og fløje står tomme i perioder', solution: 'Stillestående vand øger bakterievæksten. Vi sikrer filtrering ved tappestederne og rådgiver om skylning ved genåbning.' },
    { problem: 'Kalk ødelægger armaturer, brusere og hvidevarer', solution: 'Et blødgøringsanlæg fjerner kalken, forlænger levetiden og reducerer rengøring og driftsomkostninger.' },
    { problem: 'Krav om dokumentation ved tilsyn', solution: 'Vores løsninger giver dokumenterbar vandhygiejne, som I kan vise til myndigheder og gæster.' },
  ],
  svoemmehaller: [
    { problem: 'Bakterier i brusere og skyllerum', solution: 'Sterile filtre ved brusere og haner stopper Legionella og Pseudomonas direkte ved udløbet.' },
    { problem: 'Biofilm i rør og installationer', solution: 'ECA-vand nedbryder biofilm og bakterier i vandsystemet – uden skrappe kemikalier.' },
    { problem: 'Varme, fugtige miljøer med høj Legionella-risiko', solution: 'Point-of-use-filtre kombineret med ECA-vand giver effektiv beskyttelse i hele anlægget.' },
    { problem: 'Kalk på fliser og armaturer', solution: 'Blødgøring reducerer kalk, rengøringstid og kemikalieforbrug.' },
  ],
  hospitaler: [
    { problem: 'Immunsvækkede patienter skal beskyttes mod vandbårne bakterier', solution: 'Medicinsk certificerede point-of-use-filtre på haner og brusere giver op til 7 log beskyttelse dér, hvor patienterne er.' },
    { problem: 'Bakterier i håndvaske trods gentagen rengøring', solution: 'Sterile filtre stopper bakterierne ved udløbet, hvor rengøring ikke rækker.' },
    { problem: 'Sjældent brugte tappesteder', solution: 'Vi kombinerer filtre med en skylleplan, så risikoen holdes nede.' },
    { problem: 'Dokumentationskrav ved audit og tilsyn', solution: 'Dokumenterbar filtrering og vandhygiejne, klar til myndighederne.' },
  ],
  campingpladser: [
    { problem: 'Anlæg står ubenyttet vinteren over', solution: 'Ved sæsonstart sikrer vi filtre på brusere og haner, så det stillestående vand ikke bliver en smittekilde.' },
    { problem: 'Legionella-risiko i sæsonanlæg', solution: 'Point-of-use-filtre beskytter gæsterne fra første dag.' },
    { problem: 'Gæster er utrygge ved vandkvaliteten', solution: 'Synlig, dokumenteret vandhygiejne skaber tryghed og styrker jeres omdømme.' },
    { problem: 'Kalk i servicebygninger og brusere', solution: 'Blødgøring beskytter installationerne og reducerer vedligehold.' },
  ],
  foedevare: [
    { problem: 'Krav om effektiv, men kemikaliefri desinfektion', solution: 'ECA-vand (hypoklorsyre) desinficerer overflader og udstyr effektivt – produceret på stedet af salt, vand og strøm.' },
    { problem: 'Biofilm i procesvand og installationer', solution: 'ECA-vand nedbryder biofilmen, som bakterier gemmer sig i.' },
    { problem: 'Bakterier i produktionsvandet', solution: 'Filtrering og desinfektion sikrer mikrobiologisk rent vand i produktionen.' },
    { problem: 'Arbejdsmiljø- og sikkerhedshensyn', solution: 'En skånsom løsning uden skrappe kemikalier – bedre for medarbejderne.' },
  ],
  landbruget: [
    { problem: 'Yverbetændelse (mastitis) i besætningen', solution: 'Elektrolyseret vand kan erstatte jodbaseret pattedypning – lige så effektivt, men klorfrit og for få cent pr. ko om året.' },
    { problem: 'Biofilm og bakterier i vandlinjerne', solution: 'ECA-vand holder vandsystemet rent, så dyrene får rent vand med større drikkelyst og foderoptag.' },
    { problem: 'Luftbårne bakterier i stalden', solution: 'Elektrolyseret vand kan forstøves og desinficere luften i hele stalden – lavere smittetryk for både dyr og medarbejdere.' },
    { problem: 'Kalk og aflejringer i vandsystemet', solution: 'Blødgøring reducerer kalk og aflejringer og beskytter installationerne.' },
  ],
  'det-private-hjem': [
    { problem: 'Utryghed ved bakterier i brusevandet', solution: 'Et brusefilter renser vandet for klor, rust og urenheder – mildere mod hud, hår og luftveje.' },
    { problem: 'Sårbare i hjemmet (småbørn, ældre, nedsat immunforsvar)', solution: 'Point-of-use-filtre på hane og bruser giver ekstra tryghed dér, hvor I bruger vandet.' },
    { problem: 'Hårdt vand med kalk overalt', solution: 'Et kalkanlæg giver blødt vand i hele huset – mindre rengøring, blødere hud og længere levetid på hvidevarer.' },
    { problem: 'Sommerhus eller gæsteværelse med stillestående vand', solution: 'Filtre sikrer rent vand, også når vandet har stået stille i en periode.' },
  ],
}

export default function SektorPage({ params }: { params: { sektor: string } }) {
  const sektor = getSektorById(params.sektor)
  if (!sektor) notFound()

  const contact = staff[sektor.contactPerson]
  const contacts =
    sektor.contactPerson === 'kenneth' || sektor.id === 'hospitaler'
      ? [contact]
      : [contact, staff.kenneth]

  return (
    <main>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem',     url: SITE_URL },
          { name: 'Områder',  url: `${SITE_URL}/omraader` },
          { name: sektor.title, url: `${SITE_URL}/omraader/${sektor.id}` },
        ]}
      />
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="absolute inset-0">
          <img
            src={sektor.heroImage}
            alt=""
            width={1920}
            height={800}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-[#0a2540]/60" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            {sektor.title.toUpperCase()}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {sektor.intro}
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {sektor.tagline}
          </p>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-7">
            {sektor.values.map((val, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                <div className="w-10 h-10 rounded-full bg-[#3aad4a]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#3aad4a]" />
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-3">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO (valgfri) ──────────────────────────────────── */}
      {sektor.video && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {sektor.videoHeading && (
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mb-3 text-center">{sektor.videoHeading}</h2>
            )}
            {sektor.videoBody && (
              <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-8">{sektor.videoBody}</p>
            )}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-black">
              <video
                src={sektor.video}
                poster={sektor.videoPoster}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* ─── RENT VAND I STALDEN – kun landbrug ─────────────────── */}
      {sektor.id === 'landbruget' && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Rent vand betaler sig – i hele stalden</h2>
              <p className="text-gray-600">Bakterier og biofilm i vandsystemet koster på både dyresundhed og bundlinje. Bakteriefrit vand giver sundere dyr, bedre produktion og lavere medicinforbrug.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#0a2540] mb-3">Malkekvæg</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Bakterier og biofilm i vandsystemet svækker køernes sundhed og øger smittetrykket. Rent, bakteriefrit vand – og elektrolyseret vand til pattedypning i stedet for jod – giver:
                </p>
                <ul className="space-y-2.5">
                  {['Større drikkelyst og bedre foderoptag', 'Lavere smittetryk og mindre mastitis', 'Lavere medicinforbrug', 'Bedre dyrevelfærd og økonomi'].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" /> {f}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#0a2540] mb-3">Fjerkræ &amp; kyllinger</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  I fjerkræproduktion samler der sig hurtigt biofilm og bakterier som Salmonella, Campylobacter og E. coli i vandlinjerne. Det går ud over kyllingernes trivsel, tilvækst og fødevaresikkerheden. Ren, desinficeret vand:
                </p>
                <ul className="space-y-2.5">
                  {['Holder vandlinjerne fri for biofilm', 'Sænker smittetrykket i flokken', 'Styrker trivsel, tilvækst og foderudnyttelse', 'Understøtter fødevaresikkerheden'].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" /> {f}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Luftdesinfektion – fremhævet */}
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#0a2540] to-blue-800 p-8 sm:p-10 text-white">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                <Wind className="w-3.5 h-3.5 text-[#3aad4a]" /> Desinficér luften
              </span>
              <h3 className="text-2xl font-extrabold mb-3">Dræb bakterierne i hele kyllingefarmen</h3>
              <p className="text-blue-100/85 leading-relaxed max-w-3xl">
                Elektrolyseret vand kan forstøves som en fin tåge og desinficere selve luften. Dermed bekæmpes bakterier ikke kun i vandet, men i hele kyllingefarmen – på overflader, i luften og i miljøet omkring dyrene. Det sænker det samlede smittetryk markant og giver et sundere staldklima for både dyr og medarbejdere.
              </p>
            </div>

            {/* Video + anlægsbillede */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[2/3]">
                <video
                  src="/videos/landbrug-luft.mp4"
                  poster="/images/landbrug-luft-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[2/3]">
                <img src="/images/sicursan-anlaeg.jpg" alt="Kirkmayer HOCl-anlæg (Sicursan)" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── PROBLEM + BENEFITS ───────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-6">
                {sektor.problemHeading}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">{sektor.problemBody}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a2540] mb-5">Fordele for {sektor.title.toLowerCase()}</h3>
              <ul className="space-y-4">
                {sektor.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SÅDAN HJÆLPER VI (eksempler) ─────────────────────── */}
      {HELP_EXAMPLES[sektor.id] && (
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Sådan hjælper vi {sektor.title.toLowerCase()}</h2>
              <p className="text-gray-600">Konkrete eksempler på udfordringer, vi løser – og hvordan.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {HELP_EXAMPLES[sektor.id].map((ex, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">Udfordring</p>
                  <p className="text-sm font-bold text-[#0a2540] mb-4">{ex.problem}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#3aad4a] mb-1">Sådan løser vi det</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{ex.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CONTACT PERSON ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-4">
                Kontakt os i dag
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                Vi er klar til at hjælpe dig med den rette løsning til {sektor.title.toLowerCase()}.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                Kontakt os <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              {contacts.map((c) => (
                <div key={c.email} className="bg-gray-50 rounded-3xl border border-gray-100 p-8 flex gap-6 items-center">
                  <img
                    src={c.photo}
                    alt={`${c.name}, ${c.role} hos Clean Water Supply`}
                    width={112}
                    height={112}
                    loading="lazy"
                    decoding="async"
                    className="w-28 h-28 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <p className="font-extrabold text-[#0a2540] text-2xl">{c.name}</p>
                    <p className="text-[#3aad4a] text-sm font-semibold mb-4">{c.role}</p>
                    <a
                      href={`tel:${c.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#0a2540] text-sm mb-2 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#3aad4a]" />
                      {c.phone}
                    </a>
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#0a2540] text-sm transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#3aad4a]" />
                      {c.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Klar til at sikre din vandkvalitet?
          </h2>
          <p className="text-blue-100/70 mb-8">
            Se alle vores løsninger eller kontakt os direkte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20"
            >
              Se produkter <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/omraader"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
            >
              Alle områder
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
