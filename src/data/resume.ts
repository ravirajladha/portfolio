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

// "SDE journey" on the Projects page: every chapter of the software career, with live and code links.
// Only put a `live` URL here once it has been checked to load and to belong to that client.
const gh = (path: string) => `https://github.com/ravirajladha/${path}`

export type JourneyBuild = { name: string; what: string; live?: string; client?: string; code?: string }
export type JourneyChapter = { period: string; org: string; orgUrl?: string; role: string; text: string; builds: JourneyBuild[] }

export const sdeJourney: JourneyChapter[] = [
  {
    period: '2021 — 22', org: 'Pyspiders', role: 'Python full-stack trainee',
    text: 'Switched from energy engineering to code. First projects in plain PHP MVC to learn the basics properly.',
    builds: [
      { name: 'HelloCart', what: 'Dine-in and food-ordering site', code: gh('hellocart-php-mvc-version') },
      { name: 'Sleep & stress test', what: 'Scored self-assessment questionnaire', code: gh('natural-sleep-stress') },
      { name: 'Mecwintech HR', what: 'Attendance, punch-in/out and payslips', code: gh('mecwintech') },
      { name: 'DSA in PHP', what: 'Data structures and algorithms practice', code: gh('php-dsa') },
    ],
  },
  {
    period: 'Mar 2022 — Apr 2025', org: 'KODS Technologies', orgUrl: 'https://kodstech.com', role: 'Software Developer',
    text: '13 real-time apps for clients across e-commerce, healthcare, IoT, education and non-profits. Performer of the Year 2024–25.',
    builds: [
      { name: 'Trueweights', what: 'Weighbridge with automatic camera capture, 100+ drivers', live: 'https://trueweights.com', code: gh('weighbridge-camera-IOT') },
      { name: 'Oodlesin Quiz', what: 'Quiz and mock-test platform, 5,000+ students', live: 'https://oodlesin.com', code: gh('oodles_files') },
      { name: 'Vendingkart', what: 'Vending-machine services company site, Next.js', live: 'https://vendingkart.com' },
      { name: 'Nexplace Info', what: 'Company site for an IT staffing firm', live: 'https://www.nexplaceinfo.com' },
      { name: 'AdBrovz', what: 'Marketplace with product search, payments and ads', live: 'https://adbrovz.com', code: gh('adbrovz-mvc') },
      { name: 'Vishvin Stock', what: 'Smart-meter stock management for Karnataka discoms', client: 'https://vishvin.com', code: gh('VishvinStockManagement') },
      { name: 'Art of Living suite', what: 'Samruddhi assets, Pragati users, Sanidhya WhatsApp tickets', client: 'https://www.artofliving.org/in-en', code: gh('artofliving') },
      { name: 'Tagncash', what: 'QR-code referral cashback, 10,000+ users', code: gh('TagNCash-Web') },
      { name: 'AVAtoms LMS', what: 'LMS with code editor, 10,000+ students', code: gh('abc-frontend-lrs') },
      { name: 'Digital Doctor', what: 'Telemedicine with Zoom/OpenTok video consults', code: gh('Digital-Doctor-Clinic') },
      { name: 'Medy Hospital', what: 'Hospital management, 500+ daily users', code: gh('medy') },
      { name: 'K2K IoT Inventory', what: 'Real-time inventory from devices', code: gh('k2k-iot-frontend') },
      { name: 'Document Vault', what: 'Digitised land-document archive for Sri Ahobila Mutt', code: gh('land-vault') },
      { name: 'Filmox', what: 'Social network for the film industry', code: gh('social-networking-php-laravel-filmox') },
      { name: 'Speeder logistics', what: 'Shipment booking and tracking', code: gh('speeder') },
    ],
  },
  {
    period: 'Ongoing', org: 'Secret Haircare', orgUrl: 'https://thesecrethaircare.com', role: 'Full-stack + AI',
    text: 'A high-volume haircare store, 6,000+ orders a month, with a Claude-powered support chatbot grounded in the catalogue.',
    builds: [
      { name: 'thesecrethaircare.com', what: 'Laravel store, Razorpay, Shiprocket, AI chatbot', live: 'https://thesecrethaircare.com' },
    ],
  },
  {
    period: 'Jul 2025 — now', org: 'Mahindra First Choice Wheels', orgUrl: 'https://www.mahindrafirstchoice.com', role: 'Full-stack Developer',
    text: 'Sole developer of the vehicle Pre-inspection platform: Next.js app, Fastify API, Laravel and CodeIgniter portals, plus ML for condition scoring. Hyper Helper Award from the CTO.',
    builds: [
      { name: 'Pre-inspection platform', what: 'Guided camera self-inspection for 6 vehicle categories', client: 'https://www.mahindrafirstchoice.com' },
      { name: 'Vehicle scoring model', what: 'XGBoost condition score and price suggestion' },
      { name: 'Remark NLP', what: 'Sentiment and recurring issues from inspector remarks' },
    ],
  },
  {
    period: '2025 — now', org: 'BITS Pilani + own products', role: 'M.Tech AI & ML',
    text: 'Taking ML from notebooks to production, and shipping my own apps.',
    builds: [
      { name: 'Epoch', what: 'Android app: learn AI/ML one epoch a day', live: '/epoch' },
      { name: 'E-commerce recommender', what: 'Real-time recommendations demo on Hugging Face', live: 'https://ravirajladha-seml-ecommerce-reco.hf.space' },
      { name: 'Applied AI/ML portfolio', what: 'Coursework as runnable notebooks', code: gh('applied-ai-ml-portfolio') },
    ],
  },
]
