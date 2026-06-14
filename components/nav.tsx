"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

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
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? "border-line shadow-lg shadow-paper/50" : "border-line/50"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tighter text-ink uppercase">
            <div className="w-2 h-2 bg-accent rounded-sm" />
            Agrah M V
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-display text-sm font-bold tracking-wide uppercase text-muted">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-ink transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="mailto:agrahmv@gmail.com"
              onClick={() => sendGAEvent({ event: 'social_link_click', value: 'email_nav_desktop' })}
              className="hidden sm:flex items-center gap-1.5 font-display tracking-wide uppercase text-[11px] font-bold text-ink bg-surface border border-line px-3 py-1.5 hover:bg-line hover:border-accent/30 transition-all duration-300 rounded-[3px]"
            >
              Connect <ArrowUpRight size={14} />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-[3px] bg-surface border border-line hover:bg-line transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-xl md:hidden"
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
                  className="font-display text-3xl font-black tracking-tight text-ink hover:text-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="mailto:agrahmv@gmail.com"
                onClick={(e) => {
                  handleNavClick();
                  sendGAEvent({ event: 'social_link_click', value: 'email_nav_mobile' });
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + navItems.length * 0.08 }}
                className="mt-4 flex items-center gap-2 font-display text-sm font-bold tracking-wide uppercase text-paper bg-accent px-8 py-4 rounded-[3px] hover:bg-accent/90 transition-colors"
              >
                Connect <ArrowUpRight size={16} />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
