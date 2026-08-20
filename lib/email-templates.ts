const ACCENT = "#ef4444";
const BACKGROUND = "#f4f4f5";
const SURFACE = "#ffffff";
const BORDER = "#e4e4e7";
const TEXT = "#18181b";
const MUTED = "#71717a";

function layout(content: string) {
  return `
    <div style="background:${BACKGROUND};padding:32px 16px;font-family:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
      <div style="max-width:480px;margin:0 auto;background:${SURFACE};border:1px solid ${BORDER};border-radius:4px;padding:32px;box-shadow:0 1px 2px rgba(0,0,0,0.04);">
        <div style="width:36px;height:4px;background:${ACCENT};border-radius:1px;margin-bottom:24px;"></div>
        ${content}
      </div>
    </div>
  `;
}

function stripHtml(html: string): string {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").trim();
}

export function hireMeNotificationEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return {
    subject: `New hire-me inquiry from ${name}`,
    html: layout(`
      <h1 style="margin:0 0 16px;color:${TEXT};font-size:20px;">New Hire Me Inquiry</h1>
      <p style="margin:0 0 4px;color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">From</p>
      <p style="margin:0 0 16px;color:${TEXT};font-size:15px;">${name} &lt;${email}&gt;</p>
      <p style="margin:0 0 4px;color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
      <p style="margin:0;color:${TEXT};font-size:15px;line-height:1.6;white-space:pre-wrap;">${message}</p>
    `),
    text: `New hire-me inquiry from ${name} <${email}>\n\n${message}`,
  };
}

export function hireMeConfirmationEmail({
  name,
  subject,
  heading,
  bodyHtml,
  signoffHtml,
}: {
  name: string;
  subject: string;
  heading: string;
  bodyHtml: string;
  signoffHtml: string;
}) {
  const fill = (s: string) => s.replaceAll("{{name}}", name);
  const filledHeading = fill(heading);
  const filledBody = fill(bodyHtml);
  const filledSignoff = fill(signoffHtml);

  return {
    subject: fill(subject),
    html: layout(`
      <h1 style="margin:0 0 16px;color:${TEXT};font-size:20px;">${filledHeading}</h1>
      <div style="margin:0 0 12px;color:${TEXT};font-size:15px;line-height:1.6;">${filledBody}</div>
      <div style="margin:0;color:${MUTED};font-size:14px;line-height:1.6;">${filledSignoff}</div>
    `),
    text: `${filledHeading}\n\n${stripHtml(filledBody)}\n\n${stripHtml(filledSignoff)}`,
  };
}
