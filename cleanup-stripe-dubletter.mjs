/*
 * Rydder dubletter op: arkiverer de 14 erhvervsprodukter, der ved en fejl
 * blev oprettet en ekstra gang. Arkivering = deaktivering (kan fortrydes i
 * Stripe), produkterne SLETTES ikke. De originale produkter røres ikke.
 *
 * SÅDAN KØRER DU DET (terminal, fra projektmappen "cleanwatersupply"):
 *
 *   STRIPE_SECRET_KEY=sk_live_DIN_NØGLE node cleanup-stripe-dubletter.mjs
 */

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.error('\n❌ Mangler STRIPE_SECRET_KEY.\n')
  process.exit(1)
}
const stripe = new Stripe(key)

// Dublet-id'erne fra den ekstra kørsel (prod_UnWf.../prod_UnWg...).
// De ORIGINALE (prod_UnVg.../prod_UnVh...) står IKKE på listen og bevares.
const duplicates = [
  'prod_UnWfFQkkqXutc7', // baclyser-s-1m
  'prod_UnWfQtkvl7AaRb', // baclyser-s-2m
  'prod_UnWf9AXqDw5c6E', // baclyser-s-3m
  'prod_UnWfaWwSLkC2zM', // as-wallshower-4m
  'prod_UnWf4Yi3wXhdkX', // baclyser-tl-1m
  'prod_UnWfkBZKZ27oJw', // baclyser-il-3
  'prod_UnWfxPrcrgUz8L', // baclyser-il-5
  'prod_UnWfzTy8TTqQt2', // cartridge-mf5
  'prod_UnWfGvKAm9Q6Lz', // hygienesiphon-g114
  'prod_UnWfHLIWYTWXs6', // hygienesiphon-g112
  'prod_UnWgCRtnaok6OO', // hygienesiphon-pakke-g114
  'prod_UnWgBxdpJc3fxp', // hygienesiphon-pakke-g112
  'prod_UnWgFGg8tBJeI2', // inlet-hygienesiphon-g114
  'prod_UnWgKtBsm4S6Ok', // inlet-hygienesiphon-g112
]

for (const id of duplicates) {
  try {
    await stripe.products.update(id, { active: false })
    console.log(`🗄️  Arkiveret: ${id}`)
  } catch (err) {
    console.error(`❌ Kunne ikke arkivere ${id}: ${err.message}`)
  }
}

console.log('\n✅ Færdig. De 14 dubletter er arkiveret. De originale produkter er uberørte.\n')
