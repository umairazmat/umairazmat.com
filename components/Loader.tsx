'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const flagsRef = useRef({ isPageLoaded: false, minTimerFinished: false })

  useEffect(() => {
    // Reset loader state on route change
    setIsLoading(true)
    flagsRef.current = { isPageLoaded: false, minTimerFinished: false }
    
    // Prevent body scroll and hide all content during loader
    document.body.style.overflow = 'hidden'
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.style.opacity = '0'
      mainContent.style.pointerEvents = 'none'
    }
    const navbar = document.querySelector('nav')
    const footer = document.querySelector('footer')
    if (navbar) navbar.style.opacity = '0'
    if (footer) footer.style.opacity = '0'

    const checkAndHide = () => {
      if (flagsRef.current.isPageLoaded && flagsRef.current.minTimerFinished) {
        setIsLoading(false)
        document.body.style.overflow = ''
        // Show content with smooth fade-in
        setTimeout(() => {
          if (mainContent) {
            mainContent.style.transition = 'opacity 0.5s ease-in-out'
            mainContent.style.opacity = '1'
            mainContent.style.pointerEvents = 'auto'
          }
          if (navbar) {
            navbar.style.transition = 'opacity 0.5s ease-in-out'
            navbar.style.opacity = '1'
          }
          if (footer) {
            footer.style.transition = 'opacity 0.5s ease-in-out'
            footer.style.opacity = '1'
          }
        }, 100)
      }
    }

    const handleLoad = () => {
      flagsRef.current.isPageLoaded = true
      checkAndHide()
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      flagsRef.current.isPageLoaded = true
    } else {
      window.addEventListener('load', handleLoad)
    }

    // Minimum display time for loader (1.5 seconds) to show animation
    const minTimer = setTimeout(() => {
      flagsRef.current.minTimerFinished = true
      checkAndHide()
    }, 1500)

    return () => {
      window.removeEventListener('load', handleLoad)
      clearTimeout(minTimer)
      document.body.style.overflow = ''
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] bg-gray-50 dark:bg-gray-900 overflow-hidden"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
          {/* Animated Background - Same as Homepage */}
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
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-sky-400/5 dark:from-sky-400/10 to-cyan-400/5 dark:to-cyan-400/10 rounded-full blur-2xl"
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Animated Particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-sky-500 dark:bg-sky-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Loader Content - Perfectly Centered */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 w-full h-full">
            {/* Animated Logo/Name */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: 0.2,
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="h-16 w-16 rounded-full border-4 border-sky-200 dark:border-sky-800 border-t-sky-500 dark:border-t-sky-400"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-sky-500 dark:text-sky-400">U</span>
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
              }}
              className="flex flex-col items-center space-y-2"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                }}
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                Umair Azmat
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1,
                }}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Full-Stack Software Engineer
              </motion.p>
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.2,
              }}
              className="flex space-x-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

