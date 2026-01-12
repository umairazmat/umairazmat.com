import { Metadata } from 'next'
import Experiences from '@/components/sections/Experiences'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Professional Experiences | Umair Azmat',
  description: 'Detailed professional experience including software engineering roles at Venturetronics and Powersoft19, with highlights of production systems delivered, technologies used, and impact achieved.',
}

export default function ExperiencesPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Professional <span className="text-sky-500 dark:text-sky-400">Experiences</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Building production systems and delivering real-world solutions across enterprise platforms and scalable applications.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <Experiences hideHeading={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
