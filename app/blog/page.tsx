import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/sections/blog-card";
import { getPublishedBlogPosts, searchPublishedBlogPosts } from "@/lib/blog";
import { profile } from "@/lib/profile";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${profile.name}.`,
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const posts = search ? await searchPublishedBlogPosts(search) : await getPublishedBlogPosts();

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
          {search ? `Results for "${search}"` : "All posts"}
        </h1>
        <div className="mt-8 grid gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-muted">No posts found.</p>
          )}
        </div>
      </Container>
    </main>
  );
}
