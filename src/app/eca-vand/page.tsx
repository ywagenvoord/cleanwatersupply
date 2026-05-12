import type { Metadata } from 'next'
import EcaVandClient from './EcaVandClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'
const URL = `${SITE_URL}/eca-vand`

export const metadata: Metadata = {
  title: 'ECA-vand & HClO – Kemikaliefri desinfektion',
  description:
    'ECA-vand (elektrokemisk aktiveret vand) producerer hypochlorous acid på stedet. Effektiv kemikaliefri desinfektion til hospitaler, fødevareindustri og landbrug. ECHA Article 95 godkendt.',
  keywords: [
    'ECA-vand',
    'ECA vand',
    'hypochlorous acid',
    'HClO generator',
    'anolyt',
    'elektrokemisk aktiveret vand',
    'kemikaliefri desinfektion',
    'Kirkmayer',
    'ECHA Article 95',
    'biofilm fjernelse',
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'ECA-vand – HClO desinfektion | Clean Water Supply',
    description:
      'Kemikaliefri vandbehandling med hypochlorous acid. ECHA Article 95 godkendt teknologi til hospitaler, hoteller og fødevareindustri.',
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
          { name: 'ECA-vand', url: URL },
        ]}
      />
      <ArticleJsonLd
        url={URL}
        headline="ECA-vand – Hypochlorous acid (HClO) til kemikaliefri desinfektion"
        description="ECA-vand med hypochlorous acid er en effektiv, kemikaliefri desinfektionsmetode til hospitaler, fødevareindustri og landbrug. ECHA Article 95 godkendt."
        image={`${SITE_URL}/opengraph-image`}
        datePublished="2025-01-15T08:00:00+01:00"
        dateModified={new Date().toISOString()}
        keywords={['ECA-vand', 'hypochlorous acid', 'HClO', 'anolyt', 'kemikaliefri desinfektion', 'Kirkmayer', 'ECHA Article 95']}
        about={['Hypochlorous acid', 'Elektrokemisk aktiveret vand', 'Anolyse', 'Kirkmayer', 'ECHA']}
      />
      <EcaVandClient />
    </>
  )
}
