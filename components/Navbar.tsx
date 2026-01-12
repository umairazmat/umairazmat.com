'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'
import { personalInfo } from '@/constants'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Main navigation - conversion-focused
  const navLinks = [
    { href: '#approach', label: 'Approach' },
    { href: '#projects', label: 'Work' },
    { href: '#how-i-work', label: 'Process' },
    { href: '#who-i-work-with', label: 'Clients' },
    { href: '#contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-md dark:shadow-gray-900/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
            aria-label={`${personalInfo.name} - Home`}
          >
            Umair Azmat
          </Link>

          {/* Desktop Navigation - Simplified */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium text-sm px-2 py-1 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2 ml-4 font-semibold"
              aria-label={t('navbar.downloadResumePdf')}
            >
              <Download size={16} aria-hidden="true" />
              {t('navbar.resume', 'Resume')}
            </a>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-3 flex-1 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium text-xs px-2 py-1 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300 dark:border-gray-700">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5 ml-2"
              aria-label={t('navbar.downloadResumePdf')}
            >
              <Download size={14} aria-hidden="true" />
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-300 dark:border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('navbar.language')}:</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('navbar.theme')}:</span>
              <ThemeToggle />
            </div>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary flex items-center gap-2 w-full justify-center mt-4"
              onClick={() => setIsOpen(false)}
              aria-label={t('navbar.downloadResumePdf')}
            >
              <Download size={18} aria-hidden="true" />
              {t('navbar.resume')}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

