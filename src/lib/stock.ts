// Central "udsolgt"-styring.
// Marker produkter som midlertidigt udsolgt med en forventet lager-dato.
// Matcher på produktnavn/id/varenr, så det virker for både hardcodede og
// Stripe-drevne produkter uden at skulle rette data flere steder.

export type StockInfo = {
  soldOut: true
  restockISO: string    // maskinlæsbar dato til JSON-LD (YYYY-MM-DD)
  restockLabel: string  // vises til kunden
}

type Rule = {
  keywords: string[]     // små bogstaver; matcher hvis ét indgår i navn/id/varenr
  restockISO: string
  restockLabel: string
}

// Tilføj/fjern produkter her, når lagerstatus ændrer sig.
const RESTOCK_ISO = '2026-09-29'
const RESTOCK_LABEL = 'tirsdag d. 29. september'

const RULES: Rule[] = [
  // Ingen udsolgte varer – alt er på lager igen.
]

// Fjernlager: varen er på lager, men ligger på eksternt lager med lidt længere
// leveringstid. Vises som "På fjernlager · forvent 1+ dags levering".
// Keyet på produkt-id (matcher også via includes på navn/id, se remoteStockFor).
const REMOTE_STOCK_IDS = new Set<string>([
  'brusehoved-filter-acf',      // Brusehoved med vandfilter – komplet
  'brusehoved-til-filter',      // Brusehoved med udskifteligt filter
  'brusefilter-acf',            // Udskiftningsfilter til brusehoved
  'brusefilter-acf-vitamin-c',  // + C-vitamin
  'brusefilter-acf-amino-acid', // + kalkhæmmer
])

export function isRemoteStock(p: { id?: string; stripeProductId?: string }): boolean {
  return !!(p.id && REMOTE_STOCK_IDS.has(p.id)) ||
         !!(p.stripeProductId && REMOTE_STOCK_IDS.has(p.stripeProductId))
}

// Lav-lager-besked ("Kun X tilbage på lager"), keyet på Stripe-produkt-id eller produkt-id.
const LOW_STOCK: Record<string, number> = {
  // (ingen aktive lav-lager-produkter)
}

export function lowStockFor(p: { stripeProductId?: string; id?: string }): number | undefined {
  const key = p.stripeProductId || p.id
  return key ? LOW_STOCK[key] : undefined
}

export function stockFor(p: {
  id?: string
  name?: string
  stripeProductId?: string
  productNr?: string
  varenr?: string
}): StockInfo | null {
  const hay = `${p.id ?? ''} ${p.name ?? ''} ${p.stripeProductId ?? ''} ${p.productNr ?? ''} ${p.varenr ?? ''}`.toLowerCase()
  for (const r of RULES) {
    if (r.keywords.some((k) => hay.includes(k))) {
      return { soldOut: true, restockISO: r.restockISO, restockLabel: r.restockLabel }
    }
  }
  return null
}
