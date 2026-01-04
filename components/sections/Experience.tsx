'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, TrendingUp } from 'lucide-react'
import { experiences } from '@/constants'
import { Experience as ExperienceType } from '@/constants'

export default function Experience() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All')
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)

  const filters = ['All', ...new Set(experiences.map((exp) => exp.company))]

  const filteredExperiences =
    selectedFilter === 'All'
      ? experiences
      : experiences.filter((exp) => exp.company === selectedFilter)

  const formatDate = (date: string) => {
    if (date === 'Present') return 'Present'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <section id="experience" className="section-container bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-center">
          Professional <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Click on any experience to view detailed information, achievements, and metrics
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`card cursor-pointer transition-all ${
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
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {experience.role}
                      </h3>
                      <p className="text-xl text-primary-600 font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {experience.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {experience.location}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {experience.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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
                      className="mt-6 pt-6 border-t border-gray-200 space-y-4"
                    >
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <TrendingUp size={18} />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {experience.metrics && experience.metrics.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Briefcase size={18} />
                            Metrics & Impact
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

