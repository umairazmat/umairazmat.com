'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Briefcase, MapPin, Calendar, Building2 } from 'lucide-react'
import BlogBackground from '@/components/BlogBackground'

const experiences = [
  {
    id: 'venturetronics',
    company: 'Venturetronics',
    role: 'Software Engineer',
    location: 'Lahore, Punjab, Pakistan',
    startDate: 'Sep 2024',
    endDate: 'Present',
    type: 'Full-time • Hybrid',
    highlights: [
      'Delivered EV charging diagnostic systems with real-time data processing',
      'Built enterprise frontend modules using Angular, TypeScript, and FastAPI',
      'Integrated WebSockets and REST APIs for real-time features',
      'Worked within Agile teams delivering scalable, high-performance systems',
    ],
    technologies: ['Angular', 'TypeScript', 'FastAPI', 'WebSockets', 'MERN Stack', 'Electron.js'],
  },
  {
    id: 'powersoft19',
    company: 'Powersoft19',
    role: 'Software Developer',
    location: 'Lahore, Punjab, Pakistan',
    startDate: 'Sep 2023',
    endDate: 'Aug 2025',
    type: 'Full-time • On-site',
    highlights: [
      'Built production e-commerce platforms and 3D e-commerce websites',
      'Developed charging station management systems with robust backend APIs',
      'Created internal tools that optimized workflows and improved productivity',
      'Participated in Agile/Scrum ceremonies delivering reliable software',
    ],
    technologies: ['React.js', 'Next.js', 'Angular', 'Node.js', 'C#', '.NET', 'PHP', 'REST APIs'],
  },
]

interface ExperiencesProps {
  hideHeading?: boolean
}

export default function Experiences({ hideHeading = false }: ExperiencesProps) {
  const { t } = useTranslation()
  const formatDate = (date: string) => {
    if (date === 'Present') return t('common.present', 'Present')
    return date
  }

  return (
    <section id="experiences" className="relative flex items-center justify-center py-8 sm:py-10 overflow-hidden w-full">
      <BlogBackground />
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t('experiences.title')} <span className="text-sky-500 dark:text-sky-400">{t('experiences.experience')}</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('experiences.description')}
            </p>
          </motion.div>
        )}

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="rounded-xl p-5 sm:p-6 border-2 border-sky-200/50 dark:border-sky-700/50 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-lg transition-all duration-300"
            >
              {/* Company Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                  <Building2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm sm:text-base mb-2">
                    {exp.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span className="truncate">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {exp.startDate} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {exp.type}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 mb-4">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-sky-500 dark:text-sky-400 mt-1.5 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                {exp.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium border border-sky-200/30 dark:border-sky-700/30"
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 6 && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium">
                    +{exp.technologies.length - 6}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
