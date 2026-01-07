'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.social.twitter, label: 'Twitter' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Umair Azmat</h3>
            <p className="text-gray-400 text-sm">
              {t('footer.tagline')}
              <br />
              {t('footer.available')}
            </p>
          </div>

          {/* Quick Links - Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="hover:text-white transition-colors text-sm">
                  {t('navbar.about')}
                </Link>
              </li>
              <li>
                <Link href="#education" className="hover:text-white transition-colors text-sm">
                  {t('navbar.education')}
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-white transition-colors text-sm">
                  {t('navbar.experience')}
                </Link>
              </li>
              <li>
                <Link href="#volunteer" className="hover:text-white transition-colors text-sm">
                  {t('navbar.volunteer')}
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors text-sm">
                  {t('navbar.projects')}
                </Link>
              </li>
              <li>
                <Link href="#skills" className="hover:text-white transition-colors text-sm">
                  {t('navbar.skills')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.moreLinks', 'More')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#certificates" className="hover:text-white transition-colors text-sm">
                  {t('navbar.certificates')}
                </Link>
              </li>
              <li>
                <Link href="#references" className="hover:text-white transition-colors text-sm">
                  {t('navbar.references')}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors text-sm">
                  {t('navbar.faq')}
                </Link>
              </li>
              <li>
                <Link href="#appointment" className="hover:text-white transition-colors text-sm">
                  {t('navbar.appointment')}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors text-sm">
                  {t('navbar.contact')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors text-sm">
                  {t('navbar.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.connect', 'Connect')}</h4>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-900 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>&copy; {currentYear} Umair Azmat. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}

