import { Metadata } from 'next'
import SkillsTechStack from '@/components/sections/SkillsTechStack'
import Skills from '@/components/sections/Skills'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Technical Skills & Expertise | Umair Azmat',
  description: 'Comprehensive technical skills including Frontend (React, Next.js, TypeScript), Backend (Node.js, FastAPI), Cloud (AWS, GCP), and AI/ML technologies. Production-grade tools and frameworks used to ship scalable systems.',
}

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Full-Stack <span className="text-sky-500 dark:text-sky-400">& AI Expertise</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Production-grade tools and frameworks I use to ship scalable systems.
            </p>
          </div>
          <div className="mb-8 sm:mb-12">
            <SkillsTechStack hideHeading={true} />
          </div>
          <Skills hideHeading={true} />
        </div>
      </div>
    </div>
  )
}
