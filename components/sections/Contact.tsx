'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '@/constants'
import ContactModal from '@/components/ContactModal'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

export default function Contact() {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const contactText = `${t('contact.description')}. Email: ${personalInfo.email}. ${personalInfo.availability}. Response time: ${personalInfo.responseTime}.`

  return (
    <section id="contact" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('contact.title')} <span className="gradient-text">{t('contact.touch')}</span>
          </h2>
          <TextToSpeech text={contactText} sectionId="contact" />
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          {t('contact.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="card text-center p-4 sm:p-6"
          >
            <Mail className="mx-auto mb-3 sm:mb-4 text-primary-700 dark:text-primary-400 sm:w-8 sm:h-8" size={24} />
            <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">{t('contact.email')}</h3>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm sm:text-base text-primary-700 dark:text-primary-400 hover:underline break-all"
            >
              {personalInfo.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card text-center p-4 sm:p-6"
          >
            <CheckCircle className="mx-auto mb-3 sm:mb-4 text-primary-700 dark:text-primary-400 sm:w-8 sm:h-8" size={24} />
            <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">{t('contact.availability')}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{personalInfo.availability}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card text-center p-4 sm:p-6"
          >
            <Send className="mx-auto mb-3 sm:mb-4 text-primary-700 dark:text-primary-400 sm:w-8 sm:h-8" size={24} />
            <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">{t('contact.responseTime')}</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{personalInfo.responseTime}</p>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 mx-auto"
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
          {t('contact.sendMessage')}
        </motion.button>

        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </motion.div>
    </section>
  )
}

