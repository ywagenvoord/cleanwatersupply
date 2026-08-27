import { SITE_URL } from '@/lib/site'

/**
 * Product JSON-LD til Laica-produkter (vandkander og filtre), som ikke ligger i
 * PRODUCTS-listen. Giver pris, lagerstatus, brand og forsendelses-/returinfo, så
 * siderne kan vises som rich results i Google.
 */
export default function LaicaProductJsonLd({
  name,
  path,
  image,
  description,
  price,
  sku,
  mpn,
  category = 'Vandfilter',
  brand = 'Laica',
  soldOut = false,
  restockISO,
}: {
  name: string
  path: string            // fx "/vandkander/glassmart"
  image?: string          // relativ ("/images/..") eller absolut URL
  description: string
  price?: number
  sku?: string
  mpn?: string
  category?: string
  brand?: string
  soldOut?: boolean
  restockISO?: string
}) {
  const url = `${SITE_URL}${path}`
  const img = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : undefined

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name,
    description,
    image: img ? [img] : [],
    sku: sku || undefined,
    mpn: mpn || sku || undefined,
    brand: { '@type': 'Brand', name: brand },
    category,
    url,
  }

  if (price !== undefined) {
    schema.offers = {
      '@type': 'Offer',
      url,
      priceCurrency: 'DKK',
      price,
      availability: soldOut
        ? 'https://schema.org/BackOrder'
        : 'https://schema.org/InStock',
      ...(soldOut && restockISO ? { availabilityStarts: restockISO } : {}),
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Clean Water Supply' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', currency: 'DKK' },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['DK', 'SE', 'NO', 'DE', 'NL', 'BE'],
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5, unitCode: 'DAY' },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DK',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    }
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
