import type { Metadata } from 'next'
import PrivateClient from './PrivateClient'
import { SITE_URL } from '@/lib/site'
import { getMergedShopProducts } from '@/lib/shop-data'
import { BIRTHDAY } from '@/lib/birthday'

export function generateMetadata(): Metadata {
  // Fødselsdags-link-preview (Open Graph) vises frem til og med kampagnens slut,
  // så delte links til /private viser fødselsdagsgrafikken. Bagefter: standard.
  const birthday = Date.now() <= BIRTHDAY.end.getTime()

  const ogTitle = birthday
    ? 'Spar 30% – KUN I DAG 🎉 Vi fylder 3 år'
    : 'Privat | Clean Water Supply'
  const ogDesc = birthday
    ? 'Vi fejrer 3 år! Få 30% på alle filterkander og vandkande-filtre – men skynd dig, tilbuddet gælder KUN i dag.'
    : 'Rent, bakteriefrit og kalkfrit vand til dit hjem.'
  const ogImages = birthday
    ? [{ url: '/images/og-fodselsdag.jpg', width: 1200, height: 630, alt: 'Clean Water Supply fylder 3 år – spar 30%' }]
    : undefined

  return {
    title: 'Privat – rent og sundt vand til dit hjem | Clean Water Supply',
    description:
      'Vandløsninger til private hjem: bakteriefrit vand, bakteriefrit vand og kalkfrit vand. Nemme at installere og tilpasse til enhver bolig.',
    alternates: { canonical: `${SITE_URL}/private` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/private`,
      title: ogTitle,
      description: ogDesc,
      locale: 'da_DK',
      siteName: 'Clean Water Supply',
      images: ogImages,
    },
    twitter: birthday
      ? { card: 'summary_large_image', title: ogTitle, description: ogDesc, images: ['/images/og-fodselsdag.jpg'] }
      : undefined,
  }
}

export default async function Page() {
  const shopProducts = await getMergedShopProducts()
  return <PrivateClient shopProducts={shopProducts} />
}
