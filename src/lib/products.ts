// ─── SHARED PRODUCT DATA ───────────────────────────────────────────────────
// Source of truth: Produkter_med_images_b2c.csv
// Used by /shop (listing) and /shop/[productId] (detail page)

export type Spec = { label: string; value: string }
export type FAQ  = { q: string; a: string }

export type Product = {
  id: string
  productNr?: string
  name: string
  tagline: string
  description: string
  longDescription?: string
  badge?: string
  category: 'vandhane' | 'bruser' | 'vandkande' | 'filtre' | 'blosgoringsanlaeg' | 'anlaeg'
  featured?: boolean
  audience?: 'privat' | 'erhverv'  // begræns til kun privat- eller kun erhvervs-shoppen
  priceExMoms?: boolean       // true = prisen er ekskl. moms (typisk erhverv)
  quoteOnly?: boolean         // true = ingen pris/køb, vis "Kontakt for info"
  addon?: boolean             // true = tilbehør, skjules fra shop-oversigt; vises kun som tilkøb på kalkanlæg-siden
  // Price
  price?: number          // DKK – privatpris (typisk inkl. moms)
  priceErhverv?: number   // DKK – erhvervs-/grossistpris (ekskl. moms), vises til indloggede erhvervskunder
  comingSoon?: boolean
  // Images
  imgSrc: string           // card thumbnail
  imgLarge?: string        // detail hero
  images?: string[]        // detail-galleri (flere vinkler) – første vises som hero
  lifestyleImage?: string  // stemningsbillede (fx moderne håndvask) på produktsiden
  lifestyleVideo?: string  // video (fx forsidens hjem-video) på produktsiden
  requiresCoupling?: boolean // filteret kræver en kobling (M22/M24) for at kunne monteres
  variants?: { id: string; label: string; sub: string }[] // fx forskellige levetider (2M/3M)
  // Key selling points (shown as icon-bullet in detail hero)
  highlights: string[]
  // Bullet feature list
  features: string[]
  // Technical specs table
  specs: Spec[]
  // FAQ for detail page
  faqs: FAQ[]
  // Use cases
  useCases: string[]
  // Shopify integration (optional)
  shopify?: { componentId: string; productId: string }
  // Stripe Payment Link (optional)
  stripePaymentLink?: string
  // Live Stripe product ID (set when fetched from Stripe at request time)
  stripeProductId?: string
}

const CWS = 'https://cleanwatersupply.dk/wp-content/uploads'

// Pris for standard montering af blødgøringsanlæg (tillæg, inkl. moms). Kan ændres frit.
export const INSTALLATION_PRICE = 2995

/** Vælger den rigtige pris til visning/kurv: erhverv ser grossistpris (ekskl. moms), privat ser privatpris. */
export function shopPrice(p: Product, erhverv: boolean): { amount?: number; exMoms: boolean } {
  if (erhverv && p.priceErhverv != null) return { amount: p.priceErhverv, exMoms: true }
  return { amount: p.price, exMoms: !!p.priceExMoms }
}

