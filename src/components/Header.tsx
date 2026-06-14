"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Nexido", href: "#nexido" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Overlay transition state manager
let setOverlayFn: ((v: boolean) => void) | null = null;

function NavTransitionOverlay() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    setOverlayFn = setVisible;
    // expose label setter globally too
    (window as Window & typeof globalThis & { __setNavLabel: (l: string) => void }).__setNavLabel = setLabel;
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nav-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ink-spread background */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(108,99,255,0.18) 0%, rgba(0,0,0,0.72) 70%)" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-accent/60"
            style={{ top: "50%" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Section label */}
          <motion.span
            className="relative z-10 font-heading text-7xl md:text-9xl font-medium text-white/90 tracking-tight select-none"
            initial={{ y: 40, opacity: 0, filter: "blur(20px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -40, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {label}
          </motion.span>

          {/* Corner particles */}
          {[
            { top: "15%", left: "10%", size: 120, delay: 0 },
            { top: "70%", left: "80%", size: 80, delay: 0.05 },
            { top: "20%", left: "75%", size: 60, delay: 0.1 },
            { top: "65%", left: "15%", size: 100, delay: 0.07 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-accent/30"
              style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6, delay: p.delay, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function smoothScrollTo(targetId: string, label: string) {
  const el = document.querySelector(targetId);
  if (!el) return;

  // Show overlay with section label
  if ((window as Window & typeof globalThis & { __setNavLabel?: (l: string) => void }).__setNavLabel) {
    (window as Window & typeof globalThis & { __setNavLabel: (l: string) => void }).__setNavLabel(label);
  }
  setOverlayFn?.(true);

  // After a short visual pause, scroll and hide overlay
  setTimeout(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      setOverlayFn?.(false);
    }, 480);
  }, 380);
}

function MagneticNavLink({ label, href }: { label: string; href: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const springConfig = { stiffness: 200, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(href, label);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative text-secondary hover:text-white font-sans text-sm tracking-[0.08em] transition-colors duration-300 group py-2 px-1 hover-difference bg-transparent border-none cursor-pointer"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }} />
    </motion.button>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setIsScrolled(v > 0.02);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const handleMobileNavClick = (href: string, label: string) => {
    setIsMobileMenuOpen(false);
    smoothScrollTo(href, label);
  };

  return (
    <>
      {/* Global overlay for nav transitions */}
      <NavTransitionOverlay />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-hover z-[100] origin-left"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-1/2 z-50 w-[90%] max-w-5xl transition-all duration-700 ${isScrolled
          ? "glass-panel rounded-full px-6 py-3"
          : "bg-transparent px-6 py-4"
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-serif text-2xl font-normal tracking-tight text-white hover-difference"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AK <span className="text-white/40 italic">Srivastava.</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticNavLink key={link.label} {...link} />
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-6">
            {/* Hire Me */}
            <Link
              href="/hire"
              className="hidden md:flex items-center gap-2 text-sm font-medium font-sans text-black bg-white rounded-full px-6 py-2.5 hover:bg-gray-200 transition-all duration-300"
            >
              Hire Me
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1px] bg-white origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="block w-4 h-[1px] bg-white"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1px] bg-white origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: "auto", opacity: 1, marginTop: "1rem" } : { height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden overflow-hidden"
        >
          <nav className="flex flex-col gap-4 pb-4">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleMobileNavClick(link.href, link.label)}
                initial={{ x: -20, opacity: 0 }}
                animate={isMobileMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                className="text-left text-secondary hover:text-white font-sans text-lg tracking-wide transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
            <Link
              href="/hire"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center mt-2 text-sm font-medium font-sans text-black bg-white rounded-full px-5 py-3 transition-all duration-300"
            >
              Hire Me
            </Link>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}
