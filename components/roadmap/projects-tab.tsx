'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Wrench, Trophy, Github, ArrowUpRight, Lightbulb, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { RoadmapResult, ProjectRecommendation } from '@/types';

const DIFFICULTY_CONFIG = {
  Beginner: { color: 'from-green-500 to-emerald-500', badge: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30' },
  Intermediate: { color: 'from-blue-500 to-cyan-500', badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' },
  Advanced: { color: 'from-violet-500 to-fuchsia-500', badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30' },
};

const PROJECT_IDEAS = [
  {
    title: 'Personal Portfolio Website',
    description: 'Showcase your projects, skills, and resume in a single polished site. Great first project to learn responsive design.',
    difficulty: 'Beginner' as const,
    why: 'Every developer needs one — it doubles as a resume and a live demo of your skills.',
  },
  {
    title: 'Recipe Finder App',
    description: 'Search and filter recipes by ingredient, cuisine, or dietary preference using a public API.',
    difficulty: 'Beginner' as const,
    why: 'Teaches API integration, search/filter logic, and state management in a fun way.',
  },
  {
    title: 'Markdown Note Manager',
    description: 'Create, edit, and organize notes with live markdown preview and local persistence.',
    difficulty: 'Beginner' as const,
    why: 'Practices CRUD, file handling, and parsing — core skills for any developer.',
  },
  {
    title: 'Weather Dashboard with Charts',
    description: 'Display multi-day forecasts with interactive charts, temperature trends, and location search.',
    difficulty: 'Intermediate' as const,
    why: 'Combines API integration with data visualization — a portfolio standout.',
  },
  {
    title: 'Real-time Polling App',
    description: 'Create live polls with real-time vote updates using WebSockets. Users see results update instantly.',
    difficulty: 'Intermediate' as const,
    why: 'Introduces real-time communication and concurrent data handling.',
  },
  {
    title: 'Habit Tracker with Streaks',
    description: 'Track daily habits, visualize streaks, and get motivational insights based on your consistency.',
    difficulty: 'Intermediate' as const,
    why: 'Practices date logic, data persistence, and chart-based analytics.',
  },
  {
    title: 'AI-Powered Content Summarizer',
    description: 'Paste any article or document and get an AI-generated summary with key takeaways and sentiment.',
    difficulty: 'Advanced' as const,
    why: 'Demonstrates AI integration, NLP, and practical product thinking — very impressive in interviews.',
  },
  {
    title: 'Multi-tenant SaaS Starter Kit',
    description: 'Build a subscription-based app with user accounts, billing, and per-tenant data isolation.',
    difficulty: 'Advanced' as const,
    why: 'Shows you understand real-world architecture: auth, billing, multi-tenancy, and deployment.',
  },
  {
    title: 'Collaborative Whiteboard',
    description: 'A real-time collaborative drawing canvas with multiple users, shapes, and export to image.',
    difficulty: 'Advanced' as const,
    why: 'Pushes your skills in real-time sync, canvas rendering, and conflict resolution.',
  },
];

export function ProjectsTab({ result }: { result: RoadmapResult }) {
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const filtered = filter === 'All'
    ? result.projects
    : result.projects.filter((p) => p.difficulty === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Recommended Projects</h2>
          <p className="mt-1 text-muted-foreground">
            Build these projects to gain hands-on experience and strengthen your portfolio.
          </p>
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Beginner">Beginner</TabsTrigger>
            <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="Advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>

      {/* Project Ideas */}
      <div className="mt-12">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <h2 className="font-display text-2xl font-bold">Project Ideas for Inspiration</h2>
        </div>
        <p className="mt-1 text-muted-foreground">
          Not sure what to build? Here are creative project ideas at every level to spark your imagination.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECT_IDEAS.map((idea, i) => {
            const config = DIFFICULTY_CONFIG[idea.difficulty];
            return (
              <motion.div
                key={idea.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group h-full overflow-hidden border-slate-200/60 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className={`h-1.5 bg-gradient-to-r ${config.color}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
                      <Badge variant="outline" className={`shrink-0 border ${config.badge}`}>
                        {idea.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{idea.description}</p>
                    <div className="flex items-start gap-2 rounded-lg bg-yellow-500/5 p-3 text-sm">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Why build this: </span>
                        {idea.why}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() => window.open(`https://github.com/search?q=${encodeURIComponent(idea.title)}`, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                      Find Similar on GitHub
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectRecommendation; index: number }) {
  const config = DIFFICULTY_CONFIG[project.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group h-full overflow-hidden border-slate-200/60 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className={`h-1.5 bg-gradient-to-r ${config.color}`} />
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
            <Badge variant="outline" className={`shrink-0 border ${config.badge}`}>
              {project.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{project.duration}</span>
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Wrench className="h-3.5 w-3.5" /> Technologies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Trophy className="h-3.5 w-3.5" /> Skills Gained
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.skillsGained.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full gap-1.5"
            onClick={() => window.open(`https://github.com/search?q=${encodeURIComponent(project.name)}`, '_blank')}
          >
            <Github className="h-4 w-4" />
            Find on GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
