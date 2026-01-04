import { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, tutorials, and thoughts on web development, AI/ML, and technology.',
}

export default async function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen pt-16">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Blog & <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Thoughts, tutorials, and insights on web development, AI/ML, and technology.
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No blog posts yet. Check back soon!</p>
              <p className="text-sm text-gray-500">
                Blog posts will appear here once they're published.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="card hover:shadow-xl transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="inline" size={16} />
                      <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Tag className="inline" size={16} />
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Read more <ArrowRight size={18} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

