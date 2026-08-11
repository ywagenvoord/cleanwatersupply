/* Data for vandkande-filtre – deles af oversigt (/vandkande-filtre) og undersider ([slug]). */

export type FilterSpec = { label: string; value: string }

export type Filter = {
  slug: string
  name: string
  titleSuffix?: string
  art: string
  img: string
  images?: string[]
  price?: number
  varenr?: string
  pack?: string
  tagline: string
  best: string
  life: string
  points: string[]
  brita?: boolean
  glassmart?: boolean
  description: string
  specs: FilterSpec[]
  howTo?: string[]   // "Sådan skifter du filteret"-trin
}

export const FILTRE: Filter[] = [
  {
    slug: 'bi-flux-universal',
    pack: '2 stk. i pakken',
    price: 89,
    varenr: 'LAI-1006',
    name: 'Bi-flux® Universal',
    art: 'Art. F0M',
    img: '/images/filter-biflux-universal.png',
    images: ['/images/filter-biflux-universal-lg.png', '/images/filter-biflux-universal-box.png'],
    tagline: 'Det alsidige hverdagsfilter.',
    best: 'Bedst til: daglig brug, alsidig filtrering',
    life: '1 måned · ca. 150 L pr. filter',
    points: [
      'Reducerer klor, visse tungmetaller, pesticider og forebygger kalk',
      'Bevarer de nyttige mineralsalte (calcium, magnesium, kalium)',
      '6-trins filtrering ved kontrolleret hastighed',
      '100 % BPA-fri · Made in EU · testet af uafhængige labs',
    ],
    description:
      'Bi-flux® Universal er Laicas alsidige hverdagsfilter til filtervandkander. Med 6-trins filtrering ved ' +
      'kontrolleret hastighed reducerer det klor, visse tungmetaller og pesticider og forebygger kalk – samtidig ' +
      'med at de nyttige mineralsalte (calcium, magnesium og kalium) bevares. 100 % BPA-fri og Made in EU.',
    specs: [
      { label: 'Type', value: 'Bi-flux® udskiftningsfilter' },
      { label: 'Varenr.', value: 'F0M' },
      { label: 'Levetid', value: '1 måned · ca. 150 liter' },
      { label: 'Reducerer', value: 'Klor, tungmetaller, pesticider, kalk' },
      { label: 'Materiale', value: '100 % BPA-fri' },
      { label: 'Oprindelse', value: 'Made in EU' },
    ],
  },
  {
    slug: 'bi-flux-limescalestop',
    pack: '2 stk. i pakken',
    price: 99,
    varenr: 'LAI-1005',
    name: 'Bi-flux® LimescaleSTOP',
    art: 'Art. H0L',
    img: 'https://www.laica.com/wp-content/uploads/limescalestop-filter.webp',
    tagline: 'Mod kalk og hårdt vand.',
    best: 'Bedst til: områder med hårdt vand',
    life: '1 måned · ca. 150 L pr. filter',
    brita: true,
    points: [
      'Reducerer kalk og hårdhed med op til 90 %',
      'Reducerer også mikroplast, tungmetaller og klor (5-trins)',
      'Giver let, blødt vand med bedre smag',
      'Passer også til Brita®-kander (LAICA-Key medfølger)',
    ],
    description:
      'Bi-flux® LimescaleSTOP er udviklet til områder med hårdt vand. Det reducerer kalk og hårdhed med op til ' +
      '90 % og filtrerer samtidig mikroplast, tungmetaller og klor i 5 trin – for let, blødt vand med bedre smag. ' +
      'Passer også til Brita®-kander (LAICA-Key medfølger).',
    specs: [
      { label: 'Type', value: 'Bi-flux® udskiftningsfilter' },
      { label: 'Varenr.', value: 'H0L' },
      { label: 'Levetid', value: '1 måned · ca. 150 liter' },
      { label: 'Reducerer', value: 'Kalk (op til 90 %), mikroplast, tungmetaller, klor' },
      { label: 'Kompatibilitet', value: 'Laica- og Brita®-kander (LAICA-Key medfølger)' },
      { label: 'Oprindelse', value: 'Made in EU' },
    ],
  },
  {
    slug: 'bi-flux-healthexpert',
    pack: '2 stk. i pakken',
    price: 109,
    varenr: 'LAI-1004',
    name: 'Bi-flux® HealthExpert',
    art: 'Art. P3M',
    img: 'https://www.laica.com/wp-content/uploads/healthexpert-prod.webp',
    tagline: 'Mod PFAS – med ekstra magnesium.',
    best: 'Bedst til: maksimal beskyttelse',
    life: '1 måned · ca. 150 L pr. filter',
    brita: true,
    points: [
      'Reducerer PFAS (“evighedskemikalier”) med op til 92 %',
      'Øger magnesium-indholdet i vandet (godt for hjerte & hjerne)',
      'Reducerer også mikroplast, klor, kalk og tungmetaller (5-trins)',
      'Passer også til Brita®-kander (LAICA-Key medfølger)',
    ],
    description:
      'Bi-flux® HealthExpert giver maksimal beskyttelse. Det reducerer PFAS (“evighedskemikalier”) med op til ' +
      '92 % og øger samtidig magnesium-indholdet i vandet – godt for hjerte og hjerne. 5-trins filtrering ' +
      'reducerer også mikroplast, klor, kalk og tungmetaller. Passer også til Brita®-kander (LAICA-Key medfølger).',
    specs: [
      { label: 'Type', value: 'Bi-flux® udskiftningsfilter' },
      { label: 'Varenr.', value: 'P3M' },
      { label: 'Levetid', value: '1 måned · ca. 150 liter' },
      { label: 'Reducerer', value: 'PFAS (op til 92 %), mikroplast, klor, kalk, tungmetaller' },
      { label: 'Tilfører', value: 'Magnesium' },
      { label: 'Kompatibilitet', value: 'Laica- og Brita®-kander (LAICA-Key medfølger)' },
      { label: 'Oprindelse', value: 'Made in EU' },
    ],
  },
  {
    slug: 'fast-disk',
    pack: '3 stk. i pakken',
    price: 89,
    varenr: 'LAI-1003',
    name: 'Filter til GlaSSmart',
    titleSuffix: '3-pack',
    art: 'FAST DISK™',
    img: '/images/fast-disk-card.jpg',
    images: ['/images/fast-disk.jpg', '/images/fast-disk-pack.jpg'],
    glassmart: true,
    tagline: 'Instant-filtrering til GlaSSmart-karaflen.',
    best: 'Bedst til: GlaSSmart-glaskaraflen i køleskabet',
    life: 'Skivefilter til instant-filtrering',
    points: [
      'Filtrerer øjeblikkeligt, mens du hælder',
      'Aktivt kul-mikrofilament – forbedrer smagen og reducerer klor',
      'Bevarer mineralsalte',
      'Altid koldt, filtreret vand klar i køleskabet',
    ],
    description:
      'FAST DISK™ er Laicas skivefilter til GlaSSmart-glaskaraflen. Det aktive kul-mikrofilament filtrerer ' +
      'vandet øjeblikkeligt, mens du hælder – forbedrer smagen og reducerer klor, mens de nyttige mineralsalte ' +
      'bevares. Et bæredygtigt valg, der reducerer engangs-plastflasker med ca. 99 %. Made in EU.',
    specs: [
      { label: 'Type', value: 'Skivefilter (aktivt kul)' },
      { label: 'Passer til', value: 'GlaSSmart™-glaskaraffel' },
      { label: 'Levetid', value: 'Ca. 1 måned pr. filter (3 mdr. pr. pakke)' },
      { label: 'Reducerer', value: 'Klor · forbedrer smag og lugt' },
      { label: 'Bevarer', value: 'Nyttige mineralsalte' },
      { label: 'Oprindelse', value: 'Made in EU' },
    ],
    howTo: [
      'Skru låget af karaflen, drej det brugte filter mod uret, og tag det ud ved at trække det opad.',
      'Skyl det nye filter under rindende, koldt drikkevand i ca. 30 sekunder.',
      'Sæt det nye filter i holderen i låget ved at trykke let og dreje det med uret.',
    ],
  },
]

export const getFilter = (slug: string) => FILTRE.find((f) => f.slug === slug)
