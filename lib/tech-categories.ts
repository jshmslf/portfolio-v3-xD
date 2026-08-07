import { supabase } from "@/lib/supabase/server";

export type TechCategoryId = string;

export type TechCategory = { id: string; label: string };

export async function getTechCategories(): Promise<TechCategory[]> {
  const { data } = await supabase
    .from("tech_categories")
    .select("id, label")
    .order("sort_order", { ascending: true });

  return data ?? [];
}
