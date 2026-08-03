import type { BlogPost } from "@/lib/site-config";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="border border-border p-5"
      style={{ borderRadius: "var(--radius)" }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {date}
      </p>
      <h3 className="mt-2 font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
        {post.excerpt}
      </p>
    </div>
  );
}
