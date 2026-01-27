import Image from "next/image";
import React from "react";
import { AuroraHero } from "../components/AuroraHero";
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
import { ContactForm } from "@/components/ui/ContactForm";


const images = [
"https://miro.medium.com/0*dCkBR3Q3lkGMKeAh.png",
"https://miro.medium.com/0*dCkBR3Q3lkGMKeAh.png",
"https://miro.medium.com/0*dCkBR3Q3lkGMKeAh.png",
"https://miro.medium.com/0*dCkBR3Q3lkGMKeAh.png", //next.js
"https://images.seeklogo.com/logo-png/33/1/open-ai-logo-png_seeklogo-332714.png", //openai
"https://www.doabledanny.com/static/c74778d67b3c3d3419cf86b755b32b06/ee604/feature.png", //react
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tRZikZb4WdnDGIffbT9nnwZp2rl9Ib6LJA&s",
"https://www.clipartmax.com/png/middle/146-1469937_background-kubernetes-logo.png",
"https://miro.medium.com/0*dCkBR3Q3lkGMKeAh.png", //next.js
"https://img.icons8.com/ios_filled/200/FFFFFF/notion.png", //notion
"https://site.interns.school/wp-content/uploads/2024/08/Frame-51-3.png", //tailwind
"https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102017/logo_0.png?17TK91b1B6OvV2MFrCLfukw1c8oEaNr6&itok=vsanFiUj", //AWS
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHK-i2VzKvruC7yhkfmkuyjbeZdfOcA8lQJA&s", //docker
"https://www.softwebsolutions.com/wp-content/uploads/2023/07/Kubernetes.webp", //kubernetes
"https://cdn-icons-png.flaticon.com/512/5968/5968286.png", //python
"https://miro.medium.com/1*0f4dvSifVihCIgWtXuBXnQ.png", //GraphQL
"https://www.pikpng.com/pngl/b/493-4938064_logic-pro-x-on-the-mac-app-store.png",
"https://www.softwebsolutions.com/wp-content/uploads/2023/07/Kubernetes.webp",
"https://www.pikpng.com/pngl/b/493-4938064_logic-pro-x-on-the-mac-app-store.png",
"https://miro.medium.com/1*0f4dvSifVihCIgWtXuBXnQ.png",
"https://i.pinimg.com/736x/80/0f/31/800f31dcd38e0b6129d6490d5df7df2c.jpg",//capcut
"https://www.pikpng.com/pngl/b/493-4938064_logic-pro-x-on-the-mac-app-store.png", //logic pro
"https://www.shutterstock.com/image-illustration/adobe-firefly-logo-on-white-600nw-2307187773.jpg", //firefly
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tRZikZb4WdnDGIffbT9nnwZp2rl9Ib6LJA&s",
"https://www.shutterstock.com/image-illustration/adobe-firefly-logo-on-white-600nw-2307187773.jpg", //firefly
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0tRZikZb4WdnDGIffbT9nnwZp2rl9Ib6LJA&s",
"https://site.interns.school/wp-content/uploads/2024/08/Frame-51-3.png",
]

const IPadHeading = (
  <>
    <h1 className="text-5xl md:text-6xl font-extrabold text-black dark:text-white leading-tight">
      Discover some of my
      <br />
      <span className="text-4xl md:text-[6rem] font-black mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 drop-shadow-[0_10px_30px_rgba(56,189,248,0.35)]">
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

      <section id="iphone" className="relative flex min-h-screen items-center justify-center">
        <ContactForm />
      </section>

      <section id="side-scroll" className="relative w-full">
        <SideScroll />
      </section>

      <section id="iphone" className="relative flex min-h-screen items-center justify-center">
        <IPhone />
        <TravelAnimation />
      </section>

      

  </div>




    
  );
}
