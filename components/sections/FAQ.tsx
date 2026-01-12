'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Calendar, Mail } from 'lucide-react'
import { personalInfo } from '@/constants'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What is your pricing model?',
      answer: 'I work on hourly, daily, or fixed-price project agreements, depending on project scope and client needs.',
    },
    {
      question: 'Do you sign NDAs?',
      answer: 'Yes, I am happy to sign NDAs to ensure your project and data remain secure.',
    },
    {
      question: 'Can you work with remote teams?',
      answer: 'Absolutely. I specialize in remote-first, async-friendly workflows across time zones.',
    },
    {
      question: 'What time zones do you work in?',
      answer: 'I\'m flexible and can coordinate with clients in UTC ±12, with priority for Europe, USA, and Asia collaborations.',
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'MVPs usually take 4–6 weeks. Full-scale systems depend on complexity; I provide clear milestones upfront.',
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes, I stay involved until systems are stable post-launch and offer optional maintenance plans.',
    },
    {
      question: 'Which tech stacks do you specialize in?',
      answer: 'React, Next.js, Node.js, TypeScript, MERN stack, FastAPI, AWS/GCP cloud, and AI-assisted solutions.',
    },
    {
      question: 'Can you integrate AI features into projects?',
      answer: 'Yes, I build AI/ML-powered features where it adds real business value, using LLMs, OpenAI APIs, and custom models.',
    },
    {
      question: 'How do you communicate with clients?',
      answer: 'Via async updates, Slack, email, or video calls. I document progress and maintain transparency at all stages.',
    },
    {
      question: 'What types of projects do you take?',
      answer: 'Startups shipping MVPs, enterprise platforms, remote team collaborations, AI-powered tools, or scalable web applications.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Split FAQs into two columns
  const leftColumn = faqs.slice(0, 5)
  const rightColumn = faqs.slice(5, 10)

  return (
    <section className="relative flex items-center justify-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Answers to common questions about working with me, project timelines, and remote collaboration.
          </p>
        </motion.div>

        {/* Two-Column FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-3">
            {leftColumn.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="text-sky-500 dark:text-sky-400" size={18} />
                    ) : (
                      <Plus className="text-gray-400 dark:text-gray-500" size={18} />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {rightColumn.map((faq, index) => {
              const actualIndex = index + 5
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 5) * 0.05, duration: 0.4 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(actualIndex)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openIndex === actualIndex ? (
                        <Minus className="text-sky-500 dark:text-sky-400" size={18} />
                      ) : (
                        <Plus className="text-gray-400 dark:text-gray-500" size={18} />
                      )}
                    </div>
                  </button>
                  {openIndex === actualIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Still have questions?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={personalInfo.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-sky-500/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Schedule a Call
              <Calendar size={14} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white dark:text-sky-400 dark:hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Send a Message
              <Mail size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
