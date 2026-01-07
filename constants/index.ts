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
    startDate: '2024-09',
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
  // Languages
  { name: 'HTML', level: 'Expert', category: 'Frontend' },
  { name: 'CSS', level: 'Expert', category: 'Frontend' },
  { name: 'JavaScript', level: 'Expert', category: 'Frontend' },
  { name: 'TypeScript', level: 'Advanced', category: 'Frontend' },
  { name: 'Python', level: 'Expert', category: 'Backend' },
  { name: 'C++', level: 'Intermediate', category: 'Backend' },
  { name: 'SQL', level: 'Advanced', category: 'Database' },
  
  // Frontend
  { name: 'React.js', level: 'Expert', category: 'Frontend' },
  { name: 'Next.js', level: 'Expert', category: 'Frontend' },
  { name: 'Angular', level: 'Advanced', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 'Expert', category: 'Frontend' },
  { name: 'Bootstrap', level: 'Expert', category: 'Frontend' },
  { name: 'Responsive Design', level: 'Expert', category: 'Frontend' },
  { name: 'Figma', level: 'Intermediate', category: 'Frontend' },
  { name: 'jQuery', level: 'Advanced', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', level: 'Expert', category: 'Backend' },
  { name: 'Express.js', level: 'Expert', category: 'Backend' },
  { name: 'FastAPI', level: 'Advanced', category: 'Backend' },
  { name: 'C#', level: 'Intermediate', category: 'Backend' },
  { name: '.NET', level: 'Intermediate', category: 'Backend' },
  { name: 'PHP', level: 'Intermediate', category: 'Backend' },
  { name: 'REST APIs', level: 'Expert', category: 'Backend' },
  { name: 'WebSockets', level: 'Advanced', category: 'Backend' },
  { name: 'JWT', level: 'Advanced', category: 'Backend' },
  { name: 'Firebase', level: 'Advanced', category: 'Backend' },
  
  // Database
  { name: 'MongoDB', level: 'Expert', category: 'Database' },
  { name: 'MySQL', level: 'Advanced', category: 'Database' },
  { name: 'PostgreSQL', level: 'Advanced', category: 'Database' },
  
  // Tools
  { name: 'Git', level: 'Expert', category: 'Tools' },
  { name: 'GitHub', level: 'Expert', category: 'Tools' },
  { name: 'Jira', level: 'Intermediate', category: 'Tools' },
  { name: 'Trello', level: 'Intermediate', category: 'Tools' },
  { name: 'VS Code', level: 'Expert', category: 'Tools' },
  { name: 'Notion', level: 'Advanced', category: 'Tools' },
  { name: 'Electron.js', level: 'Intermediate', category: 'Tools' },
  
  // Platforms & Deployment
  { name: 'Vercel', level: 'Expert', category: 'DevOps' },
  { name: 'Netlify', level: 'Expert', category: 'DevOps' },
  { name: 'AWS', level: 'Advanced', category: 'DevOps' },
  { name: 'GCP', level: 'Intermediate', category: 'DevOps' },
  { name: 'CI/CD', level: 'Advanced', category: 'DevOps' },
  { name: 'Surge', level: 'Advanced', category: 'DevOps' },
  { name: 'Firebase Hosting', level: 'Advanced', category: 'DevOps' },
  
  // Architecture
  { name: 'Component-Based Architecture', level: 'Expert', category: 'Tools' },
  { name: 'Clean Code', level: 'Expert', category: 'Tools' },
  { name: 'Scalable Systems', level: 'Advanced', category: 'Tools' },
  { name: 'Production-Ready Apps', level: 'Expert', category: 'Tools' },
  
  // AI/ML
  { name: 'Generative AI', level: 'Advanced', category: 'AI/ML' },
  { name: 'AI-assisted development', level: 'Expert', category: 'AI/ML' },
  { name: 'LLMs', level: 'Advanced', category: 'AI/ML' },
  { name: 'Streamlit', level: 'Advanced', category: 'AI/ML' },
  { name: 'OpenAI API', level: 'Expert', category: 'AI/ML' },
  
  // Other
  { name: 'WordPress', level: 'Advanced', category: 'Tools' },
  { name: 'Elementor', level: 'Advanced', category: 'Tools' },
  { name: 'Agile/Scrum', level: 'Expert', category: 'Tools' },
  { name: 'Version Control', level: 'Expert', category: 'Tools' },
]

export interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  image?: string
  skills?: string[]
  category: 'AWS & Cloud' | 'Education & Mentoring' | 'University' | 'Hackathons' | 'Professional' | 'Training' | 'Online Courses'
}

export interface Reference {
  id: string
  name: string
  position: string
  company: string
  recommendation: string
  linkedinUrl?: string
}

export interface VolunteerExperience {
  id: string
  organization: string
  position: string
  location: string
  type: 'Volunteer' | 'Program' | 'Fellowship'
  startDate: string
  endDate: string | 'Present'
  description: string[]
  skills: string[]
  metrics?: {
    label: string
    value: string | number
  }[]
}

export const certificates: Certificate[] = [
  {
    id: 'aws-restart',
    title: 'AWS re/Start Graduate',
    issuer: 'Amazon Web Services',
    issueDate: '2026-01',
    category: 'AWS & Cloud',
  },
  {
    id: 'code-in-place',
    title: 'Code in Place Mentor',
    issuer: 'Stanford Online',
    issueDate: '2025-06',
    credentialId: 'codei_in_place_umair_azmat_section_leader_certificate_202507013445.pdf',
    category: 'Education & Mentoring',
    skills: ['Python', 'Teaching'],
  },
  {
    id: 'harvard-cs50',
    title: 'Harvard CS50 Puzzle Day 2024',
    issuer: 'CS50',
    issueDate: '2025-04',
    credentialId: 'eb99dec3-e4c3-43e9-b2ce-1c8be66fdd81',
    category: 'University',
  },
  {
    id: 'german-course',
    title: 'German Language Course',
    issuer: 'Government College University GCU, Lahore',
    issueDate: '2025-01',
    category: 'University',
    skills: ['German'],
  },
  {
    id: 'aria-allegro-hackathon',
    title: 'Aria & Allegro Multimodal Hackathon',
    issuer: 'lablab.ai',
    issueDate: '2025-01',
    credentialId: '#cm5mgktop001fpbg4u975bqql',
    category: 'Hackathons',
  },
  {
    id: 'code-matrix',
    title: 'Code Matrix',
    issuer: 'University of California, Berkeley',
    issueDate: '2024-12',
    category: 'Hackathons',
    skills: ['Problem Solving'],
  },
  {
    id: 'pak-angels',
    title: 'Pak Angels Gen AI Cohort 2',
    issuer: 'Pak Angels',
    issueDate: '2024-12',
    credentialId: '08207896-f1e3-4a6b-a3bc-52660581e37b',
    category: 'Hackathons',
    skills: ['Streamlit', 'Python'],
  },
  {
    id: 'reasoning-o1',
    title: 'Reasoning with o1 Hackathon Certificate',
    issuer: 'lablab.ai',
    issueDate: '2024-12',
    credentialId: 'cm4wxhy860089fu6ivf3wcsgm',
    category: 'Hackathons',
  },
  {
    id: 'gpt4o-hackathon',
    title: 'GPT4o: Code & Conquer Hackathon',
    issuer: 'Devpost',
    issueDate: '2024-11',
    credentialId: 'ca3d578b-408f-40f0-98da-016e17f5c435',
    category: 'Hackathons',
    skills: ['GPT-4', 'Streamlit'],
  },
  {
    id: 'edge-runners',
    title: 'Edge Runners 3.2',
    issuer: 'lablab.ai',
    issueDate: '2024-10',
    credentialId: '#cm2rx7x56000whk1mt1zpuqo9',
    category: 'Hackathons',
    skills: ['Mobile Applications', 'Streamlit', 'GitHub', 'MVP', 'Software Deployment', 'Software Development', 'Project Management', 'Team Leadership'],
  },
  {
    id: 'nasa-space-apps',
    title: 'GALACTIC PROBLEM SOLVER',
    issuer: 'Nasa Space Apps',
    issueDate: '2024-10',
    category: 'Hackathons',
    skills: ['WordPress', 'Storytelling', 'Elementor', 'Climate Change', 'Teamwork'],
  },
  {
    id: 'meta-hacker-cup',
    title: 'Meta Hacker Cup 2024',
    issuer: 'Meta',
    issueDate: '2024-10',
    category: 'Hackathons',
  },
  {
    id: 'ibm-watson',
    title: 'Generative AI Hackathon with IBM watsonx',
    issuer: 'lablab.ai',
    issueDate: '2024-08',
    credentialId: 'cm1g7g2cv00059rjz2lch7igm',
    category: 'Hackathons',
  },
  {
    id: 'google-soft-skills',
    title: 'Google Soft Skills Program',
    issuer: 'Google',
    issueDate: '2024-11',
    expiryDate: '2027-11',
    credentialId: '4771272734823391',
    category: 'Professional',
    skills: ['Communication', 'Networking', 'Problem Solving', 'Time Management', 'Team Collaboration'],
  },
  {
    id: 'pafla',
    title: 'Member of Pakistan Freelancers Association',
    issuer: 'PAFLA',
    issueDate: '2024-08',
    credentialId: '4771272734823391',
    category: 'Professional',
  },
  {
    id: 'amal-fellowship',
    title: 'AMAL Career Prep Fellowship',
    issuer: 'Amal Academy',
    issueDate: '2024-06',
    category: 'Professional',
    skills: ['Presentation Skills', 'Personal Development', 'Team Building', 'Project Management', 'Conflict Management', 'Team Leadership', 'Leadership', 'Conflict Resolution', 'Public Speaking', 'Teamwork', 'Communication', 'Networking', 'Team Management'],
  },
  {
    id: 'ibm-fullstack',
    title: 'IBM Full Stack Software Developer Specialization',
    issuer: 'IBM',
    issueDate: '2023-09',
    credentialId: 'TRYJFVEP79CB',
    category: 'Professional',
    skills: ['APIs', 'GitHub', 'JavaScript', 'React.js', 'Algorithms', 'CSS', 'Next.js', 'Data Structures'],
  },
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta',
    issueDate: '2023-09',
    credentialId: 'N2YG2JEEC2LX',
    category: 'Professional',
    skills: ['GitHub', 'JavaScript', 'React.js', 'HTML', 'CSS', 'Next.js'],
  },
  {
    id: 'meta-python',
    title: 'Programming in Python',
    issuer: 'Meta',
    issueDate: '2023-04',
    credentialId: '9ED6VZJFKUJL',
    category: 'Professional',
  },
  {
    id: 'meta-javascript',
    title: 'Programming with JavaScript',
    issuer: 'Meta',
    issueDate: '2023-04',
    credentialId: 'RZJP83SHRVK6',
    category: 'Professional',
    skills: ['JavaScript', 'React.js', 'Next.js'],
  },
  {
    id: 'meta-version-control',
    title: 'Version Control',
    issuer: 'Meta',
    issueDate: '2023-04',
    credentialId: 'FDFRKK79PVD7',
    category: 'Professional',
    skills: ['GitHub'],
  },
  {
    id: 'pftp-fullstack',
    title: 'Full Stack Web Developer',
    issuer: 'Professional Freelancing Training Program',
    issueDate: '2022-10',
    credentialId: 'pftp375428608 Serial No: B38740',
    category: 'Training',
    skills: ['GitHub', 'JavaScript', 'HTML', 'CSS', 'Next.js'],
  },
  {
    id: 'smit-web-mobile',
    title: 'Web and Mobile Application Development',
    issuer: 'S.M.I.T Saylani Mass I.T Training',
    issueDate: '2022-08',
    credentialId: 'SWIT/2022/CWD/154',
    category: 'Training',
    skills: ['GitHub', 'JavaScript', 'React.js', 'HTML', 'CSS', 'Next.js'],
  },
]

