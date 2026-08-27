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
const RULES: Rule[] = [
  {
    keywords: ['fast disk', 'fast-disk', 'lai-1003', 'healthexpert', 'health expert', 'lai-1004'],
    restockISO: '2026-09-03',
    restockLabel: '3. september 2026',
  },
]

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
