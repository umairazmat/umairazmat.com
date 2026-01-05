'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Mic, MicOff, Loader2 } from 'lucide-react'
import { personalInfo, experiences, projects, skills } from '@/constants'
import { useTranslation } from 'react-i18next'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatbotProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Chatbot({ isOpen: externalIsOpen, onClose }: ChatbotProps = {}) {
  const { t } = useTranslation()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = onClose || setInternalIsOpen
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: t('chatbot.initialMessage'),
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (message?: string) => {
    const userMessage = message || input.trim()
    if (!userMessage) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setIsProcessing(true)

    // Simulate AI response (in production, this would call an API)
    setTimeout(() => {
      const response = generateResponse(userMessage)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)
    }, 1000)
  }

  useEffect(() => {
    // Initialize Web Speech API if available
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
        handleSend(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    // Experience queries
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      const expList = experiences
        .map((exp) => `• ${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate})`)
        .join('\n')
      return `Here's ${personalInfo.name}'s professional experience:\n\n${expList}\n\nWould you like to know more about any specific role?`
    }

    // Project queries
    if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('created')) {
      const projectList = projects
        .slice(0, 3)
        .map((p) => `• ${p.title}: ${p.description}`)
        .join('\n')
      return `Here are some featured projects:\n\n${projectList}\n\nWould you like details about any specific project?`
    }

    // Skills queries
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('tech stack')) {
      const skillCategories = Object.entries(
        skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = []
          acc[skill.category].push(skill.name)
          return acc
        }, {} as Record<string, string[]>)
      )
        .map(([category, items]) => `${category}: ${items.slice(0, 5).join(', ')}`)
        .join('\n')
      return `Here are the main skill categories:\n\n${skillCategories}\n\nWhat specific technology are you interested in?`
    }

    // About queries
    if (lowerQuery.includes('about') || lowerQuery.includes('who') || lowerQuery.includes('tell me')) {
      return `${personalInfo.about.summary}\n\nKey highlights:\n${personalInfo.about.highlights.map((h) => `• ${h}`).join('\n')}`
    }

    // Contact queries
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach')) {
      return `You can reach ${personalInfo.name} at:\n\n📧 Email: ${personalInfo.email}\n🌍 Location: ${personalInfo.location}\n⏰ Response Time: ${personalInfo.responseTime}\n\nYou can also use the contact form or schedule a call via the availability widget!`
    }

    // Availability queries
    if (lowerQuery.includes('available') || lowerQuery.includes('hire') || lowerQuery.includes('remote')) {
      return `${personalInfo.name} is ${personalInfo.availability.toLowerCase()}!\n\n• Timezone: ${personalInfo.timezone}\n• Preferred Stack: ${personalInfo.preferredStack.join(', ')}\n• Response Time: ${personalInfo.responseTime}\n\nFeel free to reach out for opportunities!`
    }

    // Default response
    return `I can help you learn about:\n\n• Experience and work history\n• Projects and portfolio\n• Skills and technologies\n• Contact information\n• Availability for opportunities\n\nWhat would you like to know?`
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  // Only show toggle button if not externally controlled
  const showToggleButton = externalIsOpen === undefined

  return (
    <>
      {/* Chatbot Toggle Button - Only show if not externally controlled */}
      {showToggleButton && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative group hover:bg-primary-700"
            aria-label="Open chatbot"
          >
            {isOpen ? (
              <X size={24} className="transition-transform duration-200" />
            ) : (
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
              >
                <MessageCircle size={24} />
              </motion.div>
            )}
            {!isOpen && (
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
              <motion.div
                ref={chatWindowRef}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="w-[300px] sm:w-[340px] max-w-[calc(100vw-2rem)] h-[420px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700"
                role="dialog"
                aria-modal="true"
                aria-labelledby="chatbot-title"
                aria-describedby="chatbot-description"
              >
            {/* Header */}
            <div className="bg-primary-600 dark:bg-primary-700 text-white px-3 py-2 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={14} />
                </div>
                <div className="min-w-0">
                  <h3 id="chatbot-title" className="font-bold text-sm leading-tight">{t('chatbot.title')}</h3>
                  <p id="chatbot-description" className="text-[10px] text-primary-100 leading-tight">{t('chatbot.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 hover:bg-white/10 rounded-lg p-1 transition-colors flex-shrink-0"
                aria-label={t('chatbot.close')}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-primary-600 dark:bg-primary-700 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <p className="text-xs whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-[10px] mt-0.5 ${
                      message.role === 'user' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
                    <Loader2 className="animate-spin text-primary-600 dark:text-primary-400" size={20} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-2.5">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 px-2.5 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={toggleListening}
                  className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                  aria-label="Voice input"
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isProcessing}
                  className="btn-primary p-1.5 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center">
                Try: &quot;Experience&quot; or &quot;Projects&quot;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

