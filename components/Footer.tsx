'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Github, Linkedin, Heart, Briefcase } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useTranslation } from 'react-i18next'
import NewsletterForm from '@/components/NewsletterForm'

export default function Footer() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/'
  
  // Helper function to get proper href (prepend homepage if not on homepage)
  const getHref = (href: string) => {
    if (href.startsWith('#')) {
      return isHomePage ? href : `/${href}`
    }
    return href
  }

  const socialLinks = [
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Briefcase, href: '#', label: 'Upwork' }, // Add Upwork URL if available
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black text-gray-300 dark:text-gray-400 border-t border-gray-700 dark:border-gray-900 overflow-hidden w-full">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-15">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Floating 3D Shapes - Subtle for dark background */}
        <motion.div
          className="absolute top-10 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-sky-500/5 dark:from-sky-500/10 to-cyan-500/5 dark:to-cyan-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-10 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-500/5 dark:from-cyan-500/10 to-sky-600/5 dark:to-sky-600/10 rounded-full blur-3xl"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {/* Brand Section */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{personalInfo.name}</h3>
            <p className="text-gray-300 dark:text-gray-400 text-xs sm:text-sm mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-3 mb-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noopener noreferrer'}
                  className="text-gray-400 dark:text-gray-500 hover:text-sky-400 dark:hover:text-sky-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {t('footer.workStyle')}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">{t('footer.quickLinks')}</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
              {/* First Column - 5 links */}
              <div className="flex flex-col gap-1.5">
                <Link href={getHref('#about')} className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.about')}
                </Link>
                <Link href="/projects" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.projects')}
                </Link>
                <Link href="/skills" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.skills')}
                </Link>
                <Link href="/certifications" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.certificates')}
                </Link>
                <Link href="/experiences" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.experience')}
                </Link>
              </div>
              {/* Second Column - 5 links */}
              <div className="flex flex-col gap-1.5">
                <Link href="/learning" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.learning')}
                </Link>
                <Link href="/blog" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.blog')}
                </Link>
                <Link href={getHref('#contact')} className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.contact')}
                </Link>
                <Link href="/appointments" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.appointment')}
                </Link>
                <Link href="/experience" className="hover:text-sky-400 transition-colors text-gray-300 dark:text-gray-400">
                  {t('navbar.experience')}
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Newsletter</h4>
            <NewsletterForm variant="default" showInterests={true} className="max-w-xs" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-700 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            <p>&copy; {currentYear} {personalInfo.name}. {t('footer.rights')}</p>
            <p className="flex items-center gap-1">
              {t('footer.madeWith')} <Heart className="text-red-500" size={12} fill="currentColor" /> {t('footer.from')} {personalInfo.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
