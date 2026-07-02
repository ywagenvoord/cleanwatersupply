/*
 * Opretter de 2 vægbeslag i Stripe (tilkøb til kalkanlæg).
 * Pris 249 kr. EKSKL. moms. Sikkert mod dubletter (tjekker cws_id).
 *
 * KØR:
 *   STRIPE_SECRET_KEY=sk_live_DIN_NØGLE node create-stripe-vaegbeslag.mjs
 *
 * Send mig blokken nederst bagefter.
 */

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) { console.error('\n❌ Mangler STRIPE_SECRET_KEY.\n'); process.exit(1) }
const stripe = new Stripe(key)

const products = [
  { cwsId: 'vaegbeslag-resintank',    varenr: '6311040014', name: 'Vægbeslag til resintank (rund)',     price: 249, description: 'Rustfrit vægbeslag til vægmontering af den runde resintank. Passer til Hydropure 100 og 200B.' },
  { cwsId: 'vaegbeslag-saltbeholder', varenr: '6311040015', name: 'Vægbeslag til saltbeholder (10 kg)', price: 249, description: 'Rustfrit vægbeslag til vægmontering af 10 kg-saltbeholderen. Passer til Hydropure 100 og 200B.' },
]

async function findExisting(cwsId) {
  try {
    const res = await stripe.products.search({ query: `active:'true' AND metadata['cws_id']:'${cwsId}'` })
    return res.data[0] || null
  } catch {
    for await (const x of stripe.products.list({ limit: 100 })) if (x.metadata?.cws_id === cwsId) return x
    return null
  }
}

const mapping = {}
for (const p of products) {
  try {
    let product = await findExisting(p.cwsId)
    let priceId
    if (product) {
      console.log(`↺ Findes allerede – genbruger: ${p.name} (${product.id})`)
      priceId = typeof product.default_price === 'string' ? product.default_price : product.default_price?.id
      if (!priceId) {
        const price = await stripe.prices.create({ product: product.id, currency: 'dkk', unit_amount: p.price * 100, tax_behavior: 'exclusive' })
        await stripe.products.update(product.id, { default_price: price.id }); priceId = price.id
      }
    } else {
      product = await stripe.products.create({ name: p.name, description: p.description, metadata: { cws_id: p.cwsId, varenummer: p.varenr } })
      const price = await stripe.prices.create({ product: product.id, currency: 'dkk', unit_amount: p.price * 100, tax_behavior: 'exclusive' })
      await stripe.products.update(product.id, { default_price: price.id }); priceId = price.id
      console.log(`✅ Oprettet: ${p.name}  →  ${product.id}`)
    }
    const link = await stripe.paymentLinks.create({ line_items: [{ price: priceId, quantity: 1 }] })
    mapping[p.cwsId] = { productId: product.id, paymentLink: link.url }
  } catch (err) {
    console.error(`❌ Fejl ved "${p.name}": ${err.message}`)
  }
}

console.log('\n\n========== KOPIER ALT HERUNDER OG SEND TIL CLAUDE ==========\n')
for (const [cwsId, v] of Object.entries(mapping)) {
  console.log(`  '${cwsId}': { productId: '${v.productId}', paymentLink: '${v.paymentLink}' },`)
}
console.log('\n===========================================================\n')
