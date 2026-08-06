"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export function LikeButton({
  postId,
  initialLiked,
  initialCount,
}: {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (liked) return;
    setError(null);
    setLiked(true);
    setCount((prev) => prev + 1);

    try {
      const res = await fetch(`/api/blog/${postId}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setCount(data.likesCount);
    } catch {
      setLiked(false);
      setCount((prev) => prev - 1);
      setError("Failed to like this post. Please try again.");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={liked}
        aria-pressed={liked}
        className={`flex items-center gap-2 border px-3 py-1.5 text-sm font-medium transition-colors ${
          liked
            ? "border-accent bg-accent/10 text-accent"
            : "border-border text-muted hover:border-accent hover:text-accent"
        }`}
        style={{ borderRadius: "var(--radius)" }}
      >
        <FontAwesomeIcon icon={faHeart} />
        {count}
      </button>
      {error && <span className="text-xs text-muted">{error}</span>}
    </div>
  );
}
