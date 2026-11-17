/** @type {import('next').NextConfig} */
/** Nav hrefs that were copied into /features/* and competed with the real URL. */
const featureAliasRedirects = [
  ['buddy-personal-assistant', '/buddy-personal-assistant'],
  ['characters', '/characters'],
  ['primitives', '/primitives'],
  ['loops', '/loops'],
  ['self-host', '/self-host'],
  ['benchmarks', '/benchmarks'],
  ['plugin', '/plugin'],
  ['integration', '/integration'],
  ['channels', '/channels'],
].map(([slug, destination]) => ({
  source: `/features/${slug}`,
  destination,
  permanent: true,
}));

const nextConfig = {
  transpilePackages: ['@trooper/demo', '@bible-strong/avatar-core', '@bible-strong/avatar-react'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
  experimental: {
    serverActions: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    outputFileTracingIncludes: {
      '/og/img/[...segments]/route': ['./public/og-fonts/**/*'],
      '/og/route': ['./public/og-fonts/**/*'],
    },
  },
  async redirects() {
    return [
      {
        source: '/integrations',
        destination: '/plugin',
        permanent: true,
      },
      {
        source: '/teams/legal',
        destination: '/teams/lawyers',
        permanent: true,
      },
      {
        source: '/character-builder',
        destination: '/characters',
        permanent: false,
      },
      {
        source: '/buddy',
        destination: '/buddy-personal-assistant',
        permanent: true,
      },
      ...featureAliasRedirects,
    ];
  },
  async rewrites() {
    return [
      {
        source: '/character-studio',
        destination: '/character-studio/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // The marketing workspace is intentionally embedded by the homepage.
        // Keep the global DENY policy elsewhere, but allow this same-origin app.
        source: '/trooper-app-preview/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
      {
        source: '/trooper-app-preview/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/trooper-app-preview/index.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/og/prebuilt/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
