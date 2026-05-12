import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Din kurv',
  description: 'Se og rediger din indkøbskurv.',
  robots: { index: false, follow: false },
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
