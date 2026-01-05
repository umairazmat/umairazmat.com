'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, Calendar } from 'lucide-react'
import { personalInfo } from '@/constants'
import AvailabilityWidget from '@/components/AvailabilityWidget'
import Image from 'next/image'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary-50 dark:from-gray-900 via-white dark:via-gray-900 to-primary-50 dark:to-gray-800 pt-20 pb-12">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
            {/* Left Content - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left space-y-6 lg:max-w-2xl"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  Hi, I&apos;m{' '}
                  <span className="gradient-text">{personalInfo.name}</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium"
                >
                  {personalInfo.title.split('|')[0].trim()}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  Building production-grade web applications with React, Next.js, Node.js & Python. 
                  Passionate about clean architecture, scalable systems & AI-assisted development.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2"
              >
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="btn-primary flex items-center gap-2"
                  aria-label="Download Resume"
                >
                  <Download size={20} />
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="btn-secondary flex items-center gap-2"
                  aria-label="Get In Touch"
                >
                  <Mail size={20} />
                  Get In Touch
                </a>
                <a
                  href={personalInfo.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                  aria-label="Schedule Call"
                >
                  <Calendar size={20} />
                  Schedule Call
                </a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {personalInfo.metrics.yearsExperience}+
                  </div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Years</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {personalInfo.metrics.projectsDelivered}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {personalInfo.metrics.studentsTrained}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {personalInfo.metrics.githubStars}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">GitHub Stars</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Profile Photo & Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-shrink-0 flex flex-col items-center gap-6 w-full lg:w-auto"
            >
              {/* Profile Photo - Smaller, better sized */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary-200 shadow-xl bg-white">
                <Image
                  src="/images/profile-photo.jpg"
                  alt={`${personalInfo.name} - Full-Stack Software Engineer`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                />
              </div>
              
              {/* Availability Widget */}
              <div className="w-full lg:w-auto lg:min-w-[280px]">
                <AvailabilityWidget />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
