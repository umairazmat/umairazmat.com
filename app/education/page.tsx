import { Metadata } from 'next'
import Education from '@/components/sections/Education'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Education & Background | Umair Azmat',
  description: 'Academic achievements and educational foundation that shaped my software engineering career. Bachelor of Software Engineering from GCU Faisalabad with CGPA 3.78/4.00.',
}

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Education />
      </main>
      <Footer />
    </>
  )
}
