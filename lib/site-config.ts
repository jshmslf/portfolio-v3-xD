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
} as const;

export type SiteConfig = typeof siteConfig;
export type TechStackItem = (typeof siteConfig)["techStack"][number];
