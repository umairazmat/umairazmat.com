'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Download } from 'lucide-react'
import { personalInfo } from '@/constants'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import NavbarDropdown from './NavbarDropdown'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Check if we're on the homepage
  const isHomePage = pathname === '/'

  // Helper function to get proper href (prepend homepage if not on homepage)
  const getHref = (href: string) => {
    if (href.startsWith('#')) {
      return isHomePage ? href : `/${href}`
    }
    return href
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dropdown menus
  const workDropdown = [
    { href: '/projects', label: t('navbar.projects') },
    { href: '/skills', label: t('navbar.skills') },
    { href: getHref('#testimonials'), label: t('navbar.references') },
    { href: '/experiences', label: t('navbar.experience') },
  ]

  const clientsDropdown = [
    { href: getHref('#testimonials'), label: t('navbar.references') },
    { href: getHref('#who-i-work-with'), label: t('navbar.references') },
  ]

  const contactDropdown = [
    { href: getHref('#contact'), label: t('navbar.contact') },
    { href: '/appointments', label: t('navbar.appointment') },
  ]

  const othersDropdown = [
    { href: '/skills', label: t('navbar.skills') },
    { href: '/certifications', label: t('navbar.certificates') },
    { href: '/learning', label: t('navbar.learning') },
    { href: '/experience', label: t('navbar.experience') },
    { href: '/education', label: t('navbar.education') },
  ]

  // Main navigation - conversion-focused
  const navLinks = [
    { href: '/', label: t('common.home', 'Home') },
    { href: getHref('#about'), label: t('navbar.about') },
    { href: getHref('#how-i-work'), label: t('common.process', 'Process') },
    { href: '/blog', label: t('navbar.blog') },
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
        <div className="navbar-container flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors whitespace-nowrap"
            aria-label={`${personalInfo.name} - Home`}
          >
            <span className="xl:hidden">Umair</span>
            <span className="hidden xl:inline">Umair Azmat</span>
          </Link>

          {/* Desktop Navigation - Only for large screens (1024px+) */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center no-rtl-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium text-sm px-2 py-1 whitespace-nowrap"
                onClick={(e) => {
                  // Handle anchor links when not on homepage
                  if (link.href.startsWith('#') && !isHomePage) {
                    e.preventDefault()
                    window.location.href = `/${link.href}`
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
            <NavbarDropdown label={t('navbar.work')} items={workDropdown} />
            <NavbarDropdown label={t('navbar.clients')} items={clientsDropdown} />
            <NavbarDropdown label={t('navbar.contact')} items={contactDropdown} />
            <NavbarDropdown label={t('navbar.more')} items={othersDropdown} />
          </div>

          {/* Utility Buttons - Language, Theme, Resume (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 no-rtl-reverse">
            <div className="flex items-center gap-3 ms-4 ps-4 border-s border-gray-300 dark:border-gray-700">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2 ms-4 font-semibold"
              aria-label={t('navbar.downloadResumePdf')}
            >
              <Download size={16} aria-hidden="true" />
              {t('navbar.resume', 'Resume')}
            </a>
          </div>

          {/* Mobile/Tablet Header - Language, Theme, Menu (below 1024px) */}
          <div className="lg:hidden flex items-center gap-2 no-rtl-reverse">
            <div className="flex items-center gap-1.5">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <button
              className="text-gray-700 dark:text-gray-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation (below 1024px) */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-300 dark:border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {/* Resume Button at Start */}
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary flex items-center gap-2 w-full justify-center py-2.5 mb-2"
              onClick={() => setIsOpen(false)}
              aria-label={t('navbar.downloadResumePdf')}
            >
              <Download size={18} aria-hidden="true" />
              {t('navbar.resume', 'Resume')}
            </a>
            
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                onClick={(e) => {
                  // Handle anchor links when not on homepage
                  if (link.href.startsWith('#') && !isHomePage) {
                    e.preventDefault()
                    window.location.href = `/${link.href}`
                  }
                  setIsOpen(false)
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('navbar.work')}</span>
              {workDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-1.5 ps-4 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  onClick={(e) => {
                    // Handle anchor links when not on homepage
                    if (item.href.startsWith('#') && !isHomePage) {
                      e.preventDefault()
                      window.location.href = `/${item.href}`
                    }
                    setIsOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 pb-1">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('navbar.clients')}</span>
              {clientsDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-1.5 ps-4 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  onClick={(e) => {
                    // Handle anchor links when not on homepage
                    if (item.href.startsWith('#') && !isHomePage) {
                      e.preventDefault()
                      window.location.href = `/${item.href}`
                    }
                    setIsOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 pb-1">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('navbar.contact')}</span>
              {contactDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-1.5 ps-4 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  onClick={(e) => {
                    // Handle anchor links when not on homepage
                    if (item.href.startsWith('#') && !isHomePage) {
                      e.preventDefault()
                      window.location.href = `/${item.href}`
                    }
                    setIsOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 pb-1">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('navbar.more')}</span>
              {othersDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-1.5 ps-4 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

