'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface MicroInteractionProps {
  children: ReactNode
  className?: string
  hoverScale?: number
  hoverRotate?: number
  tapScale?: number
  whileHover?: any
  whileTap?: any
}

export default function MicroInteraction({
  children,
  className = '',
  hoverScale = 1.05,
  hoverRotate = 0,
  tapScale = 0.95,
  whileHover,
  whileTap,
}: MicroInteractionProps) {
  const shouldReduceMotion = useReducedMotion()

  // Respect prefers-reduced-motion for accessibility
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const defaultWhileHover = {
    scale: hoverScale,
    rotate: hoverRotate,
    transition: { duration: 0.2, ease: 'easeOut' },
  }

  const defaultWhileTap = {
    scale: tapScale,
    transition: { duration: 0.1 },
  }

  return (
    <motion.div
      whileHover={whileHover || defaultWhileHover}
      whileTap={whileTap || defaultWhileTap}
      className={className}
    >
      {children}
    </motion.div>
  )
}

