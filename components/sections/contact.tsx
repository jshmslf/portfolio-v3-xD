import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBriefcase, faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import { getSocialIcon } from "@/lib/icons";
import { getSocialLinks } from "@/lib/social-links";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusDot } from "@/components/ui/status-dot";

const HIGHLIGHTS = [
  { icon: faClock, text: "Replies within 1–2 days" },
  { icon: faBriefcase, text: "Freelance projects & full-time roles" },
  { icon: faEarthAsia, text: "Based in the Philippines, working remotely" },
];

export async function Contact() {
  const socialLinks = await getSocialLinks();

  return (
    <section className="pb-12">
      <SectionHeader title="Contact" />
      <div
        className="relative mt-6 overflow-hidden border border-border bg-surface"
        style={{ borderRadius: "var(--radius)" }}
      >
        {/* Accent hairline + corner glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <div className="flex flex-col">
            <p
              className="inline-flex w-fit items-center gap-2 border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted"
              style={{ borderRadius: "var(--radius)" }}
            >
              <StatusDot />
              Open to work
            </p>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
              Let&apos;s build something together
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/80">
              Have a project, a role, or just an idea? Send a message and I&apos;ll get
              back to you.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background/60 text-accent"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-xs" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            {socialLinks.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-8">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={link.label}
                      className="flex h-10 w-10 items-center justify-center border border-border bg-background/60 text-muted transition-colors hover:border-accent hover:text-accent"
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      <FontAwesomeIcon icon={getSocialIcon(link.iconKey)} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="border border-border bg-background p-5 sm:p-6"
            style={{ borderRadius: "var(--radius)" }}
          >
            <ContactForm layout="split" />
          </div>
        </div>
      </div>
    </section>
  );
}
