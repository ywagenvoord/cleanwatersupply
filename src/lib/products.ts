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
  category: 'filtre' | 'blosgoringsanlaeg'
  featured?: boolean
  // Price
  price?: number          // DKK – undefined = "Kommer snart"
  comingSoon?: boolean
  // Images
  imgSrc: string           // card thumbnail
  imgLarge?: string        // detail hero
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

export const PRODUCTS: Product[] = [

  /* ═══════════════════════════════════════════════════════ FILTRE */

  {
    id: 'baclyser-neo-tr-2m',
    productNr: '102785',
    name: 'Baclyser® neo TR (2M)',
    tagline: 'Engangsfilter til håndvaskarmatur – bruserudløb',
    badge: 'Legionella',
    category: 'filtre',
    featured: true,
    price: 499,
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
    badge: 'Legionella',
    category: 'filtre',
    price: 550,
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
    badge: 'Legionella',
    category: 'filtre',
    featured: true,
    price: 499,
    imgSrc:   '/images/product-tl6.jpg',
    imgLarge: '/images/product-tl6.jpg',
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
    tagline: 'Engangsfilter med laminar udløb – 93 dage',
    badge: 'Legionella',
    category: 'filtre',
    price: 550,
    imgSrc:   '/images/product-tl6.jpg',
    imgLarge: '/images/product-tl6.jpg',
    description: 'Medicinsk engangsfilter til håndvask med laminart udløb. Levetid op til 93 dage.',
    longDescription: 'Baclyser® neo TL (3M) er den længstlevende variant med 93 dages beskyttelse og laminar vandstråle. Ideel til professionelle anlæg med kvartalsvis service.',
    highlights: ['93 dages levetid', 'Laminar udløb (TL)', 'Medicinsk godkendt'],
    features: [
      '7 log-retention mod vandbårne bakterier',
      'Laminar udløb (TL)',
      'Levetid op til 93 dage',
      'Quick-release montering',
    ],
    specs: [
      { label: 'Membrantype',     value: 'Flad membran, 0,2 μm' },
      { label: 'Retention',       value: '7 log-enheder' },
      { label: 'Levetid',         value: '93 dage (3M)' },
      { label: 'Udløb',           value: 'TL – laminar' },
      { label: 'Max. tryk',       value: '5 bar' },
      { label: 'Max. temperatur', value: '60°C (70°C i ≤ 30 min)' },
    ],
    faqs: [
      { q: 'Hvornår vælges 3M frem for 2M?', a: '3M er ideel til installationer med lavere brug eller kvartalsvis serviceinterval.' },
    ],
    useCases: ['Hospitaler', 'Plejehjem', 'Hoteller'],
    stripePaymentLink: 'https://buy.stripe.com/14A6oGeMX3uO4DYdGv4gg03',
  },

  {
    id: 'cblue-sc3',
    productNr: '102223',
    name: 'cBlue SC3 (inkl. Filter)',
    tagline: 'Krom brusehoved med udskifteligt filter',
    category: 'filtre',
    featured: true,
    price: 899,
    imgSrc:   `${CWS}/2025/10/Hjemmeside-2-300x300.png`,
    imgLarge: `${CWS}/2025/10/Hjemmeside-2.png`,
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
    id: 'brusehoved-filter-acf',
    productNr: 'WDBruser',
    name: 'Brusehoved med vandfilter – komplet (inkl. børste & svamp)',
    tagline: 'Renser bruservandet for klor, rust & urenheder – komplet sæt med ACF-filter, børste og svamp',
    badge: 'Brusehoved',
    category: 'filtre',
    featured: true,
    price: 525,
    imgSrc:   '/images/product-kalkbruser.jpg',
    imgLarge: '/images/product-kalkbruser.jpg',
    description: 'Brusehoved med vandfilter, der renser bruservandet for klor, rust og urenheder. Komplet sæt med filter, børste og svamp.',
    longDescription: 'Bruservand indeholder ofte klor, rust, bundfald og tungmetaller. Når du tager et varmt bad, forstøves vandet til en fin damp, du trækker ned i lungerne, samtidig med at hud og hår er i direkte kontakt med vandet – og netop klor og urenheder er med til at tørre hud og hår ud. Dette brusehoved har et indbygget ACF-filter (aktivt kul-fiber), der fjerner klor, rust, bundfald og tungmetaller fra vandet, så badet bliver mildere mod hud og hår og renere at trække vejret i. Du behøver hverken VVS’er eller et centralt filter: brusehovedet skrues direkte på dit eksisterende armatur, og filteret skiftes på under et minut uden værktøj. Vil du have ekstra effekt, kan du skifte til et ACF + C-vitamin-filter (frisk og mildt mod hud og hår) eller et ACF + kalkhæmmer-filter (mindsker kalkens påvirkning). Pakken indeholder brusehoved, et ACF-filter samt børste og svamp, og hele løsningen er godkendt til drikkevand.',
    highlights: ['Fjerner klor, rust & tungmetaller', 'Mildere mod hud & hår', 'Nem og enkel montering', 'Inkl. børste, svamp & ACF-filter'],
    features: [
      'Renser bruservandet for klor, rust, bundfald og tungmetaller',
      'Mildere mod hud og hår – og renere damp at trække vejret i',
      'Skrues direkte på dit armatur – ingen VVS’er eller centralt filter nødvendigt',
      'Værktøjsfri filterudskiftning på under et minut',
      'Kan bruges med flere filtertyper – ACF, ACF + C-vitamin eller ACF + kalkhæmmer',
      'Pakke: brusehoved, ACF-filter, børste og svamp',
      'Godkendt til drikkevand',
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
    name: 'Brusehoved med vandfilter',
    tagline: 'Renser bruservandet for klor, rust & urenheder – inkl. ACF-filter',
    badge: 'Brusehoved',
    category: 'filtre',
    price: 499,
    imgSrc:   '/images/product-brusehoved-sort.jpg',
    imgLarge: '/images/product-brusehoved-sort.jpg',
    description: 'Brusehoved med vandfilter, der renser bruservandet for klor, rust og urenheder. Inkl. filter – uden børste og svamp.',
    longDescription: 'Et brusehoved med filterfunktion, hvis du vil reducere urenheder, når du bader, men ikke har mulighed for et centralt filter. Brusehovedet kan bruges med flere filtertyper, så du kan vælge den løsning, der passer bedst til dit vand. Udover det medfølgende ACF-filter kan du tilvælge ACF + kalkhæmmer eller ACF + C-vitamin. Pakken indeholder brusehoved og et ACF-filter (uden børste og svamp).',
    highlights: ['Inkl. brusehoved + ACF-filter', 'Kan bruges med flere filtertyper', 'Godkendt til drikkevand'],
    features: [
      'Indeholder brusehoved og ACF-filter',
      'Kan bruges med flere filtertyper – fx ACF + kalkhæmmer eller ACF + C-vitamin',
      'Reducerer urenheder i bruservandet',
      'Nem, værktøjsfri filterudskiftning',
      'Godkendt til drikkevand',
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
    name: 'Udskiftningsfilter til brusehoved',
    tagline: 'Aktivt kul-filter – renser bruservandet for klor, rust & urenheder',
    badge: 'Udskiftningsfilter',
    category: 'filtre',
    price: 64,
    imgSrc:   '/images/product-acf-filter.jpg',
    imgLarge: '/images/product-acf-filter.jpg',
    description: 'Udskifteligt filter med aktivt kul. Fjerner klor, rust, bundfald og tungmetaller fra bruservandet.',
    longDescription: 'Et udskifteligt ACF-filter (aktivt kul-fiber) til brusehovedet. Det fjerner effektivt bundfald, rust, rester af klor og tungmetaller fra vandet. Filteret har en levetid på ca. 2-3 måneder, hvorefter det nemt udskiftes med et nyt.',
    highlights: ['Fjerner klor, rust & tungmetaller', 'Levetid ca. 2-3 måneder', 'Godkendt til drikkevand'],
    features: [
      'Fjerner bundfald, rust, klorrester og tungmetaller',
      'Passer vores brusehoved med filter',
      'Levetid ca. 2-3 måneder',
      'Nem, værktøjsfri udskiftning',
      'Godkendt til drikkevand',
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
    name: 'Udskiftningsfilter til brusehoved + C-vitamin',
    tagline: 'Aktivt kul med C-vitamin – ekstra mildt mod hud & hår',
    badge: 'Udskiftningsfilter',
    category: 'filtre',
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
    name: 'Udskiftningsfilter til brusehoved + kalkhæmmer',
    tagline: 'Aktivt kul med kalkhæmmer – mindsker kalkens påvirkning af hud, hår & armatur',
    badge: 'Udskiftningsfilter',
    category: 'filtre',
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
    id: 'coupling-m22',
    productNr: '100296',
    name: 'Coupling M22',
    tagline: 'Hurtigkobling til indvendigt M22-gevind',
    category: 'filtre',
    price: 150,
    imgSrc:   `${CWS}/2025/08/1-300x300.png`,
    imgLarge: `${CWS}/2025/08/1-300x300.png`,
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
    category: 'filtre',
    price: 150,
    imgSrc:   `${CWS}/2025/08/1-300x300.png`,
    imgLarge: `${CWS}/2025/08/1-300x300.png`,
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
    id: 'filter-housing',
    productNr: '501428',
    name: 'Filter Housing',
    tagline: 'Filterhus til rørledninger',
    category: 'filtre',
    price: 499,
    imgSrc:   `${CWS}/2025/10/1-1-300x300.png`,
    imgLarge: `${CWS}/2025/10/1-1-300x300.png`,
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
    price: 749,
    imgSrc:   `${CWS}/2025/10/6-1-300x300.png`,
    imgLarge: `${CWS}/2025/10/6-1-300x300.png`,
    description: 'Tostadigt filter: bedre smag og lugt, fjerner tungmetaller og medicinrester, mikrobiologisk sikkert.',
    longDescription: 'DualStage MF 10-CL er det alsidige tostadie-filter der i ét gennemløb forbedrer smag og lugt, fjerner tungmetaller og medicinrester og leverer mikrobiologisk sikkerhed via en mikrofiltermembran.',
    highlights: ['2-i-1: kulblok + membran', 'Fjerner tungmetaller', 'Mikrobiologisk sikkerhed'],
    features: [
      'Aktivt kul fjerner klor og organiske forbindelser',
      'KDF-medie tilbageholder tungmetaller og medicinrester',
      'Mikrofiltermembran sikrer mikrobiologisk sikkerhed',
      'Standard 10" – passer Filter Housing',
      'Drikkevandsgodkendte materialer',
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
    price: 449,
    imgSrc:   `${CWS}/2025/10/3-1-300x300.png`,
    imgLarge: `${CWS}/2025/10/3-1-300x300.png`,
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
    id: 'vandfilter-biflux-reservedel',
    productNr: '11103',
    name: 'Løst filter til vandkande',
    tagline: 'Udskiftningspatron – 150 liters levetid',
    category: 'filtre',
    price: 99,
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
    id: 'vandfilter-predator',
    productNr: '11101',
    name: 'Filtervandkande',
    tagline: 'Laica filterkande med Bi-flux® + MikroPLASTIK-STOP – 3 liter',
    category: 'filtre',
    price: 300,
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
    id: 'mikroplastik-stop-filter',
    productNr: 'DUF1P00',
    name: 'MikroPLASTIK-STOP™ filter (6 stk.)',
    tagline: 'Udskiftningsfilter til filterkanden – levetid op til 1000 liter',
    category: 'filtre',
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
    id: 'as-tube',
    productNr: '101466',
    name: 'AS Tube',
    tagline: 'Inline hulfibermembran patron',
    category: 'filtre',
    price: 1200,
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

  /* ═══════════════════════════════════════════════════════ BLØDGØRINGSANLÆG */

  {
    id: 'blosgoringsanlaeg-100m',
    name: 'Blødgøringsanlæg 100M',
    tagline: 'Alt-i-ét kompakt blødgøringsanlæg',
    badge: 'Kompakt',
    category: 'blosgoringsanlaeg',
    featured: true,
    price: 11250,
    imgSrc:   `${CWS}/2025/07/2-3-300x300.png`,
    imgLarge: `${CWS}/2025/07/2-3.png`,
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
    imgSrc:   `${CWS}/2025/07/1-3-300x300.png`,
    imgLarge: `${CWS}/2025/07/1-3.png`,
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
    imgSrc:   `${CWS}/2025/07/3-3-300x300.png`,
    imgLarge: `${CWS}/2025/07/3-3.png`,
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
]

// ─── HELPERS ───────────────────────────────────────────────────────────────

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getRelated(product: Product, count = 3): Product[] {
  return PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, count)
}

export const CATEGORY_LABELS: Record<string, { da: string; en: string }> = {
  filtre:             { da: 'Filtre',           en: 'Filters' },
  blosgoringsanlaeg:  { da: 'Blødgøringsanlæg', en: 'Water softeners' },
}
