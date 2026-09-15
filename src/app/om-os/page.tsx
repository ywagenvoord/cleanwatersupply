import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import FaqJsonLd from '@/components/seo/FaqJsonLd'
import { SITE_URL } from '@/lib/site'

// Ofte stillede spørgsmål (B2C) – vises på siden + som FAQPage-schema, så AI/Google kan læse dem.
const OM_OS_FAQS = [
  { q: 'Hvem er Clean Water Supply?', a: 'Clean Water Supply er en dansk virksomhed, der hjælper familier og virksomheder med rent, bakteriefrit vand i hverdagen. Vi leverer filterkander, filtre til bruser og hane samt blødgøringsanlæg – med personlig rådgivning og professionel montering.' },
  { q: 'Hvor ligger I?', a: 'Vi holder til på Strømøvej 3, 8700 Horsens, og hjælper kunder i hele Danmark.' },
  { q: 'Er jeres produkter certificerede?', a: 'Ja. Vores Legionella-filtre er medicinsk godkendte, og vores løsninger er dokumenterede og certificerede efter anerkendte standarder. Vores kande- og filterprodukter er produceret i EU.' },
  { q: 'Hjælper I private, eller kun erhverv?', a: 'Begge dele. Vi har enkle løsninger til hjemmet – fra filterkande til blødgøringsanlæg – og skræddersyede løsninger til hoteller, hospitaler, industri og landbrug.' },
  { q: 'Tilbyder I gratis rådgivning?', a: 'Ja. Vi tilbyder gratis og uforpligtende rådgivning, hvor vi finder den rigtige løsning til dit hjem eller din virksomhed. Kontakt os, så hjælper vi dig videre.' },
  { q: 'Hvordan kommer jeg i kontakt med jer?', a: 'Du kan ringe på +45 51 21 58 00 eller skrive til info@cleanwatersupply.dk. Du er også velkommen til at bruge kontaktformularen på siden.' },
]


export const metadata: Metadata = {
  title: 'Om Clean Water Supply – Danmarks vandhygiejne specialist',
  description:
    'Lær Clean Water Supply at kende: Danmarks specialist i Legionella-filtre, blødgøringsanlæg og ECA-vand. Møde teamet, vores mission og hvordan vi sikrer rent vand til hospitaler og hoteller.',
  alternates: { canonical: `${SITE_URL}/om-os` },
  openGraph: {
    type: 'website', url: `${SITE_URL}/om-os`,
    title: 'Om os | Clean Water Supply',
    description: 'Mød Danmarks vandhygiejne specialist.',
    locale: 'da_DK', siteName: 'Clean Water Supply',
  },
}

export default function Page() {
  return (
    <>
      <FaqJsonLd faqs={OM_OS_FAQS} />
      <AboutClient faqs={OM_OS_FAQS} />
    </>
  )
}
