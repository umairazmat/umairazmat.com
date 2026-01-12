import { Metadata } from 'next'
import Education from '@/components/sections/Education'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Education & Background | Umair Azmat',
  description: 'Academic achievements and educational foundation that shaped my software engineering career. Bachelor of Software Engineering from GCU Faisalabad with CGPA 3.78/4.00.',
  keywords: [
    'education',
    'academic background',
    'software engineering degree',
    'GCU Faisalabad',
    'bachelor degree',
  ],
  openGraph: {
    title: 'Education & Background | Umair Azmat',
    description: 'Academic achievements and educational foundation that shaped my software engineering career.',
    type: 'website',
    url: 'https://umairazmat.com/education',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education & Background | Umair Azmat',
    description: 'Academic achievements and educational foundation.',
  },
  alternates: {
    canonical: 'https://umairazmat.com/education',
  },
}

export default function EducationPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Education <span className="text-sky-500 dark:text-sky-400">& Background</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Academic achievements and educational foundation that shaped my software engineering career.
            </p>
          </div>
          <Education hideHeading={true} />
        </div>
      </div>
    </div>
  )
}
