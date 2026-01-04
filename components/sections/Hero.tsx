'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, Calendar } from 'lucide-react'
import { personalInfo } from '@/constants'
import AvailabilityWidget from '@/components/AvailabilityWidget'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-16">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold"
              >
                Hi, I&apos;m{' '}
                <span className="gradient-text">{personalInfo.name}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-2xl md:text-3xl text-gray-600"
              >
                {personalInfo.title}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg text-gray-600 max-w-2xl"
              >
                {personalInfo.about.summary}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-primary flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </a>
              <a
                href="#contact"
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={20} />
                Get In Touch
              </a>
              <a
                href={personalInfo.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Calendar size={20} />
                Schedule Call
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {personalInfo.metrics.yearsExperience}+
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {personalInfo.metrics.projectsDelivered}+
                </div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {personalInfo.metrics.studentsTrained}+
                </div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {personalInfo.metrics.githubStars}+
                </div>
                <div className="text-sm text-gray-600">GitHub Stars</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Availability Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AvailabilityWidget />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

