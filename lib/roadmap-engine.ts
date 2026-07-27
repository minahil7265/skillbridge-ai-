import type {
  UserProfile,
  RoadmapResult,
  RoadmapPhase,
  SkillGap,
  ProjectRecommendation,
  ResourceLink,
} from '@/types';
import { getCareerTrack } from './careers';

const PROJECT_DETAILS: Record<string, { technologies: string[]; skillsGained: string[]; description: string }> = {
  'Weather App': {
    technologies: ['Python', 'Requests', 'JSON'],
    skillsGained: ['API Integration', 'Error Handling', 'Data Parsing'],
    description: 'Fetch live weather data from a public API and display forecasts for any city.',
  },
  'Todo API': {
    technologies: ['Python', 'Flask', 'SQLite'],
    skillsGained: ['CRUD Operations', 'REST Design', 'Database Basics'],
    description: 'Build a RESTful API with full CRUD operations for managing tasks.',
  },
  'URL Shortener': {
    technologies: ['Python', 'Flask', 'Redis'],
    skillsGained: ['Routing', 'Caching', 'URL Encoding'],
    description: 'Create a service that converts long URLs into short, shareable links.',
  },
  'Blog API': {
    technologies: ['Python', 'PostgreSQL', 'JWT'],
    skillsGained: ['Authentication', 'Relational Schema', 'Pagination'],
    description: 'Design a multi-user blog backend with auth, posts, and comments.',
  },
  'Expense Tracker API': {
    technologies: ['Python', 'PostgreSQL', 'Docker'],
    skillsGained: ['Data Modeling', 'Containerization', 'Validation'],
    description: 'Track income and expenses with categorized transactions and summaries.',
  },
  'Chat Application': {
    technologies: ['Python', 'WebSockets', 'Redis'],
    skillsGained: ['Real-time Communication', 'Pub/Sub', 'Connection Management'],
    description: 'Build a real-time chat server supporting multiple rooms and users.',
  },
  'Distributed Task Queue': {
    technologies: ['Python', 'Celery', 'RabbitMQ', 'Redis'],
    skillsGained: ['Asynchronous Processing', 'Message Brokers', 'Scalability'],
    description: 'Process background jobs across multiple workers with retry logic.',
  },
  'Hospital Management System': {
    technologies: ['Python', 'PostgreSQL', 'Docker', 'AWS'],
    skillsGained: ['Complex Schema', 'Role-based Access', 'System Design'],
    description: 'Manage patients, appointments, billing, and medical records end-to-end.',
  },
  'Real-time Collaboration Tool': {
    technologies: ['Python', 'WebSockets', 'Redis', 'PostgreSQL'],
    skillsGained: ['Conflict Resolution', 'State Sync', 'Scalability'],
    description: 'Multi-user collaborative editing with live cursor and presence.',
  },
  'Image Classifier': {
    technologies: ['Python', 'PyTorch', 'NumPy'],
    skillsGained: ['Neural Networks', 'Data Loading', 'Model Training'],
    description: 'Train a CNN to classify images into categories with live accuracy tracking.',
  },
  'Sentiment Analyzer': {
    technologies: ['Python', 'NLTK', 'Scikit-learn'],
    skillsGained: ['Text Processing', 'Feature Extraction', 'Classification'],
    description: 'Analyze text sentiment polarity using classical NLP techniques.',
  },
  'Digit Recognizer': {
    technologies: ['Python', 'TensorFlow', 'Matplotlib'],
    skillsGained: ['Deep Learning', 'MNIST Dataset', 'Model Evaluation'],
    description: 'Recognize handwritten digits with a neural network from scratch.',
  },
  'AI Resume Analyzer': {
    technologies: ['Python', 'NLP', 'PyTorch', 'Flask'],
    skillsGained: ['Text Extraction', 'Entity Recognition', 'Web Integration'],
    description: 'Extract skills and score resumes against job descriptions using NLP.',
  },
  'Movie Recommender': {
    technologies: ['Python', 'Pandas', 'Scikit-learn'],
    skillsGained: ['Collaborative Filtering', 'Matrix Factorization', 'Evaluation'],
    description: 'Recommend movies based on user preferences and viewing history.',
  },
  'Chatbot with NLP': {
    technologies: ['Python', 'Transformers', 'PyTorch'],
    skillsGained: ['Language Models', 'Fine-tuning', 'Dialogue Management'],
    description: 'Build a context-aware chatbot using pre-trained language models.',
  },
  'Job Recommendation System': {
    technologies: ['Python', 'PyTorch', 'FastAPI', 'PostgreSQL'],
    skillsGained: ['Recommendation Systems', 'Embeddings', 'Production ML'],
    description: 'Match candidates to jobs using semantic similarity and ML ranking.',
  },
  'Autonomous Agent': {
    technologies: ['Python', 'LangChain', 'OpenAI API', 'Vector DB'],
    skillsGained: ['Agent Design', 'Tool Use', 'Reasoning Chains'],
    description: 'Build an AI agent that plans, acts, and uses tools autonomously.',
  },
  'Multi-modal AI Assistant': {
    technologies: ['Python', 'PyTorch', 'Transformers', 'Vision'],
    skillsGained: ['Multi-modal Fusion', 'Vision-Language', 'Deployment'],
    description: 'An assistant that understands images, text, and voice together.',
  },
  'Sales Dashboard': {
    technologies: ['Python', 'Pandas', 'Tableau'],
    skillsGained: ['Data Cleaning', 'Visualization', 'Storytelling'],
    description: 'Visualize sales performance with interactive charts and KPIs.',
  },
  'Data Cleaning Pipeline': {
    technologies: ['Python', 'Pandas', 'NumPy'],
    skillsGained: ['Data Wrangling', 'Missing Values', 'Outlier Detection'],
    description: 'Automate cleaning messy datasets into analysis-ready tables.',
  },
  'Excel Report Automator': {
    technologies: ['Python', 'openpyxl', 'Pandas'],
    skillsGained: ['Automation', 'Reporting', 'Scheduling'],
    description: 'Generate formatted Excel reports from raw data automatically.',
  },
  'Customer Segmentation': {
    technologies: ['Python', 'Scikit-learn', 'Pandas'],
    skillsGained: ['Clustering', 'RFM Analysis', 'Segmentation'],
    description: 'Segment customers using K-Means clustering and RFM scoring.',
  },
  'Cohort Analysis Dashboard': {
    technologies: ['Python', 'Pandas', 'Tableau'],
    skillsGained: ['Cohort Metrics', 'Retention Analysis', 'Visualization'],
    description: 'Track user retention across cohorts with heatmaps and trends.',
  },
  'Revenue Forecast Model': {
    technologies: ['Python', 'Statsmodels', 'Pandas'],
    skillsGained: ['Time Series', 'Forecasting', 'Statistical Modeling'],
    description: 'Forecast future revenue using ARIMA and seasonal decomposition.',
  },
  'Real-time Analytics Platform': {
    technologies: ['Python', 'Kafka', 'Spark', 'PostgreSQL'],
    skillsGained: ['Stream Processing', 'Big Data', 'Real-time ETL'],
    description: 'Process streaming events and surface live business metrics.',
  },
  'Churn Prediction Model': {
    technologies: ['Python', 'Scikit-learn', 'XGBoost'],
    skillsGained: ['Classification', 'Feature Engineering', 'Model Tuning'],
    description: 'Predict which customers will churn using historical behavior data.',
  },
  'Executive KPI Suite': {
    technologies: ['Python', 'Power BI', 'SQL'],
    skillsGained: ['Executive Reporting', 'KPI Design', 'Stakeholder Management'],
    description: 'A board-level dashboard suite tracking every core business metric.',
  },
  'Calculator App': {
    technologies: ['React', 'TypeScript', 'CSS'],
    skillsGained: ['State Management', 'Event Handling', 'UI Layout'],
    description: 'A responsive calculator with keyboard support and history.',
  },
  'Todo App': {
    technologies: ['React', 'TypeScript', 'LocalStorage'],
    skillsGained: ['CRUD UI', 'Persistence', 'Component Design'],
    description: 'Manage tasks with drag-and-drop reordering and filters.',
  },
  'Weather Widget': {
    technologies: ['React', 'TypeScript', 'API'],
    skillsGained: ['API Calls', 'Conditional Rendering', 'Styling'],
    description: 'A compact weather widget showing live conditions and forecasts.',
  },
  'E-commerce Storefront': {
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    skillsGained: ['Routing', 'State', 'Cart Logic'],
    description: 'A product catalog with cart, checkout flow, and search.',
  },
  'Dashboard UI': {
    technologies: ['React', 'Recharts', 'Tailwind'],
    skillsGained: ['Charts', 'Layouts', 'Data Visualization'],
    description: 'An analytics dashboard with charts, tables, and filters.',
  },
  'Social Media Feed': {
    technologies: ['React', 'TypeScript', 'Infinite Scroll'],
    skillsGained: ['Pagination', 'Optimistic UI', 'Performance'],
    description: 'An infinite-scrolling social feed with likes and comments.',
  },
  'Design System': {
    technologies: ['React', 'Storybook', 'TypeScript'],
    skillsGained: ['Component Architecture', 'Theming', 'Accessibility'],
    description: 'A reusable component library with documentation and tests.',
  },
  'Real-time Collaboration Editor': {
    technologies: ['React', 'WebSockets', 'CRDT'],
    skillsGained: ['Real-time Sync', 'Conflict Resolution', 'Presence'],
    description: 'A multi-user text editor with live cursors and offline support.',
  },
  '3D Product Configurator': {
    technologies: ['React', 'Three.js', 'WebGL'],
    skillsGained: ['3D Rendering', 'Animation', 'Performance'],
    description: 'Let users customize products in 3D with live previews.',
  },
  'Dockerized Web App': {
    technologies: ['Docker', 'Python', 'Nginx'],
    skillsGained: ['Containerization', 'Dockerfile', 'Networking'],
    description: 'Containerize a web app with multi-stage builds and compose.',
  },
  'Bash Automation Scripts': {
    technologies: ['Bash', 'Linux', 'Cron'],
    skillsGained: ['Scripting', 'Automation', 'Scheduling'],
    description: 'Automate backups, deployments, and system maintenance tasks.',
  },
  'Static Site Deploy Pipeline': {
    technologies: ['GitHub Actions', 'AWS S3', 'CloudFront'],
    skillsGained: ['CI/CD', 'Static Hosting', 'CDN'],
    description: 'Auto-deploy a static site on every push to main.',
  },
  'Kubernetes Cluster Setup': {
    technologies: ['Kubernetes', 'Helm', 'AWS EKS'],
    skillsGained: ['Cluster Management', 'Helm Charts', 'Networking'],
    description: 'Deploy and manage a multi-service app on Kubernetes.',
  },
  'Multi-env CI/CD Pipeline': {
    technologies: ['Jenkins', 'Docker', 'Terraform'],
    skillsGained: ['Pipeline Design', 'Environment Promotion', 'IaC'],
    description: 'Build a pipeline that promotes code across dev, staging, prod.',
  },
  'Infrastructure as Code': {
    technologies: ['Terraform', 'AWS', 'Ansible'],
    skillsGained: ['IaC', 'State Management', 'Provisioning'],
    description: 'Provision entire cloud environments from code.',
  },
  'GitOps Platform': {
    technologies: ['ArgoCD', 'Kubernetes', 'Git'],
    skillsGained: ['GitOps', 'Declarative Deploy', 'Drift Detection'],
    description: 'Manage Kubernetes deployments declaratively via Git.',
  },
  'Self-healing Infrastructure': {
    technologies: ['Kubernetes', 'Prometheus', 'Auto-scaling'],
    skillsGained: ['Auto-scaling', 'Health Checks', 'Observability'],
    description: 'Infrastructure that detects and recovers from failures automatically.',
  },
  'Multi-cloud Deployment System': {
    technologies: ['Terraform', 'AWS', 'GCP', 'Azure'],
    skillsGained: ['Multi-cloud', 'Portability', 'Failover'],
    description: 'Deploy and manage apps across multiple cloud providers.',
  },
  'Password Strength Checker': {
    technologies: ['Python', 'Cryptography', 'CLI'],
    skillsGained: ['Password Policies', 'Entropy', 'CLI Design'],
    description: 'Evaluate password strength against common attack patterns.',
  },
  'Network Scanner': {
    technologies: ['Python', 'Scapy', 'Nmap'],
    skillsGained: ['Port Scanning', 'Network Discovery', 'Reporting'],
    description: 'Scan networks for open ports and running services.',
  },
  'Log Analyzer': {
    technologies: ['Python', 'Regex', 'Pandas'],
    skillsGained: ['Log Parsing', 'Pattern Detection', 'Automation'],
    description: 'Parse and analyze server logs for anomalies and threats.',
  },
  'Vulnerability Scanner': {
    technologies: ['Python', 'OWASP ZAP', 'SQL'],
    skillsGained: ['Vulnerability Detection', 'CVE Matching', 'Reporting'],
    description: 'Scan web apps for OWASP Top 10 vulnerabilities.',
  },
  'SIEM Dashboard': {
    technologies: ['Python', 'Elasticsearch', 'Kibana'],
    skillsGained: ['Log Aggregation', 'Correlation', 'Alerting'],
    description: 'Centralize security events with correlation rules and alerts.',
  },
  'Web App Security Audit': {
    technologies: ['Burp Suite', 'Python', 'OWASP'],
    skillsGained: ['Manual Testing', 'Reporting', 'Remediation'],
    description: 'Perform a full security audit of a web application.',
  },
  'Honeypot System': {
    technologies: ['Python', 'Linux', 'Networking'],
    skillsGained: ['Deception Tech', 'Attack Analysis', 'Threat Intel'],
    description: 'Deploy fake services to trap and study attackers.',
  },
  'Threat Intelligence Platform': {
    technologies: ['Python', 'MISP', 'Elasticsearch'],
    skillsGained: ['Threat Feeds', 'IOC Management', 'Correlation'],
    description: 'Aggregate and correlate threat intelligence from multiple feeds.',
  },
  'Zero Trust Architecture': {
    technologies: ['Cloudflare', 'AWS', 'Identity'],
    skillsGained: ['Zero Trust', 'Identity Verification', 'Micro-segmentation'],
    description: 'Design a zero-trust network with identity-based access.',
  },
  'Blog Platform': {
    technologies: ['Next.js', 'PostgreSQL', 'Prisma'],
    skillsGained: ['SSR', 'Database Design', 'Auth'],
    description: 'A full blogging platform with markdown, auth, and comments.',
  },
  'E-commerce App': {
    technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
    skillsGained: ['Payments', 'Cart', 'Full-stack'],
    description: 'A complete store with checkout, payments, and admin panel.',
  },
  'Real-time Chat': {
    technologies: ['Next.js', 'WebSockets', 'Redis'],
    skillsGained: ['Real-time', 'Presence', 'Scaling'],
    description: 'A WhatsApp-style chat app with typing indicators and media.',
  },
  'Project Management Tool': {
    technologies: ['Next.js', 'PostgreSQL', 'Tailwind'],
    skillsGained: ['Drag-and-drop', 'Real-time Sync', 'RBAC'],
    description: 'A Trello-style board with teams, cards, and due dates.',
  },
  'SaaS Platform': {
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'AWS'],
    skillsGained: ['Multi-tenancy', 'Billing', 'Scalability'],
    description: 'A multi-tenant SaaS with subscription billing and analytics.',
  },
  'Social Network': {
    technologies: ['Next.js', 'PostgreSQL', 'Redis'],
    skillsGained: ['Feed Algorithm', 'Graph Data', 'Caching'],
    description: 'A social platform with feeds, connections, and notifications.',
  },
  'Multi-tenant App Suite': {
    technologies: ['Next.js', 'Kubernetes', 'PostgreSQL'],
    skillsGained: ['Multi-tenancy', 'Isolation', 'Enterprise Architecture'],
    description: 'A suite of apps serving thousands of tenants with isolation.',
  },
  'Notes App': {
    technologies: ['React Native', 'TypeScript', 'SQLite'],
    skillsGained: ['Local Storage', 'Navigation', 'UI'],
    description: 'A note-taking app with offline support and sync.',
  },
  'Fitness Tracker': {
    technologies: ['React Native', 'TypeScript', 'Charts'],
    skillsGained: ['Sensors', 'Data Viz', 'State'],
    description: 'Track workouts with charts, goals, and reminders.',
  },
  'Expense Tracker': {
    technologies: ['React Native', 'TypeScript', 'API'],
    skillsGained: ['Forms', 'Charts', 'Persistence'],
    description: 'Track spending with categories, budgets, and charts.',
  },
  'AR Shopping Experience': {
    technologies: ['React Native', 'ARKit', 'Three.js'],
    skillsGained: ['AR', '3D', 'Camera API'],
    description: 'Try products in AR before buying, right from the app.',
  },
};

