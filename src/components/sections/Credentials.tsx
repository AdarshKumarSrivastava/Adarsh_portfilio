"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

export default function Credentials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} id="credentials" className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading
          eyebrow="01.5 — Credentials"
          heading={<>Elite <span className="italic font-serif text-white/40">Pedigree</span>.</>}
          subtext="Certified expertise and real-world impact driving data ecosystems."
          className="mb-16 md:mb-24"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: Bluestock */}
          <ScrollReveal animation="fade-up" delay={100}>
            <TiltCard>
              <div className="relative h-full glass rounded-[2rem] p-8 md:p-12 overflow-hidden group border border-white/[0.05] hover:border-accent/30 transition-colors duration-500 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
                      Data Analyst Intern
                    </h3>
                    <p className="text-accent font-mono text-sm tracking-[0.2em] uppercase mb-6">@ Bluestock</p>
                    <p className="text-secondary font-sans text-base leading-relaxed font-light">
                      Engineered automated data pipelines, developed scalable AI-powered solutions, and transformed complex datasets into strategic business insights using Langchain and advanced Python workflows.
                    </p>
                  </div>
                  
                  <div className="mt-12 flex items-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-white/60 font-mono text-xs tracking-widest uppercase">Currently Active</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Card 2: IIT Guwahati */}
          <ScrollReveal animation="fade-up" delay={200}>
            <TiltCard>
              <div className="relative h-full glass rounded-[2rem] p-8 md:p-12 overflow-hidden group border border-white/[0.05] hover:border-blue-500/30 transition-colors duration-500 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
                      Certified in Data Science
                    </h3>
                    <p className="text-blue-400 font-mono text-sm tracking-[0.2em] uppercase mb-6">IIT Guwahati</p>
                    <p className="text-secondary font-sans text-base leading-relaxed font-light">
                      Mastered rigorous foundations of machine learning, statistical modeling, and data analytics from one of India's premier engineering institutes, bringing academic excellence into production systems.
                    </p>
                  </div>
                  
                  <div className="mt-12 flex flex-wrap gap-2">
                    {["Python", "Machine Learning", "Statistics"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-mono text-[10px] uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
