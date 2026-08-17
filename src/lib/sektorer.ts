export type ContactPerson = 'kenneth' | 'kristoffer'

export interface Sektor {
  id: string
  title: string
  tagline: string
  heroImage: string
  video?: string        // valgfri video-afsnit på siden (mp4)
  videoPoster?: string  // poster-billede til video
  videoHeading?: string // overskrift over videoen
  videoBody?: string    // kort tekst under video-overskriften
  intro: string
  values: { title: string; body: string }[]
  problemHeading: string
  problemBody: string
  benefits: string[]
  contactPerson: ContactPerson
}

export const sektorer: Sektor[] = [
  {
    id: 'hoteller',
    title: 'Hoteller',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-hoteller.jpg',
    intro: 'Hoteller – En overset risikofaktor',
    values: [
      {
        title: 'Tryghed for gæster',
        body: 'Bakteriefrit vand beskytter gæster mod Legionella og andre skadelige mikroorganismer',
      },
      {
        title: 'Effektiv drift og lavere risiko',
        body: 'Reducerer behovet for kemisk rengøring og sænker vedligeholdelsesomkostningerne',
      },
      {
        title: 'Bæredygtig og ansvarlig drift',
        body: 'Sterile filtre minimerer vandspild og miljøbelastning',
      },
    ],
    problemHeading: 'Vandhygiejne i hoteller – en overset risikofaktor',
    problemBody:
      'Selv klart vand kan indeholde bakterier som Pseudomonas og Legionella, der trives i varme, stillestående vandinstallationer. Et enkelt brusebad kan blive en smittekilde. Sterile filtre stopper bakterierne direkte ved tappestedet og beskytter dine gæster effektivt.',
    benefits: [
      'Forebyg sygdomsudbrud og Legionella-risiko',
      'Dokumentér høj hygiejnestandard over for gæster og myndigheder',
      'Reducer driftsomkostninger',
      'Styrk dit brand og omdømme',
      'Forlæng vandinstallationernes levetid',
    ],
    contactPerson: 'kenneth',
  },
  {
    id: 'svoemmehaller',
    title: 'Svømmehaller',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-svoemmehaller.jpg',
    intro: 'Svømmehaller – En overset risikofaktor',
    values: [
      {
        title: 'Tryghed for besøgende',
        body: 'Bakteriefrit vand beskytter mod Legionella og andre patogener i hele anlægget',
      },
      {
        title: 'Effektiv drift og lavere risiko',
        body: 'Rene installationer reducerer behovet for kemisk rengøring og nedetid',
      },
      {
        title: 'Bæredygtig og ansvarlig drift',
        body: 'Sterile filtre minimerer vandforbrug, kemikaliebrug og miljøpåvirkning',
      },
    ],
    problemHeading: 'Rent vand – en del af den gode brugeroplevelse',
    problemBody:
      'Selv klart vand kan indeholde bakterier, som trives i varme eller stillestående vandmiljøer – fx i bassiner, jacuzzier og skyllerum. Et bakterieudbrud i en svømmehal kan få store konsekvenser både sundhedsmæssigt og omdømmemæssigt.',
    benefits: [
      'Forebyg sygdomsudbrud',
      'Dokumentér høj hygiejnestandard',
      'Reducer driftsomkostninger',
      'Styrk dit brand',
      'Forlæng vandinstallationernes levetid',
    ],
    contactPerson: 'kristoffer',
  },
  {
    id: 'hospitaler',
    title: 'Hospitaler',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-hospitaler.jpg',
    intro: 'Hospitaler – Hvor hver dråbe tæller for sikkerheden',
    values: [
      {
        title: 'Sikkerhed for patienter og personale',
        body: 'Beskytter immunsvækkede patienter mod Legionella, Pseudomonas og andre vandbårne bakterier',
      },
      {
        title: 'Forebyg infektioner og driftstop',
        body: 'Undgå dyre udbrud og dokumentér din vandhygiejne over for myndighederne',
      },
      {
        title: 'Sikker, effektiv og dokumenterbar drift',
        body: 'Internationalt testede løsninger der opfylder de strengeste hygiejnekrav',
      },
    ],
    problemHeading: 'Rent vand – en del af sikker patientpleje',
    problemBody:
      'Over 90.000 mennesker mister hvert år livet i EU på grund af hospitalsinfektion. Forskere har fundet 67 forskellige bakterietyper i hospitalers håndvaske trods gentagen rengøring. Infektioner koster det europæiske sundhedsvæsen op mod 178 milliarder kroner årligt.',
    benefits: [
      'Forebyg smittespredning og infektioner',
      'Undgå driftstop og dyr oprensning',
      'Dokumentér vandkvalitet til myndighederne',
      'Opbyg tillid hos patienter og personale',
      'Forlæng installationernes levetid og reducer omkostninger',
    ],
    contactPerson: 'kenneth',
  },
  {
    id: 'campingpladser',
    title: 'Campingpladser',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-campingpladser.jpg',
    intro: 'Campingpladser – En skjult risiko i det frie liv',
    values: [
      {
        title: 'Tryghed for gæster',
        body: 'Gæsterne skal kunne stole på, at vandet er rent og sikkert under hele opholdet',
      },
      {
        title: 'Forebyg bakterievækst',
        body: 'Sæsonbetonede anlæg med stillestående vand er ideelle levesteder for Legionella og Pseudomonas',
      },
      {
        title: 'Effektiv drift',
        body: 'Sterile filtre reducerer kemikaliebehov, rengøringscyklusser og vedligeholdelse',
      },
    ],
    problemHeading: 'Rent vand på campingpladsen',
    problemBody:
      'Campingpladser med sæsonpræget drift er særligt udsatte, da vandinstallationerne står ubenyttede i vinterhalvåret. Stillestående vand i rør og tanke skaber ideelle betingelser for Legionella-vækst. Effektiv filtrering ved brusere og vandhaner er den nemmeste og mest direkte beskyttelse.',
    benefits: [
      'Forebyg sygdomsudbrud og Legionella-risiko',
      'Dokumentér hygiejnestandard over for gæster og myndigheder',
      'Reducer driftsomkostninger',
      'Styrk dit brand med bæredygtige løsninger',
      'Forlæng vandinstallationernes levetid',
    ],
    contactPerson: 'kristoffer',
  },
  {
    id: 'det-private-hjem',
    title: 'Det private hjem',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-det-private-hjem.jpg',
    intro: 'Rent vand – tryghed i hverdagen',
    values: [
      {
        title: 'Tryghed for hele familien',
        body: 'Beskyttelse mod bakterier som Legionella og Pseudomonas, der kan trives i varmt vand',
      },
      {
        title: 'Forebyg bakterievækst og sygdom',
        body: 'Effektiv løsning til stillestående vand i gæsteværelser og sommerhuse',
      },
      {
        title: 'Nem, effektiv og bæredygtig beskyttelse',
        body: 'Sterile filtre med minimal vedligeholdelse og lang levetid',
      },
    ],
    problemHeading: 'Rent vand – en del af et sundere hjem',
    problemBody:
      'Klart vand kan indeholde bakterier der trives i varme vandsystemer og rør. Bakterier som Legionella og Pseudomonas danner biofilm der er modstandsdygtig over for rengøring og varmebehandling. Et nyt europæisk studie har vist at bakterier i vandinstallationer hvert år fører til titusindvis af infektioner i EU.',
    benefits: [
      'Forebyg bakterievækst og sygdom',
      'Sikr rent og sikkert vand til hele familien',
      'Undgå dyre vedligeholdelsesopgaver',
      'Beskyt sårbare personer mod sundhedsrisici',
      'Enkel installation – ingen håndværker nødvendig',
    ],
    contactPerson: 'kenneth',
  },
  {
    id: 'foedevare',
    title: 'Fødevareindustri',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/foedevare-groent.jpg',
    intro: 'ECA-vand: et sikkert og miljøvenligt valg til fødevareindustrien',
    values: [
      {
        title: 'Effektiv desinfektion',
        body: 'Effektiv mod bakterier, vira og svampe inkl. Salmonella, E. coli og Listeria',
      },
      {
        title: 'Ingen resistensudvikling',
        body: 'Minimal risiko for resistensudvikling sammenlignet med traditionelle desinfektionsmidler',
      },
      {
        title: 'Ingen farlig kemi',
        body: 'Ingen skadelige biprodukter – reducerer medarbejdernes eksponering for farlige kemikalier',
      },
    ],
    problemHeading: 'Kemikaliefri desinfektion til fremtiden',
    problemBody:
      'I fødevareproduktion er hygiejne ikke til forhandling. ECA-vand er en moderne desinfektionsmetode baseret på elektrolyse af saltvand. Den aktive bestanddel, hypoklorsyre (HOCl), eliminerer effektivt patogener inklusive Salmonella, E. coli og Listeria – uden kemikalierester og uden at påvirke madens smag.',
    benefits: [
      'Effektiv mod Salmonella, E. coli og Listeria',
      'Ingen skadelige rester eller kemikalier',
      'Ingen resistensudvikling hos bakterier',
      'Sikker for medarbejdere, forbrugere og miljø',
      'Kan erstatte traditionelle kemiske desinfektionsmidler',
    ],
    contactPerson: 'kenneth',
  },
  {
    id: 'landbruget',
    title: 'Landbrug',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-landbruget.jpg',
    video: '/videos/landbrug-cover.mp4',
    videoPoster: '/images/landbrug-cover-poster.jpg',
    videoHeading: 'Elektrolyseret vand i landbruget',
    videoBody: 'Yverbetændelse (mastitis) er en af de dyreste sygdomme i mælkeproduktionen – med et gennemsnitligt tab på omkring 250 euro pr. ko om året. I videoen ser du, hvordan elektrolyseret vand (hypoklorsyre) kan erstatte jodbaserede produkter til pattedypning: lige så effektivt mod bakterier, men klorfrit, ugiftigt og for blot få cent pr. ko om året.',
    intro: 'ECA-vand i landbruget',
    values: [
      {
        title: 'Mikrobiologisk rent vand',
        body: 'Bakteriefrit vand til dyrene øger drikkelysten og foderoptaget markant',
      },
      {
        title: 'Bedre dyrevelværd',
        body: 'Færre bakterier i vandinstallationerne giver sundere dyr og lavere medicinomkostninger',
      },
      {
        title: 'Bæredygtig løsning',
        body: 'Kemikaliefri desinfektion der er sikker for dyr, medarbejdere og miljø',
      },
    ],
    problemHeading: 'Mikrobiologisk rent vand forøger indtjeningen',
    problemBody:
      'Bakterier i vandinstallationer på landbrugsejendomme påvirker dyrevelfærd og produktivitet negativt. ECA-vand bekæmper biofilm og bakterier i hele vandsystemet – fra vandtank til drikketrug. Fordelene er direkte målbare: mindre smittetryk, større drikkelyst, større foderoptag og bedre dyrevelværd.',
    benefits: [
      'Mindre smittetryk i besætningen',
      'Større drikkelyst og foderoptag',
      'Lavere medicinomkostninger',
      'Bedre dyrevelværd og hygiejne',
      'Kemikaliefri og bæredygtig løsning',
    ],
    contactPerson: 'kristoffer',
  },
]

export function getSektorById(id: string): Sektor | undefined {
  return sektorer.find((s) => s.id === id)
}
