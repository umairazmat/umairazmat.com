'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'
import { personalInfo } from '@/constants'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import NavbarDropdown from './NavbarDropdown'
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

  const navLinks = [
    { href: '#about', label: t('navbar.about') },
    { href: '#education', label: t('navbar.education') },
    { href: '#experience', label: t('navbar.experience') },
    { href: '#volunteer', label: t('navbar.volunteer') },
    { href: '#projects', label: t('navbar.projects') },
    { href: '#skills', label: t('navbar.skills') },
    { href: '#certificates', label: t('navbar.certificates') },
    { href: '#references', label: t('navbar.references') },
    { href: '#faq', label: t('navbar.faq') },
    { href: '#appointment', label: t('navbar.appointment') },
    { href: '#contact', label: t('navbar.contact') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold gradient-text"
            aria-label={`${personalInfo.name} - Home`}
          >
            {personalInfo.name.split(' ')[0]}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-xs px-2 py-1 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-xs px-2 py-1"
            >
              {t('navbar.blog')}
            </Link>
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
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
              {t('navbar.resume')}
            </a>
          </div>

          {/* Tablet Navigation - Scrollable */}
          <div className="hidden md:flex xl:hidden items-center space-x-1 overflow-x-auto scrollbar-hide">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-xs px-1.5 py-1 whitespace-nowrap flex-shrink-0"
              >
                {link.label}
              </Link>
            ))}
            <NavbarDropdown
              label={t('navbar.more', 'More')}
              items={[...navLinks.slice(6), { href: '/blog', label: t('navbar.blog') }]}
            />
            <div className="flex items-center gap-1.5 ml-1 pl-1 border-l border-gray-200 dark:border-gray-700 flex-shrink-0">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary flex items-center gap-1 text-xs px-2 py-1 ml-1 flex-shrink-0"
              aria-label={t('navbar.downloadResumePdf')}
            >
              <Download size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('navbar.blog')}
            </Link>
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

