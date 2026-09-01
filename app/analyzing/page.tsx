'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, Loader2, Sparkles, User, TrendingUp, AlertCircle } from 'lucide-react';
import { saveRoadmapToSupabase } from '@/lib/roadmap-service';
import { useAuth } from '@/components/auth-provider';
import type { UserProfile, RoadmapResult } from '@/types';

const STEPS = [
  { label: 'Analysing your profile', icon: User },
  { label: 'Detecting skill gaps', icon: BrainCircuit },
  { label: 'Comparing market demand', icon: TrendingUp },
  { label: 'Building personalised roadmap', icon: Sparkles },
];

export default function AnalyzingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const generate = async (profile: UserProfile) => {
    const stepDuration = 900;
    let step = 0;
    const stepInterval = setInterval(() => {
      step++;
      if (step <= STEPS.length) {
        setCurrentStep(step);
      }
      if (step >= STEPS.length) {
        clearInterval(stepInterval);
      }
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        return p + 1.5;
      });
    }, 35);

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate roadmap');
      }

      const data = await response.json();
      const result: RoadmapResult = data.roadmap;

      clearInterval(progressInterval);
      setProgress(100);

      localStorage.setItem('skillbridge_current_roadmap', JSON.stringify(result));

      if (user) {
        const { error: saveError } = await saveRoadmapToSupabase(result);
        if (saveError) {
          const local = JSON.parse(localStorage.getItem('skillbridge_roadmaps') || '[]');
          local.unshift(result);
          localStorage.setItem('skillbridge_roadmaps', JSON.stringify(local));
        }
      } else {
        const local = JSON.parse(localStorage.getItem('skillbridge_roadmaps') || '[]');
        local.unshift(result);
        localStorage.setItem('skillbridge_roadmaps', JSON.stringify(local));
      }

      setTimeout(() => router.push('/roadmap'), 400);
    } catch (err) {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  useEffect(() => {
    if (retrying) return;

    const stored = localStorage.getItem('skillbridge_profile');
    if (!stored) {
      router.push('/profile');
      return;
    }

    try {
      const profile: UserProfile = JSON.parse(stored);
      generate(profile);
    } catch {
      router.push('/profile');
    }

    return () => {
      setRetrying(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, user, retrying]);

  const handleRetry = () => {
    setError(null);
    setProgress(0);
    setCurrentStep(0);
    setRetrying(true);
  };

  if (error) {
    return (
      <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-10" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/10 blur-3xl" />

        <div className="relative w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h1 className="font-display text-2xl font-bold">Generation Failed</h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={handleRetry}
              className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-blue-500/50"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/profile')}
              className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-10" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 blur-3xl animate-pulse-glow" />

      <div className="relative w-full max-w-lg px-4 text-center">
        {/* Animated brain icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-2xl shadow-blue-500/40"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <BrainCircuit className="h-12 w-12" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          AI is analysing your profile
        </motion.h1>
        <p className="mt-2 text-muted-foreground">
          Building your personalised career roadmap...
        </p>

        {/* Progress bar */}
        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          {Math.min(Math.round(progress), 100)}%
        </div>

        {/* Steps */}
        <div className="mt-10 space-y-4 text-left">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isDone = i < currentStep;
            const isActive = i === currentStep;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isDone || isActive ? 1 : 0.4, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                  isDone
                    ? 'border-green-500/30 bg-green-500/5'
                    : isActive
                    ? 'border-blue-500/30 bg-blue-500/5'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-muted-foreground'
                }`}>
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : isActive ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-sm font-medium ${isDone || isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
                {isDone && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-auto text-xs text-green-500">
                    Done
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
