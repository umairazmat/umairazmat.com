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
    </>
  )
}

