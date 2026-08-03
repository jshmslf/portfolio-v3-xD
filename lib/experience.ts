export const experience = [
  {
    role: "Backend Web Developer",
    org: "Midfield Enterprises",
    period: "2026 - Present",
    description:
      "Led the redesign of the core product dashboard, cutting load time by 40% and improving retention.",
  },
  {
    role: "Software Engineer",
    org: "Mayon Capital",
    period: "2025 - 2026",
    description:
      "Built and maintained customer-facing features across a React and Node.js stack, working closely with design and product.",
  },
  {
    role: "System Developer Intern",
    org: "Provincial Engineering Office of Pangasinan",
    period: "2025 - 2025",
    description:
      "Started my career building internal tools and learning the fundamentals of shipping production software.",
  },
  {
    role: "BS Computer Science",
    org: "Pangasinan State University",
    period: "2021 - 2025",
    description:
      "Started my career building internal tools and learning the fundamentals of shipping production software.",
  },
  {
    role: "Hello, World!",
    org: "My first line of code",
    period: "2018",
    description:
      "Started my career building internal tools and learning the fundamentals of shipping production software.",
  },
] as const;

export type ExperienceItem = (typeof experience)[number];
