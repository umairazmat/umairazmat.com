'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { references } from '@/constants'
import { Quote, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const CARDS_PER_VIEW = 3

export default function ReferencesSlider() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const totalSlides = Math.ceil(references.length / CARDS_PER_VIEW)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10s
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides)
  }

  const getVisibleReferences = () => {
    const start = currentIndex * CARDS_PER_VIEW
    return references.slice(start, start + CARDS_PER_VIEW)
  }

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {getVisibleReferences().map((reference) => (
              <motion.div
                key={reference.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="card group hover:scale-[1.02] transition-transform p-4"
              >
                <div className="relative">
                  <Quote
                    size={24}
                    className="text-primary-600 dark:text-primary-400 mb-3 opacity-50"
                  />
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 line-clamp-5">
                    &ldquo;{reference.recommendation}&rdquo;
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                          {reference.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {reference.position}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {reference.company}
                        </p>
                      </div>
                      {reference.linkedinUrl && (
                        <a
                          href={reference.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors flex-shrink-0"
                          aria-label={`View ${reference.name}'s LinkedIn profile`}
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 h-2 bg-primary-600 rounded-full'
                  : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}



