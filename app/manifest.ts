import type { MetadataRoute } from "next";
import { getSiteProfile } from "@/lib/site-profile";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const profile = await getSiteProfile();

  return {
    name: `${profile.name} | ${profile.role}`,
    short_name: profile.name.split(" ")[0],
    description: profile.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon.png", type: "image/png", sizes: "any" }],
  };
}
