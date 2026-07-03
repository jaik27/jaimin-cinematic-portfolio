export type Capability = {
  label: string;
  value: string;
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  role: string;
  summary: string;
  bullets: string[];
  metrics: Capability[];
  image: string;
  imageAlt: string;
  motion: 'stack' | 'tunnel' | 'board' | 'orbit' | 'blueprint';
};

export const hero = {
  name: 'Jaimin Shah',
  tagline: 'Portfolio system for practical digital work',
  roles: ['Full Stack Dev', 'Data Analyst', 'Operations Management for SMEs', 'Digital Sales & Marketer', 'Verified Journalist'],
  intro:
    'I build working systems for people who need clearer data, cleaner workflows, sharper documentation and stronger digital reach.'
};

export const proofPoints: Capability[] = [
  { label: 'Indexed time-series records', value: '2.5M+' },
  { label: 'Editorial reach over six months', value: '900K+' },
  { label: 'Average views per article', value: '30K' },
  { label: 'Email deliverability rebuild', value: '95%+' }
];

export const caseStudies: CaseStudy[] = [
  {
    eyebrow: '01 / Full Stack Systems',
    title: 'Database-led websites with search, metadata and secure document flow.',
    role: 'Full Stack Dev',
    summary:
      'A portfolio chapter for custom web systems where the interface, database, metadata and documentation are designed together rather than patched after delivery.',
    bullets: [
      'Document management, multimedia organization and typo-tolerant retrieval.',
      'Structured GitHub, Trello, Dropbox and OneDrive workflows for delivery.',
      'Implementation notes that make maintenance understandable for non-technical owners.'
    ],
    metrics: [
      { label: 'Stack', value: 'React, DBMS, metadata' },
      { label: 'Workflow', value: 'Agile and SCRUM' }
    ],
    image: '/media/dbms-website.jpg',
    imageAlt: 'Dark dashboard and database website screenshots',
    motion: 'stack'
  },
  {
    eyebrow: '02 / Data Analyst',
    title: 'Signals, forecasts and dashboards built around decisions.',
    role: 'Data Analyst',
    summary:
      'Data work presented as an operator-facing layer: ingestion, feature engineering, predictive models, dashboards and written interpretation.',
    bullets: [
      'Real-time WebSocket ingestion with PostgreSQL storage and indexed querying.',
      'Predictive modeling, confidence scoring, classification, clustering and anomaly detection.',
      'Dashboards that explain what changed, why it matters and what action follows.'
    ],
    metrics: [
      { label: 'Latency target', value: '<2s' },
      { label: 'Records stored', value: '2.5M+' }
    ],
    image: '/media/ml-data.jpg',
    imageAlt: 'Machine learning chart and data visualization screenshot',
    motion: 'tunnel'
  },
  {
    eyebrow: '03 / Operations Management for SMEs',
    title: 'A command layer for work that usually lives across WhatsApp, Excel and memory.',
    role: 'Operations Management for SMEs',
    summary:
      'This section shows the business-facing side: procurement trails, stock movement, follow-up boards, implementation reports, audit notes and practical project control.',
    bullets: [
      'Workflow audits across procurement, inventory, sales, documents and reporting.',
      'Gantt-style planning, sprint boards, implementation checklists and SOPs.',
      'AI-assisted reporting that turns scattered activity into daily visibility.'
    ],
    metrics: [
      { label: 'Tools', value: 'Trello, GitHub, Gantt' },
      { label: 'Output', value: 'SOPs, audits, reports' }
    ],
    image: '/media/project-plan.jpg',
    imageAlt: 'Project planning table with levels, sprints and documentation tasks',
    motion: 'board'
  },
  {
    eyebrow: '04 / Digital Sales & Marketer',
    title: 'Editorial reach, CRM thinking and distribution built into one growth engine.',
    role: 'Digital Sales & Marketer',
    summary:
      'The media chapter connects Jay’s Vancouver, PR agency work, social proof, audience analytics, SEO and CRM-style follow-up into a measurable digital sales story.',
    bullets: [
      'SEO-optimized articles across culture, advocacy, food, travel and technology.',
      'PR collaboration, audience analytics, social media proof and campaign packaging.',
      'The Usurpers distribution system across publishing platforms, metadata and deliverability.'
    ],
    metrics: [
      { label: 'Six-month reach', value: '900K+' },
      { label: 'Average article views', value: '30K' }
    ],
    image: '/media/traffic-2025.png',
    imageAlt: 'Website traffic analytics screenshot',
    motion: 'orbit'
  },
  {
    eyebrow: '05 / Verified Journalist',
    title: 'Research, interviews and verification brought into technical delivery.',
    role: 'Verified Journalist',
    summary:
      'This section frames journalism as a working method: asking better questions, checking evidence, structuring messy source material and communicating clearly to stakeholders.',
    bullets: [
      'Verified journalist profile, investigative research and source-led writing.',
      'TrooRa editorial work with assigned topics, deadlines, fact-checking and revisions.',
      'Longform restructuring of a 300+ page forensic record into a deployable publishing system.'
    ],
    metrics: [
      { label: 'Manuscript rebuild', value: '100K+ words' },
      { label: 'Engagement', value: '6 months' }
    ],
    image: '/media/verified-journalist.webp',
    imageAlt: 'Verified journalist profile screenshot',
    motion: 'blueprint'
  }
];

export const supportingAssets = [
  { title: 'Social proof and audience packaging', src: '/media/social-content.jpg' },
  { title: 'Six-month traffic evidence', src: '/media/traffic-six-month.png' },
  { title: 'UAV powertrain calculator and engineering analysis', src: '/media/uav-powertrain.jpg' }
];
