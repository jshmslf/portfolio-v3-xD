import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";
import { getBlogPostBySlug, computeReadingMinutes } from "@/lib/blog";
import { formatPostDate } from "@/lib/format";
import { getOgAvatarUrl } from "@/lib/og";

const AVATAR_SIZE = 56;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = `Blog post by ${profile.name}`;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, avatarUrl] = await Promise.all([
    getBlogPostBySlug(slug),
    getOgAvatarUrl(AVATAR_SIZE * 2),
  ]);

  const title = post?.title ?? "Blog";
  const meta = post
    ? [
        post.publishedAt ? formatPostDate(post.publishedAt) : null,
        `${computeReadingMinutes(post.content)} min read`,
      ]
        .filter(Boolean)
        .join("  ·  ")
    : siteConfig.role;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 12, background: "#ff1e2d" }} />
          <div style={{ fontSize: 28, color: "#a3a3a3", letterSpacing: 4 }}>BLOG</div>
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? 56 : 68,
            fontWeight: 600,
            color: "#f5f5f5",
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#f5f5f5" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt=""
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: 999,
                objectFit: "cover",
                border: "2px solid #2a2a2a",
              }}
            />
            {profile.name}
          </div>
          <div style={{ color: "#a3a3a3" }}>{meta}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
