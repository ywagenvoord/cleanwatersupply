// Fødselsdags-kampagne – dato-styret, så den tænder/slukker af sig selv.
//
// Clean Water Supply fylder år den 3. oktober. Temaet (festligt banner,
// flag-regn og fødselsdagstilbud) vises KUN den ene dag.
//
// Vil du se udkastet UDEN at vente på dagen (fx på Localhost)?
//   → åbn forsiden med ?fodselsdag=1 i adressen, fx:
//     http://localhost:3000/private?fodselsdag=1
//   Eller sæt BIRTHDAY_PREVIEW = true herunder (husk at sætte den tilbage
//   til false, før du synker/udgiver).

export const BIRTHDAY = {
  // Kampagnen går live i ét døgn: fra 2/11-2026 kl. 23:59 til 3/11-2026 kl. 23:59.
  // (Dansk tid – november er normaltid, så +01:00.)
  start: new Date('2026-11-02T23:59:00+01:00'),
  end: new Date('2026-11-03T23:59:00+01:00'),
  years: 3,
  dateLabel: '3. november 2026',
}

/** Preview-flag. FALSE = kampagnen er dato-styret og går kun live i vinduet
 *  ovenfor (2/11-2026 23:59 → 3/11-2026 23:59). Sæt midlertidigt til true,
 *  eller åbn en side med ?fodselsdag=1, hvis du vil se den før da. */
export const BIRTHDAY_PREVIEW = false

/** Er fødselsdagen aktiv lige nu (ren dato – bruges server-side)? */
export function isBirthdayDate(now: Date = new Date()): boolean {
  return now >= BIRTHDAY.start && now <= BIRTHDAY.end
}

/**
 * Fødselsdagstilbuddet: −30 % på alle filterkander og vandkande-filtre.
 * Selve rabatten oprettes som en pris i Stripe, der kun gælder den ene dag –
 * her står kun teksten/visningen på siden.
 */
export const BIRTHDAY_DISCOUNT = {
  percent: 30,
  // De kategorier tilbuddet gælder (bruges til badges + knapper).
  categories: [
    { slug: 'vandkande', label: 'Filterkander', href: '/vandkander' },
    { slug: 'vandkande-filtre', label: 'Filtre til vandkander', href: '/vandkande-filtre' },
  ],
}

/** Slugs (fra solutions-listen), der skal have et fødselsdags-badge. */
export const BIRTHDAY_DEAL_SLUGS = BIRTHDAY_DISCOUNT.categories.map((c) => c.slug)

/** Beregn fødselsdagsprisen (−30 %) ud fra normalprisen. */
export function birthdayPrice(normal: number): number {
  return Math.round(normal * (1 - BIRTHDAY_DISCOUNT.percent / 100))
}

/**
 * Produkterne der vises i fødselsdagssektionen (filterkander + vandkande-filtre).
 * Normalprisen (price) står her; −30 %-prisen regnes automatisk med birthdayPrice().
 * ▼ Ret frit i navne/priser/billeder/links.
 */
export type BirthdayOffer = { name: string; img: string; price: number; href: string }

export const BIRTHDAY_OFFERS: BirthdayOffer[] = [
  { name: 'Vandfilterkande – Germ-STOP', img: '/images/kande-germ-stop.png', price: 399, href: '/vandkander/germ-stop' },
  { name: 'Vandkaraffel GlaSSmart', img: '/images/glassmart-flaske-t.png', price: 199, href: '/vandkander/glassmart' },
  { name: 'Filterkande – Carmen', img: '/images/kande-carmen.jpg', price: 189, href: '/vandkander/carmen' },
  { name: 'Bi-flux® HealthExpert', img: '/images/filter-healthexpert-v2.jpg', price: 109, href: '/vandkande-filtre/bi-flux-healthexpert' },
  { name: 'Bi-flux® Universal', img: '/images/filter-universal-v2.jpg', price: 89, href: '/vandkande-filtre/bi-flux-universal' },
  { name: 'Bi-flux® LimescaleSTOP', img: '/images/filter-limescalestop-v2.jpg', price: 99, href: '/vandkande-filtre/bi-flux-limescalestop' },
]
