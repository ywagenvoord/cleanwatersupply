/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  // 301-redirects fra gamle WordPress-URL'er (sprogpræfiks /en/ og /de/, samt
  // sider der har skiftet slug). Uden disse rammer Google-resultater en 404.
  async redirects() {
    return [
      // Carmen: kande-siden og shop-siden er samlet til én – shop-siden (med flere billeder)
      { source: '/vandkander/carmen', destination: '/shop/kande-carmen', permanent: true },

      // ── Gamle WordPress/WooCommerce-stier fra den forrige side (rammer ellers 404) ──
      // Databerblade og medie-filer lå under /wp-content/uploads/ og /uploads/
      { source: '/wp-content/:path*', destination: '/shop', permanent: true },
      { source: '/uploads/:path*',    destination: '/shop', permanent: true },
      // WooCommerce produkt- og kategori-permalinks (DA + EN varianter)
      { source: '/produkt/:path*',          destination: '/shop', permanent: true },
      { source: '/vare/:path*',             destination: '/shop', permanent: true },
      { source: '/product/:path*',          destination: '/shop', permanent: true },
      { source: '/produkt-kategori/:path*', destination: '/shop', permanent: true },
      { source: '/vare-kategori/:path*',    destination: '/shop', permanent: true },
      { source: '/product-category/:path*', destination: '/shop', permanent: true },
      { source: '/kategori/:path*',         destination: '/shop', permanent: true },
      { source: '/butik/:path*',            destination: '/shop', permanent: true },
      // WordPress REST API-endpoints (crawlet af Google, ingen side)
      { source: '/wp-json/:path*', destination: '/', permanent: true },

      // ── Konkrete gamle URL'er fundet i Search Console (404) ──
      // Gamle sektor-sider (flad sti + /en/ /de/-præfiks) → /omraader/<sektor>
      { source: '/:lang(en|de)/:sektor(hoteller|svoemmehaller|hospitaler|campingpladser|foedevare|landbruget)/:rest*', destination: '/omraader/:sektor', permanent: true },
      { source: '/:sektor(hoteller|svoemmehaller|hospitaler|campingpladser|foedevare|landbruget)/:rest*',              destination: '/omraader/:sektor', permanent: true },
      // Gammelt vandkande-filter-listing → vandkande-oversigten
      { source: '/:lang(en|de)/alle-produkter/filter/vandkande/:rest*', destination: '/vandkander', permanent: true },
      { source: '/alle-produkter/filter/vandkande/:rest*',              destination: '/vandkander', permanent: true },
      // WooCommerce "tak for din ordre"-side → forsiden (transaktionsside uden SEO-værdi)
      { source: '/order-received/:rest*', destination: '/', permanent: true },

      // ── Sider der har skiftet slug/struktur (SKAL stå før de generelle regler) ──
      { source: '/en/omraader/det-private-hjem/:path*', destination: '/private', permanent: true },
      { source: '/de/omraader/det-private-hjem/:path*', destination: '/private', permanent: true },
      { source: '/omraader/det-private-hjem/:path*',    destination: '/private', permanent: true },

      { source: '/en/alle-produkter/:path*', destination: '/shop', permanent: true },
      { source: '/de/alle-produkter/:path*', destination: '/shop', permanent: true },
      { source: '/alle-produkter/:path*',    destination: '/shop', permanent: true },

      { source: '/en/jysk-vandteknik/:path*', destination: '/', permanent: true },
      { source: '/de/jysk-vandteknik/:path*', destination: '/', permanent: true },
      { source: '/jysk-vandteknik/:path*',    destination: '/', permanent: true },

      { source: '/en/kirkmayer/:path*', destination: '/eca-vand', permanent: true },
      { source: '/de/kirkmayer/:path*', destination: '/eca-vand', permanent: true },
      { source: '/kirkmayer/:path*',    destination: '/eca-vand', permanent: true },

      { source: '/en/aqua-free/:path*', destination: '/', permanent: true },
      { source: '/de/aqua-free/:path*', destination: '/', permanent: true },
      { source: '/aqua-free/:path*',    destination: '/', permanent: true },

      // ── Dybe stier: fjern sprogpræfiks, bevar resten af stien (mindst ét segment) ──
      // /en/eca-vand → /eca-vand, /de/omraader/hospitaler → /omraader/hospitaler
      { source: '/en/:path+', destination: '/:path+', permanent: true },
      { source: '/de/:path+', destination: '/:path+', permanent: true },

      // ── Bare sprogrødder → forsiden (statisk mål, så der ikke opstår redirect-loop) ──
      // /en, /en/, /de, /de/  →  /
      { source: '/en/:path*', destination: '/', permanent: true },
      { source: '/de/:path*', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
