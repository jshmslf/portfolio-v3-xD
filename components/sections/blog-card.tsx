import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { BlogPost } from "@/lib/blog";
import { excerptFromContent, computeReadingMinutes } from "@/lib/blog";
import { formatPostDate } from "@/lib/format";

export function BlogCard({ post }: { post: BlogPost }) {
  const excerpt = excerptFromContent(post.content);

  return (
    <article
      className="group relative border border-border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-surface/50"
      style={{ borderRadius: "var(--radius)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {post.publishedAt && (
          <>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            {" · "}
          </>
        )}
        {computeReadingMinutes(post.content)} min read
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent-text">
        {/* Stretched link: the whole card is clickable, but only the title is announced. */}
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      {excerpt && (
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">{excerpt}</p>
      )}
      <span
        aria-hidden="true"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors group-hover:text-accent-text"
      >
        Read post
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-[0.625rem] transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </article>
  );
}
