'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Award, BookOpen, Trophy, Medal, School, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TextToSpeech from '@/components/TextToSpeech'

interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  grade: string
  achievements?: string[]
  coursework?: string[]
  skills?: string[]
  type: 'university' | 'training' | 'school'
}

const educationItems: EducationItem[] = [
  {
    id: 'gcu-faisalabad',
    institution: 'Government College University, Faisalabad',
    degree: 'Bachelor of Software Engineering',
    field: 'Software Engineering, Computer Software Engineering',
    period: 'Sep 2019 - Aug 2023',
    grade: 'A+',
    type: 'university',
    achievements: [
      'CGPA: 3.78 / 4.00 (A+) — Silver Medalist 🥈',
      '2nd Position — Department of Software Engineering',
      'Scholarship: Full scholarship from the Government of Punjab',
      'Leadership: Class Representative; Founded a student tech society',
      'Academic Excellence: Achieved 4.00 CGPA in two semesters',
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Databases',
      'Artificial Intelligence',
      'Software Engineering',
    ],
    skills: ['Algorithms', 'HTML', 'React.js', 'CSS', 'GitHub', 'Next.js', 'Data Structures', 'APIs', 'JavaScript'],
  },
  {
    id: 'pftp',
    institution: 'Professional Freelancing Training Program',
    degree: 'Full Stack Web Development',
    field: 'Full Stack Web Development, Computer Software Engineering',
    period: 'Jun 2022 - Oct 2022',
    grade: 'A+',
    type: 'training',
    achievements: [
      'Grade: A+ Gold Medal 🏅 & Cash Prize',
    ],
    coursework: [
      'Frontend: HTML, CSS, JavaScript, React, Angular',
      'Backend: Node.js, REST APIs, MongoDB, MySQL',
      'Deployment: Vercel, Heroku',
      'Version control: Git & GitHub',
    ],
    skills: ['Algorithms', 'HTML', 'React.js', 'CSS', 'GitHub', 'Next.js', 'Data Structures', 'APIs', 'JavaScript'],
  },
  {
    id: 'smit',
    institution: 'Saylani Mass IT Training Program',
    degree: 'Web and Mobile Application Development',
    field: 'Web and Mobile Application Development, Computer Software Engineering',
    period: 'Sep 2021 - Aug 2022',
    grade: 'Taught by Sir Naveed Sarwar, CEO Techloset Solutions',
    type: 'training',
    coursework: [
      'JavaScript, React.js, Node.js, Express.js',
      'MongoDB, Firebase, Redux, REST APIs',
      'Git, GitHub, Cloud Firestore',
      'Instructor: Naveed Sarwar (CEO, Techloset Solutions)',
    ],
    skills: ['Algorithms', 'HTML', 'React.js', 'CSS', 'GitHub', 'Next.js', 'Data Structures', 'APIs', 'JavaScript'],
  },
  {
    id: 'unique-group',
    institution: 'Unique Group of Institutions',
    degree: 'High School Diploma',
    field: 'Computer Science',
    period: '2017 - 2019',
    grade: 'A+',
    type: 'school',
    coursework: [
      'Mathematics',
      'Physics',
      'Computer',
    ],
  },
  {
    id: 'al-barakah',
    institution: 'Al-Barakah School',
    degree: 'Matric',
    field: 'Computer Science',
    period: '2005 - 2017',
    grade: 'A+',
    type: 'school',
    coursework: [
      'Mathematics',
      'Physics',
      'Computer',
    ],
  },
]

