import { Metadata } from 'next'
import AppointmentSystem from '@/components/AppointmentSystem'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Schedule an Appointment | Umair Azmat',
  description: 'Book a meeting with Umair Azmat. Available for remote work discussions, project consultations, and career opportunities.',
}

export default function AppointmentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Schedule an <span className="gradient-text">Appointment</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Book a time to discuss your project, explore opportunities, or have a technical conversation.
              </p>
            </div>
            <AppointmentSystem />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
