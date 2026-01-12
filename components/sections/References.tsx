'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ReferencesSlider from '@/components/ReferencesSlider'
import TextToSpeech from '@/components/TextToSpeech'
import { references } from '@/constants'

export default function References() {
  const { t } = useTranslation()
  const referencesText = `${t('references.description', 'What industry professionals and colleagues say about working with me.')}. ${references.length} ${t('references.title', 'references')} available.`

  return (
    <section id="references" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            {t('references.title', 'References')} <span className="gradient-text">{t('references.recommendations', '& Recommendations')}</span>
          </h2>
          <TextToSpeech text={referencesText} sectionId="references" />
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
          {t('references.description', 'What industry professionals and colleagues say about working with me.')}
        </p>

        <div className="max-w-7xl mx-auto">
          <ReferencesSlider />
        </div>
      </motion.div>
    </section>
  )
}

