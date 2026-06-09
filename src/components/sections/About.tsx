"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "Projects Shipped" },
  { value: "2nd", label: "Hackathon Runner-Up" },
  { value: "B.Tech", label: "CSE — AI & Data Sci." },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        imageContainerRef.current,
        { scale: 1.1, opacity: 0, filter: "blur(20px)", y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Parallax effect on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-32 md:py-48 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <div
          ref={imageContainerRef}
          className="relative h-[55vh] lg:h-[80vh] w-full rounded-[2rem] overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 scale-[1.15]">
            <Image
              ref={imageRef}
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
              alt="Developer at work"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent mix-blend-overlay" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Floating label */}
          <div className="absolute bottom-8 left-8 glass rounded-2xl px-6 py-4">
            <p className="text-white font-mono text-xs font-semibold tracking-widest uppercase">Adarsh</p>
            <p className="text-accent hover:text-accent-hover transition-colors font-mono text-[11px] font-medium tracking-[0.2em] mt-1">Full Stack Engineer</p>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="02 — About"
            heading={<>Beyond the <span className="text-white/40 italic font-serif">Code</span>.</>}
          />

          <div className="space-y-6 text-white/70 font-sans text-lg md:text-xl leading-relaxed font-light">
            <ScrollReveal animation="fade-up" delay={100}>
              <p>
                I&apos;m a Full Stack AI &amp; Data Engineer currently working as a Data Analyst Intern at <span className="text-white font-normal">Bluestock</span>. Certified in Data Science from <span className="text-white font-normal">IIT Guwahati</span>, I build digital products that sit at the intersection of engineering precision and data-driven intelligence.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={180}>
              <p>
                My work spans scalable MERN stack architectures, AI-powered automation using <span className="text-accent font-normal">Langchain &amp; Python</span>, and robust backend/database solutions — all shipped with an obsessive eye for performance, accessibility, and that extra 10% of polish.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={260}>
              <p>
                When I&apos;m not writing production C, Python, or JavaScript, I&apos;m exploring Data Structures and Algorithms, analyzing complex datasets, and leading engineering discussions as an event anchor.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats row */}
          <ScrollReveal animation="stagger-children" delay={200}>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-4xl md:text-5xl font-medium text-white tracking-tighter">{s.value}</p>
                  <p className="text-secondary font-mono text-[10px] font-medium tracking-widest mt-3 uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <a
              href="#contact"
              className="inline-flex items-center gap-4 text-accent hover:text-white transition-colors duration-300 group link-underline mt-4"
            >
              <span className="font-mono text-xs tracking-[0.2em] uppercase font-semibold">Let&apos;s Work Together</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
