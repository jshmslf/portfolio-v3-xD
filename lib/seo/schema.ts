import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: siteConfig.role,
  description: siteConfig.seoDescription,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  email: profile.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bayambang",
    addressRegion: "Pangasinan",
    addressCountry: "PH",
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
  sameAs: profile.social.map((link) => link.href),
};
