import type { Metadata } from 'next'
import { getMergedShopProducts } from '@/lib/shop-data'
import ErhvervShopGate from './ErhvervShopGate'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Erhverv-shop – medicinske filtre & professionelle anlæg',
  description:
    'Erhvervs-shop hos Clean Water Supply: medicinsk certificerede Baclyser-filtre, AS Tube, inline-filtre, HygieneSiphon, blødgøringsanlæg og ECA-vand til hospitaler, hoteller, svømmehaller og landbrug.',
  alternates: { canonical: `${SITE_URL}/shop/erhverv` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/shop/erhverv`,
    title: 'Erhverv-shop | Clean Water Supply',
    description: 'Medicinske filtre og professionelle vandbehandlingsløsninger til erhverv.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default async function ErhvervShopPage() {
  const products = await getMergedShopProducts()

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem', url: SITE_URL },
          { name: 'Erhverv-shop', url: `${SITE_URL}/shop/erhverv` },
        ]}
      />
      {/* Erhverv-shop bag login: viser kun produkter/priser når man er logget ind */}
      <ErhvervShopGate products={products} />
    </>
  )
}
