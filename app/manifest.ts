import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} | ${siteConfig.role}`,
    short_name: profile.name.split(" ")[0],
    description: siteConfig.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon.png", type: "image/png", sizes: "any" }],
  };
}
