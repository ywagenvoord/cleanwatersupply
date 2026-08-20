// Kampagner – dato-styret, så de tænder/slukker af sig selv.

/**
 * Gratis montering-kampagne.
 * Kører fra 20/8-2026 til og med 20/9-2026. Kørsel (zonetillæg) tillægges fortsat.
 * Slutdatoen er inklusiv (gælder hele den dag).
 */
export const GRATIS_MONTERING = {
  start: new Date('2026-08-20T00:00:00+02:00'),
  end: new Date('2026-09-20T23:59:59+02:00'),
  endLabel: '20. september 2026',
}

/** Er gratis montering-kampagnen aktiv lige nu? */
export function isGratisMonteringActive(now: Date = new Date()): boolean {
  return now >= GRATIS_MONTERING.start && now <= GRATIS_MONTERING.end
}
