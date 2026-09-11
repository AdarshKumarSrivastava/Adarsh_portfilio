"use client";
import React, { useRef, useEffect } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  variant?: "primary" | "ghost" | "icon";
  className?: string;
}

export default function MagneticButton({
  children,
  as = "button",
  href,
  variant = "primary",
  className = "",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    if (!button || !text) return;

    let rafId: number | null = null;
    let isHovered = false;

    // Targets for lerping
    let targetX = 0;
    let targetY = 0;

    // Current positions
    let currentX = 0;
    let currentY = 0;
    let textCurrentX = 0;
    let textCurrentY = 0;

    const render = () => {
      // Lerp logic
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      // Text shifts at 45% intensity (1.5x the shell)
      const targetTextX = targetX * (0.45 / 0.30); 
      const targetTextY = targetY * (0.45 / 0.30);
      
      textCurrentX += (targetTextX - textCurrentX) * 0.1;
      textCurrentY += (targetTextY - textCurrentY) * 0.1;

      const settled = !isHovered && Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1;

      if (settled) {
        button.style.transform = `translate3d(0,0,0)`;
        text.style.transform = `translate3d(0,0,0)`;
        button.classList.add("spring-back");
        text.classList.add("spring-back");
        rafId = null; // Stop the loop when settled
        return;
      } else {
        button.classList.remove("spring-back");
        text.classList.remove("spring-back");
        button.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        text.style.transform = `translate3d(${textCurrentX}px, ${textCurrentY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseEnter = () => {
      isHovered = true;
      cachedRect = button.getBoundingClientRect();
      startLoop();
    };

    let cachedRect: DOMRect | null = null;

    const handleMouseMove = (evt: Event) => {
      const e = evt as MouseEvent;
      if (!cachedRect) {
        cachedRect = button.getBoundingClientRect();
      }
      const centerX = cachedRect.left + cachedRect.width / 2;
      const centerY = cachedRect.top + cachedRect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      targetX = distX * 0.35;
      targetY = distY * 0.35;

      const localX = e.clientX - cachedRect.left;
      const localY = e.clientY - cachedRect.top;
      button.style.setProperty('--mouse-x', `${localX}px`);
      button.style.setProperty('--mouse-y', `${localY}px`);
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
      cachedRect = null;
      startLoop();
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mousemove", handleMouseMove, { passive: true });
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Using a single unified premium glass class. 
  // We apply the standard padding/sizing based on variant.
  const padding = variant === "icon" 
    ? "w-12 h-12 hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out" 
    : "px-8 py-3.5";
  
  const Component = as as React.ElementType;

  return (
    <Component
      ref={buttonRef}
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-sans tracking-wide engineered-glass gpu-accelerate ${padding} ${className}`}
      data-cursor-interactive
      {...props}
    >
        <span ref={textRef} className="relative z-10 pointer-events-none flex items-center gap-2">
          {children}
        </span>
    </Component>
  );
}
