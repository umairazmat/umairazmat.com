'use client'

import { motion } from 'framer-motion'
import { Code, Database, Cloud, Sparkles } from 'lucide-react'

export default function SkillsCondensed() {
  const skillGroups = [
    {
      icon: Code,
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      icon: Database,
      title: 'Backend',
      skills: ['Node.js', 'FastAPI', 'REST APIs', 'WebSockets'],
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Vercel', 'CI/CD', 'Docker'],
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      icon: Sparkles,
      title: 'AI & Tools',
      skills: ['OpenAI APIs', 'LLMs', 'Git', 'Agile'],
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ]

  return (
    <section id="skills" className="section-container bg-white dark:bg-gray-900 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Core <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Technologies I use to build production-grade applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillGroups.map((group, index) => {
            const Icon = group.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card p-6 text-center hover:scale-105 transition-transform"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full ${group.bgColor} mb-4 mx-auto`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${group.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                  {group.title}
                </h3>
                <div className="space-y-2">
                  {group.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
