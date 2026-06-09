import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Credentials from "@/components/sections/Credentials";
import Skills from "@/components/sections/Skills";
import Nexido from "@/components/sections/Nexido";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main className="w-full bg-background">
        <Hero />
        <About />
        <Credentials />
        <Skills />
        <Nexido />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
