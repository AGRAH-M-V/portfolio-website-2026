"use client";

import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { profile } from "@/data/profile";
import { FadeIn } from "../ui/scroll-animate";
import { SectionHeader } from "../ui/section-header";

export function ContactSection() {
  return (
    <section id="contact" className="mb-24">
      <SectionHeader title="Connect" number="05" />
      <FadeIn delay={0.1}>
        <div className="panel p-10 sm:p-12 card-hover bg-paper">
          <h3 className="font-display text-4xl font-black tracking-tight text-ink mb-6 uppercase">Let&apos;s build something robust.</h3>
          <p className="font-sans text-base text-muted mb-10 max-w-lg leading-relaxed">
            Need a full stack developer who can design, debug, and maintain complex systems? Feel free to reach out.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'email_contact' })}
              className="font-display text-sm font-black tracking-widest uppercase text-paper bg-ink px-8 py-4 pill-hover flex items-center gap-3"
            >
              <Mail size={20} strokeWidth={2.5} /> Email <ArrowUpRight size={20} strokeWidth={2.5} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'linkedin_contact' })}
              className="font-display text-sm font-black tracking-widest uppercase text-ink bg-surface px-8 py-4 pill-hover flex items-center gap-3"
            >
              <Linkedin size={20} strokeWidth={2.5} /> LinkedIn <ArrowUpRight size={20} strokeWidth={2.5} />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'whatsapp_contact' })}
              className="font-display text-sm font-black tracking-widest uppercase text-ink bg-surface px-8 py-4 pill-hover flex items-center gap-3"
            >
              <MessageCircle size={20} strokeWidth={2.5} /> WhatsApp <ArrowUpRight size={20} strokeWidth={2.5} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'github_contact' })}
              className="font-display text-sm font-black tracking-widest uppercase text-ink bg-surface px-8 py-4 pill-hover flex items-center gap-3"
            >
              <Github size={20} strokeWidth={2.5} /> GitHub <ArrowUpRight size={20} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
