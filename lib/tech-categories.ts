export const TECH_CATEGORIES = [
  { id: "frontend", label: "Front-end" },
  { id: "backend", label: "Back-end" },
  { id: "devtools", label: "Dev Tools" },
  { id: "ai-ml", label: "AI & Machine Learning" },
  { id: "devops-cloud", label: "DevOps & Cloud" },
] as const;

export type TechCategoryId = (typeof TECH_CATEGORIES)[number]["id"];
