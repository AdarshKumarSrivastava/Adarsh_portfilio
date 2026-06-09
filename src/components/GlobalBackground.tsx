"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // We want the background to scroll at 20% of the viewport scroll speed.
    // That means as the page scrolls down by 100vh, the bg moves up by 20vh.
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: () => -document.body.scrollHeight * 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // slight smoothing for luxury feel
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-[120vh] pointer-events-none -z-50 overflow-hidden">
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[300vh] opacity-20 mix-blend-overlay gpu-accelerate"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
      {/* Fallback dark radial gradient to keep depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-backgroundAlt/80 -z-10" />
    </div>
  );
}
