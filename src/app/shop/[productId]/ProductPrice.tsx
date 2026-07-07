'use client'

import { shopPrice, type Product } from '@/lib/products'
import { useB2bLoggedIn } from '@/lib/useB2b'

/** Pris på detaljesiden – erhverv ser grossistpris (ekskl. moms), privat ser privatpris. */
export default function ProductPrice({ product }: { product: Product }) {
  const erhverv = useB2bLoggedIn()

  if (product.quoteOnly) {
    return (
      <div className="mb-5">
        <p className="text-2xl font-extrabold text-[#0a2540]">Kontakt for info</p>
        <p className="text-xs text-gray-400 mt-1">Pris og dimensionering efter behov</p>
      </div>
    )
  }

  const { amount, exMoms } = shopPrice(product, erhverv)

  if (product.comingSoon || amount === undefined) {
    return (
      <div className="mb-5">
        <p className="text-2xl font-extrabold text-gray-400">Kommer snart</p>
        <p className="text-xs text-gray-400 mt-1">Kontakt os for opdateret leveringsdato</p>
      </div>
    )
  }

  return (
    <div className="mb-5">
      <p className="text-3xl font-extrabold text-[#0a2540]">{amount.toLocaleString('da-DK')} kr</p>
      <p className="text-xs text-gray-400 mt-1">{exMoms ? 'Ekskl. moms' : 'Inkl. moms'} · Hurtig levering</p>
    </div>
  )
}
