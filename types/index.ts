export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';

export type LearningStyle = 'visual' | 'reading' | 'hands-on' | 'mixed';

export interface UserProfile {
  name: string;
  education: string;
  currentSkills: string[];
  experienceLevel: ExperienceLevel;
  careerGoal: string;
  weeklyHours: number;
  learningStyle: LearningStyle;
  language: string;
}

export interface RoadmapPhase {
  month: number;
  title: string;
  focus: string;
  skills: string[];
  tasks: string[];
  milestone: string;
}

export interface SkillGap {
  skill: string;
  status: 'existing' | 'missing' | 'priority' | 'optional';
  demand: number;
  category: string;
}

export interface ProjectRecommendation {
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  technologies: string[];
  skillsGained: string[];
  description: string;
}

export interface ResourceLink {
  title: string;
  type: 'YouTube' | 'Course' | 'Documentation' | 'Free Course';
  provider: string;
  url: string;
}

export interface RoadmapResult {
  id: string;
  createdAt: number;
  profile: UserProfile;
  currentLevel: string;
  targetLevel: string;
  estimatedWeeks: number;
  phases: RoadmapPhase[];
  skillGaps: SkillGap[];
  projects: ProjectRecommendation[];
  resources: ResourceLink[];
  resumeTips: string[];
  interviewQuestions: string[];
  demandScore: number;
}
