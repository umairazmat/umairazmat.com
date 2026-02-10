/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        // Redirect non-www to www to enforce a single canonical host
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'umairazmat.com',
          },
        ],
        destination: 'https://www.umairazmat.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

