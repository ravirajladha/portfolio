// All portfolio content lives here. Keep it short: one idea per line.
// In `intro`, wrap words in *asterisks* to give them a marker highlight.

export const profile = {
  name: 'Ravi Raj Ladha',
  title: 'Reliable Software Is All You Need',
  location: 'Bangalore, India',
  affiliation: ['Full-stack Developer · Mahindra First Choice', 'M.Tech AI & ML · BITS Pilani'],
  email: 'ravirajladha@gmail.com',
  phone: '+91 89860 00099',
  github: 'https://github.com/ravirajladha',
  linkedin: 'https://linkedin.com/in/ravirajladha',
  resume: '/Resume_Ravi_Raj_Ladha.pdf',
  typed: ['ships production systems', 'trains XGBoost models', 'builds LLM chatbots', 'tunes slow SQL', 'automates boring work'],
  tagline: '4+ years shipping production software. Now bringing ML and LLMs into it.',
  intro: [
    'I build *reliable backends*: fast APIs, safe payments, calm releases.',
    'Now I add *machine learning* on top, and I know how to take it *to production*.',
  ],
}

export const results: { label: string; value: number; suffix?: string }[] = [
  { label: 'Years in production', value: 4, suffix: '+' },
  { label: 'Real-time apps', value: 13 },
  { label: 'Monthly users', value: 10000, suffix: '+' },
  { label: 'Monthly orders', value: 6000, suffix: '+' },
  { label: 'ML / LLM systems', value: 3 },
  { label: 'Awards', value: 2 },
]

export type Job = { id: string; company: string; role: string; period: string; points: string[]; tags: string[]; award: string }

export const experience: Job[] = [
  {
    id: 'mahindra',
    company: 'Mahindra First Choice',
    role: 'Full-stack Developer',
    period: 'Jul 2025 — now',
    points: [
      'Own the vehicle Preinspection module end to end',
      'Built an XGBoost model for condition scoring and pricing',
      'Built an NLP pipeline over inspection remarks',
      'Made APIs faster with indexes and leaner payloads',
    ],
    tags: ['CodeIgniter', 'MySQL', 'Python', 'XGBoost', 'NLP', 'Playwright'],
    award: 'Hyper Helper Award · from the CTO',
  },
  {
    id: 'kods',
    company: 'KODS Technologies',
    role: 'Software Developer',
    period: 'Mar 2022 — Apr 2025',
    points: [
      'Architected 13 real-time web apps',
      'Served 10,000+ users every month',
      'Integrated WhatsApp, SendGrid and Razorpay',
      'Fixed concurrency issues in payment flows',
    ],
    tags: ['Laravel', 'React', 'Node.js', 'AWS', 'CI/CD'],
    award: 'Performer of the Year 2024–25',
  },
]

export type Project = { name: string; stack: string; scale: string; text: string }
export type Sector = { id: string; label: string; intro: string; projects: Project[] }

