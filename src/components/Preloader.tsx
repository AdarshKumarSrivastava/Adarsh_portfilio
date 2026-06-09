"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      
      // Animate the main content scale up
      gsap.fromTo(
        "#main-content",
        { scale: 0.97, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.inOut" }
      );
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex pointer-events-none">
          {/* Left Half */}
          <motion.div
            initial={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-background pointer-events-auto"
          />
          {/* Right Half */}
          <motion.div
            initial={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-background pointer-events-auto"
          />

          {/* Content (Fades out earlier than panels sliding) */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-auto"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-heading text-5xl md:text-7xl font-medium tracking-tight text-white"
            >
              Adarsh
            </motion.h1>

            {/* Infinity Loop SVG */}
            <div className="relative w-24 h-12">
              <svg viewBox="0 0 100 50" fill="none" className="w-full h-full">
                <path
                  d="M50,25 C50,25 60,5 75,5 C90,5 95,15 95,25 C95,35 90,45 75,45 C60,45 50,25 50,25 C50,25 40,5 25,5 C10,5 5,15 5,25 C5,35 10,45 25,45 C40,45 50,25 50,25"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <motion.path
                  d="M50,25 C50,25 60,5 75,5 C90,5 95,15 95,25 C95,35 90,45 75,45 C60,45 50,25 50,25 C50,25 40,5 25,5 C10,5 5,15 5,25 C5,35 10,45 25,45 C40,45 50,25 50,25"
                  stroke="rgba(108, 99, 255, 0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
