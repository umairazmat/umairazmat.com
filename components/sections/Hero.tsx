'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Github, Linkedin, Mail, Code, Download, MessageSquare } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { personalInfo } from '@/constants'
import ContactModal from '@/components/ContactModal'

export default function Hero() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Social links - below image
  const socialLinks = [
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Code, href: personalInfo.social.leetcode, label: 'LeetCode' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ]

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-8 w-full"
    >
      {/* 3D Animated Background Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 overflow-hidden">
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

        {/* Floating 3D Shapes - Constrained to prevent overflow */}
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-sky-400/5 dark:from-sky-400/10 to-cyan-400/5 dark:to-cyan-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform' }}
        />

        {/* Animated Particles - Reduced */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-500 dark:bg-sky-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-2 lg:gap-3 items-center">
          {/* Left Section - Content */}
          <div className="flex flex-col space-y-3 sm:space-y-4 text-left w-full min-w-0">
            {/* Headline - Outcome-focused */}
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight break-words w-full"
            >
              {t('hero.headline')}{' '}
              <span className="text-sky-500 dark:text-sky-400">{t('hero.headlineHighlight')}</span> {t('hero.headlineEnd')}
            </motion.h1>

            {/* Subheadline - Pain → Promise */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl pt-1"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* Trust Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sky-500 dark:text-sky-400">{personalInfo.metrics.projectsDelivered}+</span>
                <span className="text-gray-600 dark:text-gray-400">{t('hero.projectsShipped')}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sky-500 dark:text-sky-400">{personalInfo.metrics.studentsTrained}+</span>
                <span className="text-gray-600 dark:text-gray-400">{t('hero.studentsTrained')}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sky-500 dark:text-sky-400">1000+</span>
                <span className="text-gray-600 dark:text-gray-400">{t('hero.usersImpacted')}</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-2.5 pt-3"
            >
              <a
                href="#projects"
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-sky-500/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                {t('hero.viewMyWork')}
              </a>
              
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-5 py-2.5 bg-transparent border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white dark:text-sky-400 dark:hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <MessageSquare size={14} />
                {t('hero.contactMe')}
              </button>
              
              <a
                href={personalInfo.resumeUrl}
                download
                className="px-5 py-2.5 bg-transparent border-2 border-sky-400 dark:border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-400 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 focus:ring-offset-2"
              >
                <Download size={14} />
                {t('hero.downloadResume')}
              </a>
            </motion.div>
          </div>

          {/* Right Section - Image with Social Links Below */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center lg:items-center gap-4 pt-8 sm:pt-0"
          >
            {/* Profile Image */}
            <motion.div 
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform' }}
            >
              {/* Glowing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-sky-500/50"
                animate={{
                  rotate: 360,
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ willChange: 'transform' }}
              />
              
              {/* Image Container */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-sky-500 shadow-2xl shadow-sky-500/50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/profile-photo.jpg"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 288px"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 to-cyan-900/20" />
              </motion.div>

            </motion.div>

            {/* Social Links Below Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center justify-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-sky-500 hover:border-sky-400 flex items-center justify-center text-sky-500 dark:text-sky-400 hover:text-sky-400 hover:bg-sky-500/10 dark:hover:bg-sky-500/10 transition-all duration-300 transform hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={mounted ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      whileHover={{ rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </div>
              
              {/* Work Style Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center font-medium"
              >
                {t('hero.workStyle')}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  )
}
