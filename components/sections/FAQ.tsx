'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

const faqs: FAQItem[] = [
  {
    id: 'experience',
    question: 'How many years of experience do you have?',
    answer: 'I have 4+ years of professional experience in full-stack software development, working with technologies like React, Next.js, Node.js, Python, and cloud platforms like AWS.',
    category: 'General',
  },
  {
    id: 'availability',
    question: 'Are you available for remote work?',
    answer: 'Yes, I am available for remote work opportunities. I have extensive experience working in remote, Agile teams and am comfortable with async communication and full feature ownership.',
    category: 'Availability',
  },
  {
    id: 'tech-stack',
    question: 'What is your preferred tech stack?',
    answer: 'My preferred tech stack includes MERN (MongoDB, Express, React, Node.js), Next.js, TypeScript, Python, FastAPI, and AWS Cloud services. I also work with Angular, Tailwind CSS, and various databases.',
    category: 'Technical',
  },
  {
    id: 'projects',
    question: 'What types of projects have you worked on?',
    answer: 'I have worked on diverse projects including e-commerce platforms, 3D e-commerce websites, EV charging station management systems, AI-powered applications, internal enterprise tools, and educational platforms.',
    category: 'Projects',
  },
  {
    id: 'response-time',
    question: 'What is your typical response time?',
    answer: 'I typically respond within 24 hours. For urgent matters, I can respond faster. Feel free to reach out via email, WhatsApp, or schedule a call through the appointment system.',
    category: 'Communication',
  },
  {
    id: 'certifications',
    question: 'What certifications do you hold?',
    answer: 'I hold multiple certifications including AWS re/Start Graduate, Stanford Code in Place Mentor, IBM Full Stack Software Developer Specialization, Meta Front-End Developer Specialization, and various hackathon certificates from lablab.ai, NASA Space Apps, and more.',
    category: 'Certifications',
  },
  {
    id: 'location',
    question: 'Where are you located?',
    answer: 'I am located in Lahore, Punjab, Pakistan (PKT - UTC+5). I am available for remote work globally and can accommodate different time zones.',
    category: 'General',
  },
  {
    id: 'education',
    question: 'What is your educational background?',
    answer: 'I have a Bachelor of Software Engineering from Government College University Faisalabad with a CGPA of 3.78/4.00. I was a Silver Medalist (2nd Position) in the Department of Software Engineering and achieved 3× perfect 4.0 GPA across multiple semesters.',
    category: 'Education',
  },
  {
    id: 'collaboration',
    question: 'How do you prefer to collaborate?',
    answer: 'I prefer remote-first collaboration with async communication. I work well in Agile/Scrum teams, take full feature ownership, and am comfortable with tools like Jira, Trello, Notion, and Git for version control.',
    category: 'Work Style',
  },
  {
    id: 'ai-experience',
    question: 'Do you have experience with AI/ML?',
    answer: 'Yes, I have extensive experience with AI-assisted development, Generative AI, LLMs, and have participated in multiple AI hackathons. I have built AI-powered applications using OpenAI API, Streamlit, and various AI frameworks.',
    category: 'Technical',
  },
]

export default function FAQ() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...new Set(faqs.map((faq) => faq.category).filter((cat): cat is string => !!cat))]

  const filteredFAQs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory)

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <HelpCircle size={32} className="text-primary-600 dark:text-primary-400" />
          <h2 className="text-4xl font-bold text-center">
            {t('faq.title', 'Frequently Asked')} <span className="gradient-text">{t('faq.questions', 'Questions')}</span>
          </h2>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {t('faq.description', 'Find answers to common questions about my experience, availability, and services.')}
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setOpenId(null)
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="card"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between gap-4 text-left p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {faq.question}
                  </h3>
                  {faq.category && (
                    <span className="text-xs text-primary-600 dark:text-primary-400">
                      {faq.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <TextToSpeech
                    text={`${faq.question}. ${faq.answer}`}
                    sectionId={`faq-${faq.id}`}
                  />
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <div className="flex items-start gap-3">
                        <TextToSpeech
                          text={faq.answer}
                          sectionId={`faq-answer-${faq.id}`}
                          className="mt-1"
                        />
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            {t('faq.noFAQs', 'No FAQs found in this category.')}
          </p>
        )}
      </motion.div>
    </section>
  )
}

