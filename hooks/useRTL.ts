'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useRTL() {
  const { i18n } = useTranslation()
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const rtlLanguages = ['ar']
    setIsRTL(rtlLanguages.includes(i18n.language))
    
    // Update document direction
    document.documentElement.dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return isRTL
}

