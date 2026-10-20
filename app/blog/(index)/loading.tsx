import { Container } from "@/components/ui/container";
import { BlogCardSkeleton, LoadingShell, PageHeaderSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <LoadingShell label="blog posts">
      <Container>
        <PageHeaderSkeleton />
        <div className="mt-10 grid max-w-3xl gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </LoadingShell>
  );
}
