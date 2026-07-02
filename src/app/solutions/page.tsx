import type { Metadata } from 'next'
import SolutionsClient from './SolutionsClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/solutions`

export const metadata: Metadata = {
  title: 'Vandløsninger til det private hjem | Clean Water Supply',
  description:
    'Rent, blødt og bakteriefrit vand i hele hjemmet: vandfiltrering, blødgøringsanlæg og bakteriefrie filtre til hane og bruser. Til både byvand og egen brønd.',
  keywords: [
    'vandløsninger hjem',
    'vandfiltrering privat',
    'blødgøringsanlæg hjem',
    'bakteriefrit vand',
    'kalkfrit vand',
    'brøndvand filter',
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title: 'Vandløsninger til det private hjem | Clean Water Supply',
    description: 'Rent, blødt og bakteriefrit vand i hele hjemmet – vandfiltrering, blødgøringsanlæg og filtre til hane og bruser.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem',     url: SITE_URL },
          { name: 'Løsninger', url: URL },
        ]}
      />
      <SolutionsClient />
    </>
  )
}
