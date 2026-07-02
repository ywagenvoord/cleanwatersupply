'use client'

import { useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

/** Tømmer kurven, når kunden er landet på ordrebekræftelsen. */
export default function ClearCart() {
  const { clearCart } = useCart()
  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
