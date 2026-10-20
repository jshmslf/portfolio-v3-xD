// Name, role, tagline, address, about, and SEO description are CMS-managed:
// see `getSiteProfile()` / `DEFAULT_SITE_PROFILE` in `lib/site-profile.ts`.
export const siteConfig = {
  yearsExperience: "2+ years",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ??
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ??
    "http://localhost:3000",
  seoKeywords: [
    "Bayambang",
    "Pangasinan",
    "Pangasinan State University",
    "Software Engineer Philippines",
  ],
  services: [
    "Web Development Tutoring",
    "Mobile App Development",
    "Python Scripting",
    "Student Mentoring",
  ],
  techStack: [
    { name: "TypeScript", icon: "typescript" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "Git", icon: "git" },
    { name: "Figma", icon: "figma" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type TechStackItem = (typeof siteConfig)["techStack"][number];
