"use client";

import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { contributions, education, experience, principles, projects, skillGroups, profile, currentlyExploring } from "@/data/profile";
import { FadeIn, StaggerContainer, staggerItem } from "./scroll-animate";

const sectionNumbers: Record<string, string> = {
  experience: "01",
  projects: "02",
  skills: "03",
  exploring: "04",
  principles: "05",
  credentials: "06",
  contact: "07",
};

function SectionHeader({ title, id, number }: { title: string; id?: string; number?: string }) {
  return (
    <FadeIn>
      <div className="flex items-center gap-4 mb-12">
        {number && (
          <span className="font-mono text-xs font-bold text-accent/60">{number}</span>
        )}
        <div className="w-1 h-8 bg-accent rounded-full" />
        <h2 id={id} className="font-display text-3xl sm:text-4xl font-black tracking-tighter text-ink scroll-mt-24">
          {title}
        </h2>
      </div>
    </FadeIn>
  );
}

export function ExperienceSection() {
  return (
    <section id="work" className="mb-24">
      <SectionHeader title="Engineering Experience" number={sectionNumbers.experience} />
      <FadeIn delay={0.1}>
        <div className="border border-line rounded-[3px] p-10 sm:p-12 bg-surface/50 card-hover">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink">{experience.role}</h3>
              <p className="font-sans text-sm font-medium text-muted mt-1">{experience.company} <span className="text-line mx-2">|</span> {experience.location}</p>
            </div>
            <div className="font-mono text-xs font-semibold text-muted">
              {experience.period}
            </div>
          </div>
          <StaggerContainer className="space-y-5">
            {experience.highlights.map((item, i) => (
              <motion.div key={i} variants={staggerItem} className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">●</span>
                <p className="font-sans text-sm text-ink leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>
    </section>
  );
}

export function MindsetSection() {
  return (
    <section className="mb-24">
      <SectionHeader title="Engineering Principles" number={sectionNumbers.principles} />
      <StaggerContainer className="grid gap-4">
        {principles.map((principle, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex items-center gap-6 border border-line rounded-[3px] bg-surface/50 p-6 card-hover group relative overflow-hidden"
          >
            {/* Accent left border on hover */}
            <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-1 transition-all duration-300 rounded-l-sm" />
            <div className="font-mono text-xs font-bold text-muted group-hover:text-accent transition-colors">0{i + 1}</div>
            <p className="font-sans text-base font-medium text-ink">{principle}</p>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="mb-24">
      <SectionHeader title="Systems Built" number={sectionNumbers.projects} />
      <div className="space-y-8">
        {projects.map((project, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              className={`border border-line rounded-[3px] bg-surface/50 overflow-hidden card-hover ${
                i === 0 ? "border-l-2 border-l-accent" : ""
              }`}
            >
              <div className={`${i === 0 ? "p-10 sm:p-14" : "p-10 sm:p-12"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-semibold uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-sm">{project.eyebrow}</span>
                  {i === 0 && <span className="font-mono text-[10px] font-bold uppercase text-muted bg-surface border border-line px-2 py-0.5 rounded-sm">Featured</span>}
                </div>
                <h3 className={`font-display font-bold tracking-tight text-ink mb-6 ${i === 0 ? "text-2xl sm:text-3xl" : "text-2xl"}`}>{project.title}</h3>
                <div className="space-y-5 mb-10 max-w-2xl">
                  {project.bullets.map((bullet, j) => (
                    <div key={j} className="flex items-start gap-4">
                      <span className="text-accent mt-1.5 text-xs">●</span>
                      <p className="font-sans text-base text-muted leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="bg-surface border border-line px-3 py-1.5 font-mono text-[11px] font-medium text-muted rounded-sm pill-hover">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function CurrentlyExploringSection() {
  return (
    <section id="exploring" className="mb-24">
      <FadeIn>
        <div className="border border-line rounded-[3px] p-10 sm:p-12 bg-surface/50 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold text-accent/60">{sectionNumbers.exploring}</span>
            <div className="w-1 h-5 bg-accent rounded-full" />
            <h3 className="font-display text-xs font-bold tracking-widest uppercase text-muted">Currently Exploring</h3>
          </div>
          <StaggerContainer>
            <ul className="space-y-4">
              {currentlyExploring.map((topic, i) => (
                <motion.li key={i} variants={staggerItem} className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                  <span className="font-mono text-sm text-ink">{topic}</span>
                </motion.li>
              ))}
            </ul>
          </StaggerContainer>
        </div>
      </FadeIn>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="mb-24">
      <SectionHeader title="Core Stack" number={sectionNumbers.skills} />
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <motion.div key={i} variants={staggerItem} className="p-8 border border-line rounded-[3px] bg-surface/50 card-hover relative overflow-hidden group">
              {/* Subtle icon glow background */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-all duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-md bg-accent/10 text-accent">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-sans text-sm font-bold tracking-wide uppercase text-ink">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="bg-surface border border-line px-3 py-1.5 font-sans text-xs font-medium text-ink rounded-[2px] pill-hover">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </StaggerContainer>
    </section>
  );
}

export function CredentialsSection() {
  return (
    <section id="credentials" className="mb-24">
      <SectionHeader title="Education & Credentials" number={sectionNumbers.credentials} />
      <FadeIn delay={0.1}>
        <div className="border border-line rounded-[3px] bg-surface/50 p-10 sm:p-12 card-hover">
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

          <div className="mt-10 pt-10 border-t border-line">
            <div className="font-sans text-xs font-bold uppercase text-muted tracking-wide mb-8">Operational Highlights</div>
            <StaggerContainer className="space-y-5">
              {contributions.map((item, i) => (
                <motion.div key={i} variants={staggerItem} className="flex items-start gap-4">
                  <span className="text-accent mt-1.5 text-xs">●</span>
                  <span className="font-sans text-sm text-ink leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mb-24">
      <SectionHeader title="Connect" number={sectionNumbers.contact} />
      <FadeIn delay={0.1}>
        <div className="border border-line rounded-[3px] bg-surface/50 p-10 sm:p-12 card-hover">
          <h3 className="font-display text-3xl font-black tracking-tight text-ink mb-4">Let&apos;s build something robust.</h3>
          <p className="font-sans text-base text-muted mb-10 max-w-lg leading-relaxed">
            Need a full stack developer who can design, debug, and maintain complex systems? Feel free to reach out.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-sans text-sm font-semibold text-paper bg-ink px-6 py-3 rounded-[3px] hover:bg-ink/90 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 flex items-center gap-2"
            >
              <Mail size={16} /> Email <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm font-semibold text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line hover:border-accent/30 transition-all duration-300 flex items-center gap-2"
            >
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm font-semibold text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line hover:border-accent/30 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-sm font-semibold text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line hover:border-accent/30 transition-all duration-300 flex items-center gap-2"
            >
              <Github size={16} /> GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
