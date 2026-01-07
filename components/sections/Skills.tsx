'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/constants'
import { Skill as SkillType } from '@/constants'
import { useTranslation } from 'react-i18next'

const levelColors = {
  Expert: 'bg-green-500',
  Advanced: 'bg-blue-500',
  Intermediate: 'bg-yellow-500',
  Beginner: 'bg-gray-400',
}

export default function Skills() {
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

  return (
    <section id="skills" className="section-container bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-center">
          {t('skills.title')} <span className="gradient-text">{t('skills.skills')}</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          {t('skills.description')}
        </p>

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls="skills-grid"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
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
              className="mb-6 last:mb-0"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02, duration: 0.2 }}
                    className="group relative"
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      <span className={`w-2 h-2 rounded-full ${levelColors[skill.level]}`} title={skill.level} />
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

