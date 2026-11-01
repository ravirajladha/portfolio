// Projects page content. Add a repo to `projects`, or a walkthrough to `designs`.

const gh = (repo: string) => `https://github.com/ravirajladha/${repo}`

export type Repo = { name: string; group: string; stack: string; text: string; url: string }

export const projects: Repo[] = [
  { group: 'Building now', name: 'Threadline', stack: 'Next.js 16 · Payload CMS 3 · PostgreSQL · TypeScript', text: 'A modern clothing store built in public, one stage at a time: catalogue, cart, checkout and a headless CMS.', url: gh('threadline') },
  { group: 'Machine learning', name: 'Applied AI/ML portfolio', stack: 'Python · Jupyter · Git LFS', text: 'M.Tech coursework as runnable notebooks: search agents, RL environments, NLP pipelines and ML for software engineering.', url: gh('applied-ai-ml-portfolio') },
  { group: 'Machine learning', name: 'Web-page phishing detection', stack: 'Python · scikit-learn', text: 'Classification models that flag phishing pages from URL and page features, compared on precision and recall.', url: gh('2025005974-ml-assignment-2-web-page-phishing-detection') },
  { group: 'Machine learning', name: 'Bike-sharing demand prediction', stack: 'Python · regression models', text: 'Builds and compares regression models to forecast hourly bike-rental demand from weather and time features.', url: gh('-Bike-Sharing-Demand-Prediction-ML-Assignment-1') },
  { group: 'Platforms', name: 'Speeder logistics', stack: 'PHP MVC · MySQL', text: 'Shipment booking and tracking in the spirit of SpeedPost or Shiprocket.', url: gh('speeder') },
  { group: 'Platforms', name: 'AdBrovz', stack: 'PHP MVC · REST · Android', text: 'Marketplace connecting businesses and buyers: product search, direct payments and digital ads.', url: gh('adbrovz-mvc') },
  { group: 'Platforms', name: 'TagNCash (Web, MVC, API)', stack: 'Laravel · PHP · REST', text: 'Referral rewards: share a business and earn cashback when friends transact. Three variants for web and mobile.', url: gh('TagNCash-Web') },
  { group: 'Platforms', name: 'Land Vault', stack: 'Laravel · MySQL', text: 'Secure storage for land documents with typed records and per-role permissions.', url: gh('land-vault') },
  { group: 'Platforms', name: 'Vishvin Stock Management', stack: 'Laravel', text: 'Electricity-meter inventory and verification for Karnataka household smart-metering roll-outs.', url: gh('VishvinStockManagement') },
  { group: 'Platforms', name: 'Weighbridge camera IoT', stack: 'Laravel · IoT', text: 'Captures vehicle weight and camera snapshots from the weighbridge and links them to each trip.', url: gh('weighbridge-camera-IOT') },
  { group: 'Platforms', name: 'Art of Living suite', stack: 'Laravel', text: 'Organisation management, asset tracking and ticket distribution for a large non-profit.', url: gh('artofliving') },
  { group: 'Smaller builds', name: 'Mecwintech HR', stack: 'PHP MVC', text: 'Employee records, punch-in/out attendance and payslips.', url: gh('mecwintech') },
  { group: 'Smaller builds', name: 'HelloCart', stack: 'PHP MVC', text: 'Dine-in and food-ordering website.', url: gh('hellocart-php-mvc-version') },
  { group: 'Smaller builds', name: 'Sleep & stress test', stack: 'PHP MVC', text: 'Self-assessment questionnaire with scored results.', url: gh('natural-sleep-stress') },
  { group: 'Smaller builds', name: 'DSA in PHP', stack: 'PHP', text: 'Data-structures and algorithms practice, written in PHP.', url: gh('php-dsa') },
]

export type Step = { node: string; text: string }
export type Design = { id: string; title: string; tagline: string; steps: Step[]; question: string; answer: string }

