import { getSiteProfile } from "@/lib/site-profile";
import { Container } from "@/components/ui/container";

export async function Footer() {
  const profile = await getSiteProfile();
  const year = new Date().getFullYear();

  return (
    // Extra bottom room on phones keeps the line clear of the floating theme
    // button once the page is scrolled to the end.
    <footer className="pt-4 pb-20 sm:py-4">
      <Container>
        <p className="text-center text-sm text-muted">
          © {year} {profile.name}. Made with {"<3"}
        </p>
      </Container>
    </footer>
  );
}
