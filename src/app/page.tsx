import Image from "next/image";
import React from "react";
import { marqueeImages } from "@/lib/marquee-images";
import AuroraHero from "@/components/AuroraHero";
import LaptopCloudLoop from "@/components/LaptopCloudLoop";
import {CometCard} from "@/components/ui/comet-card";
import { Meteors } from "@/components/ui/meteors";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { AboutMe } from "@/components/ui/AboutMe";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Skills } from "@/components/ui/Skills";
import { Projects } from "@/components/ui/Projects";
import IPhone from "@/components/ui/iPhone";
import { SideScroll } from "@/components/ui/SideScroll";
import TradingApp from "@/components/ui/TradingApp";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Heading } from "lucide-react";
import Lebenslauf from "@/components/ui/Lebenslauf";
import { TimelineDemo } from "@/components/ui/TimeLineDemo";
import { FloatingNav } from "@/components/ui/floating-navbar";
import TravelAnimation from "@/components/ui/TravelAnimation";


const images = marqueeImages;

const IPadHeading = (
  <>
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black dark:text-white leading-tight">
      Discover some of my
      <br />
      <span className="text-3xl sm:text-4xl md:text-[6rem] font-black mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 drop-shadow-[0_10px_30px_rgba(56,189,248,0.35)]">
        Projects
      </span>
    </h1>
  </>
);

export default function Home() {
  return (

    <div className="relative font-sans bg-zinc-50 dark:bg-black" id="cv">
      <FloatingNav
  navItems={[
    { name: "Home", link: "/#hero" },
    { name: "About", link: "/#about" },
    { name: "Projects", link: "/#projects" },
    { name: "Skills", link: "skills" },
    { name: "CV", link: "/CV" },
  ]}
/>

      <section id="hero" className="relative flex min-h-screen items-center justify-center">
        <AuroraHero />
        <LaptopCloudLoop />
        <Meteors />
        <ShootingStars />
      </section>

      <section id="about" className="relative flex min-h-screen items-center justify-center pb-20">
        <AboutMe />
      </section>

  {/*     <section id="technologies" className="relative flex min-h-screen items-center justify-center">
        <ThreeDMarquee images={images}/>
      </section> */}

      <section id="skills" className="relative flex min-h-screen items-center justify-center snap-center pt-40">
        <Skills />
      </section>

      <section id="projects" className="relative flex min-h-screen items-center justify-center">
        <ContainerScroll titleComponent={IPadHeading} children={<Projects />} />
      </section>

      <section id="side-scroll" className="relative w-full">
        <SideScroll />
      </section>

      <section id="iphone" className="relative flex min-h-screen flex-col md:flex-row items-center justify-center gap-8 px-4">
        <IPhone />
        <TravelAnimation />
      </section>

      

  </div>




    
  );
}
