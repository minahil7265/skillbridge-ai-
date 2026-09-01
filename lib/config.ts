export const EDUCATION_OPTIONS = [
  'High School',
  'Self-Taught',
  'Bootcamp Graduate',
  'Undergraduate Student',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD',
  'Career Changer',
] as const;

export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner', desc: 'New to tech' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Some projects done' },
  { value: 'advanced', label: 'Advanced', desc: 'Comfortable building' },
  { value: 'professional', label: 'Professional', desc: 'Working in tech' },
] as const;

export const LEARNING_STYLES = [
  { value: 'visual', label: 'Visual', desc: 'Videos & diagrams' },
  { value: 'reading', label: 'Reading', desc: 'Docs & articles' },
  { value: 'hands-on', label: 'Hands-on', desc: 'Build & experiment' },
  { value: 'mixed', label: 'Mixed', desc: 'A bit of everything' },
] as const;

export const LANGUAGES = [
  'English', 'Spanish', 'French', 'German',
  'Portuguese', 'Hindi', 'Arabic', 'Mandarin',
] as const;

export const SUGGESTED_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Java', 'C++',
  'Git', 'Docker', 'AWS', 'Linux', 'HTML/CSS', 'Flask', 'PostgreSQL', 'MongoDB',
  'Pandas', 'NumPy', 'PyTorch', 'TensorFlow', 'Kubernetes', 'REST APIs',
] as const;

export const CAREER_GOAL_SUGGESTIONS = [
  'Frontend Engineer',
  'Backend Engineer',
  'Full-Stack Engineer',
  'AI Engineer',
  'Data Analyst',
  'DevOps Engineer',
  'Cybersecurity Engineer',
  'Mobile Engineer',
  'Cloud Engineer',
  'Machine Learning Engineer',
  'Data Scientist',
  'Game Developer',
] as const;

export const VALIDATION_LIMITS = {
  maxNameLength: 100,
  maxEducationLength: 100,
  maxCareerGoalLength: 200,
  maxSkillsCount: 50,
  maxSkillLength: 80,
  minWeeklyHours: 1,
  maxWeeklyHours: 80,
  maxLanguageLength: 50,
} as const;

export const AI_CONFIG = {
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,
  maxTokens: 4096,
  timeoutMs: 30000,
} as const;
