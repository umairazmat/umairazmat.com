'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Code, Cloud, Zap } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutRedesigned() {
  const { t } = useTranslation()
  
  return (
    <section id="about" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
          {/* Problem Statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <Zap className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                The Problem
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Apps fail because of unclear architecture, rushed decisions, or poor scalability. Teams struggle with systems that break under load, become unmaintainable, or can&apos;t grow with the business.
            </p>
          </motion.div>

          {/* Solution Statement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                My Solution
              </h3>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I deliver production-grade apps with full-stack ownership, cloud deployment, and AI-assisted development. Every system I build is designed to scale, stay maintainable, and support your growth.
            </p>
          </motion.div>
        </div>

        {/* Proven Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="card p-6 sm:p-8 mb-12 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-600 dark:bg-primary-500 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              My Proven Method
            </h3>
          </div>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I focus on <strong>modular architecture</strong>, <strong>clean code</strong>, and <strong>maintainable systems</strong> — so your product grows, not collapses. Every decision is made with scalability and long-term success in mind.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Cloud className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Cloud-First</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AWS, Vercel, scalable infrastructure</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Clean Architecture</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Modular, maintainable, scalable</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">AI-Assisted</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Faster delivery, better quality</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Proof & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8"
        >
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {personalInfo.metrics.projectsDelivered}+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Projects Shipped</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {personalInfo.metrics.studentsTrained}+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Students Trained</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              {personalInfo.metrics.yearsExperience}+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
              1000+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Users Impacted</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 font-semibold text-lg"
          >
            Let&apos;s Discuss Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
