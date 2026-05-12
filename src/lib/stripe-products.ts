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
}

export function getStripe(cwsId: string): StripeData | undefined {
  return STRIPE_MAPPING[cwsId]
}
