"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Nexido", href: "#nexido" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function MagneticNavLink({ label, href }: { label: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const springConfig = { stiffness: 200, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative text-secondary hover:text-white font-sans text-sm tracking-[0.08em] transition-colors duration-300 group py-2 px-1 hover-difference"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }} />
    </motion.a>
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

  return (
    <>
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-secondary hover:text-white font-sans text-lg tracking-wide transition-colors duration-300"
              >
                {link.label}
              </a>
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
