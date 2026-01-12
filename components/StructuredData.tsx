import { personalInfo, experiences, projects, skills } from '@/constants'

export default function StructuredData() {
  const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://umairazmat.com'
  
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title.split('|')[0].trim(),
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'Pakistan',
    },
    url: websiteUrl,
    sameAs: [
      personalInfo.social.github,
      personalInfo.social.linkedin,
      personalInfo.social.twitter,
      personalInfo.social.medium,
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Government College University Faisalabad',
      description: 'Bachelor of Software Engineering',
    },
    knowsAbout: [
      ...personalInfo.preferredStack,
      ...skills.map((s) => s.name),
    ],
    description: personalInfo.about.summary,
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personalInfo.name} - Portfolio`,
    url: websiteUrl,
    description: personalInfo.about.summary,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${personalInfo.name} - Full-Stack Development Services`,
    provider: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Full-Stack Web Development',
      'Frontend Development',
      'Backend Development',
      'React Development',
      'Next.js Development',
      'Node.js Development',
      'Python Development',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many years of experience do you have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I have 2+ years of professional experience in full-stack software development, working with technologies like React, Next.js, Node.js, Python, and cloud platforms like AWS.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are you available for remote work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, I am available for remote work opportunities. I have extensive experience working in remote, Agile teams and am comfortable with async communication and full feature ownership.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your preferred tech stack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'My preferred tech stack includes MERN (MongoDB, Express, React, Node.js), Next.js, TypeScript, Python, FastAPI, and AWS Cloud services. I also work with Angular, Tailwind CSS, and various databases.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of projects have you worked on?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I have worked on diverse projects including e-commerce platforms, 3D e-commerce websites, EV charging station management systems, AI-powered applications, internal enterprise tools, and educational platforms.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your typical response time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I typically respond within 24 hours. For urgent matters, I can respond faster. Feel free to reach out via email, WhatsApp, or schedule a call through the appointment system.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: websiteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${websiteUrl}/#about`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Experience',
        item: `${websiteUrl}/#experience`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Projects',
        item: `${websiteUrl}/#projects`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${websiteUrl}/#contact`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

