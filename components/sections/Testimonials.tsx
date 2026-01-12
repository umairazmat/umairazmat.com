'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  const { t } = useTranslation()
  const testimonials = [
    {
      quote: 'Umair is an exceptionally talented developer with deep MERN stack expertise. He leads teams effectively and adapts quickly to challenges. A reliable and skilled engineer.',
      name: 'Abdul Hanan',
      role: 'Senior MERN & Backend Developer',
      company: '',
      metrics: '',
    },
    {
      quote: 'Umair demonstrated strong technical leadership and delivered Python and API projects on time. Communicative, skilled, and a pleasure to work with.',
      name: 'Peter Morgan',
      role: 'Founder & CEO',
      company: 'Deep Learning Partnership',
      metrics: '',
    },
    {
      quote: 'Umair\'s full-stack skills and AI/ML understanding made him invaluable during IBM Watson and NASA hackathons. He integrates technical expertise with creative problem-solving effortlessly.',
      name: 'Pranavi M',
      role: 'UX/UI Designer & Hackathon Innovator',
      company: '',
      metrics: '',
    },
    {
      quote: 'Umair shows exceptional growth, resilience, and dedication. A team player who takes ownership and inspires peers while delivering top-quality work.',
      name: 'Urooj Fatima',
      role: 'Mentor & L&D Specialist',
      company: '',
      metrics: '',
    },
    {
      quote: 'Umair\'s expertise in React, Next.js, and Node.js significantly contributed to project success. Technically brilliant, with remarkable leadership and reliability.',
      name: 'Muhammad Abdullah Qamar',
      role: 'CEO',
      company: 'QNARLabs',
      metrics: '',
    },
    {
      quote: 'Umair handles complex front-end and backend logic seamlessly. Always ready to learn and improve, with a clear, professional way of executing projects.',
      name: 'Yousaf Sabir',
      role: 'Fullstack Developer',
      company: '',
      metrics: '',
    },
  ]

  // Show first 3 testimonials
  const displayedTestimonials = testimonials.slice(0, 3)

  return (
    <section id="testimonials" className="relative flex items-center justify-center py-8 sm:py-10 overflow-hidden w-full">
      {/* Same Background as Other Sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 overflow-hidden">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Floating 3D Shapes - Constrained to prevent overflow */}
        <motion.div
          className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-sky-500/10 dark:from-sky-500/20 to-cyan-500/10 dark:to-cyan-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 to-sky-600/10 dark:to-sky-600/20 rounded-full blur-3xl"
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t('testimonials.description')}
          </p>
        </motion.div>

        {/* Testimonials Grid - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-5 sm:p-6 flex flex-col"
            >
              {/* Quote Icon */}
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/20 rounded-lg flex-shrink-0">
                  <Quote className="text-sky-500 dark:text-sky-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                    {testimonial.company && ` @ ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t('testimonials.moreReferences')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
