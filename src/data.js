// All content comes straight from the resume — edit here to update the site.

export const profile = {
  name: 'Tangudu Praveen Kumar',
  first: 'Praveen',
  role: 'MERN Stack Developer',
  location: 'Gunupur, Odisha, India',
  email: 'tpraveenk2003@gmail.com',
  phone: '+91 8249892879',
  linkedin: 'https://www.linkedin.com/in/t-praveen-kumar-0b8a0b402',
  githubPersonal: 'https://github.com/PraveenT256',
  githubProfessional: 'https://github.com/PraveenT256311',
  resume: './Tangudu_Praveen_Kumar_Resume.pdf',
  photo: './photo.png',
  summary:
    'MERN Stack Developer with hands-on experience building and shipping a production multi-tenant SaaS property leasing platform. Skilled in React.js, Node.js, Express.js and MongoDB, with working exposure to REST API design and automated testing. Strong problem-solving foundation in data structures and algorithms, and a quick learner who adapts fast to new technologies.',
  roles: ['MERN Stack Developer', 'React.js Engineer', 'REST API Builder', 'AI-assisted Shipper'],
}

export const stats = [
  { value: 3, suffix: '', label: 'Professional roles' },
  { value: 1, suffix: '', label: 'Production SaaS shipped' },
  { value: 1.4, suffix: ' yrs', label: 'AI-assisted development', decimals: 1 },
  { value: 3, suffix: '', label: 'RBAC tiers engineered' },
]

export const experience = [
  {
    company: 'ADVA Developers Pvt. Ltd.',
    role: 'MERN Stack Developer',
    period: 'Feb 2026 — Nov 2026',
    type: 'Full-time',
    blurb:
      'Worked on Blue Pixel — a full-stack property leasing & buying platform where organizations onboard, publish and manage property listings end to end.',
    points: [
      'Built responsive React.js (Vite) + Material UI features: property onboarding flows, Google Maps integration and interactive listing pages.',
      'Developed Node.js/Express backend for multi-tenant org & property management with role-based access control (owners, org superadmins, platform admins).',
      'Engineered the property lifecycle — draft → published → deactivated.',
      'Managed data with MongoDB (Mongoose); wrote unit & integration tests with Vitest.',
      'Followed structured logging, code review and CI/CD practices in a Git/GitHub workflow.',
    ],
    tags: ['React', 'Vite', 'MUI', 'Node', 'Express', 'MongoDB', 'Vitest', 'CI/CD'],
  },
  {
    company: 'Ace Web Academy',
    role: 'Front-End & MERN Stack Intern',
    period: 'May 2025 — Nov 2025',
    type: 'Internship',
    blurb: 'Developed full-stack web applications across the MERN stack.',
    points: [
      'Built full-stack apps with React.js, Node.js, Express.js and MongoDB.',
      'Designed RESTful APIs and managed database operations.',
      'Collaborated through Git & GitHub version control.',
    ],
    tags: ['React', 'Node', 'Express', 'MongoDB', 'REST'],
  },
  {
    company: 'Glucian India Pvt. Ltd.',
    role: 'Front-End Development Intern',
    period: 'May 2023 — Jul 2023',
    type: 'Internship',
    blurb: 'Crafted responsive interfaces and polished UI/UX across multiple projects.',
    points: [
      'Developed responsive web interfaces with HTML, CSS and JavaScript.',
      'Improved UI/UX consistency and performance across multiple projects.',
      'Worked with developers to maintain design standards.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
  },
]

export const projects = [
  {
    id: '01',
    title: 'Blue Pixel',
    kind: 'Production SaaS · ADVA Developers',
    desc: 'Multi-tenant property leasing & buying platform. Organizations onboard, publish and manage listings end to end — with Google Maps, three-tier RBAC and a full draft → published → deactivated lifecycle.',
    tags: ['React (Vite)', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'Vitest'],
    link: 'https://github.com/PraveenT256311',
    linkLabel: 'GitHub · Professional',
    hue: ['#3d7bff', '#00e0ff'],
    glyph: 'BP',
  },
  {
    id: '02',
    title: 'NexaChain AI',
    kind: 'Full-stack MERN platform',
    desc: 'Investment & referral platform with authentication, a daily ROI cron job and a multi-level referral tree. The live demo runs on seeded sample data — no real backend, payments or accounts.',
    tags: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Cron'],
    link: 'https://praveent256.github.io/NEXACHAIN-AI/dashboard',
    linkLabel: 'Live demo',
    hue: ['#8a5cff', '#ff4fd8'],
    glyph: 'NX',
  },
  {
    id: '03',
    title: 'Tourism Management System',
    kind: 'Full-stack web app',
    desc: 'Manages tourism packages, bookings and customer data in one place. Improved booking efficiency using MongoDB and Node.js.',
    tags: ['Node.js', 'MongoDB', 'Express', 'JavaScript'],
    link: 'https://github.com/PraveenT256',
    linkLabel: 'GitHub · Personal',
    hue: ['#c6ff3d', '#19d38a'],
    glyph: 'TM',
  },
]

export const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript (basic)', 'HTML', 'CSS', 'SASS'] },
  { title: 'Frameworks & Libraries', items: ['React.js', 'Node.js', 'Express.js', 'Material UI', 'Bootstrap', 'jQuery'] },
  { title: 'Database', items: ['MongoDB', 'Mongoose'] },
  { title: 'Tools & Practices', items: ['Git', 'GitHub', 'VS Code', 'Vitest', 'REST APIs', 'RBAC', 'CI/CD', 'AI-assisted dev'] },
]

export const sphereSkills = [
  'React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SASS',
  'Material UI', 'Bootstrap', 'jQuery', 'Mongoose', 'Vite', 'Vitest', 'Git', 'GitHub', 'REST',
  'RBAC', 'CI/CD', 'Google Maps', 'VS Code', 'DSA', 'AI Coding',
]

export const education = [
  { school: 'Gandhi Institute for Technology, Bhubaneswar', degree: 'B.Tech — Computer Science & Engineering', score: 'CGPA 7.13', period: '2021 — 2025' },
  { school: 'Srigayatri Jr. College, Visakhapatnam', degree: 'Intermediate', score: '65%', period: '2019 — 2021' },
  { school: 'Sarvani Vidyalaya, Srikakulam', degree: 'Matriculation', score: '82%', period: '2018 — 2019' },
]

export const achievements = [
  'Completed multiple academic and industry projects with positive feedback.',
  'Consistent academic performance and active hackathon participant.',
  'Quick learner with strong analytical & problem-solving skills, team collaboration and leadership.',
]
