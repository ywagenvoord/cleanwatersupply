// Overstyr billeder for Stripe-only produkter, hvor billedet i Stripe er forkert
// eller mangler. Nøgle = Stripe-produkt-id, værdi = lokalt billede i /public.

// Fuldt billedgalleri (første billede er hero). Bruges på produktsiden.
export const STRIPE_GALLERY_OVERRIDE: Record<string, string[]> = {
  // MikroPLASTIK-STOP filterkande – rigtige produktbilleder (dobbeltfilter)
  'prod_V2wDbJ1i8O20Kj': [
    '/images/kande-mikroplastik-stop.jpg',
    '/images/kande-mikroplastik-stop-b.jpg',
    '/images/kande-mikroplastik-stop-c.jpg',
    '/images/kande-mikroplastik-stop-d.jpg',
  ],
}

// Enkelt kort-/hero-billede (afledt af galleriets første billede).
export const STRIPE_IMAGE_OVERRIDE: Record<string, string> = Object.fromEntries(
  Object.entries(STRIPE_GALLERY_OVERRIDE).map(([id, imgs]) => [id, imgs[0]]),
)

export function overrideImage(stripeProductId: string, fallback: string): string {
  return STRIPE_IMAGE_OVERRIDE[stripeProductId] ?? fallback
}

export function galleryFor(stripeProductId: string): string[] | undefined {
  return STRIPE_GALLERY_OVERRIDE[stripeProductId]
}

// Produktvideo (mp4) for Stripe-only produkter.
// (MikroPLASTIK-STOP viser videoen i en lille ramme på den rige kande-side i stedet.)
export const STRIPE_VIDEO_OVERRIDE: Record<string, string> = {}

export function videoFor(stripeProductId: string): string | undefined {
  return STRIPE_VIDEO_OVERRIDE[stripeProductId]
}
