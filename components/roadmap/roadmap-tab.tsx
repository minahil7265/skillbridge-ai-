'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Flag, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RoadmapResult } from '@/types';

export function RoadmapTab({ result }: { result: RoadmapResult }) {
  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-violet-500 sm:left-8" />

        <div className="space-y-6">
          {result.phases.map((phase, i) => (
            <motion.div
              key={phase.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-16 sm:pl-20"
            >
              {/* Node */}
              <div className={`absolute left-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${
                i === 0 ? 'from-blue-500 to-cyan-500' :
                i === 1 ? 'from-violet-500 to-fuchsia-500' :
                i === 2 ? 'from-emerald-500 to-teal-500' :
                'from-orange-500 to-red-500'
              } text-lg font-bold text-white shadow-lg sm:h-16 sm:w-16`}>
                M{phase.month}
              </div>

              <Card className="glass-card border-slate-200/60 dark:border-slate-800/60 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Month {phase.month}: {phase.title}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">{phase.focus}</p>
                    </div>
                    <Badge variant="outline" className="gap-1.5 rounded-full border-blue-500/30 text-blue-600 dark:text-blue-400">
                      <Flag className="h-3 w-3" />
                      {phase.milestone}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Skills */}
                  <div className="mb-4">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills to Learn</div>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="rounded-lg">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Weekly Tasks</div>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, ti) => (
                        <li key={ti} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress overview */}
      <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Learning Journey Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4 text-center">
              <div className="font-display text-3xl font-bold text-blue-600 dark:text-blue-400">{result.phases.length}</div>
              <div className="text-sm text-muted-foreground">Learning Phases</div>
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4 text-center">
              <div className="font-display text-3xl font-bold text-violet-500">{result.estimatedWeeks}</div>
              <div className="text-sm text-muted-foreground">Estimated Weeks</div>
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4 text-center">
              <div className="font-display text-3xl font-bold text-emerald-500">{result.phases.reduce((s, p) => s + p.skills.length, 0)}</div>
              <div className="text-sm text-muted-foreground">Skills to Master</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
