import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AICareerCoach, isGroqConfigured } from '@/lib/ai/career-coach';
import { VALIDATION_LIMITS } from '@/lib/config';
import type { UserProfile } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const userProfileSchema = z.object({
  name: z.string().min(1).max(VALIDATION_LIMITS.maxNameLength),
  education: z.string().min(1).max(VALIDATION_LIMITS.maxEducationLength),
  currentSkills: z.array(z.string().max(VALIDATION_LIMITS.maxSkillLength)).max(VALIDATION_LIMITS.maxSkillsCount),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced', 'professional']),
  careerGoal: z.string().min(1).max(VALIDATION_LIMITS.maxCareerGoalLength),
  weeklyHours: z.number().int().min(VALIDATION_LIMITS.minWeeklyHours).max(VALIDATION_LIMITS.maxWeeklyHours),
  learningStyle: z.enum(['visual', 'reading', 'hands-on', 'mixed']),
  language: z.string().min(1).max(VALIDATION_LIMITS.maxLanguageLength),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parseResult = userProfileSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid input. Please complete all profile fields.' },
      { status: 422 },
    );
  }

  const profile = parseResult.data as UserProfile;

  if (!isGroqConfigured()) {
    return NextResponse.json(
      { error: 'AI service is not configured. The GROQ_API_KEY environment variable must be set.' },
      { status: 503 },
    );
  }

  const coach = new AICareerCoach(process.env.GROQ_API_KEY!);

  try {
    const roadmap = await coach.generateRoadmap(profile);
    return NextResponse.json({ roadmap });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';

    if (message.includes('rate') || message.includes('429')) {
      return NextResponse.json(
        { error: 'The AI service is busy. Please try again in a moment.' },
        { status: 429 },
      );
    }
    if (message.includes('timeout') || message.includes('aborted')) {
      return NextResponse.json(
        { error: 'The AI request timed out. Please try again.' },
        { status: 504 },
      );
    }
    if (message.includes('JSON') || message.includes('parse') || message.includes('empty')) {
      return NextResponse.json(
        { error: 'The AI returned an invalid response. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { error: 'Unable to generate roadmap right now. Please try again.' },
      { status: 502 },
    );
  }
}
