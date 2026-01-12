'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Code, Cloud, Zap, Shield, Layers, ShieldAlert } from 'lucide-react'

export default function InstantProof() {
  const approachPoints = [
    {
      icon: Layers,
      title: 'Modular, scalable system architecture',
    },
    {
      icon: Code,
      title: 'Clean, maintainable codebases',
    },
    {
      icon: Cloud,
      title: 'Cloud-ready deployments (AWS / GCP)',
    },
    {
      icon: Zap,
      title: 'AI-assisted development where it adds real value',
    },
    {
      icon: Shield,
      title: 'Ownership from requirements to production support',
    },
    {
      icon: ShieldAlert,
      title: 'Designed to reduce risk, not create it',
    },
  ]

  return (
    <section id="approach" className="relative flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
        <div className="space-y-6 sm:space-y-8">
          {/* Opening - Problem → Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
              Why software tools fail and how I prevent it
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
              Most software fails because of unclear architecture, rushed decisions, or systems that don&apos;t scale beyond the first users.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I build <strong className="text-sky-500 dark:text-sky-400">production-grade applications</strong> with full-stack ownership from architecture and APIs to cloud deployment designed to support real usage and long-term growth.
            </p>
          </motion.div>

          {/* How I Work Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              My approach
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {approachPoints.map((point, index) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-shrink-0 p-2 bg-sky-100 dark:bg-sky-900/20 rounded-lg">
                      <Icon className="text-sky-500 dark:text-sky-400" size={20} />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {point.title}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Optional Light Proof Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm pt-2"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
              <CheckCircle2 className="text-sky-500 dark:text-sky-400" size={14} />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Production systems deployed
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
              <CheckCircle2 className="text-sky-500 dark:text-sky-400" size={14} />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Remote-first, async work experience
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
              <CheckCircle2 className="text-sky-500 dark:text-sky-400" size={14} />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                2+ years working on live systems
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
