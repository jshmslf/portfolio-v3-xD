import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/lib/profile";
import { hireMeNotificationEmail, hireMeConfirmationEmail } from "@/lib/email-templates";
import { getRequestIpHash } from "@/lib/likes";
import { canSendHireMeEmail } from "@/lib/hire-me-rate-limit";
import { getLeadReplySettings } from "@/lib/lead-reply-settings";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const { error: leadError } = await supabaseAdmin.from("leads").insert({ name, email, message });

  if (leadError) {
    console.error("Failed to save hire-me lead:", leadError.message);
  }

  const ipHash = await getRequestIpHash();
  const allowed = await canSendHireMeEmail(ipHash);
  if (!allowed) {
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const notification = hireMeNotificationEmail({ name, email, message });

  const { error } = await resend.emails.send({
    from,
    to: profile.email,
    replyTo: email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const replySettings = await getLeadReplySettings();
  const confirmation = hireMeConfirmationEmail({ name, ...replySettings });
  const { error: confirmationError } = await resend.emails.send({
    from,
    to: email,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
  });

  if (confirmationError) {
    console.error("Failed to send hire-me confirmation email:", confirmationError.message);
  }

  return NextResponse.json({ ok: true });
}
