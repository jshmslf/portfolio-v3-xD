import { supabase } from "@/lib/supabase/server";
import type { BlogBlock } from "@/lib/blog";

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  content: BlogBlock[];
  thumbnailUrl: string | null;
  liveUrl: string | null;
  isLive: boolean;
  techStackIds: string[];
  featured: boolean;
};

type ProjectRow = {
  id: string;
  title: string;
  short_description: string;
  content: BlogBlock[];
  thumbnail_url: string | null;
  live_url: string | null;
  is_live: boolean;
  tech_stack_ids: string[];
  featured: boolean;
};

const SELECT_COLUMNS =
  "id, title, short_description, content, thumbnail_url, live_url, is_live, tech_stack_ids, featured";

function mapRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    shortDescription: row.short_description,
    content: row.content,
    thumbnailUrl: row.thumbnail_url,
    liveUrl: row.live_url,
    isLive: row.is_live,
    techStackIds: row.tech_stack_ids,
    featured: row.featured,
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from("projects")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  return ((data as ProjectRow[]) ?? []).map(mapRow);
}
