import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blog'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, tutorials, and thoughts on web development, AI/ML, and technology.',
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts()
  return <BlogPageClient initialPosts={allPosts} />
}
