// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Ravi Raj Ladha',
  title: 'Reliable Software Is All You Need',
  location: 'Bangalore, India',
  affiliation: ['Full-stack Software Developer, Mahindra First Choice Wheels', 'M.Tech AI & ML (pursuing), BITS Pilani'],
  email: 'ravirajladha@gmail.com',
  phone: '+91 89860 00099',
  github: 'https://github.com/ravirajladha',
  linkedin: 'https://linkedin.com/in/ravirajladha',
  resume: '/Resume_Ravi_Raj_Ladha.pdf',
  typed: ['ships production systems', 'trains XGBoost models', 'builds LLM chatbots', 'tunes slow SQL', 'automates boring work'],
  abstract:
    'The dominant approach to shipping products relies on complex stacks and heroic releases. I propose a simpler architecture based on clean APIs, careful data modelling and boring deployments. Over 4+ years across healthcare, e-commerce, automotive and enterprise, this approach has produced 13 real-time applications serving 10,000+ monthly users. I have since added machine learning to the toolkit: an XGBoost vehicle-scoring model, an NLP pipeline over inspection remarks and a Claude-powered support chatbot in production. I am studying the foundations formally at BITS Pilani.',
  intro: [
    "I'm a full-stack developer who likes the unglamorous parts: query plans, indexes, payload sizes, idempotent payment handlers, safe releases and the 2 a.m. hotfix that doesn't need a rollback. Over four years I've built for hospitals, D2C brands, weighbridges, schools, religious institutions and an automotive enterprise, and each sector taught me a different kind of reliability.",
    'Since 2025 I have been extending this into AI. I study it formally (M.Tech in AI & ML at BITS Pilani) and use it every day at work. My edge is that I already know how to put software into production, and most AI projects fail at exactly that step.',
  ],
}

export const results: { label: string; value: number; suffix?: string }[] = [
  { label: 'Years shipping production software', value: 4, suffix: '+' },
  { label: 'Real-time applications architected', value: 13 },
  { label: 'ML / LLM systems built', value: 3 },
  { label: 'Monthly users served', value: 10000, suffix: '+' },
  { label: 'Monthly orders on one store', value: 6000, suffix: '+' },
  { label: 'Awards (incl. Performer of the Year)', value: 2 },
]

export type Job = {
  role: string
  company: string
  period: string
  context: string
  facets: { title: string; text: string }[]
  award: string
}

export const experience: Job[] = [
  {
    role: 'Full-stack Software Developer',
    company: 'Mahindra First Choice Wheels Limited (MFCWL) · Bangalore',
    period: 'Jul 2025 — present',
    context:
      "Mahindra First Choice inspects and certifies used vehicles for Mahindra's finance arm (MMFSL). Their loan decisions depend on those inspections, so the software behind them has to be right every time.",
    facets: [
      { title: 'Own', text: 'End-to-end development of the Preinspection module: features and L2/L3 support for business-critical used-vehicle inspection workflows.' },
      { title: 'Optimise', text: 'REST APIs in CodeIgniter + MySQL, made faster through query optimisation, indexing, payload reduction and backend refactoring.' },
      { title: 'Model · ML', text: 'Designed a proof-of-concept vehicle condition scoring and price adjustment model in Python, pandas, scikit-learn and XGBoost, using age, mileage and defect severity.' },
      { title: 'Language · NLP', text: 'Built an NLP pipeline over inspection remarks that classifies sentiment and recurring condition issues and stores ratings, categories and confidence scores.' },
      { title: 'Serve', text: 'Integrated ML predictions into the inspection apps through API workflows: input validation, model-response handling and database persistence.' },
      { title: 'Automate & operate', text: 'Playwright regression tests, Power Automate flows, root-cause analysis and controlled hotfixes with cross-functional teams.' },
    ],
    award: 'Achieve First: Hyper Helper Award, presented by the CTO for the AutoInspekt release project.',
  },
  {
    role: 'Software Developer',
    company: 'KODS Technologies Private Limited · Bangalore',
    period: 'Mar 2022 — Apr 2025',
    context:
      'A product studio building for many clients at once. Over three years I went from shipping features to leading system design across most of the projects in the sectors below.',
    facets: [
      { title: 'Architect', text: '13 real-time web applications integrating WhatsApp, SendGrid and Razorpay, driving engagement for 10,000+ monthly users.' },
      { title: 'Design', text: 'Led system design for scalable platforms, researching options to optimise performance and UX across industries.' },
      { title: 'Deliver', text: 'Ran projects through Asana and Slack and deployed to AWS and private servers with GitHub CI/CD.' },
      { title: 'Stabilise', text: 'Resolved concurrency and performance issues in systems handling 6,000+ transactions a month.' },
    ],
    award: 'Performer of the Year 2024–25 for real-time application delivery, system design leadership and user experience.',
  },
]

