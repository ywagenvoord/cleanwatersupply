'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowRight, Home, ShieldCheck, Sparkles, Wind, Filter, Facebook, Instagram, Wrench, Truck } from 'lucide-react'
import { PRODUCTS, type Product } from '@/lib/products'
import ProductCarousel from '@/components/ProductCarousel'

export default function PrivateClient() {
  const { language } = useLanguage()
  const da = language !== 'en'

  // Curated, varied selection for the home (incl. the water carafe).
  const featuredIds = [
    'baclyser-neo-tr-2m',
    'baclyser-neo-tl-2m',
    'cblue-sc3',
    'brusehoved-filter-acf',
    'brusehoved-til-filter',
    'dualstage-mf-10-cl',
    'kulblokfilter-10-cl',
    'filter-housing',
    'vandfilter-predator',
  ]
  const products = featuredIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => !!p && !p.comingSoon)

  const solutions = [
    {
      slug: 'filtre-paa-tappestedet',
      img: '/images/solution-tappested.jpg',
      title: da ? 'Filtre på tappestedet' : 'Filters at the tap',
      body: da
        ? 'Sættes direkte på vandhanen og stopper bakterier lige ved tappestedet – sikkert og enkelt.'
        : 'Mounted directly on the tap, stopping bacteria right at the point of use – safe and simple.',
    },
    {
      slug: 'kalkanlaeg',
      img: '/images/solution-kalkanlaeg.jpg',
      title: da ? 'Kalkanlæg' : 'Water softener',
      body: da
        ? 'Blødt vand betyder mindre kalk og rengøring, mindre forbrug af sæbe og rengøringsmidler – og blødere hud og hår. Samtidig beskytter det dine installationer og hvidevarer.'
        : 'Soft water means less limescale and cleaning, less use of soap and detergents – and softer skin and hair. It also protects your installations and appliances.',
    },
    {
      slug: 'filtre-i-vandforsyningen',
      img: '/images/solution-undervask.jpg',
      title: da ? 'Filtre i vandforsyningen' : 'Filters in the water supply',
      body: da
        ? 'Inline-filtre der monteres i vandforsyningen og renser vandet, før det når frem til hanen.'
        : 'Inline filters fitted in the water supply, cleaning the water before it reaches the tap.',
    },
    {
      slug: 'brusefilter',
      img: '/images/solution-brusefilter.jpg',
      title: da ? 'Brusefilter' : 'Shower filter',
      body: da
        ? 'Fjerner bakterier i bruservandet – ligesom filtrene til vandhanen. Så den fine vandtåge, du indånder i badet, er ren og sikker at trække vejret i.'
        : 'Removes bacteria in the shower water – just like the tap filters. So the fine mist you breathe in the shower is clean and safe.',
    },
    {
      slug: 'vandkande',
      href: '/shop/vandfilter-predator',
      img: '/images/solution-vandkande.jpg',
      objPos: 'object-[center_35%]',
      title: da ? 'Filtervandkande' : 'Water filter jug',
      body: da
        ? 'Rent vand så nemt som at hælde op. Filtrerer kalk, klor og urenheder – og giver bedre smag i vand, kaffe og te. Kræver ingen installation.'
        : 'Clean water as easy as pouring a glass. Filters limescale, chlorine and impurities – for better-tasting water, coffee and tea. No installation required.',
    },
    {
      slug: 'vandkande-filtre',
      href: '/shop/vandfilter-biflux-reservedel',
      img: '/images/product-filter-udskift.jpg',
      title: da ? 'Filtre til vandkande' : 'Jug filter cartridges',
      body: da
        ? 'Udskiftningsfiltre (Bi-flux®) til vandkanden. Skift filteret, og bevar rent vand med god smag – holder ca. 150 liter pr. filter.'
        : 'Bi-flux® replacement cartridges for the water jug. Swap the filter to keep clean, great-tasting water – around 150 litres per cartridge.',
    },
  ]

  return (
    <main>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="bg-[#0a2540] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-green-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  <Home className="w-3.5 h-3.5" />
                  {da ? 'Det private hjem' : 'The private home'}
                </span>
                <a
                  href="https://www.facebook.com/profile.php?id=61580903496592"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] hover:opacity-90 flex items-center justify-center text-white transition-all hover:-translate-y-0.5"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/cleanwatersupply/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:opacity-90 flex items-center justify-center text-white transition-all hover:-translate-y-0.5"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.08]">
                {da ? 'Rent og bakteriefrit vand til dit hjem' : 'Clean and bacteria-free water for your home'}
              </h1>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                {da
                  ? 'Beskyt din familie med rent, bakteriefrit og kalkfrit vand. Vores løsninger er nemme at installere, vedligeholde og tilpasse til enhver bolig.'
                  : 'Protect your family with clean, bacteria-free and limescale-free water. Our solutions are easy to install, maintain and adapt to any home.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-0.5">
                  {da ? 'Se produkterne' : 'Explore products'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
                  {da ? 'Kontakt os' : 'Contact us'}
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  { da: 'Nem montering', en: 'Easy installation', Icon: Wrench },
                  { da: 'Levering 2-3 hverdage', en: 'Delivery in 2-3 business days', Icon: Truck },
                  { da: 'Medicinsk godkendt', en: 'Medically approved', Icon: ShieldCheck },
                ].map(({ da: dl, en: el, Icon }) => (
                  <div key={dl} className="flex flex-col items-center gap-2 text-center">
                    <span className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-400" />
                    </span>
                    <span className="text-white/70 text-sm">{da ? dl : el}</span>
                  </div>
                ))}
              </div>

            </div>

            <div className="relative pb-10 lg:pb-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                <video
                  src="/videos/hjem.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={da ? 'Rent vand i hjemmet' : 'Clean water at home'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 lg:-bottom-5 right-4 lg:-right-12 bg-white rounded-2xl px-5 py-4 shadow-xl border border-gray-100 flex items-center gap-3">
                <svg viewBox="0 0 48 48" className="w-9 h-9 shrink-0" aria-hidden="true">
                  <circle cx="24" cy="24" r="24" fill="#003399" />
                  {[...Array(12)].map((_, i) => {
                    const a = (i / 12) * 2 * Math.PI - Math.PI / 2
                    const x = 24 + 15 * Math.cos(a)
                    const y = 24 + 15 * Math.sin(a)
                    return (
                      <text key={i} x={x} y={y} fontSize="8" fill="#FFCC00" textAnchor="middle" dominantBaseline="central">★</text>
                    )
                  })}
                </svg>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{da ? 'Kvalitet' : 'Quality'}</p>
                  <p className="text-lg font-extrabold text-[#0a2540]">{da ? 'Produceret i EU' : 'Made in the EU'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS FOR THE HOME ────────────────────────────── */}
      <section className="pt-6 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="section-badge">{da ? 'Til hjemmet' : 'For the home'}</span>
            <h2 className="section-heading">{da ? 'Vores løsninger til dig og din familie' : 'Our solutions for you and your family'}</h2>
            <p className="section-subheading">{da ? 'Uanset om du vil have bakteriefrit vand, bedre smag eller slippe for kalk – vi har en løsning der passer til dit hjem.' : 'Whether you want bacteria-free water, better taste or to get rid of limescale – we have a solution that fits your home.'}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {solutions.map(({ img, title, body, slug, href, objPos }) => (
              <Link
                key={title}
                href={href ?? `/loesninger/${slug}`}
                className="group relative aspect-[2/1] rounded-3xl overflow-hidden shadow-sm ring-1 ring-black/5 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img}
                  alt={title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                    objPos ?? 'object-center'
                  }`}
                />
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
                  <h3 className="text-white font-extrabold text-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">{title}</h3>
                  <p className="max-w-xs text-sm leading-snug text-white/0 max-h-0 overflow-hidden transition-all duration-300 group-hover:text-white/95 group-hover:max-h-32 group-hover:mt-2">
                    {body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY PROTECT (EMOTIONAL) ───────────────────────────── */}
      <section className="py-20 bg-blue-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white text-blue-700 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="section-badge inline-block mb-4">{da ? 'Hvorfor det betyder noget' : 'Why it matters'}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {da ? 'Dit hjem skal føles trygt – helt ned til vandet' : 'Your home should feel safe – right down to the water'}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-12 max-w-2xl mx-auto">
            {da
              ? 'Usynlige bakterier som Legionella kan trives i rør og vandinstallationer. Det vand, din familie drikker, bader i og indånder, fortjener at være rent og sikkert. Derfor har vi en løsning til hvert behov i hjemmet:'
              : 'Invisible bacteria like Legionella can thrive in pipes and water systems. The water your family drinks, bathes in and breathes deserves to be clean and safe. That is why we have a solution for every need in the home:'}
          </p>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              {
                Icon: Sparkles,
                title: da ? 'Kalkanlæg' : 'Water softener',
                body: da
                  ? 'Hårdt, kalkholdigt vand slider på dit hjem og din hud. Med blødt vand bruger du mindre sæbe, rengøringsmidler og energi, kalken forsvinder fra fliser og hvidevarer, og hud og hår føles mærkbart blødere. Det er komfort, du mærker hver dag – og en investering, der forlænger levetiden på dine installationer.'
                  : 'Hard, limescale-heavy water wears on your home and your skin. With soft water you use less soap, detergent and energy, limescale disappears from tiles and appliances, and skin and hair feel noticeably softer. It is comfort you feel every day – and an investment that extends the life of your installations.',
              },
              {
                Icon: Wind,
                title: da ? 'Brusefilter' : 'Shower filter',
                body: da
                  ? 'Når du tager et varmt bad, forstøves vandet til en fin tåge, du trækker ned i lungerne. Er der bakterier som Legionella i vandet, er det netop her, de bliver farlige. Et brusefilter fjerner bakterierne lige ved bruseren – så du og din familie trygt kan nyde badet, samtidig med blødere hud og hår.'
                  : 'When you take a warm shower, the water turns into a fine mist you breathe deep into your lungs. If bacteria like Legionella are present, this is exactly where they become dangerous. A shower filter removes the bacteria right at the shower – so you and your family can enjoy bathing safely, with softer skin and hair too.',
              },
              {
                Icon: Filter,
                title: da ? 'Vandhanefilter' : 'Tap filter',
                body: da
                  ? 'Det vand, du fylder i glasset, koger pasta i og børster tænder med, bør du kunne stole 100 % på. Et filter direkte på vandhanen stopper bakterier og urenheder lige ved tappestedet, så hver tår er ren og sikker – især vigtigt for børn, ældre og alle med svækket immunforsvar.'
                  : 'The water you pour into the glass, cook pasta in and brush your teeth with should be 100% trustworthy. A filter directly on the tap stops bacteria and impurities right at the point of use, so every sip is clean and safe – especially important for children, the elderly and anyone with a weakened immune system.',
              },
              {
                Icon: ShieldCheck,
                title: da ? 'Filtrering direkte i vandforsyningen' : 'Filtration in the water supply',
                body: da
                  ? 'Den mest gennemgribende beskyttelse begynder, før vandet overhovedet når frem til dig. Med filtrering direkte i vandforsyningen renses vandet centralt, så hvert eneste tappested i hjemmet leverer rent vand – uden at du skal tænke over det. Ét anlæg, fuld tryghed i hele huset.'
                  : 'The most thorough protection begins before the water even reaches you. With filtration directly in the water supply, the water is cleaned centrally, so every tap in the home delivers clean water – without you having to think about it. One system, complete peace of mind throughout the house.',
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">{title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ──────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="section-badge">Bestsellers</span>
              <h2 className="section-heading">{da ? 'Populære produkter til hjemmet' : 'Popular products for the home'}</h2>
            </div>
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
              {da ? 'Se alle produkter' : 'See all products'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductCarousel products={products} />
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0c3a73] to-[#0044c4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="w-10 h-10 text-green-400 mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{da ? 'Klar til rent og bakteriefrit vand i hjemmet?' : 'Ready for clean, bacteria-free water at home?'}</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">{da ? 'Kontakt os i dag og få gratis, uforpligtende rådgivning til netop dit hjem.' : 'Contact us today for free, no-obligation advice for your home.'}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors">
              {da ? 'Få gratis rådgivning' : 'Get free advice'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all">
              {da ? 'Se produkterne' : 'Explore products'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
