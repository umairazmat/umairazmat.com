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
    id: 'venturetronics',
    company: 'Venturetronics',
    role: 'Software Engineer',
    location: 'Lahore, Punjab, Pakistan',
    type: 'Full-time',
    startDate: '2025-09',
    endDate: 'Present',
    description: [
      'Contributed to internal enterprise frontend modules using Angular and TypeScript',
      'Collaborated on web-based systems integrating frontend components with FastAPI backends',
      'Integrate WebSockets and REST APIs to enhance real-time features and application functionality',
      'Deliver electrical-firmware–based EV charging diagnostic systems with real-time data processing',
      'Create and maintain internal tools to optimize workflows and improve team productivity',
      'Worked within Agile teams delivering scalable, high-performance systems',
    ],
    technologies: ['MERN Stack', 'Electron.js', 'Angular', 'TypeScript', 'FastAPI', 'WebSockets', 'REST APIs', 'Agile'],
    metrics: [
      { label: 'Duration', value: '5 months' },
      { label: 'Type', value: 'Hybrid' },
    ],
  },
  {
    id: 'powersoft19',
    company: 'Powersoft19',
    role: 'Software Developer',
    location: 'Lahore, Punjab, Pakistan',
    type: 'Full-time',
    startDate: '2023-09',
    endDate: '2025-08',
    description: [
      'Develop dynamic and user-friendly frontends using Angular, React.js, Next.js, and Tailwind CSS',
      'Implement robust backends with Node.js, C#, .NET, and PHP to ensure high performance',
      'Integrate REST APIs and .NET-based APIs to enhance application features and functionality',
      'Deliver diverse projects, including e-commerce platforms, 3D e-commerce websites, and charging station management systems',
      'Create and maintain internal tools to optimize workflows and improve team productivity',
      'Participated in Agile/Scrum ceremonies including sprint planning, standups, and reviews',
    ],
    technologies: ['Tailwind CSS', 'CSS', 'Angular', 'React.js', 'Next.js', 'Node.js', 'C#', '.NET', 'PHP', 'REST APIs', 'Agile'],
    metrics: [
      { label: 'Duration', value: '2 years' },
      { label: 'Type', value: 'On-site' },
    ],
  },
  {
    id: 'smit',
    company: 'S.M.I.T (Saylani Mass I.T Training)',
    role: 'Training Instructor',
    location: 'Faisalabad, Punjab, Pakistan',
    type: 'Contract',
    startDate: '2022-05',
    endDate: '2023-05',
    description: [
      'Instructed 500+ students',
      'Delivered comprehensive lessons on programming languages and technologies',
      'Technologies taught: HTML, CSS (Bootstrap 5), JavaScript (ES6), TypeScript, React JS (Context API, Router, State Management), Next.js, NodeJS (ExpressJS, Authentication, API Endpoint Handling), NPM, MongoDB, Firebase, React Native',
      'Hosting platforms: Surge, gh-pages (GitHub Pages), Netlify, Vercel, Firebase',
    ],
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'React Native'],
    metrics: [
      { label: 'Students Trained', value: '500+' },
      { label: 'Duration', value: '1 year 1 month' },
      { label: 'Type', value: 'Hybrid' },
    ],
  },
  {
    id: 'qnarlabs',
    company: 'QNAR International',
    role: 'WordPress Developer',
    location: 'Rawalpindi, Punjab, Pakistan',
    type: 'Part-time',
    startDate: '2022-06',
    endDate: '2022-09',
    description: [
      'Developed 4 WordPress websites (e-commerce store, Bitcoin book page, journal website, university research site)',
      'Used Elementor, Notion, and WordPress plugins (Forms, Landing Pages)',
      'Led a team of 2 WordPress developers',
      'Introduced Notion-based ticketing system',
      'Reduced issue resolution time from 2 days to 1 day',
      'Significantly increased customer satisfaction',
    ],
    technologies: ['WordPress', 'Elementor', 'PHP', 'HTML', 'CSS', 'Notion'],
    metrics: [
      { label: 'Websites Developed', value: '4' },
      { label: 'Duration', value: '4 months' },
      { label: 'Team Size', value: '2' },
      { label: 'Type', value: 'Remote' },
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
  title: 'Full-Stack Software Engineer | React, Next.js, Node.js, Python | AWS Cloud | Applied GenAI & scalable systems',
  email: 'umairazmatcareer@gmail.com',
  phone: '+92 321 706 1116',
  location: 'Lahore, Punjab, Pakistan',
  timezone: 'PKT (UTC+5)',
  availability: 'Available for Remote Work',
  preferredStack: ['MERN Stack', 'React', 'Next.js', 'Node.js', 'Python', 'FastAPI'],
  responseTime: 'Within 24 hours',
  calendlyUrl: 'https://calendly.com/umairazmat', // Replace with actual Calendly link
  resumeUrl: '/resume/umair-azmat-resume.pdf', // Will need to add actual resume file
  social: {
    github: 'https://github.com/umairazmat',
    linkedin: 'https://www.linkedin.com/in/umairazmat/',
    twitter: 'https://x.com/umairazmatt',
    facebook: 'https://www.facebook.com/umairazmatt',
    instagram: 'https://www.instagram.com/umairazmatt/',
    leetcode: 'https://leetcode.com/u/uamirazmat/',
    medium: 'https://medium.com/@umairazmatt',
  },
  about: {
    summary: 'Full-Stack Software Engineer with 2+ years of experience building and maintaining production-grade, scalable web applications using React, Next.js, Angular, Node.js, and REST APIs. Skilled in frontend feature ownership, clean modular UI architecture, API integrations, cloud deployment (AWS/GCP), and AI-assisted development. Experienced in supporting live systems in remote, Agile teams, delivering end-to-end solutions for enterprise and internal tools.',
    highlights: [
      '2+ years of professional development experience',
      '500+ students trained in programming',
      'Production-grade applications delivered',
      'Expert in full-stack development and AI-assisted development',
    ],
  },
  metrics: {
    yearsExperience: 2,
    studentsTrained: 500,
    projectsDelivered: 15,
    githubRepos: 50,
    githubStars: 500,
    articlesPublished: 10,
  },
}

