'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  User,
  Code2,
  Target,
  Clock,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  X,
  Palette,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { CAREER_TRACKS, CAREER_GOAL_OPTIONS } from '@/lib/careers';
import type { UserProfile, ExperienceLevel, LearningStyle } from '@/types';

const STEPS = [
  { id: 0, title: 'About You', icon: User },
  { id: 1, title: 'Your Skills', icon: Code2 },
  { id: 2, title: 'Your Goal', icon: Target },
  { id: 3, title: 'Preferences', icon: Clock },
];

const EDUCATION_OPTIONS = [
  'High School',
  'Self-Taught',
  'Bootcamp Graduate',
  'Undergraduate Student',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD',
  'Career Changer',
];

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string; desc: string }[] = [
  { value: 'beginner', label: 'Beginner', desc: 'New to tech' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Some projects done' },
  { value: 'advanced', label: 'Advanced', desc: 'Comfortable building' },
  { value: 'professional', label: 'Professional', desc: 'Working in tech' },
];

const LEARNING_STYLES: { value: LearningStyle; label: string; desc: string }[] = [
  { value: 'visual', label: 'Visual', desc: 'Videos & diagrams' },
  { value: 'reading', label: 'Reading', desc: 'Docs & articles' },
  { value: 'hands-on', label: 'Hands-on', desc: 'Build & experiment' },
  { value: 'mixed', label: 'Mixed', desc: 'A bit of everything' },
];

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Hindi', 'Arabic', 'Mandarin'];

const SUGGESTED_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Java', 'C++',
  'Git', 'Docker', 'AWS', 'Linux', 'HTML/CSS', 'Flask', 'PostgreSQL', 'MongoDB',
  'Pandas', 'NumPy', 'PyTorch', 'TensorFlow', 'Kubernetes', 'REST APIs',
];

const fadeVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState('');
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skillbridge_profile');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fall through to default
        }
      }
    }
    return {
      name: '',
      education: '',
      currentSkills: [],
      experienceLevel: 'beginner',
      careerGoal: '',
      weeklyHours: 10,
      learningStyle: 'mixed',
      language: 'English',
    };
  });

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !profile.currentSkills.includes(trimmed)) {
      setProfile({ ...profile, currentSkills: [...profile.currentSkills, trimmed] });
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, currentSkills: profile.currentSkills.filter((s) => s !== skill) });
  };

  const canProceed = () => {
    if (step === 0) return profile.name.trim() !== '' && profile.education !== '';
    if (step === 2) return profile.careerGoal !== '';
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleGenerate = () => {
    localStorage.setItem('skillbridge_profile', JSON.stringify(profile));
    router.push('/analyzing');
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-10" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      i < step
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : i === step
                        ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 text-muted-foreground'
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs font-medium ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 rounded-full transition-colors ${i < step ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card border-slate-200/60 dark:border-slate-800/60 shadow-xl">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Step 0: About You */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Tell us about you</h2>
                      <p className="mt-1 text-muted-foreground">Let's start with the basics.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-1.5">
                        <User className="h-4 w-4" /> Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g. Alex Johnson"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education" className="flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4" /> Current Education <span className="text-destructive">*</span>
                      </Label>
                      <Select value={profile.education} onValueChange={(v) => setProfile({ ...profile, education: v })}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                        <SelectContent>
                          {EDUCATION_OPTIONS.map((edu) => (
                            <SelectItem key={edu} value={edu}>{edu}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Experience Level</Label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {EXPERIENCE_LEVELS.map((level) => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => setProfile({ ...profile, experienceLevel: level.value })}
                            className={`rounded-xl border-2 p-3 text-left transition-all ${
                              profile.experienceLevel === level.value
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50'
                            }`}
                          >
                            <div className="text-sm font-semibold">{level.label}</div>
                            <div className="text-xs text-muted-foreground">{level.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Skills */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">What can you already do?</h2>
                      <p className="mt-1 text-muted-foreground">Add any skills you already know — even basics. We'll find the gaps.</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5">
                        <Code2 className="h-4 w-4" /> Current Skills
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a skill and press Enter"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addSkill(skillInput);
                            }
                          }}
                          className="h-12"
                        />
                        <Button
                          type="button"
                          size="icon"
                          className="h-12 w-12"
                          onClick={() => addSkill(skillInput)}
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Selected skills */}
                      {profile.currentSkills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {profile.currentSkills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="gap-1 rounded-full bg-blue-500/10 px-3 py-1.5 text-blue-600 dark:text-blue-400"
                            >
                              {skill}
                              <button onClick={() => removeSkill(skill)} className="ml-1 rounded-full hover:bg-blue-500/20">
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      <div className="mt-4">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Quick add:</p>
                        <div className="flex flex-wrap gap-2">
                          {SUGGESTED_SKILLS.filter((s) => !profile.currentSkills.includes(s)).slice(0, 12).map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => addSkill(skill)}
                              className="rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-medium transition-colors hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              + {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Career Goal */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Where do you want to go?</h2>
                      <p className="mt-1 text-muted-foreground">Choose your target career — we'll build the path to get there.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goal" className="flex items-center gap-1.5">
                        <Target className="h-4 w-4" /> Career Goal <span className="text-destructive">*</span>
                      </Label>
                      <Select value={profile.careerGoal} onValueChange={(v) => setProfile({ ...profile, careerGoal: v })}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your target career" />
                        </SelectTrigger>
                        <SelectContent>
                          {CAREER_GOAL_OPTIONS.map((goal) => (
                            <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {profile.careerGoal && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4"
                      >
                        {(() => {
                          const track = CAREER_TRACKS.find((t) => t.title === profile.careerGoal);
                          if (!track) return null;
                          return (
                            <div>
                              <p className="text-sm font-semibold">{track.title}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{track.description}</p>
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {track.requiredSkills.slice(0, 6).map((s) => (
                                  <Badge key={s.skill} variant="outline" className="text-xs">
                                    {s.skill}
                                  </Badge>
                                ))}
                                <span className="text-xs text-muted-foreground">+{track.requiredSkills.length - 6} more</span>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 3: Preferences */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">How do you learn best?</h2>
                      <p className="mt-1 text-muted-foreground">A few preferences to tailor your roadmap.</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" /> Weekly Study Hours: <span className="font-bold text-blue-600 dark:text-blue-400">{profile.weeklyHours}h</span>
                      </Label>
                      <Slider
                        value={[profile.weeklyHours]}
                        onValueChange={(v) => setProfile({ ...profile, weeklyHours: v[0] })}
                        min={2}
                        max={40}
                        step={1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>2h (casual)</span>
                        <span>20h (dedicated)</span>
                        <span>40h (full-time)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-1.5">
                        <Palette className="h-4 w-4" /> Preferred Learning Style
                      </Label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {LEARNING_STYLES.map((style) => (
                          <button
                            key={style.value}
                            type="button"
                            onClick={() => setProfile({ ...profile, learningStyle: style.value })}
                            className={`rounded-xl border-2 p-3 text-left transition-all ${
                              profile.learningStyle === style.value
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50'
                            }`}
                          >
                            <div className="text-sm font-semibold">{style.label}</div>
                            <div className="text-xs text-muted-foreground">{style.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="flex items-center gap-1.5">
                        <Globe className="h-4 w-4" /> Preferred Language
                      </Label>
                      <Select value={profile.language} onValueChange={(v) => setProfile({ ...profile, language: v })}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                className="gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
              >
                {step === STEPS.length - 1 ? (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Roadmap
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
