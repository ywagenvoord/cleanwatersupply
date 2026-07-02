import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AudienceModal from '@/components/AudienceModal'
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd'
import { SITE_URL } from '@/lib/site'


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Clean Water Supply – Legionella-filtre & vandhygiejne',
    template: '%s | Clean Water Supply',
  },
  description:
    'Danmarks specialist i vandhygiejne. Medicinsk certificerede Legionella-filtre, blødgøringsanlæg og ECA-vand til hospitaler, hoteller og private hjem.',
  keywords: [
    'Legionella filter',
    'vandfiltrering Danmark',
    'blødgøringsanlæg',
    'ECA-vand',
    'hypochlorous acid',
    'HClO generator',
    'Baclyser filter',
    'Pseudomonas filter',
    'bakteriefrit vand',
    'vandbehandling hospital',
    'vandhygiejne hotel',
    'kalkfilter',
    'point of use filter',
    'vandhanefilter',
    'brusefilter',
  ],
  authors: [{ name: 'Clean Water Supply', url: SITE_URL }],
  creator: 'Clean Water Supply',
  publisher: 'Clean Water Supply ApS',
  applicationName: 'Clean Water Supply',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'da-DK': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    url: SITE_URL,
    siteName: 'Clean Water Supply',
    title: 'Clean Water Supply – Legionella-filtre & vandhygiejne i Danmark',
    description:
      'Medicinsk certificerede Legionella-filtre, blødgøringsanlæg og ECA-vand til hospitaler, hoteller og private hjem. ECHA Article 95 godkendt.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Clean Water Supply – vandhygiejne specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clean Water Supply – Legionella-filtre i Danmark',
    description:
      'Medicinsk certificerede vandfiltre og blødgøringsanlæg. ECHA Article 95 godkendt.',
    images: ['/images/og-default.jpg'],
  },
  // icons left to Next.js conventions (icon.tsx + apple-icon.tsx)
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: 'business',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a2540' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da-DK">
      <head>
        {/* DNS prefetch + preconnect for critical third-party origins */}
        <link rel="preconnect" href="https://cleanwatersupply.dk" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cleanwatersupply.dk" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://buy.stripe.com" />
        {/* Site-wide Organization JSON-LD */}
        <OrganizationJsonLd />
      </head>
      <body>
        <Providers>
          <Navigation />
          <div className="pt-24">
            {children}
          </div>
          <Footer />
          <AudienceModal />
        </Providers>
      </body>
    </html>
  )
}
