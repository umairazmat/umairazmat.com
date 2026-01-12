'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/constants'
import { Skill as SkillType } from '@/constants'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

const levelColors = {
  Expert: 'bg-green-500',
  Advanced: 'bg-blue-500',
  Intermediate: 'bg-yellow-500',
  Beginner: 'bg-gray-400',
}

interface SkillsProps {
  hideHeading?: boolean
}

export default function Skills({ hideHeading = false }: SkillsProps) {
  const { t } = useTranslation()
  const allLabel = t('skills.all')
  const [selectedCategory, setSelectedCategory] = useState<string>(allLabel)

  const categories = [allLabel, ...new Set(skills.map((s) => s.category))]

  const filteredSkills =
    selectedCategory === allLabel
      ? skills
      : skills.filter((s) => s.category === selectedCategory)

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, SkillType[]>)

  const skillsText = `${t('skills.description')}. ${filteredSkills.length} ${t('skills.skills', 'skills')} available across ${Object.keys(groupedSkills).length} categories.`

  return (
    <section id="skills" className="transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {!hideHeading && (
          <>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                {t('skills.title')} <span className="gradient-text">{t('skills.skills')}</span>
              </h2>
              <TextToSpeech text={skillsText} sectionId="skills" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
              {t('skills.description')}
            </p>
          </>
        )}

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-wrap justify-center gap-2 mb-6 px-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls="skills-grid"
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                selectedCategory === category
                  ? 'bg-sky-500 dark:bg-sky-600 text-white'
                  : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid - Compact Tag Layout */}
        <div id="skills-grid" role="tabpanel" className="max-w-6xl mx-auto">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.05, duration: 0.3 }}
              className="mb-4 sm:mb-6 last:mb-0"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 px-2">{category}</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 px-2">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02, duration: 0.2 }}
                    className="group relative"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200/30 dark:border-gray-700/30 hover:border-sky-500 dark:hover:border-sky-400 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all">
                      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${levelColors[skill.level]}`} title={skill.level} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

