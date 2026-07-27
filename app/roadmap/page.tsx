'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Target, Clock, TrendingUp, Download, RefreshCw, Share2, Save, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import type { RoadmapResult } from '@/types';
import { generateRoadmapPDF } from '@/lib/pdf-generator';
import { RoadmapTab } from '@/components/roadmap/roadmap-tab';
import { SkillGapTab } from '@/components/roadmap/skill-gap-tab';
import { ProjectsTab } from '@/components/roadmap/projects-tab';
import { ResourcesTab } from '@/components/roadmap/resources-tab';
import { PrepTab } from '@/components/roadmap/prep-tab';

export default function RoadmapPage() {
  const router = useRouter();
  const [result, setResult] = useState<RoadmapResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('skillbridge_current_roadmap');
    if (!stored) {
      router.push('/profile');
      return;
    }
    setResult(JSON.parse(stored));
    setLoading(false);
  }, [router]);

  const handleDownload = () => {
    if (!result) return;
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          generateRoadmapPDF(result);
          resolve();
        }, 100);
      }),
      { loading: 'Generating PDF...', success: 'Roadmap PDF downloaded', error: 'Download failed' },
    );
  };

  const handleSave = () => {
    if (!result) return;
    const stored = localStorage.getItem('skillbridge_roadmaps');
    const roadmaps: RoadmapResult[] = stored ? JSON.parse(stored) : [];
    const existingIndex = roadmaps.findIndex((r) => r.id === result.id);
    if (existingIndex >= 0) {
      roadmaps[existingIndex] = result;
    } else {
      roadmaps.push(result);
    }
    localStorage.setItem('skillbridge_roadmaps', JSON.stringify(roadmaps));
    toast.success('Roadmap saved');
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `Check out my AI-generated ${result.profile.careerGoal} roadmap on SkillBridge AI!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My SkillBridge Roadmap', text: shareText, url: window.location.href });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success('Share text copied to clipboard');
    }
  };

  const handleRegenerate = () => {
    localStorage.removeItem('skillbridge_current_roadmap');
    localStorage.removeItem('skillbridge_profile');
    router.push('/profile');
  };

  if (loading || !result) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Sparkles className="h-8 w-8 animate-pulse text-blue-500" />
      </div>
    );
  }

  const existingCount = result.skillGaps.filter((s) => s.status === 'existing').length;
  const missingCount = result.skillGaps.filter((s) => s.status === 'missing' || s.status === 'priority').length;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-10" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge variant="secondary" className="mb-3 gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            Your Personalised Roadmap
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {result.profile.name}'s path to {result.profile.careerGoal}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Generated on {new Date(result.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Stats overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Target} label="Current Level" value={result.currentLevel} color="from-slate-500 to-slate-400" />
          <StatCard icon={Sparkles} label="Target Level" value={result.targetLevel} color="from-blue-500 to-cyan-500" />
          <StatCard icon={Clock} label="Estimated Time" value={`${result.estimatedWeeks} weeks`} color="from-violet-500 to-fuchsia-500" />
          <StatCard icon={TrendingUp} label="Market Demand" value={`${result.demandScore}/100`} color="from-emerald-500 to-teal-500" />
        </div>

        {/* Action bar */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button onClick={handleDownload} variant="outline" size="sm" className="gap-1.5">
            <FileText className="h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={handleShare} variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleRegenerate} variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            className="gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          >
            <Save className="h-4 w-4" />
            Save Roadmap
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="skills">Skill Gap</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="prep">Interview & Resume</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap">
            <RoadmapTab result={result} />
          </TabsContent>
          <TabsContent value="skills">
            <SkillGapTab result={result} />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab result={result} />
          </TabsContent>
          <TabsContent value="resources">
            <ResourcesTab result={result} />
          </TabsContent>
          <TabsContent value="prep">
            <PrepTab result={result} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-medium text-muted-foreground">{label}</div>
          <div className="truncate font-display text-lg font-bold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
