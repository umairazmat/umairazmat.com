'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, MessageSquare, CheckCircle2, Clock, Globe } from 'lucide-react'
import { personalInfo } from '@/constants'
import ContactModal from '@/components/ContactModal'

export default function LetsBuild() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const whatWeCanDo = [
    'Discuss your project, MVP, or system architecture',
    'Walk through technical trade-offs and design decisions',
    'Explore AI-assisted features or scalable cloud deployments',
  ]

  const availability = [
    'Remote-first, async-friendly work style',
    'Immediate availability for new projects',
    'Flexible across time zones',
  ]

  return (
    <>
      <section id="contact" className="relative flex items-center justify-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Same Background as Other Sections */}
        <div className="absolute inset-0 pointer-events-none">
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
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Ready to ship production-ready systems that scale?
            </p>
          </motion.div>

          {/* Get in Touch Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Get in Touch
            </h3>
            
            {/* Three buttons in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Schedule a Call */}
              <motion.a
                href={personalInfo.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="p-3 bg-sky-100 dark:bg-sky-900/20 rounded-lg group-hover:bg-sky-500 dark:group-hover:bg-sky-500 transition-colors">
                  <Calendar className="text-sky-500 dark:text-sky-400 group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Schedule a Call
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Pick a time that works for you.
                  </p>
                </div>
              </motion.a>

              {/* Email Me */}
              <motion.a
                href={`mailto:${personalInfo.email}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="p-3 bg-sky-100 dark:bg-sky-900/20 rounded-lg group-hover:bg-sky-500 dark:group-hover:bg-sky-500 transition-colors">
                  <Mail className="text-sky-500 dark:text-sky-400 group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Email Me
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
                    {personalInfo.email}
                  </p>
                </div>
              </motion.a>

              {/* Send a Message */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="p-3 bg-sky-100 dark:bg-sky-900/20 rounded-lg group-hover:bg-sky-500 dark:group-hover:bg-sky-500 transition-colors">
                  <MessageSquare className="text-sky-500 dark:text-sky-400 group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Send a Message
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Fill out the form below for project inquiries or questions.
                  </p>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Response - Prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-6 p-4 bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 backdrop-blur-sm rounded-lg border border-sky-200 dark:border-sky-800"
          >
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">
              <strong className="text-sky-600 dark:text-sky-400">Quick Response:</strong> I typically respond within 24 hours. For urgent matters, please schedule a call or send an email directly.
            </p>
          </motion.div>

          {/* What We Can Do Together & Availability - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* What We Can Do Together */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-sky-500 dark:text-sky-400" size={18} />
                What We Can Do Together
              </h3>
              <ul className="space-y-2">
                {whatWeCanDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-sky-500 dark:text-sky-400 mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Clock className="text-sky-500 dark:text-sky-400" size={18} />
                Availability
              </h3>
              <ul className="space-y-2">
                {availability.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-sky-500 dark:text-sky-400 mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
