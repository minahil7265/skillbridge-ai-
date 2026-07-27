'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Clock,
  Target,
  Trash2,
  Eye,
  Plus,
  History,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { RoadmapResult } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<RoadmapResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('skillbridge_roadmaps');
    if (stored) setRoadmaps(JSON.parse(stored));
    setLoading(false);
  }, []);

  const handleView = (id: string) => {
    const roadmap = roadmaps.find((r) => r.id === id);
    if (roadmap) {
      localStorage.setItem('skillbridge_current_roadmap', JSON.stringify(roadmap));
      router.push('/roadmap');
    }
  };

  const handleDelete = async (id: string) => {
    const updated = roadmaps.filter((r) => r.id !== id);
    localStorage.setItem('skillbridge_roadmaps', JSON.stringify(updated));
    setRoadmaps((prev) => prev.filter((r) => r.id !== id));
    toast.success('Roadmap deleted');
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Sparkles className="h-8 w-8 animate-pulse text-blue-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-10" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <Badge variant="secondary" className="mb-3 gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <History className="h-3.5 w-3.5" />
              Dashboard
            </Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your Roadmaps</h1>
            <p className="mt-2 text-muted-foreground">
              View, revisit, and manage your saved career roadmaps.
            </p>
          </div>
          <Link href="/profile">
            <Button className="gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
              <Plus className="h-4 w-4" />
              New Roadmap
            </Button>
          </Link>
        </motion.div>

        {roadmaps.length === 0 ? (
          <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">No roadmaps yet</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Generate your first AI-powered career roadmap to get started on your journey.
              </p>
              <Link href="/profile">
                <Button className="mt-6 gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  <Sparkles className="h-4 w-4" />
                  Generate Roadmap
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">{roadmaps.length}</div>
                    <div className="text-sm text-muted-foreground">Total Roadmaps</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">
                      {new Set(roadmaps.map((r) => r.profile.careerGoal)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Career Goals</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">
                      {Math.round(roadmaps.reduce((s, r) => s + r.demandScore, 0) / roadmaps.length)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Demand Score</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Roadmap list */}
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold">Recent Roadmaps</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roadmaps.map((roadmap, i) => (
                  <motion.div
                    key={roadmap.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group h-full border-slate-200/60 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-xl">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg leading-tight">{roadmap.profile.careerGoal}</CardTitle>
                          <Badge variant="outline" className="shrink-0">
                            {roadmap.demandScore}/100
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {roadmap.profile.name} · {roadmap.currentLevel}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {roadmap.phases[0]?.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {roadmap.phases[0] && roadmap.phases[0].skills.length > 4 && (
                            <span className="text-xs text-muted-foreground">
                              +{roadmap.phases[0].skills.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {roadmap.estimatedWeeks} weeks · {roadmap.phases.length} phases
                        </div>

                        <div className="mb-3 text-xs text-muted-foreground">
                          Created {new Date(roadmap.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 gap-1.5"
                            onClick={() => handleView(roadmap.id)}
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(roadmap.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