export default function Education() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'university' | 'training' | 'school'>('university')
  const [expandedId, setExpandedId] = useState<string | null>('gcu-faisalabad')

  const educationText = `Education: Government College University, Faisalabad. Bachelor of Software Engineering with CGPA 3.78 out of 4.00, Grade A+. Silver Medalist, 2nd Position in Department of Software Engineering.`

  const gcuEducation = educationItems.find((e) => e.id === 'gcu-faisalabad')!
  const filteredItems = educationItems.filter((e) => e.type === activeTab && e.id !== 'gcu-faisalabad')

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="education" className="section-container bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <GraduationCap size={32} className="text-primary-600 dark:text-primary-400" />
          <h2 className="text-4xl font-bold text-center">
            {t('education.title', 'Education')} <span className="gradient-text">{t('education.background', 'Background')}</span>
          </h2>
          <TextToSpeech text={educationText} sectionId="education" />
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {t('education.description', 'Academic achievements and educational foundation that shaped my software engineering career.')}
        </p>

        {/* Featured University Education - GCUF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card mb-8 border-2 border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50/50 dark:from-primary-900/10 to-white dark:to-gray-800"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* University Logo/Icon - Featured */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 bg-primary-600 dark:bg-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap size={56} className="text-white" />
              </div>
            </div>

            {/* Education Details */}
            <div className="flex-1">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {gcuEducation.institution}
                    </h3>
                    <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-1">
                      {gcuEducation.degree}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {gcuEducation.field}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={16} />
                    {gcuEducation.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award size={16} />
                    Grade: {gcuEducation.grade}
                  </span>
                </div>
              </div>

              {/* CGPA and Achievement Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-primary-200 dark:border-primary-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy size={18} className="text-primary-600 dark:text-primary-400" />
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">CGPA</h4>
                  </div>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    3.78 / 4.00
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">(A+)</p>
                </div>

                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-primary-200 dark:border-primary-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Medal size={18} className="text-primary-600 dark:text-primary-400" />
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Achievement</h4>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Silver Medalist 🥈
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2nd Position</p>
                </div>
              </div>

              {/* Achievements - Compact */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Trophy size={16} className="text-primary-600 dark:text-primary-400" />
                  {t('education.achievements', 'Achievements')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {gcuEducation.achievements?.slice(0, 3).map((achievement, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-xs font-medium border border-primary-200 dark:border-primary-800"
                    >
                      {achievement.split(':')[0]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Coursework - Compact */}
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <BookOpen size={16} className="text-primary-600 dark:text-primary-400" />
                  {t('education.keyCoursework', 'Key Coursework')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {gcuEducation.coursework?.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-200 dark:border-gray-600"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs for Other Education */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              { key: 'training' as const, label: t('education.training', 'Training Programs') },
              { key: 'school' as const, label: t('education.school', 'School Education') },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setExpandedId(null)
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Other Education Items - Compact Accordion */}
          <div className="space-y-3">
            {filteredItems.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="card p-4"
              >
                <button
                  onClick={() => toggleExpand(edu.id)}
                  className="w-full flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={expandedId === edu.id}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex-shrink-0">
                      {edu.type === 'training' ? (
                        <Medal size={20} className="text-primary-600 dark:text-primary-400" />
                      ) : (
                        <School size={20} className="text-primary-600 dark:text-primary-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1 line-clamp-1">
                        {edu.degree}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                        <span>{edu.period}</span>
                        <span>•</span>
                        <span>Grade: {edu.grade}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 flex-shrink-0 transition-transform ${
                      expandedId === edu.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedId === edu.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="space-y-3">
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-1.5">
                              {t('education.achievements', 'Achievements')}
                            </h4>
                            <ul className="space-y-1">
                              {edu.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-1.5">
                                  <div className="w-1 h-1 bg-primary-600 rounded-full mt-1.5 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {edu.coursework && edu.coursework.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-1.5">
                              {t('education.coursework', 'Coursework')}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {edu.coursework.map((course, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {edu.skills && edu.skills.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-1.5">
                              {t('education.skills', 'Skills')}
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {edu.skills.slice(0, 6).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-[10px]"
                                >
                                  {skill}
                                </span>
                              ))}
                              {edu.skills.length > 6 && (
                                <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-[10px]">
                                  +{edu.skills.length - 6}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
