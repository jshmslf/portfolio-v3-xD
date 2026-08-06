"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLink,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faXTwitter, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import type { BlogPost } from "@/lib/blog";

export function BlogSidebar({
  otherPosts,
  shareUrl,
  shareTitle,
}: {
  otherPosts: BlogPost[];
  shareUrl: string;
  shareTitle: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/blog?search=${encodeURIComponent(query.trim())}`);
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col gap-4">
        <div
          className="border border-border bg-surface p-5"
          style={{ borderRadius: "var(--radius)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Search</p>
          <form onSubmit={handleSearch} className="mt-3 flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="min-w-0 flex-1 border border-border bg-background px-3 py-1.5 text-sm"
              style={{ borderRadius: "var(--radius)" }}
            />
            <button
              type="submit"
              aria-label="Search"
              className="border border-border px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent"
              style={{ borderRadius: "var(--radius)" }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>

        {otherPosts.length > 0 && (
          <div
            className="border border-border bg-surface p-5"
            style={{ borderRadius: "var(--radius)" }}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Other posts
            </p>
            <div className="mt-3 flex flex-col gap-3">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-foreground/80 hover:text-accent"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div
          className="border border-border bg-surface p-5"
          style={{ borderRadius: "var(--radius)" }}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Share</p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="text-muted hover:text-accent"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="text-muted hover:text-accent"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="text-muted hover:text-accent"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy link"
              className="text-muted hover:text-accent"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faLink} size="lg" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
