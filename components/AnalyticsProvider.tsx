'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { useEffect } from 'react'

export default function AnalyticsProvider() {
  const { track } = useAnalytics()

  // Track specific events
  useEffect(() => {
    const handleResumeDownload = () => {
      track('resume_download')
    }

    const handleContactFormOpen = () => {
      track('contact_form_open')
    }

    const handleWhatsAppClick = () => {
      track('whatsapp_click')
    }

    const handleChatbotOpen = () => {
      track('chatbot_open')
    }

    // Listen for custom events
    window.addEventListener('resume-download', handleResumeDownload)
    window.addEventListener('contact-form-open', handleContactFormOpen)
    window.addEventListener('whatsapp-click', handleWhatsAppClick)
    window.addEventListener('chatbot-open', handleChatbotOpen)

    return () => {
      window.removeEventListener('resume-download', handleResumeDownload)
      window.removeEventListener('contact-form-open', handleContactFormOpen)
      window.removeEventListener('whatsapp-click', handleWhatsAppClick)
      window.removeEventListener('chatbot-open', handleChatbotOpen)
    }
  }, [track])

  return null
}

