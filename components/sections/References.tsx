'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ReferencesSlider from '@/components/ReferencesSlider'

export default function References() {
  const { t } = useTranslation()

  return (
    <section id="references" className="section-container bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-center">
          {t('references.title', 'References')} <span className="gradient-text">{t('references.recommendations', '& Recommendations')}</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {t('references.description', 'What industry professionals and colleagues say about working with me.')}
        </p>

        <div className="max-w-7xl mx-auto">
          <ReferencesSlider />
        </div>
      </motion.div>
    </section>
  )
}

