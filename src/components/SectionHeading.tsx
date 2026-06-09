"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: ReactNode;
  subtext?: string;
  className?: string;
  align?: "left" | "center";
}

// A simple utility to split strings/ReactNodes into word-wrapped spans safely
function splitByWord(node: ReactNode): ReactNode[] {
  if (typeof node === "string") {
    return node.split(" ").map((word, i) => (
      <span key={i} className="word-wrap inline-block whitespace-pre">
        <span className="word inline-block will-change-transform opacity-0 translate-y-[50px] rotate-x-[15deg]">{word}</span>
        {i !== node.split(" ").length - 1 && " "}
      </span>
    ));
  }
  
  if (Array.isArray(node)) {
    return node.map(splitByWord).flat();
  }
  
  if (React.isValidElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childProps = node.props as any;
    if (childProps.children) {
      return [
        React.cloneElement(
          node,
          { ...childProps, key: Math.random() },
          splitByWord(childProps.children)
        )
      ];
    }
    return [node];
  }
  
  return [node];
}

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const words = containerRef.current.querySelectorAll(".word");
    const sub = containerRef.current.querySelector(".heading-subtext");
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          invalidateOnRefresh: true,
        }
      });
      
      if (words.length > 0) {
        tl.to(words, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "power4.out"
        }, 0);
      }
      
      if (sub) {
        tl.to(sub, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }, 0.3); // delayed 0.3s after heading start
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [heading]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 ${alignClass} ${className} relative`} style={{ perspective: "1000px" }}>
      {eyebrow && (
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="flex items-center gap-3">
            {align === "left" && <div className="w-6 h-[1px] bg-white/20" />}
            <span className="text-secondary font-sans text-[10px] tracking-[0.3em] uppercase">
              {eyebrow}
            </span>
            {align === "center" && <div className="w-6 h-[1px] bg-white/20" />}
          </div>
        </ScrollReveal>
      )}

      <h2 className="font-heading text-5xl md:text-7xl font-medium tracking-tight text-white leading-[1.1] hover-difference">
        {splitByWord(heading)}
      </h2>

      {subtext && (
        <p className="heading-subtext text-secondary font-serif text-xl md:text-2xl italic max-w-xl opacity-0 translate-y-[20px] will-change-transform">
          {subtext}
        </p>
      )}
    </div>
  );
}
