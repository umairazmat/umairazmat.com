import { Metadata } from 'next'
import AppointmentSystem from '@/components/AppointmentSystem'
import BlogBackground from '@/components/BlogBackground'

export const metadata: Metadata = {
  title: 'Schedule an Appointment | Umair Azmat',
  description: 'Book a meeting with Umair Azmat. Available for remote work discussions, project consultations, and career opportunities.',
  keywords: [
    'schedule appointment',
    'book meeting',
    'consultation',
    'remote work',
    'career opportunities',
  ],
  openGraph: {
    title: 'Schedule an Appointment | Umair Azmat',
    description: 'Book a meeting with Umair Azmat. Available for remote work discussions and project consultations.',
    type: 'website',
    url: 'https://umairazmat.com/appointments',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schedule an Appointment | Umair Azmat',
    description: 'Book a meeting with Umair Azmat.',
  },
  alternates: {
    canonical: 'https://umairazmat.com/appointments',
  },
}

export default function AppointmentsPage() {
  return (
    <div className="relative min-h-screen pt-16 overflow-hidden w-full">
      <BlogBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Schedule an <span className="text-sky-500 dark:text-sky-400">Appointment</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Book a time to discuss your project, explore opportunities, or have a technical conversation.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AppointmentSystem />
          </div>
        </div>
      </div>
    </div>
  )
}
