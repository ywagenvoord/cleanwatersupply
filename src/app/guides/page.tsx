import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Sparkles, Gauge, Filter, HelpCircle } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Guides om rent vand, kalk og filtre | Clean Water Supply',
  description:
    'Enkle guides om kalk i vandet, vandets hårdhed og valg af det rigtige vandfilter. Få hjælp til at vælge den løsning, der passer til dit hjem.',
  alternates: { canonical: `${SITE_URL}/guides` },
}

const GUIDES = [
  { Icon: Sparkles, title: 'Er kalk i vandet skadeligt?', text: 'Er kalk farligt at drikke – og hvad gør hårdt vand ved hjem, hud og hår?', href: '/guides/er-kalk-i-vandet-skadeligt' },
  { Icon: Gauge, title: 'Hvor hårdt er dit vand?', text: 'Forstå vandets hårdhed (°dH), og find hårdheden for din adresse.', href: '/guides/vandets-haardhed' },
  { Icon: Filter, title: 'Hvilket filter skal du vælge?', text: 'Brusefilter, vandhanefilter, filterkande eller blødgøringsanlæg – vælg rigtigt.', href: '/guides/vaelg-vandfilter' },
  { Icon: HelpCircle, title: 'Find dit filter', text: 'Svar på fire korte spørgsmål og bliv guidet til den rette løsning.', href: '/guides/find-filter' },
]

export default function Page() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#3aad4a]" />
            Guides
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Guides om rent vand</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Enkle svar på de spørgsmål, folk oftest stiller om kalk, hårdt vand og filtre – så du nemt
            finder den løsning, der passer til dit hjem.
          </p>
        </div>
      </section>

      {/* GUIDES */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {GUIDES.map(({ Icon, title, text, href }) => (
              <Link key={href} href={href} className="group bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-md transition-all p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-extrabold text-[#0a2540] mb-1">{title}</p>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{text}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">Læs guide <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
