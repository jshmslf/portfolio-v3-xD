import { cache } from "react";
import { supabase } from "@/lib/supabase/server";

export const DEFAULT_AVATAR_URL =
  "https://res.cloudinary.com/dtdvmhtzh/image/upload/v1785783476/v3pfp_kfikxq.webp";

export type SiteProfile = {
  name: string;
  role: string;
  tagline: string;
  address: string;
  about: string[];
  seoDescription: string;
  avatarUrl: string;
};

/**
 * Hard-coded profile used whenever the CMS-managed `profile` row is missing,
 * a column is empty, or the query fails. Also the source for values that must
 * be static strings (e.g. Open Graph image `alt` exports).
 */
export const DEFAULT_SITE_PROFILE: SiteProfile = {
  name: "Joshua Verceles",
  role: "Software Engineer & Graphic Artist",
  tagline: "I make ideas clickable.",
  address: "Bayambang, Pangasinan, PH",
  about: [
    "I'm a software engineer and Computer Science graduate of Pangasinan State University, based in Bayambang, Pangasinan, Philippines. I enjoy turning ambiguous problems into simple, reliable products, with a focus on full-stack web development.",
    "Alongside my regular work, I offer educational services, helping students with their web-related projects, including mobile apps, Python scripts, websites, and other web solutions.",
  ],
  seoDescription:
    "Joshua Verceles is a Software Engineer and Computer Science graduate of Pangasinan State University, based in Bayambang, Pangasinan, Philippines, building web and mobile solutions.",
  avatarUrl: DEFAULT_AVATAR_URL,
};

type ProfileRow = {
  avatar_url: string | null;
  name: string | null;
  role: string | null;
  tagline: string | null;
  location: string | null;
  about: string[] | null;
  seo_description: string | null;
};

function textOr(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export const getSiteProfile = cache(async (): Promise<SiteProfile> => {
  const { data, error } = await supabase
    .from("profile")
    .select("avatar_url, name, role, tagline, location, about, seo_description")
    .eq("id", 1)
    .maybeSingle<ProfileRow>();

  if (error || !data) {
    // The newer columns may not exist yet; still honour the avatar if we can.
    if (error) {
      const { data: avatarRow } = await supabase
        .from("profile")
        .select("avatar_url")
        .eq("id", 1)
        .maybeSingle<Pick<ProfileRow, "avatar_url">>();

      return {
        ...DEFAULT_SITE_PROFILE,
        avatarUrl: textOr(avatarRow?.avatar_url, DEFAULT_SITE_PROFILE.avatarUrl),
      };
    }
    return DEFAULT_SITE_PROFILE;
  }

  const about = Array.isArray(data.about)
    ? data.about.map((paragraph) => paragraph?.trim() ?? "").filter(Boolean)
    : [];

  return {
    name: textOr(data.name, DEFAULT_SITE_PROFILE.name),
    role: textOr(data.role, DEFAULT_SITE_PROFILE.role),
    tagline: textOr(data.tagline, DEFAULT_SITE_PROFILE.tagline),
    address: textOr(data.location, DEFAULT_SITE_PROFILE.address),
    about: about.length > 0 ? about : DEFAULT_SITE_PROFILE.about,
    seoDescription: textOr(data.seo_description, DEFAULT_SITE_PROFILE.seoDescription),
    avatarUrl: textOr(data.avatar_url, DEFAULT_SITE_PROFILE.avatarUrl),
  };
});
