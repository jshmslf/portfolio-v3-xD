import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogContent } from "@/components/sections/blog-content";
import { BlogSidebar } from "@/components/sections/blog-sidebar";
import { LikeButton } from "@/components/sections/like-button";
import { ReadingProgress } from "@/components/layout/reading-progress";
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  computeReadingMinutes,
  excerptFromContent,
} from "@/lib/blog";
import { getSiteProfile } from "@/lib/site-profile";
import { siteConfig } from "@/lib/site-config";
import { formatPostDate } from "@/lib/format";
import { getBaseOpenGraph } from "@/lib/seo/site";
import { getBlogPostingSchema } from "@/lib/seo/schema";
import { getRequestIpHash, hasLiked } from "@/lib/likes";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  // The CMS SEO title is authored as the full <title> (it usually already
  // ends with the site name), so it bypasses the layout's "%s | Name" template.
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || excerptFromContent(post.content) || undefined;
  const path = `/blog/${post.slug}`;
  const [profile, baseOpenGraph] = await Promise.all([getSiteProfile(), getBaseOpenGraph()]);

  return {
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description,
    alternates: { canonical: path },
    authors: [{ name: profile.name, url: siteConfig.url }],
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      url: path,
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      authors: [siteConfig.url],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const [allPosts, ipHash, profile, postingSchema] = await Promise.all([
    getPublishedBlogPosts(),
    getRequestIpHash(),
    getSiteProfile(),
    getBlogPostingSchema(post),
  ]);
  const otherPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 5);
  const liked = await hasLiked(post.id, ipHash);

  const readingMinutes = computeReadingMinutes(post.content);
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <main className="flex-1 pt-20 pb-24">
      <JsonLd data={postingSchema} />
      <ReadingProgress />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_28%] lg:gap-16">
          <article className="min-w-0">
            <header className="border-b border-border pb-8">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {post.publishedAt && (
                  <>
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    {" · "}
                  </>
                )}
                By {profile.name} · {readingMinutes} min read
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-5">
                <LikeButton
                  postId={post.id}
                  initialLiked={liked}
                  initialCount={post.likesCount}
                />
              </div>
            </header>
            <div className="mt-8 max-w-[70ch] text-[1.0625rem]">
              <BlogContent blocks={post.content} />
            </div>
          </article>

          <BlogSidebar otherPosts={otherPosts} shareUrl={shareUrl} shareTitle={post.title} />
        </div>
      </Container>
    </main>
  );
}
