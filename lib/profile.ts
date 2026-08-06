import { supabase } from "@/lib/supabase/server";

export const DEFAULT_AVATAR_URL =
  "https://res.cloudinary.com/dtdvmhtzh/image/upload/v1785783476/v3pfp_kfikxq.webp";

export const profile = {
  name: "Joshua Verceles",
  address: "Bayambang, Pangasinan, PH",
  email: "jshmslf@gmail.com",
} as const;

export type Profile = typeof profile;

export async function getProfileAvatarUrl(): Promise<string> {
  const { data } = await supabase
    .from("profile")
    .select("avatar_url")
    .eq("id", 1)
    .single();

  return data?.avatar_url ?? DEFAULT_AVATAR_URL;
}
