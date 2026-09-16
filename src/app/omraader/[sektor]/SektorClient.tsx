'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, CheckCircle2, Phone, Mail, Wind } from 'lucide-react'
import type { Sektor } from '@/lib/sektorer'

const staff = {
  kenneth: {
    name: 'Kenneth',
    roleDa: 'Stifter & indehaver',
    roleEn: 'Founder & owner',
    phone: '+45 51 21 58 00',
    email: 'ksj@cleanwatersupply.dk',
    photo: '/images/team-kenneth-sq.jpg',
  },
  kristoffer: {
    name: 'Kristoffer',
    roleDa: 'Tekniker & Rejsemontør',
    roleEn: 'Technician & field installer',
    phone: '+45 22 32 01 56',
    email: 'kristoffer@cleanwatersupply.dk',
    photo: '/images/team-kristoffer-sq.jpg',
  },
}

type Example = { problem: string; solution: string; problemEn: string; solutionEn: string }

const HELP_EXAMPLES: Record<string, Example[]> = {
  hoteller: [
    { problem: 'Legionella påvist i brusere eller vandprøver', solution: 'Vi monterer medicinsk certificerede point-of-use-filtre på brusere og haner, så gæsterne er beskyttet med det samme – uden at lukke værelser.', problemEn: 'Legionella detected in showers or water samples', solutionEn: 'We fit medically certified point-of-use filters on showers and taps, so guests are protected immediately – without closing rooms.' },
    { problem: 'Værelser og fløje står tomme i perioder', solution: 'Stillestående vand øger bakterievæksten. Vi sikrer filtrering ved tappestederne og rådgiver om skylning ved genåbning.', problemEn: 'Rooms and wings stand empty at times', solutionEn: 'Stagnant water increases bacterial growth. We ensure filtration at the outlets and advise on flushing before reopening.' },
    { problem: 'Kalk ødelægger armaturer, brusere og hvidevarer', solution: 'Et blødgøringsanlæg fjerner kalken, forlænger levetiden og reducerer rengøring og driftsomkostninger.', problemEn: 'Limescale ruins fittings, showers and appliances', solutionEn: 'A water softener removes the limescale, extends lifespan and reduces cleaning and operating costs.' },
    { problem: 'Krav om dokumentation ved tilsyn', solution: 'Vores løsninger giver dokumenterbar vandhygiejne, som I kan vise til myndigheder og gæster.', problemEn: 'Documentation required at inspection', solutionEn: 'Our solutions provide documentable water hygiene that you can show to authorities and guests.' },
  ],
  svoemmehaller: [
    { problem: 'Bakterier i brusere og skyllerum', solution: 'Sterile filtre ved brusere og haner stopper Legionella og Pseudomonas direkte ved udløbet.', problemEn: 'Bacteria in showers and rinse rooms', solutionEn: 'Sterile filters at showers and taps stop Legionella and Pseudomonas directly at the outlet.' },
    { problem: 'Biofilm i rør og installationer', solution: 'ECA-vand nedbryder biofilm og bakterier i vandsystemet – uden skrappe kemikalier.', problemEn: 'Biofilm in pipes and installations', solutionEn: 'ECA water breaks down biofilm and bacteria in the water system – without harsh chemicals.' },
    { problem: 'Varme, fugtige miljøer med høj Legionella-risiko', solution: 'Point-of-use-filtre kombineret med ECA-vand giver effektiv beskyttelse i hele anlægget.', problemEn: 'Warm, humid environments with high Legionella risk', solutionEn: 'Point-of-use filters combined with ECA water provide effective protection throughout the facility.' },
    { problem: 'Kalk på fliser og armaturer', solution: 'Blødgøring reducerer kalk, rengøringstid og kemikalieforbrug.', problemEn: 'Limescale on tiles and fittings', solutionEn: 'Softening reduces limescale, cleaning time and chemical use.' },
  ],
  hospitaler: [
    { problem: 'Immunsvækkede patienter skal beskyttes mod vandbårne bakterier', solution: 'Medicinsk certificerede point-of-use-filtre på haner og brusere giver op til 7 log beskyttelse dér, hvor patienterne er.', problemEn: 'Immunocompromised patients must be protected from waterborne bacteria', solutionEn: 'Medically certified point-of-use filters on taps and showers provide up to 7 log protection right where the patients are.' },
    { problem: 'Bakterier i håndvaske trods gentagen rengøring', solution: 'Sterile filtre stopper bakterierne ved udløbet, hvor rengøring ikke rækker.', problemEn: 'Bacteria in sinks despite repeated cleaning', solutionEn: 'Sterile filters stop the bacteria at the outlet, where cleaning does not reach.' },
    { problem: 'Sjældent brugte tappesteder', solution: 'Vi kombinerer filtre med en skylleplan, så risikoen holdes nede.', problemEn: 'Rarely used outlets', solutionEn: 'We combine filters with a flushing plan to keep the risk down.' },
    { problem: 'Dokumentationskrav ved audit og tilsyn', solution: 'Dokumenterbar filtrering og vandhygiejne, klar til myndighederne.', problemEn: 'Documentation requirements at audit and inspection', solutionEn: 'Documentable filtration and water hygiene, ready for the authorities.' },
  ],
  campingpladser: [
    { problem: 'Anlæg står ubenyttet vinteren over', solution: 'Ved sæsonstart sikrer vi filtre på brusere og haner, så det stillestående vand ikke bliver en smittekilde.', problemEn: 'Facilities stand unused over winter', solutionEn: 'At the start of the season we fit filters on showers and taps, so the stagnant water does not become a source of infection.' },
    { problem: 'Legionella-risiko i sæsonanlæg', solution: 'Point-of-use-filtre beskytter gæsterne fra første dag.', problemEn: 'Legionella risk in seasonal facilities', solutionEn: 'Point-of-use filters protect guests from day one.' },
    { problem: 'Gæster er utrygge ved vandkvaliteten', solution: 'Synlig, dokumenteret vandhygiejne skaber tryghed og styrker jeres omdømme.', problemEn: 'Guests are uneasy about the water quality', solutionEn: 'Visible, documented water hygiene creates trust and strengthens your reputation.' },
    { problem: 'Kalk i servicebygninger og brusere', solution: 'Blødgøring beskytter installationerne og reducerer vedligehold.', problemEn: 'Limescale in service buildings and showers', solutionEn: 'Softening protects the installations and reduces maintenance.' },
  ],
  foedevare: [
    { problem: 'Krav om effektiv, men kemikaliefri desinfektion', solution: 'ECA-vand (hypoklorsyre) desinficerer overflader og udstyr effektivt – produceret på stedet af salt, vand og strøm.', problemEn: 'Need for effective yet chemical-free disinfection', solutionEn: 'ECA water (hypochlorous acid) disinfects surfaces and equipment effectively – produced on-site from salt, water and electricity.' },
    { problem: 'Biofilm i procesvand og installationer', solution: 'ECA-vand nedbryder biofilmen, som bakterier gemmer sig i.', problemEn: 'Biofilm in process water and installations', solutionEn: 'ECA water breaks down the biofilm in which bacteria hide.' },
    { problem: 'Bakterier i produktionsvandet', solution: 'Filtrering og desinfektion sikrer mikrobiologisk rent vand i produktionen.', problemEn: 'Bacteria in the production water', solutionEn: 'Filtration and disinfection ensure microbiologically clean water in production.' },
    { problem: 'Arbejdsmiljø- og sikkerhedshensyn', solution: 'En skånsom løsning uden skrappe kemikalier – bedre for medarbejderne.', problemEn: 'Working environment and safety concerns', solutionEn: 'A gentle solution without harsh chemicals – better for employees.' },
  ],
  landbruget: [
    { problem: 'Yverbetændelse (mastitis) i besætningen', solution: 'Elektrolyseret vand kan erstatte jodbaseret pattedypning – lige så effektivt, men klorfrit og for få cent pr. ko om året.', problemEn: 'Mastitis in the herd', solutionEn: 'Electrolysed water can replace iodine-based teat dipping – just as effective, but chlorine-free and for a few cents per cow per year.' },
    { problem: 'Biofilm og bakterier i vandlinjerne', solution: 'ECA-vand holder vandsystemet rent, så dyrene får rent vand med større drikkelyst og foderoptag.', problemEn: 'Biofilm and bacteria in the water lines', solutionEn: 'ECA water keeps the water system clean, so the animals get clean water with greater water and feed intake.' },
    { problem: 'Luftbårne bakterier i stalden', solution: 'Elektrolyseret vand kan forstøves og desinficere luften i hele stalden – lavere smittetryk for både dyr og medarbejdere.', problemEn: 'Airborne bacteria in the barn', solutionEn: 'Electrolysed water can be atomised and disinfect the air throughout the barn – lower infection pressure for both animals and staff.' },
    { problem: 'Kalk og aflejringer i vandsystemet', solution: 'Blødgøring reducerer kalk og aflejringer og beskytter installationerne.', problemEn: 'Limescale and deposits in the water system', solutionEn: 'Softening reduces limescale and deposits and protects the installations.' },
  ],
  'det-private-hjem': [
    { problem: 'Utryghed ved bakterier i brusevandet', solution: 'Et brusefilter renser vandet for klor, rust og urenheder – mildere mod hud, hår og luftveje.', problemEn: 'Worry about bacteria in the shower water', solutionEn: 'A shower filter cleans the water of chlorine, rust and impurities – gentler on skin, hair and airways.' },
    { problem: 'Sårbare i hjemmet (småbørn, ældre, nedsat immunforsvar)', solution: 'Point-of-use-filtre på hane og bruser giver ekstra tryghed dér, hvor I bruger vandet.', problemEn: 'Vulnerable people in the home (young children, elderly, weakened immune system)', solutionEn: 'Point-of-use filters on the tap and shower give extra peace of mind where you use the water.' },
    { problem: 'Hårdt vand med kalk overalt', solution: 'Et kalkanlæg giver blødt vand i hele huset – mindre rengøring, blødere hud og længere levetid på hvidevarer.', problemEn: 'Hard water with limescale everywhere', solutionEn: 'A softening system gives soft water throughout the house – less cleaning, softer skin and longer appliance life.' },
    { problem: 'Sommerhus eller gæsteværelse med stillestående vand', solution: 'Filtre sikrer rent vand, også når vandet har stået stille i en periode.', problemEn: 'Holiday home or guest room with stagnant water', solutionEn: 'Filters ensure clean water, even when the water has been standing for a while.' },
  ],
}

