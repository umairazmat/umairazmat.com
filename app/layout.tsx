import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ConditionalNavbar from '@/components/ConditionalNavbar'
import ConditionalFooter from '@/components/ConditionalFooter'
import Loader from '@/components/Loader'
import SkipToContent from '@/components/SkipToContent'
import Toaster from '@/components/Toaster'
import { ThemeProvider } from '@/contexts/ThemeContext'
import StructuredData from '@/components/StructuredData'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import I18nProvider from '@/providers/I18nProvider'
import RTLHandler from '@/components/RTLHandler'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const roboto = Roboto({ 
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://umairazmat.com'),
  title: {
    default: 'Umair Azmat - Full-Stack Software Engineer | React, Next.js, Node.js, Python | AWS Cloud',
    template: '%s | Umair Azmat',
  },
  description: 'Full-Stack Software Engineer with 2+ years of experience building production-grade, scalable web applications using React, Next.js, Angular, Node.js, and REST APIs. Skilled in frontend feature ownership, clean modular UI architecture, API integrations, cloud deployment (AWS/GCP), and AI-assisted development. Available for remote work opportunities in Lahore, Pakistan.',
  keywords: [
    'Umair Azmat',
    'Full-Stack Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Python Developer',
    'AWS Cloud Engineer',
    'GenAI Developer',
    'MERN Stack Developer',
    'Angular Developer',
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
    'React Next.js Portfolio',
    'AI Developer',
    'Cloud Engineer',
    'Agile Developer',
    'Production-Grade Applications',
  ],
  authors: [{ name: 'Umair Azmat', url: 'https://umairazmat.com' }],
  creator: 'Umair Azmat',
  publisher: 'Umair Azmat',
  category: 'Technology',
  classification: 'Software Engineering Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'ar', 'de', 'it'],
    url: 'https://umairazmat.com',
    siteName: 'Umair Azmat Portfolio',
    title: 'Umair Azmat - Full-Stack Software Engineer | React, Next.js, Node.js, Python',
    description: 'Full-Stack Software Engineer with 2+ years of experience building production-grade, scalable web applications using React, Next.js, Angular, Node.js, and REST APIs. Available for remote work.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Umair Azmat - Full-Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@umairazmatt',
    creator: '@umairazmatt',
    title: 'Umair Azmat - Full-Stack Software Engineer',
    description: 'Full-Stack Software Engineer with 2+ years of experience building production-grade, scalable web applications.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || 'your-google-verification-code',
  },
  other: {
    'geo.region': 'PK-PB',
    'geo.placename': 'Lahore',
    'geo.position': '31.5204;74.3587',
    'ICBM': '31.5204, 74.3587',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning dir="ltr">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${roboto.variable} font-sans`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
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
        <I18nProvider>
          <RTLHandler />
          <ThemeProvider>
            <AnalyticsProvider />
            <SkipToContent />
            <Loader />
            <ConditionalNavbar />
            <main id="main-content">{children}</main>
            <ConditionalFooter />
            <Toaster />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}

