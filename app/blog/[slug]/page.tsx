import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/container";
import { BlogContent } from "@/components/sections/blog-content";
import { BlogSidebar } from "@/components/sections/blog-sidebar";
import { LikeButton } from "@/components/sections/like-button";
import { ReadingProgress } from "@/components/layout/reading-progress";
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  computeReadingMinutes,
} from "@/lib/blog";
import { profile } from "@/lib/profile";
import { siteConfig } from "@/lib/site-config";
import { getRequestIpHash, hasLiked } from "@/lib/likes";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const [allPosts, ipHash] = await Promise.all([
    getPublishedBlogPosts(),
    getRequestIpHash(),
  ]);
  const otherPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 5);
  const liked = await hasLiked(post.id, ipHash);

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const readingMinutes = computeReadingMinutes(post.content);
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <main className="flex-1 py-20">
      <ReadingProgress />
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to blog
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_28%] lg:gap-16">
          <article>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {[date, `By ${profile.name}`, `${readingMinutes} min read`]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {post.title}
            </h1>
            <div className="mt-4">
              <LikeButton
                postId={post.id}
                initialLiked={liked}
                initialCount={post.likesCount}
              />
            </div>
            <div className="mt-8">
              <BlogContent blocks={post.content} />
            </div>
          </article>

          <BlogSidebar otherPosts={otherPosts} shareUrl={shareUrl} shareTitle={post.title} />
        </div>
      </Container>
    </main>
  );
}
