"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/profile";
import { StaggerContainer, staggerItem } from "../ui/scroll-animate";
import { SectionHeader } from "../ui/section-header";

export function SkillsSection() {
  return (
    <section id="skills" className="mb-24">
      <SectionHeader title="Core Stack" number="03" />
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <motion.div key={i} variants={staggerItem} className="p-8 panel card-hover relative overflow-hidden bg-paper group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] text-ink">
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-xl font-black uppercase text-ink">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span key={skill} className="bg-surface border-2 border-ink px-4 py-2 font-mono text-xs font-black text-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-accent transition-colors">
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
