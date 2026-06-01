"use client";

import { ArrowUp } from "lucide-react";
import { FadeIn } from "./scroll-animate";

export function Footer() {
  const scrollToTop = () => {
    const root = document.scrollingElement || document.documentElement;
    root.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FadeIn>
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-px bg-accent" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="font-mono text-xs text-muted">
                © {new Date().getFullYear()} Agrah M V
              </span>
              <span className="hidden sm:inline text-line">·</span>
              <span className="font-mono text-[11px] text-muted/60">
                Built with Next.js
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-muted hover:text-accent transition-colors group"
            >
              Back to top
              <span className="p-1.5 rounded-[3px] border border-line bg-surface group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
