"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full py-10 bg-[#030303] border-t border-white/5 overflow-hidden">
      {/* Glow line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <span className="font-heading text-xl font-medium text-white tracking-tight">
            AK <span className="text-white/40 italic">Srivastava.</span>
          </span>
          <span className="hidden md:block w-px h-4 bg-white/10" />
          <span className="hidden md:block text-secondary font-sans text-xs tracking-wide">
            Crafted with obsession. Every pixel intentional.
          </span>
        </div>

        <p>  © {year} Adarsh Kr. Srivastava — All rights reserved.
        </p>

        <motion.a
          href="#hero"
          whileHover={{ y: -2 }}
          className="flex items-center gap-2 text-secondary hover:text-white font-sans text-xs tracking-[0.25em] uppercase transition-colors duration-300"
        >
          Back to Top
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.a>
      </div>
    </footer>
  );
}
