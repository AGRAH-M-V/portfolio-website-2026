"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/profile";
import { FadeIn, StaggerContainer, staggerItem } from "../ui/scroll-animate";
import { SectionHeader } from "../ui/section-header";

export function ExperienceSection() {
  return (
    <section id="work" className="mb-24">
      <SectionHeader title="Engineering Experience" number="01" />
      <FadeIn delay={0.1}>
        <div className="panel p-10 sm:p-12 card-hover bg-paper">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
            <div>
              <h3 className="font-display text-3xl font-black tracking-tight text-ink uppercase">{experience.role}</h3>
              <p className="font-sans text-base font-bold text-ink mt-1">{experience.company} <span className="text-accent mx-2">|</span> {experience.location}</p>
            </div>
            <div className="font-mono text-xs font-semibold text-muted">
              {experience.period}
            </div>
          </div>
          <StaggerContainer className="space-y-5">
            {experience.highlights.map((item, i) => (
              <motion.div key={i} variants={staggerItem} className="flex items-start gap-4">
                <span className="text-ink mt-1 text-lg font-black">→</span>
                <p className="font-sans text-base font-medium text-ink leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>
    </section>
  );
}
