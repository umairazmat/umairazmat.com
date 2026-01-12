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
    id: 'aws-restart',
    institution: 'AWS re/Start',
    degree: 'Cloud Computing & AWS Certification',
    field: 'Cloud Computing, AWS Services, DevOps',
    period: '2023 - 2024',
    grade: 'Completed',
    type: 'training',
    achievements: [
      'AWS Cloud Practitioner Certification',
      'Hands-on experience with AWS core services',
    ],
    coursework: [
      'AWS Core Services: EC2, S3, Lambda, RDS',
      'Cloud Architecture & Design Patterns',
      'DevOps: CI/CD, Infrastructure as Code',
      'Security: IAM, VPC, CloudWatch',
      'Serverless Computing & Containers',
    ],
    skills: ['AWS', 'Cloud Computing', 'DevOps', 'CI/CD', 'Infrastructure as Code', 'Serverless', 'Docker', 'Linux'],
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

interface EducationProps {
  hideHeading?: boolean
}

export default function Education({ hideHeading = false }: EducationProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'university' | 'training' | 'school'>('training')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const educationText = `Education: Government College University, Faisalabad. Bachelor of Software Engineering with CGPA 3.78 out of 4.00, Grade A+. Silver Medalist, 2nd Position in Department of Software Engineering.`

  const gcuEducation = educationItems.find((e) => e.id === 'gcu-faisalabad')!
  const filteredItems = educationItems.filter((e) => e.type === activeTab && e.id !== 'gcu-faisalabad')

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="education" className="transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {!hideHeading && (
          <>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <GraduationCap size={24} className="sm:w-8 sm:h-8 text-sky-500 dark:text-sky-400" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
                {t('education.title', 'Education')} <span className="text-sky-500 dark:text-sky-400">{t('education.background', 'Background')}</span>
              </h2>
              <TextToSpeech text={educationText} sectionId="education" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
              {t('education.description', 'Academic achievements and educational foundation that shaped my software engineering career.')}
            </p>
          </>
        )}

        {/* Featured University Education - GCUF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border-2 border-sky-200/50 dark:border-sky-700/50"
        >
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* University Logo/Icon - Featured */}
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-sky-500 dark:bg-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap size={40} className="sm:w-14 sm:h-14 md:w-14 md:h-14 text-white" />
              </div>
            </div>

            {/* Education Details */}
            <div className="flex-1">
              <div className="mb-3 sm:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {gcuEducation.institution}
                    </h3>
                    <p className="text-lg sm:text-xl text-sky-500 dark:text-sky-400 font-semibold mb-1 line-clamp-1">
                      {gcuEducation.degree}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-1">
                      {gcuEducation.field}
                    </p>
                  </div>
                  <div className="px-2 sm:px-3 py-1 bg-sky-500 dark:bg-sky-600 text-white rounded-full text-[10px] sm:text-xs font-bold flex-shrink-0 self-start">
                    FEATURED
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <BookOpen size={14} className="sm:w-4 sm:h-4" />
                    {gcuEducation.period}
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <Award size={14} className="sm:w-4 sm:h-4" />
                    Grade: {gcuEducation.grade}
                  </span>
                </div>
              </div>

              {/* CGPA and Achievement Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg border border-sky-200/30 dark:border-sky-700/30">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <Trophy size={16} className="sm:w-4.5 sm:h-4.5 text-sky-500 dark:text-sky-400" />
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">CGPA</h4>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-sky-500 dark:text-sky-400">
                    3.78 / 4.00
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">(A+)</p>
                </div>

                <div className="p-2 sm:p-3 rounded-lg border border-sky-200/30 dark:border-sky-700/30">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <Medal size={16} className="sm:w-4.5 sm:h-4.5 text-sky-500 dark:text-sky-400" />
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">Achievement</h4>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    Silver Medalist 🥈
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">2nd Position</p>
                </div>
              </div>

              {/* Achievements - Compact */}
              <div className="mb-3 sm:mb-4">
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <Trophy size={14} className="sm:w-4 sm:h-4 text-sky-500 dark:text-sky-400" />
                  {t('education.achievements', 'Achievements')}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {gcuEducation.achievements?.slice(0, 3).map((achievement, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-sky-100/50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded-lg text-[10px] sm:text-xs font-medium border border-sky-200/50 dark:border-sky-700/50"
                    >
                      {achievement.split(':')[0]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Coursework - Compact */}
              <div>
                <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <BookOpen size={14} className="sm:w-4 sm:h-4 text-sky-500 dark:text-sky-400" />
                  {t('education.keyCoursework', 'Key Coursework')}
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {gcuEducation.coursework?.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 sm:px-2 py-0.5 text-gray-700 dark:text-gray-300 rounded text-[10px] sm:text-xs border border-sky-200/30 dark:border-sky-700/30"
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
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6 px-2">
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
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                  activeTab === tab.key
                    ? 'bg-sky-500 text-white dark:bg-sky-600'
                    : 'border border-sky-200/50 dark:border-sky-700/50 text-gray-800 dark:text-gray-300 hover:border-sky-300 dark:hover:border-sky-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Other Education Items - Compact Accordion */}
          <div className="space-y-3 sm:space-y-4">
            {filteredItems.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`rounded-xl p-4 sm:p-5 border-2 transition-all ${
                  edu.type === 'training' 
                    ? 'border-sky-400/50 dark:border-sky-500/50 hover:border-sky-500 dark:hover:border-sky-400 shadow-lg' 
                    : 'border-gray-200/30 dark:border-gray-700/30 hover:border-sky-300/50 dark:hover:border-sky-600/50'
                }`}
              >
                <button
                  onClick={() => toggleExpand(edu.id)}
                  className="w-full flex items-center justify-between gap-2 sm:gap-4 text-left focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-lg"
                  aria-expanded={expandedId === edu.id}
                >
                  <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                      edu.type === 'training' 
                        ? 'bg-sky-500/20 dark:bg-sky-500/30' 
                        : 'bg-sky-100/30 dark:bg-sky-900/20'
                    }`}>
                      {edu.type === 'training' ? (
                        <Medal size={20} className="sm:w-6 sm:h-6 text-sky-500 dark:text-sky-400" />
                      ) : (
                        <School size={20} className="sm:w-6 sm:h-6 text-sky-500 dark:text-sky-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-gray-900 dark:text-white mb-1 sm:mb-1.5 line-clamp-1 ${
                        edu.type === 'training' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                      }`}>
                        {edu.institution}
                      </h3>
                      <p className={`text-sky-500 dark:text-sky-400 font-medium mb-1 sm:mb-1.5 line-clamp-1 ${
                        edu.type === 'training' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                      }`}>
                        {edu.degree}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="line-clamp-1">{edu.period}</span>
                        <span>•</span>
                        <span className="line-clamp-1">{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 transition-transform ${
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
                                  <div className="w-1 h-1 bg-sky-500 rounded-full mt-1.5 flex-shrink-0" />
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
                                  className="px-2 py-0.5 text-gray-700 dark:text-gray-300 rounded text-xs border border-sky-200/30 dark:border-sky-700/30"
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
                                  className="px-1.5 py-0.5 text-gray-600 dark:text-gray-400 rounded text-[10px] border border-sky-200/30 dark:border-sky-700/30"
                                >
                                  {skill}
                                </span>
                              ))}
                              {edu.skills.length > 6 && (
                                <span className="px-1.5 py-0.5 text-gray-600 dark:text-gray-400 rounded text-[10px] border border-sky-200/30 dark:border-sky-700/30">
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
