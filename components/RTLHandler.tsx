'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function RTLHandler() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const rtlLanguages = ['ar']
    const isRTL = rtlLanguages.includes(i18n.language)
    
    // Update document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
    
    // Add RTL class for additional styling if needed
    if (isRTL) {
      document.documentElement.classList.add('rtl')
    } else {
      document.documentElement.classList.remove('rtl')
    }
  }, [i18n.language])

  return null
}

