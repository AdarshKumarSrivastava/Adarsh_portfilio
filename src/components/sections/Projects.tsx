"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ProjectModal, { type ProjectData } from "@/components/ProjectModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects: ProjectData[] = [
  {
    title: "Hack in Hills",
    category: "Hackathon / Event Platform",
    year: "2026",
    description: "An immersive expedition-inspired hackathon platform designed for Hack in Hills, combining event information, challenges, schedules, mentors, sponsors and registration into a cinematic interactive experience.",
    image: "https://hack-in-hills-black.vercel.app/images/hero.jpg",
    heroImage: "https://hack-in-hills-black.vercel.app/images/hero.jpg",
    color: "from-orange-500/20 to-amber-500/20",
    problem:
      "Traditional hackathon websites often feel like standard corporate event pages, failing to capture the energy, ambition, and unique atmosphere of an expedition-style coding challenge in the Himalayas.",
    approach:
      "Designed a highly immersive, cinematic web experience that treats the hackathon like a high-altitude expedition. Built with modern web technologies for fluid scroll animations, topographic preloader, and magnetic interactions to create a premium feel.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    outcomes: [
      "Delivered a fully responsive cinematic experience with 60fps animations",
      "Implemented a custom topography preloader and smooth page transitions",
      "Integrated an interactive expedition map for hackathon tracks",
      "Achieved a premium Apple-level design aesthetic for high user engagement",
    ],
    gallery: [
      "https://hack-in-hills-black.vercel.app/images/challenges-bg-4k.jpg",
      "https://hack-in-hills-black.vercel.app/images/tracks-bg-abstract.png",
      "https://hack-in-hills-black.vercel.app/images/hero.jpg",
    ],
    liveUrl: "https://hack-in-hills-black.vercel.app/",
    githubUrl: undefined,
  },
  {
    title: "VK Sentinels",
    category: "Cybersecurity / Enterprise Platform",
    year: "2025",
    description:
      "\"Secure What Matters.\" — An elite digital engineering firm's website architecting mission-critical systems, zero-trust cybersecurity perimeters, and autonomous intelligence for enterprise scale.",
    image: "/images/vk-sentinels-hero.jpg",
    heroImage: "/images/vk-sentinels-hero.jpg",
    color: "from-cyan-500/20 to-emerald-500/20",
    problem:
      "Cybersecurity firms struggle to communicate technical credibility through their digital presence. Generic corporate websites fail to convey the sophistication and zero-trust discipline that enterprise clients demand — resulting in lost trust before the first conversation.",
    approach:
      "Designed a cinematic, Apple-grade website with a dramatic city skyline hero, glassmorphic navigation bar, and frosted-glass discipline cards. Used Geist typography for a premium monospaced-meets-sans feel, smooth scroll-driven animations, and a light-mode palette anchored in #F7F7F5 for an enterprise-clean aesthetic.",
    techStack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Geist Font",
    ],
    outcomes: [
      "Delivered a production-ready enterprise website with premium Apple-inspired design",
      "Built glassmorphic UI with frosted navigation, discipline cards, and CTA sections",
      "Implemented cinematic city skyline hero with 'Secure What Matters' messaging",
      "Achieved 60fps scroll animations, responsive layouts, and zero-trust-ready branding",
    ],
    gallery: [
      "/images/vk-sentinels-screenshot.png",
      "/images/vk-sentinels-hero.jpg",
      "/images/vk-sentinels-screenshot.png",
    ],
    liveUrl: "https://vksentinals.vercel.app/",
    githubUrl: undefined,
  },
  {
    title: "GenZ AI",
    category: "AI Productivity Platform",
    year: "2024",
    description: "AI chat, planning, and task management built with React, Node.js, MongoDB, and Claude API.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    color: "from-accent/20 to-purple-500/20",
    problem:
      "Modern knowledge workers are overwhelmed by fragmented productivity tools — chat in one app, task management in another, AI assistance in a third. Context-switching kills deep work and causes decision fatigue across the entire workflow.",
    approach:
      "Built a unified AI-native workspace that integrates conversational AI, project planning, and task execution into a single coherent interface. Leveraged Claude API for context-aware responses and designed an event-sourced data model so the AI always has complete project context.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Claude API", "Tailwind CSS", "Web Containers"],
    outcomes: [
      "Reduced context-switching by consolidating 4 productivity tools into one",
      "Achieved sub-200ms AI response latency through streaming and caching",
      "Intuitive UX validated with 15+ beta users requiring zero onboarding",
      "Modular architecture enables new AI capabilities in under 2 hours",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1686191128892-3b37add4c844?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1470&auto=format&fit=crop",
    ],
    liveUrl: "https://example.com/genzai",
    githubUrl: "https://github.com/AdarshKumarSrivastava",
  },
  {
    title: "Exam Prep Hub",
    category: "EdTech Web App",
    year: "2024",
    description: "Web platform for grades 7–10 with tests, notes, and performance tracking.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    color: "from-accent/20 to-teal-500/20",
    problem:
      "Students in grades 7–10 lack access to an affordable, structured digital study companion that adapts to their pace, tracks weaknesses, and serves high-quality practice tests without subscription paywalls.",
    approach:
      "Designed a React SPA with adaptive practice sessions that surface weak topics more frequently. Built a performance analytics dashboard giving teachers and parents a transparent view of progress. Used MongoDB for flexible content modeling across subjects.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Chart.js"],
    outcomes: [
      "Delivered 1,200+ practice questions across 8 subjects",
      "Performance dashboard revealed top 3 weak topics per student automatically",
      "60% of beta users reported improved test confidence after 2 weeks",
      "Zero-cost architecture using free-tier cloud services",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1422&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1546&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
    ],
    liveUrl: "https://example.com/examprep",
    githubUrl: "https://github.com/AdarshKumarSrivastava",
  },
  {
    title: "E-Commerce OS",
    category: "Full Stack Platform",
    year: "2023",
    description: "Responsive shopping website with secure login system and modern UI/UX.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069&auto=format&fit=crop",
    color: "from-orange-500/20 to-red-500/20",
    problem:
      "Small retail businesses struggle to compete online due to the complexity and cost of setting up a secure, scalable e-commerce presence. Existing platforms lock merchants into rigid templates and high transaction fees.",
    approach:
      "Built a full-stack e-commerce solution from scratch with PHP and MySQL backend, custom authentication with session management, product CRUD, a shopping cart, and a responsive storefront. Prioritized security with prepared statements, CSRF protection, and hashed passwords.",
    techStack: ["HTML", "CSS", "PHP", "MySQL", "phpMyAdmin", "JavaScript"],
    outcomes: [
      "End-to-end purchase flow from product browsing to order confirmation",
      "Secure auth system with session-based login and brute-force protection",
      "Fully responsive across mobile, tablet, and desktop viewports",
      "Admin panel with real-time inventory and order management",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1470&auto=format&fit=crop",
    ],
    liveUrl: undefined,
    githubUrl: "https://github.com/AdarshKumarSrivastava",
  },
];

