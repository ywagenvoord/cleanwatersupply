import type { Metadata } from 'next'
import LegionellaClient from './LegionellaClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'
const URL = `${SITE_URL}/legionella`

export const metadata: Metadata = {
  title: 'Legionella-filtre til brusere & vandhaner',
  description:
    'Beskyt mod Legionella i brusebade og vandhaner. Medicinsk certificerede filtre med 7 log retention – dokumenteret effektive mod Legionella pneumophila. Læs om risiko, symptomer og forebyggelse.',
  keywords: [
    'Legionella',
    'Legionella filter',
    'Legionella forebyggelse',
    'Legionella pneumophila',
    'Legionærsyge',
    'brusefilter Legionella',
    'vandhanefilter Legionella',
    'Legionella behandling',
    'biofilm bekæmpelse',
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Legionella – Forebyggelse & filtre | Clean Water Supply',
    description:
      'Alt om Legionella-risiko, forebyggelse og medicinsk certificerede point-of-use filtre med 7 log retention.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem', url: SITE_URL },
          { name: 'Legionella', url: URL },
        ]}
      />
      <ArticleJsonLd
        url={URL}
        headline="Legionella – Forebyggelse, filtre & beskyttelse"
        description="Beskyt mod Legionella i brusebade og vandhaner med medicinsk certificerede point-of-use filtre. 7 log retention dokumenteret mod Legionella pneumophila."
        image={`${URL}/opengraph-image`}
        datePublished="2025-01-15T08:00:00+01:00"
        dateModified={new Date().toISOString()}
        keywords={['Legionella', 'Legionella filter', 'Legionærsyge', 'Pseudomonas', 'biofilm', 'point-of-use filter']}
        about={['Legionella pneumophila', 'Vandhygiejne', 'Legionærsyge', 'Pseudomonas aeruginosa']}
      />
      <LegionellaClient />
    </>
  )
}
