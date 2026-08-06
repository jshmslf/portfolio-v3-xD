import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { TechStack } from "@/components/sections/tech-stack";
import { Sidebar } from "@/components/layout/sidebar";
import { Container } from "@/components/ui/container";
import { getSocialLinks } from "@/lib/social-links";

export const revalidate = 60;

export default async function Home() {
  const socialLinks = await getSocialLinks();

  return (
    <main className="flex-1">
      <Hero />
      <Container className="pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[30%_1fr] lg:gap-16">
          <Sidebar socialLinks={socialLinks} />
          <div className="flex flex-col gap-16">
            <About />
            <TechStack />
            <Experience />
            <Projects />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Testimonials />
              <div />
            </div>
            <Blog />
            <Contact />
          </div>
        </div>
      </Container>
    </main>
  );
}
