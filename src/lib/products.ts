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
    price: 399,
    imgSrc:   `${CWS}/2025/07/8-300x300.png`,
    imgLarge: `${CWS}/2025/07/8.png`,
    description: 'Engangsfilter til håndvaskarmatur – medicinsk godkendt med bruserudløb, giver sikker beskyttelse i op til 62 dage.',
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
    price: 449,
    imgSrc:   `${CWS}/2025/07/8-300x300.png`,
    imgLarge: `${CWS}/2025/07/8.png`,
    description: 'Engangsfilter til håndvaskarmatur – medicinsk godkendt med bruserudløb, giver sikker beskyttelse i op til 93 dage.',
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
    price: 399.9,
    imgSrc:   `${CWS}/2025/07/8-300x300.png`,
    imgLarge: `${CWS}/2025/07/8.png`,
    description: 'Engangs-vandfilter til håndvaskarmaturer med laminart udløb, medicinsk udstyr, levetid op til 62 dage.',
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
    price: 449,
    imgSrc:   `${CWS}/2025/07/8-300x300.png`,
    imgLarge: `${CWS}/2025/07/8.png`,
    description: 'Engangs-vandfilter til håndvaskarmaturer med laminart udløb, medicinsk udstyr, levetid op til 93 dage.',
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
    price: 795,
    imgSrc:   `${CWS}/2025/10/Hjemmeside-2-300x300.png`,
    imgLarge: `${CWS}/2025/10/Hjemmeside-2.png`,
    description: 'Brusehoved i chrome med udskiftelig filter. Optimal Legionella-beskyttelse i et elegant, diskret design.',
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
    id: 'coupling-m22',
    productNr: '100296',
    name: 'Coupling M22',
    tagline: 'Hurtigkobling til indvendigt M22-gevind',
    category: 'filtre',
    price: 199,
    imgSrc:   `${CWS}/2025/08/1-300x300.png`,
    imgLarge: `${CWS}/2025/08/1-300x300.png`,
    description: 'Hurtigkobling til indvendig gevind M22 IG. Gør montering og udskiftning af Baclyser®-filtre hurtig og værktøjsfri.',
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
    price: 199,
    imgSrc:   `${CWS}/2025/08/1-300x300.png`,
    imgLarge: `${CWS}/2025/08/1-300x300.png`,
    description: 'Hurtigkobling til udvendig gevind M24 AG. Gør montering og udskiftning af Baclyser®-filtre hurtig og værktøjsfri.',
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
    description: 'Til filtrering af vand i rørledning. Universelt filterhus kompatibelt med standard 10" filterpatroner.',
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
    description: 'Forbedrer vandets smag og lugt, fjerner tungmetaller og medicinrester og gør vandet mikrobiologisk sikkert.',
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
    price: 599,
    imgSrc:   `${CWS}/2025/10/3-1-300x300.png`,
    imgLarge: `${CWS}/2025/10/3-1-300x300.png`,
    description: 'Aktivt kulblokfilter 10-CL bruges til at forbedre vandets smag og lugt, samt til at fjerne tungmetaller og medicinrester.',
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
    name: 'Vandfilter Bi-flux Universal (reservedel)',
    tagline: 'Udskiftningspatron – 150 liters levetid',
    category: 'filtre',
    price: 99,
    imgSrc:   'https://www.laica.com/wp-content/uploads/F0M.jpg',
    imgLarge: 'https://www.laica.com/wp-content/uploads/F0M.jpg',
    description: 'Filter til vandkande med en levetid på 150L. Original Bi-flux® reservedel der fjerner kalk, klor og urenheder.',
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
    name: 'Vandfilter Predator Germ Stop',
    tagline: 'Vandkaraffel med antibakterielt filter',
    category: 'filtre',
    price: 300,
    imgSrc:   'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915',
    imgLarge: 'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg?lastmod=0.1757576915',
    description: 'Vandkaraffel med filter. Predator Germ Stop teknologi giver ekstra antibakteriel beskyttelse.',
    longDescription: 'Predator Germ Stop vandkaraffel kombinerer Bi-flux® filtrering med antibakteriel teknologi for ekstra tryghed. Ideel til private hjem hvor mikrobiologisk vandkvalitet er vigtig.',
    highlights: ['Antibakteriel teknologi', 'Bi-flux® filter inkluderet', 'Premium kvalitet'],
    features: [
      'Antibakteriel Germ Stop-teknologi',
      'Inkluderet Bi-flux® filter',
      'Fjerner kalk, klor og urenheder',
      'BPA-fri materialer',
    ],
    specs: [
      { label: 'Type',       value: 'Vandkaraffel m. filter' },
      { label: 'Teknologi',  value: 'Predator Germ Stop + Bi-flux®' },
      { label: 'Materiale',  value: 'BPA-fri plast' },
    ],
    faqs: [
      { q: 'Skal filteret skiftes?', a: 'Ja – brug Bi-flux® universal reservedel; typisk hver 4-8 uger.' },
    ],
    useCases: ['Private hjem', 'Kontorer', 'Børnefamilier'],
    stripePaymentLink: 'https://buy.stripe.com/00w28q9sD9Tcb2m6e34gg0b',
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
    description: 'Inline hulfibermembranfilter patron (udskifteligt filter) til professionelle installationer.',
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
    description: '3L resin, 15 kg integreret saltkar og en flowhastighed på 1.500 L/t.',
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
    description: '3L resin, 25 kg separat saltkar og en flowhastighed: 1.500 L/t.',
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
    description: '3L resin, 10 kg separat saltkar og en flowhastighed: 1.500 L/t.',
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
