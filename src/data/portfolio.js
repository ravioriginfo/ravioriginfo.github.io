// ─────────────────────────────────────────────────────────────
// All site content lives here. Replace the placeholder values
// with real content — every page reads from this file.
// Project images go in /public/images/projects/ and are referenced
// as '/images/projects/<file>'.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Ravi Sorathiya',
  role: 'Software Developer',
  tagline: 'I build fast, reliable apps and the systems behind them.',
  location: 'India',
  email: 'hello@example.com',
  resumeUrl: '', // e.g. '/resume.pdf' after adding the file to /public
  availableForWork: true,
  avatar: '', // e.g. '/images/avatar.jpg' — leave empty to show initials
  shortBio:
    'Placeholder: a two-sentence introduction about who you are, what you build, and what you care about as a developer.',
  bio: [
    'Placeholder paragraph: how you got into software development and what kind of problems you enjoy solving.',
    'Placeholder paragraph: your current focus — technologies, domains, or the type of team you work best in.',
    'Placeholder paragraph: something personal outside of code.',
  ],
}

export const socials = [
  { name: 'GitHub', url: 'https://github.com/ravioriginfo', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/your-username', icon: 'linkedin' },
  { name: 'X', url: 'https://x.com/your-username', icon: 'x' },
]

export const stats = [
  { label: 'Years experience', value: '3+' },
  { label: 'Projects shipped', value: '20+' },
  { label: 'Happy clients', value: '10+' },
]

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Kotlin', 'Java', 'SQL'] },
  { group: 'Frontend', items: ['Vue.js', 'React', 'Tailwind CSS', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Firebase'] },
  { group: 'Mobile', items: ['Android', 'Jetpack Compose'] },
  { group: 'Tools', items: ['Git', 'GitHub Actions', 'Docker', 'Figma'] },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'Company Name',
    period: '2023 — Present',
    description: 'Placeholder: what you work on, your responsibilities, and one measurable win.',
    tags: ['Vue.js', 'Node.js'],
  },
  {
    role: 'Junior Developer',
    company: 'Previous Company',
    period: '2021 — 2023',
    description: 'Placeholder: what you worked on and what you learned.',
    tags: ['Android', 'Kotlin'],
  },
]

export const education = [
  {
    role: 'B.Tech / B.E. in Computer Engineering',
    company: 'University Name',
    period: '2017 — 2021',
    description: 'Placeholder: relevant coursework, achievements, or projects.',
  },
]

export const projects = [
  {
    slug: 'project-one',
    title: 'Project One',
    summary: 'Placeholder: one-line summary of what this project does.',
    description: [
      'Placeholder: the problem this project solves and who it is for.',
      'Placeholder: how you built it — architecture, interesting technical decisions.',
      'Placeholder: results — users, performance, what you learned.',
    ],
    image: '',
    gallery: [],
    tags: ['Vue.js', 'Tailwind CSS', 'Firebase'],
    category: 'Web',
    year: '2025',
    featured: true,
    links: { live: 'https://example.com', source: 'https://github.com/your-username/project-one' },
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    summary: 'Placeholder: one-line summary of what this project does.',
    description: ['Placeholder: detailed description of the project.'],
    image: '',
    gallery: [],
    tags: ['Android', 'Kotlin', 'Jetpack Compose'],
    category: 'Mobile',
    year: '2024',
    featured: true,
    links: { live: '', source: 'https://github.com/your-username/project-two' },
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    summary: 'Placeholder: one-line summary of what this project does.',
    description: ['Placeholder: detailed description of the project.'],
    image: '',
    gallery: [],
    tags: ['Node.js', 'Express', 'REST APIs'],
    category: 'Backend',
    year: '2024',
    featured: true,
    links: { live: '', source: 'https://github.com/your-username/project-three' },
  },
  {
    slug: 'project-four',
    title: 'Project Four',
    summary: 'Placeholder: one-line summary of what this project does.',
    description: ['Placeholder: detailed description of the project.'],
    image: '',
    gallery: [],
    tags: ['React', 'TypeScript'],
    category: 'Web',
    year: '2023',
    featured: false,
    links: { live: 'https://example.com', source: '' },
  },
]

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]
