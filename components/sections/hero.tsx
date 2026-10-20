import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/container";
import { HireMeButton } from "@/components/layout/hire-me-button";
import { StatusDot } from "@/components/ui/status-dot";
import { HeroStage } from "@/components/sections/hero-stage";
import { getSiteProfile } from "@/lib/site-profile";

// Staggers the intro entrance; read by `.motion-enter` in globals.css.
function enterDelay(delayMs: number) {
  return { "--enter-delay": `${delayMs}ms` } as React.CSSProperties;
}

export async function Hero() {
  const profile = await getSiteProfile();

  return (
    <HeroStage
      backdrop={
        <>
          <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px] sm:left-1/3"
          />
        </>
      }
    >
      <Container className="pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-10 sm:text-left">
          <Image
            src={profile.avatarUrl}
            alt={`Portrait of ${profile.name}`}
            width={176}
            height={176}
            sizes="(min-width: 640px) 176px, 144px"
            className="motion-pop h-36 w-36 shrink-0 border border-border object-cover shadow-2xl shadow-accent/10 sm:h-44 sm:w-44"
            style={{ borderRadius: "var(--radius)" }}
            priority
          />
          <div className="flex flex-col items-center sm:items-start">
            <p
              className="motion-enter inline-flex items-center gap-2 border border-border bg-surface/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
              style={{ borderRadius: "var(--radius)", ...enterDelay(120) }}
            >
              <StatusDot />
              Open to work
              <span aria-hidden="true" className="text-border">|</span>
              <FontAwesomeIcon icon={faLocationDot} className="text-accent" />
              {profile.address}
            </p>
            <h1
              className="motion-enter mt-5 text-4xl font-semibold tracking-tight sm:text-6xl"
              style={enterDelay(200)}
            >
              {profile.name}
              <span className="mt-2 block text-lg font-normal tracking-normal text-muted sm:text-2xl">
                {profile.role}
              </span>
            </h1>
            <p
              className="motion-enter mt-4 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg"
              style={enterDelay(280)}
            >
              {profile.tagline}
            </p>
            <div
              className="motion-enter mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
              style={enterDelay(360)}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                style={{ borderRadius: "var(--radius)" }}
              >
                View projects
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
              <HireMeButton variant="secondary" className="px-5 py-2.5 text-sm">
                Get in touch
              </HireMeButton>
            </div>
          </div>
        </div>
      </Container>
    </HeroStage>
  );
}
