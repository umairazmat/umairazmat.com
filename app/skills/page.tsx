import { Metadata } from 'next'
import Skills from '@/components/sections/Skills'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Technical Skills | Umair Azmat',
  description: 'Comprehensive list of technical skills including Frontend (React, Next.js, TypeScript), Backend (Node.js, FastAPI), Cloud (AWS, Vercel), and AI/ML technologies.',
}

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Skills />
      </main>
      <Footer />
    </>
  )
}
