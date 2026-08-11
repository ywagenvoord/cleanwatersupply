import type { Metadata } from 'next'
import HomeClient from './HomeClient'
import { SITE_URL } from '@/lib/site'


export const metadata: Metadata = {
  title: { absolute: 'Clean Water Supply - En sikker løsning til bakteriefrit vand' },
  description:
    'Bakteriefrit vand i hjem og erhverv: medicinsk certificerede Legionella-filtre, blødgøringsanlæg og ECA-vand til hospitaler, hoteller og private hjem. ECHA Article 95 godkendt – 7 log retention.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Clean Water Supply – Bakteriefrit vand & Legionella-filtre',
    description:
      'Bakteriefrit vand med medicinsk certificerede vandfiltre, blødgøringsanlæg og ECA-vand. 7 log retention mod Legionella, Pseudomonas og Staphylococcus.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <HomeClient />
}
