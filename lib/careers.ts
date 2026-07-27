export interface CareerTrack {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  requiredSkills: { skill: string; demand: number; category: string; priority: 'high' | 'medium' | 'low' }[];
  projects: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  targetLevel: string;
  color: string;
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'backend',
    title: 'Backend Engineer',
    icon: 'Server',
    tagline: 'Build the APIs and services that power everything',
    description: 'Design scalable server-side applications, databases, and APIs that handle millions of requests.',
    requiredSkills: [
      { skill: 'Python', demand: 92, category: 'Language', priority: 'high' },
      { skill: 'SQL', demand: 88, category: 'Database', priority: 'high' },
      { skill: 'REST APIs', demand: 90, category: 'Architecture', priority: 'high' },
      { skill: 'Git', demand: 85, category: 'Tools', priority: 'high' },
      { skill: 'Docker', demand: 78, category: 'DevOps', priority: 'medium' },
      { skill: 'PostgreSQL', demand: 82, category: 'Database', priority: 'high' },
      { skill: 'Redis', demand: 65, category: 'Database', priority: 'low' },
      { skill: 'Microservices', demand: 72, category: 'Architecture', priority: 'medium' },
      { skill: 'AWS', demand: 80, category: 'Cloud', priority: 'medium' },
      { skill: 'CI/CD', demand: 70, category: 'DevOps', priority: 'low' },
    ],
    projects: {
      beginner: ['Weather App', 'Todo API', 'URL Shortener'],
      intermediate: ['Blog API', 'Expense Tracker API', 'Chat Application'],
      advanced: ['Distributed Task Queue', 'Hospital Management System', 'Real-time Collaboration Tool'],
    },
    targetLevel: 'Mid-Level Backend Engineer',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ai',
    title: 'AI Engineer',
    icon: 'BrainCircuit',
    tagline: 'Build intelligent systems with machine learning',
    description: 'Create AI-powered applications, train models, and deploy ML systems to production.',
    requiredSkills: [
      { skill: 'Python', demand: 95, category: 'Language', priority: 'high' },
      { skill: 'Machine Learning', demand: 94, category: 'AI/ML', priority: 'high' },
      { skill: 'Statistics', demand: 85, category: 'Math', priority: 'high' },
      { skill: 'PyTorch', demand: 88, category: 'Framework', priority: 'high' },
      { skill: 'TensorFlow', demand: 80, category: 'Framework', priority: 'medium' },
      { skill: 'NLP', demand: 82, category: 'AI/ML', priority: 'medium' },
      { skill: 'Pandas', demand: 86, category: 'Library', priority: 'high' },
      { skill: 'NumPy', demand: 84, category: 'Library', priority: 'high' },
      { skill: 'MLOps', demand: 70, category: 'DevOps', priority: 'low' },
      { skill: 'Computer Vision', demand: 75, category: 'AI/ML', priority: 'low' },
    ],
    projects: {
      beginner: ['Image Classifier', 'Sentiment Analyzer', 'Digit Recognizer'],
      intermediate: ['AI Resume Analyzer', 'Movie Recommender', 'Chatbot with NLP'],
      advanced: ['Job Recommendation System', 'Autonomous Agent', 'Multi-modal AI Assistant'],
    },
    targetLevel: 'Junior AI Engineer',
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'data',
    title: 'Data Analyst',
    icon: 'BarChart3',
    tagline: 'Turn raw data into business decisions',
    description: 'Analyze datasets, build dashboards, and uncover insights that drive strategy.',
    requiredSkills: [
      { skill: 'SQL', demand: 93, category: 'Database', priority: 'high' },
      { skill: 'Python', demand: 88, category: 'Language', priority: 'high' },
      { skill: 'Excel', demand: 80, category: 'Tools', priority: 'medium' },
      { skill: 'Tableau', demand: 82, category: 'Visualization', priority: 'high' },
      { skill: 'Power BI', demand: 78, category: 'Visualization', priority: 'medium' },
      { skill: 'Statistics', demand: 85, category: 'Math', priority: 'high' },
      { skill: 'Pandas', demand: 86, category: 'Library', priority: 'high' },
      { skill: 'Data Visualization', demand: 84, category: 'Visualization', priority: 'high' },
      { skill: 'ETL', demand: 68, category: 'Data Engineering', priority: 'low' },
      { skill: 'A/B Testing', demand: 72, category: 'Analytics', priority: 'medium' },
    ],
    projects: {
      beginner: ['Sales Dashboard', 'Data Cleaning Pipeline', 'Excel Report Automator'],
      intermediate: ['Customer Segmentation', 'Cohort Analysis Dashboard', 'Revenue Forecast Model'],
      advanced: ['Real-time Analytics Platform', 'Churn Prediction Model', 'Executive KPI Suite'],
    },
    targetLevel: 'Junior Data Analyst',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'frontend',
    title: 'Frontend Engineer',
    icon: 'MonitorSmartphone',
    tagline: 'Craft beautiful, responsive user interfaces',
    description: 'Build delightful web experiences with modern frameworks and pixel-perfect design.',
    requiredSkills: [
      { skill: 'JavaScript', demand: 94, category: 'Language', priority: 'high' },
      { skill: 'React', demand: 92, category: 'Framework', priority: 'high' },
      { skill: 'TypeScript', demand: 88, category: 'Language', priority: 'high' },
      { skill: 'HTML/CSS', demand: 90, category: 'Web', priority: 'high' },
      { skill: 'Tailwind CSS', demand: 82, category: 'Framework', priority: 'medium' },
      { skill: 'Next.js', demand: 85, category: 'Framework', priority: 'high' },
      { skill: 'Git', demand: 85, category: 'Tools', priority: 'high' },
      { skill: 'REST APIs', demand: 80, category: 'Architecture', priority: 'medium' },
      { skill: 'Testing', demand: 72, category: 'Quality', priority: 'low' },
      { skill: 'Accessibility', demand: 68, category: 'Quality', priority: 'low' },
    ],
    projects: {
      beginner: ['Calculator App', 'Todo App', 'Weather Widget'],
      intermediate: ['E-commerce Storefront', 'Dashboard UI', 'Social Media Feed'],
      advanced: ['Design System', 'Real-time Collaboration Editor', '3D Product Configurator'],
    },
    targetLevel: 'Mid-Level Frontend Engineer',
    color: 'from-sky-500 to-indigo-500',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    icon: 'Network',
    tagline: 'Automate everything from code to production',
    description: 'Bridge development and operations with CI/CD, infrastructure as code, and monitoring.',
    requiredSkills: [
      { skill: 'Linux', demand: 90, category: 'OS', priority: 'high' },
      { skill: 'Docker', demand: 92, category: 'Containers', priority: 'high' },
      { skill: 'Kubernetes', demand: 88, category: 'Orchestration', priority: 'high' },
      { skill: 'AWS', demand: 88, category: 'Cloud', priority: 'high' },
      { skill: 'CI/CD', demand: 90, category: 'Automation', priority: 'high' },
      { skill: 'Terraform', demand: 82, category: 'IaC', priority: 'medium' },
      { skill: 'Python', demand: 78, category: 'Language', priority: 'medium' },
      { skill: 'Bash', demand: 80, category: 'Scripting', priority: 'medium' },
      { skill: 'Monitoring', demand: 75, category: 'Operations', priority: 'medium' },
      { skill: 'Git', demand: 85, category: 'Tools', priority: 'high' },
    ],
    projects: {
      beginner: ['Dockerized Web App', 'Bash Automation Scripts', 'Static Site Deploy Pipeline'],
      intermediate: ['Kubernetes Cluster Setup', 'Multi-env CI/CD Pipeline', 'Infrastructure as Code'],
      advanced: ['GitOps Platform', 'Self-healing Infrastructure', 'Multi-cloud Deployment System'],
    },
    targetLevel: 'Junior DevOps Engineer',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'security',
    title: 'Cybersecurity Engineer',
    icon: 'ShieldCheck',
    tagline: 'Defend systems against evolving threats',
    description: 'Protect organizations through penetration testing, threat analysis, and security engineering.',
    requiredSkills: [
      { skill: 'Networking', demand: 92, category: 'Fundamentals', priority: 'high' },
      { skill: 'Linux', demand: 88, category: 'OS', priority: 'high' },
      { skill: 'Python', demand: 82, category: 'Language', priority: 'high' },
      { skill: 'Penetration Testing', demand: 88, category: 'Offensive', priority: 'high' },
      { skill: 'Cryptography', demand: 80, category: 'Fundamentals', priority: 'medium' },
      { skill: 'SIEM', demand: 78, category: 'Defensive', priority: 'medium' },
      { skill: 'OWASP', demand: 85, category: 'Web Security', priority: 'high' },
      { skill: 'Bash', demand: 75, category: 'Scripting', priority: 'medium' },
      { skill: 'Incident Response', demand: 72, category: 'Defensive', priority: 'low' },
      { skill: 'Cloud Security', demand: 80, category: 'Cloud', priority: 'medium' },
    ],
    projects: {
      beginner: ['Password Strength Checker', 'Network Scanner', 'Log Analyzer'],
      intermediate: ['Vulnerability Scanner', 'SIEM Dashboard', 'Web App Security Audit'],
      advanced: ['Honeypot System', 'Threat Intelligence Platform', 'Zero Trust Architecture'],
    },
    targetLevel: 'Junior Security Engineer',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Engineer',
    icon: 'Layers',
    tagline: 'Own the entire stack, end to end',
    description: 'Build complete web applications from database schemas to polished user interfaces.',
    requiredSkills: [
      { skill: 'JavaScript', demand: 93, category: 'Language', priority: 'high' },
      { skill: 'React', demand: 90, category: 'Frontend', priority: 'high' },
      { skill: 'Node.js', demand: 88, category: 'Backend', priority: 'high' },
      { skill: 'TypeScript', demand: 86, category: 'Language', priority: 'high' },
      { skill: 'SQL', demand: 85, category: 'Database', priority: 'high' },
      { skill: 'PostgreSQL', demand: 80, category: 'Database', priority: 'medium' },
      { skill: 'REST APIs', demand: 88, category: 'Architecture', priority: 'high' },
      { skill: 'Git', demand: 85, category: 'Tools', priority: 'high' },
      { skill: 'Docker', demand: 75, category: 'DevOps', priority: 'medium' },
      { skill: 'AWS', demand: 78, category: 'Cloud', priority: 'medium' },
    ],
    projects: {
      beginner: ['Todo App', 'Blog Platform', 'URL Shortener'],
      intermediate: ['E-commerce App', 'Real-time Chat', 'Project Management Tool'],
      advanced: ['SaaS Platform', 'Social Network', 'Multi-tenant App Suite'],
    },
    targetLevel: 'Mid-Level Full-Stack Engineer',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'mobile',
    title: 'Mobile Engineer',
    icon: 'Smartphone',
    tagline: 'Build apps people carry everywhere',
    description: 'Create native and cross-platform mobile experiences for iOS and Android.',
    requiredSkills: [
      { skill: 'JavaScript', demand: 85, category: 'Language', priority: 'high' },
      { skill: 'React Native', demand: 88, category: 'Framework', priority: 'high' },
      { skill: 'TypeScript', demand: 84, category: 'Language', priority: 'high' },
      { skill: 'Mobile UI', demand: 86, category: 'Design', priority: 'high' },
      { skill: 'REST APIs', demand: 82, category: 'Architecture', priority: 'high' },
      { skill: 'Git', demand: 85, category: 'Tools', priority: 'high' },
      { skill: 'State Management', demand: 80, category: 'Architecture', priority: 'medium' },
      { skill: 'Navigation', demand: 75, category: 'Mobile', priority: 'medium' },
      { skill: 'Push Notifications', demand: 70, category: 'Mobile', priority: 'low' },
      { skill: 'App Store Deployment', demand: 68, category: 'DevOps', priority: 'low' },
    ],
    projects: {
      beginner: ['Calculator App', 'Weather App', 'Notes App'],
      intermediate: ['Expense Tracker', 'Social Feed App', 'Fitness Tracker'],
      advanced: ['E-commerce App', 'Real-time Messaging', 'AR Shopping Experience'],
    },
    targetLevel: 'Junior Mobile Engineer',
    color: 'from-cyan-500 to-blue-500',
  },
];

export const CAREER_GOAL_OPTIONS = CAREER_TRACKS.map((t) => t.title);

export function getCareerTrack(goal: string): CareerTrack {
  const found = CAREER_TRACKS.find(
    (t) => t.title.toLowerCase() === goal.toLowerCase() || t.id === goal.toLowerCase(),
  );
  return found ?? CAREER_TRACKS[0];
}
