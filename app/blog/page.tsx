import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { BlogCard } from "@/components/sections/blog-card";
import { getPublishedBlogPosts, searchPublishedBlogPosts } from "@/lib/blog";
import { profile } from "@/lib/profile";
import { pageMetadata } from "@/lib/seo/site";

export const revalidate = 60;

const DESCRIPTION = `Articles by ${profile.name} on web development, software engineering, and the things learned building real projects.`;

type BlogPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { search } = await searchParams;
  const metadata = pageMetadata({ title: "Blog", description: DESCRIPTION, path: "/blog" });

  // Search result pages are thin duplicates of /blog: keep them out of the index.
  return search ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { search } = await searchParams;
  const posts = search ? await searchPublishedBlogPosts(search) : await getPublishedBlogPosts();

  return (
    <main className="flex-1 pt-20 pb-24">
      <Container>
        <PageHeader
          title={search ? `Results for "${search}"` : "Blog"}
          description={
            search
              ? `${posts.length} post${posts.length === 1 ? "" : "s"} found.`
              : "Notes on web development, software engineering, and what I learn along the way."
          }
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]}
        />
        <div className="mt-10 grid max-w-3xl gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
          {posts.length === 0 && <p className="text-sm text-muted">No posts found.</p>}
        </div>
      </Container>
    </main>
  );
}
