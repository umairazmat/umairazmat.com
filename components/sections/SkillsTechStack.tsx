'use client'

import { motion } from 'framer-motion'
import { Code, Server, Cloud, Brain, ExternalLink } from 'lucide-react'
import BlogBackground from '@/components/BlogBackground'

interface SkillsTechStackProps {
  hideHeading?: boolean
}

export default function SkillsTechStack({ hideHeading = false }: SkillsTechStackProps) {
  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Angular', 'Vite', 'Electron.js'],
      description: 'Built modular React + Next.js apps with scalable state management and real-time dashboards.',
    },
    {
      icon: Server,
      title: 'Backend',
      skills: ['Node.js', 'FastAPI', 'REST APIs', 'WebSockets', 'MongoDB', 'PostgreSQL'],
      description: 'Designed Node.js & FastAPI microservices powering high-traffic systems with WebSockets and REST APIs.',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: ['AWS', 'GCP', 'Docker', 'Vercel', 'CI/CD pipelines', 'Serverless deployments'],
      description: 'Deployed production apps on AWS & GCP using CI/CD pipelines and Docker containers for fast, reliable updates.',
    },
    {
      icon: Brain,
      title: 'AI / Tools',
      skills: ['OpenAI APIs', 'LLMs', 'Streamlit', 'Transformers', 'Python AI libraries'],
      description: 'Implemented AI-powered essay evaluation, code review automation, and data pipelines using LLMs and Streamlit.',
    },
  ]

  return (
    <section id="skills" className="relative flex items-center justify-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <BlogBackground />
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {!hideHeading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Full-Stack & AI Expertise
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Production-grade tools and frameworks I use to ship scalable systems.
            </p>
          </motion.div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-lg border-2 border-sky-200/50 dark:border-sky-700/50 p-4 sm:p-5 hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 bg-sky-100 dark:bg-sky-900/20 rounded-lg">
                    <Icon className="text-sky-500 dark:text-sky-400" size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300 rounded-md border border-sky-200/30 dark:border-sky-700/30 hover:border-sky-400 dark:hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 font-medium transition-colors"
          >
            See how I&apos;ve applied these technologies in real projects
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
