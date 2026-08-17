'use client'

import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, ShieldCheck, Droplets, ShowerHead, Baby,
  HeartPulse, ThermometerSun, Wind, Waves, Users, Sparkles, Info,
} from 'lucide-react'

export default function LegionellaPage() {
  return (
    <main className="bg-white">
      {/* ─── HERO (lyst) ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl -z-0" />
        <div className="absolute -bottom-20 left-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl -z-0" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Droplets className="w-3.5 h-3.5 text-[#3aad4a]" />
            Legionella – forklaret enkelt
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0a2540] mb-6 leading-tight">
            Legionella i vandet – <span className="text-[#284eff]">forstå risikoen</span> i dit eget hjem
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Legionella er en bakterie, der kan gemme sig i helt almindeligt brugsvand – fx i din bruser.
            Den gode nyhed: med lidt viden og et enkelt filter er din familie nemt beskyttet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-7 py-3.5 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-green-500/20"
            >
              Se filtre til hjemmet <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0a2540] px-7 py-3.5 rounded-full font-bold ring-1 ring-blue-100 hover:ring-blue-200 shadow-sm transition-all"
            >
              Få gratis rådgivning
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HVAD ER LEGIONELLA – KORT FORTALT ────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Hvad er Legionella – kort fortalt</h2>
            <p className="text-gray-600 leading-relaxed">
              Tre ting er værd at vide. Så giver resten næsten sig selv.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: ThermometerSun,
                title: 'Den elsker lunkent vand',
                body: 'Legionella trives bedst ved 30–45 °C – præcis den lune temperatur, de fleste af os holder mest af, når vi står i bruseren.',
              },
              {
                Icon: Wind,
                title: 'Den spreder sig i dampen',
                body: 'Faren opstår, når bakterien følger med de fine vanddråber ud i luften – fx når du bader – og bliver indåndet ned i lungerne.',
              },
              {
                Icon: Waves,
                title: 'Den gemmer sig, hvor vandet står stille',
                body: 'I rør, varmtvandsbeholderen og i haner eller brusere, der sjældent bruges, kan bakterien få ro til at vokse sig talstærk.',
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-[#0a2540] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HVORFOR DET BETYDER NOGET FOR FAMILIEN ───────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-5">
                Hvorfor det betyder noget for din familie
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                Først det beroligende: Legionella <strong>smitter ikke</strong> fra person til person. Man
                bliver kun syg ved at indånde små vanddråber med bakterien. For de fleste raske voksne går
                det oftest godt.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                Men nogle i familien er mere sårbare – og det er dem, det handler om at passe på. Bliver man
                syg, minder det om en kraftig lungebetændelse med høj feber, kulderystelser, hoste og
                muskelsmerter. Det kaldes <em>legionærsyge</em>.
              </p>
              <div className="inline-flex items-start gap-3 rounded-2xl bg-white ring-1 ring-blue-100 shadow-sm p-4 text-sm text-gray-600">
                <Info className="w-5 h-5 text-[#284eff] shrink-0 mt-0.5" />
                <span>Er man i tvivl om symptomer, skal man altid kontakte egen læge. Denne side er til
                information – ikke lægelig rådgivning.</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { Icon: Baby, title: 'Småbørn', body: 'Spæde og små børn har små, følsomme luftveje.' },
                { Icon: Users, title: 'Ældre', body: 'Modstandskraften falder naturligt med alderen.' },
                { Icon: HeartPulse, title: 'Nedsat immunforsvar', body: 'Fx under behandling eller ved kronisk sygdom.' },
                { Icon: Wind, title: 'KOL & astma', body: 'Svage lunger er mere udsatte for luftvejsinfektioner.' },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-5">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-400 ring-1 ring-rose-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0a2540] mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── HVOR MØDER DU DEN I HVERDAGEN ────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Hvor møder du den i hverdagen?</h2>
            <p className="text-gray-600 leading-relaxed">
              Ikke for at gøre dig bange – men for at vise, hvor lidt der egentlig skal til at være på forkant.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: ShowerHead, title: 'Morgenbruseren', body: 'Varmt vand og masser af damp – bakteriens yndlingssted, hvis vandet har stået stille om natten.' },
              { Icon: Baby, title: 'Børnenes bad', body: 'Karbad og håndbruser skaber fine dråber tæt på små ansigter.' },
              { Icon: Droplets, title: 'Håndvasken', body: 'Sjældent brugte haner – fx på gæstetoilettet – kan stå med lunkent vand i dagevis.' },
              { Icon: Waves, title: 'Gæstebruseren', body: 'Bruseren i kælderen eller gæsteværelset, der næsten aldrig bruges, er et klassisk skjulested.' },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-6">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SÅDAN BESKYTTER DU DIT HJEM ──────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">
              Sådan beskytter du dit hjem – helt enkelt
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Effektiv Legionellabekæmpelse behøver ikke være besværligt. Tre gode vaner rækker langt derhjemme.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: '1',
                title: 'Skyl det, du sjældent bruger',
                body: 'Lad vandet løbe et par minutter i gæstebadet og haner, der ikke bruges dagligt – især efter ferie. Så ryger det stillestående vand ud.',
              },
              {
                n: '2',
                title: 'Hold det varme vand varmt',
                body: 'Varmtvandsbeholderen bør stå på mindst 55–60 °C. Lunkent vand er lige det, bakterien vokser i – rigtig varmt vand holder den nede.',
              },
              {
                n: '3',
                title: 'Sæt et filter på',
                body: 'Det nemmeste og mest direkte: et Legionella-filter på hane og bruser stopper bakterien lige dér, hvor vandet kommer ud.',
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-8">
                <div className="w-10 h-10 rounded-full bg-[#3aad4a] text-white font-extrabold flex items-center justify-center mb-5">
                  {n}
                </div>
                <h3 className="font-bold text-[#0a2540] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            Bor du i en større ejendom, udlejning eller driver du erhverv? Så gælder der flere krav til
            fx cirkulation og dokumentation – <Link href="/contact" className="text-[#284eff] font-semibold hover:underline">dem hjælper vi også med</Link>.
          </p>
        </div>
      </section>

      {/* ─── FILTER GØR DET NEMT (highlight) ──────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-blue-100 p-10 text-center shadow-sm order-last lg:order-first">
              <div className="w-16 h-16 rounded-2xl bg-white ring-1 ring-blue-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#3aad4a]" />
              </div>
              <p className="text-5xl font-extrabold text-[#0a2540] mb-2">99,9999<span className="text-[#3aad4a]">%</span></p>
              <p className="text-gray-600 text-sm">af alle vandbårne bakterier tilbageholdes – inkl. Legionella og Pseudomonas</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-5">
                Et filter gør det nemt
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                Et sterilt brusefilter eller vandhanefilter er den mest direkte beskyttelse. Det tilbageholder
                99,9999 % af alle vandbårne bakterier – inkl. Legionella og Pseudomonas – lige dér, hvor vandet
                kommer ud og bliver til damp.
              </p>
              <ul className="space-y-3">
                {[
                  'Sættes på uden VVS’er – du klarer det selv på få minutter',
                  'Medicinsk certificeret og brugt på hospitaler',
                  'Passer til almindelige haner og brusere i hjemmet',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANBEFALEDE PRODUKTER ─────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Anbefalede Legionella-filtre</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Medicinsk certificerede filtre til vandhaner og brusere. Nemme at sætte på – klar til hjemmet.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'baclyser-neo-tl-3m', name: 'Baclyser® neo TL (3M)', desc: 'Vandhanefilter med blødt udløb – op til 93 dages beskyttelse', img: '/images/product-tl6.jpg' },
              { id: 'baclyser-neo-tr-3m', name: 'Baclyser® neo TR (3M)', desc: 'Vandhanefilter med bruserstråle – op til 93 dages beskyttelse', img: '/images/product-tr5.jpg' },
              { id: 'cblue-sc3',          name: 'cBlue SC3 brusehoved',  desc: 'Flot brusehoved med indbygget Legionella-filter', img: '/images/cblue-sc3-2.jpg' },
            ].map(p => (
              <Link
                key={p.id}
                href={`/shop/${p.id}`}
                className="group bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-3xl p-6 transition-all hover:shadow-lg shadow-sm"
              >
                <div className="h-40 mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-white ring-1 ring-blue-50 overflow-hidden p-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2 group-hover:text-[#3aad4a] transition-colors">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">
                  Se produktet <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a2540] hover:text-[#3aad4a] transition-colors">
              Se alle Legionella-filtre i shoppen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ANDRE BAKTERIER (fakta / SEO) ────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Legionella er ikke den eneste</h2>
            <p className="text-gray-600 leading-relaxed">
              Andre bakterier kan også findes i vand – især i ældre installationer, stillestående vand og
              ved egen brønd. Her er de mest almindelige, forklaret kort.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Legionella', body: 'Trives i stillestående, lunkent vand (ca. 30–45 °C) – fx i varmtvandsbeholdere og brusere. Indåndes via små dråber og kan give legionærsyge, en alvorlig lungebetændelse.' },
              { name: 'Pseudomonas aeruginosa', body: 'En hårdfør bakterie, der kan give infektioner i hud, øjne, ører og luftveje. Særligt uheldig for personer med svækket immunforsvar.' },
              { name: 'E. coli (colibakterier)', body: 'Stammer typisk fra forurening. Kan give mavepine, diarré og opkast – ses oftere i brøndvand end i vand fra vandværket.' },
              { name: 'Coliforme bakterier', body: 'Bruges som et varsel: er de til stede, kan vandet også indeholde andre sygdomsfremkaldende mikroorganismer.' },
              { name: 'Campylobacter', body: 'En af de hyppigste årsager til maveinfektion i Danmark. Giver diarré, mavekramper og feber, og kan overføres via forurenet vand.' },
              { name: 'Biofilm', body: 'Et tyndt slimlag i rør og installationer, hvor bakterier gemmer sig og formerer sig – grundlaget for mange vandproblemer.' },
            ].map((b) => (
              <div key={b.name} className="bg-white rounded-3xl ring-1 ring-blue-100 shadow-sm p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-50 ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5 text-[#3aad4a]" />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2">{b.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-8 max-w-2xl mx-auto text-center">
            <Sparkles className="w-4 h-4 text-[#3aad4a] shrink-0" />
            <span>Et filter ved hanen eller bruseren tilbageholder 99,9999 % af vandbårne bakterier – uanset type.</span>
          </div>
        </div>
      </section>

      {/* ─── LÆS OGSÅ ─────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#0a2540] mb-5">Læs også</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/faq" className="bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-2xl p-5 transition-all hover:shadow-md">
              <p className="font-bold text-sm text-[#0a2540] mb-1">Spørgsmål & svar om bakterier</p>
              <p className="text-xs text-gray-500">Kogepåbud, Legionella, filtre og meget mere</p>
            </Link>
            <Link href="/loesninger/filtre-paa-tappestedet" className="bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-2xl p-5 transition-all hover:shadow-md">
              <p className="font-bold text-sm text-[#0a2540] mb-1">Bakteriefrit vand ved hanen</p>
              <p className="text-xs text-gray-500">Vandhanefilter til hjemmet</p>
            </Link>
            <Link href="/loesninger/brusefilter" className="bg-white ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 rounded-2xl p-5 transition-all hover:shadow-md">
              <p className="font-bold text-sm text-[#0a2540] mb-1">Renere bruservand</p>
              <p className="text-xs text-gray-500">Brusefilter til hud, hår og luftveje</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA (lyst) ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-sky-50 via-blue-50 to-emerald-50 ring-1 ring-blue-100 px-6 py-14 text-center shadow-sm">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-4">Skab tryghed i vandet derhjemme</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Er du i tvivl om, hvad der passer til jeres hjem? Vi hjælper dig gerne med at finde det rette – helt uforpligtende.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                Se alle Legionella-filtre <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#0a2540] px-8 py-4 rounded-full font-bold ring-1 ring-blue-100 hover:ring-blue-200 shadow-sm transition-all"
              >
                Få gratis rådgivning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