function getProjectDetails(name: string, difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): ProjectRecommendation {
  const details = PROJECT_DETAILS[name] ?? {
    technologies: ['Python', 'JavaScript'],
    skillsGained: ['Problem Solving', 'Debugging'],
    description: 'A hands-on project to build real-world skills.',
  };
  const duration = difficulty === 'Beginner' ? '1-2 weeks' : difficulty === 'Intermediate' ? '3-4 weeks' : '6-8 weeks';
  return {
    name,
    difficulty,
    duration,
    technologies: details.technologies,
    skillsGained: details.skillsGained,
    description: details.description,
  };
}

function generatePhases(
  missingSkills: string[],
  existingSkills: string[],
  weeksPerMonth: number,
): RoadmapPhase[] {
  const phases: RoadmapPhase[] = [];
  const skillsPerPhase = Math.max(2, Math.ceil(missingSkills.length / 4));
  const allSkills = [...missingSkills, ...existingSkills.slice(0, 2)];

  const phaseTemplates = [
    { title: 'Foundations', focus: 'Core fundamentals and tooling', milestone: 'Solid grasp of language basics and version control' },
    { title: 'Building Blocks', focus: 'Frameworks and core domain skills', milestone: 'First working project shipped' },
    { title: 'Advanced Concepts', focus: 'Production-grade tools and patterns', milestone: 'Portfolio project deployed' },
    { title: 'Career Launch', focus: 'Interview prep, resume, and networking', milestone: 'Interview-ready with a polished portfolio' },
  ];

  for (let i = 0; i < 4; i++) {
    const phaseSkills = allSkills.slice(i * skillsPerPhase, (i + 1) * skillsPerPhase);
    const template = phaseTemplates[i];
    phases.push({
      month: i + 1,
      title: template.title,
      focus: template.focus,
      skills: phaseSkills.length > 0 ? phaseSkills : ['Review & Practice'],
      tasks: [
        `Study: ${phaseSkills.slice(0, 2).join(' & ') || 'core concepts'}`,
        `Build a small practice exercise using ${phaseSkills[0] ?? 'your stack'}`,
        `Complete one project milestone`,
        `Document what you learned in a blog or notes`,
      ],
      milestone: template.milestone,
    });
  }

  return phases;
}

