export interface Experience {
  id: string
  company: string
  role: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
  startDate: string
  endDate: string | 'Present'
  description: string[]
  technologies: string[]
  achievements?: string[]
  metrics?: {
    label: string
    value: string | number
  }[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image?: string
  githubUrl?: string
  liveUrl?: string
  technologies: string[]
  category: 'Web App' | 'AI/ML' | 'Mobile' | 'Other'
  featured: boolean
  metrics?: {
    label: string
    value: string | number
  }[]
}

export interface Skill {
  name: string
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Tools'
}

export const experiences: Experience[] = [
  {
    id: 'powersoft19',
    company: 'Powersoft19',
    role: 'Full Stack Developer',
    location: 'Remote',
    type: 'Full-time',
    startDate: '2023-01',
    endDate: 'Present',
    description: [
      'Developed and maintained full-stack web applications using MERN stack',
      'Implemented AI/ML features using Python and TensorFlow',
      'Led team of developers and managed project timelines',
      'Optimized application performance and improved user experience',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Python', 'TensorFlow', 'AWS'],
    achievements: [
      'Delivered 15+ production-ready applications',
      'Reduced application load time by 40%',
      'Mentored 5 junior developers',
    ],
    metrics: [
      { label: 'Projects Delivered', value: '15+' },
      { label: 'Team Size', value: '5' },
      { label: 'Performance Improvement', value: '40%' },
    ],
  },
  {
    id: 'lablabai',
    company: 'Lablab.ai',
    role: 'AI Engineer & Mentor',
    location: 'Remote',
    type: 'Contract',
    startDate: '2022-06',
    endDate: '2023-12',
    description: [
      'Built AI-powered applications for hackathons and competitions',
      'Mentored developers in AI/ML best practices',
      'Created educational content and tutorials',
      'Collaborated on open-source AI projects',
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'Hugging Face'],
    achievements: [
      'Won 3 hackathon competitions',
      'Published 10+ technical articles',
      'Mentored 50+ developers',
    ],
    metrics: [
      { label: 'Hackathons Won', value: '3' },
      { label: 'Articles Published', value: '10+' },
      { label: 'Developers Mentored', value: '50+' },
    ],
  },
  {
    id: 'teaching',
    company: 'Freelance Teaching',
    role: 'Programming Instructor',
    location: 'Remote',
    type: 'Part-time',
    startDate: '2021-01',
    endDate: 'Present',
    description: [
      'Taught full-stack web development and AI/ML concepts',
      'Created comprehensive course materials and projects',
      'Provided one-on-one mentorship to students',
      'Helped students land their first tech jobs',
    ],
    technologies: ['React', 'Node.js', 'Python', 'Machine Learning'],
    achievements: [
      'Trained 200+ students',
      '95% student satisfaction rate',
      '80% job placement rate',
    ],
    metrics: [
      { label: 'Students Trained', value: '200+' },
      { label: 'Satisfaction Rate', value: '95%' },
      { label: 'Job Placement Rate', value: '80%' },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'ielts-bands-master',
    title: 'IELTS Bands Master',
    description: 'AI-powered IELTS preparation platform with personalized feedback and band score prediction.',
    longDescription: 'A comprehensive IELTS preparation platform that uses AI to provide personalized feedback on writing and speaking tasks. Features include band score prediction, detailed analytics, and adaptive learning paths.',
    image: '/projects/ielts-bands-master.jpg',
    githubUrl: 'https://github.com/umairazmat/ielts-bands-master',
    liveUrl: 'https://ielts-bands-master.vercel.app',
    technologies: ['Next.js', 'Python', 'OpenAI API', 'TensorFlow', 'MongoDB'],
    category: 'AI/ML',
    featured: true,
    metrics: [
      { label: 'Users', value: '500+' },
      { label: 'Accuracy', value: '92%' },
    ],
  },
  {
    id: 'code-mentor',
    title: 'Code Mentor AI',
    description: 'AI-powered code review and mentorship platform for developers.',
    longDescription: 'An intelligent code review system that provides real-time feedback, suggests improvements, and explains code concepts. Built with advanced NLP models for code understanding.',
    image: '/projects/code-mentor.jpg',
    githubUrl: 'https://github.com/umairazmat/code-mentor',
    liveUrl: 'https://code-mentor.vercel.app',
    technologies: ['React', 'Node.js', 'OpenAI API', 'PostgreSQL'],
    category: 'AI/ML',
    featured: true,
    metrics: [
      { label: 'Code Reviews', value: '1000+' },
      { label: 'Users', value: '200+' },
    ],
  },
  {
    id: 'charge-swap',
    title: 'ChargeSwap',
    description: 'Electric vehicle charging station finder and booking platform.',
    longDescription: 'A comprehensive platform for finding and booking EV charging stations. Features real-time availability, route planning, and payment integration.',
    image: '/projects/charge-swap.jpg',
    githubUrl: 'https://github.com/umairazmat/charge-swap',
    liveUrl: 'https://charge-swap.vercel.app',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Mapbox'],
    category: 'Web App',
    featured: true,
    metrics: [
      { label: 'Stations', value: '500+' },
      { label: 'Users', value: '1000+' },
    ],
  },
]

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 'Expert', category: 'Frontend' },
  { name: 'Next.js', level: 'Expert', category: 'Frontend' },
  { name: 'TypeScript', level: 'Advanced', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 'Expert', category: 'Frontend' },
  { name: 'JavaScript', level: 'Expert', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', level: 'Expert', category: 'Backend' },
  { name: 'Express', level: 'Expert', category: 'Backend' },
  { name: 'Python', level: 'Expert', category: 'Backend' },
  { name: 'REST APIs', level: 'Expert', category: 'Backend' },
  { name: 'GraphQL', level: 'Advanced', category: 'Backend' },
  
  // Database
  { name: 'MongoDB', level: 'Expert', category: 'Database' },
  { name: 'PostgreSQL', level: 'Advanced', category: 'Database' },
  { name: 'Redis', level: 'Intermediate', category: 'Database' },
  
  // AI/ML
  { name: 'TensorFlow', level: 'Advanced', category: 'AI/ML' },
  { name: 'PyTorch', level: 'Advanced', category: 'AI/ML' },
  { name: 'OpenAI API', level: 'Expert', category: 'AI/ML' },
  { name: 'NLP', level: 'Advanced', category: 'AI/ML' },
  
  // DevOps
  { name: 'AWS', level: 'Advanced', category: 'DevOps' },
  { name: 'Docker', level: 'Advanced', category: 'DevOps' },
  { name: 'CI/CD', level: 'Advanced', category: 'DevOps' },
  { name: 'Git', level: 'Expert', category: 'DevOps' },
  
  // Tools
  { name: 'VS Code', level: 'Expert', category: 'Tools' },
  { name: 'Figma', level: 'Intermediate', category: 'Tools' },
]

export const personalInfo = {
  name: 'Umair Azmat',
  title: 'Full Stack Developer & AI Engineer',
  email: 'umair@umairazmat.com',
  location: 'Pakistan (PKT - UTC+5)',
  timezone: 'PKT (UTC+5)',
  availability: 'Available for Remote Work',
  preferredStack: ['MERN Stack', 'Python', 'AI/ML', 'Next.js'],
  responseTime: 'Within 24 hours',
  calendlyUrl: 'https://calendly.com/umairazmat', // Replace with actual Calendly link
  resumeUrl: '/resume/umair-azmat-resume.pdf', // Will need to add actual resume file
  social: {
    github: 'https://github.com/umairazmat',
    linkedin: 'https://linkedin.com/in/umairazmat',
    twitter: 'https://twitter.com/umairazmat',
  },
  about: {
    summary: 'Passionate full-stack developer and AI engineer with 5+ years of experience building scalable web applications and AI-powered solutions. Specialized in MERN stack, Python, and machine learning.',
    highlights: [
      '5+ years of professional development experience',
      '200+ students trained in programming',
      '15+ production applications delivered',
      'Expert in AI/ML integration and deployment',
    ],
  },
  metrics: {
    yearsExperience: 5,
    studentsTrained: 200,
    projectsDelivered: 15,
    githubRepos: 50,
    githubStars: 500,
    articlesPublished: 10,
  },
}

