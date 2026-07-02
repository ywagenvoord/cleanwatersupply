/*
 * Opdaterer Cartridge MF5-produktet i Stripe:
 *  - retter navnet (så kunden ser det rigtige ved betaling)
 *  - opretter ny pris 849 kr. inkl. moms (Stripe-priser kan ikke ændres, kun erstattes)
 *  - opretter nyt betalingslink
 *  - arkiverer den gamle 695-pris
 *
 * KØR (terminal, fra projektmappen "cleanwatersupply"):
 *
 *   STRIPE_SECRET_KEY=sk_live_DIN_NØGLE node update-stripe-cartridge.mjs
 *
 * Send mig blokken nederst bagefter.
 */

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) { console.error('\n❌ Mangler STRIPE_SECRET_KEY.\n'); process.exit(1) }
const stripe = new Stripe(key)

const PRODUCT_ID = 'prod_UnaAJsIRq1aYzQ'
const NY_NAVN    = 'Cartridge MF5 – filter til AS Tube'
const NY_PRIS_KR = 849

try {
  // 1) Ret navn + beskrivelse
  await stripe.products.update(PRODUCT_ID, {
    name: NY_NAVN,
    description: 'Løst udskiftningsfilter (MF5-patron) til AS Tube stålfilterhuset (SC3). 3 måneders levetid.',
  })

  // 2) Hent nuværende (gamle) pris for at kunne arkivere den
  const product = await stripe.products.retrieve(PRODUCT_ID)
  const oldPriceId = typeof product.default_price === 'string' ? product.default_price : product.default_price?.id

  // 3) Ny pris 849 kr. inkl. moms
  const price = await stripe.prices.create({
    product: PRODUCT_ID,
    currency: 'dkk',
    unit_amount: NY_PRIS_KR * 100,
    tax_behavior: 'inclusive',
  })
  await stripe.products.update(PRODUCT_ID, { default_price: price.id })

  // 4) Arkivér den gamle pris (skjules, men slettes ikke)
  if (oldPriceId && oldPriceId !== price.id) {
    await stripe.prices.update(oldPriceId, { active: false })
  }

  // 5) Nyt betalingslink
  const link = await stripe.paymentLinks.create({ line_items: [{ price: price.id, quantity: 1 }] })

  console.log(`\n✅ Opdateret: ${NY_NAVN} – ${NY_PRIS_KR} kr.\n`)
  console.log('========== KOPIER LINJEN HERUNDER OG SEND TIL CLAUDE ==========\n')
  console.log(`  'cartridge-sc3': { productId: '${PRODUCT_ID}', paymentLink: '${link.url}' },`)
  console.log('\n===============================================================\n')
} catch (err) {
  console.error(`❌ Fejl: ${err.message}`)
}
