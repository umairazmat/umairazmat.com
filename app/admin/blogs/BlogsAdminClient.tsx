'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  featured: boolean
  created_at: string
  updated_at: string
  categories?: { name: string }
}

export default function BlogsAdminClient() {
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterFeatured, setFilterFeatured] = useState<string>('all')

  useEffect(() => {
    loadBlogs()
  }, [filterFeatured])

  const loadBlogs = async () => {
    try {
      setIsLoading(true)
      let query = supabase
        .from('blogs')
        .select(`
          *,
          categories (name)
        `)
        .order('created_at', { ascending: false })

      if (filterFeatured !== 'all') {
        query = query.eq('featured', filterFeatured === 'featured')
      }

      const { data, error } = await query

      if (error) {
        toast.error('Failed to load blogs')
        console.error(error)
      } else {
        setBlogs(data || [])
      }
    } catch (error) {
      toast.error('Error loading blogs')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id)

      if (error) {
        toast.error('Failed to delete blog')
      } else {
        toast.success('Blog deleted successfully')
        loadBlogs()
      }
    } catch (error) {
      toast.error('Error deleting blog')
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Manage Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/blogs/new')}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Blog Post
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Blogs</option>
                <option value="featured">Featured Only</option>
                <option value="not-featured">Not Featured</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-600 dark:text-gray-400">
            Loading blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No blogs found. Create your first blog post!
            </p>
            <button
              onClick={() => router.push('/admin/blogs/new')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
            >
              Create Blog Post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {blog.title}
                      </h3>
                      {blog.featured && (
                        <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {blog.excerpt || 'No excerpt'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span>Slug: {blog.slug}</span>
                      <span>
                        Created: {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                      {blog.categories && (
                        <span>Category: {blog.categories.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <a
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors inline-block"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
