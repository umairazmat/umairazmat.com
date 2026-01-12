'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { references } from '@/constants'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export default function TrustSection() {
  const { t } = useTranslation()
  
  // Show only top 2 testimonials
  const featuredReferences = references.slice(0, 2)

  // Trust logos/badges
  const trustBadges = [
    { name: 'AWS', logo: '/logos/aws.svg' },
    { name: 'Stanford', logo: '/logos/stanford.svg' },
    { name: 'Harvard', logo: '/logos/harvard.svg' },
  ]

  return (
    <section className="section-container bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Trusted By Industry Leaders
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            What clients and collaborators say about working with me
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {featuredReferences.map((reference, index) => (
            <motion.div
              key={reference.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-6 sm:p-8 relative"
            >
              <Quote className="absolute top-4 left-4 text-primary-200 dark:text-primary-800 w-8 h-8" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              {/* One-line outcome statement */}
              <div className="mb-3">
                <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {reference.id === 'peter-morgan' && "Delivered successful project outcomes with strong technical leadership and effective communication"}
                  {reference.id === 'muhammad-abdullah' && "Exceeded expectations with technical expertise and leadership, significantly contributing to project success"}
                  {reference.id === 'abdul-hanan' && "Demonstrated exceptional coding and leadership talent in high-pressure hackathon environments"}
                  {reference.id === 'pranavi-m' && "Built innovative solutions meeting complex challenges with advanced technical skills and creative problem-solving"}
                  {reference.id === 'yousaf-sabir' && "Delivered full-stack solutions with clear business communication and reliable project execution"}
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic relative z-10 line-clamp-3">
                &quot;{reference.recommendation.substring(0, 150)}...&quot;
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="font-semibold text-sm text-gray-900 dark:text-white">
                  {reference.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {reference.position} @ {reference.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-60 dark:opacity-40"
        >
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-gray-700 rounded-lg p-4 grayscale hover:grayscale-0 transition-all"
            >
              <div className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400">
                {badge.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
