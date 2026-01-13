'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowRight, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  featured: boolean
  cover_image?: string
  created_at: string
  categories?: { name: string; slug: string }
  blog_tags?: { tags: { name: string; slug: string } }[]
}

export default function FeaturedBlogs() {
  const { t } = useTranslation()
  const supabase = createBrowserSupabaseClient()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFeaturedBlogs()
  }, [])

  const loadFeaturedBlogs = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          categories (name, slug),
          blog_tags (tags (name, slug))
        `)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) {
        console.error('Error loading featured blogs:', error)
      } else {
        setBlogs(data || [])
      }
    } catch (error) {
      console.error('Error loading featured blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return null // Don't show anything while loading
  }

  if (blogs.length === 0) {
    return null // Don't show section if no featured blogs
  }

  return (
    <section className="relative flex items-center justify-center py-8 sm:py-10 overflow-hidden w-full">
      {/* Same Background as Other Sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 overflow-hidden">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Floating 3D Shapes - Constrained to prevent overflow */}
        <motion.div
          className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-sky-500/10 dark:from-sky-500/20 to-cyan-500/10 dark:to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 to-sky-600/10 dark:to-sky-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest <span className="text-sky-500 dark:text-sky-400">Blog Posts</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Read my latest articles on web development, AI/ML, and technology
            </p>
          </motion.div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-gray-200 dark:border-gray-700"
                >
                  {blog.cover_image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{format(new Date(blog.created_at), 'MMM d, yyyy')}</span>
                      </div>
                      {blog.categories && (
                        <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded text-xs">
                          {blog.categories.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sky-600 dark:text-sky-400 font-medium group-hover:gap-2 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
            >
              View All Blog Posts
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
      </div>
    </section>
  )
}
