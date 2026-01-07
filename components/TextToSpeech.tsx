'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface TextToSpeechProps {
  text: string
  sectionId?: string
  className?: string
}

export default function TextToSpeech({ text, sectionId, className = '' }: TextToSpeechProps) {
  const { i18n } = useTranslation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setIsSupported('speechSynthesis' in window)
  }, [])

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handlePlay = () => {
    if (!isSupported) {
      alert('Text-to-speech is not supported in your browser.')
      return
    }

    if (isPlaying) {
      // Stop if playing
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    setIsLoading(true)
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = i18n.language || 'en-US'
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
    }

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error)
      setIsPlaying(false)
      setIsLoading(false)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  if (!isSupported) {
    return null
  }

  return (
    <motion.button
      onClick={handlePlay}
      className={`p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
      aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
      title={isPlaying ? 'Stop audio playback' : 'Listen to this section'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 size={18} className="animate-spin" />
          </motion.div>
        ) : isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <VolumeX size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="stopped"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Volume2 size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