export const sectors: Sector[] = [
  {
    id: 'automotive', label: 'Automotive & ML', intro: 'Vehicle inspections, now with ML.',
    projects: [
      { name: 'Preinspection module', stack: 'CodeIgniter · MySQL', scale: 'Business-critical', text: 'Inspection workflows for a finance arm.' },
      { name: 'Vehicle scoring model', stack: 'Python · XGBoost', scale: 'ML', text: 'Scores condition and suggests price.' },
      { name: 'Remark NLP', stack: 'Python · NLP', scale: 'ML', text: 'Finds sentiment and recurring issues.' },
    ],
  },
  {
    id: 'commerce', label: 'E-commerce', intro: 'Money, stock and shipping.',
    projects: [
      { name: 'thesecrethaircare.com', stack: 'Laravel · Claude · Redis', scale: '6,000+ orders/mo', text: 'High-volume store with an AI support chatbot.' },
      { name: 'Trueweights', stack: 'Laravel · IoT', scale: '100+ drivers', text: 'Weighbridge with auto photo capture.' },
      { name: 'Tagncash', stack: 'Laravel · MySQL', scale: '10,000+ users', text: 'QR-code referral rewards.' },
    ],
  },
  {
    id: 'healthcare', label: 'Healthcare', intro: 'Uptime and privacy first.',
    projects: [
      { name: 'Medy Hospital', stack: 'PHP · MySQL', scale: '500+ daily users', text: 'Hospital management system.' },
      { name: 'Digital Doctor', stack: 'Laravel · Zoom · OpenTok', scale: '1,000+ consults/mo', text: 'Telemedicine with video calls.' },
    ],
  },
  {
    id: 'orgs', label: 'Organisations', intro: 'Tools that replace spreadsheets.',
    projects: [
      { name: 'Samruddhi Assets', stack: 'Laravel', scale: '100+ assets', text: 'Asset tracking with secure uploads.' },
      { name: 'Pragati Users', stack: 'Laravel', scale: '500+ users', text: 'User management with SMS OTP.' },
      { name: 'Sanidhya Tickets', stack: 'Laravel · WhatsApp', scale: '2,000+ tickets', text: 'Tickets delivered on WhatsApp.' },
      { name: 'Document Vault', stack: 'Laravel · MySQL', scale: '50+ users', text: 'Digitised archive, secure storage.' },
    ],
  },
  {
    id: 'education', label: 'Education & Social', intro: 'Products people come back to.',
    projects: [
      { name: 'AVAtoms LMS', stack: 'Laravel · MERN · FFmpeg', scale: '10,000+ students', text: 'LMS with code editor and AI workflows.' },
      { name: 'Oodlesin Quiz', stack: 'PHP · MySQL', scale: '5,000+ students', text: 'Interactive quiz platform.' },
      { name: 'Filmox', stack: 'Laravel', scale: '1,000+ members', text: 'Social network for film fans.' },
    ],
  },
  {
    id: 'iot', label: 'Custom & IoT', intro: 'Built for specific operations.',
    projects: [
      { name: 'K2K IoT Inventory', stack: 'React · Node · MongoDB', scale: '200+ users', text: 'Real-time inventory from devices.' },
      { name: 'Vishvin Stock', stack: 'Laravel', scale: '300+ users', text: 'Smart-meter stock management.' },
    ],
  },
]

export const ai = {
  pillars: [
    { title: 'Classical ML', text: 'XGBoost scoring · NLP classification' },
    { title: 'LLMs & agents', text: 'Claude chatbot · LangChain · Ollama' },
    { title: 'Study', text: 'ML · DNN · NLP · RL · MLOps at BITS' },
  ],
  inputs: ['Data', 'Text', 'Code'],
  outputs: ['Score', 'Answer'],
}

export const stack = [
  { layer: 'AI & Data', items: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'LangChain', 'Ollama', 'Claude API'] },
  { layer: 'Integrations', items: ['WhatsApp', 'Razorpay', 'SendGrid', 'Twilio', 'Shiprocket', 'Maps'] },
  { layer: 'Frontend', items: ['React', 'TypeScript', 'Livewire', 'Tailwind', 'Redux'] },
  { layer: 'Backend', items: ['PHP', 'Laravel', 'CodeIgniter', 'Node.js', 'Django', 'REST'] },
  { layer: 'Infra & Data', items: ['MySQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Nginx', 'GitHub CI'] },
]

export const training = [
  { period: '2025 — 27', title: 'M.Tech, AI & ML', org: 'BITS Pilani' },
  { period: '2021 — 22', title: 'Python Full Stack', org: 'Pyspiders · Google ML Crash Course' },
  { period: '2016 — 20', title: 'B.Tech, Energy Engineering', org: 'NEHU Shillong · Research at IASST' },
]

export const now = [
  'Building ML into inspection workflows',
  'Studying NLP & Deep RL at BITS',
  'Writing one practical post a month',
  'Playing with local LLM agents',
]

// "The Ride": scroll story on the home page, in order.
export const journey = [
  { year: '2016', title: 'Shillong', text: 'Energy Engineering at NEHU.' },
  { year: '2021', title: 'Switch to code', text: 'First commit. Hooked.' },
  { year: '2022', title: 'KODS', text: '13 real-time apps.' },
  { year: '2025', title: 'Mahindra + BITS', text: 'Full-stack and an M.Tech in AI.' },
  { year: '2026', title: 'ML in production', text: 'Next stop: AI engineer →' },
]
