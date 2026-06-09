"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene"), { ssr: false });

function TypewriterRole({ onComplete }: { onComplete: () => void }) {
  const target = "Full Stack AI & Data Engineer";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Start typing after Adarsh finishes (roughly 1.2s base delay + stagger)
    const startDelay = setTimeout(() => {
      let currentIdx = 0;
      const interval = setInterval(() => {
        setDisplayed(target.slice(0, currentIdx + 1));
        currentIdx++;
        if (currentIdx === target.length) {
          clearInterval(interval);
          setDone(true);
          onComplete(); // trigger buttons fade up
        }
      }, 70); // 70ms per character
    }, 1800);

    return () => clearTimeout(startDelay);
  }, [onComplete]);

  return (
    <span className="font-mono text-secondary text-sm md:text-base tracking-[0.2em] uppercase">
      {displayed}
      <AnimatePresence>
        {!done && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block ml-2 w-[2px] h-[1em] bg-accent align-middle"
          />
        )}
      </AnimatePresence>
    </span>
  );
}

function RevealHeadline() {
  const letters = "Adarsh".split("");
  // Split from center logic: calculate distance from center for stagger
  const centerIdx = (letters.length - 1) / 2;
  
  return (
    <>
      {letters.map((char, i) => {
        const distFromCenter = Math.abs(i - centerIdx);
        // Base delay 0.5s + stagger 80ms based on distance from center
        const delay = 0.5 + distFromCenter * 0.08;
        return (
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              delay: delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        );
      })}
      <motion.span
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          delay: 0.5 + centerIdx * 0.08 + 0.2, // slightly after the last letter
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block text-accent"
      >
        .
      </motion.span>
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D background - Disabled on mobile for 100% responsive performance */}
      {!isMobile && <HeroScene />}

      {/* Multi-layer depth gradients */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto mt-20">

        {/* Main headline */}
        <h1 
          className="font-heading font-normal tracking-tight text-white mb-6 md:mb-8 leading-[0.8] overflow-hidden"
          style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
        >
          <RevealHeadline />
        </h1>

        {/* Typewriter role */}
        <div className="h-10 mb-14 flex items-center justify-center">
          <TypewriterRole onComplete={() => setTimeout(() => setShowButtons(true), 400)} />
        </div>

        {/* CTA row using the true Magnetic Component */}
        <div className="flex flex-col sm:flex-row items-center gap-6 min-h-[60px]">
          <AnimatePresence>
            {showButtons && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MagneticButton as="a" href="#projects" variant="primary">
                    View My Work
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </MagneticButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MagneticButton as="a" href="#contact" variant="ghost">
                    Get In Touch
                  </MagneticButton>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <span className="text-secondary font-mono text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-white origin-top"
        />
      </motion.div>

      {/* Side social labels */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-6">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        {[
          { label: "GitHub", href: "https://github.com/AdarshKumarSrivastava" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/adarsh-kumar-srivastava-8198b3387" },
        ].map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: -4, color: "#fff" }}
            className="text-secondary hover:text-white font-mono text-xs tracking-[0.3em] transition-colors duration-300 [writing-mode:vertical-rl] uppercase"
          >
            {s.label}
          </motion.a>
        ))}
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Left side: section counter */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-6">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <span className="text-secondary font-mono text-xs tracking-widest [writing-mode:vertical-rl] font-medium">01 / 07</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
