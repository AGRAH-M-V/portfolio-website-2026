"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

export function Loader() {
  const [loading, setLoading] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const displayPercentage = useTransform(rounded, (latest) => `${latest}%`);

  useEffect(() => {
    // Disable automatic scroll restoration and force scroll to top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Hide loader after a short delay
    const animation = animate(count, 100, { duration: 1.1, ease: "circOut" });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [count]);

    // No dots needed for brutalism
  return (
    <>
      {loading && (
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { overflow: hidden !important; }
        `}} />
      )}
      <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "circIn" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
        >
          <div className="flex flex-col items-start gap-4 w-full max-w-md px-6">
            
            <div className="flex items-end justify-between w-full">
              <span className="text-2xl font-display font-black tracking-tighter text-ink uppercase">
                Loading System
              </span>
              <motion.span 
                className="text-lg font-mono font-bold text-ink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {displayPercentage}
              </motion.span>
            </div>

            {/* Brutalist Progress Bar */}
            <div className="w-full h-12 bg-paper border-4 border-ink shadow-[8px_8px_0px_0px_var(--color-ink)] p-1.5">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.1, 
                  ease: "circOut" 
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
