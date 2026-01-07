'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/constants'
import { Calendar, Video, Phone, MapPin, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AppointmentSystem() {
  const { t } = useTranslation()
  const calendlyUrl = personalInfo.calendlyUrl

  return (
    <section id="appointment" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4 text-center">
          {t('appointment.title', 'Schedule')} <span className="gradient-text">{t('appointment.meeting', 'a Meeting')}</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {t('appointment.description', 'Book a time to discuss your project, collaboration opportunities, or just have a chat.')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <Video size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {t('appointment.videoCall', 'Video Call')}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('appointment.videoCallDesc', 'Connect via Zoom, Google Meet, or Microsoft Teams.')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <Phone size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {t('appointment.phoneCall', 'Phone Call')}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('appointment.phoneCallDesc', 'Traditional phone call for quick discussions.')}
            </p>
          </motion.div>
        </div>

        <div className="card bg-gradient-to-br from-primary-50 dark:from-primary-900/20 to-primary-100 dark:to-primary-900/30 border-2 border-primary-200 dark:border-primary-800">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary-600 rounded-full">
                <Calendar size={32} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('appointment.availableSlots', 'Available Time Slots')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('appointment.selectTime', 'Select a time that works best for you.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock size={16} />
                <span>{personalInfo.timezone}</span>
              </div>
            </div>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              <Calendar size={20} />
              {t('appointment.bookNow', 'Book Appointment Now')}
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              {t('appointment.poweredBy', 'Powered by Calendly')}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

