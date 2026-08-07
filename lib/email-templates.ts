const ACCENT = "#ef4444";
const BACKGROUND = "#0a0a0a";
const SURFACE = "#141414";
const BORDER = "#262626";
const TEXT = "#f5f5f5";
const MUTED = "#a3a3a3";

function layout(content: string) {
  return `
    <div style="background:${BACKGROUND};padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:480px;margin:0 auto;background:${SURFACE};border:1px solid ${BORDER};border-radius:12px;padding:32px;">
        <div style="width:36px;height:4px;background:${ACCENT};border-radius:2px;margin-bottom:24px;"></div>
        ${content}
      </div>
    </div>
  `;
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

export function hireMeConfirmationEmail({ name }: { name: string }) {
  return {
    subject: "Thanks for reaching out",
    html: layout(`
      <h1 style="margin:0 0 16px;color:${TEXT};font-size:20px;">Thanks, ${name}!</h1>
      <p style="margin:0 0 12px;color:${TEXT};font-size:15px;line-height:1.6;">
        I've received your message and will get back to you within 24 hours.
      </p>
      <p style="margin:0;color:${MUTED};font-size:14px;line-height:1.6;">
        Talk soon,<br/>Joshua
      </p>
    `),
    text: `Thanks, ${name}! I've received your message and will get back to you within 24 hours.\n\nTalk soon,\nJoshua`,
  };
}
