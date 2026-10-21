import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { TechItem } from "@/components/sections/tech-item";
import { getTechStack } from "@/lib/tech-stack";
import { getTechCategories } from "@/lib/tech-categories";
import { getSiteProfile } from "@/lib/site-profile";
import { pageMetadata } from "@/lib/seo/site";

export const revalidate = 60;

export async function generateMetadata() {
  const profile = await getSiteProfile();
  return pageMetadata({
    title: "Tech Stack",
    description: `The languages, frameworks, databases, and design tools ${profile.name} uses to build web and mobile products.`,
    path: "/tech-stack",
  });
}

export default async function TechStackPage() {
  const [items, categories] = await Promise.all([getTechStack(), getTechCategories()]);

  return (
    <main className="flex-1 pt-20 pb-24">
      <Container>
        <PageHeader
          title="Tech stack"
          description="The tools I reach for day to day, grouped by where they sit in the stack."
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Tech stack", path: "/tech-stack" },
          ]}
        />

        <div className="mt-10 flex flex-col gap-10">
          {categories.map((category) => {
            const categoryItems = items.filter((item) => item.category === category.id);
            if (categoryItems.length === 0) return null;

            return (
              <section key={category.id} aria-labelledby={`category-${category.id}`}>
                <h2
                  id={`category-${category.id}`}
                  className="text-sm font-semibold uppercase tracking-widest text-accent-text"
                >
                  {category.label}
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {categoryItems.map((tech) => (
                    <TechItem key={tech.id} tech={tech} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
