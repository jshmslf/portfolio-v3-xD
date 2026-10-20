import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { DEFAULT_SITE_PROFILE, getSiteProfile } from "@/lib/site-profile";
import { getOgAvatarUrl } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Must be a static string; the CMS name/role are only used in the image itself.
export const alt = `${DEFAULT_SITE_PROFILE.name}, ${DEFAULT_SITE_PROFILE.role}`;

// Pick up a new avatar from the CMS without a redeploy.
export const revalidate = 3600;

const PHOTO_SIZE = 360;

export default async function Image() {
  const [avatarUrl, profile] = await Promise.all([
    getOgAvatarUrl(PHOTO_SIZE * 2),
    getSiteProfile(),
  ]);
  const host = new URL(siteConfig.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 96px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 18% 30%, rgba(255, 30, 45, 0.28), transparent 45%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt=""
          width={PHOTO_SIZE}
          height={PHOTO_SIZE}
          style={{
            width: PHOTO_SIZE,
            height: PHOTO_SIZE,
            objectFit: "cover",
            borderRadius: 28,
            border: "2px solid #2a2a2a",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ width: 64, height: 10, background: "#ff1e2d", marginBottom: 36 }} />
          <div style={{ fontSize: 68, fontWeight: 600, color: "#f5f5f5", lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 32, color: "#a3a3a3", marginTop: 18, lineHeight: 1.3 }}>
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 36,
              padding: "10px 20px",
              border: "1px solid #2a2a2a",
              borderRadius: 999,
              background: "#161616",
              color: "#d4d4d4",
              fontSize: 24,
              alignSelf: "flex-start",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
            Open to work
          </div>
          <div style={{ fontSize: 24, color: "#6b6b6b", marginTop: 40 }}>{host}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
