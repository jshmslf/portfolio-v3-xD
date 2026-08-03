import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/container";
import { TechItem } from "@/components/sections/tech-item";
import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: `Tools and technologies ${profile.name} works with.`,
};

export default function TechStackPage() {
  return (
    <main className="flex-1 py-20">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Tech stack
        </h1>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {siteConfig.techStack.map((tech) => (
            <TechItem key={tech.name} tech={tech} />
          ))}
        </div>
      </Container>
    </main>
  );
}
