"use client";

import { education } from "@/data/profile";
import { FadeIn } from "../ui/scroll-animate";
import { SectionHeader } from "../ui/section-header";

export function CredentialsSection() {
  return (
    <section id="credentials" className="mb-24">
      <SectionHeader title="Education & Credentials" number="04" />
      <FadeIn delay={0.1}>
        <div className="panel p-10 sm:p-12 card-hover bg-paper">
          <div className="font-mono text-sm font-black uppercase text-ink tracking-widest mb-10 border-b-4 border-ink pb-2 inline-block">Education & Certifications</div>
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
        </div>
      </FadeIn>
    </section>
  );
}
