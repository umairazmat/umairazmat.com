'use client'

import { useEffect, useState } from 'react'
import ContactModal from './ContactModal'

export default function ContactAutoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('contact-popup-shown')
    if (hasSeenPopup === 'true') {
      return
    }

    // Show popup after 2 minutes (120000ms)
    const timer = setTimeout(() => {
      setIsOpen(true)
      setHasShown(true)
      sessionStorage.setItem('contact-popup-shown', 'true')
    }, 120000) // 2 minutes

    return () => clearTimeout(timer)
  }, [])

  return <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
}

