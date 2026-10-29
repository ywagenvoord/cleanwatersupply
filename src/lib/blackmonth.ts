// Black Month-kampagne – dato-styret. Kører hele november.
// Fødselsdagen (2.-3. nov) har FORRANG: når fødselsdagen er aktiv, vises
// Black Month ikke (så de to kampagner ikke slås oveni hinanden).

import { isBirthdayDate } from './birthday'

export const BLACK_MONTH = {
  start: new Date('2026-11-01T00:00:00+01:00'),
  end: new Date('2026-11-30T23:59:59+01:00'),
  endLabel: '30. november',
}

/** Preview under udvikling. TRUE = temaet vises nu (så du kan se det på localhost).
 *  HUSK at sætte til false før udgivelse – ellers vises Black Month hele tiden.
 *  (Du kan også se den med ?blackmonth=1 i adressen.) */
export const BLACK_MONTH_PREVIEW = true

/** Er vi i Black Month-perioden (ren dato)? */
export function isBlackMonthDate(now: Date = new Date()): boolean {
  return now >= BLACK_MONTH.start && now <= BLACK_MONTH.end
}

/** Aktiv = i perioden, men IKKE når fødselsdagen kører (den har forrang). */
export function isBlackMonthActive(now: Date = new Date()): boolean {
  return isBlackMonthDate(now) && !isBirthdayDate(now)
}

/**
 * Hele kategorier på tilbud (nøgle = produktets `category`).
 * Kun Laica/filterkander & vandkande-filtre er med som fuld kategori.
 */
export const BLACK_DISCOUNTS: Record<string, number> = {
  vandkande: 25, // Filterkander & vandkande-filtre (Laica)
}

/**
 * Enkelt-produkter på tilbud (nøgle = produktets id → rabat%).
 * ▼ Ret frit – kun disse specifikke varer er på tilbud (ud over Laica-kategorien).
 */
export const BLACK_PRODUCT_DISCOUNTS: Record<string, number> = {
  'baclyser-neo-tr-2m': 20,
  'baclyser-neo-tr-3m': 20,
  'baclyser-neo-tl-2m': 20,
  'baclyser-neo-tl-3m': 20,
  'cblue-sc3': 20,
  'cblue-sc3-filter': 20,
}

/** Kategorier/grupper til visning (kort i tilbudssektionen). */
export const BLACK_CATEGORIES = [
  { key: 'vandhane', label: 'Baclyser® neo hanefiltre', href: '/loesninger/filtre-paa-tappestedet', percent: 20 },
  { key: 'bruser', label: 'cBlue brusefiltre', href: '/loesninger/brusefilter', percent: 20 },
  { key: 'vandkande', label: 'Filterkander & filtre', href: '/vandkander', percent: 25 },
]

/** Højeste rabat (til "spar op til X%"). */
export const BLACK_MAX = Math.max(
  ...Object.values(BLACK_DISCOUNTS),
  ...Object.values(BLACK_PRODUCT_DISCOUNTS),
)

/** Produkter der ALDRIG er med i Black Month (fx manuelle adaptere/koblinger),
 *  selvom deres kategori er på tilbud. */
export const BLACK_EXCLUDE_IDS = new Set<string>([
  'coupling-m22',
  'coupling-m24',
  'manuel-adapter-m22',
  'manuel-adapter-m24',
  'adapter-straalesamler-m22',
  'adapter-straalesamler-m24',
])

/** Rabatprocent for et produkt (0 hvis ikke på tilbud eller undtaget).
 *  Rækkefølge: undtaget → specifikt produkt-tilbud → hel kategori (kun vandkande). */
export function blackPercentFor(category?: string, id?: string): number {
  if (id && BLACK_EXCLUDE_IDS.has(id)) return 0
  if (id && BLACK_PRODUCT_DISCOUNTS[id] != null) return BLACK_PRODUCT_DISCOUNTS[id]
  return category ? (BLACK_DISCOUNTS[category] ?? 0) : 0
}

/** Beregn Black Month-pris ud fra normalpris og procent. */
export function blackPrice(normal: number, pct: number): number {
  return Math.round(normal * (1 - pct / 100))
}
