import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { excerptFromContent, computeReadingMinutes } from "@/lib/blog";
import { profile } from "@/lib/profile";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-border p-5 transition-colors hover:border-accent"
      style={{ borderRadius: "var(--radius)" }}
    >
      <h3 className="font-semibold">{post.title}</h3>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted">
        {[date, `By ${profile.name.split(" ")[0]}`, `${computeReadingMinutes(post.content)} min read`]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
        {excerptFromContent(post.content)}
      </p>
    </Link>
  );
}
