import { Metadata } from 'next'
import Experience from '@/components/sections/Experience'
import Volunteer from '@/components/sections/Volunteer'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Professional Experience | Umair Azmat',
  description: 'Complete professional experience including software engineering roles at Venturetronics and Powersoft19, training experience at S.M.I.T, and volunteer work.',
  keywords: [
    'software engineer experience',
    'professional experience',
    'work experience',
    'career history',
    'volunteer experience',
  ],
  openGraph: {
    title: 'Professional Experience | Umair Azmat',
    description: 'Complete professional experience including software engineering roles and volunteer work.',
    type: 'website',
    url: 'https://umairazmat.com/experience',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Experience | Umair Azmat',
    description: 'Complete professional experience including software engineering roles.',
  },
  alternates: {
    canonical: 'https://umairazmat.com/experience',
  },
}

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Professional <span className="text-sky-500 dark:text-sky-400">Experience</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Building production systems and delivering real-world solutions
            </p>
          </div>
          <div className="space-y-12 sm:space-y-16">
            <Experience hideHeading={true} />
            <div>
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                  Volunteer <span className="text-sky-500 dark:text-sky-400">Experience</span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Contributing to communities and organizations through volunteer work
                </p>
              </div>
              <Volunteer hideHeading={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