function generateSkillGaps(
  trackSkills: { skill: string; demand: number; category: string; priority: 'high' | 'medium' | 'low' }[],
  currentSkills: string[],
): SkillGap[] {
  return trackSkills.map((s) => {
    const has = currentSkills.some(
      (c) => c.toLowerCase().trim() === s.skill.toLowerCase().trim(),
    );
    let status: SkillGap['status'];
    if (has) {
      status = 'existing';
    } else if (s.priority === 'high') {
      status = 'priority';
    } else if (s.priority === 'low') {
      status = 'optional';
    } else {
      status = 'missing';
    }
    return { skill: s.skill, status, demand: s.demand, category: s.category };
  });
}

function generateResources(missingSkills: string[]): ResourceLink[] {
  const base: ResourceLink[] = [
    { title: 'freeCodeCamp', type: 'Free Course', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org' },
    { title: 'The Odin Project', type: 'Free Course', provider: 'Odin', url: 'https://www.theodinproject.com' },
    { title: 'CS50 Introduction to Computer Science', type: 'Course', provider: 'Harvard / edX', url: 'https://cs50.harvard.edu' },
    { title: 'Machine Learning Specialization', type: 'Course', provider: 'Coursera', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
    { title: 'Full Stack Open', type: 'Free Course', provider: 'University of Helsinki', url: 'https://fullstackopen.com' },
    { title: 'MDN Web Docs', type: 'Documentation', provider: 'Mozilla', url: 'https://developer.mozilla.org' },
    { title: 'Python Documentation', type: 'Documentation', provider: 'Python.org', url: 'https://docs.python.org/3' },
    { title: 'Tech with Tim', type: 'YouTube', provider: 'YouTube', url: 'https://www.youtube.com/@TechWithTim' },
    { title: 'Fireship', type: 'YouTube', provider: 'YouTube', url: 'https://www.youtube.com/@Fireship' },
    { title: 'Traversy Media', type: 'YouTube', provider: 'YouTube', url: 'https://www.youtube.com/@TraversyMedia' },
  ];

  const skillResources: Record<string, ResourceLink> = {
    Docker: { title: 'Docker Get Started', type: 'Documentation', provider: 'Docker', url: 'https://docs.docker.com/get-started' },
    Kubernetes: { title: 'Kubernetes Basics', type: 'Documentation', provider: 'K8s', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics' },
    'React Native': { title: 'React Native Docs', type: 'Documentation', provider: 'Meta', url: 'https://reactnative.dev/docs/getting-started' },
    PyTorch: { title: 'PyTorch Tutorials', type: 'Documentation', provider: 'PyTorch', url: 'https://pytorch.org/tutorials' },
    'Next.js': { title: 'Next.js Learn', type: 'Free Course', provider: 'Vercel', url: 'https://nextjs.org/learn' },
    SQL: { title: 'SQLBolt', type: 'Free Course', provider: 'SQLBolt', url: 'https://sqlbolt.com' },
    AWS: { title: 'AWS Free Tier', type: 'Documentation', provider: 'Amazon', url: 'https://aws.amazon.com/free' },
    'Penetration Testing': { title: 'TryHackMe', type: 'Course', provider: 'TryHackMe', url: 'https://tryhackme.com' },
  };

  const extra = missingSkills
    .filter((s) => skillResources[s])
    .map((s) => skillResources[s])
    .slice(0, 4);

  return [...extra, ...base].slice(0, 8);
}

function generateResumeTips(track: string, missingSkills: string[], existingSkills: string[]): string[] {
  return [
    `Add keywords recruiters search for: ${missingSkills.slice(0, 4).join(', ')}`,
    `Highlight measurable achievements in your ${track} projects, not just technologies used`,
    `Include a "Projects" section with links to live demos and GitHub repos`,
    existingSkills.length > 0
      ? `Frame your existing ${existingSkills.slice(0, 3).join(', ')} experience with quantified impact`
      : `Emphasize transferable skills and fast learning ability`,
    `Tailor your resume for each application — match the job description's language`,
    `Keep it to one page, reverse-chronological, with clean formatting`,
  ];
}

function generateInterviewQuestions(track: string, missingSkills: string[]): string[] {
  const general = [
    `Walk us through a challenging ${track} project you've built.`,
    `How do you approach debugging a production issue?`,
    `Describe a time you had to learn a new technology quickly.`,
    `How do you stay current with developments in ${track}?`,
    `Tell us about a time you disagreed with a teammate and how you resolved it.`,
  ];
  const technical = missingSkills.slice(0, 5).map(
    (s) => `Explain how ${s} works and when you would choose it over an alternative.`,
  );
  return [...technical, ...general];
}

export function generateRoadmap(profile: UserProfile): RoadmapResult {
  const track = getCareerTrack(profile.careerGoal);
  const skillGaps = generateSkillGaps(track.requiredSkills, profile.currentSkills);
  const missingSkills = skillGaps.filter((g) => g.status !== 'existing').map((g) => g.skill);
  const existingSkills = skillGaps.filter((g) => g.status === 'existing').map((g) => g.skill);

  const weeksPerMonth = Math.max(2, Math.floor(profile.weeklyHours / 5));
  const phases = generatePhases(missingSkills, existingSkills, weeksPerMonth);

  const projects: ProjectRecommendation[] = [
    ...track.projects.beginner.map((p) => getProjectDetails(p, 'Beginner')),
    ...track.projects.intermediate.map((p) => getProjectDetails(p, 'Intermediate')),
    ...track.projects.advanced.map((p) => getProjectDetails(p, 'Advanced')),
  ];

  const resources = generateResources(missingSkills);
  const resumeTips = generateResumeTips(track.title, missingSkills, existingSkills);
  const interviewQuestions = generateInterviewQuestions(track.title, missingSkills);

  const demandScore = Math.round(
    track.requiredSkills.reduce((sum, s) => sum + s.demand, 0) / track.requiredSkills.length,
  );

  const levelMap: Record<string, string> = {
    beginner: 'Complete Beginner',
    intermediate: 'Some Experience',
    advanced: 'Experienced Practitioner',
    professional: 'Seasoned Professional',
  };

  const estimatedWeeks = phases.length * weeksPerMonth;

  return {
    id: `roadmap_${Date.now()}`,
    createdAt: Date.now(),
    profile,
    currentLevel: levelMap[profile.experienceLevel] ?? 'Beginner',
    targetLevel: track.targetLevel,
    estimatedWeeks,
    phases,
    skillGaps,
    projects,
    resources,
    resumeTips,
    interviewQuestions,
    demandScore,
  };
}
