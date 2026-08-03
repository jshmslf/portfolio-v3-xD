export const siteConfig = {
  role: "Software Engineer",
  tagline:
    "I build reliable web and mobile solutions, and help students bring their own projects to life.",
  location: "Remote",
  yearsExperience: "2+ years",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  about: [
    "I'm a software engineer and Computer Science graduate of Pangasinan State University, based in Bayambang, Pangasinan, Philippines. I enjoy turning ambiguous problems into simple, reliable products, with a focus on full-stack web development.",
    "Alongside my regular work, I offer educational services, helping students with their web-related projects, including mobile apps, Python scripts, websites, and other web solutions.",
  ],
  seoDescription:
    "Joshua Verceles is a Software Engineer and Computer Science graduate of Pangasinan State University, based in Bayambang, Pangasinan, Philippines, building web and mobile solutions.",
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
  projects: [
    {
      title: "Project One",
      description:
        "A short description of a project you shipped, the problem it solved, and the impact it had.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      href: "https://example.com",
      featured: true,
    },
    {
      title: "Project Two",
      description:
        "Another placeholder project. Swap this for something you're proud of, with a link to the live site or repo.",
      tags: ["React", "Node.js"],
      href: "https://example.com",
      featured: true,
    },
    {
      title: "Project Three",
      description:
        "A third example project slot. Three to six projects is usually a good number for a portfolio.",
      tags: ["Tailwind CSS", "Figma"],
      href: "https://example.com",
      featured: true,
    },
    {
      title: "Project Four",
      description:
        "A fourth placeholder project, only shown on the full projects page, not the homepage teaser.",
      tags: ["Next.js", "Node.js"],
      href: "https://example.com",
      featured: false,
    },
    {
      title: "Project Five",
      description:
        "A fifth placeholder project slot, swap for real work once you have it ready.",
      tags: ["TypeScript", "PostgreSQL"],
      href: "https://example.com",
      featured: false,
    },
    {
      title: "Project Six",
      description:
        "A sixth placeholder project slot rounding out the full projects page.",
      tags: ["React", "Tailwind CSS"],
      href: "https://example.com",
      featured: false,
    },
  ],
  blogPosts: [
    {
      title: "A placeholder post about something you learned",
      date: "2026-01-12",
      excerpt:
        "A short excerpt summarizing the post. Replace this with real writing once you start publishing.",
    },
    {
      title: "Notes on a project you shipped",
      date: "2025-11-03",
      excerpt:
        "Another placeholder excerpt. Good blog posts here can double as case studies for your projects.",
    },
    {
      title: "Something you think about often",
      date: "2025-08-22",
      excerpt:
        "A third placeholder excerpt, swap for a real post title, date, and summary.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type Project = (typeof siteConfig)["projects"][number];
export type BlogPost = (typeof siteConfig)["blogPosts"][number];
export type TechStackItem = (typeof siteConfig)["techStack"][number];