export type Project = { name: string; stack: string; scale: string; text: string }
export type Sector = { id: string; label: string; intro: string; projects: Project[] }

export const sectors: Sector[] = [
  {
    id: 'automotive',
    label: 'Automotive & ML',
    intro: 'Used-vehicle inspection at enterprise scale, now with machine learning built in.',
    projects: [
      { name: 'Preinspection module (MMFSL)', stack: 'CodeIgniter · MySQL · REST · Playwright', scale: 'Business-critical', text: 'End-to-end ownership of inspection workflows: features, L2/L3 support, tuned APIs and controlled releases.' },
      { name: 'Vehicle scoring & price model', stack: 'Python · pandas · scikit-learn · XGBoost', scale: 'ML proof-of-concept', text: 'Gradient-boosted model that scores vehicle condition and suggests price adjustments from inspection attributes.' },
      { name: 'Inspection remark NLP', stack: 'Python · NLP · REST APIs', scale: 'ML proof-of-concept', text: 'Classifies sentiment and recurring issues in free-text remarks, with confidence scores stored for analysis.' },
    ],
  },
  {
    id: 'commerce',
    label: 'E-commerce & Retail',
    intro: 'Money, inventory and shipping: the systems where concurrency bugs cost real orders.',
    projects: [
      { name: 'thesecrethaircare.com', stack: 'Laravel · Filament · Laravel AI SDK · Claude · MySQL · Redis · Razorpay · Shiprocket', scale: '6,000+ orders / month', text: 'High-volume e-commerce platform serving 50,000+ visitors: concurrency fixes, database tuning and Filament admin workflows, plus an AI support chatbot on Anthropic Claude with multi-turn memory, catalog-grounded answers, persistent conversations, guardrails and rate limiting.' },
      { name: 'Trueweights Truck Weighing', stack: 'Laravel · MySQL · IoT APIs', scale: '100+ drivers notified', text: 'IoT-integrated weighbridge with automatic photo capture and a real-time pipeline that notifies drivers via API.' },
      { name: 'Tagncash Referral Platform', stack: 'Laravel · PHP · MySQL', scale: '10,000+ users', text: 'QR-code referrals with location-based features and secure transactions.' },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    intro: 'Hospital and clinic software where uptime and data privacy are non-negotiable.',
    projects: [
      { name: 'Medy Hospital Management', stack: 'PHP MVC · MySQL · Bootstrap', scale: '500+ daily users', text: 'Re-designed modules to streamline hospital workflows, with secure data handling for providers.' },
      { name: 'Digital Doctor Clinic', stack: 'Laravel · MySQL · Zoom API · OpenTok', scale: '1,000+ consults / month', text: 'Telemedicine with in-app video calling and a clean role system for doctors, patients and admins.' },
    ],
  },
  {
    id: 'orgs',
    label: 'Organisations',
    intro: 'Internal tools that replace spreadsheets, paper and WhatsApp threads.',
    projects: [
      { name: 'Samruddhi Asset Tracking', stack: 'Laravel · MySQL · Bootstrap', scale: '100+ assets', text: 'Asset lifecycle tracking with secure file uploads.' },
      { name: 'Pragati User Management', stack: 'Laravel · MySQL', scale: '500+ users', text: 'User governance with SMS OTP authentication and robust access control.' },
      { name: 'Sanidhya Event Tickets', stack: 'Laravel · WhatsApp API', scale: '2,000+ tickets', text: 'Ticketing over WhatsApp plus a sales analytics dashboard for organisers.' },
      { name: 'Sri Ahobila Mutt Digitisation', stack: 'Laravel · MySQL · RDA Server', scale: '50+ users', text: 'Digitised a document archive with secure storage and fast retrieval.' },
    ],
  },
  {
    id: 'education',
    label: 'Education & Social',
    intro: 'Products where engagement and UX decide whether people come back.',
    projects: [
      { name: 'AVAtoms LMS', stack: 'Laravel · MERN · FFmpeg · Rapid API · Code editor', scale: '10,000+ students', text: 'Led the end-to-end LMS build with AI-assisted workflow automation, dynamic content and multi-institution course tracking.' },
      { name: 'Oodlesin Quiz Platform', stack: 'PHP MVC · MySQL', scale: '5,000+ students', text: 'Led system design for an interactive quiz platform shaped by UX research.' },
      { name: 'Filmox Social Network', stack: 'Laravel · PHP · MySQL', scale: '1,000+ members', text: 'Responsive social platform for film enthusiasts.' },
    ],
  },
  {
    id: 'iot',
    label: 'Custom & IoT',
    intro: 'Tailored builds for clients with very specific operations.',
    projects: [
      { name: 'K2K IoT Inventory', stack: 'React · Node.js · TypeScript · MongoDB', scale: '200+ users', text: 'Real-time inventory tracking from IoT devices, with a user-management module fitted to the client.' },
      { name: 'Vishvin Stock Management', stack: 'Laravel · Bootstrap', scale: '300+ users', text: 'Custom stock management designed around researched client workflows.' },
    ],
  },
]

export const ai = {
  intro: 'I build classical ML models on real business data, ship LLM features to real customers and study the theory at BITS. Here is what each of those looks like.',
  columns: [
    { tag: '4.1 · classical ML', title: 'Models on real data', items: ['XGBoost vehicle condition scoring & price adjustment', 'NLP sentiment and issue classification with confidence scores', 'Predictions served through validated REST workflows'] },
    { tag: '4.2 · LLMs & agents', title: 'Generative AI in production', items: ['Claude support chatbot: memory, catalog grounding, guardrails, rate limits', 'Agentic workflows with LangChain and local models via Ollama', 'OpenAI & Claude APIs via Laravel AI SDK; Claude for daily code review'] },
    { tag: '4.3 · study', title: 'Foundations at BITS', items: ['Machine Learning, Deep Neural Networks, Statistical Methods', 'NLP, Deep Reinforcement Learning, search & agent algorithms', 'Data Engineering, MLOps, Software Engineering for ML'] },
  ],
  pipeline: ['data', 'notebook', 'model / LLM', 'API', 'production'],
  footnote: 'Coursework lives in a public repo of runnable notebooks (search agents, RL environments, NLP pipelines) versioned with Git LFS. Tools: Python · NumPy · Pandas · Scikit-learn · Jupyter · Colab, plus the Google ML Crash Course.',
}

export const stack = [
  { layer: 'L5 · AI & Data', items: 'Python, NumPy, Pandas, Scikit-learn, XGBoost, Jupyter, Colab, LangChain, Ollama, OpenAI & Claude APIs' },
  { layer: 'L4 · Integrations', items: 'WhatsApp Business, SendGrid, Razorpay, Twilio, SMSCountry, Shiprocket, Google Maps, Zoom, OpenTok' },
  { layer: 'L3 · Frontend', items: 'JavaScript, TypeScript, React, Redux, Blade, Livewire, Tailwind CSS, Bootstrap' },
  { layer: 'L2 · Backend', items: 'PHP, Laravel, Filament, CodeIgniter, Node.js, Express, Django, REST APIs, SQL' },
  { layer: 'L1 · Data & Infra', items: 'MySQL, MongoDB, Redis, Prisma, AWS, DigitalOcean, Docker, Nginx, Apache, GitHub CI/CD, Playwright' },
]

export const training = [
  { period: '2025 — 2027', title: 'M.Tech, Artificial Intelligence & Machine Learning', org: 'BITS Pilani · Work Integrated Learning Programme (pursuing)', text: 'Advanced AI/ML alongside full-time industry work: ML, DNNs, NLP, Deep RL, Data Engineering and MLOps.' },
  { period: '2020 — 2022', title: 'Into software: courses & certifications', org: 'Pyspiders Python Full Stack · Google ML Crash Course · 100x Dev MERN · Brad Traversy MERN · Bolt Frontend', text: 'Retrained from engineering into full-stack development, then kept learning on the job.' },
  { period: '2016 — 2020', title: 'B.Tech, Energy Engineering', org: 'North Eastern Hill University, Shillong · GPA 7.95/10', text: 'Thesis on synthesising carbon materials by Chemical Vapor Deposition, plus a research internship at IASST (2019). That is where I learned to experiment carefully, a habit that carries straight into ML.' },
]

export const now = [
  { when: 'Nov 2026', text: 'Rebuilt this site as a paper. Writing one practical post a month, on software and on AI.' },
  { when: '2026', text: 'Studying NLP and Deep Reinforcement Learning at BITS, with every lab kept as a runnable notebook.' },
  { when: '2026', text: 'Built ML scoring and NLP proofs-of-concept for vehicle inspections at MFCWL.' },
  { when: 'Jul 2025', text: 'Joined Mahindra First Choice Wheels and started the M.Tech at BITS Pilani.' },
]