export const designs: Design[] = [
  {
    id: 'checkout',
    title: 'Checkout that never double-charges',
    tagline: 'Payments arrive late, twice, or out of order. Design for it.',
    steps: [
      { node: 'Client', text: 'Browser creates an order and opens the gateway checkout. It sends an idempotency key so a double-tap creates one order, not two.' },
      { node: 'API', text: 'Validates the cart, reserves stock inside a transaction and stores the order as pending with the gateway order ID.' },
      { node: 'Gateway', text: 'Customer pays. The gateway calls our webhook, and may retry it many times if we are slow.' },
      { node: 'Webhook', text: 'Verifies the HMAC signature on the raw body, inserts the event ID into a unique-indexed table (duplicates bounce), then locks the order row and moves it pending → paid.' },
      { node: 'Queue', text: 'Emails, invoices and the courier booking run as jobs dispatched after commit. Each job checks "already done?" before acting.' },
      { node: 'Reconcile', text: 'A nightly job compares gateway payments with orders and fixes any webhook that never arrived.' },
    ],
    question: 'Two webhook retries hit two servers in the same millisecond. What stops a double shipment?',
    answer: 'The unique index on the event ID: only one insert can win. The row lock plus the "status must be pending" check covers the case where two different events race.',
  },
  {
    id: 'ml',
    title: 'Serving an ML model inside a business app',
    tagline: 'Training is half the job. The other half is getting predictions into a real workflow safely.',
    steps: [
      { node: 'Inspection', text: 'An inspector submits vehicle attributes such as age, mileage and defect severity, plus free-text remarks.' },
      { node: 'Validate', text: 'The API checks types, ranges and required fields. Models fail silently on bad input, so the API rejects it early.' },
      { node: 'Features', text: 'The same transformations used in training (encoding, scaling) are applied in one shared function to avoid training/serving skew.' },
      { node: 'Model', text: 'An XGBoost model returns a condition score and suggested price adjustment, and an NLP classifier tags the remarks with a confidence score.' },
      { node: 'Persist', text: 'Predictions, model version and confidence are stored next to the inspection, so every number can be audited later.' },
      { node: 'Monitor', text: 'Track input drift and how often humans override the model. Rising overrides are the signal to retrain.' },
    ],
    question: 'Offline accuracy was great, but production predictions are off. What do you check first?',
    answer: 'Training/serving skew: are the features computed exactly the same way in both places? Then data drift: has the input distribution changed since training?',
  },
  {
    id: 'judge',
    title: 'An online code judge for an LMS',
    tagline: 'Running untrusted code from 10,000 students without letting any of them break the server.',
    steps: [
      { node: 'Editor', text: 'A student submits code with a language ID. The API stores it and returns a submission ID immediately.' },
      { node: 'Queue', text: 'Submissions wait in a queue, so a spike before a deadline makes students wait rather than crashing the server.' },
      { node: 'Sandbox', text: 'A worker runs the code in an isolated container with no network, a read-only filesystem and CPU, memory and time limits.' },
      { node: 'Compare', text: 'Outputs are compared with hidden test cases, ignoring trailing whitespace, and a verdict is chosen: accepted, wrong answer, time limit or runtime error.' },
      { node: 'Result', text: 'The verdict is saved and pushed to the browser (or polled), and the course tracker updates progress.' },
    ],
    question: 'A student submits `while(true){}`. What protects everyone else?',
    answer: 'Per-run time and CPU limits inside the sandbox kill it. The queue and a fixed worker pool stop one bad job from starving the rest.',
  },
  {
    id: 'agent',
    title: 'A support chatbot grounded in a catalogue',
    tagline: 'How an LLM answers product questions without making things up.',
    steps: [
      { node: 'User', text: 'The customer asks "Which shampoo is best for dry hair?" The conversation ID loads the last few turns as memory.' },
      { node: 'Guard', text: 'Rate limiting per user and IP, input length caps, and a check for off-topic or abusive requests.' },
      { node: 'Retrieve', text: 'Search the product catalogue for relevant items and pass only those facts to the model.' },
      { node: 'LLM', text: 'The system prompt says to answer only from the provided products and to say "I don\'t know" otherwise. The model drafts an answer.' },
      { node: 'Check', text: 'Output guardrails: no invented products or prices, no medical claims. Then the turn is saved to the conversation.' },
    ],
    question: 'The bot recommends a product you don\'t sell. Which layer failed, and how do you fix it?',
    answer: 'Grounding. Tighten retrieval so only real catalogue items reach the model, instruct it to cite only those, and validate product names in the output check.',
  },
]
