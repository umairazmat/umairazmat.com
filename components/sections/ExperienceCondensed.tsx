'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { experiences } from '@/constants'
import Link from 'next/link'

export default function ExperienceCondensed() {
  // Show only professional roles (exclude training/teaching)
  const professionalRoles = experiences.filter(
    exp => exp.company === 'Venturetronics' || exp.company === 'Powersoft19'
  )

  return (
    <section id="experience" className="section-container bg-gray-100 dark:bg-gray-800 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Building production systems for real-world applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {professionalRoles.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-6 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                    {exp.company}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(exp.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        - {exp.endDate === 'Present' ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact-Focused Bullets */}
              <ul className="space-y-2 mb-4">
                {exp.company === 'Venturetronics' && (
                  <>
                    <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>Contributed to enterprise systems handling real-time API integrations and WebSocket-based dashboards</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>Enabled faster reporting and improved system reliability for EV charging diagnostic systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>Delivered scalable solutions within Agile teams for high-performance production systems</span>
                    </li>
                  </>
                )}
                {exp.company === 'Powersoft19' && (
                  <>
                    <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>Built production e-commerce platforms and 3D e-commerce websites serving real customers</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>Delivered charging station management systems with robust backend APIs and real-time features</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>Created internal tools that optimized workflows and improved team productivity</span>
                    </li>
                  </>
                )}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 5 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                    +{exp.technologies.length - 5}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Experience Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm sm:text-base"
          >
            View Full Experience
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
