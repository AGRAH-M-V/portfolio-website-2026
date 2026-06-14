"use client";

import { profile } from "@/data/profile";
import { Github, Linkedin } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { FadeIn } from "./scroll-animate";
import { useState, useEffect } from "react";

const roles = [
  "Building reliable systems",
  "Production debugging & clarity",
  "Clean architecture advocate",
  "Automating engineering effort",
];

export function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleTyping, 500);
      } else {
        timer = setTimeout(handleTyping, typingSpeed);
      }
    };
    
    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative pt-8 lg:pt-14 pb-10 border-b border-line overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        <FadeIn delay={0.1} direction="none" noScroll>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-ink" />
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
                {profile.role} · {profile.location}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
              Available for opportunities
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25} direction="up" noScroll>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[1.05] mb-4 gradient-text">
            {profile.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.4} direction="up" noScroll>
          <div className="h-8 mb-8 flex justify-center items-center overflow-hidden">
            <span className="text-accent font-mono text-sm font-semibold mr-2">›</span>
            <span className="font-mono text-sm text-muted">
              {text}
              <span className="animate-blink text-accent ml-0.5">_</span>
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} direction="up" noScroll>
          <p className="text-xl sm:text-2xl lg:text-3xl font-sans text-muted leading-snug mb-12 text-balance font-light">
            {profile.summary}
          </p>
        </FadeIn>

        <FadeIn delay={0.65} direction="up" noScroll>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-paper bg-ink px-6 py-3 rounded-[3px] hover:bg-ink/90 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
            >
              View Systems
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'linkedin_hero' })}
              className="flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line hover:border-accent/30 transition-all duration-300"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'github_hero' })}
              className="flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line hover:border-accent/30 transition-all duration-300"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
