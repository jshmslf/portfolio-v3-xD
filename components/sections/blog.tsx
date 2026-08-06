import { getPublishedBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/sections/blog-card";
import { SectionHeader } from "@/components/ui/section-header";

export async function Blog() {
  const posts = await getPublishedBlogPosts();
  const teaser = posts.slice(0, 3);

  return (
    <section id="blog">
      <SectionHeader
        title="Blog"
        viewAllHref="/blog"
        viewAllLabel="View all posts"
      />
      <div className="mt-6 grid gap-4">
        {teaser.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
