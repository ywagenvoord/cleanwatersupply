// ─── LØSNINGS-INFO TIL PRIVAT ──────────────────────────────────────────────
// Bruges af /loesninger/[slug] – forklarer hver løsning og hverdagsfordele.

export type SolutionBenefit = { title: string; body: string }

export type SolutionInfo = {
  slug: string
  label: string
  heroImg: string
  intro: string
  what: string
  how: string
  everyday: SolutionBenefit[]
  productIds: string[]
}

export const SOLUTIONS: SolutionInfo[] = [
  {
    slug: 'filtre-paa-tappestedet',
    label: 'Filtre på tappestedet',
    heroImg: '/images/solution-tappested.jpg',
    intro: 'Rent, sikkert vand præcis dér, hvor du bruger det – lige ved hanen.',
    what: 'Et filter på tappestedet (point-of-use) sættes direkte på vandhanen og renser vandet i det øjeblik, du tapper det. Vores Baclyser®-filtre er medicinsk certificerede og danner en steril barriere mod bakterier som Legionella og Pseudomonas – uden at du skal ændre på resten af installationen.',
    how: 'Vandet presses gennem en fin 0,2 µm membran, der tilbageholder bakterier og urenheder helt ude ved udløbet. Filteret klikkes på med en kobling uden værktøj og skiftes med faste intervaller (fx hver 62. eller 93. dag), så beskyttelsen altid er i top.',
    everyday: [
      { title: 'Tryg daglig rutine', body: 'Rent vand til tandbørstning, kaffe, madlavning og det glas, du fylder i farten.' },
      { title: 'Ekstra vigtigt for de sårbare', body: 'Giver tryghed i hjem med børn, ældre eller personer med svækket immunforsvar.' },
      { title: 'Nem montering – ingen VVS', body: 'Filteret klikkes direkte på hanen med en kobling. Du skifter det selv på under et minut.' },
      { title: 'Dokumenteret sikkerhed', body: 'Medicinsk certificeret beskyttelse, du kan stole på – ikke bare bedre smag.' },
    ],
    productIds: ['baclyser-neo-tr-2m', 'baclyser-neo-tl-2m', 'baclyser-neo-tr-3m', 'coupling-m22', 'coupling-m24'],
  },
  {
    slug: 'kalkanlaeg',
    label: 'Kalkanlæg',
    heroImg: '/images/solution-kalkanlaeg.jpg',
    intro: 'Blødt vand i hele huset – en forskel, du mærker hver eneste dag.',
    what: 'Et kalkanlæg (blødgøringsanlæg) fjerner kalken fra vandet via ionbytning, hvor calcium og magnesium udskiftes med natrium. Resultatet er blødt vand ved hvert eneste tappested i boligen – fra bruser og køkken til vaskemaskine og hvidevarer.',
    how: 'Vandet ledes gennem en harpiksbeholder, der binder kalken. Anlægget regenererer automatisk med salt, så det altid yder optimalt, og det fås som kompakt alt-i-ét-løsning, der ikke fylder meget.',
    everyday: [
      { title: 'Mindre kalk & rengøring', body: 'Slut med kalkrande på fliser, glas og armaturer – mindre tid og færre kemikalier på rengøring.' },
      { title: 'Mindre sæbe & produkt', body: 'Blødt vand skummer bedre, så du bruger markant mindre shampoo, sæbe og vaskemiddel.' },
      { title: 'Blødere hud & hår', body: 'Uden kalk føles huden mindre tør, og håret bliver blødere og lettere at rede.' },
      { title: 'Beskytter dit hjem', body: 'Mindre kalk i rør, varmtvandsbeholder og hvidevarer forlænger levetiden og sænker energiforbruget.' },
    ],
    productIds: ['blosgoringsanlaeg-100m', 'blosgoringsanlaeg-100bs', 'blosgoringsanlaeg-100b'],
  },
  {
    slug: 'filtre-i-vandforsyningen',
    label: 'Filtre i vandforsyningen',
    heroImg: '/images/solution-undervask.jpg',
    intro: 'Central rensning, før vandet overhovedet når frem til hanerne.',
    what: 'Inline-filtre monteres direkte i vandforsyningen og renser vandet centralt, så hvert tappested i hjemmet leverer rent vand – uden at du skal tænke over det. Ét anlæg dækker hele boligen.',
    how: 'Vandet føres gennem et filterhus eller en hulfibermembran-patron (fx AS Tube), der tilbageholder partikler, bakterier, tungmetaller og urenheder, før vandet fordeles ud i huset. Filterpatronen skiftes efter behov.',
    everyday: [
      { title: 'Rent vand i hele huset', body: 'Ét centralt filter dækker alle haner – du skal ikke montere noget ved hvert tappested.' },
      { title: 'Bedre smag og lugt', body: 'Fjerner klor, urenheder og partikler, så vandet smager og lugter rent.' },
      { title: 'Beskytter installationer', body: 'Holder partikler og urenheder ude af rør og udstyr og forlænger levetiden.' },
      { title: 'Sæt op og glem det', body: 'Lavt vedligehold – du skifter blot filterpatronen, når det er tid.' },
    ],
    productIds: ['filter-housing', 'as-tube', 'dualstage-mf-10-cl', 'kulblokfilter-10-cl'],
  },
  {
    slug: 'brusefilter',
    label: 'Brusefilter',
    heroImg: '/images/solution-brusefilter.jpg',
    intro: 'Renere bruservand – mildere mod hud, hår og luftveje.',
    what: 'Et brusefilter renser vandet i bruseren for klor, rust, bundfald og urenheder. Det fås som et komplet brusehoved med indbygget filter eller som et udskifteligt filter til dit eksisterende sæt – med varianter til C-vitamin eller kalkhæmmer.',
    how: 'Vandet løber gennem et aktivt kul-filter (ACF) i brusehovedet, der binder klor og urenheder, lige inden vandet rammer dig. Brusehovedet skrues på som en almindelig håndbruser, og filteret skiftes ca. hver 2.-3. måned.',
    everyday: [
      { title: 'Blødere hud & hår', body: 'Mindre klor betyder mindre tør hud efter badet og blødere, lettere hår.' },
      { title: 'Renere damp at trække vejret i', body: 'Den varme bruse forstøver vandet til en fin tåge – filteret holder den renere.' },
      { title: 'Vælg din variant', body: 'Tilvælg C-vitamin for en ekstra frisk fornemmelse eller kalkhæmmer, der mindsker kalkens påvirkning.' },
      { title: 'Nem montering – ingen VVS', body: 'Skrues direkte på dit armatur, og filteret skiftes på under et minut.' },
    ],
    productIds: ['brusehoved-filter-acf', 'brusehoved-til-filter', 'cblue-sc3', 'brusefilter-acf', 'brusefilter-acf-vitamin-c', 'brusefilter-acf-amino-acid', 'as-tube'],
  },
]

export function getSolution(slug: string): SolutionInfo | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}
