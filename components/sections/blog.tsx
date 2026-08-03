import { siteConfig } from "@/lib/site-config";
import { BlogCard } from "@/components/sections/blog-card";
import { SectionHeader } from "@/components/ui/section-header";

export function Blog() {
  const teaser = siteConfig.blogPosts.slice(0, 3);

  return (
    <section id="blog">
      <SectionHeader
        title="Blog"
        viewAllHref="/blog"
        viewAllLabel="View all posts"
      />
      <div className="mt-6 grid gap-4">
        {teaser.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
}
