/* Data for vandkander med filter & filterflasker – deles af oversigt og undersider. */

export type Spec = { label: string; value: string }

export type Kande = {
  slug: string
  name: string
  art: string
  img: string
  tagline: string
  capacity?: string
  highlight?: string
  intro: string
  points: string[]
  specs: Spec[]
  filter?: string
}

export const KANDER: Kande[] = [
  {
    slug: 'carmen',
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
      'Batterifri “eco-friendly” skift-indikator',
      'Bruger Bi-flux®-filterpatron',
      'Made in Italy',
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
  },
  {
    slug: 'mikroplastik-stop',
    name: 'Vandkande med filter MikroPLASTIK-STOP™',
    art: 'Art. UFSBE02',
    img: '/images/kande-mikroplastik-t.png',
    tagline: 'Den første kande med dobbelt filter, der stopper mikroplast.',
    capacity: '3 L total · 2 L filtreret',
    highlight: 'Fjerner 99,99 % mikroplast',
    intro:
      'MikroPLASTIK-STOP™ er den første vandkande med filter med et modulært dobbelt-filtersystem, der blokerer ' +
      'mikroplast. Bi-flux®-filteret reducerer hårdhed og uønskede stoffer, mens MikroPLASTIK-STOP™-filteret ' +
      'fjerner de mikroskopiske plastpartikler – uden at fjerne de nyttige mineralsalte, kroppen har brug for. ' +
      'Effektiviteten er testet af uafhængige laboratorier i Italien og Tyskland.',
    points: [
      'Dobbelt filtersystem: Bi-flux® + MikroPLASTIK-STOP™',
      'Fjerner >99,99 % af mikroplast ≥ 1 µm (testet af uafhængige labs)',
      'Bevarer de nyttige mineralsalte i vandet',
      '“Flow ’n go” hæld-gennem-låg med støvbeskyttelse',
      'Fødevaregodkendte materialer · 100 % genanvendelig emballage',
      'Fås kun i hvid',
    ],
    specs: [
      { label: 'Total kapacitet', value: '3 liter' },
      { label: 'Filtreret kapacitet', value: '2 liter' },
      { label: 'Mål (H×B×D)', value: '27,8 × 27,8 × 11,4 cm' },
      { label: 'Vægt', value: '0,95 kg' },
      { label: 'Farve', value: 'Hvid' },
      { label: 'Indhold', value: 'Kande + 1 filter + manual' },
    ],
    filter: 'Bi-flux® + MikroPLASTIK-STOP™',
  },
  {
    slug: 'glassmart',
    name: 'GlaSSmart™ glas-filterflaske',
    art: 'FAST DISK™',
    img: '/images/glassmart-flaske-t.png',
    tagline: 'Filtrerer vandet med det samme – med dig på farten.',
    capacity: 'Glasflaske til on-the-go',
    intro:
      'GlaSSmart™ forener elegant design med FAST DISK™ instant-filtrering. Aktivt kul-teknologien filtrerer ' +
      'vandet i det øjeblik, du hælder eller drikker – forbedrer smagen og reducerer klor, mens de nyttige ' +
      'mineralsalte bevares. Glaskroppen bevarer vandets naturlige karakter, er 100 % genanvendelig og tåler ' +
      'opvaskemaskine. Et bæredygtigt alternativ til engangsplastflasker.',
    points: [
      'FAST DISK™ instant-filtrering med aktivt kul',
      'Forbedrer smagen og reducerer klor',
      'Bevarer mineralsalte',
      'Glas bevarer vandets naturlige karakter · tåler opvaskemaskine',
      'Reducerer plastflaske-forbrug med ca. 99 %',
    ],
    specs: [
      { label: 'Type', value: 'Glas-filterflaske' },
      { label: 'Filtrering', value: 'FAST DISK™ (aktivt kul)' },
      { label: 'Materiale', value: 'Glas · 100 % genanvendelig' },
      { label: 'Opvaskemaskine', value: 'Ja (selve flasken)' },
      { label: 'Made in', value: 'Italien' },
    ],
    filter: 'FAST DISK™-skivefilter',
  },
]

export const getKande = (slug: string) => KANDER.find((k) => k.slug === slug)
