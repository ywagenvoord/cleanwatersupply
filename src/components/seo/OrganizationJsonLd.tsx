import { SITE_URL } from '@/lib/site'

// Site-wide Organization + LocalBusiness + WebSite schema
// Rendered once in the root layout's <head>.


export default function OrganizationJsonLd() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${SITE_URL}/#organization`,
        name: 'Clean Water Supply',
        legalName: 'Clean Water Supply ApS',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/images/logo.png`,
        description:
          'Danmarks specialist i Legionella-filtre, blødgøringsanlæg og ECA-vand til hospitaler, hoteller og private hjem.',
        telephone: '+4551215800',
        email: 'info@cleanwatersupply.dk',
        vatID: 'DK44405563',
        taxID: '44405563',
        foundingDate: '2020',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Strømøvej 3',
          postalCode: '8700',
          addressLocality: 'Horsens',
          addressRegion: 'Midtjylland',
          addressCountry: 'DK',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 55.8607,
          longitude: 9.8504,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:30',
            closes: '16:00',
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Denmark' },
          { '@type': 'Country', name: 'Sweden' },
          { '@type': 'Country', name: 'Norway' },
          { '@type': 'Country', name: 'Germany' },
        ],
        sameAs: [
          'https://cleanwatersupply.dk',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+4551215800',
            contactType: 'sales',
            email: 'info@cleanwatersupply.dk',
            availableLanguage: ['Danish', 'English'],
            areaServed: 'DK',
          },
          {
            '@type': 'ContactPoint',
            telephone: '+4522320156',
            contactType: 'technical support',
            email: 'kristoffer@cleanwatersupply.dk',
            availableLanguage: ['Danish', 'English'],
            areaServed: 'DK',
          },
        ],
        knowsAbout: [
          'Legionella',
          'Pseudomonas aeruginosa',
          'Vandhygiejne',
          'Drikkevandsbehandling',
          'ECA-vand',
          'Hypochlorous acid',
          'Vandfiltrering',
          'Blødgøringsanlæg',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Clean Water Supply',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'da-DK',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  )
}
