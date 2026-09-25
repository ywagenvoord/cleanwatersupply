import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import ProductFinderClient from './ProductFinderClient'

export const metadata: Metadata = {
  title: 'Find den rette løsning til dit vand – vandvejviser | Clean Water Supply',
  description:
    'Svar på fire korte spørgsmål, så guider vi dig til den rette løsning – blødgøringsanlæg, brusefilter, vandhanefilter eller filterkande. Uforpligtende og uden tilmelding.',
  alternates: { canonical: `${SITE_URL}/guides/find-filter` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/guides/find-filter`,
    title: 'Find den rette løsning til dit vand',
    description: 'Bliv afklaret på fire korte spørgsmål – vi anbefaler det, der passer til dit vand.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Forside', url: SITE_URL },
          { name: 'Guides', url: `${SITE_URL}/guides` },
          { name: 'Find dit filter', url: `${SITE_URL}/guides/find-filter` },
        ]}
      />
      <ProductFinderClient />
    </>
  )
}
