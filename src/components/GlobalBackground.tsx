"use client";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden">
      {/* Cinematic subtle static grain */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
      {/* Luxury dark radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-backgroundAlt/80 -z-10" />
    </div>
  );
}
