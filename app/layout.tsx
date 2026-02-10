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
  metadataBase: new URL('https://www.umairazmat.com'),
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
  authors: [{ name: 'Umair Azmat', url: 'https://www.umairazmat.com' }],
  creator: 'Umair Azmat',
  publisher: 'Umair Azmat',
  category: 'Technology',
  classification: 'Software Engineering Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'ar', 'de', 'it'],
    url: 'https://www.umairazmat.com',
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
    canonical: 'https://www.umairazmat.com',
    languages: {
      'en-US': 'https://www.umairazmat.com',
      'en-GB': 'https://www.umairazmat.com',
      'ar': 'https://www.umairazmat.com',
      'de': 'https://www.umairazmat.com',
      'it': 'https://www.umairazmat.com',
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
        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
        {/* End Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){\n        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\n        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
            }}
          />
        )}
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${roboto.variable} font-sans`}>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
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

