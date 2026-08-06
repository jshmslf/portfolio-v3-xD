import { supabase } from "@/lib/supabase/server";

export type BlogListItem = { html: string; indent: 0 | 1 };

export type BlogBlock =
  | { type: "paragraph"; html: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; style: "bulleted" | "numbered"; items: BlogListItem[] }
  | { type: "quote"; html: string };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  content: BlogBlock[];
  publishedAt: string | null;
  likesCount: number;
};

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  seo_title: string | null;
  seo_description: string | null;
  content: BlogBlock[];
  published_at: string | null;
  likes_count: number;
};

const SELECT_COLUMNS =
  "id, slug, title, seo_title, seo_description, content, published_at, likes_count";

function mapRow(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    content: row.content,
    publishedAt: row.published_at,
    likesCount: row.likes_count,
  };
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select(SELECT_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (data ?? []).map(mapRow);
}

export async function searchPublishedBlogPosts(query: string): Promise<BlogPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select(SELECT_COLUMNS)
    .eq("status", "published")
    .ilike("title", `%${query}%`)
    .order("published_at", { ascending: false });

  return (data ?? []).map(mapRow);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select(SELECT_COLUMNS)
    .eq("status", "published")
    .eq("slug", slug)
    .single();

  return data ? mapRow(data) : null;
}

export function excerptFromContent(content: BlogBlock[], maxLength = 160): string {
  const paragraph = content.find((block) => block.type === "paragraph");
  if (!paragraph) return "";

  const text = stripHtml(paragraph.html);
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
}

const WORDS_PER_MINUTE = 200;

function stripHtml(html: string | undefined): string {
  return html ? html.replace(/<[^>]+>/g, " ") : "";
}

function textOf(block: BlogBlock): string {
  switch (block.type) {
    case "paragraph":
    case "quote":
      return stripHtml(block.html);
    case "heading":
      return block.text ?? "";
    case "list":
      return (block.items ?? []).map((item) => stripHtml(item.html)).join(" ");
  }
}

export function computeReadingMinutes(content: BlogBlock[]): number {
  const wordCount = content
    .map(textOf)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