export default function SektorClient({ sektor }: { sektor: Sektor }) {
  const { language } = useLanguage()
  const da = language !== 'en'
  const c = da ? sektor : sektor.en

  const contact = staff[sektor.contactPerson]
  const contacts =
    sektor.contactPerson === 'kenneth' || sektor.id === 'hospitaler'
      ? [contact]
      : [contact, staff.kenneth]

  const titleLower = c.title.toLowerCase()
  const examples = HELP_EXAMPLES[sektor.id]

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="absolute inset-0">
          <img src={sektor.heroImage} alt="" width={1920} height={800} loading="eager" decoding="async" className="w-full h-full object-cover opacity-20" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-[#0a2540]/60" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            {c.title.toUpperCase()}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">{c.intro}</h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">{c.tagline}</p>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-7">
            {c.values.map((val, i) => (
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
            {c.videoHeading && (
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mb-3 text-center">{c.videoHeading}</h2>
            )}
            {c.videoBody && (
              <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-8">{c.videoBody}</p>
            )}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-black">
              <video src={sektor.video} poster={sektor.videoPoster} autoPlay muted loop playsInline controls className="w-full h-auto" />
            </div>
          </div>
        </section>
      )}

      {/* ─── RENT VAND I STALDEN – kun landbrug ─────────────────── */}
      {sektor.id === 'landbruget' && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">{da ? 'Rent vand betaler sig – i hele stalden' : 'Clean water pays off – throughout the barn'}</h2>
              <p className="text-gray-600">{da ? 'Bakterier og biofilm i vandsystemet koster på både dyresundhed og bundlinje. Bakteriefrit vand giver sundere dyr, bedre produktion og lavere medicinforbrug.' : 'Bacteria and biofilm in the water system cost both animal health and the bottom line. Bacteria-free water means healthier animals, better production and lower medicine use.'}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#0a2540] mb-3">{da ? 'Malkekvæg' : 'Dairy cattle'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {da ? 'Bakterier og biofilm i vandsystemet svækker køernes sundhed og øger smittetrykket. Rent, bakteriefrit vand – og elektrolyseret vand til pattedypning i stedet for jod – giver:' : 'Bacteria and biofilm in the water system weaken the cows’ health and increase infection pressure. Clean, bacteria-free water – and electrolysed water for teat dipping instead of iodine – provides:'}
                </p>
                <ul className="space-y-2.5">
                  {(da
                    ? ['Større drikkelyst og bedre foderoptag', 'Lavere smittetryk og mindre mastitis', 'Lavere medicinforbrug', 'Bedre dyrevelfærd og økonomi']
                    : ['Greater water and feed intake', 'Lower infection pressure and less mastitis', 'Lower medicine use', 'Better animal welfare and economy']
                  ).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" /> {f}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#0a2540] mb-3">{da ? 'Fjerkræ & kyllinger' : 'Poultry & chickens'}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {da ? 'I fjerkræproduktion samler der sig hurtigt biofilm og bakterier som Salmonella, Campylobacter og E. coli i vandlinjerne. Det går ud over kyllingernes trivsel, tilvækst og fødevaresikkerheden. Ren, desinficeret vand:' : 'In poultry production, biofilm and bacteria such as Salmonella, Campylobacter and E. coli quickly build up in the water lines. This harms the chickens’ welfare, growth and food safety. Clean, disinfected water:'}
                </p>
                <ul className="space-y-2.5">
                  {(da
                    ? ['Holder vandlinjerne fri for biofilm', 'Sænker smittetrykket i flokken', 'Styrker trivsel, tilvækst og foderudnyttelse', 'Understøtter fødevaresikkerheden']
                    : ['Keeps the water lines free of biofilm', 'Lowers infection pressure in the flock', 'Strengthens welfare, growth and feed conversion', 'Supports food safety']
                  ).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-[#3aad4a] mt-0.5 shrink-0" /> {f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#0a2540] to-blue-800 p-8 sm:p-10 text-white">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                <Wind className="w-3.5 h-3.5 text-[#3aad4a]" /> {da ? 'Desinficér luften' : 'Disinfect the air'}
              </span>
              <h3 className="text-2xl font-extrabold mb-3">{da ? 'Dræb bakterierne i hele kyllingefarmen' : 'Kill the bacteria throughout the poultry farm'}</h3>
              <p className="text-blue-100/85 leading-relaxed max-w-3xl">
                {da ? 'Elektrolyseret vand kan forstøves som en fin tåge og desinficere selve luften. Dermed bekæmpes bakterier ikke kun i vandet, men i hele kyllingefarmen – på overflader, i luften og i miljøet omkring dyrene. Det sænker det samlede smittetryk markant og giver et sundere staldklima for både dyr og medarbejdere.' : 'Electrolysed water can be atomised as a fine mist and disinfect the air itself. This fights bacteria not only in the water, but throughout the poultry farm – on surfaces, in the air and in the environment around the animals. It markedly lowers the overall infection pressure and creates a healthier barn climate for both animals and staff.'}
              </p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[2/3]">
                <video src="/videos/landbrug-luft.mp4" poster="/images/landbrug-luft-poster.jpg" autoPlay muted loop playsInline className="w-full h-full object-contain" />
              </div>
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-[2/3]">
                <img src="/images/sicursan-anlaeg.jpg" alt="Kirkmayer HOCl (Sicursan)" className="w-full h-full object-contain" />
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
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-6">{c.problemHeading}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{c.problemBody}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a2540] mb-5">{da ? `Fordele for ${titleLower}` : `Benefits for ${titleLower}`}</h3>
              <ul className="space-y-4">
                {c.benefits.map((benefit, i) => (
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
      {examples && (
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">{da ? `Sådan hjælper vi ${titleLower}` : `How we help ${titleLower}`}</h2>
              <p className="text-gray-600">{da ? 'Konkrete eksempler på udfordringer, vi løser – og hvordan.' : 'Concrete examples of challenges we solve – and how.'}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {examples.map((ex, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">{da ? 'Udfordring' : 'Challenge'}</p>
                  <p className="text-sm font-bold text-[#0a2540] mb-4">{da ? ex.problem : ex.problemEn}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#3aad4a] mb-1">{da ? 'Sådan løser vi det' : 'How we solve it'}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{da ? ex.solution : ex.solutionEn}</p>
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
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-4">{da ? 'Kontakt os i dag' : 'Contact us today'}</h2>
              <p className="text-gray-500 text-lg mb-8">
                {da ? `Vi er klar til at hjælpe dig med den rette løsning til ${titleLower}.` : `We are ready to help you with the right solution for ${titleLower}.`}
              </p>
              <Link href="/kontakt" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20">
                {da ? 'Kontakt os' : 'Contact us'} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-4">
              {contacts.map((cp) => (
                <div key={cp.email} className="bg-gray-50 rounded-3xl border border-gray-100 p-8 flex gap-6 items-center">
                  <img src={cp.photo} alt={`${cp.name}, ${da ? cp.roleDa : cp.roleEn} – Clean Water Supply`} width={112} height={112} loading="lazy" decoding="async" className="w-28 h-28 rounded-2xl object-cover shrink-0" />
                  <div>
                    <p className="font-extrabold text-[#0a2540] text-2xl">{cp.name}</p>
                    <p className="text-[#3aad4a] text-sm font-semibold mb-4">{da ? cp.roleDa : cp.roleEn}</p>
                    <a href={`tel:${cp.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-gray-600 hover:text-[#0a2540] text-sm mb-2 transition-colors">
                      <Phone className="w-4 h-4 text-[#3aad4a]" />{cp.phone}
                    </a>
                    <a href={`mailto:${cp.email}`} className="flex items-center gap-2 text-gray-600 hover:text-[#0a2540] text-sm transition-colors">
                      <Mail className="w-4 h-4 text-[#3aad4a]" />{cp.email}
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
          <h2 className="text-3xl font-extrabold text-white mb-4">{da ? 'Klar til at sikre din vandkvalitet?' : 'Ready to secure your water quality?'}</h2>
          <p className="text-blue-100/70 mb-8">{da ? 'Se alle vores løsninger eller kontakt os direkte.' : 'See all our solutions or contact us directly.'}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20">
              {da ? 'Se produkter' : 'See products'} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/omraader" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-full font-bold text-base transition-all">
              {da ? 'Alle områder' : 'All sectors'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
