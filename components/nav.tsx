"use client";

import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-line">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tighter text-ink uppercase">
          <div className="w-2 h-2 bg-accent rounded-sm"></div>
          Agrah M V
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-display text-sm font-bold tracking-wide uppercase text-muted">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">

          <a
            href="mailto:agrahmv@gmail.com"
            className="flex items-center gap-1.5 font-display tracking-wide uppercase text-[11px] font-bold text-ink bg-surface border border-line px-3 py-1.5 hover:bg-line transition-colors rounded-[3px]"
          >
            Connect <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}
