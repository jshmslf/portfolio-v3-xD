import { getProfileAvatarUrl } from "@/lib/profile";

/**
 * Avatar URL usable inside `ImageResponse`. Satori can't decode WebP (the
 * CMS uploads avatars as .webp), so for Cloudinary URLs ask for a face-cropped
 * square PNG at the requested size. Other hosts are passed through as-is.
 */
export async function getOgAvatarUrl(size: number): Promise<string> {
  const url = await getProfileAvatarUrl();
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/c_fill,g_face,w_${size},h_${size},f_png/`);
}
