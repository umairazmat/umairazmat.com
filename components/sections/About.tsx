'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/constants'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'
import Image from 'next/image'

export default function About() {
  const { t } = useTranslation()
  const aboutText = `${t('about.summary')}. ${personalInfo.about.highlights.join('. ')}`
  
  return (
    <section id="about" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-center md:items-start">
          {/* Profile Image - Now in About Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 w-full sm:w-48 md:w-56 lg:w-64"
          >
            <div className="relative w-full aspect-square max-w-[256px] mx-auto md:mx-0 rounded-2xl overflow-hidden border-4 border-primary-200 dark:border-primary-800 shadow-xl bg-white dark:bg-gray-800">
              <Image
                src="/images/profile-photo.jpg"
                alt={`${personalInfo.name} - Full-Stack Software Engineer`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
              />
            </div>
          </motion.div>

          {/* About Content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-6 md:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
                {t('about.title')} <span className="gradient-text">{t('about.me')}</span>
              </h2>
              <TextToSpeech text={aboutText} sectionId="about" />
            </div>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{t('about.summary')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                {personalInfo.about.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-base">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

