import type { Product } from '@/lib/products'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'

export default function ProductJsonLd({ product }: { product: Product }) {
  const url = `${SITE_URL}/shop/${product.id}`
  const image = product.imgLarge || product.imgSrc

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    description: product.longDescription || product.description,
    image: image ? [image] : [],
    sku: product.id,
    mpn: product.productNr || product.id,
    brand: {
      '@type': 'Brand',
      name: 'Clean Water Supply',
    },
    category: product.category === 'filtre' ? 'Vandfilter' : 'Blødgøringsanlæg',
    url,
  }

  // Add offer if priced
  if (product.price !== undefined && !product.comingSoon) {
    schema.offers = {
      '@type': 'Offer',
      url,
      priceCurrency: 'DKK',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Clean Water Supply',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          currency: 'DKK',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['DK', 'SE', 'NO', 'DE', 'NL', 'BE'],
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime:  { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime:   { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5, unitCode: 'DAY' },
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
  } else if (product.comingSoon) {
    schema.offers = {
      '@type': 'Offer',
      url,
      priceCurrency: 'DKK',
      availability: 'https://schema.org/PreOrder',
    }
  }

  // NOTE: AggregateRating intentionally omitted.
  // Google's structured-data guidelines require ratings to be sourced from
  // genuine first-party reviews. Add real Review objects here once UGC exists.

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
