'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { personalInfo } from '@/constants'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    const phoneNumber = personalInfo.phone?.replace(/\D/g, '') || '923217061116'
    const message = encodeURIComponent("Hi Umair, I'd like to connect...")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    toast.success('Opening WhatsApp...')
    setShowTooltip(false)
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            className="absolute bottom-full left-0 mb-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg shadow-xl whitespace-nowrap"
          >
            <span>Chat on WhatsApp</span>
            <div className="absolute bottom-0 left-4 transform translate-y-full">
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
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group relative"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} className="transition-transform group-hover:rotate-12" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="sr-only">Contact on WhatsApp</span>
      </motion.button>
    </div>
  )
}

