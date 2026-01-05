'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  distance?: number
  duration?: number
  stagger?: number
}

export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  stagger = 0,
}: ScrollAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  // Respect prefers-reduced-motion for accessibility
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  const directionMap = {
    up: { y: distance, x: 0, scale: 1 },
    down: { y: -distance, x: 0, scale: 1 },
    left: { x: distance, y: 0, scale: 1 },
    right: { x: -distance, y: 0, scale: 1 },
    fade: { y: 0, x: 0, scale: 1 },
    scale: { y: 0, x: 0, scale: 0.9 },
  }

  const initial = directionMap[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay: delay + stagger,
        ease: [0.21, 1.11, 0.81, 0.99], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
