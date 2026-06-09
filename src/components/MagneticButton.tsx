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

    let rafId: number;
    let isHovered = false;

    // Targets for lerping
    let targetX = 0;
    let targetY = 0;

    // Current positions
    let currentX = 0;
    let currentY = 0;
    let textCurrentX = 0;
    let textCurrentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Trigger distance is 100px
      if (distance < 100) {
        isHovered = true;
        // 30% intensity for button shell
        targetX = distX * 0.30;
        targetY = distY * 0.30;
      } else {
        isHovered = false;
        targetX = 0;
        targetY = 0;
      }

      // Update spotlight CSS vars (only matters when hovered really, but we can track it globally or locally)
      // The CSS radial gradient expects pixel coords relative to the button
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      button.style.setProperty('--mouse-x', `${localX}px`);
      button.style.setProperty('--mouse-y', `${localY}px`);
    };

    const render = () => {
      // Lerp logic
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      // Text shifts at 45% intensity (1.5x the shell)
      const targetTextX = targetX * (0.45 / 0.30); 
      const targetTextY = targetY * (0.45 / 0.30);
      
      textCurrentX += (targetTextX - textCurrentX) * 0.1;
      textCurrentY += (targetTextY - textCurrentY) * 0.1;

      if (!isHovered && Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
        button.style.transform = `translate3d(0,0,0)`;
        text.style.transform = `translate3d(0,0,0)`;
        button.classList.add("spring-back");
        text.classList.add("spring-back");
      } else {
        button.classList.remove("spring-back");
        text.classList.remove("spring-back");
        button.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        text.style.transform = `translate3d(${textCurrentX}px, ${textCurrentY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
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