type Project = ProjectData;

import { useInView } from "framer-motion";

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  
  const [isHovered, setIsHovered] = useState(false);
  
  // Ref for the shutter effect when scrolling into view
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isLast = index === projects.length - 1;

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`project-card relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[65vh] shrink-0 rounded-[2rem] overflow-hidden cursor-none group will-change-transform ${
        !isLast ? "mr-8 md:mr-16" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[#0d0d1a] rounded-[2rem] overflow-hidden border border-white/[0.05] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Visual Media Container strictly using CSS transforms for 60fps */}
        <div 
          className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: isHovered ? "scale(1.05) translateZ(0)" : "scale(1) translateZ(0)" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'scale-110 blur-[8px] brightness-[0.3] opacity-100' : 'scale-100 blur-0 brightness-90 opacity-70'
            }`}
            sizes="(max-width: 768px) 85vw, 45vw"
            priority={index === 0}
          />
          
          {/* Shutter Reveal Effect */}
          <motion.div 
            initial={{ scaleX: 1 }}
            animate={{ scaleX: isInView ? 0 : 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="absolute inset-0 bg-[#07080f] z-10 origin-right pointer-events-none"
          />
        </div>

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-40 group-hover:opacity-70 transition-opacity duration-700 z-20`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080f] via-[#07080f]/40 to-transparent opacity-90 z-20" />

        {/* Content */}
        <div
          className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none z-30"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Top badge */}
          <div className="flex items-center justify-between">
            <span className="bg-white/10 rounded-full text-white font-mono uppercase tracking-[0.2em] text-[10px] md:text-xs px-5 py-2">
              {project.category}
            </span>
            <span className="text-secondary font-mono text-xs tracking-widest">{project.year}</span>
          </div>

          {/* Bottom content */}
          <div>
            <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white font-medium tracking-tight mb-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              {project.title}
            </h3>
            <p className="text-secondary font-sans text-sm md:text-base leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] mb-8">
              {project.description}
            </p>

            {/* "View Case Study" pill */}
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <span className="w-12 h-[1px] bg-accent" />
              <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase">Explore</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollEl = scrollRef.current;
    if (!container || !scrollEl) return;

    const ctx = gsap.context(() => {
      // Calculate dynamic travel distance based on content width
      const getScrollAmount = () => {
        return -(scrollEl.scrollWidth - window.innerWidth + window.innerWidth * 0.1);
      };

      // Native GSAP horizontal scroll with pinning
      gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.max(scrollEl.scrollWidth - window.innerWidth + 300, 1200)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Staggered card entrance on arrival
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      if (cards.length) {
        gsap.fromTo(cards, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              once: true,
            }
          }
        );
      }
    }, containerRef);

    // Refresh ScrollTrigger after initial mount and font/image settling
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col bg-transparent pt-20 md:pt-28"
      >
        {/* Section label and scroll indicator */}
        <div className="px-8 md:px-16 z-40 pointer-events-none shrink-0 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase mb-4">03 — Work</p>
            <h2 className="text-4xl md:text-6xl font-heading font-medium text-white tracking-tight">
              Selected <span className="text-white/40 italic">Works</span>.
            </h2>
            <p className="text-secondary font-sans text-sm mt-4 hidden md:block">
              Click any card to explore the full case study.
            </p>
          </div>

          {/* Scroll progress indicator */}
          <div className="flex items-center gap-4 pb-2">
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-secondary font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
          </div>
        </div>

        {/* Horizontal scroll track (Fill remaining space) */}
        <div className="flex-1 flex items-start md:items-center w-full overflow-hidden">
          <div ref={scrollRef} className="flex pl-[8vw] md:pl-[16vw] pr-[8vw] will-change-transform">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={handleClose} />
    </>
  );
}
