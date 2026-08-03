import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${profile.name} | ${siteConfig.role}`,
    template: `%s | ${profile.name}`,
  },
  description: siteConfig.seoDescription,
  keywords: [
    profile.name,
    siteConfig.role,
    ...siteConfig.techStack.map((tech) => tech.name),
    ...siteConfig.services,
    ...siteConfig.seoKeywords,
  ],
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${profile.name} | ${siteConfig.role}`,
    description: siteConfig.seoDescription,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${siteConfig.role}`,
    description: siteConfig.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
