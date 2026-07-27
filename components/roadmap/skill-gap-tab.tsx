'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Star, Circle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { RoadmapResult, SkillGap } from '@/types';

const STATUS_CONFIG: Record<
  SkillGap['status'],
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  existing: { label: 'Existing', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/30' },
  priority: { label: 'High Priority', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/30' },
  missing: { label: 'Missing', icon: Circle, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/30' },
  optional: { label: 'Optional', icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/30' },
};

export function SkillGapTab({ result }: { result: RoadmapResult }) {
  const existing = result.skillGaps.filter((s) => s.status === 'existing');
  const priority = result.skillGaps.filter((s) => s.status === 'priority');
  const missing = result.skillGaps.filter((s) => s.status === 'missing');
  const optional = result.skillGaps.filter((s) => s.status === 'optional');

  const completionRate = Math.round((existing.length / result.skillGaps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Skill Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {existing.length} of {result.skillGaps.length} required skills
            </span>
            <span className="font-display text-2xl font-bold text-blue-600 dark:text-blue-400">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-3" />
        </CardContent>
      </Card>

      {/* Skill cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <SkillColumn title="Current Skills" skills={existing} statusKey="existing" />
        <SkillColumn title="High Priority Skills" skills={priority} statusKey="priority" />
        <SkillColumn title="Missing Skills" skills={missing} statusKey="missing" />
        <SkillColumn title="Optional Skills" skills={optional} statusKey="optional" />
      </div>

      {/* Demand chart */}
      <Card className="glass-card border-slate-200/60 dark:border-slate-800/60">
        <CardHeader>
          <CardTitle>Market Demand by Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...result.skillGaps]
              .sort((a, b) => b.demand - a.demand)
              .map((skill, i) => {
                const config = STATUS_CONFIG[skill.status];
                return (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-32 shrink-0 text-sm font-medium">{skill.skill}</div>
                    <div className="h-6 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.demand}%` }}
                        transition={{ delay: i * 0.03, duration: 0.5 }}
                        className={`flex h-full items-center justify-end rounded-full px-2 text-xs font-bold text-white ${
                          skill.status === 'existing' ? 'bg-green-500' :
                          skill.status === 'priority' ? 'bg-red-500' :
                          skill.status === 'missing' ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}
                      >
                        {skill.demand}
                      </motion.div>
                    </div>
                    <Badge variant="outline" className={`shrink-0 border ${config.bg} ${config.color}`}>
                      {config.label}
                    </Badge>
                  </motion.div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SkillColumn({
  title,
  skills,
  statusKey,
}: {
  title: string;
  skills: SkillGap[];
  statusKey: SkillGap['status'];
}) {
  const config = STATUS_CONFIG[statusKey];
  const Icon = config.icon;

  return (
    <Card className={`glass-card border ${config.bg}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            {title}
          </span>
          <span className="text-sm font-normal text-muted-foreground">{skills.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills in this category yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.skill}
                variant="secondary"
                className={`gap-1.5 rounded-lg ${config.bg} ${config.color}`}
              >
                {skill.skill}
                <span className="opacity-60">· {skill.demand}%</span>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
