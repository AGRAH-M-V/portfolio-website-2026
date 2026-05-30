"use client";

import { ArrowUpRight } from "lucide-react";
import { contributions, education, experience, principles, projects, skillGroups, socials, profile, currentlyExploring } from "@/data/profile";

function SectionHeader({ title, id }: { title: string, id?: string }) {
  return (
    <h2 id={id} className="font-display text-3xl sm:text-4xl font-black tracking-tighter text-ink mb-12 scroll-mt-24">
      {title}
    </h2>
  );
}

export function ExperienceSection() {
  return (
    <section id="work" className="mb-24">
      <SectionHeader title="Engineering Experience" />
      <div className="border border-black/5 dark:border-white/5 rounded-[3px] p-10 sm:p-12 bg-surface/50 dark:bg-surface/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">{experience.role}</h3>
            <p className="font-sans text-sm font-medium text-muted mt-1">{experience.company} <span className="text-line mx-2">|</span> {experience.location}</p>
          </div>
          <div className="font-mono text-xs font-semibold text-muted">
            {experience.period}
          </div>
        </div>
        <div className="space-y-5">
          {experience.highlights.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-accent mt-1.5 text-xs">●</span>
              <p className="font-sans text-sm text-ink leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MindsetSection() {
  return (
    <section className="mb-24">
      <SectionHeader title="Engineering Principles" />
      <div className="grid gap-4">
        {principles.map((principle, i) => (
          <div key={i} className="flex items-center gap-6 border border-black/5 dark:border-white/5 rounded-[3px] bg-surface/50 dark:bg-surface/30 p-6 hover:border-black/10 dark:hover:border-white/10 transition-colors group">
            <div className="font-mono text-xs font-bold text-muted group-hover:text-ink transition-colors">0{i+1}</div>
            <p className="font-sans text-base font-medium text-ink">{principle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="mb-24">
      <SectionHeader title="Systems Built" />
      <div className="space-y-8">
        {projects.map((project, i) => (
          <div key={i} className="border border-black/5 dark:border-white/5 rounded-[3px] bg-surface/50 dark:bg-surface/30 overflow-hidden transition-colors">
            <div className="p-10 sm:p-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-semibold uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-sm">{project.eyebrow}</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink mb-6">{project.title}</h3>
              <div className="space-y-5 mb-10 max-w-2xl">
                {project.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <span className="text-accent mt-1.5 text-xs">●</span>
                    <p className="font-sans text-base text-muted leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {project.stack.map(tech => (
                  <span key={tech} className="bg-surface border border-black/5 dark:border-white/5 px-3 py-1.5 font-mono text-[11px] font-medium text-muted rounded-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CurrentlyExploringSection() {
  return (
    <section id="exploring" className="mb-24">
      <div className="border border-black/5 dark:border-white/5 rounded-[3px] p-10 sm:p-12 bg-surface/50 dark:bg-surface/30">
        <h3 className="font-display text-xs font-bold tracking-widest uppercase text-muted mb-6">Currently Exploring</h3>
        <ul className="space-y-4">
          {currentlyExploring.map((topic, i) => (
            <li key={i} className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-line"></span>
              <span className="font-mono text-sm text-ink">{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="mb-24">
      <SectionHeader title="Core Stack" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <div key={i} className="p-8 border border-black/5 dark:border-white/5 rounded-[3px] bg-surface/50 dark:bg-surface/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <Icon size={18} className="text-ink" />
                <h3 className="font-sans text-sm font-bold tracking-wide uppercase text-ink">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill} className="bg-surface border border-black/5 dark:border-white/5 px-3 py-1.5 font-sans text-xs font-medium text-ink rounded-[2px]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CredentialsSection() {
  return (
    <section id="credentials" className="mb-24">
      <SectionHeader title="Education & Credentials" />
      <div className="border border-black/5 dark:border-white/5 rounded-[3px] bg-surface/50 dark:bg-surface/30 p-10 sm:p-12 transition-colors">
        <div className="font-display text-xs font-bold uppercase text-muted tracking-widest mb-8">Education & Certifications</div>
        <div className="space-y-8">
          {education.map((item, i) => (
            <div key={i}>
              <div className="font-display text-lg font-bold tracking-tight text-ink">{item.title}</div>
              <div className="font-sans text-sm font-medium text-muted mt-1">{item.subtitle}</div>
              <div className="font-mono text-xs text-muted mt-2">{item.meta}</div>
              {item.detail && <div className="font-sans text-sm text-ink mt-2">{item.detail}</div>}
            </div>
          ))}
        </div>
        
        <div className="mt-10 pt-10 border-t border-black/5 dark:border-white/5">
          <div className="font-sans text-xs font-bold uppercase text-muted tracking-wide mb-8">Operational Highlights</div>
          <div className="space-y-5">
            {contributions.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">●</span>
                <span className="font-sans text-sm text-ink leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mb-24">
      <SectionHeader title="Connect" />
      <div className="border border-black/5 dark:border-white/5 rounded-[3px] bg-surface/50 dark:bg-surface/30 p-10 sm:p-12 transition-colors">
        <h3 className="font-display text-3xl font-black tracking-tight text-ink mb-4">Let&apos;s build something robust.</h3>
        <p className="font-sans text-base text-muted mb-10 max-w-lg leading-relaxed">
          Need a backend engineer who can design, debug, and maintain complex systems? Feel free to reach out.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          <a
            href={`mailto:${profile.email}`}
            className="font-sans text-sm font-semibold text-paper bg-ink px-6 py-3 rounded-[3px] hover:bg-ink/90 transition-colors flex items-center gap-2"
          >
            Send an Email <ArrowUpRight size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-sm font-semibold text-ink bg-surface border border-black/5 dark:border-white/5 px-6 py-3 rounded-[3px] hover:bg-line transition-colors flex items-center gap-2"
          >
            LinkedIn <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-black/5 dark:border-white/5 pt-8">
          {socials.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-2 font-sans text-sm font-medium text-muted hover:text-ink transition-colors"
              >
                <Icon size={16} />
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
