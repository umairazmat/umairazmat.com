'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Filter } from 'lucide-react'
import { projects } from '@/constants'
import { Project as ProjectType } from '@/constants'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

export default function Projects() {
  const { t } = useTranslation()
  const allLabel = t('projects.all')
  const [selectedCategory, setSelectedCategory] = useState<string>(allLabel)

  const categories = [allLabel, ...new Set(projects.map((p) => p.category))]

  const filteredProjects =
    selectedCategory === allLabel
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  const projectsText = `${t('projects.description')}. ${filteredProjects.length} ${t('projects.projects', 'projects')} available.`

  return (
    <section id="projects" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            {t('projects.title')} <span className="gradient-text">{t('projects.projects')}</span>
          </h2>
          <TextToSpeech text={projectsText} sectionId="projects" />
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
          {t('projects.description')}
        </p>

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls="projects-grid"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center gap-1.5 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                selectedCategory === category
                  ? 'bg-primary-700 text-white dark:bg-primary-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Filter size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - Responsive */}
        <div id="projects-grid" role="tabpanel" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card dark:bg-gray-800 group hover:scale-[1.02] sm:hover:scale-105 transition-transform p-4 sm:p-6"
            >
              {/* Project Image Placeholder */}
              <div className="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2">{project.title}</h3>
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-[10px] sm:text-xs font-medium flex-shrink-0">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2">{project.description}</p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[10px] sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[10px] sm:text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-base sm:text-lg font-bold gradient-text">
                          {metric.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs sm:text-sm"
                    >
                      <Github size={16} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-xs sm:text-sm"
                    >
                      <ExternalLink size={16} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

