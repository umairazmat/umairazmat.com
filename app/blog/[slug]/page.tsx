import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import BlogComments from '@/components/BlogComments'
import BlogShareButtons from '@/components/BlogShareButtons'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

// Calculate reading time based on content
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Get related posts based on tags
function getRelatedPosts(currentSlug: string, allPosts: ReturnType<typeof getAllBlogPosts>, limit = 3) {
  const currentPost = allPosts.find((p) => p.slug === currentSlug)
  if (!currentPost) return []

  const related = allPosts
    .filter((post) => {
      if (post.slug === currentSlug) return false
      // Find posts with matching tags
      return post.tags.some((tag) => currentPost.tags.includes(tag))
    })
    .slice(0, limit)

  // If not enough related posts, fill with recent posts
  if (related.length < limit) {
    const recent = allPosts
      .filter((post) => post.slug !== currentSlug && !related.includes(post))
      .slice(0, limit - related.length)
    return [...related, ...recent]
  }

  return related
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)
  const allPosts = getAllBlogPosts()

  if (!post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.content)
  const relatedPosts = getRelatedPosts(params.slug, allPosts)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://umairazmat.com'
  const postUrl = `${siteUrl}/blog/${params.slug}`

  return (
    <article className="min-h-screen pt-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="inline" size={16} />
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="inline" size={16} />
                <span>{readingTime} min read</span>
              </div>
              <span>By {post.author}</span>
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="inline" size={16} />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded max-w-none mb-8">
            <MDXRemote source={post.content} />
          </div>

          {/* Share Buttons */}
          <BlogShareButtons title={post.title} url={postUrl} excerpt={post.excerpt} />

          {/* Comments Section */}
          <BlogComments postSlug={params.slug} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="card p-4 hover:scale-[1.02] transition-transform"
                  >
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <Calendar size={12} />
                      <span>{format(new Date(relatedPost.date), 'MMM d, yyyy')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}

