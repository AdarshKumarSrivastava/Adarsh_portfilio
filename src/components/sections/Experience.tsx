"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Data Analyst Intern",
    organization: "Bluestock",
    description:
      "Engineered automated data pipelines and developed scalable AI-powered solutions. Analyzed complex datasets to drive business insights using Python and Data Science workflows.",
    year: "2024 – Present",
    type: "Experience",
    color: "bg-accent/20 border-accent/30 text-accent",
  },
  {
    role: "Team Leader — 2nd Runner-Up",
    organization: "Synergix Hackathon 2025",
    description:
      "Led a cross-functional team to ideate, prototype, and pitch an innovative tech solution under 24-hour deadline pressure. Secured 2nd Runner-Up position across a field of 40+ competing teams.",
    year: "2025",
    type: "Achievement",
    color: "bg-white/5 border-white/10 text-white",
  },
  {
    role: "Data Analytics Job Simulation",
    organization: "Deloitte Australia",
    description:
      "Completed a rigorous virtual job simulation covering end-to-end data analysis workflows — data cleaning, visualization, statistical interpretation, and executive-level insights reporting.",
    year: "2024",
    type: "Certification",
    color: "bg-white/5 border-white/10 text-white",
  },
  {
    role: "Solutions Architecture Job Simulation",
    organization: "AWS",
    description:
      "Designed scalable, highly-available cloud architectures using AWS core services. Implemented security best practices, cost-optimization strategies, and production deployment patterns.",
    year: "2024",
    type: "Certification",
    color: "bg-white/5 border-white/10 text-white",
  },
  {
    role: "Event Organizer & Anchor",
    organization: "Galgotias University",
    description:
      "Led end-to-end coordination for university-scale technical events — logistics, stage management, live hosting, and real-time problem solving for 500+ attendee sessions.",
    year: "2023 – Present",
    type: "Leadership",
    color: "bg-white/5 border-white/10 text-white",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline spine
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="relative w-full py-24 md:py-36 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl relative z-10">
        <SectionHeading
          eyebrow="04 — Experience"
          heading={<>The <span className="italic font-serif text-white/40">Journey</span>.</>}
          subtext="Hackathons, certifications, and leadership that shaped my craft."
          className="mb-20 md:mb-24"
        />

        <div className="relative">
          {/* Timeline spine track */}
          <div className="absolute left-4 md:left-[50%] top-0 bottom-0 w-[2px] bg-white/[0.03] -translate-x-1/2" />
          {/* Animated spine */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-[50%] top-0 w-[2px] bg-gradient-to-b from-accent to-accent/20 -translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <ScrollReveal
                  key={index}
                  animation="fade-up"
                  delay={index * 80}
                >
                  <div className={`relative md:flex md:items-center ${isEven ? "" : "md:flex-row-reverse"}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-[3px] border-accent -translate-x-1/2 mt-2 md:mt-0 z-10 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />

                    {/* Card wrapped in TiltCard */}
                    <div className={`ml-12 md:ml-0 md:w-[45%] ${isEven ? "md:mr-[10%]" : "md:ml-[10%]"}`}>
                      <TiltCard>
                        <div className="glass rounded-[1.5rem] p-8 hover:bg-white/[0.04] transition-colors duration-500 group shadow-lg border border-white/[0.05]">
                          {/* Top row */}
                          <div className="flex items-start justify-between mb-6 gap-4">
                            <span className={`inline-block px-4 py-1.5 rounded-full border text-[10px] font-mono font-semibold tracking-[0.2em] uppercase ${exp.color}`}>
                              {exp.type}
                            </span>
                            <span className="text-white/40 font-mono text-xs font-medium tracking-widest shrink-0 uppercase mt-1">{exp.year}</span>
                          </div>

                          <h3 className="font-heading text-3xl font-medium tracking-tight text-white mb-2 transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <p className="text-accent font-sans text-sm font-medium tracking-wide uppercase mb-5">{exp.organization}</p>
                          <p className="text-secondary font-sans text-sm md:text-base leading-relaxed font-light">{exp.description}</p>
                        </div>
                      </TiltCard>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-[45%]" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
