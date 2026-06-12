"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Setup
    gsap.set(".loader-letters span", { opacity: 0 });
    gsap.set(".loader-infinity", { strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set(".loader-progress", { scaleX: 0, transformOrigin: "left center" });
    gsap.set(".site-content", { scale: 0.96, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    // 2. Letters fade in staggered, soft and cinematic
    tl.to(".loader-letters span", {
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.inOut",
    });

    // 3. SVG infinity loop traces itself smoothly over 2s
    tl.to(
      ".loader-infinity",
      {
        strokeDashoffset: 0,
        duration: 2.0,
        ease: "power3.inOut",
      },
      "<0.2" // start slightly after letters
    );

    // 4. Progress line fills left to right smoothly over 2.5s total
    tl.to(
      ".loader-progress",
      {
        scaleX: 1,
        duration: 2.5,
        ease: "power3.inOut",
      },
      0 // start at the very beginning
    );

    // 5. On complete - loader splits, top up, bottom down, cinematic ease over 1.2s
    tl.to(
      ".loader-top",
      {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
      },
      ">0.2"
    );
    tl.to(
      ".loader-bottom",
      {
        yPercent: 100,
        duration: 1.2,
        ease: "expo.inOut",
      },
      "<"
    );

    // 6. Site beneath scales from 0.96 to 1 and fades in
    tl.to(
      ".site-content",
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "expo.inOut",
        clearProps: "transform"
      },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const letters = "ADARSH".split("");

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
          {/* Top Half */}
          <div className="loader-top flex-1 bg-[#07080f] overflow-hidden relative will-change-transform transform-gpu">
            <div className="absolute bottom-0 left-0 w-full flex justify-center translate-y-1/2">
              <h1 className="loader-letters font-heading text-[#f0eeff] uppercase tracking-[0.3em] md:tracking-[0.5em] flex" style={{ fontSize: "clamp(2rem, 10vw, 9rem)", lineHeight: 1 }}>
                {letters.map((char, i) => (
                  <span key={i}>{char}</span>
                ))}
              </h1>
            </div>
          </div>

          {/* Center Divider / Infinity / Progress */}
          <div className="loader-center absolute top-1/2 left-0 w-full flex flex-col items-center justify-center z-10 gap-8 mt-16 md:mt-24">
            {/* The SVG infinity loop */}
            <svg width="120" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="loader-infinity"
                d="M25 25C25 15 35 15 50 25C65 35 75 35 75 25C75 15 65 15 50 25C35 35 25 35 25 25Z"
                stroke="#6c63ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* The progress line */}
            <div className="w-[200px] h-[1px] bg-white/10 relative overflow-hidden">
              <div className="loader-progress absolute top-0 left-0 h-full w-full bg-[#6c63ff] will-change-transform transform-gpu"></div>
            </div>
          </div>

          {/* Bottom Half */}
          <div className="loader-bottom flex-1 bg-[#07080f] overflow-hidden relative will-change-transform transform-gpu">
            <div className="absolute top-0 left-0 w-full flex justify-center -translate-y-1/2">
              <h1 className="loader-letters font-heading text-[#f0eeff] uppercase tracking-[0.3em] md:tracking-[0.5em] flex" style={{ fontSize: "clamp(2rem, 10vw, 9rem)", lineHeight: 1 }}>
                {letters.map((char, i) => (
                  <span key={i} className="opacity-0">{char}</span>
                ))}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Site Content */}
      <div className="site-content origin-center opacity-0">
        {children}
      </div>
    </>
  );
}
