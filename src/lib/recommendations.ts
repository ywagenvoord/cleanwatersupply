import { PRODUCTS, type Product } from './products'
import { STRIPE_MAPPING } from './stripe-products'

/**
 * Cross-sell map: when product X is in cart, recommend these IDs.
 * Order matters – first matches show first.
 */
const CROSS_SELL: Record<string, string[]> = {
  // Baclyser tap filters → couplings (need an adapter)
  'baclyser-neo-tr-2m':            ['coupling-m22', 'coupling-m24', 'baclyser-neo-tr-3m'],
  'baclyser-neo-tr-3m':            ['coupling-m22', 'coupling-m24', 'baclyser-neo-tr-2m'],
  'baclyser-neo-tl-2m':            ['coupling-m22', 'coupling-m24', 'baclyser-neo-tl-3m'],
  'baclyser-neo-tl-3m':            ['coupling-m22', 'coupling-m24', 'baclyser-neo-tl-2m'],

  // Couplings → Baclyser filters (the actual product to use the coupling for)
  'coupling-m22':                  ['baclyser-neo-tl-3m', 'baclyser-neo-tr-3m', 'cblue-sc3'],
  'coupling-m24':                  ['baclyser-neo-tl-3m', 'baclyser-neo-tr-3m', 'cblue-sc3'],

  // Shower filter → couplings + bigger filters
  'cblue-sc3':                     ['baclyser-neo-tl-3m', 'baclyser-neo-tr-3m'],

  // Filter housing → cartridges that fit it
  'filter-housing':                ['kulblokfilter-10-cl', 'dualstage-mf-10-cl', 'as-tube'],
  'kulblokfilter-10-cl':           ['filter-housing', 'dualstage-mf-10-cl'],
  'dualstage-mf-10-cl':            ['filter-housing', 'kulblokfilter-10-cl'],
  'as-tube':                       ['filter-housing', 'dualstage-mf-10-cl'],

  // Pitcher filter → matching pitcher

  // Big systems → small accessories
  'blosgoringsanlaeg-100m':        ['filter-housing', 'kulblokfilter-10-cl', 'cblue-sc3'],
}

/**
 * Default popular items shown when no specific cross-sell is found
 * (and to fill remaining slots).
 */
const POPULAR: string[] = [
  'baclyser-neo-tl-3m',
  'cblue-sc3',
  'dualstage-mf-10-cl',
  'coupling-m24',
]

/**
 * Get recommended products for an array of cart item IDs.
 * Excludes items already in the cart and items without Stripe (= cannot buy).
 */
export function getRecommendations(cartIds: string[], count: number = 3): Product[] {
  const inCart = new Set(cartIds)
  const candidates: string[] = []

  // 1. Add cross-sells from each cart item
  for (const id of cartIds) {
    const matches = CROSS_SELL[id] || []
    for (const m of matches) {
      if (!candidates.includes(m)) candidates.push(m)
    }
  }

  // 2. Fall back to popular items
  for (const id of POPULAR) {
    if (!candidates.includes(id)) candidates.push(id)
  }

  // 3. Filter: not in cart + has Stripe + not coming soon + return Product objects
  const recs: Product[] = []
  for (const id of candidates) {
    if (recs.length >= count) break
    if (inCart.has(id)) continue
    const product = PRODUCTS.find(p => p.id === id)
    if (!product) continue
    if (product.comingSoon) continue
    if (!STRIPE_MAPPING[id]) continue
    recs.push(product)
  }

  return recs
}
