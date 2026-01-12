'use client'

import { motion } from 'framer-motion'
import { Mail, Calendar, MessageCircle } from 'lucide-react'
import { personalInfo } from '@/constants'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="section-container bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Looking for a Remote Full-Stack Engineer?
          </h2>
          <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            I&apos;m available for remote opportunities and ready to help build your next project.
            Let&apos;s discuss how I can contribute to your team.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={personalInfo.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 border-white flex items-center gap-2 px-6 py-3 font-semibold text-base shadow-lg hover:shadow-xl transition-all"
            >
              <Calendar size={20} />
              Schedule Call
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm flex items-center gap-2 px-6 py-3 font-semibold text-base"
            >
              <Mail size={20} />
              Email Me
            </a>
            <Link
              href="#contact"
              className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm flex items-center gap-2 px-6 py-3 font-semibold text-base"
            >
              <MessageCircle size={20} />
              Contact Form
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
