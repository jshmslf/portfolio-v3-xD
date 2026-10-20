import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getSiteProfile, type SiteProfile } from "@/lib/site-profile";

function buildDefaultTitle(profile: SiteProfile) {
  return `${profile.name} | ${profile.role}`;
}

function buildBaseOpenGraph(profile: SiteProfile) {
  return {
    siteName: profile.name,
    locale: "en_US",
  } as const;
}

// Metadata merges shallowly, so any page that sets `openGraph` replaces the
// layout's object entirely. Pages spread this to keep the shared fields.
export async function getBaseOpenGraph() {
  return buildBaseOpenGraph(await getSiteProfile());
}

export async function getSiteMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile();
  const defaultTitle = buildDefaultTitle(profile);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: defaultTitle,
      template: `%s | ${profile.name}`,
    },
    description: profile.seoDescription,
    applicationName: profile.name,
    keywords: [
      profile.name,
      profile.role,
      ...siteConfig.techStack.map((tech) => tech.name),
      ...siteConfig.services,
      ...siteConfig.seoKeywords,
    ],
    authors: [{ name: profile.name, url: siteConfig.url }],
    creator: profile.name,
    publisher: profile.name,
    openGraph: {
      ...buildBaseOpenGraph(profile),
      type: "website",
      title: defaultTitle,
      description: profile.seoDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: profile.seoDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/**
 * Per-page metadata with a self-referencing canonical URL and matching
 * Open Graph / Twitter fields. Omit `title` for the home page.
 */
export async function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Promise<Metadata> {
  const profile = await getSiteProfile();
  const defaultTitle = buildDefaultTitle(profile);
  const fullTitle = title ? `${title} | ${profile.name}` : defaultTitle;
  // A page that sets `openGraph` stops inheriting the root opengraph-image
  // file, so point at it explicitly. Segments with their own image file still
  // override this.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: defaultTitle }];

  return {
    title: title ?? { absolute: defaultTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      ...buildBaseOpenGraph(profile),
      type: "website",
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}
