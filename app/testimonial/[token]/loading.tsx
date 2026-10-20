import { Container } from "@/components/ui/container";
import { LoadingShell, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <LoadingShell label="invite" className="flex-1 py-20">
      <Container className="max-w-xl">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
        <div className="mt-8 flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </Container>
    </LoadingShell>
  );
}
