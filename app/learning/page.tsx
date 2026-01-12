import { Metadata } from 'next'
import Learning from '@/components/sections/Learning'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Learning & Development | Umair Azmat',
  description: 'Current learning progress including AWS Cloud Certification preparation, learning milestones, and skills being developed.',
}

export default function LearningPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Learning />
      </main>
      <Footer />
    </>
  )
}
