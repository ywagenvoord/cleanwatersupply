import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight, ShieldCheck, Droplets, Building2, AlertTriangle, FileCheck2, CheckCircle2 } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

// NB: Sundheds-, effekt- og rådgivningspåstande bør kvalitetssikres af en fagansvarlig før publicering.

export const metadata: Metadata = {
  title: 'Legionella-forebyggelse til erhverv | Clean Water Supply',
  description:
    'Legionella-forebyggelse til erhverv: systematisk tilgang til drift, kontrol og risikohåndtering i brugsvandsinstallationer. Rådgivning om filtrering ved udsatte tappesteder til hoteller, campingpladser og sundhedssektoren.',
  alternates: { canonical: `${SITE_URL}/loesninger/legionella-forebyggelse-erhverv` },
  keywords: [
    'legionella forebyggelse', 'legionella bekæmpelse', 'legionella erhverv',
    'legionella hotel', 'legionella brugsvand', 'bakteriefilter tappested', 'vandhygiejne erhverv',
  ],
}

const SECTIONS = [
  {
    Icon: AlertTriangle,
    h: 'Hvor opstår risikoen?',
    p: 'Legionella trives i brugsvandsinstallationer, hvor vandet står stille eller har en uhensigtsmæssig temperatur – fx i sjældent brugte tappesteder, lange rørføringer, blinde ender og varmtvandsbeholdere. I erhverv med mange gæster eller sårbare brugere er opmærksomheden særlig vigtig.',
  },
  {
    Icon: ShieldCheck,
    h: 'Forebyggelse kontra akut risikobegrænsning',
    p: 'Forebyggelse handler om den løbende drift: temperaturstyring, regelmæssig gennemskylning, vedligehold og dokumentation. Akut risikobegrænsning er de tiltag, der sættes ind ved mistanke om eller påvist Legionella – fx filtrering ved udsatte tappesteder, mens årsagen afdækkes og udbedres.',
  },
  {
    Icon: Droplets,
    h: 'Filtrering ved tappestedet',
    p: 'Mikrobiologisk validerede bakteriefiltre monteres direkte ved bruser eller hane og danner en barriere mod bakterier lige dér, hvor vandet bruges. Det er særligt relevant på udsatte tappesteder og i miljøer med sårbare brugere, og kan bruges både forebyggende og som akut tiltag.',
  },
  {
    Icon: FileCheck2,
    h: 'Rådgivning og dokumentation',
    p: 'Vi rådgiver om løsninger til jeres installationer og behov og hjælper med at vælge de rette filtre til udsatte tappesteder. Kontakt os for en konkret vurdering af jeres situation og de næste skridt.',
  },
]

const BRANCHER = [
  { title: 'Hoteller', href: '/omraader/hoteller' },
  { title: 'Campingpladser', href: '/omraader/campingpladser' },
  { title: 'Guide: undgå Legionella', href: '/guides/undgaa-legionella' },
  { title: 'Bakteriefiltre ved tappestedet', href: '/loesninger/filtre-paa-tappestedet' },
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Løsninger', url: `${SITE_URL}/loesninger` },
          { name: 'Legionella-forebyggelse til erhverv', url: `${SITE_URL}/loesninger/legionella-forebyggelse-erhverv` },
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2540] to-[#0c3a73]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-4">
            <Link href="/erhverv" className="hover:text-white transition-colors">Erhverv</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90 font-medium">Legionella-forebyggelse</span>
          </nav>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5 text-green-400" /> Erhvervsløsning
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight max-w-3xl">
            Legionella-forebyggelse i erhvervets vandinstallationer
          </h1>
          <p className="text-lg text-blue-100/90 max-w-2xl leading-relaxed">
            Legionella i brugsvandsinstallationer kræver en systematisk tilgang til drift, kontrol og håndtering
            af risiko. Vi rådgiver om løsninger til udsatte tappesteder og miljøer som hoteller, campingpladser og
            sundhedssektoren – og giver overblik over muligheder for filtrering, praktiske hensyn og næste skridt,
            hvis der er mistanke om eller påvist Legionella.
          </p>
          <div className="mt-8">
            <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5">
              Få rådgivning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
          {SECTIONS.map(({ Icon, h, p }) => (
            <div key={h} className="rounded-3xl border border-gray-100 bg-gray-50 p-8">
              <div className="w-12 h-12 rounded-xl bg-white text-blue-700 flex items-center justify-center mb-5 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-[#0a2540] mb-3">{h}</h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRANCHER / INTERNE LINKS */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">Læs også</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BRANCHER.map(({ title, href }) => (
              <Link key={href} href={href} className="group flex items-center justify-between gap-3 bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-md transition-all p-5">
                <span className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3aad4a] shrink-0" />
                  <span className="font-semibold text-[#0a2540]">{title}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-[#3aad4a] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#0c3a73] to-[#0044c4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Mistanke om Legionella – eller vil I forebygge?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Få en konkret vurdering af jeres vandinstallationer og de rette løsninger til udsatte tappesteder.</p>
          <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors">
            Kontakt os <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
