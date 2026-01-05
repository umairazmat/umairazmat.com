import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import SkipToContent from '@/components/SkipToContent'
import Toaster from '@/components/Toaster'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ContactAutoPopup from '@/components/ContactAutoPopup'
import StructuredData from '@/components/StructuredData'
import AnalyticsProvider from '@/components/AnalyticsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Umair Azmat - Full-Stack Software Engineer',
    template: '%s | Umair Azmat',
  },
  description: 'Full-Stack Software Engineer with 2+ years of experience building production-grade, scalable web applications using React, Next.js, Angular, Node.js, and REST APIs. Skilled in frontend feature ownership, clean modular UI architecture, API integrations, cloud deployment (AWS/GCP), and AI-assisted development. Available for remote work opportunities.',
  keywords: ['Full-Stack Software Engineer', 'React', 'Next.js', 'Node.js', 'Python', 'AWS Cloud', 'GenAI', 'MERN Stack', 'Angular', 'TypeScript', 'FastAPI', 'Remote Developer', 'Umair Azmat', 'Software Engineer Portfolio', 'Frontend Developer', 'Backend Developer', 'Full Stack Development', 'Web Development', 'Lahore Pakistan'],
  authors: [{ name: 'Umair Azmat' }],
  creator: 'Umair Azmat',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://umairazmat.com',
    siteName: 'Umair Azmat Portfolio',
    title: 'Umair Azmat - Full-Stack Software Engineer',
    description: 'Full-Stack Software Engineer with 2+ years of experience building production-grade, scalable web applications using React, Next.js, Angular, Node.js, and REST APIs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umair Azmat - Full-Stack Software Engineer',
    description: 'Full-Stack Software Engineer with 2+ years of experience building production-grade, scalable web applications using React, Next.js, Angular, Node.js, and REST APIs.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  let resolvedTheme;
                  if (theme === 'system') {
                    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } else {
                    resolvedTheme = theme;
                  }
                  root.classList.add(resolvedTheme);
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <AnalyticsProvider />
          <SkipToContent />
          <Loader />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <Toaster />
          <ContactAutoPopup />
        </ThemeProvider>
      </body>
    </html>
  )
}

