"use client";

import { profile } from "@/data/profile";
import { FileText } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { FadeIn } from "./ui/scroll-animate";
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
    <section className="relative pt-2 lg:pt-4 pb-10 border-b border-line overflow-hidden">
      <div className="w-full relative z-10 flex flex-col items-start text-left">
        <FadeIn delay={0.1} direction="none" noScroll>
          <div className="flex flex-wrap justify-start items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-ink" />
              <span className="font-mono text-xs font-semibold tracking-widest uppercase text-muted">
                {profile.role} · {profile.location}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-ink px-2 py-1 bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)]">
              AVAILABLE FOR OPPORTUNITIES
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25} direction="up" noScroll>
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-display font-black tracking-tighter leading-[0.95] mb-4 text-ink uppercase">
            {profile.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.4} direction="up" noScroll>
          <div className="h-10 mb-8 flex justify-start items-center overflow-hidden bg-ink text-paper px-4 border-2 border-ink shadow-[4px_4px_0px_0px_var(--color-ink)]">
            <span className="text-accent font-mono text-sm font-bold mr-2">{'>'}</span>
            <span className="font-mono text-sm font-bold uppercase tracking-wider">
              {text}
              <span className="text-accent ml-0.5 animate-pulse">_</span>
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} direction="up" noScroll>
          <p className="text-xl sm:text-2xl lg:text-3xl font-sans text-ink leading-snug mb-12 text-balance font-medium max-w-3xl border-l-4 border-ink pl-6">
            {profile.summary}
          </p>
        </FadeIn>

        <FadeIn delay={0.65} direction="up" noScroll className="w-full">
          <div className="flex flex-wrap items-center gap-4 w-full">
            <a
              href="#projects"
              className="flex items-center gap-2 font-display text-sm font-black tracking-widest uppercase text-paper bg-ink px-8 py-4 pill-hover"
            >
              View Systems
            </a>
              <a
                href="/Agrah%20MV-FullStack%20Developer-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => sendGAEvent({ event: 'social_link_click', value: 'resume_hero' })}
                className="flex items-center gap-2 font-display text-sm font-black tracking-widest uppercase text-ink bg-surface px-8 py-4 pill-hover"
              >
                <FileText size={20} strokeWidth={2.5} /> Resume
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
  );
}
