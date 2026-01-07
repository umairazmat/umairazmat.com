'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/constants'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

export default function About() {
  const { t } = useTranslation()
  const aboutText = t('about.summary')
  
  return (
    <section id="about" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <h2 className="text-4xl font-bold text-center">
            {t('about.title')} <span className="gradient-text">{t('about.me')}</span>
          </h2>
          <TextToSpeech text={aboutText} sectionId="about" />
        </div>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>{aboutText}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {personalInfo.about.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                <p>{highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

