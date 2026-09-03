/* Data for vandkander med filter & filterflasker – deles af oversigt og undersider. */

export type Spec = { label: string; value: string }

export type Kande = {
  slug: string
  name: string
  art: string
  img: string
  tagline: string
  price?: number
  stockLeft?: number         // vis lav-lager-besked (fx "Kun 1 tilbage på lager")
  varenr?: string
  stripeProductId?: string   // gør kanden købbar direkte fra kande-siden
  ogImage?: string           // delebillede (1200×630) til Facebook/social preview
  ogVideo?: string           // Open Graph-video (mp4) til social preview
  video?: string             // produktvideo (mp4) vist i galleriet
  capacity?: string
  highlight?: string
  intro: string
  points: string[]
  specs: Spec[]
  filter?: string
  addon?: { name: string; art: string; img: string; life: string; blurb: string; price?: number; link?: string }
  highlights?: { icon: string; title: string; text: string }[]
  eco?: string
  steps?: string[]
  lifestyle?: string[]
  gallery?: string[]
  lifestyleEnd?: string[]
}

export const KANDER: Kande[] = [
  {
    slug: 'carmen',
    price: 189,
    varenr: 'LAI-1007',
    name: 'Vandkande med filter Carmen',
    art: 'Art. J35-DA',
    img: '/images/kande-carmen-t.png',
    tagline: 'Klassisk, let og nem vandkande med filter til hverdagen.',
    capacity: '2,3 L total · 1,2 L filtreret',
    intro:
      'Carmen er den enkle og pålidelige vandkande med filter til den daglige husholdning. Den er let at håndtere, ' +
      'har en praktisk hurtigfyldnings-låge, så du kan fylde den direkte under hanen, og dens slanke form passer ' +
      'perfekt i køleskabsdøren. Den batterifri skift-indikator minder dig om, hvornår filteret skal skiftes – ' +
      'helt uden batterier.',
    points: [
      'Hurtigfyldnings-låge – fyld direkte under hanen',
      'Passer i køleskabsdøren',
      'Batterifri skift-indikator',
      'Bruger Bi-flux®-filterpatron',
      'Made in EU',
    ],
    specs: [
      { label: 'Total kapacitet', value: '2,3 liter' },
      { label: 'Filtreret kapacitet', value: '1,2 liter' },
      { label: 'Mål (H×B×D)', value: '27,6 × 27,4 × 9,4 cm' },
      { label: 'Vægt', value: '0,6 kg' },
      { label: 'Farve', value: 'Hvid' },
      { label: 'Indhold', value: 'Kande + 1 Bi-flux®-filter + manual' },
    ],
    filter: 'Bi-flux®-filterpatron',
    addon: {
      name: 'Bi-flux® Universal-filter',
      art: 'Art. F0M',
      img: '/images/product-filter-udskift.jpg',
      life: '1 måned · ca. 150 L pr. filter',
      blurb: 'Det matchende udskiftningsfilter til Carmen – bevar rent vand med god smag.',
      link: '/vandkande-filtre/bi-flux-universal',
    },
    highlights: [
      { icon: 'zap', title: 'Hurtigfyldnings-låge', text: 'Fyld kanden direkte under hanen – hurtigt og nemt.' },
      { icon: 'droplet', title: 'Passer i køleskabsdøren', text: 'Slank form, så du altid har koldt, filtreret vand ved hånden.' },
      { icon: 'timer', title: 'Batterifri skift-indikator', text: 'Minder dig om, hvornår filteret skal skiftes – uden batterier.' },
      { icon: 'shield', title: 'Bi-flux®-filter', text: '6-trins filtrering af klor, kalk og urenheder · Made in EU.' },
    ],
    eco: 'Ét Bi-flux®-filter rækker til ca. 150 liter og erstatter mange engangs-plastflasker.',
    steps: [
      'Blød Bi-flux®-filteret i koldt vand i ca. 5-10 minutter',
      'Skyl filteret under rindende vand i 10 sekunder',
      'Sæt filteret fast i tragten inde i kanden',
      'Fyld tragten med koldt vand via hurtigfyldnings-lågen',
      'Lad vandet løbe gennem filteret ned i kanden',
      'Nyd rent vand – og nulstil den batterifri skift-indikator',
    ],
  },
  {
    slug: 'mikroplastik-stop',
    price: 399,
    stockLeft: 1,
    varenr: 'LAI-1001',
    stripeProductId: 'prod_V2wDbJ1i8O20Kj',
    name: 'Vandkande med filter MikroPLASTIK-STOP™',
    art: 'Art. UFSBE02',
    img: '/images/kande-mikroplastik-stop.jpg',
    video: '/videos/mikroplastik-stop.mp4',
    gallery: [
      '/images/kande-mikroplastik-stop-b.jpg',
      '/images/kande-mikroplastik-stop-c.jpg',
      '/images/kande-mikroplastik-stop-d.jpg',
    ],
    tagline: 'Den første kande med dobbelt filter, der stopper mikroplast.',
    capacity: '3 L total · 2 L filtreret',
    highlight: 'Fjerner 99,99 % mikroplast',
    intro:
      'MikroPLASTIK-STOP™ er den første vandkande med filter med et modulært dobbelt-filtersystem, der blokerer ' +
      'mikroplast. Bi-flux®-filteret reducerer hårdhed og uønskede stoffer, mens MikroPLASTIK-STOP™-filteret ' +
      'fjerner de mikroskopiske plastpartikler – uden at fjerne de nyttige mineralsalte, kroppen har brug for. ' +
      'Effektiviteten er testet af uafhængige laboratorier i Italien og Tyskland. ' +
      'Kanden er bygget på Laica Predator – med automatisk Quickfill-låg til hurtig påfyldning, en batterifri ' +
      'analog skift-tæller og en aftagelig elektronisk indikator for filterets levetid. Made in Italy.',
    points: [
      'Dobbelt, modulært filtersystem: Bi-flux® + MikroPLASTIK-STOP™',
      'Fjerner >99,99 % af mikroplast ≥ 1 µm (testet af uafhængige labs)',
      'Bevarer de nyttige mineralsalte i vandet',
      'Automatisk “Quickfill”-låg – fyld hurtigt direkte under hanen',
      'Batterifri analog skift-tæller + aftagelig elektronisk levetidsindikator',
      'Fødevaregodkendte materialer · 100 % genanvendelig emballage · Made in Italy',
      'Fås kun i hvid',
    ],
    specs: [
      { label: 'Model', value: 'Laica Predator' },
      { label: 'Total kapacitet', value: '3 liter' },
      { label: 'Filtreret kapacitet', value: '2 liter' },
      { label: 'Mål (H×B×D)', value: '27,8 × 27,8 × 11,4 cm' },
      { label: 'Vægt', value: '0,95 kg' },
      { label: 'Farve', value: 'Hvid' },
      { label: 'Filtreringssystem', value: 'Dobbelt modulært (Bi-flux® + MikroPLASTIK-STOP™)' },
      { label: 'Made in', value: 'Italien' },
      { label: 'EAN', value: '8013240705941' },
      { label: 'Indhold', value: 'Kande + 1 Bi-flux®-filter + 1 MikroPLASTIK-STOP™-filter + manual' },
    ],
    filter: 'Bi-flux® + MikroPLASTIK-STOP™',
    addon: {
      name: 'Bi-flux® + MikroPLASTIK-STOP™-filter',
      art: 'Art. UFSBE02',
      img: '/images/product-filter-udskift.jpg',
      life: '1 måned · ca. 150 L pr. filter',
      blurb: 'Dobbelt-filtersættet der matcher MikroPLASTIK-STOP™ og fjerner mikroplast.',
      link: '/shop/mikroplastik-stop-filter',
    },
    highlights: [
      { icon: 'shield', title: 'Fjerner 99,99 % mikroplast', text: 'Testet af uafhængige laboratorier i Italien og Tyskland.' },
      { icon: 'leaf', title: 'Bevarer mineralsalte', text: 'Fjerner ikke de nyttige mineraler, kroppen har brug for.' },
      { icon: 'droplet', title: 'Dobbelt filtersystem', text: 'Bi-flux® + MikroPLASTIK-STOP™ samlet i én kande.' },
      { icon: 'recycle', title: '100 % genanvendelig', text: 'Fødevaregodkendte materialer og genanvendelig emballage.' },
    ],
    eco: 'Reducér mikroplast og engangsflasker på én gang – filteret rækker til ca. 150 liter.',
    steps: [
      'Læg begge filtre (Bi-flux® og MikroPLASTIK-STOP™) i blød i en skål eller balje med rent, koldt vand, så de begge er dækket – i ca. 10-15 minutter',
      'Skyl begge filtre under rindende vand',
      'Monter begge filtre i tragten inde i kanden',
      'Fyld tragten med koldt vand',
      'Lad vandet løbe gennem dobbelt-filtersystemet',
      'Nyd vand fri for mikroplast – med de nyttige mineraler bevaret',
    ],
  },
  {
    slug: 'glassmart',
    price: 199,
    varenr: 'LAI-1002',
    stripeProductId: 'prod_V2wFs5adWhY4cF',
    ogImage: '/images/glassmart-og.jpg',
    ogVideo: '/videos/glassmart-promo.mp4',
    name: 'GlaSSmart™ glas-filterkaraffel',
    art: 'FAST DISK™',
    img: '/images/glassmart-flaske-t.png',
    tagline: 'Altid koldt, filtreret vand – klar i køleskabet.',
    capacity: 'Passer i de fleste køleskabe',
    intro:
      'GlaSSmart™ forener elegant design med FAST DISK™ instant-filtrering. Aktivt kul-teknologien filtrerer ' +
      'vandet i det øjeblik, du hælder – forbedrer smagen og reducerer klor, mens de nyttige mineralsalte ' +
      'bevares. Den slanke glaskaraffel er skabt til at stå i køleskabet og passer i de fleste køleskabsdøre, ' +
      'så du altid har koldt, filtreret vand lige ved hånden. Glasset bevarer vandets naturlige karakter, er ' +
      '100 % genanvendeligt og tåler opvaskemaskine.',
    points: [
      'Altid koldt, filtreret vand – klar i køleskabet',
      'Passer i de fleste køleskabe – kan både stå op og ligge ned',
      'Kan ligge ned uden at lække, når blot låget er lukket korrekt',
      'FAST DISK™ instant-filtrering med aktivt kul',
      'Forbedrer smagen og reducerer klor · bevarer mineralsalte',
      'Glas · tåler opvaskemaskine · 100 % genanvendeligt',
    ],
    specs: [
      { label: 'Type', value: 'Glas-filterkaraffel' },
      { label: 'Filtrering', value: 'FAST DISK™ (aktivt kul)' },
      { label: 'Materiale', value: 'Glas · 100 % genanvendelig' },
      { label: 'Opvaskemaskine', value: 'Ja (selve karaflen)' },
      { label: 'Made in', value: 'EU' },
    ],
    filter: 'FAST DISK™-skivefilter',
    addon: {
      name: 'FAST DISK™ · 3 filtre',
      art: 'Til GlaSSmart-karaflen',
      img: '/images/fast-disk-pack.jpg',
      life: 'Ca. 3 måneders filtreret vand',
      blurb: 'De matchende skivefiltre til GlaSSmart-karaflen – filtrerer, mens du hælder.',
      price: 89,
      link: '/vandkande-filtre/fast-disk',
    },
    highlights: [
      { icon: 'droplet', title: 'Passer i køleskabet', text: 'Passer i de fleste køleskabe og kan både stå op og ligge ned – luk blot låget korrekt, så den er tæt. Altid koldt, filtreret vand klar.' },
      { icon: 'zap', title: 'Instant-filtrering', text: 'FAST DISK™ filtrerer vandet i det øjeblik, du hælder.' },
      { icon: 'leaf', title: 'Bevarer mineralsalte', text: 'Forbedrer smagen og reducerer klor – uden at fjerne de nyttige mineraler.' },
      { icon: 'glass', title: 'Glas · tåler opvask', text: 'Glasset bevarer vandets naturlige karakter, tåler opvaskemaskine og er 100 % genanvendeligt.' },
    ],
    eco: 'Med FAST DISK™ filtrerer du op til 120 liter om måneden og reducerer engangs-plastflasker med ca. 99 %.',
    steps: [
      'Tag FAST DISK™-filteret ud af posen og skyl det under koldt vand i 30 sekunder',
      'Sæt filteret i låget ved at dreje det med uret',
      'Fyld GlaSSmart™-karaflen med vand',
      'Skru låget med FAST DISK™-filteret på',
      'Stil karaflen i køleskabet – så har du altid koldt, filtreret vand klar',
      'Hæld det filtrerede vand direkte i et glas, når du vil have en tår',
    ],
    lifestyle: ['/images/glassmart-life-hand.jpg', '/images/glassmart-life-beach.jpg', '/images/glassmart-life-3.jpg'],
    gallery: [
      '/images/glassmart-filter-pack.jpg',
      '/images/glassmart-box-front.jpg',
      '/images/glassmart-box-back.jpg',
    ],
    lifestyleEnd: ['/images/glassmart-life-1.jpg', '/images/glassmart-life-2.jpg'],
  },
]

export const getKande = (slug: string) => KANDER.find((k) => k.slug === slug)
