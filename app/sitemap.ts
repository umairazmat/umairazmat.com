import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.umairazmat.com'
  const now = new Date()

  // Get all blog posts and exclude any placeholder/example posts
  const blogPosts = getAllBlogPosts()
  const blogUrls = blogPosts
    .filter((post) => post.slug !== 'example-post')
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    }))

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: now,
    },

    // Main Pages (only real indexable pages; no hash URLs)
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/learning`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/appointments`,
      lastModified: now,
    },

    // Blog Posts
    ...blogUrls,
  ]
}
