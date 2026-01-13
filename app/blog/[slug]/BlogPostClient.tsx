'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import BlogComments from '@/components/BlogComments'
import BlogShareButtons from '@/components/BlogShareButtons'
import BlogAdSpace from '@/components/BlogAdSpace'
import BlogBackground from '@/components/BlogBackground'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured: boolean
  cover_image?: string
  created_at: string
  updated_at: string
  categories?: { name: string; slug: string }
  blog_tags?: { tags: { name: string; slug: string } }[]
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const supabase = createBrowserSupabaseClient()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPost()
  }, [slug])

  const loadPost = async () => {
    try {
      setIsLoading(true)
      
      // Load the post
      const { data: postData, error: postError } = await supabase
        .from('blogs')
        .select(`
          *,
          categories (name, slug),
          blog_tags (tags (name, slug))
        `)
        .eq('slug', slug)
        .single()

      if (postError) {
        console.error('Error loading post:', postError)
        console.error('Error details:', {
          message: postError.message,
          code: postError.code,
          details: postError.details,
          hint: postError.hint,
        })
        setIsLoading(false)
        return
      }

      if (!postData) {
        console.error('Post not found for slug:', slug)
        setIsLoading(false)
        return
      }

      setPost(postData)

      // Load related posts (same category or recent)
      const { data: relatedData, error: relatedError } = await supabase
        .from('blogs')
        .select(`
          *,
          categories (name, slug),
          blog_tags (tags (name, slug))
        `)
        .neq('id', postData.id)
        .order('created_at', { ascending: false })
        .limit(3)

      if (relatedError) {
        console.error('Error loading related posts:', relatedError)
      } else if (relatedData) {
        setRelatedPosts(relatedData)
      }
    } catch (error) {
      console.error('Error loading blog post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <Link
            href="/blog"
            className="text-sky-600 hover:text-sky-700 dark:text-sky-400"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const readingTime = calculateReadingTime(post.content)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://umairazmat.com'

  return (
    <article className="min-h-screen pt-16 relative overflow-hidden">
      <BlogBackground />
      
      <div className="relative z-10 section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <aside className="hidden lg:block lg:col-span-2">
              <BlogAdSpace variant="vertical" />
            </aside>

            <div className="lg:col-span-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 mb-8 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Blog
              </Link>

              <BlogAdSpace variant="horizontal" className="mb-8" />

              <header className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="inline" size={16} />
                    <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="inline" size={16} />
                    <span>{readingTime} min read</span>
                  </div>
                  {post.categories && (
                    <div className="flex items-center gap-2">
                      <Tag className="inline" size={16} />
                      <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded text-xs">
                        {post.categories.name}
                      </span>
                    </div>
                  )}
                  {post.blog_tags && post.blog_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.blog_tags.map((bt, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          {bt.tags.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              {post.cover_image && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                  prose-p:mb-6 prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
                  prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-a:underline hover:prose-a:text-sky-700 dark:hover:prose-a:text-sky-300
                  prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
                  prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                  prose-ul:mb-6 prose-ul:space-y-2 prose-ol:mb-6 prose-ol:space-y-2
                  prose-li:my-2 prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
                  prose-img:rounded-lg prose-img:my-6 prose-img:shadow-lg
                  prose-hr:my-8 prose-hr:border-gray-300 dark:prose-hr:border-gray-600
                  prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                  prose-em:italic">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
                      h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>,
                      ul: ({ children }) => <ul className="mb-6 space-y-2 list-disc list-inside">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-6 space-y-2 list-decimal list-inside">{children}</ol>,
                      li: ({ children }) => <li className="my-2 leading-relaxed">{children}</li>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-sky-500 pl-4 italic my-6 text-gray-700 dark:text-gray-300">{children}</blockquote>,
                      code: ({ children }) => <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">{children}</code>,
                      pre: ({ children }) => <pre className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto my-6">{children}</pre>,
                      hr: () => <hr className="my-8 border-gray-300 dark:border-gray-600" />,
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>

              <BlogAdSpace variant="horizontal" className="mb-6" />

              <div className="mb-6">
                <BlogShareButtons
                  title={post.title}
                  url={`${siteUrl}/blog/${post.slug}`}
                  excerpt={post.excerpt}
                />
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-6">
                <BlogComments postSlug={post.slug} />
              </div>

              {relatedPosts.length > 0 && (
                <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Related Posts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
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
                          <span>{format(new Date(relatedPost.created_at), 'MMM d, yyyy')}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <BlogAdSpace variant="horizontal" />
            </div>

            <aside className="hidden lg:block lg:col-span-2">
              <BlogAdSpace variant="vertical" />
            </aside>
          </div>
        </div>
      </div>
    </article>
  )
}
