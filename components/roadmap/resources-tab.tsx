'use client';

import { motion } from 'framer-motion';
import { Youtube, BookOpen, GraduationCap, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RoadmapResult, ResourceLink } from '@/types';

const TYPE_CONFIG: Record<
  ResourceLink['type'],
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  YouTube: { icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/30' },
  Course: { icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/30' },
  'Free Course': { icon: BookOpen, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/30' },
  Documentation: { icon: FileText, color: 'text-violet-500', bg: 'bg-violet-500/10 border-violet-500/30' },
};

export function ResourcesTab({ result }: { result: RoadmapResult }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold">Curated Learning Resources</h2>
        <p className="mt-1 text-muted-foreground">
          Hand-picked free resources to help you learn every skill on your roadmap.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {result.resources.map((resource, i) => {
          const config = TYPE_CONFIG[resource.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="group h-full border-slate-200/60 dark:border-slate-800/60 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${config.bg} ${config.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-semibold">{resource.title}</h3>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-sm text-muted-foreground">{resource.provider}</p>
                      <Badge variant="outline" className={`mt-1.5 border ${config.bg} ${config.color}`}>
                        {resource.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
