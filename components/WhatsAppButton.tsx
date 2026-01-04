'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { personalInfo } from '@/constants'

export default function WhatsAppButton() {
  const handleClick = () => {
    const phoneNumber = personalInfo.phone?.replace(/\D/g, '') || '923217061116'
    const message = encodeURIComponent("Hi Umair, I'd like to connect...")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={24} className="transition-transform group-hover:rotate-12" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </motion.button>
  )
}

