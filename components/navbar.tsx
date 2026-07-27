'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#careers', label: 'Careers' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#faq', label: 'FAQ' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-slate-200/60 dark:border-slate-800/60">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              SkillBridge<span className="text-blue-500"> AI</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="sm" className="gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
                <Sparkles className="h-4 w-4" />
                Generate Roadmap
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-b border-slate-200/60 dark:border-slate-800/60 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="mt-2 w-full justify-start gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}>
                <Button className="mt-1 w-full gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  <Sparkles className="h-4 w-4" />
                  Generate Roadmap
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
