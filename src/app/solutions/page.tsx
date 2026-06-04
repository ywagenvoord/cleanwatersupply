import type { Metadata } from 'next'
import SolutionsClient from './SolutionsClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/solutions`

export const metadata: Metadata = {
  title: 'Vandbehandling – Komplette løsninger til erhverv & private',
  description:
    'Skræddersyede vandbehandlingsløsninger: Legionella-filtre, blødgøringsanlæg, ECA-vand og drikkevandssystemer. Til hospitaler, hoteller, svømmehaller og private hjem.',
  keywords: [
    'vandbehandling',
    'vandløsninger',
    'kommerciel vandbehandling',
    'industriel vandfiltrering',
    'Legionella løsning',
    'blødgøringsanlæg erhverv',
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title: 'Vandbehandlingsløsninger | Clean Water Supply',
    description: 'Komplette vandbehandlingsløsninger til erhverv og private i Danmark.',
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
