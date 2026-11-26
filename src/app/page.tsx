import type { Metadata } from 'next'
import HomeClient from './HomeClient'
import { SITE_URL } from '@/lib/site'


export const metadata: Metadata = {
  title: { absolute: 'Clean Water Supply – Legionella-filtre, vandfiltre & vandhygiejne' },
  description:
    'Rent, sikkert vand i hjem og erhverv: medicinsk certificerede Legionella-filtre, blødgøringsanlæg og ECA-vand til hospitaler, hoteller og private hjem. ECHA Article 95 godkendt – op til 7 log bakteriereduktion.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Clean Water Supply – Legionella-filtre & vandhygiejne',
    description:
      'Rent, sikkert vand med medicinsk certificerede vandfiltre, blødgøringsanlæg og ECA-vand. Op til 7 log reduktion af Legionella, Pseudomonas og Staphylococcus.',
    locale: 'da_DK',
    siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return <HomeClient />
}
