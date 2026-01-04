'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Mic, MicOff, Loader2 } from 'lucide-react'
import { personalInfo, experiences, projects, skills } from '@/constants'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm ${personalInfo.name}'s AI assistant. I can help you learn about his experience, projects, skills, and more. What would you like to know?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Initialize Web Speech API if available
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
        handleSend(transcript)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }
    }
  }, [])

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

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-sm text-primary-100">Ask me anything!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Close chatbot"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <Loader2 className="animate-spin" size={20} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label="Voice input"
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isProcessing}
                  className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Try: "Tell me about your experience" or "What projects have you built?"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

