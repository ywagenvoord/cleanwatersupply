// Stripe product mapping
// Generated from stripe-import.js output

export type StripeData = {
  productId:   string  // Stripe product ID (prod_...)
  paymentLink: string  // Direct buy link for single-product checkout
}

export const STRIPE_MAPPING: Record<string, StripeData> = {
  'baclyser-neo-tr-2m':            { productId: 'prod_USJ951LPR04JBP', paymentLink: 'https://buy.stripe.com/bJe3cubAL7L4dau6e34gg00' },
  'baclyser-neo-tr-3m':            { productId: 'prod_USJ9M7EBofF5S5', paymentLink: 'https://buy.stripe.com/9B63cucEPfdwfiCdGv4gg01' },
  'baclyser-neo-tl-2m':            { productId: 'prod_USJ9vVibFLQRiu', paymentLink: 'https://buy.stripe.com/8x228q48j0iC0nI7i74gg02' },
  'baclyser-neo-tl-3m':            { productId: 'prod_USJ90iNC6hZSnG', paymentLink: 'https://buy.stripe.com/14A6oGeMX3uO4DYdGv4gg03' },
  'cblue-sc3':                     { productId: 'prod_USJ9FuIiFHU3rx', paymentLink: 'https://buy.stripe.com/28E7sKdIT3uO5I245V4gg04' },
  'coupling-m22':                  { productId: 'prod_USJ9oVjGfn5nir', paymentLink: 'https://buy.stripe.com/14A9AS20b8P8b2mauj4gg05' },
  'coupling-m24':                  { productId: 'prod_USJ94qJJBvyUQg', paymentLink: 'https://buy.stripe.com/14AaEWcEPc1kfiC59Z4gg06' },
  'filter-housing':                { productId: 'prod_USJ9LxApP21zsD', paymentLink: 'https://buy.stripe.com/3cI6oG48jaXg8UecCr4gg07' },
  'dualstage-mf-10-cl':            { productId: 'prod_USJ9b68PGUpyKy', paymentLink: 'https://buy.stripe.com/7sY9ASawHe9sb2m8mb4gg08' },
  'kulblokfilter-10-cl':           { productId: 'prod_USJ9oRtxZfExew', paymentLink: 'https://buy.stripe.com/6oU8wObAL6H01rMcCr4gg09' },
  'vandfilter-biflux-reservedel':  { productId: 'prod_USJ9wTiZe0YzTS', paymentLink: 'https://buy.stripe.com/4gM5kC20b9Tc3zU8mb4gg0a' },
  'vandfilter-predator':           { productId: 'prod_USJ94pYuYuMUrh', paymentLink: 'https://buy.stripe.com/00w28q9sD9Tcb2m6e34gg0b' },
  'as-tube':                       { productId: 'prod_USJ994hO6mUnXC', paymentLink: 'https://buy.stripe.com/7sY00igV58P84DY8mb4gg0c' },
  'blosgoringsanlaeg-100m':        { productId: 'prod_USJ9VnrMWHnwvl', paymentLink: 'https://buy.stripe.com/7sYaEW48jd5odau9qf4gg0d' },

  // Erhvervs-produkter (medicinske filtre / hygiejne) – oprettet i Stripe live
  'baclyser-s-1m':                 { productId: 'prod_UnVgrIwnefMnBW', paymentLink: 'https://buy.stripe.com/eVq5kC0W7e9s3zU7i74gg0e' },
  'baclyser-s-2m':                 { productId: 'prod_UnVgC5biryYl00', paymentLink: 'https://buy.stripe.com/cNi7sK20bc1kc6q59Z4gg0f' },
  'baclyser-s-3m':                 { productId: 'prod_UnVgDDMQCMyCvS', paymentLink: 'https://buy.stripe.com/7sYdR8bALc1k6M6byn4gg0g' },
  'as-wallshower-4m':              { productId: 'prod_UnVgTGErMVLaym', paymentLink: 'https://buy.stripe.com/00w8wOgV52qK9Yi8mb4gg0h' },
  'baclyser-tl-1m':                { productId: 'prod_UnVgODFHyxybwn', paymentLink: 'https://buy.stripe.com/eVq6oG0W77L42vQ59Z4gg0i' },
  'baclyser-il-3':                 { productId: 'prod_UnVgCyeobBvyds', paymentLink: 'https://buy.stripe.com/bJeeVcawH4yS5I29qf4gg0j' },
  'baclyser-il-5':                 { productId: 'prod_UnVgDGXK74CEGS', paymentLink: 'https://buy.stripe.com/5kQ6oGeMX1mG2vQ7i74gg0k' },
  'cartridge-mf5':                 { productId: 'prod_UnVhbrlgQ94ciL', paymentLink: 'https://buy.stripe.com/5kQcN4awHfdw8UefOD4gg0l' },
  'hygienesiphon-g114':            { productId: 'prod_UnVhg34KQfPFYb', paymentLink: 'https://buy.stripe.com/3cI5kC48j4ySb2mbyn4gg0m' },
  'hygienesiphon-g112':            { productId: 'prod_UnVhpCxBrvf8Uk', paymentLink: 'https://buy.stripe.com/cNi9ASfR14ySc6q31R4gg0n' },
  'hygienesiphon-pakke-g114':      { productId: 'prod_UnVhPALjHcfxa0', paymentLink: 'https://buy.stripe.com/7sY28q7kv8P83zU8mb4gg0o' },
  'hygienesiphon-pakke-g112':      { productId: 'prod_UnVhHqAMsTFq8M', paymentLink: 'https://buy.stripe.com/cNi8wOcEP4ySdaucCr4gg0p' },
  'inlet-hygienesiphon-g114':      { productId: 'prod_UnVhBGRL582MGf', paymentLink: 'https://buy.stripe.com/3cIbJ0gV5d5ofiCfOD4gg0q' },
  'inlet-hygienesiphon-g112':      { productId: 'prod_UnVhE4AaXjCUDE', paymentLink: 'https://buy.stripe.com/6oUaEWeMX4yS7Qa31R4gg0r' },

  // Private brusefilter-produkter (inkl. moms) – oprettet i Stripe live
  'brusehoved-filter-acf':         { productId: 'prod_UnZYxXEQE5Sgec', paymentLink: 'https://buy.stripe.com/5kQ14m34f3uOeey1XN4gg0G' },
  'brusehoved-til-filter':         { productId: 'prod_UnZYHPdWbOIUlp', paymentLink: 'https://buy.stripe.com/bJeeVc8oz0iCfiC0TJ4gg0H' },
  'brusefilter-acf':               { productId: 'prod_UnZYndSmMTMZ1Y', paymentLink: 'https://buy.stripe.com/aFafZg48jfdw6M659Z4gg0I' },
  'brusefilter-acf-vitamin-c':     { productId: 'prod_UnZYnfV0UX6PuH', paymentLink: 'https://buy.stripe.com/00wfZg0W72qK8Ue31R4gg0J' },
  'brusefilter-acf-amino-acid':    { productId: 'prod_UnZYN4UtvQ6BnU', paymentLink: 'https://buy.stripe.com/dRm7sK34f6H07QagSH4gg0K' },

  // Cartridge MF5 – filter til AS Tube (privat) – oprettet i Stripe live
  'cartridge-sc3':                 { productId: 'prod_UnaAJsIRq1aYzQ', paymentLink: 'https://buy.stripe.com/00w9ASgV51mG1rM45V4gg0L' },

  // Cartridge SC3 – filter til cBlue SC3 – oprettet i Stripe live
  'cblue-sc3-filter':              { productId: 'prod_UnaaX8MP0xbj9f', paymentLink: 'https://buy.stripe.com/cNi28q7kv0iC9Yi8mb4gg0M' },

  // Vægbeslag (tilkøb til kalkanlæg) – oprettet i Stripe live
  'vaegbeslag-resintank':          { productId: 'prod_UncPFl5q8AXq16', paymentLink: 'https://buy.stripe.com/aFa3cubAL0iC6M6gSH4gg0N' },
  'vaegbeslag-saltbeholder':       { productId: 'prod_UncPbNFvlPrSWf', paymentLink: 'https://buy.stripe.com/aFabJ0eMX6H0b2m6e34gg0O' },
}

export function getStripe(cwsId: string): StripeData | undefined {
  return STRIPE_MAPPING[cwsId]
}
