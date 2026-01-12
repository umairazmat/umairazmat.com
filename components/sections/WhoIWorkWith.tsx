'use client'

import { motion } from 'framer-motion'
import { Rocket, Users, Shield, Code, XCircle } from 'lucide-react'

export default function WhoIWorkWith() {
  const idealClients = [
    {
      icon: Rocket,
      title: 'Early-stage startups shipping MVP → scaling products',
    },
    {
      icon: Users,
      title: 'Remote engineering teams needing ownership',
    },
    {
      icon: Code,
      title: 'Product teams maintaining live systems',
    },
    {
      icon: Shield,
      title: 'Founders who value long-term stability over shortcuts',
    },
  ]

  const notGoodFit = [
    'You want "just UI" with no backend or architecture thinking',
    'You want rushed delivery without planning',
    'You don\'t care about maintainability, scalability, or long-term stability',
    "You are not open to feedback or collaboration during the development process",
  ]

  return (
    <section id="who-i-work-with" className="relative flex items-center justify-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            Who I Work With
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic">
            &quot;He&apos;s talking to me.&quot;
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Ideal Clients */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ideal Clients / Teams
            </h3>
            {idealClients.map((client, index) => {
              const Icon = client.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900/20 border-2 border-sky-500/30 dark:border-sky-500/20 flex items-center justify-center">
                      <Icon className="text-sky-500 dark:text-sky-400" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">
                      {client.title}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Column - Not a Good Fit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Not a Good Fit If
            </h3>
            {notGoodFit.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 border-2 border-red-500/30 dark:border-red-500/20 flex items-center justify-center">
                    <XCircle className="text-red-500 dark:text-red-400" size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">
                    {item}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
