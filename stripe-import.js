/**
 * stripe-import.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Importerer alle Clean Water Supply-producter til Stripe og genererer
 * automatisk Payment Links for hvert produkt.
 *
 * SÅDAN BRUGES SCRIPTET:
 *
 *   1. Hent din Stripe Secret Key:
 *        Stripe Dashboard → Developers → API keys → Secret key (sk_live_…)
 *
 *   2. Indsæt nøglen nedenfor (linje 21).
 *
 *   3. Installér Stripe-biblioteket (kun første gang):
 *        npm install stripe
 *
 *   4. Kør scriptet:
 *        node stripe-import.js
 *
 *   5. Kopier output (JSON nederst) → send til Claude, så indsætter jeg
 *      Payment Links direkte på alle produktsider.
 */

const Stripe = require('stripe')

// ─── CONFIGURATION ───────────────────────────────────────────────────────────

const STRIPE_SECRET_KEY = 'sk_live_YOUR_KEY_HERE'  // ← indsæt din nøgle her

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' })

const CWS = 'https://cleanwatersupply.dk/wp-content/uploads'

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
// Alle priser er i ØRE (1 kr = 100 øre).  Eksempel: 39900 = 399 kr.
// Produkter med price = 0 springes over (typisk "Kommer snart").

const PRODUCTS = [

  /* ── FILTRE ── */
  {
    id: 'baclyser-neo-tr-2m',
    productNr: '102785',
    name: 'Baclyser® neo TR (2M)',
    description: 'Engangsfilter til håndvaskarmatur – medicinsk godkendt med bruserudløb, giver sikker beskyttelse i op til 62 dage.',
    image: `${CWS}/2025/07/8.png`,
    price: 39900, // 399 kr
  },
  {
    id: 'baclyser-neo-tr-3m',
    productNr: '102786',
    name: 'Baclyser® neo TR (3M)',
    description: 'Engangsfilter til håndvaskarmatur – medicinsk godkendt med bruserudløb, giver sikker beskyttelse i op til 93 dage.',
    image: `${CWS}/2025/07/8.png`,
    price: 44900, // 449 kr
  },
  {
    id: 'baclyser-neo-tl-2m',
    productNr: '102691',
    name: 'Baclyser® neo TL (2M)',
    description: 'Engangs-vandfilter til håndvaskarmaturer med laminart udløb, medicinsk udstyr, levetid op til 62 dage.',
    image: `${CWS}/2025/07/8.png`,
    price: 39990, // 399,90 kr
  },
  {
    id: 'baclyser-neo-tl-3m',
    productNr: '102693',
    name: 'Baclyser® neo TL (3M)',
    description: 'Engangs-vandfilter til håndvaskarmaturer med laminart udløb, medicinsk udstyr, levetid op til 93 dage.',
    image: `${CWS}/2025/07/8.png`,
    price: 44900, // 449 kr
  },
  {
    id: 'cblue-sc3',
    productNr: '102223',
    name: 'cBlue SC3 (inkl. Filter)',
    description: 'Brusehoved i chrome med udskiftelig filter. Optimal Legionella-beskyttelse i et elegant, diskret design.',
    image: `${CWS}/2025/10/Hjemmeside-2.png`,
    price: 79500, // 795 kr
  },
  {
    id: 'coupling-m22',
    productNr: '100296',
    name: 'Coupling M22',
    description: 'Hurtigkobling til indvendig gevind M22 IG. Gør montering og udskiftning af Baclyser®-filtre værktøjsfri.',
    image: `${CWS}/2025/08/1-300x300.png`,
    price: 19900, // 199 kr
  },
  {
    id: 'coupling-m24',
    productNr: '100298',
    name: 'Coupling M24',
    description: 'Hurtigkobling til udvendig gevind M24 AG. Gør montering og udskiftning af Baclyser®-filtre værktøjsfri.',
    image: `${CWS}/2025/08/1-300x300.png`,
    price: 19900, // 199 kr
  },
  {
    id: 'filter-housing',
    productNr: '501428',
    name: 'Filter Housing',
    description: 'Til filtrering af vand i rørledning. Universelt filterhus kompatibelt med standard 10" filterpatroner.',
    image: `${CWS}/2025/10/1-1-300x300.png`,
    price: 49900, // 499 kr
  },
  {
    id: 'dualstage-mf-10-cl',
    productNr: '501009',
    name: 'DualStage MF 10-CL',
    description: 'Forbedrer vandets smag og lugt, fjerner tungmetaller og medicinrester og gør vandet mikrobiologisk sikkert.',
    image: `${CWS}/2025/10/6-1-300x300.png`,
    price: 74900, // 749 kr
  },
  {
    id: 'kulblokfilter-10-cl',
    productNr: '501016',
    name: 'Aktivt Kulblokfilter 10-CL',
    description: 'Aktivt kulblokfilter 10-CL bruges til at forbedre vandets smag og lugt, samt til at fjerne tungmetaller og medicinrester.',
    image: `${CWS}/2025/10/3-1-300x300.png`,
    price: 59900, // 599 kr
  },
  {
    id: 'vandfilter-biflux-reservedel',
    productNr: '11103',
    name: 'Vandfilter Bi-flux Universal (reservedel)',
    description: 'Filter til vandkande med en levetid på 150L. Original Bi-flux® reservedel der fjerner kalk, klor og urenheder.',
    image: 'https://www.laica.com/wp-content/uploads/F0M.jpg',
    price: 9900, // 99 kr
  },
  {
    id: 'vandfilter-predator',
    productNr: '11101',
    name: 'Vandfilter Predator Germ Stop',
    description: 'Vandkaraffel med filter. Predator Germ Stop teknologi giver ekstra antibakteriel beskyttelse.',
    image: 'https://laicahu.cdn.shoprenter.hu/custom/laicahu/image/cache/w360h360q100/kepek/termekkepek/UFSAA02/UFSAA02_Img02.jpg',
    price: 30000, // 300 kr
  },
  {
    id: 'as-tube',
    productNr: '101466',
    name: 'AS Tube',
    description: 'Inline hulfibermembranfilter patron (udskifteligt filter) til professionelle installationer.',
    image: 'https://technolab.nl/wp-content/uploads/2024/04/AS-TUBE-Cartridge-MF5.jpg',
    price: 120000, // 1.200 kr
  },

  /* ── BLØDGØRINGSANLÆG ── */
  {
    id: 'blosgoringsanlaeg-100m',
    name: 'Blødgøringsanlæg 100M',
    description: '3L resin, 15 kg integreret saltkar og en flowhastighed på 1.500 L/t.',
    image: `${CWS}/2025/07/2-3.png`,
    price: 1125000, // 11.250 kr
  },

  // 100BS og 100B er "Kommer snart" - vi springer dem over (price = 0)
  {
    id: 'blosgoringsanlaeg-100bs',
    name: 'Blødgøringsanlæg 100BS',
    description: '3L resin, 25 kg separat saltkar og en flowhastighed: 1.500 L/t.',
    image: `${CWS}/2025/07/1-3.png`,
    price: 0, // Kommer snart - skipped
  },
  {
    id: 'blosgoringsanlaeg-100b',
    name: 'Blødgøringsanlæg 100B',
    description: '3L resin, 10 kg separat saltkar og en flowhastighed: 1.500 L/t.',
    image: `${CWS}/2025/07/3-3.png`,
    price: 0, // Kommer snart - skipped
  },
]

