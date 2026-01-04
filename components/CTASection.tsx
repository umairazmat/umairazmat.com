'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Send } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ContactModal from './ContactModal'

interface CTASectionProps {
  variant?: 'whatsapp' | 'email' | 'chat'
  message?: string
  className?: string
}

const ctaVariants = {
  whatsapp: {
    icon: MessageCircle,
    text: 'Contact on WhatsApp',
    action: () => {
      const phoneNumber = personalInfo.phone?.replace(/\D/g, '') || '923217061116'
      const message = encodeURIComponent("Hi Umair, I'd like to connect...")
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    },
    bgColor: 'bg-green-50 hover:bg-green-100',
    textColor: 'text-green-700',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
  },
  email: {
    icon: Mail,
    text: 'Email Now',
    action: () => {
      // Will be handled by modal state
    },
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  chat: {
    icon: MessageCircle,
    text: 'Chat Now',
    action: () => {
      // Scroll to bottom where chatbot is
      setTimeout(() => {
        const chatbotTrigger = document.getElementById('chatbot-trigger')
        if (chatbotTrigger) {
          chatbotTrigger.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
        // Trigger chatbot button after scroll
        setTimeout(() => {
          const chatbotButton = document.querySelector('[aria-label="Open chatbot"]') as HTMLElement
          if (chatbotButton) {
            chatbotButton.click()
          }
        }, 500)
      }, 100)
    },
    bgColor: 'bg-primary-50 hover:bg-primary-100',
    textColor: 'text-primary-700',
    iconColor: 'text-primary-600',
    borderColor: 'border-primary-200',
  },
}

const defaultMessages = [
  "Let's work together!",
  'Want to discuss a project?',
  "Let's connect!",
  'Have a question?',
  "Let's build something amazing!",
]

export default function CTASection({
  variant = 'chat',
  message,
  className = '',
}: CTASectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ctaConfig = ctaVariants[variant]
  const Icon = ctaConfig.icon
  const displayMessage = message || defaultMessages[Math.floor(Math.random() * defaultMessages.length)]

  const handleClick = () => {
    if (variant === 'email') {
      setIsModalOpen(true)
    } else {
      if (ctaConfig.action) {
        ctaConfig.action()
      }
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`py-8 ${className}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleClick}
            className={`w-full rounded-lg border-2 ${ctaConfig.borderColor} ${ctaConfig.bgColor} ${ctaConfig.textColor} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col items-center gap-3 group`}
          >
            <div className={`flex items-center gap-3 ${ctaConfig.iconColor}`}>
              <Icon size={24} className="transition-transform group-hover:scale-110" />
              <span className="font-semibold text-lg">{displayMessage}</span>
            </div>
            <span className="text-sm opacity-80 font-medium">{ctaConfig.text}</span>
          </button>
        </div>
      </motion.div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

