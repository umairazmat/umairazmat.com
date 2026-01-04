'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const flagsRef = useRef({ isPageLoaded: false, minTimerFinished: false })

  useEffect(() => {
    // Prevent body scroll during loader
    document.body.style.overflow = 'hidden'

    const checkAndHide = () => {
      if (flagsRef.current.isPageLoaded && flagsRef.current.minTimerFinished) {
        setIsLoading(false)
        document.body.style.overflow = ''
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
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
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
                className="h-16 w-16 rounded-full border-4 border-primary-200 border-t-primary-600"
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
                <span className="text-2xl font-bold text-primary-600">U</span>
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
                className="text-xl font-semibold text-gray-700"
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
                className="text-sm text-gray-500"
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
                  className="h-2 w-2 rounded-full bg-primary-600"
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

