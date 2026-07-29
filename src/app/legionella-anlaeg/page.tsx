import type { Metadata } from 'next'
import LegionellaAnlaegClient from './LegionellaAnlaegClient'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Legionella-anlæg til erhverv – sikring af hele bygningen | Clean Water Supply',
  description:
    'Komplet legionella-anlæg til hospitaler, plejehjem, hoteller og svømmehaller: flertrins beskyttelse fra central barriere til tappested. Dokumenterbar og medicinsk certificeret.',
  alternates: { canonical: `${SITE_URL}/legionella-anlaeg` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LegionellaAnlaegClient />
}
