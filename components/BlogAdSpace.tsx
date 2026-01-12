'use client'

interface BlogAdSpaceProps {
  variant?: 'horizontal' | 'vertical'
  className?: string
}

export default function BlogAdSpace({ variant = 'horizontal', className = '' }: BlogAdSpaceProps) {
  if (variant === 'vertical') {
    return (
      <div className={`bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 backdrop-blur-sm rounded-xl p-6 border border-sky-200 dark:border-sky-800 ${className}`}>
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
          <div className="text-sky-500 dark:text-sky-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Advertisement</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">300 x 600</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 backdrop-blur-sm rounded-xl p-8 border border-sky-200 dark:border-sky-800 ${className}`}>
      <div className="flex flex-col items-center justify-center min-h-[120px] text-center">
        <div className="text-sky-500 dark:text-sky-400 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Advertisement</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">728 x 90</p>
      </div>
    </div>
  )
}
