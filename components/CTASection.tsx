'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Send } from 'lucide-react'
import { personalInfo } from '@/constants'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ContactModal from './ContactModal'
import { useTranslation } from 'react-i18next'

interface CTASectionProps {
  variant?: 'whatsapp' | 'email' | 'chat'
  message?: string
  className?: string
}

export default function CTASection({
  variant = 'chat',
  message,
  className = '',
}: CTASectionProps) {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const ctaVariants = {
    whatsapp: {
      icon: MessageCircle,
      text: t('cta.contactWhatsApp'),
      action: () => {
        const phoneNumber = personalInfo.phone?.replace(/\D/g, '') || '923217061116'
        const message = encodeURIComponent("Hi Umair, I'd like to connect...")
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
      },
      bgColor: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-400',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    email: {
      icon: Mail,
      text: t('cta.emailNow'),
      action: () => {
        // Will be handled by modal state
      },
      bgColor: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30',
      textColor: 'text-blue-700 dark:text-blue-400',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    chat: {
      icon: MessageCircle,
      text: t('cta.chatNow'),
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
      bgColor: 'bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30',
      textColor: 'text-primary-700 dark:text-primary-400',
      iconColor: 'text-primary-600 dark:text-primary-400',
      borderColor: 'border-primary-200 dark:border-primary-800',
    },
  }

  const defaultMessages = [
    t('cta.workTogether'),
    t('cta.discussProject'),
    t('cta.letsConnect'),
    t('cta.haveQuestion'),
    t('cta.buildAmazing'),
  ]

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
            aria-label={`${displayMessage} - ${ctaConfig.text}`}
            className={`w-full rounded-lg border-2 ${ctaConfig.borderColor} ${ctaConfig.bgColor} ${ctaConfig.textColor} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex flex-col items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
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
