'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Chatbot from './Chatbot'

export default function ChatbotFloatingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Show prompt after 3 seconds if chatbot is not open
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPrompt(true)
        // Hide prompt after 5 seconds
        setTimeout(() => setShowPrompt(false), 5000)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isOpen])

  const prompts = [
    "What do you want to know?",
    "How can Umair help you?",
    "Ask me anything!",
    "Let's chat!",
  ]

  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])

  useEffect(() => {
    if (showPrompt) {
      const interval = setInterval(() => {
        setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)])
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [showPrompt])

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60]">
        <AnimatePresence>
          {showPrompt && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-xl whitespace-nowrap max-w-[200px]"
            >
              <span>{currentPrompt}</span>
              <div className="absolute bottom-0 right-4 transform translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative bg-primary-600 dark:bg-primary-500 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group ${
            isOpen ? 'rotate-90' : ''
          }`}
          aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
          aria-expanded={isOpen}
        >
          <motion.div
            animate={{
              rotate: isOpen ? 90 : 0,
              scale: isOpen ? 0.8 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X size={24} className="transition-transform" />
            ) : (
              <Bot size={24} className="transition-transform group-hover:scale-110" />
            )}
          </motion.div>
          
          {/* Pulsing animation when closed */}
          {!isOpen && (
            <motion.span
              className="absolute inset-0 rounded-full bg-primary-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Notification dot */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-[50]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-4 sm:right-6 z-[60]">
            <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

