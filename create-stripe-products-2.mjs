/*
 * Opretter de 5 sidste produkter i Stripe (private brusefilter-produkter).
 * Priser er INKL. moms (B2C), derfor tax_behavior 'inclusive'.
 *
 * SIKKERT MOD DUBLETTER: scriptet tjekker først, om produktet allerede
 * findes i Stripe (via metadata cws_id). Findes det, genbruges det –
 * der oprettes ALDRIG en dublet.
 *
 * SÅDAN KØRER DU DET (terminal, fra projektmappen "cleanwatersupply"):
 *
 *   STRIPE_SECRET_KEY=sk_live_DIN_NØGLE node create-stripe-products-2.mjs
 *
 * Brug den samme sk_live_-nøgle som sidst. Jeg ser den aldrig.
 * Kopiér til sidst blokken mellem stregerne og send den til mig.
 */

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.error('\n❌ Mangler STRIPE_SECRET_KEY. Kør:\n   STRIPE_SECRET_KEY=sk_live_... node create-stripe-products-2.mjs\n')
  process.exit(1)
}
const stripe = new Stripe(key)

// Pris i KRONER, inkl. moms.
const products = [
  { cwsId: 'brusehoved-filter-acf',       name: 'Brusehoved med vandfilter – komplet (inkl. børste & svamp)', price: 525, description: 'Brusehoved med vandfilter, der renser bruservandet for klor, rust og urenheder. Komplet sæt med filter, børste og svamp.' },
  { cwsId: 'brusehoved-til-filter',       name: 'Brusehoved med vandfilter',                                   price: 499, description: 'Brusehoved med vandfilter, der renser bruservandet for klor, rust og urenheder. Inkl. filter – uden børste og svamp.' },
  { cwsId: 'brusefilter-acf',             name: 'Udskiftningsfilter til brusehoved',                            price: 64,  description: 'Udskifteligt filter med aktivt kul. Fjerner klor, rust, bundfald og tungmetaller fra bruservandet.' },
  { cwsId: 'brusefilter-acf-vitamin-c',   name: 'Udskiftningsfilter til brusehoved + C-vitamin',                price: 69,  description: 'Udskifteligt filter med aktivt kul + C-vitamin. Renser vandet og føles ekstra mildt mod hud og hår.' },
  { cwsId: 'brusefilter-acf-amino-acid',  name: 'Udskiftningsfilter til brusehoved + kalkhæmmer',               price: 69,  description: 'Udskifteligt filter med aktivt kul + kalkhæmmer. Renser vandet og mindsker kalkens påvirkning.' },
]

// Slå et eksisterende produkt op via metadata cws_id (undgår dubletter).
async function findExisting(cwsId) {
  try {
    const res = await stripe.products.search({ query: `active:'true' AND metadata['cws_id']:'${cwsId}'` })
    return res.data[0] || null
  } catch {
    // Hvis Search ikke er tilgængelig, falder vi tilbage til at gennemløbe listen
    for await (const p of stripe.products.list({ limit: 100 })) {
      if (p.metadata?.cws_id === cwsId) return p
    }
    return null
  }
}

const mapping = {}

for (const p of products) {
  try {
    let product = await findExisting(p.cwsId)
    let priceId

    if (product) {
      console.log(`↺ Findes allerede – genbruger: ${p.name}  (${product.id})`)
      priceId = typeof product.default_price === 'string' ? product.default_price : product.default_price?.id
      if (!priceId) {
        const price = await stripe.prices.create({ product: product.id, currency: 'dkk', unit_amount: Math.round(p.price * 100), tax_behavior: 'inclusive' })
        await stripe.products.update(product.id, { default_price: price.id })
        priceId = price.id
      }
    } else {
      product = await stripe.products.create({ name: p.name, description: p.description, metadata: { cws_id: p.cwsId } })
      const price = await stripe.prices.create({ product: product.id, currency: 'dkk', unit_amount: Math.round(p.price * 100), tax_behavior: 'inclusive' })
      await stripe.products.update(product.id, { default_price: price.id })
      priceId = price.id
      console.log(`✅ Oprettet: ${p.name}  →  ${product.id}`)
    }

    const link = await stripe.paymentLinks.create({ line_items: [{ price: priceId, quantity: 1 }] })
    mapping[p.cwsId] = { productId: product.id, paymentLink: link.url }
  } catch (err) {
    console.error(`❌ Fejl ved "${p.name}": ${err.message}`)
  }
}

console.log('\n\n========== KOPIER ALT HERUNDER OG SEND TIL CLAUDE ==========\n')
console.log('STRIPE_MAPPING (private brusefilter-produkter):\n')
for (const [cwsId, v] of Object.entries(mapping)) {
  console.log(`  '${cwsId}': { productId: '${v.productId}', paymentLink: '${v.paymentLink}' },`)
}
console.log('\n===========================================================\n')
