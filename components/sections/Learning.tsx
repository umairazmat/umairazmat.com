'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/constants'
import { BookOpen, CheckCircle, Circle, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

export default function Learning() {
  const { t } = useTranslation()
  const { learning } = personalInfo

  const learningText = `${t('learning.description', 'Continuous learning and professional development to stay at the forefront of technology.')}. Currently focusing on ${learning.currentFocus}. Progress: ${learning.progress}%.`

  return (
    <section id="learning" className="section-container bg-gray-100 dark:bg-gray-800 transition-colors duration-300 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            {t('learning.title', 'Learning')} <span className="gradient-text">{t('learning.progress', '& Progress')}</span>
          </h2>
          <TextToSpeech text={learningText} sectionId="learning" />
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
          {t('learning.description', 'Continuous learning and professional development to stay at the forefront of technology.')}
        </p>

        <div className="card p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex-shrink-0">
              <BookOpen size={20} className="sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {learning.currentFocus}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                {t('learning.currentFocus', 'Currently focusing on cloud infrastructure and AWS services.')}
              </p>

              {/* Progress Bar */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('learning.progress', 'Progress')}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-primary-600 dark:text-primary-400">
                    {learning.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${learning.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp size={18} className="sm:w-5 sm:h-5" />
                  {t('learning.milestones', 'Learning Milestones')}
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  {learning.milestones.map((milestone, index) => {
                    const isCompleted = milestone.includes('(Completed)')
                    const isInProgress = milestone.includes('(In Progress)')
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white dark:bg-gray-700 rounded-lg"
                      >
                        {isCompleted ? (
                          <CheckCircle size={18} className="sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        ) : isInProgress ? (
                          <Circle size={18} className="sm:w-5 sm:h-5 text-primary-500 flex-shrink-0" />
                        ) : (
                          <Circle size={18} className="sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span
                          className={`text-xs sm:text-sm ${
                            isCompleted
                              ? 'text-gray-700 dark:text-gray-300 line-through'
                              : isInProgress
                              ? 'text-gray-900 dark:text-white font-medium'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {milestone.replace(/\(Completed\)|\(In Progress\)/g, '').trim()}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


