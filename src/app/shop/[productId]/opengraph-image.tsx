import { ImageResponse } from 'next/og'
import { getProduct } from '@/lib/products'
import { getActiveStripeProducts } from '@/lib/stripe-fetch'

export const runtime = 'nodejs'      // need Stripe SDK access for live products
export const alt = 'Clean Water Supply produkt'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function fetchProduct(id: string) {
  // Try hardcoded list first
  const hardcoded = getProduct(id)
  if (hardcoded) {
    const stripeProducts = await getActiveStripeProducts()
    const match = stripeProducts.find(sp => sp.cwsId === id)
    return {
      name:        hardcoded.name,
      tagline:     hardcoded.tagline,
      price:       match?.price ?? hardcoded.price,
      category:    hardcoded.category,
      featured:    hardcoded.featured,
      comingSoon:  hardcoded.comingSoon,
      badge:       hardcoded.badge,
    }
  }
  // Stripe-only product
  const stripeProducts = await getActiveStripeProducts()
  const sp = stripeProducts.find(p => p.stripeProductId === id)
  if (!sp) return null
  return {
    name:       sp.name,
    tagline:    'Tilgængelig nu',
    price:      sp.price,
    category:   'filtre' as const,
    featured:   false,
    comingSoon: false,
    badge:      undefined as string | undefined,
  }
}

export default async function ProductOgImage({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId)

  if (!product) {
    // Fallback to default OG
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a2540' }} />
      ),
      { ...size },
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3160 50%, #1e4380 100%)',
          display: 'flex',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(58, 173, 74, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Left column: product info */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 5 10 5 15a7 7 0 1014 0c0-5-7-13-7-13z"
                fill="#3aad4a"
              />
            </svg>
            <div style={{ color: 'white', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>
              CLEAN WATER SUPPLY
            </div>
          </div>

          {/* Product info middle */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {product.badge && (
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(58, 173, 74, 0.15)',
                  border: '1px solid #3aad4a',
                  borderRadius: 999,
                  padding: '8px 18px',
                  color: '#3aad4a',
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  width: 'fit-content',
                  marginBottom: 20,
                }}
              >
                {product.badge}
              </div>
            )}
            <div
              style={{
                color: 'white',
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: 16,
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 26,
                lineHeight: 1.3,
                maxWidth: 600,
              }}
            >
              {product.tagline}
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {product.price !== undefined && !product.comingSoon ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Pris fra
                </div>
                <div style={{ color: 'white', fontSize: 56, fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {product.price.toLocaleString('da-DK')} kr
                </div>
              </div>
            ) : (
              <div style={{ color: '#3aad4a', fontSize: 28, fontWeight: 700 }}>
                Kommer snart
              </div>
            )}
          </div>
        </div>

        {/* Right column: decorative water drop */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 360 }}>
          <svg width="280" height="280" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 5 10 5 15a7 7 0 1014 0c0-5-7-13-7-13z"
              fill="#3aad4a"
              opacity="0.9"
            />
            <path
              d="M9 14a3 3 0 003 3"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    ),
    { ...size },
  )
}
