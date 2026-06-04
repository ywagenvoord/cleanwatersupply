import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { SITE_URL } from '@/lib/site'


export const metadata: Metadata = {
  title: 'Om Clean Water Supply – Danmarks vandhygiejne specialist',
  description:
    'Lær Clean Water Supply at kende: Danmarks specialist i Legionella-filtre, blødgøringsanlæg og ECA-vand. Møde teamet, vores mission og hvordan vi sikrer rent vand til hospitaler og hoteller.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/about`,
    title: 'Om os | Clean Water Supply',
    description: 'Mød Danmarks vandhygiejne specialist.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <AboutClient />
}
