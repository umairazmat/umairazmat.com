import { Metadata } from 'next'
import Learning from '@/components/sections/Learning'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Learning & Development | Umair Azmat',
  description: 'Current learning progress including AWS Cloud Certification preparation, learning milestones, and skills being developed.',
  keywords: [
    'continuous learning',
    'professional development',
    'AWS certification',
    'skill development',
    'learning progress',
  ],
  openGraph: {
    title: 'Learning & Development | Umair Azmat',
    description: 'Current learning progress including AWS Cloud Certification preparation and learning milestones.',
    type: 'website',
    url: 'https://umairazmat.com/learning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning & Development | Umair Azmat',
    description: 'Current learning progress and professional development.',
  },
  alternates: {
    canonical: 'https://umairazmat.com/learning',
  },
}

export default function LearningPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Learning <span className="text-sky-500 dark:text-sky-400">& Progress</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Continuous learning and professional development to stay at the forefront of technology.
            </p>
          </div>
          <Learning hideHeading={true} />
        </div>
      </div>
    </div>
  )
}
