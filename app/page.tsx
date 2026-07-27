'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BrainCircuit,
  Target,
  BookOpen,
  TrendingUp,
  BarChart3,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Star,
  Quote,
  Server,
  BarChart3 as BarChartIcon,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Layers,
  Smartphone,
  Compass,
  Trophy,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CAREER_TRACKS } from '@/lib/careers';

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'AI Skill Gap Analysis',
    description: 'Our engine compares your current skills against real market demand and pinpoints exactly what you are missing.',
  },
  {
    icon: Target,
    title: 'Personalised Roadmap',
    description: 'Get a month-by-month learning plan tailored to your experience, available time, and career goal.',
  },
  {
    icon: Rocket,
    title: 'Project Recommendations',
    description: 'Hand-picked projects at beginner, intermediate, and advanced levels — each with technologies and skills gained.',
  },
  {
    icon: BookOpen,
    title: 'Curated Resources',
    description: 'Free courses, YouTube channels, and official documentation mapped to every skill on your roadmap.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Track your journey with a visual timeline, milestones, and a dashboard that keeps you motivated.',
  },
  {
    icon: Trophy,
    title: 'Interview & Resume Prep',
    description: 'AI-generated interview questions and resume tips specific to your target role and skill gaps.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Aisha K.',
    role: 'CS Student → Backend Engineer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'I went from not knowing where to start to landing my first backend internship in 4 months. The roadmap was a game-changer.',
  },
  {
    name: 'Marcus L.',
    role: 'Self-taught → Full-Stack Dev',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The skill gap analysis showed me exactly what I was missing. Three months later I had a portfolio that got me hired.',
  },
  {
    name: 'Priya S.',
    role: 'Analyst → Data Scientist',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The project recommendations were spot on. Building the recommended projects taught me more than any course.',
  },
  {
    name: 'David O.',
    role: 'IT Support → DevOps Engineer',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Switching careers felt impossible until I had a clear plan. SkillBridge gave me the structure I needed.',
  },
];

const FAQS = [
  {
    q: 'How does SkillBridge AI generate my roadmap?',
    a: 'You tell us your current skills, experience level, career goal, and available study time. Our AI engine compares your profile against real market demand for that role and builds a month-by-month plan with specific skills, projects, and resources for each phase.',
  },
  {
    q: 'Is SkillBridge AI free to use?',
    a: 'Yes. You can generate and view your roadmap, skill gap analysis, and project recommendations completely free. Your roadmaps are saved locally so you can revisit them anytime.',
  },
  {
    q: 'Which careers are supported?',
    a: 'We currently support Backend, AI, Data Analyst, Frontend, DevOps, Cybersecurity, Full-Stack, and Mobile engineering tracks — each with its own required skills, demand scores, and project recommendations.',
  },
  {
    q: 'Can I regenerate my roadmap?',
    a: 'Absolutely. If your goals or available time change, just update your profile and generate a fresh roadmap. Your previous roadmaps are saved in your dashboard history.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account required. Your roadmaps are stored in your browser so you can access them instantly without signing up.',
  },
  {
    q: 'How accurate is the skill gap analysis?',
    a: 'Our skill demand scores are based on current job market data across major tech roles. The analysis updates as you add new skills to your profile, so it stays relevant as you grow.',
  },
];

const CAREER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  BrainCircuit,
  BarChart3: BarChartIcon,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Layers,
  Smartphone,
};

const STATS = [
  { value: '8', label: 'Career Tracks' },
  { value: '80+', label: 'Skills Mapped' },
  { value: '40+', label: 'Projects' },
  { value: '100%', label: 'Free Forever' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-20" />
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="secondary" className="mb-6 gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Career Planning
            </Badge>

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Build Your Tech Career
              <br />
              <span className="text-gradient">Roadmap with AI</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Tell us where you are and where you want to go. Our AI builds a personalised learning plan with skill gap analysis, project recommendations, and interview prep — in seconds.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/profile">
                <Button size="lg" className="h-12 gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-base text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50">
                  <Sparkles className="h-5 w-5" />
                  Generate Roadmap
                </Button>
              </Link>
              <Link href="#careers">
                <Button size="lg" variant="outline" className="h-12 gap-2 rounded-full px-8 text-base">
                  <Compass className="h-5 w-5" />
                  Explore Careers
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No sign-up required · Free forever · Results in seconds
            </div>
          </motion.div>

          {/* Hero preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="glass-card rounded-2xl p-2 shadow-2xl shadow-blue-500/10">
              <div className="rounded-xl bg-background/50 p-6">
                <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">skillbridge.ai/roadmap</span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {['Month 1: Foundations', 'Month 2: Building Blocks', 'Month 3: Advanced'].map((label, i) => (
                    <div key={label} className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${i === 0 ? 'from-blue-500 to-cyan-500' : i === 1 ? 'from-violet-500 to-fuchsia-500' : 'from-emerald-500 to-teal-500'} text-sm font-bold text-white`}>
                          {i + 1}
                        </div>
                        <span className="text-sm font-semibold">{label}</span>
                      </div>
                      <div className="space-y-2">
                        {['Python', 'Git', 'SQL'].slice(0, 3).map((s) => (
                          <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" />
              Features
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to reach your goal
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Six AI-powered features that turn a vague career aspiration into a concrete, actionable plan.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group h-full border-slate-200/60 dark:border-slate-800/60 transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Tracks */}
      <section id="careers" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full">
              <Compass className="h-3.5 w-3.5" />
              Career Tracks
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Pick your destination
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Eight in-demand tech career tracks, each with its own skill map, demand scores, and project recommendations.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAREER_TRACKS.map((track, i) => {
              const Icon = CAREER_ICONS[track.icon] ?? Server;
              return (
                <motion.div
                  key={track.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link href="/profile" className="block h-full">
                    <Card className="group h-full overflow-hidden border-slate-200/60 dark:border-slate-800/60 transition-all hover:-translate-y-1 hover:shadow-xl">
                      <div className={`h-2 bg-gradient-to-r ${track.color}`} />
                      <CardHeader>
                        <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${track.color} text-white shadow-lg`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{track.title}</CardTitle>
                        <CardDescription className="text-sm">{track.tagline}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{track.requiredSkills.length} skills mapped</span>
                          <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
                            Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full">
              <Star className="h-3.5 w-3.5" />
              Testimonials
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Learners who reached their goals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real stories from people who used SkillBridge to go from where they were to where they wanted to be.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full border-slate-200/60 dark:border-slate-800/60">
                  <CardContent className="pt-6">
                    <Quote className="h-8 w-8 text-blue-500/30" />
                    <p className="mt-4 text-base leading-relaxed">{t.quote}</p>
                    <div className="mt-6 flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full">
              <BookOpen className="h-3.5 w-3.5" />
              FAQ
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.q}
                  value={faq.q}
                  className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 px-4"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 px-8 py-16 text-center text-white shadow-2xl shadow-blue-500/30 sm:px-16"
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to build your roadmap?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
                It takes 2 minutes. You will get a full career plan, skill gap analysis, and project recommendations — instantly.
              </p>
              <Link href="/profile" className="mt-8 inline-block">
                <Button size="lg" className="h-12 gap-2 rounded-full bg-white px-8 text-base text-blue-600 shadow-xl hover:bg-blue-50">
                  <Sparkles className="h-5 w-5" />
                  Generate My Roadmap
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
