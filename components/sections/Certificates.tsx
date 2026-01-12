'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { certificates, Certificate } from '@/constants'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Pagination from '@/components/Pagination'
import TextToSpeech from '@/components/TextToSpeech'
import Image from 'next/image'

const categoryColors = {
  'AWS & Cloud': 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  'Education & Mentoring': 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  'University': 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  'Hackathons': 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  'Professional': 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  'Training': 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
  'Online Courses': 'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
}

const ITEMS_PER_PAGE = 6 // 2 rows x 3 columns

interface CertificatesProps {
  hideHeading?: boolean
}

export default function Certificates({ hideHeading = false }: CertificatesProps) {
  const { t } = useTranslation()
  const allLabel = t('certificates.all', 'All')
  const [selectedCategory, setSelectedCategory] = useState<string>(allLabel)
  const [currentPage, setCurrentPage] = useState(1)

  const categories = [allLabel, ...new Set(certificates.map((c) => c.category))]

  const filteredCertificates = useMemo(() => {
    const filtered =
      selectedCategory === allLabel
        ? certificates
        : certificates.filter((c) => c.category === selectedCategory)
    return filtered
  }, [selectedCategory, allLabel])

  const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE)
  const paginatedCertificates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredCertificates.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredCertificates, currentPage])

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  const certificatesText = `${t('certificates.description', 'Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning.')}. ${filteredCertificates.length} ${t('certificates.title', 'certificates')} available.`

  return (
    <section id="certificates" className="transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {!hideHeading && (
          <>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                {t('certificates.title', 'Certificates')} <span className="gradient-text">{t('certificates.licenses', '& Licenses')}</span>
              </h2>
              <TextToSpeech text={certificatesText} sectionId="certificates" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
              {t('certificates.description', 'Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning.')}
            </p>
          </>
        )}

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter certificates by category"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls="certificates-grid"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                selectedCategory === category
                  ? 'bg-sky-500 dark:bg-sky-600 text-white'
                  : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certificates Grid - Responsive */}
        <div
          id="certificates-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6"
        >
          {paginatedCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-200/20 dark:border-gray-700/20 group hover:scale-[1.02] hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all p-4"
            >
              {/* Certificate Image or Icon */}
              {certificate.image ? (
                <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-32 mb-3 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20">
                  <Award size={48} className="text-primary-600 dark:text-primary-400" />
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {certificate.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                    {certificate.issuer}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <Calendar size={12} />
                  <span className="line-clamp-1">{formatDate(certificate.issueDate)}</span>
                </div>

                <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${categoryColors[certificate.category]}`}>
                  {certificate.category}
                </div>

                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 2).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[10px]"
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[10px]">
                        +{certificate.skills.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            {t('certificates.noCertificates', 'No certificates found in this category.')}
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page)
              // Scroll to certificates section instead of top
              const certificatesSection = document.getElementById('certificates')
              if (certificatesSection) {
                certificatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="mt-6"
          />
        )}
      </motion.div>
    </section>
  )
}

