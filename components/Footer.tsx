'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
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
            <p className="text-gray-400 text-xs sm:text-sm mb-3">
              Full Stack Developer & AI Engineer
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="#approach" className="hover:text-white transition-colors text-xs sm:text-sm">
                  Approach
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors text-xs sm:text-sm">
                  Work
                </Link>
              </li>
              <li>
                <Link href="#how-i-work" className="hover:text-white transition-colors text-xs sm:text-sm">
                  Process
                </Link>
              </li>
              <li>
                <Link href="#who-i-work-with" className="hover:text-white transition-colors text-xs sm:text-sm">
                  Clients
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors text-xs sm:text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors text-xs sm:text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Connect</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white transition-colors text-gray-400"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li className="text-gray-400">
                Available for remote opportunities
              </li>
            </ul>
          </div>
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
