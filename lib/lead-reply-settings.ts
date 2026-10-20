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

export const DEFAULT_NOTIFY_EMAIL = "jshmslf@gmail.com";

/**
 * Where new hire-me leads are sent. Queried separately from
 * `getLeadReplySettings` so a missing `notify_email` column only affects this
 * lookup (and falls back to the default).
 */
export async function getLeadNotifyEmail(): Promise<string> {
  const { data, error } = await supabaseAdmin
    .from("lead_reply_settings")
    .select("notify_email")
    .eq("id", 1)
    .maybeSingle();

  const notifyEmail = typeof data?.notify_email === "string" ? data.notify_email.trim() : "";
  if (error || !notifyEmail) return DEFAULT_NOTIFY_EMAIL;
  return notifyEmail;
}
