'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Linkedin, Mail, Heart, Calendar, Briefcase } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useTranslation } from 'react-i18next'

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
    <footer className="relative bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 border-t border-gray-800 dark:border-gray-900 overflow-hidden">
      {/* Same Background Pattern as Other Sections */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {/* Brand Section */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-2">Umair Azmat</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Full Stack Developer & AI Engineer
            </p>
            <div className="flex space-x-3 mb-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noopener noreferrer'}
                  className="text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Remote-first, async-friendly
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Quick Links</h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs sm:text-sm">
              <Link href={getHref('#about')} className="hover:text-white transition-colors text-gray-400">
                About
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/projects" className="hover:text-white transition-colors text-gray-400">
                Projects
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/skills" className="hover:text-white transition-colors text-gray-400">
                Skills
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/certifications" className="hover:text-white transition-colors text-gray-400">
                Certifications
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/experiences" className="hover:text-white transition-colors text-gray-400">
                Experiences
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/learning" className="hover:text-white transition-colors text-gray-400">
                Learning
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/blog" className="hover:text-white transition-colors text-gray-400">
                Blog
              </Link>
              <span className="text-gray-600">|</span>
              <Link href={getHref('#contact')} className="hover:text-white transition-colors text-gray-400">
                Contact
              </Link>
            </div>
          </div>

          {/* Others Section */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Others</h4>
            <div className="space-y-2">
              <Link href="/skills" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Skills
              </Link>
              <Link href="/certifications" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Certifications
              </Link>
              <Link href="/learning" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Learning
              </Link>
              <Link href="/experience" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Experience
              </Link>
              <Link href="/education" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Education
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section - Full Width */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Get in Touch</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            <a
              href={personalInfo.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              <Calendar size={14} />
              Schedule a Call
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-600 hover:border-sky-500 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              <Mail size={14} />
              Email Me
            </a>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Remote-first, async-friendly
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 dark:border-gray-900">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            <p>&copy; {currentYear} Umair Azmat. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="text-red-500" size={12} fill="currentColor" /> from Umair Azmat
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
