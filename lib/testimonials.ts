import { supabase } from "@/lib/supabase/server";

export type Testimonial = {
  id: string;
  fullName: string;
  position: string | null;
  company: string | null;
  rating: number;
  message: string;
  anonymous: boolean;
};

type TestimonialRow = {
  id: string;
  full_name: string;
  position: string | null;
  company: string | null;
  rating: number;
  message: string;
  anonymous: boolean;
};

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from("testimonials")
    .select("id, full_name, position, company, rating, message, anonymous")
    .eq("status", "approved")
    .order("approved_at", { ascending: false });

  return ((data as TestimonialRow[]) ?? []).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    position: row.position,
    company: row.company,
    rating: row.rating,
    message: row.message,
    anonymous: row.anonymous,
  }));
}

const MAX_MASK_STARS = 3;

function maskWord(word: string): string {
  const stars = "*".repeat(Math.min(word.length - 1, MAX_MASK_STARS));
  return `${word.charAt(0).toUpperCase()}${stars}`;
}

export function displayName(testimonial: Testimonial): string {
  if (!testimonial.anonymous) return testimonial.fullName;
  return testimonial.fullName.split(/\s+/).filter(Boolean).map(maskWord).join(" ");
}
