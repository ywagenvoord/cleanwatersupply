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
 * Udvalgte kategorier på tilbud + rabatprocent.
 * Nøglen er produktets `category` (se src/lib/products.ts).
 * ▼ Ret frit i procenter/kategorier.
 */
export const BLACK_DISCOUNTS: Record<string, number> = {
  bruser: 25, // Brusefiltre
  vandhane: 25, // Vandhanefiltre
  vandkande: 20, // Filterkander & vandkande-filtre
}

/** Kategorier til visning (badges, knapper). */
export const BLACK_CATEGORIES = [
  { key: 'bruser', label: 'Brusefiltre', href: '/loesninger/brusefilter', percent: 25 },
  { key: 'vandhane', label: 'Vandhanefiltre', href: '/loesninger/filtre-paa-tappestedet', percent: 25 },
  { key: 'vandkande', label: 'Filterkander', href: '/vandkander', percent: 20 },
]

/** Højeste rabat (til "spar op til X%"). */
export const BLACK_MAX = Math.max(...Object.values(BLACK_DISCOUNTS))

/** Rabatprocent for en given produktkategori (0 hvis ikke på tilbud). */
export function blackPercentFor(category?: string): number {
  return category ? (BLACK_DISCOUNTS[category] ?? 0) : 0
}

/** Beregn Black Month-pris ud fra normalpris og procent. */
export function blackPrice(normal: number, pct: number): number {
  return Math.round(normal * (1 - pct / 100))
}
