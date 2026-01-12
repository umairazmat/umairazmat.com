import { Metadata } from 'next'
import Certificates from '@/components/sections/Certificates'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Certifications & Licenses | Umair Azmat',
  description: 'Professional certifications including AWS re/Start Graduate, Stanford Code in Place Mentor, IBM Full Stack Developer, Meta Front-End Developer, and various hackathon certificates.',
  keywords: [
    'AWS certification',
    'professional certifications',
    'IBM full stack developer',
    'Meta front-end developer',
    'Stanford mentor',
    'hackathon certificates',
  ],
  openGraph: {
    title: 'Certifications & Licenses | Umair Azmat',
    description: 'Professional certifications including AWS, IBM, Meta, and Stanford certifications.',
    type: 'website',
    url: 'https://umairazmat.com/certifications',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications & Licenses | Umair Azmat',
    description: 'Professional certifications and achievements.',
  },
  alternates: {
    canonical: 'https://umairazmat.com/certifications',
  },
}

export default function CertificationsPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Certifications <span className="text-sky-500 dark:text-sky-400">& Licenses</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional certifications and achievements that demonstrate expertise and commitment to continuous learning.
            </p>
          </div>
          <Certificates hideHeading={true} />
        </div>
      </div>
    </div>
  )
}
