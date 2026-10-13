import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Phone, Mail } from 'lucide-react'
import { getMergedShopProducts } from '@/lib/shop-data'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Produkter til erhverv – filtre & vandbehandling | Clean Water Supply',
  description:
    'Produktoversigt til erhverv: medicinsk certificerede filtre, inline-filtre, brusere, filterkander, blødgøringsanlæg og ECA-vand til hospitaler, hoteller, svømmehaller, fødevare og landbrug. Kontakt os for tilbud.',
  alternates: { canonical: `${SITE_URL}/shop/erhverv` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/shop/erhverv`,
    title: 'Produkter til erhverv | Clean Water Supply',
    description: 'Produktoversigt med professionelle vandbehandlingsløsninger til erhverv – kontakt os for tilbud.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

const CAT_LABELS: Record<string, string> = {
  vandhane: 'Filtre til vandhanen',
  bruser: 'Brusere & brusefiltre',
  vandkande: 'Filterkander & filtre',
  filtre: 'Inline-filtre & tilbehør',
  blosgoringsanlaeg: 'Blødgøringsanlæg',
  anlaeg: 'Anlæg & professionelle løsninger',
}
const CAT_ORDER = ['blosgoringsanlaeg', 'anlaeg', 'vandhane', 'bruser', 'filtre', 'vandkande']

export default async function ErhvervProductsPage() {
  const all = await getMergedShopProducts()
  const products = all.filter((p) => !p.addon && !p.comingSoon)

  const groups = CAT_ORDER
    .map((cat) => ({ cat, label: CAT_LABELS[cat] ?? cat, items: products.filter((p) => p.category === cat) }))
    .filter((g) => g.items.length > 0)

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem', url: SITE_URL },
          { name: 'Produkter til erhverv', url: `${SITE_URL}/shop/erhverv` },
        ]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="pointer-events-none absolute -top-16 -right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#3aad4a]" /> Til erhverv
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">Produkter til erhverv</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Her er et overblik over vores løsninger til erhverv – fra medicinsk certificerede filtre til
            blødgøringsanlæg og professionelle anlæg. Kontakt os for pris og et uforpligtende tilbud,
            der passer til jeres behov.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-7">
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5">
              Få et tilbud <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+4551215800" className="inline-flex items-center gap-2 bg-white text-[#0a2540] ring-1 ring-blue-100 hover:ring-blue-200 px-8 py-3.5 rounded-full font-bold text-sm transition-all">
              <Phone className="w-4 h-4 text-[#284eff]" /> +45 51 21 58 00
            </a>
          </div>
        </div>
      </section>

      {/* PRODUKT-GRUPPER */}
      {groups.map((g) => (
        <section key={g.cat} className="py-10 border-t border-gray-100 first:border-t-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-6">{g.label}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {g.items.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.id}`}
                  className="group rounded-2xl bg-gray-50 ring-1 ring-gray-100 overflow-hidden hover:shadow-lg hover:ring-blue-200 transition-all flex flex-col"
                >
                  <div className="h-40 sm:h-44 bg-white flex items-center justify-center p-4">
                    {p.imgSrc ? (
                      <img src={p.imgSrc} alt={p.name} width={300} height={300} loading="lazy" className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : null}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-[#0a2540] text-sm leading-snug">{p.name}</h3>
                    {p.description && <p className="text-xs text-gray-500 line-clamp-2 mt-1 flex-1 leading-relaxed">{p.description}</p>}
                    <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#3aad4a]">Se produkt <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* KONTAKT-CTA */}
      <section className="py-14 bg-gradient-to-br from-[#0a2540] via-[#0e2f52] to-[#123a63]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Skal vi finde den rette løsning til jer?</h2>
          <p className="text-blue-100/85 mb-7 leading-relaxed">
            Fortæl os om jeres behov, så vender vi tilbage med anbefaling og et uforpligtende tilbud – med erhvervspriser.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all">
              Kontakt os <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="mailto:info@cleanwatersupply.dk" className="inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/20 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:bg-white/15">
              <Mail className="w-4 h-4" /> info@cleanwatersupply.dk
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