export const references: Reference[] = [
  {
    id: 'peter-morgan',
    name: 'Peter Morgan',
    position: 'Founder & CEO',
    company: 'Deep Learning Partnership',
    recommendation: "In the short project I worked with Umair on, he proved himself to be a more than capable software engineer, contributing effectively to the group's efforts, and demonstrating strong technical leadership. During this time he demonstrated proficient interpersonal skills, communication abilities, and technical expertise, especially with Python, API Integrations, and the Streamlit platform we were using. Overall he worked skillfully and communicated effectively, resulting in a successful and timely project outcome. I would enjoy working with Umair again if the opportunity arose, as he is a skilled and talented engineer, along with a valuable team player.",
  },
  {
    id: 'muhammad-abdullah',
    name: 'Muhammad Abdullah Qamar',
    position: 'CEO',
    company: 'QNARLabs',
    recommendation: "It's rare that you come across standout talent like Umair Azmat. I had the pleasure of managing Umair at QNAR International. Umair's expertise in Wordpress, JavaScript, Typescript, React.js, Next.js, and React Native significantly contributed to our projects' success. Not only is he technically proficient, but he also possesses remarkable leadership qualities, evidenced by his achievements as a Gold Medalist at PFTP and his role as a former trainer at SMIT. Umair's commitment to excellence and his ability to navigate complex coding challenges have made a lasting impact on our team. He consistently delivered solutions that exceeded our expectations, demonstrating a keen understanding of both technical and business aspects. Umair is without a doubt an invaluable asset to any team, and I am confident in his continued success in the tech industry.",
  },
  {
    id: 'abdul-hanan',
    name: 'Abdul Hanan',
    position: 'Software Engineer, Senior MERN Stack & Backend Developer',
    company: 'Freelance',
    recommendation: "I have had the pleasure of knowing Umair Azmat both as a friend and a classmate. Umair is an exceptionally talented individual with a deep understanding of software engineering concepts. His expertise in MERN stack development is truly commendable, and he has showcased his skills effectively as a teacher at SMIT. Umair's dedication to his work and his ability to adapt to new challenges make him a valuable asset in the field of software engineering. His experience and knowledge make him stand out as a competent professional, and I have no doubt that he will continue to excel in his career. I recently participated in a lablab.ai hackathon with Umair Azmat, my team lead. During the hackathon, he showed his coding and leadership talent, and I learned a lot from him. I highly recommend Umair for any software engineering role, as he is not only a skilled developer but also a great team player and a reliable individual.",
  },
  {
    id: 'pranavi-m',
    name: 'Pranavi M',
    position: 'UX/UI Designer, Speaker, Hackathon Innovator',
    company: 'Freelance',
    recommendation: "I had the pleasure of working with Umair Azmat during his participation in the IBM Watson and NASA hackathons. Umair's exceptional technical expertise, combined with his effective managerial communication skills, made him an invaluable member of our team. Throughout the hackathons, Umair demonstrated proficiency in full-stack development using technologies such as ReactJS, Node.js, and the MERN stack. His deep understanding of AI/ML concepts played a crucial role in building innovative solutions that met complex challenges. Umair's ability to integrate advanced software skills with creative problem-solving truly set him apart in these highly competitive environments. In addition to his technical skills, Umair exhibited outstanding soft skills. He communicated complex ideas clearly, facilitated collaboration among diverse team members, and managed tasks efficiently. His leadership and dedication inspired the team, resulting in a well-coordinated and productive working environment. Umair effectively leveraged his knowledge of version control tools like Git to ensure that our project maintained high-quality standards. I highly recommend Umair Azmat for any opportunity that requires a combination of advanced technical skills, strong communication, and effective project management. His participation in high-stakes hackathons like IBM Watson and NASA speaks volumes about his commitment to pushing the boundaries of what is possible, and I am confident that he will make significant contributions to any project",
  },
  {
    id: 'yousaf-sabir',
    name: 'Yousaf Sabir',
    position: 'Software Engineer, Fullstack Typescript & Node.js Developer',
    company: 'Freelance',
    recommendation: "Umair and I had been colleagues for quite some time. We did some projects together. This is how I got to know his skills, mindset & way of doing things. He has got full-stack skills, from handling complex designs on the front end to backend logic and APIs. On top of that, he is always ready to learn & expand his skillset. He doesn't mind anyone criticizing him, rather he takes it as an opportunity to improve where he lacks. Also, he has a clear way of doing business. If he tells you that he's gonna do something, consider it done. Therefore, I highly recommend Umair to any individual & teams who are looking forward to working with him.",
  },
]

