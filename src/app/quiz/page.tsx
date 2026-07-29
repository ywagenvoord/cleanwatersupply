import type { Metadata } from 'next'
import QuizClient from './QuizClient'
import { PRIZE_SHORT } from '@/lib/quiz'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: `Vandquiz – vind et ${PRIZE_SHORT} | Clean Water Supply`,
  description:
    'Test din viden om Legionella, bakterier og rent vand i vores korte vandquiz – og vær med i lodtrækningen om et medicinsk godkendt vandfilter.',
  alternates: { canonical: `${SITE_URL}/quiz` },
  openGraph: {
    title: `Hvor meget ved du om rent vand?`,
    description:
      'Tag vandquizzen på 4 spørgsmål og deltag i konkurrencen om et medicinsk godkendt vandfilter.',
    url: `${SITE_URL}/quiz`,
    type: 'website',
    images: [{ url: '/images/og-quiz-v3.jpg', width: 1200, height: 630, alt: 'Vind et Baclyser neo TR – tag vandquizzen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hvor meget ved du om rent vand?',
    description: 'Tag vandquizzen og vind et medicinsk godkendt vandfilter.',
    images: ['/images/og-quiz-v3.jpg'],
  },
}

export default function QuizPage() {
  return <QuizClient />
}
