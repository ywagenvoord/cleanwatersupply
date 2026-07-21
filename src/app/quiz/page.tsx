import type { Metadata } from 'next'
import QuizClient from './QuizClient'
import { PRIZE_SHORT } from '@/lib/quiz'

export const metadata: Metadata = {
  title: `Vandquiz – vind et ${PRIZE_SHORT} | Clean Water Supply`,
  description:
    'Test din viden om Legionella, bakterier og rent vand i vores korte vandquiz – og vær med i lodtrækningen om et medicinsk godkendt vandfilter.',
  openGraph: {
    title: `Hvor meget ved du om rent vand?`,
    description:
      'Tag vandquizzen på 4 spørgsmål og deltag i konkurrencen om et medicinsk godkendt vandfilter.',
    type: 'website',
  },
}

export default function QuizPage() {
  return <QuizClient />
}
