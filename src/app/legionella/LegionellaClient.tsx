'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Droplets } from 'lucide-react'

export default function LegionellaPage() {
  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-[#0a2540]/60" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <AlertTriangle className="w-3.5 h-3.5 text-emerald-400" />
            LEGIONELLA
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Legionellabekæmpelse – stop en skjult risiko i vandet
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Kend risikoen – og få effektiv Legionellabekæmpelse med filtre ved hver hane og bruser.
          </p>
        </div>
      </section>

      {/* ─── KEY FACTS ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                stat: '30°– 40°C',
                body: 'Legionella er en bakterie, der trives i stillestående vand med temperaturer mellem 30° og 40° – præcis den temperatur, mange af os foretrækker, når vi bader.',
              },
              {
                stat: 'Spredning',
                body: 'Problemet opstår, når bakterien spredes gennem små vanddråber i luften – fx fra brusere eller andre installationer. Her kan den indåndes og give alvorlige infektioner i luftvejene.',
              },
              {
                stat: 'Vokser i rør og tanke',
                body: 'Legionella vokser hurtigt i rør og tanke, hvor vandet står stille i længere tid – især hvis systemet ikke bliver skyllet regelmæssigt.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                <p className="text-2xl font-extrabold text-[#0a2540] mb-4">{item.stat}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY DANGEROUS ────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-6">
                Hvorfor er bakterien farlig?
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Legionella kan forårsage legionærernes sygdom – en alvorlig lungebetændelse, der i svære tilfælde kan være dødelig. Sygdommen smitter ikke fra person til person. Den smitter ved at indånde små vanddråber med bakterier – typisk fra brusere, klimaanlæg, boblebade eller køletårne. Symptomer inkluderer høj feber, kulderystelser, hoste, hovedpine og muskelsmerter.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0a2540] to-blue-800 rounded-3xl p-10 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-5 text-[#3aad4a]">Symptomer</h3>
              <ul className="space-y-3 text-blue-100 text-sm">
                {['Høj feber', 'Kulderystelser', 'Hoste', 'Hovedpine', 'Muskelsmerter'].map((s, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#3aad4a] shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BAKTERIER I VANDET ───────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Bakterier der kan findes i vandet</h2>
            <p className="text-gray-600 leading-relaxed">
              Vand kan indeholde flere typer bakterier – især i ældre installationer, stillestående vand og egen brønd. Her er nogle af de mest almindelige, og hvad de kan gøre.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Legionella', body: 'Trives i stillestående, lunkent vand (ca. 25–45 °C) – fx i varmtvandsbeholdere og brusere. Indåndes via små vanddråber og kan give legionærsygdom, en alvorlig lungebetændelse.' },
              { name: 'Pseudomonas aeruginosa', body: 'En hårdfør bakterie, der kan give infektioner i hud, øjne, ører og luftveje. Særligt risikabel for personer med svækket immunforsvar.' },
              { name: 'E. coli (colibakterier)', body: 'Stammer typisk fra fækal forurening. Kan give mavepine, diarré og opkast, og ses oftere i brøndvand end i kommunalt vand.' },
              { name: 'Coliforme bakterier', body: 'Bruges som indikator for forurening. Er de til stede, kan vandet også indeholde egentlige sygdomsfremkaldende mikroorganismer.' },
              { name: 'Campylobacter', body: 'En af de hyppigste årsager til maveinfektion i Danmark. Giver diarré, mavekramper og feber, og kan overføres via forurenet vand.' },
              { name: 'Enterokokker', body: 'Tarmbakterier, der er tegn på fækal forurening af vandet. Bruges som kvalitetsindikator – især ved egen brønd.' },
            ].map((b) => (
              <div key={b.name} className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm">
                  <Droplets className="w-5 h-5 text-[#3aad4a]" />
                </div>
                <h3 className="font-bold text-[#0a2540] mb-2">{b.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8 max-w-2xl mx-auto">
            Et filter ved tappestedet tilbageholder 99,9999 % af vandbårne bakterier – uanset type.
          </p>
        </div>
      </section>

      {/* ─── PREVENTION ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-6 text-center">
              Effektiv Legionellabekæmpelse
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg text-center mb-10">
              De mest effektive forebyggende foranstaltninger er: Hold varmtvand på mindst 55-60°C i hele systemet. Hold koldt vand under 20°C. Skyl regelmæssigt installationer der bruges sjældent. Installér automatiske cirkulationssystemer i større ejendomme. Brug Legionella-filtre ved vandhaner og brusere som ekstra sikkerhed.
            </p>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
              <ul className="space-y-4">
                {[
                  'Varmtvand: minimum 55-60°C i hele systemet',
                  'Koldt vand: hold under 20°C',
                  'Regelmæssig skylning af sjældent brugte installationer',
                  'Automatisk cirkulation i større ejendomme',
                  'Legionellafiltre ved vandhaner og brusere',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3aad4a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FILTERS ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="bg-gradient-to-br from-[#0a2540] to-blue-800 rounded-3xl p-10 text-white text-center shadow-xl order-last lg:order-first">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
                <ShieldCheck className="w-8 h-8 text-[#3aad4a]" />
              </div>
              <p className="text-5xl font-extrabold text-[#3aad4a] mb-2">99,9999%</p>
              <p className="text-blue-200 text-sm">af alle vandbårne bakterier tilbageholdes – inkl. Legionella og Pseudomonas</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-6">
                Legionellafilter som ekstra sikkerhed
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Sterile filtre ved vandhaner og brusere er den mest direkte beskyttelse. Filtrene tilbageholder 99,9999% af alle vandbårne bakterier – inkl. Legionella og Pseudomonas – direkte ved tappestedet. De er nemme at installere og kræver minimal vedligeholdelse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANBEFALEDE PRODUKTER (topical authority + commercial intent) ─── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Anbefalede Legionella-filtre</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Medicinsk certificerede point-of-use filtre til vandhaner og brusere. Alle med dokumenteret 7 log retention.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'baclyser-neo-tl-3m', name: 'Baclyser® neo TL (3M)', desc: 'Vandhanefilter med laminar udløb – 93 dages beskyttelse', img: '/images/product-tl6.jpg' },
              { id: 'baclyser-neo-tr-3m', name: 'Baclyser® neo TR (3M)', desc: 'Vandhanefilter med bruserudløb – 93 dages beskyttelse', img: '/images/product-tr5.jpg' },
              { id: 'cblue-sc3',          name: 'cBlue SC3 brusehoved',  desc: 'Krom brusehoved med integreret Legionella-filter', img: '/images/cblue-sc3-2.jpg' },
            ].map(p => (
              <Link
                key={p.id}
                href={`/shop/${p.id}`}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-2xl p-6 transition-all hover:shadow-md"
              >
                <div className="h-40 mb-4 flex items-center justify-center rounded-xl bg-white border border-gray-100 overflow-hidden p-3">
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

      {/* ─── RELATERET CONTENT (interne links) ──────────────────── */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#0a2540] mb-5">Læs også</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/faq" className="bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-xl p-5 transition-colors">
              <p className="font-bold text-sm text-[#0a2540] mb-1">Spørgsmål & svar om bakterier</p>
              <p className="text-xs text-gray-500">Kogepåbud, Legionella, filtre og meget mere</p>
            </Link>
            <Link href="/loesninger/filtre-paa-tappestedet" className="bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-xl p-5 transition-colors">
              <p className="font-bold text-sm text-[#0a2540] mb-1">Bakteriefrit vand ved hanen</p>
              <p className="text-xs text-gray-500">Filtre til vandhanen i hjemmet</p>
            </Link>
            <Link href="/loesninger/brusefilter" className="bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-xl p-5 transition-colors">
              <p className="font-bold text-sm text-[#0a2540] mb-1">Renere bruservand</p>
              <p className="text-xs text-gray-500">Brusefilter til hud, hår og luftveje</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-8">Klar til at beskytte dit vandanlæg?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20"
            >
              Se alle Legionella-filtre <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
            >
              Få gratis Legionella-rådgivning <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
