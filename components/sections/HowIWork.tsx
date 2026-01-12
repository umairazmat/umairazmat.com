'use client'

import { motion } from 'framer-motion'

export default function HowIWork() {
  const processSteps = [
    {
      number: '01',
      title: 'Clarify requirements',
      description: 'Align on goals, constraints, and success metrics before implementation.',
    },
    {
      number: '02',
      title: 'Design architecture',
      description: 'Plan scalable system architecture upfront to avoid rewrites & technical debt.',
    },
    {
      number: '03',
      title: 'Ship in iterations',
      description: 'Deliver in clear milestones with frequent demos & feedback loops.',
    },
    {
      number: '04',
      title: 'Communicate async',
      description: 'Documented updates for remote and distributed teams.',
    },
    {
      number: '05',
      title: 'Production ownership',
      description: 'Stay involved until systems are stable post-launch.',
    },
  ]

  return (
    <section id="how-i-work" className="relative flex items-center justify-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Same Background as Section 2 (InstantProof) */}
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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            How I Work With Teams
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2">
            People don&apos;t just hire skills. They hire <strong className="text-sky-500 dark:text-sky-400">predictability</strong>.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            This section explains what happens after we start working together — no surprises, no confusion.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 sm:gap-6"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-500 dark:text-sky-400">
                  {step.number}
                </span>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Concluding Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Predictable delivery. Lower risk. Systems your team can confidently build on.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
