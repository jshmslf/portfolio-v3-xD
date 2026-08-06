"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type SubmitTestimonialInput = {
  fullName: string;
  position: string;
  company: string;
  rating: number;
  message: string;
  anonymous: boolean;
};

export async function submitTestimonial(token: string, input: SubmitTestimonialInput) {
  const { data: invite, error: inviteError } = await supabaseAdmin
    .from("testimonial_invites")
    .select("id, expires_at, used_at")
    .eq("token", token)
    .single();

  if (inviteError || !invite) throw new Error("This link is no longer valid.");
  if (invite.used_at) throw new Error("This link has already been used.");
  if (new Date(invite.expires_at).getTime() < Date.now()) {
    throw new Error("This link has expired.");
  }

  const { error: insertError } = await supabaseAdmin.from("testimonials").insert({
    invite_id: invite.id,
    full_name: input.fullName,
    position: input.position || null,
    company: input.company || null,
    rating: input.rating,
    message: input.message,
    anonymous: input.anonymous,
  });

  if (insertError) throw new Error("Failed to submit your testimonial. Please try again.");

  await supabaseAdmin
    .from("testimonial_invites")
    .update({ used_at: new Date().toISOString() })
    .eq("id", invite.id);
}
