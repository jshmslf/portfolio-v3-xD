import { cache } from "react";
import { supabase } from "@/lib/supabase/server";

export type Company = {
  name: string;
  logoUrl: string;
  alt: string;
  websiteUrl: string | null;
};

/**
 * Visible companies for the logo carousel, in CMS order. No built-in
 * defaults: the section is hidden when the `companies` table is missing,
 * empty or errors, rather than showing logos that aren't real.
 */
export const getCompanies = cache(async (): Promise<Company[]> => {
  const { data, error } = await supabase
    .from("companies")
    .select("name, logo_url, alt, website_url")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  return data
    .filter((row) => row.name && row.logo_url)
    .map((row) => ({
      name: row.name,
      logoUrl: row.logo_url,
      alt: row.alt?.trim() || `${row.name} logo`,
      websiteUrl: row.website_url || null,
    }));
});
