import { supabase } from "@/lib/supabase/server";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  iconKey: string;
};

type SocialLinkRow = {
  id: string;
  label: string;
  href: string;
  icon_key: string;
};

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data } = await supabase
    .from("social_links")
    .select("id, label, href, icon_key")
    .order("sort_order", { ascending: true });

  return ((data as SocialLinkRow[]) ?? []).map((row) => ({
    id: row.id,
    label: row.label,
    href: row.href,
    iconKey: row.icon_key,
  }));
}
