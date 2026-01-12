'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
  onPageChange?: (page: number) => void
}

export default function BlogPagination({ currentPage, totalPages, basePath = '/blog', onPageChange }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    if (onPageChange) {
      e.preventDefault()
      onPageChange(page)
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8 sm:mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          onClick={(e) => handlePageClick(currentPage - 1, e)}
          className="flex items-center gap-1 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 dark:hover:border-sky-700 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Previous</span>
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <Link
                key={page}
                href={getPageUrl(page)}
                onClick={(e) => handlePageClick(page, e)}
                className={`px-3 py-2 min-w-[40px] text-center rounded-lg transition-all duration-300 ${
                  page === currentPage
                    ? 'bg-sky-500 text-white font-semibold shadow-lg'
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 dark:hover:border-sky-700 hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                {page}
              </Link>
            )
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-2 text-gray-400 dark:text-gray-600">
                ...
              </span>
            )
          }
          return null
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          onClick={(e) => handlePageClick(currentPage + 1, e)}
          className="flex items-center gap-1 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-300 dark:hover:border-sky-700 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={18} />
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={18} />
        </div>
      )}
    </div>
  )
}
