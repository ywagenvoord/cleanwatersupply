import type { Metadata } from 'next'
import FordeleClient from './FordeleClient'
import { SITE_URL } from '@/lib/site'

const URL = `${SITE_URL}/fordele`

export const metadata: Metadata = {
  title: 'Fordele ved Clean Water Supply – Hvorfor vælge os?',
  description:
    'Hvorfor vælge Clean Water Supply? Medicinsk certificeret, ECHA Article 95 godkendt, dokumenteret 7 log retention, hurtig levering og ekspertrådgivning til hospitaler, hoteller og private.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website', url: URL,
    title: 'Fordele | Clean Water Supply',
    description: 'Sådan beskytter vi dit vand med dokumenteret kvalitet.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <FordeleClient />
}
