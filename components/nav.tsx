"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { profile } from "@/data/profile";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

const navItems = [
  { label: "Experience", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useBodyScrollLock(mobileOpen);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 lg:fixed lg:left-0 lg:top-0 z-50 bg-paper lg:bg-paper border-b-2 lg:border-b-0 lg:border-r-4 border-ink transition-all duration-300 lg:w-64 lg:h-screen ${
          scrolled ? "shadow-[0px_4px_0px_0px_var(--color-ink)] lg:shadow-none" : ""
        }`}
      >
        <div className="mx-auto max-w-[1200px] lg:max-w-none px-4 sm:px-6 lg:px-8 h-16 lg:h-full flex lg:flex-col items-center lg:items-start justify-between lg:py-12">
          <a href="#" className="flex items-center gap-2 font-display text-xl font-black tracking-tighter text-ink uppercase">
            <div className="w-3 h-3 bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)]" />
            Agrah M V
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex lg:flex-col items-center lg:items-start gap-8 lg:gap-6 font-display text-lg font-black tracking-widest uppercase text-muted lg:mt-12 lg:w-full">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-ink hover:translate-x-1 transition-transform relative group lg:w-full lg:flex lg:items-center"
              >
                <span className="lg:pl-4">{item.label}</span>
                {/* Horizontal line for top nav, vertical line for sidebar */}
                <span className="absolute -bottom-1 left-0 w-0 h-1 lg:hidden bg-accent group-hover:w-full transition-all duration-300" />
                <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-2 h-0 bg-accent border-y-2 border-r-2 border-ink group-hover:h-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center lg:items-start gap-3 lg:mt-auto lg:w-full">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'email_nav_desktop' })}
              className="hidden sm:flex lg:w-full items-center lg:justify-center gap-2 font-display tracking-widest uppercase text-xs font-black text-ink bg-surface px-4 py-2 lg:py-4 pill-hover"
            >
              Connect <ArrowUpRight size={16} strokeWidth={3} />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={2.5} className="text-ink" /> : <Menu size={20} strokeWidth={2.5} className="text-ink" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-paper lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
              onClick={(event) => event.stopPropagation()}
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="font-display text-4xl font-black tracking-tight text-ink hover:translate-x-2 transition-transform"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${profile.email}`}
                onClick={() => {
                  handleNavClick();
                  sendGAEvent({ event: 'social_link_click', value: 'email_nav_mobile' });
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navItems.length * 0.08 }}
                className="mt-8 flex items-center gap-2 font-display text-sm font-black tracking-widest uppercase text-paper bg-ink px-10 py-5 shadow-[4px_4px_0px_0px_var(--color-accent)]"
              >
                Connect <ArrowUpRight size={20} strokeWidth={3} />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
