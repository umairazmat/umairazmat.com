'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowRight, Star } from 'lucide-react'
import BlogBackground from '@/components/BlogBackground'
import BlogPagination from '@/components/BlogPagination'
import BlogAdSpace from '@/components/BlogAdSpace'
import BlogSearch from '@/components/BlogSearch'
import { BlogPost } from '@/lib/blog'

const POSTS_PER_PAGE = 9

interface BlogPageClientProps {
  initialPosts: BlogPost[]
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const allPosts = initialPosts
  
  // Featured posts (first 3 posts or posts marked as featured)
  const featuredPosts = allPosts.slice(0, 3)
  
  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return allPosts
    
    const query = searchQuery.toLowerCase()
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }, [allPosts, searchQuery])
  
  // Paginate filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = filteredPosts.slice(startIndex, endIndex)
  
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page on new search
  }
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Animation */}
      <BlogBackground />
      
      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Vertical Ad - Hidden on mobile, visible on large screens */}
            <aside className="hidden lg:block lg:col-span-2">
              <div className="sticky top-20">
                <BlogAdSpace variant="vertical" />
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Header */}
              <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  Blog & <span className="text-sky-500 dark:text-sky-400">Articles</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Thoughts, tutorials, and insights on web development, AI/ML, and technology.
                </p>
                
                {/* Search Bar */}
                <BlogSearch onSearch={handleSearch} />
              </div>

              {/* Top Horizontal Ad */}
              <BlogAdSpace variant="horizontal" className="mb-8" />

              {/* Featured Blogs Section */}
              {!searchQuery && featuredPosts.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="text-sky-500 dark:text-sky-400" size={24} fill="currentColor" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      Featured Articles
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="text-sky-500 dark:text-sky-400" size={16} fill="currentColor" />
                          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">Featured</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="inline" size={12} />
                            <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                          </div>
                          {post.tags.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Tag className="inline" size={12} />
                              <span className="text-xs">{post.tags[0]}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-semibold text-sm transition-colors mt-auto">
                          Read more <ArrowRight size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* All Articles Section */}
              <section>
                {!searchQuery && (
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    All Articles
                  </h2>
                )}
                
                {searchQuery && (
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      {filteredPosts.length > 0 ? (
                        <>Found <span className="font-semibold text-sky-500 dark:text-sky-400">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;</>
                      ) : (
                        <>No articles found for &quot;{searchQuery}&quot;</>
                      )}
                    </p>
                  </div>
                )}

                {allPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No blog posts yet. Check back soon!</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Blog posts will appear here once they&apos;re published.
                    </p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No articles found matching your search.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Try a different search term or browse all articles.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Blog Grid - 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {posts.map((post) => (
                        <article
                          key={post.slug}
                          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col"
                        >
                          <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-sky-500 dark:hover:text-sky-400 transition-colors line-clamp-2">
                              {post.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="inline" size={14} />
                                <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                              </div>
                              {post.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Tag className="inline" size={14} />
                                  <span className="text-xs">{post.tags[0]}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                              {post.excerpt}
                            </p>
                            <div className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-semibold text-sm transition-colors mt-auto">
                              Read more <ArrowRight size={16} />
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>

                    {/* Middle Horizontal Ad */}
                    {posts.length > 0 && (
                      <BlogAdSpace variant="horizontal" className="my-8" />
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <BlogPagination 
                        currentPage={currentPage} 
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}

                    {/* Bottom Horizontal Ad */}
                    {posts.length > 0 && (
                      <BlogAdSpace variant="horizontal" className="mt-8" />
                    )}
                  </>
                )}
              </section>
            </div>

            {/* Right Vertical Ad - Hidden on mobile, visible on large screens */}
            <aside className="hidden lg:block lg:col-span-2">
              <div className="sticky top-20">
                <BlogAdSpace variant="vertical" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
