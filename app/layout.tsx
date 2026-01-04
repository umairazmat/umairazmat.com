import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Umair Azmat - Full Stack Developer & AI Engineer',
    template: '%s | Umair Azmat',
  },
  description: 'Professional portfolio of Umair Azmat - Full Stack Developer, AI Engineer, and Educator specializing in MERN stack, Python, and Machine Learning. Available for remote opportunities.',
  keywords: ['Full Stack Developer', 'AI Engineer', 'MERN Stack', 'Python', 'Machine Learning', 'Remote Developer', 'Next.js', 'React'],
  authors: [{ name: 'Umair Azmat' }],
  creator: 'Umair Azmat',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://umairazmat.com',
    siteName: 'Umair Azmat Portfolio',
    title: 'Umair Azmat - Full Stack Developer & AI Engineer',
    description: 'Professional portfolio showcasing full stack development, AI/ML projects, and teaching experience.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umair Azmat - Full Stack Developer & AI Engineer',
    description: 'Professional portfolio showcasing full stack development, AI/ML projects, and teaching experience.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

