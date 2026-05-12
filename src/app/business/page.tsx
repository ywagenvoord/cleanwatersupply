import type { Metadata } from 'next'
import BusinessClient from './BusinessClient'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'

export const metadata: Metadata = {
  title: 'B2B vandbehandling – Hospitaler, hoteller, fødevareindustri',
  description:
    'B2B vandhygiejne fra Clean Water Supply: certificerede løsninger til hospitaler, hoteller, svømmehaller, fødevareindustri og landbrug. Skræddersyet rådgivning og service.',
  alternates: { canonical: `${SITE_URL}/business` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/business`,
    title: 'Erhverv & B2B | Clean Water Supply',
    description: 'Vandhygiejne til hospitaler, hoteller og industri.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <BusinessClient />
}
