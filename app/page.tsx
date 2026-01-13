import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import InstantProof from '@/components/sections/InstantProof'
import SkillsTechStack from '@/components/sections/SkillsTechStack'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Experiences from '@/components/sections/Experiences'
import HowIWork from '@/components/sections/HowIWork'
import WhoIWorkWith from '@/components/sections/WhoIWorkWith'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import LetsBuild from '@/components/sections/LetsBuild'
import FeaturedBlogs from '@/components/sections/FeaturedBlogs'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatbotFloatingButton from '@/components/ChatbotFloatingButton'

export const metadata: Metadata = {
  title: 'Umair Azmat - Full-Stack Software Engineer | React, Next.js, Node.js, Python Developer',
  description: 'Full-Stack Software Engineer with 3+ years of experience building production-grade, scalable web applications. Specialized in React, Next.js, Node.js, Python, AWS Cloud, and AI/ML. Available for remote work opportunities. Based in Lahore, Pakistan.',
  keywords: [
    'Umair Azmat',
    'Full-Stack Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Python Developer',
    'AWS Cloud Engineer',
    'AI Developer',
    'MERN Stack Developer',
    'TypeScript Developer',
    'FastAPI Developer',
    'Remote Developer',
    'Software Engineer Portfolio',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Development',
    'Web Development',
    'Lahore Pakistan',
    'Software Engineer Lahore',
    'Production-Grade Applications',
    'Scalable Web Applications',
    'Cloud Deployment',
    'AI-Assisted Development',
  ],
  authors: [{ name: 'Umair Azmat', url: 'https://umairazmat.com' }],
  creator: 'Umair Azmat',
  publisher: 'Umair Azmat',
  category: 'Technology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'ar', 'de', 'it'],
    url: 'https://umairazmat.com',
    siteName: 'Umair Azmat Portfolio',
    title: 'Umair Azmat - Full-Stack Software Engineer | React, Next.js, Node.js, Python',
    description: 'Full-Stack Software Engineer with 3+ years of experience building production-grade, scalable web applications. Specialized in React, Next.js, Node.js, Python, and AWS Cloud.',
    images: [
      {
        url: 'https://umairazmat.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Umair Azmat - Full-Stack Software Engineer Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@umairazmatt',
    creator: '@umairazmatt',
    title: 'Umair Azmat - Full-Stack Software Engineer',
    description: 'Full-Stack Software Engineer with 3+ years of experience building production-grade, scalable web applications.',
    images: ['https://umairazmat.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://umairazmat.com',
    languages: {
      'en-US': 'https://umairazmat.com',
      'en-GB': 'https://umairazmat.com',
      'ar': 'https://umairazmat.com',
      'de': 'https://umairazmat.com',
      'it': 'https://umairazmat.com',
    },
  },
  other: {
    'geo.region': 'PK-PB',
    'geo.placename': 'Lahore',
    'geo.position': '31.5204;74.3587',
    'ICBM': '31.5204, 74.3587',
  },
}

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full">
      {/* Primary User Journey - Recruiter-Focused */}
      <Hero />
      <AboutMe />
      <InstantProof />
      <SkillsTechStack />
      <FeaturedProjects />
      <Experiences />
      <HowIWork />
      <WhoIWorkWith />
      <Testimonials />
      <FAQ />
      <LetsBuild />
      <FeaturedBlogs />
      {/* Floating Actions */}
      <div id="chatbot-trigger" />
      <WhatsAppButton />
      <ChatbotFloatingButton />
    </div>
  )
}
