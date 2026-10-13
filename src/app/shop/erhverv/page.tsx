import type { Metadata } from 'next'
import { getMergedShopProducts } from '@/lib/shop-data'
import ShopClient from '../ShopClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Produkter til erhverv – filtre & vandbehandling | Clean Water Supply',
  description:
    'Produktoversigt til erhverv: medicinsk certificerede filtre, inline-filtre, brusere, filterkander, blødgøringsanlæg og ECA-vand til hospitaler, hoteller, svømmehaller, fødevare og landbrug. Kontakt os for tilbud.',
  alternates: { canonical: `${SITE_URL}/shop/erhverv` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/shop/erhverv`,
    title: 'Produkter til erhverv | Clean Water Supply',
    description: 'Produktoversigt med professionelle vandbehandlingsløsninger til erhverv – kontakt os for tilbud.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default async function ErhvervProductsPage() {
  const products = await getMergedShopProducts()

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem', url: SITE_URL },
          { name: 'Produkter til erhverv', url: `${SITE_URL}/shop/erhverv` },
        ]}
      />
      {/* Erhvervs-katalog: samme shop-layout, men uden priser og køb */}
      <ShopClient products={products} showErhverv mode="catalog" />
    </>
  )
}
