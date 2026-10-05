import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { DodgersCard } from "@/components/sections/dodgers-card";
import { Experience } from "@/components/sections/experience";
import { GithubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { TechStack } from "@/components/sections/tech-stack";
import { Sidebar } from "@/components/layout/sidebar";
import { Container } from "@/components/ui/container";
import { getSocialLinks } from "@/lib/social-links";
import { getProjects } from "@/lib/projects";
import { getProfileAvatarUrl } from "@/lib/profile";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo/site";

export const revalidate = 60;

export const metadata = pageMetadata({
  description: siteConfig.seoDescription,
  path: "/",
});

export default async function Home() {
  const [socialLinks, projects, avatarUrl] = await Promise.all([
    getSocialLinks(),
    getProjects(),
    getProfileAvatarUrl(),
  ]);

  return (
    <main className="flex-1">
      <Hero avatarUrl={avatarUrl} />
      <Container className="pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[30%_1fr] lg:gap-16">
          <Sidebar
            socialLinks={socialLinks}
            projectCount={projects.length}
            avatarUrl={avatarUrl}
          />
          <div className="flex min-w-0 flex-col gap-20">
            <About />
            <TechStack />
            <Experience />
            <Projects />
            <Blog />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Testimonials />
              <DodgersCard />
            </div>
            <GithubActivity />
            <Contact />
          </div>
        </div>
      </Container>
    </main>
  );
}
