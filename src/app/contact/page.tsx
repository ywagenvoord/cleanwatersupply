import type { Metadata } from 'next'
import ContactClient from './ContactClient'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'

export const metadata: Metadata = {
  title: 'Kontakt – Få et tilbud på vandbehandling',
  description:
    'Kontakt Clean Water Supply: +45 51 21 58 00 eller info@cleanwatersupply.dk. Strømøvej 3, 8700 Horsens. Få gratis rådgivning og et skræddersyet tilbud.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/contact`,
    title: 'Kontakt | Clean Water Supply',
    description: 'Få et tilbud eller stil et spørgsmål.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <ContactClient />
}
