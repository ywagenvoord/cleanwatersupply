'use client'

import ShopifyBuyButton from '@/components/ShopifyBuyButton'

export default function ShopifyBuyButtonWrapper({
  componentId,
  productId,
}: {
  componentId: string
  productId: string
}) {
  return <ShopifyBuyButton componentId={componentId} productId={productId} />
}
