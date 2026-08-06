import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/lib/profile";
import { getSocialIcon } from "@/lib/icons";
import { getSocialLinks } from "@/lib/social-links";

export async function Contact() {
  const socialLinks = await getSocialLinks();

  return (
    <section id="contact" className="pb-12">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
        Contact
      </h2>
      <p className="mt-4 leading-relaxed text-foreground/80">
        Have a project in mind or just want to say hello? My inbox is open.
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-6 inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
        style={{ borderRadius: "var(--radius)" }}
      >
        <FontAwesomeIcon icon={faEnvelope} />
        {profile.email}
      </a>
      <div className="mt-8 flex flex-wrap gap-5">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-muted transition-colors hover:text-accent"
          >
            <FontAwesomeIcon icon={getSocialIcon(link.iconKey)} size="lg" />
          </a>
        ))}
      </div>
    </section>
  );
}
