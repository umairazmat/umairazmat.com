import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    // Keep robots simple: allow crawling, block sensitive admin/private paths,
    // and expose the sitemap (use the canonical www URL).
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/private/'],
      },
    ],
    sitemap: 'https://www.umairazmat.com/sitemap.xml',
  }
}
