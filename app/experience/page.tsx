import { Metadata } from 'next'
import Experience from '@/components/sections/Experience'
import Volunteer from '@/components/sections/Volunteer'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Professional Experience | Umair Azmat',
  description: 'Complete professional experience including software engineering roles at Venturetronics and Powersoft19, training experience at S.M.I.T, and volunteer work.',
}

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Building production systems and delivering real-world solutions
            </p>
          </div>
          <Experience />
          <Volunteer />
        </div>
      </main>
      <Footer />
    </>
  )
}
