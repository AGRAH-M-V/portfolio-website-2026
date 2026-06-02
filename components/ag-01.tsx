"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll, useVelocity } from "framer-motion";

type Emotion = "idle" | "happy" | "curious" | "thinking" | "focused" | "surprised" | "sleepy";

const messages = {
  idle: ["> System Online", "> Ready for input", "> Waiting..."],
  happy: ["> Systems optimal", "> Thank you!", "> Code looks great!"],
  curious: ["> Analyzing environment", "> Inspecting...", "> Hmm..."],
  thinking: ["> Processing...", "> Compiling...", "> Analyzing data..."],
  focused: ["> Tracking scroll...", "> Keeping up!", "> Moving..."],
  surprised: ["> Rapid input!", "> Whoa!", "> Fast!"],
  sleepy: ["> Power saving mode...", "> Zzz...", "> Low battery..."],
};

export function AG01() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [emotion, setEmotion] = useState<Emotion>("idle");
  const [messageIndex, setMessageIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  
  // Custom temporary terminal message (e.g. on scroll sections or click)
  const [customMessage, setCustomMessage] = useState<string | null>(null);

  // Eye tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll tracking
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Setup mount & screen check & Time awareness
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Time Awareness
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 4) {
      setEmotion("sleepy");
      setCustomMessage("> Late night coding session?");
    } else if (hour >= 5 && hour <= 9) {
      setEmotion("happy");
      setCustomMessage("> Good morning, System booted");
    }
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  // Clear custom message after 4.5 seconds
  useEffect(() => {
    if (!customMessage || isPetting) return;
    const timer = setTimeout(() => {
      setCustomMessage(null);
      setEmotion("idle");
    }, 4500);
    return () => clearTimeout(timer);
  }, [customMessage, isPetting]);

  // Velocity scroll tracking
  useEffect(() => {
    if (isMobile) return;
    return scrollVelocity.on("change", (latest) => {
      if (Math.abs(latest) > 120 && !customMessage) {
        setEmotion("focused");
      } else if (emotion === "focused" && Math.abs(latest) < 20) {
        setTimeout(() => {
          if (!customMessage) setEmotion("idle");
        }, 1000);
      }
    });
  }, [scrollVelocity, emotion, customMessage, isMobile]);

  // Mouse move / Idle timeout
  useEffect(() => {
    if (isMobile) return;
    let idleTimer: NodeJS.Timeout;
    let lastTime = Date.now();
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;
      
      mouseX.set(x);
      mouseY.set(y);

      // Check velocity for "surprised"
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        if (speed > 3.5 && !customMessage) {
          setEmotion("surprised");
          setTimeout(() => {
            if (!customMessage) setEmotion("idle");
          }, 2000);
        }
      }
      
      lastTime = now;
      lastX = e.clientX;
      lastY = e.clientY;

      // Wake up if sleepy
      if (emotion === "sleepy") setEmotion("idle");
      
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!customMessage) setEmotion("sleepy");
      }, 12000); // 12 seconds idle
    };

    window.addEventListener("mousemove", handleMouseMove);
    idleTimer = setTimeout(() => setEmotion("sleepy"), 12000);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, [mouseX, mouseY, emotion, customMessage, isMobile]);

  // Occasional autonomous glances (random eye movement) when mouse is idle
  useEffect(() => {
    if (emotion !== "idle" || isMobile) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        // Briefly simulate random glance
        const randomX = (Math.random() - 0.5) * 150;
        const randomY = (Math.random() - 0.5) * 100;
        mouseX.set(randomX);
        mouseY.set(randomY);
        
        setTimeout(() => {
          mouseX.set(0);
          mouseY.set(0);
        }, 1000);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [emotion, isMobile, mouseX, mouseY]);

  // Terminal typing effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentMessages = customMessage ? [customMessage] : (messages[emotion] || messages.idle);
    const safeIndex = customMessage ? 0 : (messageIndex % currentMessages.length);
    const fullText = currentMessages[safeIndex];

    const handleTyping = () => {
      setText((prev) => {
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        } else {
          return fullText.substring(0, prev.length + 1);
        }
      });

      const typingSpeed = isDeleting ? 20 : 50;

      if (!isDeleting && text === fullText) {
        if (customMessage) {
          // Stay fully typed until customMessage state updates/clears
        } else {
          timer = setTimeout(() => setIsDeleting(true), 2500);
        }
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        if (!customMessage) {
          setMessageIndex((prev) => prev + 1);
        }
        timer = setTimeout(handleTyping, 300);
      } else {
        timer = setTimeout(handleTyping, typingSpeed);
      }
    };

    // If custom message starts, force delete current text to retype
    if (customMessage && text !== "" && text !== customMessage && !isDeleting) {
      setIsDeleting(true);
    }

    timer = setTimeout(handleTyping, 50);
    return () => clearTimeout(timer);
  }, [text, isDeleting, messageIndex, emotion, customMessage]);

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (emotion === "sleepy") return;
      if (Math.random() > 0.35) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 120);
        
        if (Math.random() > 0.7) {
          setTimeout(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 120);
          }, 200);
        }
      }
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, [emotion]);

  // Interaction handler
  const handleInteraction = () => {
    setEmotion("happy");
    setCustomMessage("> Hello there!");
  };

  // Eye variants mapping
  const leftEyeVariants = {
    idle: { scaleY: isBlinking ? 0.05 : 1, borderRadius: "10px", width: "40px", height: "40px" },
    happy: { scaleY: 0.5, borderRadius: "50% 50% 0 0", width: "40px", height: "40px" },
    curious: { scaleY: 1.2, borderRadius: "50%", width: "48px", height: "48px" },
    thinking: { scaleY: 0.6, borderRadius: "10px", width: "40px", height: "40px" },
    focused: { scaleY: 0.8, borderRadius: "10px", width: "36px", height: "36px" },
    surprised: { scaleY: 1.3, scaleX: 1.3, borderRadius: "50%", width: "40px", height: "40px" },
    sleepy: { scaleY: 0.1, borderRadius: "10px", width: "40px", height: "40px" },
  };

  const rightEyeVariants = {
    idle: { scaleY: isBlinking ? 0.05 : 1, borderRadius: "10px", width: "40px", height: "40px" },
    happy: { scaleY: 0.5, borderRadius: "50% 50% 0 0", width: "40px", height: "40px" },
    curious: { scaleY: 0.8, borderRadius: "50%", width: "32px", height: "32px" },
    thinking: { scaleY: 0.6, borderRadius: "10px", width: "40px", height: "40px" },
    focused: { scaleY: 0.8, borderRadius: "10px", width: "36px", height: "36px" },
    surprised: { scaleY: 1.3, scaleX: 1.3, borderRadius: "50%", width: "40px", height: "40px" },
    sleepy: { scaleY: 0.1, borderRadius: "10px", width: "40px", height: "40px" },
  };

  const headVariants = {
    idle: { rotate: 0, y: 0 },
    happy: { rotate: [0, -4, 4, 0], transition: { duration: 0.5 } },
    curious: { rotate: 8, y: -4 },
    thinking: { rotate: -6, y: -2 },
    focused: { rotate: 0, y: 4 }, 
    surprised: { rotate: 0, y: -4 }, 
    sleepy: { rotate: 4, y: 8 }, 
  };

  // Convert cursor tracking mapping
  const eyeX = useTransform(mouseX, [-1000, 1000], [-10, 10]);
  const eyeY = useTransform(mouseY, [-1000, 1000], [-8, 8]);

  if (!mounted || isMobile) return null;

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col items-center select-none z-0 cursor-pointer"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      onClick={handleInteraction}
    >
      {/* AG-01 Body */}
      <motion.div 
        className="relative w-64 h-72 bg-ink/80 backdrop-blur-md border border-line rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-visible group transition-all duration-500 hover:border-[#FF8A65]/30 hover:shadow-[0_0_30px_rgba(255,138,101,0.08)] origin-bottom"
        animate={emotion}
        variants={headVariants}
      >
        {/* Subtle grid background for Nothing OS feel */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#FF8A65 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px"
          }}
        />

        {/* Hover Petting Zone */}
        <div 
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-20 bg-transparent z-50 cursor-pointer"
          onMouseEnter={() => {
            setIsPetting(true);
            setEmotion("happy");
            setCustomMessage("> Enjoying head pats...");
          }}
          onMouseLeave={() => {
            setIsPetting(false);
            setCustomMessage("> Systems purring...");
          }}
        />

        {/* Top Antenna/Sensors */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-surface border border-line rounded-t-xl flex items-center justify-center gap-2">
          <div className="w-1 h-1 rounded-full bg-line" />
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-[#FF8A65] shadow-[0_0_8px_#FF8A65]" 
            animate={{ opacity: emotion === "sleepy" ? 0.2 : [0.5, 1, 0.5] }}
            transition={emotion === "sleepy" ? { duration: 0 } : { duration: 1.5, repeat: Infinity }}
          />
          <div className="w-1 h-1 rounded-full bg-line" />
        </div>

        {/* Header / Brand */}
        <div className="flex justify-between items-center z-10 px-1 border-b border-line/50 pb-2">
          <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
            Unit: AG-01
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A65] shadow-[0_0_5px_#FF8A65]" />
            <span className="font-mono text-[9px] text-[#FF8A65] tracking-widest uppercase opacity-80">
              {emotion}
            </span>
          </div>
        </div>

        {/* Screen/Face */}
        <div className="relative w-full h-32 bg-[#050505] border border-line/40 rounded-2xl mt-4 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-50" />
          
          {/* Screen glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.05] pointer-events-none z-20" />

          {/* Eyes Container */}
          <motion.div 
            className="flex items-center gap-8 z-10"
            style={{ x: eyeX, y: eyeY }}
            animate={{
              y: emotion === "thinking" ? -8 : emotion === "sleepy" ? 8 : 0
            }}
          >
            {/* Left Eye */}
            <motion.div 
              className="bg-[#FF8A65] shadow-[0_0_15px_rgba(255,138,101,0.6)] flex items-center justify-center overflow-hidden"
              initial="idle"
              animate={emotion}
              variants={leftEyeVariants}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="w-full h-full bg-[#fff] opacity-30 blur-[3px] scale-50 translate-x-2 -translate-y-2 rounded-full" />
            </motion.div>
            
            {/* Right Eye */}
            <motion.div 
              className="bg-[#FF8A65] shadow-[0_0_15px_rgba(255,138,101,0.6)] flex items-center justify-center overflow-hidden"
              initial="idle"
              animate={emotion}
              variants={rightEyeVariants}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
               <div className="w-full h-full bg-[#fff] opacity-30 blur-[3px] scale-50 translate-x-2 -translate-y-2 rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Vents/Details & Terminal */}
        <div className="flex justify-between items-end mt-6 z-10">
          <div className="flex gap-1.5 mb-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-6 bg-surface border border-line rounded-full opacity-70" />
            ))}
          </div>
          
          {/* Terminal display */}
          <div className="flex-1 ml-4 h-9 bg-[#050505] border border-line/40 rounded-lg flex items-center px-3 relative overflow-hidden shadow-inner">
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_3px] pointer-events-none z-20 opacity-30" />
             <span className="font-mono text-[9px] text-[#FF8A65] tracking-tighter whitespace-nowrap z-10 opacity-90">
               {text}
               <span className="animate-blink ml-[1px]">_</span>
             </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Shadow */}
      <motion.div
        className="w-48 h-3 bg-black/20 rounded-[100%] blur-md mt-10"
        animate={{ scale: [1, 0.85, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
