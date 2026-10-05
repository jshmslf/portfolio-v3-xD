import { siteConfig } from "@/lib/site-config";
import { profile, getProfileAvatarUrl } from "@/lib/profile";
import { getSocialLinks } from "@/lib/social-links";
import { experience } from "@/lib/experience";
import { excerptFromContent, type BlogPost } from "@/lib/blog";

const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export async function getPersonSchema() {
  const [socialLinks, avatarUrl] = await Promise.all([
    getSocialLinks(),
    getProfileAvatarUrl(),
  ]);
  const currentRole = experience[0];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    jobTitle: siteConfig.role,
    description: siteConfig.seoDescription,
    url: siteConfig.url,
    image: avatarUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bayambang",
      addressRegion: "Pangasinan",
      addressCountry: "PH",
    },
    worksFor: {
      "@type": "Organization",
      name: currentRole.org,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Pangasinan State University",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      about: "Computer Science",
    },
    knowsAbout: [
      ...siteConfig.techStack.map((tech) => tech.name),
      ...siteConfig.services,
    ],
    sameAs: socialLinks
      .map((link) => link.href)
      .filter((href) => href.startsWith("http")),
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    // Google's search-result "site name" comes from these (homepage only).
    name: profile.name,
    alternateName: [`${profile.name} Portfolio`, "jshmslf"],
    url: siteConfig.url,
    description: siteConfig.seoDescription,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function getBlogPostingSchema(post: BlogPost) {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || excerptFromContent(post.content),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    ...(post.publishedAt && {
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
    }),
    author: { "@id": PERSON_ID, "@type": "Person", name: profile.name, url: siteConfig.url },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
