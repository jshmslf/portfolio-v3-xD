import { cache } from "react";
import { DEFAULT_AVATAR_URL, getSiteProfile } from "@/lib/site-profile";

// Profile data now lives in `lib/site-profile.ts` (CMS-managed, with
// hard-coded fallbacks in `DEFAULT_SITE_PROFILE`). Kept for existing imports.
export { DEFAULT_AVATAR_URL };

export const getProfileAvatarUrl = cache(async (): Promise<string> => {
  const { avatarUrl } = await getSiteProfile();
  return avatarUrl;
});
