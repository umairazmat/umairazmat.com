'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Lock, Zap } from 'lucide-react'
import { personalInfo } from '@/constants'

type ProjectCategory = 'enterprise' | 'ai'

interface EnterpriseProject {
  id: string
  title: string
  domain: string
  problem: string
  built: string[]
  tech: string[]
}

interface AIProject {
  id: string
  title: string
  problem: string
  solution: string
  impact: string[]
  tech: string[]
}

const enterpriseProjects: EnterpriseProject[] = [
  {
    id: 'ev-csms',
    title: 'EV Charging Station Management System (CSMS)',
    domain: 'Electric Mobility / Smart Infrastructure',
    problem: 'EV users needed a reliable, real-time way to discover, interact with, and manage charging stations at scale.',
    built: [
      'Map-based EV charger discovery',
      'Real-time station interaction via chat',
      'Scalable frontend and API integration',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB'],
  },
  {
    id: 'ev-diagnostics',
    title: 'EV Diagnostics & Telemetry Platform',
    domain: 'Automotive / Embedded Systems',
    problem: 'High-frequency EV diagnostic data required accurate fault detection and real-time monitoring.',
    built: [
      'Live telemetry dashboards',
      'FDR data parsing & visualization pipelines',
    ],
    tech: ['React Vite', 'TypeScript', 'FastAPI', 'Custom Plot Library', 'WebSockets'],
  },
  {
    id: 'real-estate',
    title: 'Enterprise Real Estate Platform',
    domain: 'Property Tech / Enterprise SaaS',
    problem: 'Multiple property verticals and user workflows needed to be unified into a single scalable platform.',
    built: [
      'Modular property listings & agent systems',
      'Scalable frontend architecture supporting growth',
    ],
    tech: ['Angular', 'Node.js', 'REST APIs'],
  },
]

const aiProjects: AIProject[] = [
  {
    id: 'ielts-master',
    title: 'IELTS Bands Master',
    problem: 'Students lacked accurate, personalized feedback for IELTS writing improvement.',
    solution: 'AI system evaluating grammar, coherence, vocabulary, and idea formation.',
    impact: [
      '500+ active users',
      '92% evaluation accuracy',
    ],
    tech: ['Python', 'Streamlit', 'Transformers'],
  },
  {
    id: 'rescure',
    title: 'Rescure — AI First Aid Assistant',
    problem: 'In emergencies, users struggle to take correct immediate action.',
    solution: 'AI-powered mobile app analyzing accident images and delivering step-by-step first aid guidance.',
    impact: [
      'Cross-platform mobile deployment',
      'Real-time AI-driven instructions',
    ],
    tech: ['React Native', 'AI Models'],
  },
  {
    id: 'code-mentor',
    title: 'Code Mentor — AI Code Review Tool',
    problem: 'Code reviews are slow, inconsistent, and costly in distributed teams.',
    solution: 'AI-powered automated code review and refactoring assistant.',
    impact: [
      '1000+ code reviews processed',
      'Tested by multiple developers in real workflows',
    ],
    tech: ['Python', 'Streamlit', 'Claude'],
  },
]

export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('enterprise')

  return (
    <section id="projects" className="relative flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Same Background as Hero */}
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
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Selected Work
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Real-world systems built for scale, reliability, and real users — across enterprise platforms and AI-powered products.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex justify-center gap-2 mb-4 sm:mb-6"
        >
          <button
            onClick={() => setActiveTab('enterprise')}
            className={`px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'enterprise'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
            }`}
          >
            Enterprise & Industry Systems
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeTab === 'ai'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
            }`}
          >
            AI & GenAI Products
          </button>
        </motion.div>

        {/* Projects Content - 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
          {activeTab === 'enterprise' && (
            <>
              {enterpriseProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Lock className="text-sky-500 dark:text-sky-400 mt-0.5 flex-shrink-0" size={14} />
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1">
                        {project.title}
                      </h3>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        Domain: {project.domain}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="font-semibold text-sky-500 dark:text-sky-400 mb-0.5">Problem</div>
                      <p className="text-gray-700 dark:text-gray-300">{project.problem}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-0.5">What I Built</div>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-0.5">
                        {project.built.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">Tech:</span>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}

          {activeTab === 'ai' && (
            <>
              {aiProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="text-sky-500 dark:text-sky-400 mt-0.5 flex-shrink-0" size={14} />
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="font-semibold text-sky-500 dark:text-sky-400 mb-0.5">Problem</div>
                      <p className="text-gray-700 dark:text-gray-300">{project.problem}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Solution</div>
                      <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white mb-0.5">Impact</div>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-0.5">
                        {project.impact.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-[10px] text-gray-500 dark:text-gray-500 font-medium">Tech:</span>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Trust Line - NDA Notice */}
        {activeTab === 'enterprise' && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-4"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Due to NDAs, code and live links are not public. Architecture and implementation walkthroughs are available on request.
            </p>
          </motion.div>
        )}

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center pt-4"
        >
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
            Want to see how these systems were designed and shipped?
            <br />
            Schedule a call to walk through architecture, tradeoffs, and decisions.
          </p>
          <a
            href={personalInfo.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-sky-500/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Schedule a Call
            <Calendar size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
