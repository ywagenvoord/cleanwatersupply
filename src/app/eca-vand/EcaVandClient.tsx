'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Zap } from 'lucide-react'

export default function EcaVandPage() {
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
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            ECA-VAND
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Elektrolyseret vand – effektiv rengøring og desinfektion
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Det ultimative desinfektionsmiddel
          </p>
        </div>
      </section>

      {/* ─── SECTION 1 – What is ECA ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-6">
              Effektiv desinfektion – skånsom i brug
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Elektrolyseret vand er en innovativ teknologi, der skaber to nyttige væsker: et kraftfuldt, men skånsomt rengøringsmiddel og et særdeles effektivt desinfektionsmiddel. Disse væsker produceres ved at tilføre en lille mængde salt til vand og sende en elektrisk strøm igennem det – en proces kaldet elektrolyse. Den første væske, Anolyt, indeholder hypoklorsyre og fungerer som et stærkt desinfektionsmiddel, der hurtigt dræber bakterier, vira, svampe og sporer. Faktisk har det vist sig at være op til 80% mere effektivt end traditionelt klorbaseret desinfektionsmiddel. Den anden væske, Katolyt, indeholder natriumhydroxid og er et alsidigt rengøringsmiddel, der effektivt opløser fedt og snavs uden at skumme.
            </p>
          </div>

          {/* 3 Key value cards */}
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                icon: ShieldCheck,
                title: 'Forbedret hygiejne',
                body: 'ECA-vand bekæmper bakterier, vira og svampe effektivt og hurtigt',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Leaf,
                title: 'Skånsom i brug',
                body: 'Fremstilles af vand og salt – ingen kemikalierester at opbevare eller håndtere',
                color: 'from-emerald-500 to-emerald-600',
              },
              {
                icon: Zap,
                title: 'Kemikaliefri proces',
                body: 'Fremstilles på stedet af vand og salt – ingen kemikalier at købe eller transportere',
                color: 'from-[#0a2540] to-blue-800',
              },
            ].map((card, i) => {
              const Icon = card.icon
              return (
                <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mx-auto mb-5 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a2540] mb-3">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 – Safe solution ────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0a2540] mb-6">En sikker løsning</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                I fødevareindustrien og landbruget er hygiejne ikke til forhandling. Men hvordan sikrer man en effektiv desinfektion uden skrappe kemikalier? Svaret kan være ECA-vand – en innovativ teknologi, der kombinerer høj effektivitet med en skånsom proces. Hos Clean Water Supply leverer vi fuldautomatiske anlæg til kunder på tværs af hele Danmark.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0a2540] to-blue-800 rounded-3xl p-10 text-white text-center shadow-xl">
              <p className="text-5xl font-extrabold text-[#3aad4a] mb-3">80%</p>
              <p className="text-lg font-semibold mb-2">Mere effektivt</p>
              <p className="text-blue-200 text-sm">end traditionelt klorbaseret desinfektionsmiddel</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 – Biofilm ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] mb-6">
              Biofilm &amp; Bakteriedannelse
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Biofilm er en slimet belægning af både dødt og levende materiale, der sætter sig fast på overflader i vandinstallationer. Denne belægning danner et beskyttende lag, hvor bakterier og andre mikroorganismer kan trives og formere sig. Over tid kan biofilm føre til en række problemer, herunder dårlig lugt og smag i vandet, øget korrosion af rør og udstyr samt en reduktion af iltindholdet i vandet. Fjernelse af biofilm er en udfordring, da de fleste bakterier gemmer sig inde i det beskyttende lag, hvilket gør dem resistente over for mange traditionelle rengørings- og desinfektionsmetoder. For at sikre en effektiv bekæmpelse af bakterier i vandinstallationer skal biofilmen først nedbrydes. ECA-vand er en effektiv løsning, der både opløser biofilmen og dræber bakterierne uden brug af skrappe kemikalier.
            </p>
          </div>

          {/* 3 Good reasons */}
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: 'Fremtidssikret løsning',
                body: 'Salt, vand og elektricitet er de eneste ingredienser ECA-vand kræver for at blive produceret',
              },
              {
                title: 'Kemikaliefri løsning',
                body: 'Der kræves ingen brug af værnemidler ved håndtering eller opbevaring',
              },
              {
                title: 'Omkostningseffektiv',
                body: 'Anlægget renser effektivt vandsystemer, foderanlæg, overflader mm. – alt på én gang',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0" />
                  <h3 className="font-bold text-[#0a2540]">{item.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed pl-8">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANBEFALEDE PRODUKTER ────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0a2540] mb-3">Kirkmayer ECA-generatorer</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">ECHA Article 95 godkendte HOCl-generatorer til on-site produktion af hypochlorous acid.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'cblue-sc3',          name: 'cBlue SC3 brusehoved',  desc: 'Krom brusehoved med integreret filter – kombiner gerne med ECA-vand' },
              { id: 'dualstage-mf-10-cl', name: 'DualStage MF 10-CL',    desc: 'Tostadigt filter til kemikaliefri vandbehandling' },
              { id: 'kulblokfilter-10-cl', name: 'Aktivt kulblokfilter', desc: 'Fjerner klor og urenheder ved indløb' },
            ].map(p => (
              <Link
                key={p.id}
                href={`/shop/${p.id}`}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-2xl p-6 transition-all hover:shadow-md"
              >
                <CheckCircle2 className="w-8 h-8 text-[#3aad4a] mb-4" aria-hidden="true" />
                <h3 className="font-bold text-[#0a2540] mb-2 group-hover:text-[#3aad4a] transition-colors">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">
                  Se produktet <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RELATERET CONTENT ──────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#0a2540] mb-5">Læs også</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/legionella" className="bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-xl p-5 transition-colors">
              <p className="font-bold text-sm text-[#0a2540] mb-1">Legionella-forebyggelse</p>
              <p className="text-xs text-gray-500">Beskyttelse mod vandbårne bakterier</p>
            </Link>
            <Link href="/omraader/foedevare" className="bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-xl p-5 transition-colors">
              <p className="font-bold text-sm text-[#0a2540] mb-1">ECA-vand i fødevareindustrien</p>
              <p className="text-xs text-gray-500">Salmonella, E.coli og Listeria</p>
            </Link>
            <Link href="/omraader/landbruget" className="bg-white border border-gray-100 hover:border-[#3aad4a]/30 rounded-xl p-5 transition-colors">
              <p className="font-bold text-sm text-[#0a2540] mb-1">ECA-vand i landbruget</p>
              <p className="text-xs text-gray-500">Bakteriefrit vand til dyrene</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0a2540] via-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-6">Få ECA-vand til din virksomhed</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-green-500/20"
            >
              Se ECA-produkter <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-full font-bold text-base transition-all"
            >
              Få gratis ECA-rådgivning <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
