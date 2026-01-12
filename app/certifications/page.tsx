import { Metadata } from 'next'
import Certificates from '@/components/sections/Certificates'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Certifications & Licenses | Umair Azmat',
  description: 'Professional certifications including AWS re/Start Graduate, Stanford Code in Place Mentor, IBM Full Stack Developer, Meta Front-End Developer, and various hackathon certificates.',
}

export default function CertificationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Certificates />
      </main>
      <Footer />
    </>
  )
}
