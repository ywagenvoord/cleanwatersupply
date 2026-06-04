import type { Metadata } from 'next'
import OmraaderClient from './OmraaderClient'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/omraader`

export const metadata: Metadata = {
  title: 'Vandhygiejne efter branche',
  description:
    'Vandhygiejne-løsninger til 7 brancher: hoteller, svømmehaller, hospitaler, campingpladser, private hjem, fødevareindustri og landbrug. Specialiseret rådgivning per sektor.',
  keywords: [
    'vandhygiejne sektorer',
    'Legionella hospital',
    'Legionella hotel',
    'svømmehal vandbehandling',
    'campingplads vandfilter',
    'fødevareindustri ECA',
    'landbrug ECA-vand',
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: 'website', url: URL,
    title: 'Sektorer vi servicerer | Clean Water Supply',
    description: 'Skræddersyede vandløsninger til 7 brancher.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Hjem',     url: SITE_URL },
          { name: 'Områder',  url: URL },
        ]}
      />
      <OmraaderClient />
    </>
  )
}
