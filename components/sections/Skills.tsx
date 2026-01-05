'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/constants'
import { Skill as SkillType } from '@/constants'

const levelColors = {
  Expert: 'bg-green-500',
  Advanced: 'bg-blue-500',
  Intermediate: 'bg-yellow-500',
  Beginner: 'bg-gray-400',
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...new Set(skills.map((s) => s.category))]

  const filteredSkills =
    selectedCategory === 'All'
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
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Technologies and tools I work with
        </p>

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls="skills-grid"
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div id="skills-grid" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="card"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.8 }}
                        className={`h-2 rounded-full ${levelColors[skill.level]}`}
                        style={{
                          width:
                            skill.level === 'Expert'
                              ? '100%'
                              : skill.level === 'Advanced'
                              ? '80%'
                              : skill.level === 'Intermediate'
                              ? '60%'
                              : '40%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

