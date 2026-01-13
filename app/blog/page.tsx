import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog & Articles | Web Development, AI/ML, Technology',
  description: 'Articles, tutorials, and thoughts on web development, AI/ML, and technology. Learn about React, Next.js, Node.js, Python, AWS, and modern software engineering practices.',
  keywords: [
    'web development blog',
    'React tutorials',
    'Next.js articles',
    'Node.js guides',
    'Python programming',
    'AI/ML articles',
    'software engineering blog',
    'full stack development',
    'AWS cloud',
    'TypeScript tutorials',
  ],
  openGraph: {
    title: 'Blog & Articles | Umair Azmat',
    description: 'Articles, tutorials, and thoughts on web development, AI/ML, and technology.',
    type: 'website',
    url: 'https://umairazmat.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Articles | Umair Azmat',
    description: 'Articles, tutorials, and thoughts on web development, AI/ML, and technology.',
  },
  alternates: {
    canonical: 'https://umairazmat.com/blog',
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
