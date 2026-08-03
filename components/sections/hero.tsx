import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div
            className="flex h-36 w-36 shrink-0 items-center justify-center border border-border bg-surface text-3xl text-muted"
            style={{ borderRadius: "var(--radius)" }}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg text-muted sm:text-xl">{siteConfig.role}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
              {siteConfig.tagline}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