export const PRODUCTS: Product[] = [
  {
    id: 'baclyser-neo-tr-2m',
    productNr: '102785',
    name: 'Baclyser® neo TR (2M)',
    tagline: 'Engangsfilter til håndvaskarmatur – bruserudløb',
    badge: 'Medicinsk godkendt',
    category: 'vandhane',
    featured: true,
    price: 625, priceErhverv: 375,
    imgSrc:   '/images/product-tr5.jpg',
    imgLarge: '/images/product-tr5.jpg',
    description: 'Medicinsk godkendt engangsfilter til håndvask med bruserudløb. Beskytter i op til 62 dage.',
    longDescription: 'Baclyser® neo TR (2M) er et medicinsk godkendt point-of-use vandhanefilter med blomsterformet bruserudløb. Filteret stopper alle vandbårne bakterier inkl. Legionella og Pseudomonas direkte ved tappen og leverer 62 dages sikker beskyttelse.',
    highlights: ['62 dages levetid', 'Bruserudløb (TR)', 'Medicinsk godkendt'],
    features: [
      '7 log-retention mod vandbårne bakterier',
      'Blomsterformet bruserudløb (TR)',
      'Levetid op til 62 dage',
      'Quick-release montering',
      'Antibakteriel MetalSkin® 2 belægning',
    ],
    specs: [
      { label: 'Membrantype',     value: 'Flad membran, 0,2 μm' },
      { label: 'Retention',       value: '7 log-enheder' },
      { label: 'Levetid',         value: '62 dage (2M)' },
      { label: 'Udløb',           value: 'TR – bruser/rose' },
      { label: 'Max. tryk',       value: '5 bar' },
      { label: 'Max. temperatur', value: '60°C (70°C i ≤ 30 min)' },
    ],
    faqs: [
      { q: 'Hvad er forskellen på TR og TL?', a: 'TR har en blomsterformet bruserudløb; TL har en jævn laminar stråle. Filtreringen er identisk.' },
      { q: 'Hvornår skal filteret skiftes?', a: 'Efter 62 dages brug eller når flowet reduceres mærkbart.' },
    ],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller', 'Kontorer'],
    stripePaymentLink: 'https://buy.stripe.com/bJe3cubAL7L4dau6e34gg00',
  },

  {
    id: 'baclyser-neo-tr-3m',
    productNr: '102786',
    name: 'Baclyser® neo TR (3M)',
    tagline: 'Engangsfilter til håndvaskarmatur – 93 dage',
    badge: 'Medicinsk godkendt',
    category: 'vandhane',
    price: 625, priceErhverv: 425,
    imgSrc:   '/images/product-tr5.jpg',
    imgLarge: '/images/product-tr5.jpg',
    description: 'Medicinsk godkendt engangsfilter til håndvask med bruserudløb. Beskytter i op til 93 dage.',
    longDescription: 'Baclyser® neo TR (3M) er den længstlevende variant af bruserudløbsfilteret med 93 dages beskyttelse mod Legionella og andre vandbårne bakterier – ideel til professionelle anlæg med kvartalsvis service.',
    highlights: ['93 dages levetid', 'Bruserudløb (TR)', 'Medicinsk godkendt'],
    features: [
      '7 log-retention mod vandbårne bakterier',
      'Blomsterformet bruserudløb (TR)',
      'Levetid op til 93 dage',
      'Quick-release montering',
    ],
    specs: [
      { label: 'Membrantype',     value: 'Flad membran, 0,2 μm' },
      { label: 'Retention',       value: '7 log-enheder' },
      { label: 'Levetid',         value: '93 dage (3M)' },
      { label: 'Udløb',           value: 'TR – bruser/rose' },
      { label: 'Max. tryk',       value: '5 bar' },
      { label: 'Max. temperatur', value: '60°C (70°C i ≤ 30 min)' },
    ],
    faqs: [
      { q: 'Hvornår vælges 3M frem for 2M?', a: '3M-varianten er ideel til installationer med kvartalsvis service og lavere bakterielt pres.' },
    ],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller'],
    stripePaymentLink: 'https://buy.stripe.com/9B63cucEPfdwfiCdGv4gg01',
  },

  {
    id: 'baclyser-neo-tl-2m',
    productNr: '102691',
    name: 'Baclyser® neo TL (2M)',
    tagline: 'Engangsfilter med laminar udløb – 62 dage',
    badge: 'Medicinsk godkendt',
    category: 'vandhane',
    featured: true,
    price: 565, priceErhverv: 375,
    imgSrc:   '/images/product-tl6.jpg',
    imgLarge: '/images/product-tl6.jpg',
    variants: [
      { id: 'baclyser-neo-tl-2m', label: '2 måneder', sub: 'Skift ca. hver 62. dag' },
      { id: 'baclyser-neo-tl-3m', label: '3 måneder', sub: 'Skift ca. hver 93. dag' },
    ],
    description: 'Medicinsk engangsfilter til håndvask med laminart udløb. Levetid op til 62 dage.',
    longDescription: 'Baclyser® neo TL (2M) leverer en jævn laminar vandstråle og samtidig sikker filtrering af alle vandbårne bakterier – inkl. Legionella og Pseudomonas. Den medicinske godkendelse og 62 dages levetid gør den ideel til hospitaler og plejehjem.',
    highlights: ['62 dages levetid', 'Laminar udløb (TL)', 'Medicinsk godkendt'],
    features: [
      '7 log-retention mod vandbårne bakterier',
      'Laminar udløb (TL) – jævn vandstråle',
      'Levetid op til 62 dage',
      'Quick-release montering',
      'Antibakteriel MetalSkin® 2 belægning',
    ],
    specs: [
      { label: 'Membrantype',     value: 'Flad membran, 0,2 μm' },
      { label: 'Retention',       value: '7 log-enheder' },
      { label: 'Levetid',         value: '62 dage (2M)' },
      { label: 'Udløb',           value: 'TL – laminar' },
      { label: 'Max. tryk',       value: '5 bar' },
      { label: 'Max. temperatur', value: '60°C (70°C i ≤ 30 min)' },
    ],
    faqs: [
      { q: 'Hvad er forskellen på TL og TR?', a: 'TL har en jævn laminar vandstråle; TR har en blomsterformet bruser. Filtreringen er identisk.' },
    ],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller', 'Tandklinikker'],
    stripePaymentLink: 'https://buy.stripe.com/8x228q48j0iC0nI7i74gg02',
  },

  {
    id: 'baclyser-neo-tl-3m',
    productNr: '102693',
    name: 'Baclyser® neo TL (3M)',
    tagline: 'Rent, bakteriefrit vand fra hanen i hjemmet – op til 93 dage',
    badge: 'Medicinsk godkendt',
    category: 'vandhane',
    price: 625, priceErhverv: 425,
    imgSrc:   '/images/product-tl6.jpg',
    imgLarge: '/images/product-tl6.jpg',
    lifestyleImage: '/images/solution-tappested.jpg',
    lifestyleVideo: '/videos/hjem.mp4',
    requiresCoupling: true,
    variants: [
      { id: 'baclyser-neo-tl-2m', label: '2 måneder', sub: 'Skift ca. hver 62. dag' },
      { id: 'baclyser-neo-tl-3m', label: '3 måneder', sub: 'Skift ca. hver 93. dag' },
    ],
    description: 'Få rent, sikkert vand direkte fra hanen derhjemme. Filteret klikker fast på din vandhane og stopper bakterier – med en blød, behagelig vandstråle. Holder op til 93 dage.',
    longDescription: 'Med Baclyser® neo TL får du og din familie rent, bakteriefrit vand direkte fra hanen – nemt og uden at tænke over det. Vandstrålen er blød og jævn, så den er rar at bruge, når I fylder vand i glasset, skyller grøntsager eller børster tænder. Det er faktisk det samme filter, som bruges på hospitaler, så du kan være helt tryg ved vandet til hele familien – også til de mindste og til nogen med et sart helbred. Filteret holder op til 93 dage og skiftes bare ved at klikke det gamle af og et nyt på – helt uden værktøj. Bemærk: for at sætte filteret på din vandhane skal du bruge en lille kobling, der passer til din hane. Du vælger den nemt her på siden (M22 eller M24).',
    highlights: ['Rent vand direkte fra hanen', 'Blød, behagelig vandstråle', 'Samme filter som hospitaler bruger'],
    features: [
      'Stopper 99,99999 % af bakterier som Legionella og Pseudomonas',
      'Blød, behagelig vandstråle – rar at bruge til hverdag',
      'Rent vand til at drikke, lave mad og børste tænder i',
      'Skiftes på få sekunder – klik af, klik på, helt uden værktøj',
      'Holder op til 93 dage (ca. hvert kvartal)',
    ],
    specs: [
      { label: 'Beskytter mod',   value: 'Legionella, Pseudomonas m.fl.' },
      { label: 'Renhed',          value: '99,99999 % (7 log)' },
      { label: 'Holdbarhed',      value: 'Op til 93 dage' },
      { label: 'Vandstråle',      value: 'Blød, jævn (laminar)' },
      { label: 'Montering',       value: 'Klik-på via kobling (M22/M24)' },
      { label: 'Maks. temperatur', value: '60°C (70°C i ≤ 30 min)' },
    ],
    faqs: [
      { q: 'Skal jeg købe andet for at bruge filteret?', a: 'Ja – du skal bruge en lille kobling, der passer til din vandhane. Har din hane et indvendigt gevind, vælger du Coupling M22; har den et udvendigt gevind, vælger du Coupling M24. Koblingen købes én gang og bliver siddende, når du skifter filter.' },
      { q: 'Er filteret sikkert til hele familien?', a: 'Ja. Det er medicinsk godkendt og giver rent, bakteriefrit vand – også trygt for børn, ældre og personer med nedsat immunforsvar.' },
      { q: 'Hvor tit skal det skiftes?', a: 'Op til hver 93. dag (ca. hvert kvartal). Så nyder du rent vand hele tiden med minimal vedligeholdelse.' },
    ],
    useCases: ['Private hjem', 'Børnefamilier', 'Sommerhuse', 'Nedsat immunforsvar'],
    stripePaymentLink: 'https://buy.stripe.com/14A6oGeMX3uO4DYdGv4gg03',
  },

  {
    id: 'baclyser-tl-1m', productNr: '100762', name: 'Baclyser® TL (1M) – hanefilter',
    tagline: 'Medicinsk hanefilter med laminart udløb – levetid ca. 31 dage',
    badge: 'Medicinsk', category: 'vandhane', audience: 'erhverv', priceExMoms: true, price: 300,
    imgSrc: '/images/product-tl6.jpg', imgLarge: '/images/product-tl6.jpg',
    description: 'Medicinsk certificeret 0,2 µm engangsfilter til håndvaskarmatur med laminart udløb. Levetid ca. 31 dage.',
    highlights: ['0,2 µm membran', 'Laminart udløb', 'Levetid ca. 31 dage'],
    features: ['Steril barriere ved hanen', 'Tilbageholder Legionella & Pseudomonas', 'Værktøjsfri montering', 'Engangsfilter'],
    specs: [{ label: 'Membran', value: '0,2 µm' }, { label: 'Levetid', value: 'Ca. 31 dage' }, { label: 'Udløb', value: 'Laminart' }],
    faqs: [{ q: 'Hvad er forskellen på TL og TR?', a: 'TL har laminart udløb, TR har bruserudløb. Begge er medicinsk certificerede engangsfiltre.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller', 'Svømmehaller'],
  },

  {
    id: 'coupling-m22',
    productNr: '100296',
    name: 'Coupling M22',
    tagline: 'Hurtigkobling til indvendigt M22-gevind',
    category: 'vandhane',
    price: 315, priceErhverv: 300,
    imgSrc:   '/images/coupling-m22.jpg',
    imgLarge:   '/images/coupling-m22.jpg',
    description: 'Hurtigkobling til indvendigt M22-gevind. Værktøjsfri montering af Baclyser®-filtre.',
    longDescription: 'Coupling M22 er hurtigkoblingen der passer indvendige M22 IG-gevind. Den giver simpel snap-on montering af alle Baclyser® neo-filtre uden brug af værktøj og er fremstillet i kvalitetsmessing.',
    highlights: ['M22 indvendigt gevind', 'Værktøjsfri montering', 'Holdbar messing'],
    features: [
      'Passer M22 IG (indvendigt gevind)',
      'Quick-release montering – ingen værktøj',
      'Kompatibel med alle Baclyser® neo filtre',
      'Holdbar messing-konstruktion',
    ],
    specs: [
      { label: 'Type',         value: 'Hurtigkobling' },
      { label: 'Gevind',       value: 'M22 IG (indvendigt)' },
      { label: 'Materiale',    value: 'Messing' },
      { label: 'Kompatibel',   value: 'Baclyser® neo TL/TR' },
    ],
    faqs: [
      { q: 'Hvilken adapter skal jeg vælge?', a: 'Tjek dit eksisterende vandhanegevind: indvendigt M22 → Coupling M22; udvendigt M24 → Coupling M24.' },
    ],
    useCases: ['Vandhaner med indvendigt M22-gevind'],
    stripePaymentLink: 'https://buy.stripe.com/14A9AS20b8P8b2mauj4gg05',
  },

  {
    id: 'coupling-m24',
    productNr: '100298',
    name: 'Coupling M24',
    tagline: 'Hurtigkobling til udvendigt M24-gevind',
    category: 'vandhane',
    price: 315, priceErhverv: 300,
    imgSrc:   '/images/coupling-m24.jpg',
    imgLarge:   '/images/coupling-m24.jpg',
    description: 'Hurtigkobling til udvendigt M24-gevind. Værktøjsfri montering af Baclyser®-filtre.',
    longDescription: 'Coupling M24 er hurtigkoblingen til vandhaner med udvendigt M24 AG-gevind. Den giver simpel snap-on montering af alle Baclyser® neo-filtre uden brug af værktøj.',
    highlights: ['M24 udvendigt gevind', 'Værktøjsfri montering', 'Holdbar messing'],
    features: [
      'Passer M24 AG (udvendigt gevind)',
      'Quick-release montering – ingen værktøj',
      'Kompatibel med alle Baclyser® neo filtre',
      'Holdbar messing-konstruktion',
    ],
    specs: [
      { label: 'Type',         value: 'Hurtigkobling' },
      { label: 'Gevind',       value: 'M24 AG (udvendigt)' },
      { label: 'Materiale',    value: 'Messing' },
      { label: 'Kompatibel',   value: 'Baclyser® neo TL/TR' },
    ],
    faqs: [
      { q: 'Hvilken adapter skal jeg vælge?', a: 'Tjek dit eksisterende vandhanegevind: indvendigt M22 → Coupling M22; udvendigt M24 → Coupling M24.' },
    ],
    useCases: ['Vandhaner med udvendigt M24-gevind'],
    stripePaymentLink: 'https://buy.stripe.com/14AaEWcEPc1kfiC59Z4gg06',
  },

  {
    id: 'cblue-sc3',
    productNr: '102223',
    name: 'cBlue SC3 (inkl. Filter)',
    tagline: 'Krom brusehoved med udskifteligt filter',
    category: 'bruser',
    featured: true,
    price: 1120, priceErhverv: 795,
    imgSrc:   '/images/cblue-sc3-2.jpg',
    imgLarge: '/images/cblue-sc3-2.jpg',
    images:   ['/images/cblue-sc3-2.jpg', '/images/cblue-sc3-1.jpg', '/images/cblue-sc3-3.jpg', '/images/cblue-sc3-4.jpg'],
    description: 'Brusehoved i krom med udskifteligt filter. Legionella-beskyttelse i et elegant design.',
    longDescription: 'cBlue SC3 forener premium krom brusehoveddesign med en integreret hulfiber-filterpatron. Brusehovedet er æstetisk og passer alle badeværelsesmiljøer, mens den udskiftelige filterpatron sikrer kontinuerlig Legionella-beskyttelse.',
    highlights: ['Krom design', 'Udskifteligt filter', '7 log Legionella-beskyttelse'],
    features: [
      '99,99999% (7 log) retention mod Legionella',
      'Højt flow: 15 l/min ved 5 bar',
      'Æstetisk krom finish – passer alle badeværelser',
      'Udskiftelig filterpatron – behold brusehovedet',
      'Simpel G½" montering',
    ],
    specs: [
      { label: 'Membrantype',     value: 'Hulfiber, 0,2 μm' },
      { label: 'Retention',       value: '7 log-enheder' },
      { label: 'Flow (5 bar)',    value: '15 l/min' },
      { label: 'Levetid',         value: '3 måneder pr. patron' },
      { label: 'Tilslutning',     value: 'G½"' },
      { label: 'Max. tryk',       value: '5 bar' },
      { label: 'Max. temperatur', value: '60°C (70°C i ≤ 30 min)' },
    ],
    faqs: [
      { q: 'Skal hele brusehovedet udskiftes?', a: 'Nej – kun den indvendige filterpatron skiftes. Selve brusehovedet beholdes.' },
      { q: 'Hvor ofte skiftes patronen?', a: 'Cirka hvert 3. måned afhængigt af forbrug og vandkvalitet.' },
    ],
    useCases: ['Hoteller', 'Private hjem', 'B&B', 'Feriehuse'],
    stripePaymentLink: 'https://buy.stripe.com/28E7sKdIT3uO5I245V4gg04',
  },

  {
    id: 'cblue-sc3-filter',
    productNr: '102146',
    name: 'Cartridge SC3 – filter til cBlue SC3',
    tagline: 'Nyt udskiftningsfilter til cBlue SC3 brusehoved – 3 måneders levetid',
    category: 'bruser',
    price: 625, priceErhverv: 550,
    imgSrc:   '/images/cblue-sc3-filter.jpg',
    imgLarge: '/images/cblue-sc3-filter.jpg',
    images:   ['/images/cblue-sc3-filter.jpg', '/images/cblue-sc3-filter-2.jpg', '/images/cblue-sc3-filter-membrane.jpg'],
    description: 'Løst udskiftningsfilter (hulfiberpatron) til cBlue SC3 brusehovedet. Bevarer Legionella-beskyttelsen – behold selve brusehovedet.',
    longDescription: 'Udskiftelig filterpatron til cBlue SC3-brusehovedet. Når patronen er opbrugt efter ca. 3 måneder, skiftes kun selve filteret – brusehovedet beholdes. Hulfibermembranen sikrer fortsat 7 log Legionella-beskyttelse direkte ved tappestedet.',
    highlights: ['Passer til cBlue SC3', '3 måneders levetid', '7 log Legionella-beskyttelse'],
    features: [
      '99,99999% (7 log) retention mod Legionella',
      'Hulfibermembran 0,2 μm',
      'Behold brusehovedet – skift kun patronen',
      'Levetid ca. 3 måneder pr. patron',
    ],
    specs: [
      { label: 'Membrantype', value: 'Hulfiber, 0,2 μm' },
      { label: 'Retention',   value: '7 log-enheder' },
      { label: 'Levetid',     value: '3 måneder pr. patron' },
      { label: 'Passer til',  value: 'cBlue SC3 brusehoved' },
      { label: 'Varenummer',  value: '102146' },
    ],
    faqs: [
      { q: 'Hvilket brusehoved passer filteret til?', a: 'Det passer til cBlue SC3-brusehovedet.' },
      { q: 'Hvor ofte skal det skiftes?', a: 'Cirka hvert 3. måned afhængigt af forbrug og vandkvalitet.' },
    ],
    useCases: ['Hoteller', 'Private hjem', 'B&B', 'Feriehuse'],
  },

  {
    id: 'as-tube',
    productNr: '101466',
    name: 'AS Tube',
    tagline: 'Inline hulfibermembran patron',
    category: 'bruser',
    price: 1620, priceErhverv: 1195,
    imgSrc:   'https://technolab.nl/wp-content/uploads/2024/04/AS-TUBE-Cartridge-MF5.jpg',
    imgLarge: 'https://technolab.nl/wp-content/uploads/2024/04/AS-TUBE-Cartridge-MF5.jpg',
    description: 'Udskifteligt inline-filter med hulfibermembran til professionelle installationer.',
    longDescription: 'AS Tube er en udskiftelig hulfibermembran-patron til inline filterinstallationer. Den leverer dokumenteret 7 log-retention og er valideret til medicinsk og hospitalsbrug.',
    highlights: ['Hulfibermembran 0,2 μm', '7 log retention', 'Til professionelle anlæg'],
    features: [
      'Hulfibermembran til inline installation',
      'Dokumenteret 7 log-retention',
      'Udskiftelig patron',
      'Kompatibel med termisk og kemisk desinfektion',
    ],
    specs: [
      { label: 'Membrantype',     value: 'Hulfiber, 0,2 μm' },
      { label: 'Retention',       value: '7 log-enheder' },
      { label: 'Type',            value: 'Inline udskiftelig patron' },
      { label: 'Max. tryk',       value: '5 bar' },
      { label: 'Max. temperatur', value: '60°C (70°C i ≤ 30 min)' },
    ],
    faqs: [
      { q: 'Hvor bruges AS Tube?', a: 'I professionelle inline-installationer på hospitaler, dialyseafdelinger og rene rum.' },
    ],
    useCases: ['Hospitaler', 'Dialyse', 'Rene rum', 'Industri'],
    stripePaymentLink: 'https://buy.stripe.com/7sY00igV58P84DY8mb4gg0c',
  },

  {
    id: 'cartridge-mf5', productNr: '101471', name: 'Cartridge MF5 – patron til AS Tube',
    tagline: 'Udskiftningspatron (hulfibermembran) til AS Tube-filterhus',
    badge: 'Udskiftningsfilter', category: 'bruser', audience: 'erhverv', priceExMoms: true, price: 795,
    imgSrc: '/images/mf5-cartridge.jpg', imgLarge: '/images/mf5-cartridge.jpg',
    description: 'Udskiftningspatron med hulfibermembran til AS Tube-filterhuset. Tilbageholder bakterier og partikler ved central indføring.',
    highlights: ['Hulfibermembran', 'Til AS Tube', 'Udskiftningspatron'],
    features: ['Passer AS Tube-filterhus', 'Tilbageholder bakterier og partikler', 'Til point-of-entry'],
    specs: [{ label: 'Type', value: 'Hulfibermembran-patron' }, { label: 'Passer til', value: 'AS Tube (101466)' }],
    faqs: [{ q: 'Hvad passer den til?', a: 'MF5 er udskiftningspatronen til AS Tube-filterhuset.' }],
    useCases: ['Hospitaler', 'Hoteller', 'Industri', 'Bygninger med eget vandsystem'],
  },

  {
    id: 'cartridge-sc3',
    productNr: '101471',
    audience: 'privat',
    name: 'Cartridge MF5 – filter til AS Tube',
    tagline: 'Nyt filter til stålfilterhus SC3 (AS Tube) – 3 måneders levetid',
    category: 'bruser',
    price: 1120,
    imgSrc:   '/images/cartridge-sc3.jpg',
    imgLarge: '/images/cartridge-sc3.jpg',
    description: 'Løst udskiftningsfilter (MF5-patron med hulfibermembran) til AS Tube stålfilterhuset (SC3). Bevarer beskyttelsen – behold selve filterhuset.',
    longDescription: 'Udskiftelig MF5-filterpatron til AS Tube stålfilterhuset (SC3). Når patronen er opbrugt efter ca. 3 måneder, skiftes kun selve filteret – stålfilterhuset beholdes. Hulfibermembranen sikrer fortsat effektiv beskyttelse direkte ved tappestedet.',
    highlights: ['Passer til AS Tube (stålfilterhus SC3)', '3 måneders levetid', 'Hulfibermembran 0,2 μm'],
    features: [
      'Hulfibermembran 0,2 μm',
      'Behold stålfilterhuset – skift kun patronen',
      'Levetid ca. 3 måneder pr. patron',
      'Effektiv tilbageholdelse af bakterier ved tappestedet',
    ],
    specs: [
      { label: 'Membrantype', value: 'Hulfiber, 0,2 μm' },
      { label: 'Levetid',     value: '3 måneder pr. patron' },
      { label: 'Passer til',  value: 'AS Tube stålfilterhus (SC3)' },
      { label: 'Varenummer',  value: '101471' },
    ],
    faqs: [
      { q: 'Hvilket filterhus passer patronen til?', a: 'Den passer til AS Tube stålfilterhuset (SC3).' },
      { q: 'Hvor ofte skal det skiftes?', a: 'Cirka hvert 3. måned afhængigt af forbrug og vandkvalitet.' },
    ],
    useCases: ['Hoteller', 'Private hjem', 'B&B', 'Feriehuse'],
  },

  {
    id: 'brusehoved-filter-acf',
    productNr: 'WDBruser',
    audience: 'privat',
    name: 'Brusehoved med vandfilter – komplet (inkl. børste & svamp)',
    tagline: 'Renser bruservandet for klor, rust & urenheder – komplet sæt med ACF-filter, børste og svamp',
    badge: 'Brusehoved',
    category: 'bruser',
    featured: true,
    price: 525,
    imgSrc:   '/images/product-kalkbruser.jpg',
    imgLarge: '/images/product-kalkbruser.jpg',
    description: 'Brusehoved med vandfilter, der renser bruservandet for klor, rust og urenheder. Komplet sæt med filter, børste og svamp.',
    longDescription: 'Bruservand indeholder ofte klor, rust, bundfald og tungmetaller. Når du tager et varmt bad, forstøves vandet til en fin damp, du trækker ned i lungerne, samtidig med at hud og hår er i direkte kontakt med vandet – og netop klor og urenheder er med til at tørre hud og hår ud. Dette brusehoved har et indbygget ACF-filter (aktivt kul-fiber), der fjerner klor, rust, bundfald og tungmetaller fra vandet, så badet bliver mildere mod hud og hår og renere at trække vejret i. Du behøver hverken VVS’er eller et centralt filter: brusehovedet skrues direkte på dit eksisterende armatur, og filteret skiftes på under et minut uden værktøj. Vil du have ekstra effekt, kan du skifte til et ACF + C-vitamin-filter (frisk og mildt mod hud og hår) eller et ACF + kalkhæmmer-filter (mindsker kalkens påvirkning). Pakken indeholder brusehoved, et ACF-filter samt børste og svamp, og hele løsningen er godkendt til bakteriefrit vand.',
    highlights: ['Fjerner klor, rust & tungmetaller', 'Mildere mod hud & hår', 'Nem og enkel montering', 'Inkl. børste, svamp & ACF-filter'],
    features: [
      'Renser bruservandet for klor, rust, bundfald og tungmetaller',
      'Mildere mod hud og hår – og renere damp at trække vejret i',
      'Skrues direkte på dit armatur – ingen VVS’er eller centralt filter nødvendigt',
      'Værktøjsfri filterudskiftning på under et minut',
      'Kan bruges med flere filtertyper – ACF, ACF + C-vitamin eller ACF + kalkhæmmer',
      'Pakke: brusehoved, ACF-filter, børste og svamp',
      'Godkendt til bakteriefrit vand',
    ],
    specs: [
      { label: 'Indhold',    value: 'Brusehoved, børste, svamp, ACF-filter' },
      { label: 'Filtertype', value: 'ACF (aktivt kul-fiber)' },
      { label: 'Filterlevetid', value: 'Ca. 2-3 måneder' },
      { label: 'Vægt',       value: '1,2 kg' },
    ],
    faqs: [
      { q: 'Hvorfor skal jeg filtrere bruservandet?', a: 'Når du bader, forstøves det varme vand til en fin damp, du indånder, og hud og hår er i direkte kontakt med vandet. Klor og urenheder kan tørre hud og hår ud. Filteret reducerer klor, rust, bundfald og tungmetaller, så badet føles mildere og renere.' },
      { q: 'Skal jeg bruge en VVS’er for at montere det?', a: 'Nej. Brusehovedet skrues direkte på dit eksisterende slangearmatur som en helt almindelig håndbruser – ingen VVS’er nødvendig.' },
      { q: 'Hjælper det mod kalk?', a: 'Det medfølgende ACF-filter renser vandet for klor, rust, bundfald og tungmetaller, men fjerner ikke kalk. Vil du gøre noget ved kalken, kan du skifte til vores ACF + kalkhæmmer-filter, der hjælper med at reducere uønskede stoffer og samtidig mindske kalkens påvirkning. Bemærk, at kalken stadig er i vandet – den sætter sig bare mindre. Skal kalken fjernes helt, kræver det et blødgøringsanlæg.' },
      { q: 'Hvor ofte skal filteret skiftes?', a: 'ACF-filteret har en levetid på ca. 2-3 måneder. Du skifter det nemt selv uden værktøj.' },
      { q: 'Hvordan skifter jeg filteret?', a: 'Sluk for vandet, skru bunden af brusehovedet, træk det gamle filter ud, monter det nye med pakningen opad, skru bunden på og skyl igennem i 1–2 minutter.' },
    ],
    useCases: ['Private hjem', 'Lejligheder', 'Hvor centralt filter ikke er muligt'],
  },

  {
    id: 'brusehoved-til-filter',
    productNr: 'WDbrusehoved',
    audience: 'privat',
    name: 'Brusehoved med vandfilter',
    tagline: 'Renser bruservandet for klor, rust & urenheder – inkl. ACF-filter',
    badge: 'Brusehoved',
    category: 'bruser',
    price: 499,
    imgSrc:   '/images/product-brusehoved-sort.jpg',
    imgLarge: '/images/product-brusehoved-sort.jpg',
    description: 'Brusehoved med vandfilter, der renser bruservandet for klor, rust og urenheder. Inkl. filter – uden børste og svamp.',
    longDescription: 'Et brusehoved med filterfunktion, hvis du vil reducere urenheder, når du bader, men ikke har mulighed for et centralt filter. Brusehovedet kan bruges med flere filtertyper, så du kan vælge den løsning, der passer bedst til dit vand. Udover det medfølgende ACF-filter kan du tilvælge ACF + kalkhæmmer eller ACF + C-vitamin. Pakken indeholder brusehoved og et ACF-filter (uden børste og svamp).',
    highlights: ['Inkl. brusehoved + ACF-filter', 'Kan bruges med flere filtertyper', 'Godkendt til bakteriefrit vand'],
    features: [
      'Indeholder brusehoved og ACF-filter',
      'Kan bruges med flere filtertyper – fx ACF + kalkhæmmer eller ACF + C-vitamin',
      'Reducerer urenheder i bruservandet',
      'Nem, værktøjsfri filterudskiftning',
      'Godkendt til bakteriefrit vand',
    ],
    specs: [
      { label: 'Indhold',    value: 'Brusehoved + ACF-filter (uden børste og svamp)' },
      { label: 'Filtertype', value: 'ACF (aktivt kul-fiber)' },
      { label: 'Vægt',       value: '0,9 kg' },
    ],
    faqs: [
      { q: 'Følger der et filter med?', a: 'Ja, der følger et ACF-filter med. Denne pakke er uden børste og svamp – vil du have dem med, så vælg "Brusehoved med filter (inkl. børste, svamp & ACF-filter)".' },
      { q: 'Hvordan skifter jeg filteret?', a: 'Sluk for vandet, skru bunden af brusehovedet (mod uret), træk det gamle filter ud, monter det nye med pakningen opad, skru bunden på håndfast og skyl igennem i 1-2 minutter.' },
    ],
    useCases: ['Private hjem', 'Lejligheder', 'Hvor centralt filter ikke er muligt'],
  },

  {
    id: 'brusefilter-acf',
    productNr: 'WDACF',
    audience: 'privat',
    name: 'Udskiftningsfilter til brusehoved',
    tagline: 'Aktivt kul-filter – renser bruservandet for klor, rust & urenheder',
    badge: 'Udskiftningsfilter',
    category: 'bruser',
    price: 64,
    imgSrc:   '/images/product-acf-filter.jpg',
    imgLarge: '/images/product-acf-filter.jpg',
    description: 'Udskifteligt filter med aktivt kul. Fjerner klor, rust, bundfald og tungmetaller fra bruservandet.',
    longDescription: 'Et udskifteligt ACF-filter (aktivt kul-fiber) til brusehovedet. Det fjerner effektivt bundfald, rust, rester af klor og tungmetaller fra vandet. Filteret har en levetid på ca. 2-3 måneder, hvorefter det nemt udskiftes med et nyt.',
    highlights: ['Fjerner klor, rust & tungmetaller', 'Levetid ca. 2-3 måneder', 'Godkendt til bakteriefrit vand'],
    features: [
      'Fjerner bundfald, rust, klorrester og tungmetaller',
      'Passer vores brusehoved med filter',
      'Levetid ca. 2-3 måneder',
      'Nem, værktøjsfri udskiftning',
      'Godkendt til bakteriefrit vand',
    ],
    specs: [
      { label: 'Filtertype', value: 'ACF (aktivt kul-fiber)' },
      { label: 'Levetid',    value: 'Ca. 2-3 måneder' },
      { label: 'Mål',        value: 'Længde 150 mm · Ø 30 mm' },
      { label: 'Vægt',       value: '0,075 kg' },
    ],
    faqs: [
      { q: 'Hvor ofte skal filteret skiftes?', a: 'Filteret har en levetid på ca. 2-3 måneder. Skift det derefter med et nyt udskiftningsfilter.' },
      { q: 'Hvordan skifter jeg filteret?', a: 'Sluk for vandet, skru bunden af brusehovedet (mod uret), træk det gamle filter ud, monter det nye med pakningen opad, skru bunden på håndfast og skyl igennem i 1-2 minutter.' },
    ],
    useCases: ['Private hjem', 'Lejligheder'],
  },

  {
    id: 'brusefilter-acf-vitamin-c',
    productNr: 'WDACF+C',
    audience: 'privat',
    name: 'Udskiftningsfilter til brusehoved + C-vitamin',
    tagline: 'Aktivt kul med C-vitamin – ekstra mildt mod hud & hår',
    badge: 'Udskiftningsfilter',
    category: 'bruser',
    price: 69,
    imgSrc:   '/images/product-acf-vitamin-c.jpg',
    imgLarge: '/images/product-acf-vitamin-c.jpg',
    description: 'Udskifteligt filter med aktivt kul + C-vitamin. Renser vandet og føles ekstra mildt mod hud og hår.',
    longDescription: 'Et udskifteligt ACF-filter (aktivt kul-fiber) tilsat C-vitamin. Det aktive kul fjerner bundfald, rust, klorrester og tungmetaller, mens C-vitaminet (ascorbinsyre) giver en ekstra "frisk" filterløsning, som mange foretrækker til hud og hår. Levetid ca. 2-3 måneder.',
    highlights: ['Aktivt kul + C-vitamin', 'Frisk – mange foretrækker den til hud & hår', 'Levetid ca. 2-3 måneder'],
    features: [
      'Fjerner bundfald, rust, klorrester og tungmetaller',
      'Tilsat C-vitamin for en ekstra frisk filterløsning',
      'Mange foretrækker den til hud og hår',
      'Passer vores brusehoved med filter',
      'Nem, værktøjsfri udskiftning',
    ],
    specs: [
      { label: 'Filtertype', value: 'ACF + C-vitamin' },
      { label: 'Levetid',    value: 'Ca. 2-3 måneder' },
      { label: 'Mål',        value: 'Længde 150 mm · Ø 30 mm' },
      { label: 'Vægt',       value: '0,075 kg' },
    ],
    faqs: [
      { q: 'Hvad gør C-vitaminet?', a: 'C-vitamin (ascorbinsyre) giver en ekstra "frisk" filterløsning, som mange foretrækker til hud og hår.' },
      { q: 'Hvor ofte skal filteret skiftes?', a: 'Filteret har en levetid på ca. 2-3 måneder.' },
    ],
    useCases: ['Private hjem', 'Følsom hud'],
  },

  {
    id: 'brusefilter-acf-amino-acid',
    productNr: 'WDACF+A',
    audience: 'privat',
    name: 'Udskiftningsfilter til brusehoved + kalkhæmmer',
    tagline: 'Aktivt kul med kalkhæmmer – mindsker kalkens påvirkning af hud, hår & armatur',
    badge: 'Udskiftningsfilter',
    category: 'bruser',
    price: 69,
    imgSrc:   '/images/product-acf-amino-acid.jpg',
    imgLarge: '/images/product-acf-amino-acid.jpg',
    description: 'Udskifteligt filter med aktivt kul + kalkhæmmer. Renser vandet og mindsker kalkens påvirkning.',
    longDescription: 'Et udskifteligt ACF-filter (aktivt kul-fiber) tilsat en aminosyre-baseret kalkhæmmer fremstillet af æblesyre. Det aktive kul fjerner bundfald, rust, klorrester og tungmetaller, mens kalkhæmmeren mindsker kalkens påvirkning af hud, hår og armatur. Levetid ca. 2-3 måneder.',
    highlights: ['Aktivt kul + aminosyre-kalkhæmmer', 'Mindsker kalkens påvirkning', 'Levetid ca. 2-3 måneder'],
    features: [
      'Fjerner bundfald, rust, klorrester og tungmetaller',
      'Aminosyre-kalkhæmmer (æblesyre) mindsker kalkens påvirkning',
      'Mildere mod hud, hår og armatur',
      'Passer vores brusehoved med filter',
      'Nem, værktøjsfri udskiftning',
    ],
    specs: [
      { label: 'Filtertype', value: 'ACF + aminosyre-kalkhæmmer' },
      { label: 'Levetid',    value: 'Ca. 2-3 måneder' },
      { label: 'Mål',        value: 'Længde 150 mm · Ø 30 mm' },
      { label: 'Vægt',       value: '0,075 kg' },
    ],
    faqs: [
      { q: 'Hvad gør kalkhæmmeren?', a: 'Den aminosyre-baserede kalkhæmmer (æblesyre) mindsker kalkens påvirkning, så vandet føles mildere mod hud, hår og armatur – især nyttigt ved hårdt vand.' },
      { q: 'Hvor ofte skal filteret skiftes?', a: 'Filteret har en levetid på ca. 2-3 måneder.' },
    ],
    useCases: ['Private hjem', 'Områder med hårdt vand'],
  },

  {
    id: 'baclyser-s-1m', productNr: '100761', name: 'Baclyser® S (1M) – brusefilter',
    tagline: 'Medicinsk certificeret brusefilter – levetid ca. 31 dage',
    badge: 'Medicinsk', category: 'bruser', audience: 'erhverv', priceExMoms: true, price: 325,
    imgSrc: '/images/baclyser-s.jpg', imgLarge: '/images/baclyser-s.jpg',
    description: 'Medicinsk certificeret 0,2 µm brusefilter, der danner en steril barriere mod Legionella og Pseudomonas ved bruseren. Levetid ca. 1 måned.',
    highlights: ['0,2 µm membran', 'Medicinsk certificeret', 'Levetid ca. 31 dage'],
    features: ['Steril barriere ved bruseren', 'Tilbageholder Legionella & Pseudomonas', 'Værktøjsfri montering', 'Engangsfilter'],
    specs: [{ label: 'Membran', value: '0,2 µm' }, { label: 'Levetid', value: 'Ca. 31 dage' }, { label: 'Type', value: 'Brusefilter (medicinsk)' }],
    faqs: [{ q: 'Hvor længe holder filteret?', a: 'Baclyser S (1M) har en levetid på ca. 31 dage, hvorefter det udskiftes.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller', 'Svømmehaller'],
  },

  {
    id: 'baclyser-s-2m', productNr: '100745', name: 'Baclyser® S (2M) – brusefilter',
    tagline: 'Medicinsk certificeret brusefilter – levetid ca. 62 dage',
    badge: 'Medicinsk', category: 'bruser', audience: 'erhverv', priceExMoms: true, price: 375,
    imgSrc: '/images/baclyser-s.jpg', imgLarge: '/images/baclyser-s.jpg',
    description: 'Medicinsk certificeret 0,2 µm brusefilter med en steril barriere mod Legionella og Pseudomonas ved bruseren. Levetid ca. 2 måneder.',
    highlights: ['0,2 µm membran', 'Medicinsk certificeret', 'Levetid ca. 62 dage'],
    features: ['Steril barriere ved bruseren', 'Tilbageholder Legionella & Pseudomonas', 'Værktøjsfri montering', 'Engangsfilter'],
    specs: [{ label: 'Membran', value: '0,2 µm' }, { label: 'Levetid', value: 'Ca. 62 dage' }, { label: 'Type', value: 'Brusefilter (medicinsk)' }],
    faqs: [{ q: 'Hvor længe holder filteret?', a: 'Baclyser S (2M) har en levetid på ca. 62 dage.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller', 'Svømmehaller'],
  },

  {
    id: 'baclyser-s-3m', productNr: '102143', name: 'Baclyser® neo S (3M) – brusefilter',
    tagline: 'Medicinsk certificeret brusefilter – levetid ca. 93 dage',
    badge: 'Medicinsk', category: 'bruser', audience: 'erhverv', priceExMoms: true, price: 450,
    imgSrc: '/images/baclyser-s.jpg', imgLarge: '/images/baclyser-s.jpg',
    description: 'Medicinsk certificeret 0,2 µm brusefilter med lang levetid (ca. 3 måneder). Steril barriere mod Legionella og Pseudomonas ved bruseren.',
    highlights: ['0,2 µm membran', 'Medicinsk certificeret', 'Levetid ca. 93 dage'],
    features: ['Steril barriere ved bruseren', 'Tilbageholder Legionella & Pseudomonas', 'Lang levetid', 'Engangsfilter'],
    specs: [{ label: 'Membran', value: '0,2 µm' }, { label: 'Levetid', value: 'Ca. 93 dage' }, { label: 'Type', value: 'Brusefilter (medicinsk)' }],
    faqs: [{ q: 'Hvor længe holder filteret?', a: 'Baclyser neo S (3M) har en levetid på ca. 93 dage.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller', 'Svømmehaller'],
  },

  {
    id: 'as-wallshower-4m', productNr: '101443', name: 'AS Wallshower (4M)',
    tagline: 'Vægmonteret medicinsk brusefilter – levetid op til 4 måneder',
    badge: 'Medicinsk', category: 'bruser', audience: 'erhverv', priceExMoms: true, price: 795,
    imgSrc: '/images/as-wallshower.jpg', imgLarge: '/images/as-wallshower.jpg',
    description: 'Vægmonteret brusefilter med 0,2 µm membran og lang levetid (op til 4 måneder) – til faste installationer med skærpede hygiejnekrav.',
    highlights: ['0,2 µm membran', 'Vægmonteret', 'Levetid op til 4 mdr.'],
    features: ['Til faste bruserinstallationer', 'Tilbageholder Legionella & Pseudomonas', 'Lang levetid', 'Medicinsk certificeret'],
    specs: [{ label: 'Membran', value: '0,2 µm' }, { label: 'Levetid', value: 'Op til 4 måneder' }, { label: 'Montering', value: 'Vægmonteret' }],
    faqs: [{ q: 'Hvor monteres den?', a: 'AS Wallshower monteres fast på væggen i bruseren og beskytter i op til 4 måneder.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller', 'Svømmehaller'],
  },

  {
    id: 'vandfilter-predator',
    productNr: '11101',
    name: 'Filtervandkande',
    tagline: 'Laica filterkande med Bi-flux® + MikroPLASTIK-STOP – 3 liter',
    category: 'vandkande',
    price: 275, priceErhverv: 300,
    imgSrc:   'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915',
    imgLarge: 'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915',
    description: 'Laica filterkande med 2-trins filtrering. Reducerer over 99,99 % mikroplast og fjerner klor, tungmetaller og pesticider. 3 liter, Made in EU.',
    longDescription: 'Filterkande fra Laica med patenteret modulært filtersystem i to trin. Bi-flux®-filteret reducerer klor, tungmetaller, pesticider, herbicider, trihalomethaner og andre kemiske forurenende stoffer – og bevarer samtidig vandets vigtige mineraler. MikroPLASTIK-STOP-filteret reducerer over 99,99 % af mikroplasten og filtrerer partikler ned til 0,1 mikron, hvilket også blokerer mikroorganismer som Legionella- og Coli-bakterier. Kanden rummer 3 liter (2 liter filtreret vand), har et praktisk Quick-Fill-låg og en analog timer, der minder dig om filterskift. Made in EU.',
    highlights: ['Reducerer >99,99 % mikroplast', 'Blokerer Legionella & Coli (>0,1 mikron)', '3 liter · Made in EU'],
    features: [
      'Bi-flux®: reducerer klor, tungmetaller, pesticider, herbicider og trihalomethaner',
      'MikroPLASTIK-STOP: reducerer over 99,99 % af mikroplast',
      'Filtrerer partikler ned til 0,1 mikron – blokerer mikroorganismer som Legionella og Coli',
      'Bevarer vandets vigtige mineraler',
      'Analog timer til filterskift · praktisk Quick-Fill-låg',
    ],
    specs: [
      { label: 'Kapacitet',          value: '3 liter total / 2 liter filtreret' },
      { label: 'Filtrering',         value: 'Bi-flux® + MikroPLASTIK-STOP' },
      { label: 'Mikroplast-reduktion', value: 'Over 99,99 %' },
      { label: 'Partikelfiltrering', value: 'Ned til 0,1 mikron' },
      { label: 'Inkluderet',         value: '3 Bi-flux®-patroner + 1 MikroPLASTIK-STOP' },
      { label: 'Oprindelse',         value: 'Made in EU' },
    ],
    faqs: [
      { q: 'Hvad reducerer kanden?', a: 'Bi-flux® reducerer klor, tungmetaller, pesticider og herbicider, mens MikroPLASTIK-STOP reducerer over 99,99 % af mikroplast og blokerer mikroorganismer som Legionella og Coli (partikler over 0,1 mikron).' },
      { q: 'Hvad følger med?', a: 'Kanden leveres med 3 Bi-flux®-patroner og 1 MikroPLASTIK-STOP-filter.' },
    ],
    useCases: ['Private hjem', 'Kontorer', 'Børnefamilier'],
    stripePaymentLink: 'https://buy.stripe.com/00w28q9sD9Tcb2m6e34gg0b',
  },

  {
    id: 'vandfilter-biflux-reservedel',
    productNr: '11103',
    name: 'Løst filter til vandkande',
    tagline: 'Udskiftningspatron – 150 liters levetid',
    category: 'vandkande',
    price: 60, priceErhverv: 50,
    imgSrc:   '/images/product-filter-udskift.jpg',
    imgLarge: '/images/product-filter-udskift.jpg',
    description: 'Original Bi-flux®-reservedel til vandkande. Fjerner kalk, klor og urenheder. Levetid 150 L.',
    longDescription: 'Bi-flux® universal filterpatron passer i de fleste standard vandkander. Den 6-trins filtrering kombinerer aktivt kul og ionbytning og leverer 150 liter renset vand pr. patron.',
    highlights: ['Universal Bi-flux®', '150 liters levetid', 'Snap-on montering'],
    features: [
      'Original Bi-flux® 6-trins filtrering',
      'Fjerner: kalk, klor, tungmetaller, mikroplast',
      'Bevarer mineraler: calcium, magnesium, kalium',
      'Levetid: ca. 150 liter',
      'Snap-on – ingen værktøj',
    ],
    specs: [
      { label: 'Type',         value: 'Bi-flux® reservedel' },
      { label: 'Kapacitet',    value: '150 liter' },
      { label: 'Kompatibel',   value: 'Universal vandkande-fitting' },
    ],
    faqs: [
      { q: 'Passer patronen i alle kander?', a: 'Den passer i de fleste standard vandkander med universal-fitting.' },
    ],
    useCases: ['Private hjem', 'Kontorer'],
    stripePaymentLink: 'https://buy.stripe.com/4gM5kC20b9Tc3zU8mb4gg0a',
  },

  {
    id: 'mikroplastik-stop-filter',
    productNr: 'DUF1P00',
    name: 'MikroPLASTIK-STOP™ filter (6 stk.)',
    tagline: 'Udskiftningsfilter til filterkanden – levetid op til 1000 liter',
    category: 'vandkande',
    imgSrc:   'https://www.laica.com/wp-content/uploads/filtro-mikroplastik-stop-laica.jpg',
    imgLarge: 'https://www.laica.com/wp-content/uploads/filtro-mikroplastik-stop-laica.jpg',
    description: 'Udskiftningsfilter til Laica MikroPLASTIK-STOP-kande. Blokerer over 99,5 % mikroplast. Levetid op til 1000 L. 6 stk.',
    longDescription: 'MikroPLASTIK-STOP™ er udskiftningsfilteret til Laicas MikroPLASTIK-STOP filterkande. Det blokerer over 99,5 % af mikroplast med en størrelse ≥ 0,1 mikron i postevandet, og for partikler ≥ 1 mikron er reduktionen ≥ 99,99 %. Effektiviteten er testet af uafhængige, akkrediterede laboratorier i Tyskland og Italien. Filteret er BPA-frit og har en levetid på op til 1000 liter afhængigt af vandets kvalitet. Leveres i pakke med 6 filtre.',
    highlights: ['Blokerer >99,5 % mikroplast', 'Levetid op til 1000 liter', 'BPA-fri · 6 stk. i pakken'],
    features: [
      'Blokerer over 99,5 % af mikroplast (≥ 0,1 μm)',
      'For partikler ≥ 1 μm: ≥ 99,99 % reduktion',
      'Testet af akkrediterede laboratorier i Tyskland og Italien',
      'BPA-fri',
      'Levetid op til 1000 liter pr. filter',
    ],
    specs: [
      { label: 'Type',     value: 'Udskiftningsfilter (reservedel)' },
      { label: 'Levetid',  value: 'Op til 1000 liter' },
      { label: 'Pakke',    value: '6 MikroPLASTIK-STOP™ filtre' },
      { label: 'Mål',      value: '72 × 55 × 55 mm' },
      { label: 'Vægt',     value: '66 g' },
      { label: 'Vare-nr.', value: 'DUF1P00' },
    ],
    faqs: [
      { q: 'Hvilken kande passer filteret til?', a: 'Det passer til Laicas MikroPLASTIK-STOP filterkande.' },
      { q: 'Hvor længe holder et filter?', a: 'Op til 1000 liter afhængigt af vandkvaliteten. Filteret stopper, når fibrenes porer er blokeret.' },
    ],
    useCases: ['Private hjem', 'Kontorer'],
  },

  {
    id: 'filter-housing',
    productNr: '501428',
    name: 'Filter Housing',
    tagline: 'Filterhus til rørledninger',
    category: 'filtre',
    price: 500, priceErhverv: 475,
    imgSrc:   '/images/filter-housing.jpg',
    imgLarge: '/images/filter-housing.jpg',
    description: 'Universelt filterhus til rørledning. Passer standard 10"-filterpatroner.',
    longDescription: 'Filter Housing er det alsidige filterhus til rørledningsmonterede filtre. Det passer alle standard 10" patroner – kulfiltre, kalkfiltre eller mikrofiltre – og er solidt bygget til driftstryk op til 8 bar.',
    highlights: ['Standard 10" patroner', 'Op til 8 bar drift', 'Hurtig serviceadgang'],
    features: [
      'Kompatibel med alle standard 10" filterpatroner',
      'Nem patronudskiftning',
      'Gennemsigtig bowl – visuelt check af filterstatus',
      'Fødevaregodkendte materialer',
    ],
    specs: [
      { label: 'Patronstørrelse', value: '10"' },
      { label: 'Tilslutning',     value: '3/4" eller 1" BSP' },
      { label: 'Max. tryk',       value: '8 bar' },
      { label: 'Max. temperatur', value: '52°C' },
      { label: 'Materiale',       value: 'Fødevaregodkendt plast + rustfri stål' },
    ],
    faqs: [
      { q: 'Hvilke patroner passer i huset?', a: 'Alle standard 10" patroner – inkl. DualStage MF 10-CL og Aktivt Kulblokfilter 10-CL.' },
    ],
    useCases: ['Private hjem', 'Kontorer', 'Restauranter'],
    stripePaymentLink: 'https://buy.stripe.com/3cI6oG48jaXg8UecCr4gg07',
  },

  {
    id: 'dualstage-mf-10-cl',
    productNr: '501009',
    name: 'DualStage MF 10-CL',
    tagline: 'Tostadigt filter – smag, sikkerhed & hygiejne',
    category: 'filtre',
    featured: true,
    price: 749, priceErhverv: 875,
    imgSrc:   '/images/dualstage-mf-10cl.jpg',
    imgLarge: '/images/dualstage-mf-10cl.jpg',
    description: 'Tostadigt filter: bedre smag og lugt, fjerner tungmetaller og medicinrester, mikrobiologisk sikkert.',
    longDescription: 'DualStage MF 10-CL er det alsidige tostadie-filter der i ét gennemløb forbedrer smag og lugt, fjerner tungmetaller og medicinrester og leverer mikrobiologisk sikkerhed via en mikrofiltermembran.',
    highlights: ['2-i-1: kulblok + membran', 'Fjerner tungmetaller', 'Mikrobiologisk sikkerhed'],
    features: [
      'Aktivt kul fjerner klor og organiske forbindelser',
      'KDF-medie tilbageholder tungmetaller og medicinrester',
      'Mikrofiltermembran sikrer mikrobiologisk sikkerhed',
      'Standard 10" – passer Filter Housing',
      'Materialer godkendt til bakteriefrit vand',
    ],
    specs: [
      { label: 'Type',         value: 'Dual-stage kulblok + mikrofilter' },
      { label: 'Størrelse',    value: '10"' },
      { label: 'Fjerner',      value: 'Klor, tungmetaller, medicinrester, mikroplast, bakterier' },
      { label: 'Max. tryk',    value: '8 bar' },
      { label: 'Max. temperatur', value: '52°C' },
    ],
    faqs: [
      { q: 'Hvor ofte skal filteret skiftes?', a: 'Typisk hvert 6-12 måneder afhængigt af forbrug og vandkvalitet.' },
    ],
    useCases: ['Private hjem', 'Kontorer', 'Restauranter', 'Køkkener'],
    stripePaymentLink: 'https://buy.stripe.com/7sY9ASawHe9sb2m8mb4gg08',
  },

  {
    id: 'kulblokfilter-10-cl',
    productNr: '501016',
    name: 'Aktivt Kulblokfilter 10-CL',
    tagline: 'Fjerner tungmetaller, medicinrester & klor',
    category: 'filtre',
    price: 375, priceErhverv: 350,
    imgSrc:   '/images/kulblokfilter-10cl.jpg',
    imgLarge: '/images/kulblokfilter-10cl.jpg',
    description: 'Forbedrer vandets smag og lugt og fjerner tungmetaller og medicinrester.',
    longDescription: 'Aktivt Kulblokfilter 10-CL kombinerer aktivt kul med KDF-medie. Det fjerner klor, kloramin, tungmetaller (bly, kobber) og medicinrester, og forbedrer markant vandets smag og lugt.',
    highlights: ['KDF + aktivt kul', 'Fjerner tungmetaller', 'Forbedrer smag & lugt'],
    features: [
      'Fjerner klor og kloramin',
      'Tilbageholder bly, kobber og krom',
      'Reducerer medicinrester i vandet',
      'Forbedrer smag og lugt',
      'Standard 10" – passer Filter Housing',
    ],
    specs: [
      { label: 'Type',         value: 'Aktivt kulblok + KDF' },
      { label: 'Størrelse',    value: '10"' },
      { label: 'Fjerner',      value: 'Klor, tungmetaller, medicinrester' },
      { label: 'Max. tryk',    value: '8 bar' },
      { label: 'Max. temperatur', value: '52°C' },
    ],
    faqs: [
      { q: 'Hvad er KDF-mediet?', a: 'KDF (Kinetic Degradation Fluxion) er et granulat af kobber og zink der via redox-reaktioner fjerner tungmetaller.' },
    ],
    useCases: ['Private hjem', 'Børnefamilier', 'Restauranter'],
    stripePaymentLink: 'https://buy.stripe.com/6oU8wObAL6H01rMcCr4gg09',
  },

  {
    id: 'baclyser-il-3', productNr: '100883', name: 'Baclyser® IL 3 – inline-filter (3.000 l)',
    tagline: 'Medicinsk inline-filter til vandforsyningen – kapacitet 3.000 liter',
    badge: 'Medicinsk', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 625,
    imgSrc: '/images/baclyser-il.jpg', imgLarge: '/images/baclyser-il.jpg',
    description: 'Medicinsk inline-filter med 0,2 µm membran, der monteres i vandforsyningen og beskytter et tappested centralt. Kapacitet op til 3.000 liter.',
    highlights: ['0,2 µm membran', 'Inline / point-of-entry', 'Kapacitet 3.000 l'],
    features: ['Monteres i vandforsyningen', 'Beskytter tappested centralt', 'Tilbageholder Legionella & Pseudomonas', 'Medicinsk certificeret'],
    specs: [{ label: 'Membran', value: '0,2 µm' }, { label: 'Kapacitet', value: '3.000 liter' }, { label: 'Type', value: 'Inline (medicinsk)' }],
    faqs: [{ q: 'Hvor sidder filteret?', a: 'IL 3 monteres inline i vandforsyningen frem til et tappested og beskytter centralt.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Dialyse', 'Tandklinikker'],
  },

  {
    id: 'baclyser-il-5', productNr: '100882', name: 'Baclyser® IL 5 – inline-filter (13.000 l)',
    tagline: 'Medicinsk inline-filter til vandforsyningen – kapacitet 13.000 liter',
    badge: 'Medicinsk', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 900,
    imgSrc: '/images/baclyser-il5.jpg', imgLarge: '/images/baclyser-il5.jpg',
    description: 'Medicinsk inline-filter med 0,2 µm membran og stor kapacitet (op til 13.000 liter). Til central beskyttelse i installationer med højt forbrug.',
    highlights: ['0,2 µm membran', 'Inline / point-of-entry', 'Kapacitet 13.000 l'],
    features: ['Monteres i vandforsyningen', 'Stor kapacitet', 'Tilbageholder Legionella & Pseudomonas', 'Medicinsk certificeret'],
    specs: [{ label: 'Membran', value: '0,2 µm' }, { label: 'Kapacitet', value: '13.000 liter' }, { label: 'Type', value: 'Inline (medicinsk)' }],
    faqs: [{ q: 'Hvornår vælger jeg IL 5 frem for IL 3?', a: 'IL 5 har større kapacitet (13.000 l) og passer til tappesteder med højere forbrug.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Dialyse', 'Industri'],
  },

  {
    id: 'hygienesiphon-g114', productNr: '100666', name: 'HygieneSiphon G 1¼"',
    tagline: 'Hygiejnevandlås mod bakterievækst i afløbet – G 1¼"',
    badge: 'Hygiejne', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 450,
    imgSrc: '/images/hygienesiphon.jpg', imgLarge: '/images/hygienesiphon.jpg',
    description: 'HygieneSiphon er en vandlås, der modvirker bakterievækst og tilbagesmitning fra afløbet ved håndvasken. Til indløb og håndvaskventil G 1¼".',
    highlights: ['Modvirker bakterievækst i afløb', 'G 1¼"', 'Til håndvask'],
    features: ['Reducerer tilbagesmitning fra afløb', 'Forbedrer vandhygiejnen ved vasken', 'Passer G 1¼" indløb og ventil'],
    specs: [{ label: 'Tilslutning', value: 'G 1¼"' }, { label: 'Type', value: 'Hygiejnevandlås' }],
    faqs: [{ q: 'Hvad gør en HygieneSiphon?', a: 'Den modvirker bakterievækst og tilbagesmitning fra afløbet og forbedrer hygiejnen ved håndvasken.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Tandklinikker', 'Laboratorier'],
  },

  {
    id: 'hygienesiphon-g112', productNr: '100807', name: 'HygieneSiphon G 1½"',
    tagline: 'Hygiejnevandlås mod bakterievækst i afløbet – G 1½"',
    badge: 'Hygiejne', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 475,
    imgSrc: '/images/hygienesiphon.jpg', imgLarge: '/images/hygienesiphon.jpg',
    description: 'HygieneSiphon vandlås, der modvirker bakterievækst og tilbagesmitning fra afløbet ved håndvasken. Til indløb og håndvaskventil G 1½".',
    highlights: ['Modvirker bakterievækst i afløb', 'G 1½"', 'Til håndvask'],
    features: ['Reducerer tilbagesmitning fra afløb', 'Forbedrer vandhygiejnen ved vasken', 'Passer G 1½" indløb og ventil'],
    specs: [{ label: 'Tilslutning', value: 'G 1½"' }, { label: 'Type', value: 'Hygiejnevandlås' }],
    faqs: [{ q: 'Hvilken størrelse skal jeg vælge?', a: 'Vælg G 1¼" eller G 1½" alt efter dit eksisterende afløb/ventil.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Tandklinikker', 'Laboratorier'],
  },

  {
    id: 'hygienesiphon-pakke-g114', productNr: '100680', name: 'HygieneSiphon installationspakke G 1¼"',
    tagline: 'Komplet startpakke til HygieneSiphon – G 1¼"',
    badge: 'Hygiejne', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 700,
    imgSrc: '/images/hygienesiphon-pakke.jpg', imgLarge: '/images/hygienesiphon-pakke.jpg',
    description: 'Komplet installationspakke til HygieneSiphon med alt nødvendigt til første montering. Til G 1¼".',
    highlights: ['Komplet startpakke', 'G 1¼"', 'Klar til montering'],
    features: ['Indeholder HygieneSiphon + tilbehør til montering', 'Modvirker bakterievækst i afløb', 'Til G 1¼"'],
    specs: [{ label: 'Tilslutning', value: 'G 1¼"' }, { label: 'Indhold', value: 'Installationspakke' }],
    faqs: [{ q: 'Hvad indeholder pakken?', a: 'En komplet startpakke til montering af HygieneSiphon ved håndvasken.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Tandklinikker', 'Laboratorier'],
  },

  {
    id: 'hygienesiphon-pakke-g112', productNr: '101470', name: 'HygieneSiphon installationspakke G 1½"',
    tagline: 'Komplet startpakke til HygieneSiphon – G 1½"',
    badge: 'Hygiejne', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 700,
    imgSrc: '/images/hygienesiphon-pakke.jpg', imgLarge: '/images/hygienesiphon-pakke.jpg',
    description: 'Komplet installationspakke til HygieneSiphon med alt nødvendigt til første montering. Til G 1½".',
    highlights: ['Komplet startpakke', 'G 1½"', 'Klar til montering'],
    features: ['Indeholder HygieneSiphon + tilbehør til montering', 'Modvirker bakterievækst i afløb', 'Til G 1½"'],
    specs: [{ label: 'Tilslutning', value: 'G 1½"' }, { label: 'Indhold', value: 'Installationspakke' }],
    faqs: [{ q: 'Hvad indeholder pakken?', a: 'En komplet startpakke til montering af HygieneSiphon ved håndvasken.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Tandklinikker', 'Laboratorier'],
  },

  {
    id: 'inlet-hygienesiphon-g114', productNr: '100669', name: 'Inlet til HygieneSiphon G 1¼"',
    tagline: 'Reservedel: indløb til HygieneSiphon – G 1¼"',
    badge: 'Reservedel', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 200,
    imgSrc: '/images/inlet.jpg', imgLarge: '/images/inlet.jpg',
    description: 'Indløb (reservedel) til HygieneSiphon-vandlåsen. Til G 1¼".',
    highlights: ['Reservedel', 'G 1¼"', 'Til HygieneSiphon'],
    features: ['Passer HygieneSiphon G 1¼"', 'Originalt reservedel'],
    specs: [{ label: 'Tilslutning', value: 'G 1¼"' }, { label: 'Type', value: 'Indløb (reservedel)' }],
    faqs: [{ q: 'Hvad er dette?', a: 'Et indløb (reservedel) til HygieneSiphon-vandlåsen.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Tandklinikker', 'Laboratorier'],
  },

  {
    id: 'inlet-hygienesiphon-g112', productNr: '100923', name: 'Inlet til HygieneSiphon G 1½"',
    tagline: 'Reservedel: indløb til HygieneSiphon – G 1½"',
    badge: 'Reservedel', category: 'filtre', audience: 'erhverv', priceExMoms: true, price: 200,
    imgSrc: '/images/inlet.jpg', imgLarge: '/images/inlet.jpg',
    description: 'Indløb (reservedel) til HygieneSiphon-vandlåsen. Til G 1½".',
    highlights: ['Reservedel', 'G 1½"', 'Til HygieneSiphon'],
    features: ['Passer HygieneSiphon G 1½"', 'Originalt reservedel'],
    specs: [{ label: 'Tilslutning', value: 'G 1½"' }, { label: 'Type', value: 'Indløb (reservedel)' }],
    faqs: [{ q: 'Hvad er dette?', a: 'Et indløb (reservedel) til HygieneSiphon-vandlåsen.' }],
    useCases: ['Hospitaler', 'Plejehjem', 'Tandklinikker', 'Laboratorier'],
  },

  {
    id: 'blosgoringsanlaeg-100m',
    name: 'Blødgøringsanlæg 100M',
    tagline: 'Alt-i-ét kompakt blødgøringsanlæg',
    badge: 'Kompakt',
    category: 'blosgoringsanlaeg',
    featured: true,
    price: 11250,
    imgSrc:   '/images/blosgoringsanlaeg-100m.jpg',
    imgLarge: '/images/blosgoringsanlaeg-100m.jpg',
    description: 'Kompakt blødgøringsanlæg: 3 L resin, 15 kg integreret saltkar, flow 1.500 L/t.',
    longDescription: 'Blødgøringsanlæg 100M er den kompakte alt-i-ét løsning. Anlægget kombinerer 3 liter ionbytterharpiks med en integreret 15 kg salttank i ét kabinet og leverer 1.500 l/t kapacitet – mere end tilstrækkeligt til en familie.',
    highlights: ['Alt-i-ét design', 'Integreret 15 kg salttank', '1.500 l/t flow'],
    features: [
      'Integreret 15 kg salttank – komplet enhed',
      '3 liter ionbytterharpiks',
      '1.500 l/t kapacitet',
      'Automatisk regenerering',
      'Kompakt kabinet',
      'Digital styreenhed',
    ],
    specs: [
      { label: 'Harpiks',      value: '3 liter' },
      { label: 'Salttank',     value: 'Integreret, 15 kg' },
      { label: 'Flow',         value: '1.500 l/t' },
      { label: 'Regenerering', value: 'Automatisk' },
      { label: 'Service',      value: 'Hvert 2. år' },
    ],
    faqs: [
      { q: 'Er 100M stor nok til en familie?', a: 'Ja – med 1.500 l/t og 3 liter harpiks er det dimensioneret til 2-4 personer.' },
    ],
    useCases: ['Lejligheder', 'Mindre husstande', 'Rækkehuse'],
    stripePaymentLink: 'https://buy.stripe.com/7sYaEW48jd5odau9qf4gg0d',
  },

  {
    id: 'blosgoringsanlaeg-100bs',
    name: 'Blødgøringsanlæg 100BS',
    tagline: 'Separat 25 kg salttank',
    badge: 'Kommer snart',
    category: 'blosgoringsanlaeg',
    comingSoon: true,
    imgSrc:   '/images/blosgoringsanlaeg-100bs.jpg',
    imgLarge: '/images/blosgoringsanlaeg-100bs.jpg',
    description: 'Blødgøringsanlæg: 3 L resin, 25 kg separat saltkar, flow 1.500 L/t.',
    longDescription: 'Blødgøringsanlæg 100BS er familieløsningen med 25 kg separat salttank, der giver sjældnere genopfyldning. Anlægget kommer snart i salg.',
    highlights: ['Separat 25 kg salttank', 'Sjælden genopfyldning', 'Kommer snart'],
    features: [
      'Separat 25 kg salttank',
      '3 liter ionbytterharpiks',
      '1.500 l/t kapacitet',
      'Automatisk volumetrisk regenerering',
      'Digital styreenhed',
    ],
    specs: [
      { label: 'Harpiks',      value: '3 liter' },
      { label: 'Salttank',     value: 'Separat, 25 kg' },
      { label: 'Flow',         value: '1.500 l/t' },
      { label: 'Status',       value: 'Kommer snart' },
    ],
    faqs: [
      { q: 'Hvornår er anlægget tilgængeligt?', a: 'Kontakt os for opdateret leveringsdato.' },
    ],
    useCases: ['Parcelhuse', 'Familier', 'Mindre virksomheder'],
  },

  {
    id: 'blosgoringsanlaeg-100b',
    name: 'Blødgøringsanlæg 100B',
    tagline: 'Separat 10 kg salttank',
    badge: 'Kommer snart',
    category: 'blosgoringsanlaeg',
    comingSoon: true,
    imgSrc:   '/images/blosgoringsanlaeg-100b-v2.jpg',
    imgLarge: '/images/blosgoringsanlaeg-100b-v2.jpg',
    description: 'Blødgøringsanlæg: 3 L resin, 10 kg separat saltkar, flow 1.500 L/t.',
    longDescription: 'Blødgøringsanlæg 100B er mellemvejen: separat 10 kg salttank og kompakt design – ideel til installationer med begrænset plads. Anlægget kommer snart i salg.',
    highlights: ['Separat 10 kg salttank', 'Kompakt design', 'Kommer snart'],
    features: [
      'Separat 10 kg salttank',
      '3 liter ionbytterharpiks',
      '1.500 l/t kapacitet',
      'Automatisk regenerering',
      'Digital styreenhed',
    ],
    specs: [
      { label: 'Harpiks',      value: '3 liter' },
      { label: 'Salttank',     value: 'Separat, 10 kg' },
      { label: 'Flow',         value: '1.500 l/t' },
      { label: 'Status',       value: 'Kommer snart' },
    ],
    faqs: [
      { q: 'Hvornår er anlægget tilgængeligt?', a: 'Kontakt os for opdateret leveringsdato.' },
    ],
    useCases: ['Lejligheder', 'Trange teknikrum', 'Sommerhuse'],
  },

  {
    id: 'vaegbeslag-resintank',
    productNr: '6311040014',
    name: 'Vægbeslag til resintank (rund)',
    tagline: 'Vægbeslag til rund resintank – tilkøb til kalkanlæg',
    badge: 'Tilbehør',
    category: 'blosgoringsanlaeg',
    addon: true,
    price: 249,
    priceExMoms: true,
    imgSrc:   '/images/vaegbeslag-resintank.jpg',
    imgLarge: '/images/vaegbeslag-resintank.jpg',
    description: 'Rustfrit vægbeslag til vægmontering af den runde resintank. Passer til Hydropure 100 og 200B.',
    longDescription: 'Solidt vægbeslag i rustfrit stål til vægmontering af den runde resintank. Frigør gulvplads og giver en ren, professionel installation. Passer til kalkanlæg i Hydropure 100- og 200B-serien.',
    highlights: ['Til rund resintank', 'Rustfrit stål', 'Passer Hydropure 100 & 200B'],
    features: [
      'Vægmontering – frigør gulvplads',
      'Rustfrit stål – holdbart',
      'Passer til Hydropure 100 og 200B',
    ],
    specs: [
      { label: 'Materiale',  value: 'Rustfrit stål' },
      { label: 'Til',        value: 'Rund resintank' },
      { label: 'Kompatibel', value: 'Hydropure 100 & 200B' },
      { label: 'Varenummer', value: '6311040014' },
    ],
    faqs: [
      { q: 'Hvad bruges beslaget til?', a: 'Til at montere den runde resintank på væggen, så den ikke står på gulvet.' },
    ],
    useCases: ['Private hjem', 'Erhverv'],
  },

  {
    id: 'vaegbeslag-saltbeholder',
    productNr: '6311040015',
    name: 'Vægbeslag til saltbeholder (10 kg)',
    tagline: 'Vægbeslag til 10 kg saltbeholder – tilkøb til kalkanlæg',
    badge: 'Tilbehør',
    category: 'blosgoringsanlaeg',
    addon: true,
    price: 249,
    priceExMoms: true,
    imgSrc:   '/images/vaegbeslag-saltbeholder.jpg',
    imgLarge: '/images/vaegbeslag-saltbeholder.jpg',
    description: 'Rustfrit vægbeslag til vægmontering af den 10 kg saltbeholder. Passer til Hydropure 100 og 200B.',
    longDescription: 'Solidt vægbeslag i rustfrit stål til vægmontering af 10 kg-saltbeholderen. Frigør gulvplads og giver en ren installation. Passer til kalkanlæg i Hydropure 100- og 200B-serien.',
    highlights: ['Til 10 kg saltbeholder', 'Rustfrit stål', 'Passer Hydropure 100 & 200B'],
    features: [
      'Vægmontering – frigør gulvplads',
      'Rustfrit stål – holdbart',
      'Passer til 10 kg saltbeholder',
    ],
    specs: [
      { label: 'Materiale',  value: 'Rustfrit stål' },
      { label: 'Til',        value: '10 kg saltbeholder' },
      { label: 'Kompatibel', value: 'Hydropure 100 & 200B' },
      { label: 'Varenummer', value: '6311040015' },
    ],
    faqs: [
      { q: 'Hvad bruges beslaget til?', a: 'Til at montere 10 kg-saltbeholderen på væggen, så den ikke står på gulvet.' },
    ],
    useCases: ['Private hjem', 'Erhverv'],
  },

  {
    id: 'eca-kirkmayer-bmi', productNr: 'BMI', name: 'ECA-vand anlæg · Kirkmayer BMI-serie',
    tagline: 'Kompakt HClO-generator (Anolyt) – mindste footprint, bærbar',
    badge: 'ECA-vand', category: 'anlaeg', audience: 'erhverv', quoteOnly: true,
    imgSrc: '/images/sicursan-anlaeg.jpg', imgLarge: '/images/sicursan-anlaeg.jpg',
    description: 'BMI-serien er Kirkmayers kompakte HClO-generator til mindre forbrugere. Den producerer Anolyt (hypoklorsyre) on-site af salt, vand og strøm, med markedets mindste footprint, lav vægt og enkel vedligehold – velegnet til transport og krævende installationer.',
    highlights: ['Kompakt & bærbar', 'Dobbeltkølet elektrolysecelle', 'ECHA Article 95-godkendt aktivstof'],
    features: ['Producerer Anolyt (HClO) on-site af salt, vand og strøm', 'Adskilte rum til hydraulik og elektronik', 'Indbygget skylning af elektroder', 'Justerbar pH med stor stabilitet', 'Titanium-elektroder, PTFE/PVDF-slanger', 'Automatisk start/stop'],
    specs: [{ label: 'Type', value: 'HClO-generator (Anolyt)' }, { label: 'Segment', value: 'Mindre forbrug / kompakt' }, { label: 'Spænding', value: '100-240 V' }],
    faqs: [{ q: 'Hvad bruges BMI til?', a: 'BMI er den kompakte model til mindre forbrugere og steder, hvor portabilitet og lav vægt er vigtig. Kontakt os for dimensionering.' }],
    useCases: ['Landbrug', 'Mindre installationer', 'Veterinær', 'Fødevare'],
  },

  {
    id: 'eca-kirkmayer-lami', productNr: 'LAMI', name: 'ECA-vand anlæg · Kirkmayer LAMI-serie',
    tagline: 'Automatisk og økonomisk HClO-generator (Anolyt)',
    badge: 'ECA-vand', category: 'anlaeg', audience: 'erhverv', quoteOnly: true,
    imgSrc: '/images/sicursan-anlaeg.jpg', imgLarge: '/images/sicursan-anlaeg.jpg',
    description: 'LAMI-serien er Kirkmayers automatiske og økonomiske HClO-generator til kunder, der ønsker en driftssikker løsning med høj kvalitet og robusthed. Producerer Anolyt (hypoklorsyre) on-site af salt, vand og strøm.',
    highlights: ['Automatisk drift', 'Driftssikker & robust', 'ECHA Article 95-godkendt aktivstof'],
    features: ['Producerer Anolyt (HClO) on-site', 'Automatisk start/stop', 'Dobbeltkølet elektrolysecelle', 'Titanium-elektroder', 'Stabil pH-styring', 'Lav drift og vedligehold'],
    specs: [{ label: 'Type', value: 'HClO-generator (Anolyt)' }, { label: 'Segment', value: 'Mellem / automatisk' }],
    faqs: [{ q: 'Hvornår vælger jeg LAMI?', a: 'LAMI passer til kunder, der vil have en automatisk, økonomisk og robust løsning. Kontakt os for dimensionering.' }],
    useCases: ['Landbrug', 'Fødevare', 'Mejeri', 'Svømmehaller'],
  },

  {
    id: 'eca-kirkmayer-ami', productNr: 'AMI', name: 'ECA-vand anlæg · Kirkmayer AMI-serie',
    tagline: 'Avanceret automatisk HClO-generator – 50-1.200 l/t',
    badge: 'ECA-vand', category: 'anlaeg', audience: 'erhverv', quoteOnly: true,
    imgSrc: '/images/sicursan-anlaeg.jpg', imgLarge: '/images/sicursan-anlaeg.jpg',
    description: 'AMI-serien er Kirkmayers topmodel med høj automatisering og en patenteret elektrolysecelle med dobbelt elektrodekøling. Producerer Anolyt (HClO) med en kapacitet fra 50 til 1.200 liter i timen og FAC-koncentration fra 100 til 2.500 ppm.',
    highlights: ['Touchscreen PLC-styring', 'Patenteret elektrolysecelle', 'Kapacitet 50-1.200 l/t'],
    features: ['Multicolor touchscreen PLC', 'Dobbeltkølet, patenteret celle', 'Konduktivitets- og syresensor', 'Automatisk celleskylning (option)', 'pH/ORP-probe (option)', 'Fjernstyring via Ethernet/GSM/Modbus (option)'],
    specs: [{ label: 'Type', value: 'HClO-generator (Anolyt)' }, { label: 'Kapacitet', value: '50-1.200 l/t' }, { label: 'FAC', value: '100-2.500 ppm' }],
    faqs: [{ q: 'Hvad kan AMI?', a: 'AMI er den mest avancerede model med høj automatisering, stor kapacitet og mange optioner. Kontakt os for dimensionering til jeres behov.' }],
    useCases: ['Hospitaler', 'Fødevareindustri', 'Landbrug', 'Industri'],
  },
]

// ─── HELPERS ───────────────────────────────────────────────────────────────

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getRelated(product: Product, count = 3): Product[] {
  return PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category && !p.addon)
    .slice(0, count)
}

// Tilbehør (tilkøb), der kun vises på kalkanlæg-siden
export const ADDON_PRODUCTS = PRODUCTS.filter(p => p.addon)

export const CATEGORY_LABELS: Record<string, { da: string; en: string }> = {
  filtre:             { da: 'Filtre',           en: 'Filters' },
  blosgoringsanlaeg:  { da: 'Blødgøringsanlæg', en: 'Water softeners' },
}
