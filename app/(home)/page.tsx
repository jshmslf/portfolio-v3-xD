import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Companies } from "@/components/sections/companies";
import { Contact } from "@/components/sections/contact";
import { DodgersCard } from "@/components/sections/dodgers-card";
import { Experience } from "@/components/sections/experience";
import { GithubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { HowIWork } from "@/components/sections/how-i-work";
import { IntroSplash } from "@/components/sections/intro-splash";
import { Projects } from "@/components/sections/projects";
import { TapCard } from "@/components/sections/tap-card";
import { Testimonials } from "@/components/sections/testimonials";
import { TechStack } from "@/components/sections/tech-stack";
import { Sidebar } from "@/components/layout/sidebar";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getCompanies } from "@/lib/companies";
import { getSocialLinks } from "@/lib/social-links";
import { getProjects } from "@/lib/projects";
import { getSiteProfile } from "@/lib/site-profile";
import { getExperience } from "@/lib/experience";
import { getHomepageCard } from "@/lib/taps";
import { getVisitorTotal } from "@/lib/visitors";
import { pageMetadata } from "@/lib/seo/site";

export const revalidate = 60;

export async function generateMetadata() {
  const profile = await getSiteProfile();
  return pageMetadata({
    description: profile.seoDescription,
    path: "/",
  });
}

export default async function Home() {
  const [socialLinks, projects, profile, experience, companies, homepageCard, visitorTotal] = await Promise.all([
    getSocialLinks(),
    getProjects(),
    getSiteProfile(),
    getExperience(),
    getCompanies(),
    getHomepageCard(),
    getVisitorTotal(),
  ]);

  return (
    <main className="flex-1">
      <IntroSplash name={profile.name} role={profile.role} />
      <Hero />
      {/* Opaque and above the hero, so it slides over the hero's full-height
          backdrop as the intro collapses. */}
      <div className="relative z-10 bg-background">
        <Container className="pb-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[30%_1fr] lg:gap-16">
            <Sidebar
              socialLinks={socialLinks}
              projectCount={projects.length}
              avatarUrl={profile.avatarUrl}
              name={profile.name}
              address={profile.address}
              currentRole={experience[0]}
              visitorTotal={visitorTotal}
            />
            <div className="flex min-w-0 flex-col gap-20">
              {/* Hidden until the CMS has at least one visible company. */}
              {companies.length > 0 && (
                <Reveal>
                  <Companies companies={companies} />
                </Reveal>
              )}
              <Reveal>
                <About />
              </Reveal>
              <Reveal>
                <HowIWork />
              </Reveal>
              <Reveal>
                <TechStack />
              </Reveal>
              <Reveal>
                <Experience />
              </Reveal>
              <Reveal>
                <Projects />
              </Reveal>
              <Reveal>
                <Blog />
              </Reveal>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <Reveal>
                  <Testimonials />
                </Reveal>
                {/* Chosen in the CMS (Website → Homepage card). */}
                <Reveal delay={120}>
                  {homepageCard === "dodgers" ? <DodgersCard /> : <TapCard />}
                </Reveal>
              </div>
              <Reveal>
                <GithubActivity />
              </Reveal>
              <Reveal>
                <Contact />
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
