import type { Metadata } from 'next'
import LegionellaClient from './LegionellaClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/legionella`

export const metadata: Metadata = {
  title: 'Legionellabekæmpelse – filtre & forebyggelse til bruser og vandhane',
  description:
    'Legionellabekæmpelse der virker: medicinsk certificerede point-of-use filtre med 7 log retention mod Legionella pneumophila – plus forebyggelse, risiko og symptomer. Til brusere og vandhaner i hjem og erhverv.',
  keywords: [
    'Legionellabekæmpelse',
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
    title: 'Legionellabekæmpelse – forebyggelse & filtre | Clean Water Supply',
    description:
      'Alt om Legionellabekæmpelse: risiko, forebyggelse og medicinsk certificerede point-of-use filtre med 7 log retention.',
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
        headline="Legionellabekæmpelse – forebyggelse, filtre & beskyttelse"
        description="Legionellabekæmpelse i brusebade og vandhaner med medicinsk certificerede point-of-use filtre. 7 log retention dokumenteret mod Legionella pneumophila."
        image={`${URL}/opengraph-image`}
        datePublished="2025-01-15T08:00:00+01:00"
        dateModified={new Date().toISOString()}
        keywords={['Legionellabekæmpelse', 'Legionella', 'Legionella filter', 'Legionærsyge', 'Pseudomonas', 'biofilm', 'point-of-use filter']}
        about={['Legionellabekæmpelse', 'Legionella pneumophila', 'Vandhygiejne', 'Legionærsyge', 'Pseudomonas aeruginosa']}
      />
      <LegionellaClient />
    </>
  )
}
