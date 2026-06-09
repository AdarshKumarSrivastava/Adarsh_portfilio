"use client";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  {
    quote: "Adarsh delivered a product that exceeded every expectation. The UI is breathtaking and the performance is flawless.",
    name: "Sarah Chen",
    title: "CTO, NovaTech Ventures",
    initials: "SC",
  },
  {
    quote: "Working with Adarsh felt like working with a senior architect from a top-tier firm. Detail-oriented, fast, and truly creative.",
    name: "James Rivera",
    title: "Product Lead, QuantumApps",
    initials: "JR",
  },
  {
    quote: "The hackathon win was well deserved. His ability to build and lead under pressure is something you rarely find.",
    name: "Dr. Meera Patel",
    title: "Faculty Mentor, Galgotias University",
    initials: "MP",
  },
  {
    quote: "His front-end work is cinematic. Every animation feels purposeful, every interaction feels alive and intentional.",
    name: "Alex Kim",
    title: "Design Director, Pixel Studio",
    initials: "AK",
  },
  {
    quote: "Adarsh brings an engineer's precision and a designer's eye. A rare combination that produces exceptional outcomes.",
    name: "Priya Sharma",
    title: "VP Engineering, CloudScale",
    initials: "PS",
  },
  {
    quote: "The architecture decisions were mature beyond his years. Clean, scalable, and documented impeccably.",
    name: "Daniel Park",
    title: "Lead Architect, Meridian Labs",
    initials: "DP",
  },
];

function TestimonialCard({ item }: { item: (typeof testimonials)[0] }) {
  return (
    <div className="relative w-[320px] md:w-[400px] shrink-0 glass-panel rounded-3xl p-8 mx-3 group hover:bg-white/[0.04] transition-colors duration-500">
      {/* Large quote mark */}
      <span className="absolute -top-3 left-7 text-6xl text-white/10 font-heading leading-none select-none group-hover:text-white/20 transition-colors duration-500">
        &ldquo;
      </span>
      <p className="text-secondary font-serif text-lg md:text-xl italic leading-relaxed pt-4 mb-8">
        {item.quote}
      </p>
      <div className="flex items-center gap-4 border-t border-white/[0.05] pt-6">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 font-sans font-semibold text-white text-xs shrink-0">
          {item.initials}
        </div>
        <div>
          <p className="text-white font-sans text-sm font-semibold">{item.name}</p>
          <p className="text-secondary font-sans text-[10px] tracking-wider uppercase mt-0.5">{item.title}</p>
        </div>
      </div>
    </div>
  );
}

// Pure CSS marquee rows — no JavaScript timers
function MarqueeRow({ reversed = false }: { reversed?: boolean }) {
  const items = reversed ? [...testimonials].reverse() : testimonials;
  const animClass = reversed ? "animate-[marquee-reverse_40s_linear_infinite]" : "animate-[marquee_40s_linear_infinite]";

  return (
    <div className="flex overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex ${animClass}`}>
        {[...items, ...items].map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 mb-20">
        <SectionHeading
          eyebrow="06 — Testimonials"
          heading={<>What People <span className="italic font-light">Say</span>.</>}
          subtext="Words from colleagues, mentors, and collaborators."
          align="center"
          className="mx-auto max-w-xl"
        />
      </div>

      <div className="space-y-6">
        <MarqueeRow />
        <MarqueeRow reversed />
      </div>

      {/* Bottom subtle line */}
      <div className="mt-20 mx-auto max-w-xs section-divider opacity-30" />
    </section>
  );
}
