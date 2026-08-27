// Overstyr billeder for Stripe-only produkter, hvor billedet i Stripe er forkert
// eller mangler. Nøgle = Stripe-produkt-id, værdi = lokalt billede i /public.
export const STRIPE_IMAGE_OVERRIDE: Record<string, string> = {
  // MikroPLASTIK-STOP: Stripe-billedet viste ved en fejl Carmen-kanden.
  'prod_V2wDbJ1i8O20Kj': '/images/kande-mikroplastik-t.png',
}

export function overrideImage(stripeProductId: string, fallback: string): string {
  return STRIPE_IMAGE_OVERRIDE[stripeProductId] ?? fallback
}
