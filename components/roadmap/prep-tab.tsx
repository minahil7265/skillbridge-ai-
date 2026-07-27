'use client';

import { motion } from 'framer-motion';
import { FileText, MessageSquare, Lightbulb, CheckCircle2, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RoadmapResult } from '@/types';

export function PrepTab({ result }: { result: RoadmapResult }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Resume Tips */}
      <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
            AI Resume Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.resumeTips.map((tip, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-sm"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Interview Questions */}
      <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            AI Interview Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.interviewQuestions.map((q, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2 text-sm"
              >
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                <span>{q}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Summary card */}
      <Card className="glass-card border-slate-200/60 dark:border-slate-800/60 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Your Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1. Learn</div>
              <p className="mt-1 text-sm text-muted-foreground">Follow your monthly roadmap and master the skills in order.</p>
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4">
              <div className="text-2xl font-bold text-violet-500">2. Build</div>
              <p className="mt-1 text-sm text-muted-foreground">Complete the recommended projects to build a strong portfolio.</p>
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4">
              <div className="text-2xl font-bold text-emerald-500">3. Prepare</div>
              <p className="mt-1 text-sm text-muted-foreground">Use the resume tips and interview questions to get ready.</p>
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4">
              <div className="text-2xl font-bold text-orange-500">4. Apply</div>
              <p className="mt-1 text-sm text-muted-foreground">Start applying to roles that match your target level.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
