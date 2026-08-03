import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/sections/blog-card";
import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${profile.name}.`,
};

export default function BlogPage() {
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
          All posts
        </h1>
        <div className="mt-8 grid gap-4">
          {siteConfig.blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
