import { Container } from "@/components/ui/container";
import { TestimonialForm } from "@/components/sections/testimonial-form";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function isInviteValid(token: string): Promise<boolean> {
  const { data: invite } = await supabaseAdmin
    .from("testimonial_invites")
    .select("expires_at, used_at")
    .eq("token", token)
    .single();

  if (!invite) return false;
  if (invite.used_at) return false;
  return new Date(invite.expires_at).getTime() >= Date.now();
}

export default async function TestimonialInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const valid = await isInviteValid(token);

  return (
    <main className="flex-1 py-20">
      <Container className="max-w-xl">
        {valid ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">
              Share your experience
            </h1>
            <p className="mt-2 text-muted">
              I&apos;d appreciate a few words about working together.
            </p>
            <div className="mt-8">
              <TestimonialForm token={token} />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">
              This link is no longer valid
            </h1>
            <p className="mt-2 text-muted">
              It may have expired or already been used. Please reach out for a new one.
            </p>
          </>
        )}
      </Container>
    </main>
  );
}
