'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, TrendingUp } from 'lucide-react'
import { experiences } from '@/constants'
import { Experience as ExperienceType } from '@/constants'
import { useTranslation } from 'react-i18next'

export default function Experience() {
  const { t } = useTranslation()
  const [selectedFilter, setSelectedFilter] = useState<string>(t('experience.all'))
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)

  const allLabel = t('experience.all')
  const filters = [allLabel, ...new Set(experiences.map((exp) => exp.company))]

  const filteredExperiences =
    selectedFilter === allLabel
      ? experiences
      : experiences.filter((exp) => exp.company === selectedFilter)

  const formatDate = (date: string) => {
    if (date === 'Present') return 'Present'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <section id="experience" className="section-container bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-center">
          {t('experience.title')} <span className="gradient-text">{t('experience.experience')}</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {t('experience.description')}
        </p>

        {/* Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter experiences by company"
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              role="tab"
              aria-selected={selectedFilter === filter}
              aria-controls="experience-timeline"
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                selectedFilter === filter
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Experience Grid - 2 columns */}
        <div id="experience-timeline" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`card cursor-pointer transition-all h-full flex flex-col ${
                selectedExperience === experience.id
                  ? 'ring-2 ring-primary-600 shadow-xl'
                  : 'hover:shadow-lg'
              }`}
              onClick={() =>
                setSelectedExperience(
                  selectedExperience === experience.id ? null : experience.id
                )
              }
            >
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex-1">
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {experience.role}
                        </h3>
                        <p className="text-lg text-primary-600 font-semibold">
                          {experience.company}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium ml-2 flex-shrink-0">
                        {experience.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {experience.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4 flex-1">
                    {experience.description.slice(0, 3).map((desc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{desc}</span>
                      </li>
                    ))}
                    {experience.description.length > 3 && (
                      <li className="text-xs text-primary-600 font-medium mt-1">
                        +{experience.description.length - 3} {t('experience.moreResponsibilities')}
                      </li>
                    )}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Details */}
                  {selectedExperience === experience.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4"
                    >
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <TrendingUp size={18} />
                            {t('experience.keyAchievements')}
                          </h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {experience.metrics && experience.metrics.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Briefcase size={18} />
                            {t('experience.metrics')}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {experience.metrics.map((metric, idx) => (
                              <div
                                key={idx}
                                className="bg-primary-50 p-4 rounded-lg text-center"
                              >
                                <div className="text-2xl font-bold gradient-text">
                                  {metric.value}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
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

