import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GlobalBackground from "@/components/GlobalBackground";
import LoaderWrapper from "@/components/LoaderWrapper";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dm_mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adarsh Kr. Srivastava — Full Stack Engineer & Creative Technologist",
  description:
    "Portfolio of Adarsh Kr. Srivastava — building cinematic web experiences, AI-powered platforms, and full-stack products that feel as good as they perform.",
  keywords: ["Full Stack Developer", "UI/UX", "React", "Next.js", "Three.js", "AI", "Portfolio"],
  openGraph: {
    title: "Adarsh Kr. Srivastava — Full Stack Engineer",
    description: "Cinematic developer portfolio — React, Next.js, Three.js, AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cormorant.variable} ${outfit.variable} ${dm_mono.variable} antialiased bg-background text-foreground`}
      >
        <GlobalBackground />
        <SmoothScroll>
          <CustomCursor />
          <LoaderWrapper>
            <main id="main-content">
              {children}
            </main>
          </LoaderWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
