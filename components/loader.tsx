"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 5x5 dot matrix grid
  const cols = 5;
  const rows = 5;
  const dots = Array.from({ length: rows * cols }, (_, i) => i);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <div className="flex flex-col items-center gap-10">
            {/* Dot Grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {dots.map((i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                // Center dot is red, others are white, to mimic Nothing's aesthetic
                const isCenter = row === 2 && col === 2;
                
                return (
                  <motion.div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      isCenter ? "bg-[#f50514]" : "bg-white"
                    }`}
                    initial={{ opacity: 0.1, scale: 0.5 }}
                    animate={{
                      opacity: [0.1, 1, 0.1],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      // Wave effect originating from top-left
                      delay: (row + col) * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-400 uppercase ml-[0.4em]">
                Initializing
              </span>
              {/* Blinking red recording dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#f50514]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
