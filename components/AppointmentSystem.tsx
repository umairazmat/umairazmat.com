'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '@/constants'
import { Calendar, Video, Phone, MapPin, Clock, Loader2, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import toast from 'react-hot-toast'

const appointmentSchema = z.object({
  user_name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  type: z.string().min(1, 'Appointment type is required'),
  datetime: z.string().min(1, 'Date and time is required'),
  notes: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

export default function AppointmentSystem() {
  const { t } = useTranslation()
  const supabase = createBrowserSupabaseClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  })

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true)
    try {
      const { data: result, error } = await supabase.from('appointments').insert([
        {
          user_name: data.user_name,
          email: data.email,
          type: data.type,
          datetime: new Date(data.datetime).toISOString(),
          notes: data.notes || null,
          status: 'pending',
        },
      ]).select()

      if (error) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Appointment insert error:', error)
          console.error('Error details:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          })
        }
        toast.error('Failed to book appointment. Please try again.')
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('Appointment created successfully:', result)
        }
        toast.success('Appointment booked successfully! We will confirm shortly.')
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 3000)
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Appointment submission error:', error)
      }
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
     

      {/* Booking Form */}
      <div className="card bg-gradient-to-br from-primary-50 dark:from-primary-900/20 to-primary-100 dark:to-primary-900/30 border-2 border-primary-200 dark:border-primary-800 mb-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary-600 rounded-full">
              <Calendar size={32} className="text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('appointment.bookAppointment', 'Book an Appointment')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('appointment.fillForm', 'Fill out the form below to schedule a meeting.')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name *
              </label>
              <input
                {...register('user_name')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.user_name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Appointment Type *
              </label>
              <select
                {...register('type')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select type</option>
                <option value="tech">Technical Discussion</option>
                <option value="client">Client Meeting</option>
                <option value="recruiter">Recruiter Call</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date & Time *
              </label>
              <input
                {...register('datetime')}
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.datetime && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.datetime.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (optional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Any additional information..."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin size={16} />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock size={16} />
              <span>{personalInfo.timezone}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Booking...
              </>
            ) : isSuccess ? (
              <>
                <Check className="h-5 w-5" />
                Booked!
              </>
            ) : (
              <>
                <Calendar size={20} />
                {t('appointment.bookNow', 'Book Appointment Now')}
              </>
            )}
          </button>
        </form>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <Video size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {t('appointment.videoCall', 'Video Call')}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('appointment.videoCallDesc', 'Connect via Zoom, Google Meet, or Microsoft Teams.')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <Phone size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {t('appointment.phoneCall', 'Phone Call')}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('appointment.phoneCallDesc', 'Traditional phone call for quick discussions.')}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}



