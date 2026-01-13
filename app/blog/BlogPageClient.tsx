'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { format } from 'date-fns'
import { Calendar, Tag, Search } from 'lucide-react'
import BlogPagination from '@/components/BlogPagination'
import BlogSearch from '@/components/BlogSearch'

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

export default function BlogPageClient({ initialPosts }: { initialPosts?: any[] }) {
  const supabase = createBrowserSupabaseClient()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const postsPerPage = 9

  useEffect(() => {
    loadBlogs()
    loadCategories()
  }, [selectedCategory, currentPage])

  const loadCategories = async () => {
    try {
      const { data } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name')

      if (data) {
        setCategories(data)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadBlogs = async () => {
    try {
      setIsLoading(true)
      let query = supabase
        .from('blogs')
        .select(`
          *,
          categories (name, slug),
          blog_tags (tags (name, slug))
        `)
        .order('created_at', { ascending: false })

      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error loading blogs:', error)
      } else {
        setBlogs(data || [])
      }
    } catch (error) {
      console.error('Error loading blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query)
      )
    }
    return true
  })

  const featuredBlogs = filteredBlogs.filter((b) => b.featured)
  const regularBlogs = filteredBlogs.filter((b) => !b.featured)

  const paginatedBlogs = [...featuredBlogs, ...regularBlogs].slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage)

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & <span className="text-sky-500 dark:text-sky-400">Articles</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Articles, tutorials, and thoughts on web development, AI/ML, and technology
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <BlogSearch onSearch={setSearchQuery} />
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filter by:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading blogs...</p>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                {blog.cover_image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {blog.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded">
                        Featured
                      </span>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
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
                  {blog.blog_tags && blog.blog_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {blog.blog_tags.slice(0, 3).map((bt, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          <Tag size={12} className="inline mr-1" />
                          {bt.tags.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}
