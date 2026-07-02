/*
 * Opretter cBlue SC3-udskiftningsfilteret i Stripe.
 * Pris 695 kr. INKL. moms. Sikkert mod dubletter (tjekker cws_id).
 *
 * KØR:
 *   STRIPE_SECRET_KEY=sk_live_DIN_NØGLE node create-stripe-cblue-filter.mjs
 *
 * Send mig blokken nederst bagefter.
 */

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) { console.error('\n❌ Mangler STRIPE_SECRET_KEY.\n'); process.exit(1) }
const stripe = new Stripe(key)

const p = { cwsId: 'cblue-sc3-filter', varenr: '102146', name: 'Cartridge SC3 – filter til cBlue SC3', price: 695, description: 'Løst udskiftningsfilter (hulfiberpatron) til cBlue SC3 brusehovedet. 3 måneders Legionella-beskyttelse.' }

async function findExisting(cwsId) {
  try {
    const res = await stripe.products.search({ query: `active:'true' AND metadata['cws_id']:'${cwsId}'` })
    return res.data[0] || null
  } catch {
    for await (const x of stripe.products.list({ limit: 100 })) if (x.metadata?.cws_id === cwsId) return x
    return null
  }
}

try {
  let product = await findExisting(p.cwsId)
  let priceId
  if (product) {
    console.log(`↺ Findes allerede – genbruger: ${product.id}`)
    priceId = typeof product.default_price === 'string' ? product.default_price : product.default_price?.id
    if (!priceId) {
      const price = await stripe.prices.create({ product: product.id, currency: 'dkk', unit_amount: p.price * 100, tax_behavior: 'inclusive' })
      await stripe.products.update(product.id, { default_price: price.id }); priceId = price.id
    }
  } else {
    product = await stripe.products.create({ name: p.name, description: p.description, metadata: { cws_id: p.cwsId, varenummer: p.varenr } })
    const price = await stripe.prices.create({ product: product.id, currency: 'dkk', unit_amount: p.price * 100, tax_behavior: 'inclusive' })
    await stripe.products.update(product.id, { default_price: price.id }); priceId = price.id
    console.log(`✅ Oprettet: ${p.name}  →  ${product.id}`)
  }
  const link = await stripe.paymentLinks.create({ line_items: [{ price: priceId, quantity: 1 }] })
  console.log('\n========== KOPIER LINJEN HERUNDER OG SEND TIL CLAUDE ==========\n')
  console.log(`  '${p.cwsId}': { productId: '${product.id}', paymentLink: '${link.url}' },`)
  console.log('\n===============================================================\n')
} catch (err) {
  console.error(`❌ Fejl: ${err.message}`)
}
