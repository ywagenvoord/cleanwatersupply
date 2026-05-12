type ArticleProps = {
  url:           string
  headline:      string
  description:   string
  image:         string
  datePublished: string  // ISO 8601
  dateModified:  string  // ISO 8601
  keywords?:     string[]
  about?:        string[]  // entities the article is about
}

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'

export default function ArticleJsonLd(props: ArticleProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.headline,
    description: props.description,
    image: [props.image],
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    inLanguage: 'da-DK',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Clean Water Supply',
      url: SITE_URL,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
    keywords: props.keywords?.join(', '),
    about: props.about?.map(name => ({ '@type': 'Thing', name })),
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
