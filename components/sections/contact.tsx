import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSocialIcon } from "@/lib/icons";
import { getSocialLinks } from "@/lib/social-links";
import { ContactFormButton } from "@/components/sections/contact-form-button";

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
      <ContactFormButton />
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
