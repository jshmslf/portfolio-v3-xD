import { supabase } from "@/lib/supabase/server";
import type { TechCategoryId } from "@/lib/tech-categories";

export type TechStackItem = {
  id: string;
  name: string;
  iconSlug: string;
  category: TechCategoryId;
  featured: boolean;
};

type TechStackRow = {
  id: string;
  name: string;
  icon_slug: string;
  category: TechCategoryId;
  featured: boolean;
};

export async function getTechStack(): Promise<TechStackItem[]> {
  const { data } = await supabase
    .from("tech_stack")
    .select("id, name, icon_slug, category, featured")
    .order("sort_order", { ascending: true });

  return ((data as TechStackRow[]) ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    iconSlug: row.icon_slug,
    category: row.category,
    featured: row.featured,
  }));
}
