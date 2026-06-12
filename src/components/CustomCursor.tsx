"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  // Use refs for animation states to avoid react re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const state = useRef({
    hoverInteractive: false,
    hoverHeading: false,
    hoverDrag: false,
    mouseDown: false,
  });

  // Current visual values for interpolation
  const ringSize = useRef(44);
  const dotWidth = useRef(8);
  const dotHeight = useRef(8);
  const dotOpacity = useRef(1);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onMouseDown = () => (state.current.mouseDown = true);
    const onMouseUp = () => (state.current.mouseDown = false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Initial position fix
    dotPos.current.x = window.innerWidth / 2;
    dotPos.current.y = window.innerHeight / 2;
    ringPos.current.x = window.innerWidth / 2;
    ringPos.current.y = window.innerHeight / 2;
    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;

    let rafId: number;

    const render = () => {
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;

      // Lerp math
      dotPos.current.x += (targetX - dotPos.current.x) * 0.18;
      dotPos.current.y += (targetY - dotPos.current.y) * 0.18;

      ringPos.current.x += (targetX - ringPos.current.x) * 0.08;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.08;

      // Scale targets
      let targetRingSize = 44;
      let targetDotWidth = 8;
      let targetDotHeight = 8;
      let targetDotOpacity = 1;

      // Apply base styles depending on state
      let ringBlur = "4px";
      let ringBorderColor = "rgba(108,99,255,0.25)";
      let labelOpacity = 0;
      let ringBorderStyle = "solid";
      let ringTransformExtra = "";

      if (state.current.hoverDrag) {
        targetRingSize = 80;
        targetDotOpacity = 0;
        labelOpacity = 1;
        ringBlur = "0px";
        ringBorderColor = "rgba(108,99,255,0.8)";
      } else if (state.current.hoverInteractive) {
        targetRingSize = 72;
        targetDotOpacity = 0;
        ringBlur = "0px";
        ringBorderColor = "rgba(108,99,255,1)";
        ringBorderStyle = "dashed";
        ringTransformExtra = ` rotate(${Date.now() / 5}deg)`; // Crazy rotation effect
      } else if (state.current.hoverHeading) {
        targetRingSize = 56;
        targetDotWidth = 2;
        targetDotHeight = 20;
      }

      if (state.current.mouseDown) {
        targetRingSize *= 0.8;
        targetDotWidth *= 0.8;
        targetDotHeight *= 0.8;
        ringTransformExtra += " scale(0.8)";
      }

      ringSize.current += (targetRingSize - ringSize.current) * 0.2;
      dotWidth.current += (targetDotWidth - dotWidth.current) * 0.2;
      dotHeight.current += (targetDotHeight - dotHeight.current) * 0.2;
      dotOpacity.current += (targetDotOpacity - dotOpacity.current) * 0.2;

      // Apply transformations
      if (dotRef.current && ringRef.current && labelRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.width = `${dotWidth.current}px`;
        dotRef.current.style.height = `${dotHeight.current}px`;
        dotRef.current.style.opacity = `${dotOpacity.current}`;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)${ringTransformExtra}`;
        ringRef.current.style.width = `${ringSize.current}px`;
        ringRef.current.style.height = `${ringSize.current}px`;
        
        ringRef.current.style.backdropFilter = "none";
        ringRef.current.style.backgroundColor = "transparent";
        
        ringRef.current.style.borderColor = ringBorderColor;
        ringRef.current.style.borderStyle = ringBorderStyle;
        
        labelRef.current.style.opacity = `${labelOpacity}`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Hover detection
  useEffect(() => {
    if (!isVisible) return;

    const interactiveSelector = "a, button, input, textarea, select, [data-cursor-interactive]";
    const headingSelector = "h1, h2, h3";
    const dragSelector = "[data-cursor-drag]";

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(dragSelector)) {
        state.current.hoverDrag = true;
        state.current.hoverInteractive = false;
        state.current.hoverHeading = false;
      } else if (target.closest(interactiveSelector)) {
        state.current.hoverInteractive = true;
        state.current.hoverDrag = false;
        state.current.hoverHeading = false;
      } else if (target.closest(headingSelector)) {
        state.current.hoverHeading = true;
        state.current.hoverInteractive = false;
        state.current.hoverDrag = false;
      } else {
        state.current.hoverInteractive = false;
        state.current.hoverHeading = false;
        state.current.hoverDrag = false;
      }
    };

    const onMouseOut = () => {
      state.current.hoverInteractive = false;
      state.current.hoverHeading = false;
      state.current.hoverDrag = false;
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-[rgba(108,99,255,0.9)] pointer-events-none z-[1000] will-change-transform flex items-center justify-center overflow-hidden"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[999] will-change-transform flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] bg-[rgba(108,99,255,0.04)] border-[rgba(108,99,255,0.25)] border transition-[backdrop-filter,border-color] duration-300"
      >
        <span ref={labelRef} className="font-mono text-[10px] tracking-widest text-[#f0eeff] uppercase font-semibold">
          Drag
        </span>
      </div>
    </>
  );
}
