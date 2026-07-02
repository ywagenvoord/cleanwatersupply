// Kørselszoner for montering – vejledende inddeling efter postnummer.
// Bygget ud fra "Midt Prisliste"-kortet (landsdele). Endelig pris bekræftes ved bestilling.

export type Zone = 'bla' | 'gron' | 'rod'

export const ZONE_INFO: Record<Zone, { label: string; surcharge: number; color: string; note: string }> = {
  bla:  { label: 'Blå zone',  surcharge: 0,    color: '#1d4ed8', note: 'Kørsel inkluderet' },
  gron: { label: 'Grøn zone', surcharge: 750,  color: '#15803d', note: '+750 kr. (ekskl. moms)' },
  rod:  { label: 'Rød zone',  surcharge: 1500, color: '#dc2626', note: '+1.500 kr. (ekskl. moms)' },
}

/** Finder zonen for et dansk postnummer (1000–9999). Returnerer undefined hvis ugyldigt. */
export function zoneForPostnummer(input: string): Zone | undefined {
  const pn = parseInt(input.trim(), 10)
  if (isNaN(pn) || pn < 1000 || pn > 9999) return undefined

  // Sjælland, Lolland-Falster, Møn, Nordsjælland + Bornholm → rød
  if (pn >= 1000 && pn <= 4999) return 'rod'

  // Midt-/Østjylland (lokalområdet omkring Horsens) → blå (inkluderet)
  if (pn >= 7000 && pn <= 7399) return 'bla'   // Fredericia, Vejle, Give, Brande
  if (pn >= 8000 && pn <= 8999) return 'bla'   // Aarhus, Silkeborg, Skanderborg, Horsens, Viborg, Randers

  // Fyn, Syd-, Vest- og Nordjylland → grøn
  if (pn >= 5000 && pn <= 6999) return 'gron'  // Fyn + Sønderjylland/Sydvestjylland
  if (pn >= 7400 && pn <= 7999) return 'gron'  // Herning, Holstebro, Thisted, Skive
  if (pn >= 9000 && pn <= 9999) return 'gron'  // Aalborg, Hjørring, Frederikshavn, Skagen

  return undefined
}
