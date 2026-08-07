import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/container";
import { TechItem } from "@/components/sections/tech-item";
import { getTechStack } from "@/lib/tech-stack";
import { getTechCategories } from "@/lib/tech-categories";
import { profile } from "@/lib/profile";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tech Stack",
  description: `Tools and technologies ${profile.name} works with.`,
};

export default async function TechStackPage() {
  const [items, categories] = await Promise.all([getTechStack(), getTechCategories()]);

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

        <div className="mt-8 flex flex-col gap-10">
          {categories.map((category) => {
            const categoryItems = items.filter((item) => item.category === category.id);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category.id}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {category.label}
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {categoryItems.map((tech) => (
                    <TechItem key={tech.id} tech={tech} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
