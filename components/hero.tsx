"use client";

import { profile } from "@/data/profile";
import { Github, Linkedin } from "lucide-react";
import { FadeIn } from "./scroll-animate";
import { useState, useEffect } from "react";
import { AG01 } from "./ag-01";

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
      {/* AG-01 Companion Robot */}
      <div className="absolute right-10 xl:right-20 top-1/2 -translate-y-1/2 hidden lg:block z-0 pointer-events-auto scale-90 xl:scale-100 origin-right">
        <FadeIn delay={0.8} direction="up" noScroll>
          <AG01 />
        </FadeIn>
      </div>

      <div className="max-w-3xl relative z-10">
        <FadeIn delay={0.1} direction="none" noScroll>
          <div className="flex flex-wrap items-center gap-4 mb-6">
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
          <div className="h-8 mb-8 flex items-center overflow-hidden">
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
          <div className="flex flex-wrap items-center gap-4">
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
              className="flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-ink bg-surface border border-line px-6 py-3 rounded-[3px] hover:bg-line hover:border-accent/30 transition-all duration-300"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
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