// ─── SCRIPT ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀 Clean Water Supply – Stripe Import\n')
  console.log('─'.repeat(60))

  if (STRIPE_SECRET_KEY.includes('YOUR_KEY_HERE')) {
    console.error('❌ Glemt: indsæt din Stripe Secret Key på linje 21 først.')
    process.exit(1)
  }

  const skipped = PRODUCTS.filter(p => p.price === 0)
  const toProcess = PRODUCTS.filter(p => p.price > 0)

  if (skipped.length > 0) {
    console.warn(`⚠️  Springer ${skipped.length} produkter over (Kommer snart):`)
    skipped.forEach(p => console.warn(`   - ${p.name}`))
    console.warn('')
  }

  console.log(`📦 Opretter ${toProcess.length} produkter i Stripe...\n`)

  const results = []

  for (const product of toProcess) {
    process.stdout.write(`  → ${product.name} ... `)

    try {
      // 1. Opret produkt
      const stripeProduct = await stripe.products.create({
        name:        product.name,
        description: product.description,
        images:      [product.image],
        metadata:    {
          cws_id:    product.id,
          productNr: product.productNr || '',
        },
      })

      // 2. Opret pris
      const stripePrice = await stripe.prices.create({
        product:     stripeProduct.id,
        unit_amount: product.price,
        currency:    'dkk',
      })

      // 3. Opret Payment Link
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [{ price: stripePrice.id, quantity: 1 }],
        after_completion: {
          type: 'hosted_confirmation',
          hosted_confirmation: {
            custom_message: 'Tak for din ordre! Vi kontakter dig snarest med leveringsoplysninger.',
          },
        },
        shipping_address_collection: {
          allowed_countries: ['DK', 'SE', 'NO', 'DE', 'NL', 'BE'],
        },
        billing_address_collection: 'required',
      })

      results.push({
        id:          product.id,
        name:        product.name,
        stripeId:    stripeProduct.id,
        priceId:     stripePrice.id,
        paymentLink: paymentLink.url,
      })

      console.log(`✅`)

    } catch (err) {
      console.log(`❌ FEJL: ${err.message}`)
    }
  }

  // ─── OUTPUT ───────────────────────────────────────────────────────────────

  console.log('\n' + '─'.repeat(60))
  console.log(`✅ Færdig! ${results.length}/${toProcess.length} produkter oprettet.`)
  console.log('─'.repeat(60) + '\n')

  results.forEach(r => {
    console.log(`${r.name}`)
    console.log(`  Payment Link: ${r.paymentLink}`)
    console.log('')
  })

  console.log('─'.repeat(60))
  console.log('📋 JSON (kopier dette og send til Claude):\n')
  console.log(JSON.stringify(
    results.map(r => ({ id: r.id, paymentLink: r.paymentLink, stripeId: r.stripeId })),
    null,
    2
  ))
  console.log('\n')
}

main().catch(err => {
  console.error('\n❌ Uventet fejl:', err.message)
  process.exit(1)
})