export const volunteerExperiences: VolunteerExperience[] = [
  {
    id: 'stanford-code-in-place',
    organization: 'Stanford University - Code In Place',
    position: 'Section Leader (Mentor)',
    location: 'Remote',
    type: 'Volunteer',
    startDate: '2025-04',
    endDate: '2025-06',
    description: [
      'Selected from over 2,000 applicants worldwide to serve as a Mentor for Stanford\'s Code in Place 2025',
      'Global initiative to teach computer science (CS106A) using Python',
      'Conducting weekly 1:1 live mentoring sessions with students',
      'Providing personalized feedback, support, and motivation to beginners',
      'Helping students solve coding challenges and overcome learning obstacles',
      'Collaborating with Stanford\'s TAs and Section Leaders',
    ],
    skills: ['Python', 'Teaching', 'Mentoring', 'Problem Solving', 'Live Debugging'],
    metrics: [
      { label: 'Duration', value: '3 months' },
      { label: 'Type', value: 'Part-time, Remote' },
    ],
  },
  {
    id: 'amal-academy',
    organization: 'Amal Academy',
    position: 'AMAL Career Prep Fellowship',
    location: 'Lahore, Punjab, Pakistan',
    type: 'Program',
    startDate: '2024-03',
    endDate: '2024-05',
    description: [
      'Selected in a competitive pool of 4,300+ applicants',
      'Developed public speaking and presentation skills',
      'Collaborated with an 8-10 member team on various projects',
      'Enhanced conflict resolution and teamwork abilities',
      'Gained valuable networking skills and growth mindset',
      'Conducted research on environmental issues',
      'Authored a Medium blog discussing environmental challenges in Lahore',
      'Led a mega project focused on creating pods for birds, reducing plastic waste',
    ],
    skills: ['Teamwork', 'Project Management', 'MVP', 'Project Planning', 'Team Leadership', 'Presentation Skills', 'Team Building', 'Self Assessment', 'Problem Solving', 'Research Skills', 'Team Management', 'Interpersonal Skills', 'Prototyping', 'Public Speaking'],
    metrics: [
      { label: 'Duration', value: '3 months' },
      { label: 'Type', value: 'Part-time, Hybrid' },
      { label: 'Applicants', value: '4,300+' },
    ],
  },
  {
    id: 'aspire-institute',
    organization: 'Aspire Institute',
    position: 'Leadership Program',
    location: 'New York, United States',
    type: 'Program',
    startDate: '2025-01',
    endDate: '2025-03',
    description: [
      'Participating in the Aspire Leaders Program by Aspire Institute, co-created with Harvard faculty',
      'Enhancing leadership skills',
      'Engaging in strengths-based assessments, professional development, and global networking',
      'Learning leadership concepts: trust-building, digital transformation, community impact',
      'Live masterclasses',
      'Connecting with global cohort and mentors',
    ],
    skills: ['Career Development Programs', 'Leadership', 'Networking', 'Personal Development'],
    metrics: [
      { label: 'Duration', value: '3 months' },
      { label: 'Type', value: 'Part-time, Remote' },
    ],
  },
  {
    id: 'lablab-ai',
    organization: 'lablab.ai',
    position: 'Hackathon Enthusiast',
    location: 'Stockholm, Stockholm County, Sweden',
    type: 'Volunteer',
    startDate: '2024-08',
    endDate: '2025-01',
    description: [
      'Participated in international hackathons',
      'Collaborated with engineers from around the globe',
      'Enhanced generative AI skills through hackathons',
      'Built innovative projects using generative AI, LLMs, and other AI technologies',
      'Embraced ChatGPT and generative AI opportunities',
    ],
    skills: ['Teamwork', 'Storytelling', 'Project Management', 'Leadership', 'APIs', 'Project Planning', 'Team Leadership', 'Product Management', 'Team Building', 'Product Launch', 'Streamlit', 'Team Management', 'Product Development', 'React Native', 'Python', 'Software Project Management'],
    metrics: [
      { label: 'Duration', value: '6 months' },
      { label: 'Type', value: 'Part-time, Remote' },
    ],
  },
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
    summary: 'Full-Stack Software Engineer with 4+ years of experience building and maintaining production-grade, scalable web applications using React, Next.js, Angular, Node.js, and REST APIs. Skilled in frontend feature ownership, clean modular UI architecture, API integrations, cloud deployment (AWS/GCP), and AI-assisted development. Experienced in supporting live systems in remote, Agile teams, delivering end-to-end solutions for enterprise and internal tools.',
    highlights: [
      '4+ years of professional development experience',
      '500+ students trained in programming',
      'Production-grade applications delivered',
      'Expert in full-stack development and AI-assisted development',
    ],
  },
  metrics: {
    yearsExperience: 4,
    studentsTrained: 500,
    projectsDelivered: 15,
    githubRepos: 50,
    githubStars: 500,
    articlesPublished: 10,
  },
  learning: {
    currentFocus: 'AWS Cloud Certification',
    progress: 60,
    milestones: [
      'AWS re/Start Graduate (Completed)',
      'AWS Solutions Architect Associate (In Progress)',
      'AWS Developer Associate (Planned)',
    ],
  },
}

