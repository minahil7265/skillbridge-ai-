import Groq from 'groq-sdk';
import { z } from 'zod';
import { AI_CONFIG } from '@/lib/config';
import type { UserProfile, RoadmapResult } from '@/types';

const skillGapSchema = z.object({
  skill: z.string(),
  status: z.enum(['existing', 'missing', 'priority', 'optional']),
  demand: z.number().int().min(0).max(100),
  category: z.string(),
});

const phaseSchema = z.object({
  month: z.number().int(),
  title: z.string(),
  focus: z.string(),
  skills: z.array(z.string()),
  tasks: z.array(z.string()),
  milestone: z.string(),
});

const projectSchema = z.object({
  name: z.string(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  duration: z.string(),
  technologies: z.array(z.string()),
  skillsGained: z.array(z.string()),
  description: z.string(),
});

const resourceSchema = z.object({
  title: z.string(),
  type: z.enum(['YouTube', 'Course', 'Documentation', 'Free Course']),
  provider: z.string(),
  url: z.string().url(),
});

const roadmapContentSchema = z.object({
  currentLevel: z.string(),
  targetLevel: z.string(),
  estimatedWeeks: z.number().int().min(1).max(520),
  phases: z.array(phaseSchema).min(1).max(12),
  skillGaps: z.array(skillGapSchema),
  projects: z.array(projectSchema),
  resources: z.array(resourceSchema),
  resumeTips: z.array(z.string()),
  interviewQuestions: z.array(z.string()),
  demandScore: z.number().int().min(0).max(100),
});

export type RoadmapContent = z.infer<typeof roadmapContentSchema>;

function buildSystemPrompt(): string {
  return `You are an expert AI Career Coach and technical mentor with deep knowledge of the tech industry. You generate personalized, actionable career roadmaps for people transitioning into or advancing within tech careers.

You must respond with ONLY a valid JSON object — no markdown, no code fences, no commentary. The JSON must conform to this exact structure:

{
  "currentLevel": string,
  "targetLevel": string,
  "estimatedWeeks": number,
  "phases": [
    {
      "month": number,
      "title": string,
      "focus": string,
      "skills": string[],
      "tasks": string[],
      "milestone": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "status": "existing" | "missing" | "priority" | "optional",
      "demand": number (0-100),
      "category": string
    }
  ],
  "projects": [
    {
      "name": string,
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "duration": string,
      "technologies": string[],
      "skillsGained": string[],
      "description": string
    }
  ],
  "resources": [
    {
      "title": string,
      "type": "YouTube" | "Course" | "Documentation" | "Free Course",
      "provider": string,
      "url": string (must be a valid https URL)
    }
  ],
  "resumeTips": string[],
  "interviewQuestions": string[],
  "demandScore": number (0-100)
}

Rules:
- Personalize every section based on the user's current skills, experience level, career goal, weekly hours, and learning style.
- Mark skills the user already has as "existing" in skillGaps. Mark critical missing skills as "priority", important ones as "missing", and nice-to-haves as "optional".
- Create 3-6 phases depending on the user's experience gap and weekly hours. Each phase should be roughly one month.
- For each phase, list 3-6 specific skills to learn and 3-5 concrete tasks.
- Recommend 6-9 projects across beginner, intermediate, and advanced levels that build on each other progressively.
- Include 6-10 real, well-known resources (free courses, documentation, YouTube channels) with valid URLs.
- Provide 5-8 resume tips tailored to the user's career goal and skill gaps.
- Provide 6-10 interview questions specific to the target role and the user's skill gaps.
- The demandScore should reflect real market demand for the target role (0-100).
- estimatedWeeks should be realistic given the user's weeklyHours and the number of phases.
- All URLs must be valid https URLs to real, well-known resources.`;
}

function buildUserPrompt(profile: UserProfile): string {
  return `Generate a personalized career roadmap for this person:

Name: ${profile.name}
Education: ${profile.education}
Current Skills: ${profile.currentSkills.length > 0 ? profile.currentSkills.join(', ') : 'None yet'}
Experience Level: ${profile.experienceLevel}
Career Goal: ${profile.careerGoal}
Weekly Hours Available: ${profile.weeklyHours} hours/week
Learning Style: ${profile.learningStyle}
Preferred Language: ${profile.language}

Remember: respond with ONLY the JSON object, no other text.`;
}

function extractJson(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  return cleaned.trim();
}

export class AICareerCoach {
  private client: Groq;

  constructor(apiKey: string) {
    this.client = new Groq({ apiKey });
  }

  async generateRoadmap(profile: UserProfile): Promise<RoadmapResult> {
    const completion = await this.client.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserPrompt(profile) },
      ],
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      throw new Error('AI returned an empty response');
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(extractJson(raw));
    } catch {
      throw new Error('AI response could not be parsed as JSON');
    }

    const validated = roadmapContentSchema.parse(parsed);

    return {
      id: `roadmap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      profile,
      ...validated,
    };
  }
}

export function isGroqConfigured(): boolean {
  return !!process.env.GROQ_API_KEY;
}
