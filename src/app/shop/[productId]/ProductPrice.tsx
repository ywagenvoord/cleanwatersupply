'use client'

import { shopPrice, type Product } from '@/lib/products'
import { useB2bLoggedIn } from '@/lib/useB2b'
import { useBirthdayActive } from '@/components/Birthday'
import { birthdayPrice, BIRTHDAY_DISCOUNT } from '@/lib/birthday'
import { useBlackDealPercent } from '@/components/BlackMonth'
import { blackPrice } from '@/lib/blackmonth'
import { Gift, Tag, Wrench } from 'lucide-react'

/** Pris på detaljesiden – erhverv ser grossistpris (ekskl. moms), privat ser privatpris. */
export default function ProductPrice({ product }: { product: Product }) {
  const erhverv = useB2bLoggedIn()
  const birthdayActive = useBirthdayActive()
  const blackPct = useBlackDealPercent(product.category, product.id)

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

  const birthdayDeal = birthdayActive && !erhverv && product.category === 'vandkande'

  if (birthdayDeal) {
    const ny = birthdayPrice(amount)
    return (
      <div className="mb-5">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          <span className="text-3xl font-black text-[#C8102E] leading-none">{ny.toLocaleString('da-DK')} kr</span>
          <span className="text-base font-semibold text-gray-400 line-through">{amount.toLocaleString('da-DK')} kr</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#C8102E] text-white text-xs font-black px-2.5 py-1 shadow-sm">
            <Gift className="w-3.5 h-3.5" /> Kun i dag
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Fødselsdagstilbud −{BIRTHDAY_DISCOUNT.percent}% · {exMoms ? 'Ekskl. moms' : 'Inkl. moms'} · Hurtig levering</p>
      </div>
    )
  }

  if (!erhverv && blackPct > 0) {
    const ny = blackPrice(amount, blackPct)
    return (
      <div className="mb-5">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          <span className="text-3xl font-black text-[#0a2540] leading-none">{ny.toLocaleString('da-DK')} kr</span>
          <span className="text-base font-semibold text-gray-400 line-through">{amount.toLocaleString('da-DK')} kr</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black text-white text-xs font-black px-2.5 py-1 shadow-sm ring-1 ring-[#E8B64C]">
            <Tag className="w-3.5 h-3.5" style={{ color: '#E8B64C' }} /> <span style={{ color: '#E8B64C' }}>BLACK</span> −{blackPct}%
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Black Month −{blackPct}% · {exMoms ? 'Ekskl. moms' : 'Inkl. moms'} · Hurtig levering</p>
      </div>
    )
  }

  return (
    <div className="mb-5">
      <p className="text-3xl font-extrabold text-[#0a2540]">{amount.toLocaleString('da-DK')} kr</p>
      <p className="text-xs text-gray-400 mt-1">{exMoms ? 'Ekskl. moms' : 'Inkl. moms'} · Hurtig levering</p>
      {product.category === 'blosgoringsanlaeg' && (
        <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#3aad4a]/10 text-[#2e7d34] text-sm font-bold px-3 py-1.5">
          <Wrench className="w-4 h-4" /> Gratis montering inkluderet
        </span>
      )}
    </div>
  )
}
