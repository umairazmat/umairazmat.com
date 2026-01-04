'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/constants'

export default function About() {
  return (
    <section id="about" className="section-container bg-white transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 text-center">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>{personalInfo.about.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {personalInfo.about.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                <p>{highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

