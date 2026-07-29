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
