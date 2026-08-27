// Delt produktdata til både privat- og erhvervs-shoppen.
// Henter Stripe-produkter ved request-tid og fletter med den hardcodede liste.

import { getActiveStripeProducts } from '@/lib/stripe-fetch'
import { PRODUCTS, type Product } from '@/lib/products'
import { stockFor } from '@/lib/stock'
import { overrideImage } from '@/lib/stripe-image-overrides'

// Stripe-only produkter (uden hardcodet match) der skal have en anden kategori
// end default 'filtre' – fx GlaSSmart-karaffel og FAST DISK-filter hører til vandkande.
const STRIPE_ONLY_CATEGORY: Record<string, Product['category']> = {
  'prod_V2wHIQrdoXx6RG': 'vandkande', // FAST DISK™ filter til GlaSSmart
  'prod_V2wFs5adWhY4cF': 'vandkande', // GlaSSmart™ glas-filterkaraffel
  'prod_V2wDbJ1i8O20Kj': 'vandkande', // MikroPLASTIK-STOP filterkande + 1 Bi-flux
}

export async function getMergedShopProducts(): Promise<Product[]> {
  const stripeProducts = await getActiveStripeProducts()

  // Ingen Stripe (mangler nøgle/fejl) → brug den fulde hardcodede liste
  if (stripeProducts.length === 0) {
    return PRODUCTS.filter(p => !p.addon)
  }

  const merged: Product[] = []
  const usedHardcodedIds = new Set<string>()

  for (const sp of stripeProducts) {
    const hardcoded = sp.cwsId ? PRODUCTS.find(p => p.id === sp.cwsId) : undefined
    if (hardcoded) {
      merged.push({
        ...hardcoded,
        price:           sp.price,
        stripeProductId: sp.stripeProductId,
        // Fald tilbage på Stripe-billedet, hvis produktet mangler et i koden
        imgSrc:   hardcoded.imgSrc   || sp.images[0] || '',
        imgLarge: hardcoded.imgLarge || sp.images[0] || '',
      })
      usedHardcodedIds.add(hardcoded.id)
    } else {
      merged.push({
        id:              sp.stripeProductId,
        name:            sp.name,
        tagline:         'Tilgængelig via Stripe',
        description:     sp.description || sp.name,
        category:        STRIPE_ONLY_CATEGORY[sp.stripeProductId] ?? 'filtre',
        price:           sp.price,
        imgSrc:          overrideImage(sp.stripeProductId, sp.images[0] || ''),
        imgLarge:        overrideImage(sp.stripeProductId, sp.images[0] || ''),
        highlights:      [],
        features:        [],
        specs:           [],
        faqs:            [],
        useCases:        [],
        stripeProductId: sp.stripeProductId,
      })
    }
  }

  // Tilføj hardcodede produkter, der ikke er i Stripe: "kommer snart", alle erhverv-produkter
  // samt alle blødgøringsanlæg (bestilles via kontakt/montering, også uden Stripe-checkout).
  for (const p of PRODUCTS) {
    if (usedHardcodedIds.has(p.id)) continue
    if (p.comingSoon || p.audience === 'erhverv' || p.category === 'blosgoringsanlaeg') merged.push(p)
  }

  // Bevar den kuraterede rækkefølge fra products.ts (så relaterede varer står
  // sammen, uanset Stripe-rækkefølge og "kommer snart"-status). Stripe-only
  // produkter uden en hardcodet plads lægges til sidst.
  const orderIndex = new Map<string, number>(PRODUCTS.map((p, i) => [p.id, i]))
  // Placer de generiske Laica-produkter (uden hardcodet match) sammen med vandkande-gruppen
  const laicaAnchor = orderIndex.get('germ-stop-filter') ?? orderIndex.get('mikroplastik-stop-filter')
  if (laicaAnchor != null) {
    orderIndex.set('prod_V2wDbJ1i8O20Kj', laicaAnchor + 0.3) // MikroPLASTIK-STOP filterkande
    orderIndex.set('prod_V2wFs5adWhY4cF', laicaAnchor + 0.4) // GlaSSmart™ glas-filterkaraffel
    orderIndex.set('prod_V2wHIQrdoXx6RG', laicaAnchor + 0.5) // FAST DISK™ filter til GlaSSmart
  }
  // Laica-produkterne (vandkande-kategorien: kander, karaffel, bi-flux-filtre, FAST DISK)
  // skal ligge øverst i shoppen – behold den kuraterede rækkefølge inden for hver gruppe.
  const laicaRank = (p: Product) => (p.category === 'vandkande' ? 0 : 1)
  // Inden for Laica-gruppen: kander/karafler først, derefter filtrene.
  const kandeRank = (p: Product) => {
    if (p.category !== 'vandkande') return 0
    const isKande =
      p.id.startsWith('kande-') ||
      /glassmart/i.test(p.id) ||
      p.id === 'prod_V2wFs5adWhY4cF' // GlaSSmart-karaffel (Stripe-only)
    return isKande ? 0 : 1
  }
  merged.sort((a, b) => {
    const r = laicaRank(a) - laicaRank(b)
    if (r !== 0) return r
    const k = kandeRank(a) - kandeRank(b)
    if (k !== 0) return k
    return (orderIndex.get(a.id) ?? 9999) - (orderIndex.get(b.id) ?? 9999)
  })

  // Markér midlertidigt udsolgte produkter (central styring i stock.ts)
  for (const p of merged) {
    const s = stockFor(p)
    if (s) { p.soldOut = true; p.restockISO = s.restockISO; p.restockLabel = s.restockLabel }
  }

  // Skjul tilbehør (vises kun som tilkøb på kalkanlæg-siden)
  return merged.filter(p => !p.addon)
}
