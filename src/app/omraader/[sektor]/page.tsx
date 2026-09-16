import type { Metadata } from 'next'
import { sektorer, getSektorById } from '@/lib/sektorer'
import { notFound } from 'next/navigation'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'
import SektorClient from './SektorClient'

export const dynamicParams = false

export function generateStaticParams() {
  return sektorer.map((s) => ({ sektor: s.id }))
}

export async function generateMetadata({ params }: { params: { sektor: string } }): Promise<Metadata> {
  const sektor = getSektorById(params.sektor)
  if (!sektor) return { title: 'Område ikke fundet', robots: { index: false } }

  const url = `${SITE_URL}/omraader/${sektor.id}`

  function truncate(text: string, max: number): string {
    if (text.length <= max) return text
    const sliced = text.substring(0, max)
    const lastSpace = sliced.lastIndexOf(' ')
    return (lastSpace > max * 0.7 ? sliced.substring(0, lastSpace) : sliced).replace(/[,.;:\s]+$/, '') + '…'
  }

  return {
    title: `Vandhygiejne for ${sektor.title.toLowerCase()}`,
    description: truncate(sektor.problemBody, 155),
    keywords: [sektor.title, 'Legionella', 'vandhygiejne', 'vandfilter', sektor.title.toLowerCase()],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${sektor.title} | Clean Water Supply`,
      description: sektor.tagline,
      images: sektor.heroImage ? [{ url: sektor.heroImage, alt: sektor.title }] : undefined,
      locale: 'da_DK',
      siteName: 'Clean Water Supply',
    },
  }
}

export default function SektorPage({ params }: { params: { sektor: string } }) {
  const sektor = getSektorById(params.sektor)
  if (!sektor) notFound()

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem',     url: SITE_URL },
          { name: 'Områder',  url: `${SITE_URL}/omraader` },
          { name: sektor.title, url: `${SITE_URL}/omraader/${sektor.id}` },
        ]}
      />
      <SektorClient sektor={sektor} />
    </>
  )
}
