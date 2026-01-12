'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section id="testimonials" className="relative flex items-center justify-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Same Background as Other Sections */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
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

        {/* Floating 3D Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-sky-500/10 dark:from-sky-500/20 to-cyan-500/10 dark:to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 to-sky-600/10 dark:to-sky-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            What Clients Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Real feedback from startups, product teams, and industry experts I&apos;ve worked with.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-5 sm:p-6"
            >
              {/* Quote Icon */}
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/20 rounded-lg flex-shrink-0">
                  <Quote className="text-sky-500 dark:text-sky-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {testimonials[currentIndex].role}
                    {testimonials[currentIndex].company && ` @ ${testimonials[currentIndex].company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-gray-600 dark:text-gray-400" size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-gray-600 dark:text-gray-400" size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-sky-500 dark:bg-sky-400'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
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
            See more references on request
          </p>
        </motion.div>
      </div>
    </section>
  )
}
