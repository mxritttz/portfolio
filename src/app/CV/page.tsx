import Lebenslauf from "@/components/ui/Lebenslauf";
import { FloatingNav } from "@/components/ui/floating-navbar";



export default function CV() {
  return (

    <div className="relative font-sans bg-zinc-50 dark:bg-black" id="cv">
      <FloatingNav
  navItems={[
    { name: "Home", link: "/#hero" },
    { name: "About", link: "/#about" },
    { name: "Projects", link: "/#projects" },
    { name: "Skills", link: "/#skills" },
    { name: "CV", link: "/CV" },
  ]}
/>

      <section id="hero" className="relative flex min-h-screen items-center justify-center">
       <Lebenslauf />
      </section>


  </div>




    
  );
}
