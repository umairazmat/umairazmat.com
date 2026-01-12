import { Metadata } from 'next'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Selected Work & Projects | Umair Azmat',
  description: 'Real-world systems built for scale, reliability, and real users — across enterprise platforms and AI-powered products. See production-grade applications including EV infrastructure, enterprise SaaS, and AI-powered tools.',
}

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Selected <span className="text-sky-500 dark:text-sky-400">Work</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real-world systems built for scale, reliability, and real users — across enterprise platforms and AI-powered products.
            </p>
          </div>
          <FeaturedProjects />
        </div>
      </div>
    </div>
  )
}
