import { Container } from "@/components/ui/container";
import { LoadingShell, PageHeaderSkeleton, ProjectCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <LoadingShell label="projects">
      <Container>
        <PageHeaderSkeleton />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </LoadingShell>
  );
}
