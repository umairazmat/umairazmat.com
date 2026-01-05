'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 w-[42px] h-[42px] flex items-center justify-center">
        <Sun size={18} className="text-gray-400" />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'
  const isSystem = theme === 'system'

  const getIcon = () => {
    if (isSystem) {
      return <Monitor size={18} />
    }
    return isDark ? <Moon size={18} /> : <Sun size={18} />
  }

  const getLabel = () => {
    if (isSystem) return 'System theme (click to change)'
    return isDark ? 'Dark mode (click for system)' : 'Light mode (click for dark)'
  }

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={getLabel()}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={getLabel()}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isSystem ? 0 : (isDark ? 180 : 0) }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  )
}

