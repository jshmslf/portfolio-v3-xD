import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Sidebar } from "@/components/layout/sidebar";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Container className="pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[30%_1fr] lg:gap-16">
          <Sidebar />
          <div className="flex flex-col gap-16">
            <About />
            <TechStack />
            <Experience />
            <Projects />
            <Blog />
            <Contact />
          </div>
        </div>
      </Container>
    </main>
  );
}
