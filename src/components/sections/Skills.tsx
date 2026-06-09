"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

const skillGroups = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C/C++", "HTML", "CSS"],
    color: "text-white",
  },
  {
    label: "AI, Data & Libraries",
    items: ["React.js", "Next.js", "Node.js", "Langchain", "NumPy", "Pandas", "Tailwind CSS"],
    color: "text-white/80",
  },
  {
    label: "Core Competencies",
    items: ["Data Structures (DSA)", "Data Science", "Automations", "Data Analysis", "Backend Architecture"],
    color: "text-white/80",
  },
  {
    label: "Databases & Tools",
    items: ["MongoDB", "MySQL", "Git", "VS Code", "Matplotlib", "Seaborn"],
    color: "text-white/60",
  },
];

// Skill chip with micro-animation
function SkillChip({ name, color, delay }: { name: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, margin: "-60px" }}
      className="glass-panel rounded-full px-5 py-2.5 cursor-default hover:bg-white/[0.04] transition-colors"
    >
      <span className={`font-sans text-sm tracking-wide ${color}`}>{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-36 bg-background overflow-hidden">
      {/* Parallax glow background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.015] rounded-full blur-[140px]" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading
          eyebrow="04 — Skills"
          heading={<>The Technical <span className="italic font-light">Arsenal</span>.</>}
          subtext="Technologies I wield to build high-quality, performant digital products."
          className="mb-16 md:mb-20"
        />

        <div className="space-y-12">
          {skillGroups.map((group, gi) => (
            <ScrollReveal key={group.label} animation="fade-up" delay={gi * 80}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                {/* Group label */}
                <div className="md:w-56 shrink-0 pt-2">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-4 h-[1px] bg-white/20" />
                    <span className={`font-sans text-[10px] tracking-[0.25em] uppercase text-secondary`}>
                      {group.label}
                    </span>
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, si) => (
                    <SkillChip
                      key={skill}
                      name={skill}
                      color={group.color}
                      delay={gi * 0.05 + si * 0.04}
                    />
                  ))}
                </div>
              </div>

              {/* Thin divider */}
              {gi < skillGroups.length - 1 && (
                <div className="mt-8 h-[1px] bg-white/[0.03]" />
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="mt-16 section-divider opacity-50" />
      </div>
    </section>
  );
}
