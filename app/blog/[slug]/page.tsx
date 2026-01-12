import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import BlogComments from '@/components/BlogComments'
import BlogShareButtons from '@/components/BlogShareButtons'
import BlogBackground from '@/components/BlogBackground'
import BlogAdSpace from '@/components/BlogAdSpace'

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
    <article className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Animation */}
      <BlogBackground />
      
      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Ad Space - Hidden on mobile, visible on large screens */}
            <aside className="hidden lg:block lg:col-span-2">
              <BlogAdSpace variant="vertical" />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 mb-8 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Blog
              </Link>

              {/* Top Ad Space */}
              <BlogAdSpace variant="horizontal" className="mb-8" />

              <header className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                            className="px-2 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </header>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded max-w-none">
                  <MDXRemote source={post.content} />
                </div>
              </div>

              {/* Middle Ad Space */}
              <BlogAdSpace variant="horizontal" className="mb-6" />

              {/* Share Buttons */}
              <div className="mb-6">
                <BlogShareButtons title={post.title} url={postUrl} excerpt={post.excerpt} />
              </div>

              {/* Comments Section */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-6">
                <BlogComments postSlug={params.slug} />
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Related Posts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
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

              {/* Bottom Ad Space */}
              <BlogAdSpace variant="horizontal" />
            </div>

            {/* Right Ad Space - Hidden on mobile, visible on large screens */}
            <aside className="hidden lg:block lg:col-span-2">
              <BlogAdSpace variant="vertical" />
            </aside>
          </div>
        </div>
      </div>
    </article>
  )
}

