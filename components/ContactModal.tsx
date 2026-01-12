'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mail, MessageSquare, User, FileText, Shield } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  // Prevent body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Handle Escape key to close modal
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !isSubmitting) {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isSubmitting, onClose])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    const toastId = toast.loading(t('contactModal.sending'))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      toast.success(t('contactModal.success'), {
        id: toastId,
        duration: 3000,
      })
      reset()
      // Auto close modal after successful submission
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : t('contactModal.error'),
        {
          id: toastId,
          duration: 4000,
        }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
              if (!isSubmitting) {
                onClose()
              }
            }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[99998]"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ 
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Compact */}
              <div className="flex items-center justify-between p-3.5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-sky-100 dark:bg-sky-900/20 rounded-lg">
                    <MessageSquare className="text-sky-500 dark:text-sky-400" size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                      {t('contactModal.title')}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                      {t('contactModal.subtitle')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-shrink-0"
                  aria-label={t('common.close')}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form - Compact, No Scroll */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-3.5 space-y-2.5 bg-white dark:bg-gray-800">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contactModal.nameLabel')}
                  </label>
                  <div className="relative">
                    <User className="absolute start-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full ps-8 pe-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:border-sky-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder={t('contactModal.namePlaceholder')}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contactModal.emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute start-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full ps-8 pe-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:border-sky-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder={t('contactModal.emailPlaceholder')}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Shield size={10} />
                    {t('contactModal.privacy')}
                  </p>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contactModal.subjectLabel')}
                  </label>
                  <div className="relative">
                    <FileText className="absolute start-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
                    <input
                      {...register('subject')}
                      type="text"
                      id="subject"
                      className="w-full ps-8 pe-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:border-sky-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder={t('contactModal.subjectPlaceholder')}
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contactModal.messageLabel')}
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:focus:border-sky-400 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={t('contactModal.messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-3 py-2 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {t('contactModal.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('contactModal.sending')}
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        {t('contactModal.send')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
