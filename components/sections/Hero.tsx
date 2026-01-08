'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, Calendar } from 'lucide-react'
import { personalInfo } from '@/constants'
import AvailabilityWidget from '@/components/AvailabilityWidget'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

export default function Hero() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heroText = `${t('hero.greeting')} ${personalInfo.name}. ${t('hero.title')}. ${t('hero.description')}`

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary-50 dark:from-gray-900 via-white dark:via-gray-900 to-primary-50 dark:to-gray-800 pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6">
      <div className="section-container w-full">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="w-full space-y-4 sm:space-y-6"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                >
                  {t('hero.greeting')}{' '}
                  <span className="gradient-text">{personalInfo.name}</span>
                </motion.h1>
                <TextToSpeech text={heroText} sectionId="hero" className="hidden sm:flex" />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-200 font-medium"
              >
                {t('hero.title')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto px-2"
              >
                {t('hero.description')}
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2 w-full max-w-2xl px-4"
            >
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-primary flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                aria-label="Download Resume"
              >
                <Download size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">{t('hero.downloadResume')}</span>
                <span className="xs:hidden">Resume</span>
              </a>
              <a
                href="#contact"
                className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                aria-label={t('hero.getInTouch')}
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
                {t('hero.getInTouch')}
              </a>
              <a
                href={personalInfo.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                aria-label={t('hero.scheduleCall')}
              >
                <Calendar size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{t('hero.scheduleCall')}</span>
                <span className="sm:hidden">Schedule</span>
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 w-full max-w-2xl px-4"
            >
              <div className="text-center">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                  {personalInfo.metrics.yearsExperience}+
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t('hero.years')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                  {personalInfo.metrics.projectsDelivered}+
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t('hero.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                  {personalInfo.metrics.studentsTrained}+
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t('hero.students')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                  {personalInfo.metrics.githubStars}+
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t('hero.githubStars')}</div>
              </div>
            </motion.div>

            {/* Availability Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full max-w-md mt-4 sm:mt-6"
            >
              <AvailabilityWidget />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
