'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { volunteerExperiences } from '@/constants'
import { Heart, Calendar, MapPin, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Pagination from '@/components/Pagination'
import TextToSpeech from '@/components/TextToSpeech'

const ITEMS_PER_PAGE = 4 // 2 rows x 2 columns

export default function Volunteer() {
  const { t } = useTranslation()
  const allLabel = t('volunteer.all', 'All')
  const [selectedType, setSelectedType] = useState<string>(allLabel)
  const [currentPage, setCurrentPage] = useState(1)

  const types = [allLabel, ...new Set(volunteerExperiences.map((v) => v.type))]

  const filteredExperiences = useMemo(() => {
    return selectedType === allLabel
      ? volunteerExperiences
      : volunteerExperiences.filter((v) => v.type === selectedType)
  }, [selectedType, allLabel])

  const totalPages = Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE)
  const paginatedExperiences = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredExperiences.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredExperiences, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedType])

  const formatDate = (date: string) => {
    if (date === 'Present') return t('volunteer.present', 'Present')
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const volunteerText = `${t('volunteer.description', 'Contributing to communities and organizations through volunteer work and professional development programs.')}. ${filteredExperiences.length} ${t('volunteer.experience', 'experiences')} available.`

  return (
    <section id="volunteer" className="section-container bg-gray-100 dark:bg-gray-800 transition-colors duration-300 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            {t('volunteer.title', 'Volunteer')} <span className="gradient-text">{t('volunteer.experience', 'Experience')}</span>
          </h2>
          <TextToSpeech text={volunteerText} sectionId="volunteer" />
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
          {t('volunteer.description', 'Contributing to communities and organizations through volunteer work and professional development programs.')}
        </p>

        {/* Type Filter */}
        <div
          role="tablist"
          aria-label="Filter volunteer experiences by type"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
        >
          {types.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type)
                setCurrentPage(1)
              }}
              role="tab"
              aria-selected={selectedType === type}
              aria-controls="volunteer-grid"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                selectedType === type
                  ? 'bg-primary-700 text-white dark:bg-primary-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Volunteer Grid - Responsive */}
        <div
          id="volunteer-grid"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6"
        >
          {paginatedExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="card group hover:scale-[1.02] transition-transform p-4"
            >
              <div className="flex items-start gap-2 mb-3">
                <div className="p-1.5 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex-shrink-0">
                  <Heart size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {experience.position}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-1">
                    {experience.organization}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-500">
                    <div className="flex items-center gap-0.5">
                      <MapPin size={10} />
                      <span className="line-clamp-1">{experience.location}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-0.5">
                      <Calendar size={10} />
                      <span className="line-clamp-1">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <ul className="space-y-1">
                  {experience.description.slice(0, 2).map((desc, idx) => (
                    <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1.5">
                      <div className="w-1 h-1 bg-primary-600 rounded-full mt-1.5 flex-shrink-0" />
                      <span className="line-clamp-2">{desc}</span>
                    </li>
                  ))}
                  {experience.description.length > 2 && (
                    <li className="text-[10px] text-gray-500 dark:text-gray-500">
                      +{experience.description.length - 2} {t('volunteer.more', 'more')}
                    </li>
                  )}
                </ul>

                {experience.metrics && experience.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {experience.metrics.slice(0, 2).map((metric, idx) => (
                      <div
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-[10px]"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white">{metric.label}:</span>{' '}
                        <span className="text-gray-600 dark:text-gray-400">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {experience.skills && experience.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {experience.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-[10px]"
                      >
                        {skill}
                      </span>
                    ))}
                    {experience.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[10px]">
                        +{experience.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            {t('volunteer.noExperiences', 'No volunteer experiences found in this category.')}
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="mt-6"
          />
        )}
      </motion.div>
    </section>
  )
}

