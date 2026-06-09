"use client";
import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface ProjectData {
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  heroImage: string;
  problem: string;
  approach: string;
  outcomes: string[];
  techStack: string[];
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

// Ken Burns zoom on hero image
function KenBurnsImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden rounded-2xl">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}

// Gallery carousel
function Gallery({ images, title }: { images: string[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scroll("right");
      if (e.key === "ArrowLeft") scroll("left");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scroll]);

  if (!images.length) return null;

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="relative min-w-[280px] md:min-w-[380px] h-[200px] md:h-[240px] rounded-xl overflow-hidden snap-start shrink-0"
          >
            <Image src={img} alt={`${title} screenshot ${i + 1}`} fill className="object-cover" sizes="380px" />
          </motion.div>
        ))}
      </div>
      {/* Arrow buttons */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 justify-end">
          {(["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-secondary hover:text-white hover:border-white/20 transition-colors duration-300 data-cursor-hover"
            >
              {dir === "left" ? "←" : "→"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Tech badge
function TechBadge({ name }: { name: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
      className="inline-block px-4 py-2 rounded-full glass-panel text-white/70 font-sans text-sm tracking-wide transition-colors duration-200"
    >
      {name}
    </motion.span>
  );
}

// Section label component
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-[1px] bg-white/20" />
      <span className="text-secondary font-sans text-[10px] tracking-[0.3em] uppercase">{label}</span>
    </div>
  );
}

// Transitions defined separately for Framer Motion v12 type compatibility

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock scroll when modal open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={onClose}
        >
          <motion.div
            key="modal-panel"
            initial={{ y: "100%", opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] bg-surface border border-white/[0.06] rounded-t-3xl md:rounded-3xl overflow-y-auto overflow-x-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Sticky header bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-4 bg-surface/90 backdrop-blur-md border-b border-white/[0.04]">
              <div>
                <p className="text-secondary font-sans text-[10px] tracking-[0.3em] uppercase">{project.category} · {project.year}</p>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-white">{project.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-secondary hover:text-white hover:border-white/20 transition-all duration-200 group data-cursor-hover"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 md:px-10 py-8 space-y-12">

              {/* Hero image with Ken Burns */}
              <KenBurnsImage src={project.heroImage} alt={project.title} />

              {/* Problem Statement */}
              <div>
                <SectionLabel label="Problem Statement" />
                <p className="text-white/70 font-sans text-base md:text-lg leading-relaxed">{project.problem}</p>
              </div>

              {/* Approach */}
              <div>
                <SectionLabel label="Approach" />
                <p className="text-white/70 font-sans text-base md:text-lg leading-relaxed">{project.approach}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <SectionLabel label="Tech Stack" />
                <div className="flex flex-wrap gap-3 mt-2">
                  {project.techStack.map((tech, i) => (
                    <TechBadge key={i} name={tech} />
                  ))}
                </div>
              </div>

              {/* Key Outcomes */}
              <div>
                <SectionLabel label="Key Outcomes" />
                <ul className="space-y-3 mt-2">
                  {project.outcomes.map((outcome, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 + 0.2 }}
                      className="flex items-start gap-3 text-white/70 font-sans text-base"
                    >
                      <span className="text-white mt-1 shrink-0">→</span>
                      <span>{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {project.gallery.length > 0 && (
                <div>
                  <SectionLabel label="Gallery" />
                  <Gallery images={project.gallery} title={project.title} />
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-6">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-3 rounded-xl glass-panel px-8 py-4 font-sans font-semibold text-sm text-white tracking-wider hover:bg-white/[0.06] transition-all duration-500"
                  >
                    Live Demo
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-3 rounded-xl glass-panel px-8 py-4 font-sans font-semibold text-sm text-white tracking-wider transition-all duration-300"
                  >
                    View on GitHub
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
