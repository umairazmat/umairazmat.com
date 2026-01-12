'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function HowIWork() {
  const { t } = useTranslation()
  const processSteps = [
    {
      number: '01',
      title: t('howIWork.step1Title'),
      description: t('howIWork.step1Desc'),
    },
    {
      number: '02',
      title: t('howIWork.step2Title'),
      description: t('howIWork.step2Desc'),
    },
    {
      number: '03',
      title: t('howIWork.step3Title'),
      description: t('howIWork.step3Desc'),
    },
    {
      number: '04',
      title: t('howIWork.step4Title'),
      description: t('howIWork.step4Desc'),
    },
    {
      number: '05',
      title: t('howIWork.step5Title'),
      description: t('howIWork.step5Desc'),
    },
  ]

  return (
    <section id="how-i-work" className="relative flex items-center justify-center py-8 sm:py-10 overflow-hidden w-full">
      {/* Same Background as Section 2 (InstantProof) */}
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

        {/* Floating 3D Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-sky-500/10 dark:from-sky-500/20 to-cyan-500/10 dark:to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 to-sky-600/10 dark:to-sky-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('howIWork.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2">
            {t('howIWork.subtitle1')} <strong className="text-sky-500 dark:text-sky-400">{t('howIWork.subtitle1Highlight')}</strong>.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t('howIWork.subtitle2')}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 sm:gap-6"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-500 dark:text-sky-400">
                  {step.number}
                </span>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Concluding Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t('howIWork.conclusion')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
