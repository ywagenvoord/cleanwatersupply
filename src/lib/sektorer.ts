export type ContactPerson = 'kenneth' | 'kristoffer'

export interface SektorContent {
  title: string
  tagline: string
  intro: string
  values: { title: string; body: string }[]
  problemHeading: string
  problemBody: string
  benefits: string[]
  videoHeading?: string
  videoBody?: string
}

export interface Sektor extends SektorContent {
  id: string
  heroImage: string
  video?: string        // valgfri video-afsnit på siden (mp4)
  videoPoster?: string  // poster-billede til video
  contactPerson: ContactPerson
  en: SektorContent     // engelsk indhold (vises når sprog = en)
}

export const sektorer: Sektor[] = [
  {
    id: 'hoteller',
    title: 'Hoteller',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-hoteller.jpg',
    intro: 'Hoteller – En overset risikofaktor',
    values: [
      { title: 'Tryghed for gæster', body: 'Bakteriefrit vand beskytter gæster mod Legionella og andre skadelige mikroorganismer' },
      { title: 'Effektiv drift og lavere risiko', body: 'Reducerer behovet for kemisk rengøring og sænker vedligeholdelsesomkostningerne' },
      { title: 'Ansvarlig og driftssikker løsning', body: 'Sterile filtre med lang levetid og lavt vedligehold' },
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
    en: {
      title: 'Hotels',
      tagline: 'Use a filter – Know the risk and take responsibility',
      intro: 'Hotels – An overlooked risk factor',
      values: [
        { title: 'Peace of mind for guests', body: 'Bacteria-free water protects guests against Legionella and other harmful microorganisms' },
        { title: 'Efficient operation and lower risk', body: 'Reduces the need for chemical cleaning and lowers maintenance costs' },
        { title: 'Responsible and reliable solution', body: 'Sterile filters with a long lifespan and low maintenance' },
      ],
      problemHeading: 'Water hygiene in hotels – an overlooked risk factor',
      problemBody:
        'Even clear water can contain bacteria such as Pseudomonas and Legionella, which thrive in warm, stagnant water installations. A single shower can become a source of infection. Sterile filters stop the bacteria directly at the outlet and protect your guests effectively.',
      benefits: [
        'Prevent outbreaks and Legionella risk',
        'Document a high hygiene standard to guests and authorities',
        'Reduce operating costs',
        'Strengthen your brand and reputation',
        'Extend the lifespan of water installations',
      ],
    },
  },
  {
    id: 'svoemmehaller',
    title: 'Svømmehaller',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-svoemmehaller.jpg',
    intro: 'Svømmehaller – En overset risikofaktor',
    values: [
      { title: 'Tryghed for besøgende', body: 'Bakteriefrit vand beskytter mod Legionella og andre patogener i hele anlægget' },
      { title: 'Effektiv drift og lavere risiko', body: 'Rene installationer reducerer behovet for kemisk rengøring og nedetid' },
      { title: 'Ansvarlig og driftssikker løsning', body: 'Sterile filtre med lang levetid og minimalt vedligehold' },
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
    en: {
      title: 'Swimming pools',
      tagline: 'Use a filter – Know the risk and take responsibility',
      intro: 'Swimming pools – An overlooked risk factor',
      values: [
        { title: 'Peace of mind for visitors', body: 'Bacteria-free water protects against Legionella and other pathogens throughout the facility' },
        { title: 'Efficient operation and lower risk', body: 'Clean installations reduce the need for chemical cleaning and downtime' },
        { title: 'Responsible and reliable solution', body: 'Sterile filters with a long lifespan and minimal maintenance' },
      ],
      problemHeading: 'Clean water – part of a great visitor experience',
      problemBody:
        'Even clear water can contain bacteria that thrive in warm or stagnant water environments – e.g. in pools, jacuzzis and rinse rooms. A bacterial outbreak in a swimming pool can have major consequences for both health and reputation.',
      benefits: [
        'Prevent outbreaks',
        'Document a high hygiene standard',
        'Reduce operating costs',
        'Strengthen your brand',
        'Extend the lifespan of water installations',
      ],
    },
  },
  {
    id: 'hospitaler',
    title: 'Hospitaler',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-hospitaler.jpg',
    intro: 'Hospitaler – Hvor hver dråbe tæller for sikkerheden',
    values: [
      { title: 'Sikkerhed for patienter og personale', body: 'Beskytter immunsvækkede patienter mod Legionella, Pseudomonas og andre vandbårne bakterier' },
      { title: 'Forebyg infektioner og driftstop', body: 'Undgå dyre udbrud og dokumentér din vandhygiejne over for myndighederne' },
      { title: 'Sikker, effektiv og dokumenterbar drift', body: 'Internationalt testede løsninger der opfylder de strengeste hygiejnekrav' },
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
    en: {
      title: 'Hospitals',
      tagline: 'Use a filter – Know the risk and take responsibility',
      intro: 'Hospitals – Where every drop counts for safety',
      values: [
        { title: 'Safety for patients and staff', body: 'Protects immunocompromised patients against Legionella, Pseudomonas and other waterborne bacteria' },
        { title: 'Prevent infections and downtime', body: 'Avoid costly outbreaks and document your water hygiene to the authorities' },
        { title: 'Safe, efficient and documentable operation', body: 'Internationally tested solutions that meet the strictest hygiene requirements' },
      ],
      problemHeading: 'Clean water – part of safe patient care',
      problemBody:
        'Every year more than 90,000 people die in the EU due to hospital-acquired infection. Researchers have found 67 different bacteria types in hospital sinks despite repeated cleaning. Infections cost the European health services up to EUR 24 billion annually.',
      benefits: [
        'Prevent the spread of infection',
        'Avoid downtime and costly remediation',
        'Document water quality to the authorities',
        'Build trust with patients and staff',
        'Extend installation lifespan and reduce costs',
      ],
    },
  },
  {
    id: 'campingpladser',
    title: 'Campingpladser',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-campingpladser.jpg',
    intro: 'Campingpladser – En skjult risiko i det frie liv',
    values: [
      { title: 'Tryghed for gæster', body: 'Gæsterne skal kunne stole på, at vandet er rent og sikkert under hele opholdet' },
      { title: 'Forebyg bakterievækst', body: 'Sæsonbetonede anlæg med stillestående vand er ideelle levesteder for Legionella og Pseudomonas' },
      { title: 'Effektiv drift', body: 'Sterile filtre reducerer kemikaliebehov, rengøringscyklusser og vedligeholdelse' },
    ],
    problemHeading: 'Rent vand på campingpladsen',
    problemBody:
      'Campingpladser med sæsonpræget drift er særligt udsatte, da vandinstallationerne står ubenyttede i vinterhalvåret. Stillestående vand i rør og tanke skaber ideelle betingelser for Legionella-vækst. Effektiv filtrering ved brusere og vandhaner er den nemmeste og mest direkte beskyttelse.',
    benefits: [
      'Forebyg sygdomsudbrud og Legionella-risiko',
      'Dokumentér hygiejnestandard over for gæster og myndigheder',
      'Reducer driftsomkostninger',
      'Styrk dit brand med driftssikre løsninger',
      'Forlæng vandinstallationernes levetid',
    ],
    contactPerson: 'kristoffer',
    en: {
      title: 'Campsites',
      tagline: 'Use a filter – Know the risk and take responsibility',
      intro: 'Campsites – A hidden risk in the great outdoors',
      values: [
        { title: 'Peace of mind for guests', body: 'Guests should be able to trust that the water is clean and safe throughout their stay' },
        { title: 'Prevent bacterial growth', body: 'Seasonal facilities with stagnant water are ideal habitats for Legionella and Pseudomonas' },
        { title: 'Efficient operation', body: 'Sterile filters reduce chemical use, cleaning cycles and maintenance' },
      ],
      problemHeading: 'Clean water at the campsite',
      problemBody:
        'Campsites with seasonal operation are particularly exposed, as the water installations stand unused during the winter. Stagnant water in pipes and tanks creates ideal conditions for Legionella growth. Effective filtration at showers and taps is the easiest and most direct protection.',
      benefits: [
        'Prevent outbreaks and Legionella risk',
        'Document a hygiene standard to guests and authorities',
        'Reduce operating costs',
        'Strengthen your brand with reliable solutions',
        'Extend the lifespan of water installations',
      ],
    },
  },
  {
    id: 'det-private-hjem',
    title: 'Det private hjem',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/area-det-private-hjem.jpg',
    intro: 'Rent vand – tryghed i hverdagen',
    values: [
      { title: 'Tryghed for hele familien', body: 'Beskyttelse mod bakterier som Legionella og Pseudomonas, der kan trives i varmt vand' },
      { title: 'Forebyg bakterievækst og sygdom', body: 'Effektiv løsning til stillestående vand i gæsteværelser og sommerhuse' },
      { title: 'Nem og effektiv beskyttelse', body: 'Sterile filtre med minimal vedligeholdelse og lang levetid' },
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
    en: {
      title: 'The private home',
      tagline: 'Use a filter – Know the risk and take responsibility',
      intro: 'Clean water – peace of mind in everyday life',
      values: [
        { title: 'Peace of mind for the whole family', body: 'Protection against bacteria such as Legionella and Pseudomonas, which can thrive in warm water' },
        { title: 'Prevent bacterial growth and illness', body: 'An effective solution for stagnant water in guest rooms and holiday homes' },
        { title: 'Easy and effective protection', body: 'Sterile filters with minimal maintenance and a long lifespan' },
      ],
      problemHeading: 'Clean water – part of a healthier home',
      problemBody:
        'Clear water can contain bacteria that thrive in warm water systems and pipes. Bacteria such as Legionella and Pseudomonas form biofilm that is resistant to cleaning and heat treatment. A new European study has shown that bacteria in water installations lead to tens of thousands of infections in the EU every year.',
      benefits: [
        'Prevent bacterial growth and illness',
        'Ensure clean and safe water for the whole family',
        'Avoid costly maintenance tasks',
        'Protect vulnerable people from health risks',
        'Simple installation – no tradesperson needed',
      ],
    },
  },
  {
    id: 'foedevare',
    title: 'Fødevareindustri',
    tagline: 'Brug filter – Kend risikoen og tag ansvar',
    heroImage: '/images/foedevare-groent.jpg',
    intro: 'ECA-vand: et sikkert og kemikaliefrit valg til fødevareindustrien',
    values: [
      { title: 'Effektiv desinfektion', body: 'Effektiv mod bakterier, vira og svampe inkl. Salmonella, E. coli og Listeria' },
      { title: 'Ingen resistensudvikling', body: 'Minimal risiko for resistensudvikling sammenlignet med traditionelle desinfektionsmidler' },
      { title: 'Ingen farlig kemi', body: 'Ingen skadelige biprodukter – reducerer medarbejdernes eksponering for farlige kemikalier' },
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
    en: {
      title: 'Food industry',
      tagline: 'Use a filter – Know the risk and take responsibility',
      intro: 'ECA water: a safe and chemical-free choice for the food industry',
      values: [
        { title: 'Effective disinfection', body: 'Effective against bacteria, viruses and fungi incl. Salmonella, E. coli and Listeria' },
        { title: 'No resistance development', body: 'Minimal risk of resistance development compared to traditional disinfectants' },
        { title: 'No hazardous chemistry', body: 'No harmful by-products – reduces employees’ exposure to hazardous chemicals' },
      ],
      problemHeading: 'Chemical-free disinfection for the future',
      problemBody:
        'In food production, hygiene is non-negotiable. ECA water is a modern disinfection method based on the electrolysis of salt water. The active component, hypochlorous acid (HOCl), effectively eliminates pathogens including Salmonella, E. coli and Listeria – without chemical residues and without affecting the taste of the food.',
      benefits: [
        'Effective against Salmonella, E. coli and Listeria',
        'No harmful residues or chemicals',
        'No resistance development in bacteria',
        'Safe for employees, consumers and the environment',
        'Can replace traditional chemical disinfectants',
      ],
    },
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
      { title: 'Mikrobiologisk rent vand', body: 'Bakteriefrit vand til dyrene øger drikkelysten og foderoptaget markant' },
      { title: 'Bedre dyrevelværd', body: 'Færre bakterier i vandinstallationerne giver sundere dyr og lavere medicinomkostninger' },
      { title: 'Skånsom løsning', body: 'Kemikaliefri desinfektion der er sikker for dyr og medarbejdere' },
    ],
    problemHeading: 'Mikrobiologisk rent vand forøger indtjeningen',
    problemBody:
      'Bakterier i vandinstallationer på landbrugsejendomme påvirker dyrevelfærd og produktivitet negativt. ECA-vand bekæmper biofilm og bakterier i hele vandsystemet – fra vandtank til drikketrug. Fordelene er direkte målbare: mindre smittetryk, større drikkelyst, større foderoptag og bedre dyrevelværd.',
    benefits: [
      'Mindre smittetryk i besætningen',
      'Større drikkelyst og foderoptag',
      'Lavere medicinomkostninger',
      'Bedre dyrevelværd og hygiejne',
      'Kemikaliefri løsning',
    ],
    contactPerson: 'kristoffer',
    en: {
      title: 'Agriculture',
      tagline: 'Use a filter – Know the risk and take responsibility',
      intro: 'ECA water in agriculture',
      videoHeading: 'Electrolysed water in agriculture',
      videoBody: 'Mastitis is one of the most expensive diseases in milk production – with an average loss of around EUR 250 per cow per year. In the video you can see how electrolysed water (hypochlorous acid) can replace iodine-based products for teat dipping: just as effective against bacteria, but chlorine-free, non-toxic and for just a few cents per cow per year.',
      values: [
        { title: 'Microbiologically clean water', body: 'Bacteria-free water for the animals markedly increases their water and feed intake' },
        { title: 'Better animal welfare', body: 'Fewer bacteria in the water installations means healthier animals and lower medicine costs' },
        { title: 'Gentle solution', body: 'Chemical-free disinfection that is safe for animals and staff' },
      ],
      problemHeading: 'Microbiologically clean water increases earnings',
      problemBody:
        'Bacteria in water installations on farms negatively affect animal welfare and productivity. ECA water fights biofilm and bacteria throughout the water system – from water tank to drinking trough. The benefits are directly measurable: lower infection pressure, greater water intake, greater feed intake and better animal welfare.',
      benefits: [
        'Lower infection pressure in the herd',
        'Greater water and feed intake',
        'Lower medicine costs',
        'Better animal welfare and hygiene',
        'Chemical-free solution',
      ],
    },
  },
]

export function getSektorById(id: string): Sektor | undefined {
  return sektorer.find((s) => s.id === id)
}
