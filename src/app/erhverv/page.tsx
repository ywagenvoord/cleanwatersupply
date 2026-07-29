import type { Metadata } from 'next'
import ErhvervClient from './ErhvervClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Erhverv – Legionella-bekæmpelse & Kirkmayer HOCl-anlæg | Clean Water Supply',
  description:
    'B2B-vandhygiejne: medicinsk certificeret Legionella-bekæmpelse og Kirkmayers kemikaliefri HOCl-anlæg (Anolyt) til hospitaler, hoteller, svømmehaller, fødevareindustri og landbrug – fjerner biofilm og sikrer bakteriefrit vand helt ud til hvert tappested og hvert dyr.',
  alternates: { canonical: `${SITE_URL}/erhverv` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/erhverv`,
    title: 'Erhverv | Clean Water Supply',
    description:
      'Komplette vandbehandlingsanlæg og dokumenteret vandhygiejne til erhverv – blødgøring, ECA-vand, central filtrering og Legionella-beskyttelse.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <ErhvervClient />
}
