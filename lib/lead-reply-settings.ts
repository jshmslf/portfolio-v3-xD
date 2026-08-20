import { supabaseAdmin } from "@/lib/supabase/admin";

export const DEFAULT_REPLY_SETTINGS = {
  subject: "Thanks for reaching out",
  heading: "Thanks, {{name}}!",
  bodyHtml: "<p>I've received your message and will get back to you within 24 hours.</p>",
  signoffHtml: "Talk soon,<br/>Joshua",
};

export async function getLeadReplySettings() {
  const { data } = await supabaseAdmin
    .from("lead_reply_settings")
    .select("subject, heading, body_html, signoff_html")
    .eq("id", 1)
    .maybeSingle();

  if (!data) return DEFAULT_REPLY_SETTINGS;

  return {
    subject: data.subject,
    heading: data.heading,
    bodyHtml: data.body_html,
    signoffHtml: data.signoff_html,
  };
}
