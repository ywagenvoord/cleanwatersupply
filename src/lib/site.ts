// Central place for the canonical site URL.
// Set NEXT_PUBLIC_SITE_URL in Netlify (or Vercel) env vars to override.
// Falls back to platform-provided URLs, then a hardcoded default.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.URL ? process.env.URL : '') ||                       // Netlify provides URL
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'https://cleanwatersupply.dk'

// Canonical short hostname (no protocol) — useful for display
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '')

// Brand info that doesn't depend on URL
export const BRAND = {
  name:        'Clean Water Supply',
  legalName:   'Clean Water Supply ApS',
  email:       'info@cleanwatersupply.dk',
  phone:       '+4551215800',
  cvr:         '44405563',
  street:      'Strømøvej 3',
  postalCode:  '8700',
  city:        'Horsens',
  country:     'DK',
} as const
