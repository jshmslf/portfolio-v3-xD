import { getSiteProfile } from "@/lib/site-profile";
import { getVisitorTotal } from "@/lib/visitors";
import { Container } from "@/components/ui/container";
import { SiteCredits } from "@/components/layout/site-credits";

export async function Footer() {
  const [profile, visitorTotal] = await Promise.all([getSiteProfile(), getVisitorTotal()]);

  return (
    // Extra bottom room on phones keeps the lines clear of the floating theme
    // button once the page is scrolled to the end. Hidden from lg up on pages
    // whose sidebar already shows the credits (see globals.css).
    <footer className="pt-4 pb-20 sm:py-4" data-site-footer>
      <Container>
        <SiteCredits name={profile.name} visitorTotal={visitorTotal} className="items-center" />
      </Container>
    </footer>
  );
}
