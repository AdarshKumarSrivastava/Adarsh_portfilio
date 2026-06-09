"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";

const pillars = [
  { title: "TCU Hackathon", desc: "Flagship 24-hour university hackathon fostering grassroots innovation." },
  { title: "SparkX", desc: "Intensive ideathon driving rapid prototyping and design thinking." },
  { title: "Nexido Summit", desc: "The grand convergence of builders, founders, and community leaders." },
  { title: "DevRel Initiative", desc: "Scaling developer advocacy and educational content globally." }
];

function AnimatedCounter({ target, suffix = "" }: { target: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let current = 0;
      const duration = 1800;
      const startTime = performance.now();
      
      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        current = Math.floor(target * ease);
        
        setCount(current);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(update);
    }
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading text-5xl md:text-7xl font-medium tracking-tight text-white">
      {count}{suffix}
    </span>
  );
}

function DualMarquee() {
  const wordsRow1 = ["QuantCraft", "Hackathons", "Community", "Scale", "Engineering", "Design"];
  const wordsRow2 = ["Innovation", "TCU", "SparkX", "Nexido", "Leadership", "Future"];
  
  return (
    <div className="group w-full overflow-hidden border-y border-white/[0.05] py-8 my-24 bg-surface/50 backdrop-blur-sm relative z-20">
      <div className="marquee-container flex flex-col gap-6">
        <div className="flex whitespace-nowrap animate-marquee-top items-center gap-8 will-change-transform">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              {wordsRow1.map(w => (
                <span key={w} className="font-heading italic text-3xl md:text-4xl text-white/50">{w}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-marquee-bottom items-center gap-8 will-change-transform">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              {wordsRow2.map(w => (
                <span key={w} className="font-sans text-xl md:text-2xl tracking-[0.2em] uppercase text-white/30">{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PillarCard({ pillar, index }: { pillar: typeof pillars[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && pathRef.current) {
            pathRef.current.style.strokeDashoffset = "0";
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Determine starting side for the entrance cascade (even left, odd right)
  const startX = index % 2 === 0 ? 50 : -50;

  return (
    <div 
      ref={cardRef}
      className="pillar-card relative glass p-10 rounded-2xl flex flex-col justify-between min-h-[320px] group hover:bg-white/[0.05] transition-colors duration-500 will-change-transform opacity-0"
      style={{ transform: `translate3d(${startX}px, 60px, 0)` }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl" style={{ zIndex: 1 }}>
        <rect
          x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="15" ry="15"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          strokeDasharray="1500"
          strokeDashoffset="1500"
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
        {/* We use a rect with dash offset to simulate the drawing */}
        <path
          ref={pathRef}
          d="M 16 1 L calc(100% - 16) 1 A 15 15 0 0 1 calc(100% - 1) 16 L calc(100% - 1) calc(100% - 16) A 15 15 0 0 1 calc(100% - 16) calc(100% - 1) L 16 calc(100% - 1) A 15 15 0 0 1 1 calc(100% - 16) L 1 16 A 15 15 0 0 1 16 1"
          fill="none"
          stroke="rgba(108, 99, 255, 0.8)"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          style={{ transition: "stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <div className="relative z-10">
        <span className="text-white/30 font-mono text-xs tracking-widest uppercase mb-6 block">0{index + 1}</span>
        <h3 className="font-heading text-3xl text-white mb-4">{pillar.title}</h3>
        <p className="text-secondary font-sans leading-relaxed">{pillar.desc}</p>
      </div>
      <div className="w-full h-[1px] bg-white/10 group-hover:bg-accent/50 transition-colors duration-500 mt-8 relative z-10" />
    </div>
  );
}

export default function Nexido() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Pin the header while cards scroll up
      if (headerRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: headerRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Blur and dim the text slightly so it stays visible like a watermark
        gsap.to(headerRef.current, {
          filter: "blur(3px)",
          opacity: 0.5,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
          }
        });
      }

      // Fade up cards sequentially, converging from sides
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".pillar-card");
        gsap.to(cards, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          }
        });
      }
    });

    // Typewriter logic for QuantCraft stat
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && typewriterRef.current) {
        const text = "National Level · 500+ Developers";
        let i = 0;
        typewriterRef.current.textContent = "";
        const interval = setInterval(() => {
          if (typewriterRef.current) {
            typewriterRef.current.textContent += text.charAt(i);
          }
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 50);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (typewriterRef.current) {
      observer.observe(typewriterRef.current);
    }

    return () => {
      ctx.revert();
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} id="nexido" className="relative w-full bg-background pt-24 pb-12 overflow-hidden">
      
      {/* Subtle Noise Turbulence Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")"
      }} />

      {/* Radial Spotlight behind QuantCraft */}
      <div className="absolute top-[50vh] left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none -z-10" style={{
        background: "radial-gradient(ellipse 800px 600px at 30% 50%, rgba(108,99,255,0.06), transparent)"
      }} />

      {/* Pinned Header */}
      <div ref={headerRef} className="w-full h-[40vh] flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none will-change-transform">
        <span className="text-accent font-mono text-sm tracking-[0.3em] uppercase mb-4">Nexido</span>
        <h2 className="font-heading text-6xl md:text-8xl font-medium tracking-tight text-white">
          Where Code Meets <span className="italic text-white/60">Community.</span>
        </h2>
      </div>

      {/* Spacer to allow scroll before cards overlap */}
      <div className="h-[40vh]" />

      <div className="relative z-20 container mx-auto px-6 lg:px-16 max-w-7xl">
        
        {/* QuantCraft Hero Card */}
        <div className="conic-border-card w-full p-12 md:p-16 mb-32 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(108,99,255,0.1)]">
          <span ref={typewriterRef} className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-6 min-h-[16px] block"></span>
          <h3 className="font-heading text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6">QuantCraft</h3>
          <p className="text-secondary font-sans text-lg md:text-xl max-w-2xl leading-relaxed">
            The ultimate convergence of quantitative analysis and software engineering. We scaled a grassroots idea into a national phenomenon, uniting developers to build the financial systems of tomorrow.
          </p>
        </div>

        {/* Pillar Cards (Asymmetric Layout) */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32" style={{ perspective: "1000px" }}>
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className={i % 2 === 1 ? "lg:translate-y-16" : ""}>
              <PillarCard pillar={pillar} index={i} />
            </div>
          ))}
        </div>

        {/* Quantify Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center my-32">
          <div className="flex flex-col items-center gap-2">
            <AnimatedCounter target={1000} suffix="+" />
            <span className="text-secondary font-mono tracking-[0.2em] uppercase text-sm mt-2">Participants</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnimatedCounter target={30} suffix="+" />
            <span className="text-secondary font-mono tracking-[0.2em] uppercase text-sm mt-2">Sponsors Secured</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AnimatedCounter target={4} suffix=" Events" />
            <span className="text-secondary font-mono tracking-[0.2em] uppercase text-sm mt-2">Successfully Executed</span>
          </div>
        </div>

      </div>

      <DualMarquee />
    </section>
  );
}
