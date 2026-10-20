import { cache } from "react";
import { supabase } from "@/lib/supabase/server";

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  description: string;
};

/** Used when the CMS-managed `experience` table is missing, empty, or errors. */
export const DEFAULT_EXPERIENCE: ExperienceItem[] = [
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
];

/** Ordered timeline; the first item is the current role. */
export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  const { data, error } = await supabase
    .from("experience")
    .select("role, org, period, description")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return DEFAULT_EXPERIENCE;

  return data.map((row) => ({
    role: row.role ?? "",
    org: row.org ?? "",
    period: row.period ?? "",
    description: row.description ?? "",
  }));
});
