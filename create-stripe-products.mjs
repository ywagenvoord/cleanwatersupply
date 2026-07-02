/*
 * Opretter de 14 erhvervs-produkter i Stripe (produkt + engangspris + betalingslink).
 *
 * SÅDAN KØRER DU DET (i terminalen, fra projektmappen "cleanwatersupply"):
 *
 *   1) Sørg for at Stripe-pakken er installeret (den er allerede med i projektet):
 *        npm install stripe
 *
 *   2) Kør scriptet med DIN Stripe hemmelige nøgle (sk_live_... for den rigtige butik,
 *      eller sk_test_... hvis du vil teste først). Nøglen indtaster du selv her:
 *
 *        STRIPE_SECRET_KEY=sk_live_DIN_NØGLE node create-stripe-products.mjs
 *
 *   3) Når det er færdigt, kopierer du HELE "STRIPE_MAPPING"-outputtet nederst
 *      og sender det til mig — så kobler jeg det ind i koden, så "Køb nu" virker.
 *
 *   OBS: Kører du scriptet to gange, oprettes produkterne to gange. Kør det kun én gang.
 */

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.error('\n❌ Mangler STRIPE_SECRET_KEY. Kør fx:\n   STRIPE_SECRET_KEY=sk_live_... node create-stripe-products.mjs\n')
  process.exit(1)
}
const stripe = new Stripe(key)

// Pris er i KRONER (ekskl. moms). Scriptet omregner til øre (×100).
const products = [
  { cwsId: 'baclyser-s-1m',              varenr: '100761', name: 'Baclyser S (1M) – brusefilter',                 price: 325, description: 'Medicinsk certificeret 0,2 µm brusefilter mod Legionella og Pseudomonas. Levetid ca. 31 dage.' },
  { cwsId: 'baclyser-s-2m',              varenr: '100745', name: 'Baclyser S (2M) – brusefilter',                 price: 375, description: 'Medicinsk certificeret 0,2 µm brusefilter mod Legionella og Pseudomonas. Levetid ca. 62 dage.' },
  { cwsId: 'baclyser-s-3m',              varenr: '102143', name: 'Baclyser neo S (3M) – brusefilter',             price: 425, description: 'Medicinsk certificeret 0,2 µm brusefilter mod Legionella og Pseudomonas. Levetid ca. 93 dage.' },
  { cwsId: 'as-wallshower-4m',           varenr: '101443', name: 'AS Wallshower (4M)',                            price: 675, description: 'Vægmonteret medicinsk brusefilter med 0,2 µm membran. Levetid op til 4 måneder.' },
  { cwsId: 'baclyser-tl-1m',             varenr: '100762', name: 'Baclyser TL (1M) – hanefilter',                price: 300, description: 'Medicinsk certificeret 0,2 µm hanefilter med laminart udløb. Levetid ca. 31 dage.' },
  { cwsId: 'baclyser-il-3',              varenr: '100883', name: 'Baclyser IL 3 – inline-filter (3.000 l)',       price: 640, description: 'Medicinsk inline-filter med 0,2 µm membran til vandforsyningen. Kapacitet 3.000 liter.' },
  { cwsId: 'baclyser-il-5',              varenr: '100882', name: 'Baclyser IL 5 – inline-filter (13.000 l)',      price: 940, description: 'Medicinsk inline-filter med 0,2 µm membran til vandforsyningen. Kapacitet 13.000 liter.' },
  { cwsId: 'cartridge-mf5',              varenr: '101471', name: 'Cartridge MF5 – patron til AS Tube',            price: 800, description: 'Udskiftningspatron med hulfibermembran til AS Tube-filterhuset.' },
  { cwsId: 'hygienesiphon-g114',         varenr: '100666', name: 'HygieneSiphon G 1 1/4"',                        price: 425, description: 'Hygiejnevandlås mod bakterievækst og tilbagesmitning fra afløbet. Tilslutning G 1 1/4".' },
  { cwsId: 'hygienesiphon-g112',         varenr: '100807', name: 'HygieneSiphon G 1 1/2"',                        price: 425, description: 'Hygiejnevandlås mod bakterievækst og tilbagesmitning fra afløbet. Tilslutning G 1 1/2".' },
  { cwsId: 'hygienesiphon-pakke-g114',   varenr: '100680', name: 'HygieneSiphon installationspakke G 1 1/4"',     price: 625, description: 'Komplet startpakke til HygieneSiphon. Tilslutning G 1 1/4".' },
  { cwsId: 'hygienesiphon-pakke-g112',   varenr: '101470', name: 'HygieneSiphon installationspakke G 1 1/2"',     price: 625, description: 'Komplet startpakke til HygieneSiphon. Tilslutning G 1 1/2".' },
  { cwsId: 'inlet-hygienesiphon-g114',   varenr: '100669', name: 'Inlet til HygieneSiphon G 1 1/4"',              price: 195, description: 'Indløb (reservedel) til HygieneSiphon-vandlåsen. Tilslutning G 1 1/4".' },
  { cwsId: 'inlet-hygienesiphon-g112',   varenr: '100923', name: 'Inlet til HygieneSiphon G 1 1/2"',              price: 195, description: 'Indløb (reservedel) til HygieneSiphon-vandlåsen. Tilslutning G 1 1/2".' },
]

const mapping = {}

for (const p of products) {
  try {
    // 1) Produkt (med metadata cws_id, så koden kan matche det)
    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      metadata: { cws_id: p.cwsId, varenummer: p.varenr },
    })

    // 2) Engangspris i DKK, ekskl. moms (øre = kr × 100)
    const price = await stripe.prices.create({
      product: product.id,
      currency: 'dkk',
      unit_amount: Math.round(p.price * 100),
      tax_behavior: 'exclusive',
    })
    await stripe.products.update(product.id, { default_price: price.id })

    // 3) Betalingslink
    const link = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
    })

    mapping[p.cwsId] = { productId: product.id, paymentLink: link.url }
    console.log(`✅ ${p.name}  →  ${product.id}`)
  } catch (err) {
    console.error(`❌ Fejl ved "${p.name}": ${err.message}`)
  }
}

console.log('\n\n========== KOPIER ALT HERUNDER OG SEND TIL CLAUDE ==========\n')
console.log('STRIPE_MAPPING (nye erhvervs-produkter):\n')
for (const [cwsId, v] of Object.entries(mapping)) {
  console.log(`  '${cwsId}': { productId: '${v.productId}', paymentLink: '${v.paymentLink}' },`)
}
console.log('\n===========================================================\n')
