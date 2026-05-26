"use client";

import { ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

const navItems = [
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-line">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tighter text-ink uppercase">
          <div className="w-2 h-2 bg-accent rounded-sm"></div>
          Agrah M V
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-muted">
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
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="w-8 h-8 flex items-center justify-center rounded-[3px] border border-line bg-surface text-muted hover:text-ink hover:border-ink transition-colors"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <a
            href="mailto:agrahmv@gmail.com"
            className="flex items-center gap-1.5 font-sans text-xs font-semibold text-ink bg-surface border border-line px-3 py-1.5 hover:bg-line transition-colors rounded-[3px]"
          >
            Connect <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}
