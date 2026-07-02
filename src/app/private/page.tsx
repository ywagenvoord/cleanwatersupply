import type { Metadata } from 'next'
import PrivateClient from './PrivateClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privat – rent og sundt vand til dit hjem | Clean Water Supply',
  description:
    'Vandløsninger til private hjem: bakteriefrit vand, bakteriefrit vand og kalkfrit vand. Nemme at installere og tilpasse til enhver bolig.',
  alternates: { canonical: `${SITE_URL}/private` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/private`,
    title: 'Privat | Clean Water Supply',
    description: 'Rent, bakteriefrit og kalkfrit vand til dit hjem.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <PrivateClient />
}
