'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { Mail, Loader2, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  interests: z.string().optional(),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterFormProps {
  variant?: 'default' | 'inline' | 'modal'
  showInterests?: boolean
  className?: string
}

export default function NewsletterForm({
  variant = 'default',
  showInterests = false,
  className = '',
}: NewsletterFormProps) {
  const supabase = createBrowserSupabaseClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const interestsOptions = [
    'Web Development',
    'AI/ML',
    'Cloud Computing',
    'Mobile Development',
    'DevOps',
    'Career Tips',
  ]

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    try {
      const { data: result, error } = await supabase.from('leads').insert([
        {
          email: data.email,
          interests: data.interests ? [data.interests] : [],
        },
      ])

      if (error) {
        console.error('Lead insert error:', error)
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        })
        if (error.code === '23505') {
          // Duplicate email
          toast.error('This email is already subscribed')
        } else {
          toast.error(`Failed to subscribe: ${error.message || 'Please try again.'}`)
        }
      } else {
        console.log('Lead created successfully')
        toast.success('Successfully subscribed to newsletter!')
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 3000)
      }
    } catch (error: any) {
      console.error('Newsletter submission error:', error)
      toast.error(`An error occurred: ${error?.message || 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={`flex gap-2 ${className}`}>
        <input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isSuccess ? (
            <Check className="h-4 w-4" />
          ) : (
            <>
              <Mail className="h-4 w-4" />
              Subscribe
            </>
          )}
        </button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Subscribe to Newsletter
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Get the latest articles and updates delivered to your inbox.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address *
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {showInterests && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest (optional)
            </label>
            <select
              {...register('interests')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="">Select an interest</option>
              {interestsOptions.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : isSuccess ? (
            <>
              <Check className="h-4 w-4" />
              Subscribed!
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" />
              Subscribe
            </>
          )}
        </button>
      </div>
    </form>
  )
}
