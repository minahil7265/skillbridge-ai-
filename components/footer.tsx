import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold">
                SkillBridge<span className="text-blue-500"> AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              AI-powered career roadmaps that help you bridge the gap between where you are and where you want to be.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/profile" className="hover:text-foreground">Generate Roadmap</Link></li>
              <li><Link href="/#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/#careers" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200/60 dark:border-slate-800/60 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2026 SkillBridge AI. Built for learners, by learners.</p>
        </div>
      </div>
    </footer>
  );
}
