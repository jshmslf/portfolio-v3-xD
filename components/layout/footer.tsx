import { profile } from "@/lib/profile";
import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-4">
      <Container>
        <p className="text-center text-sm text-muted">
          © {year} {profile.name}. Made with {"<3"}
        </p>
      </Container>
    </footer>
  );
}
