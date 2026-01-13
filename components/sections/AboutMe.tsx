'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { personalInfo } from '@/constants'
import Link from 'next/link'

export default function AboutMe() {
  const { t } = useTranslation()
  return (
    <section id="about" className="relative flex items-center justify-center py-8 sm:py-10 overflow-hidden w-full">
      {/* Same Background as Other Sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Floating 3D Shapes - Constrained */}
        <motion.div
          className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-sky-500/10 dark:from-sky-500/20 to-cyan-500/10 dark:to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 to-sky-600/10 dark:to-sky-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main Content */}
          <div className="space-y-4 mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t('aboutMe.greeting')}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('aboutMe.description1')} <strong className="text-sky-500 dark:text-sky-400">{t('aboutMe.experienceYears')}</strong> {t('aboutMe.description2')}
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('aboutMe.description3')}
            </p>
            <div className="pt-2">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                <strong className="text-sky-500 dark:text-sky-400">{t('aboutMe.whyWorkWithMe')}</strong> {t('aboutMe.whyWorkWithMeDesc')}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-sky-500/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              {t('aboutMe.seeSelectedWork')}
              <ExternalLink size={16} />
            </a>
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white dark:text-sky-400 dark:hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              {t('aboutMe.scheduleCall')}
              <Calendar size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
