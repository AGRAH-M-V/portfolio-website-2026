"use client";

import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, hobbyProjects } from "@/data/profile";
import { FadeIn } from "../ui/scroll-animate";
import { SectionHeader } from "../ui/section-header";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Lock body scroll when modal is open
  useBodyScrollLock(!!selectedProject);

  return (
    <section id="projects" className="mb-24">
      <SectionHeader title="Systems Built" number="02" />
      <div className="space-y-4">
        {projects.map((project, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <button
              onClick={() => setSelectedProject(project)}
              className="w-full text-left panel p-6 sm:p-8 card-hover bg-paper flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] font-black uppercase text-ink bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] px-2 py-0.5">{project.eyebrow}</span>
                  {i === 0 && <span className="font-mono text-[10px] font-black uppercase text-ink bg-surface border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] px-2 py-0.5">Featured</span>}
                </div>
                <h3 className="font-display font-black tracking-tight text-ink text-xl sm:text-2xl">{project.title}</h3>
              </div>
              <div className="text-ink group-hover:rotate-45 transition-transform shrink-0 ml-4 p-2 border-2 border-ink bg-surface group-hover:bg-accent shadow-[2px_2px_0px_0px_var(--color-ink)]">
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </div>
            </button>
          </FadeIn>
        ))}
      </div>

      <div className="mt-16 sm:mt-24">
        <h3 className="font-mono text-xl font-black uppercase tracking-widest text-ink mb-8 border-b-4 border-ink pb-4">Hobby Experiments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hobbyProjects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block panel p-6 card-hover bg-surface group h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {project.icon && <project.icon size={24} strokeWidth={2.5} className="text-ink shrink-0" />}
                    <h4 className="font-display font-bold text-lg text-ink group-hover:underline decoration-accent decoration-[3px] underline-offset-4">{project.title}</h4>
                  </div>
                  <ArrowUpRight size={20} strokeWidth={2.5} className="text-ink group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform shrink-0 ml-2" />
                </div>
                <p className="font-sans text-sm text-muted">{project.description}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-ink/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-full overflow-y-auto panel p-8 sm:p-12 bg-paper scrollbar-thin scrollbar-thumb-ink scrollbar-track-paper"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-ink bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all z-10"
                aria-label="Close modal"
              >
                <X size={24} strokeWidth={3} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs font-black uppercase text-ink bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] px-3 py-1">{selectedProject.eyebrow}</span>
              </div>
              
              <h3 className="font-display font-bold tracking-tight text-ink text-3xl sm:text-4xl mb-8 pr-12">
                {selectedProject.title}
              </h3>

              <div className="space-y-5 mb-12 max-w-3xl">
                {selectedProject.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <span className="text-accent mt-1.5 text-xs">●</span>
                    <p className="font-sans text-base text-muted leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-mono text-sm font-black uppercase tracking-widest text-ink mb-4 border-b-4 border-ink pb-2 inline-block">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech) => (
                    <span key={tech} className="bg-surface border-2 border-ink px-4 py-2 font-mono text-xs font-black text-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-accent transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
