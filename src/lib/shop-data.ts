// Delt produktdata til både privat- og erhvervs-shoppen.
// Henter Stripe-produkter ved request-tid og fletter med den hardcodede liste.

import { getActiveStripeProducts } from '@/lib/stripe-fetch'
import { PRODUCTS, type Product } from '@/lib/products'

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
        category:        'filtre',
        price:           sp.price,
        imgSrc:          sp.images[0] || '',
        imgLarge:        sp.images[0] || '',
        highlights:      [],
        features:        [],
        specs:           [],
        faqs:            [],
        useCases:        [],
        stripeProductId: sp.stripeProductId,
      })
    }
  }

  // Tilføj hardcodede produkter, der ikke er i Stripe: "kommer snart" + alle erhverv-produkter
  for (const p of PRODUCTS) {
    if (usedHardcodedIds.has(p.id)) continue
    if (p.comingSoon || p.audience === 'erhverv') merged.push(p)
  }

  // Bevar den kuraterede rækkefølge fra products.ts (så relaterede varer står
  // sammen, uanset Stripe-rækkefølge og "kommer snart"-status). Stripe-only
  // produkter uden en hardcodet plads lægges til sidst.
  const orderIndex = new Map(PRODUCTS.map((p, i) => [p.id, i]))
  merged.sort(
    (a, b) => (orderIndex.get(a.id) ?? 9999) - (orderIndex.get(b.id) ?? 9999),
  )

  // Skjul tilbehør (vises kun som tilkøb på kalkanlæg-siden)
  return merged.filter(p => !p.addon)
}
