import { profile } from "@/data/profile";
import { Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-20 lg:pt-32 pb-10 border-b border-line">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-ink"></span>
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
              {profile.role} · {profile.location}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-semibold uppercase text-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Available for opportunities
          </div>
        </div>
        <div className="sm:hidden flex items-center gap-2 font-mono text-xs font-semibold uppercase text-muted mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Available for opportunities
        </div>
        
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter text-ink leading-[1.05] mb-8">
          {profile.name}
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl font-sans text-muted leading-snug mb-12 text-balance font-light">
          {profile.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-paper bg-ink px-6 py-3 rounded-[3px] hover:bg-ink/90 transition-colors"
          >
            View Systems
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line transition-colors"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
