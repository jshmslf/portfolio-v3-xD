import { Container } from "@/components/ui/container";
import {
  LoadingShell,
  PageHeaderSkeleton,
  SectionHeaderSkeleton,
  TechItemSkeleton,
} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <LoadingShell label="tech stack">
      <Container>
        <PageHeaderSkeleton />
        <div className="mt-10 flex flex-col gap-10">
          {[8, 6, 4].map((count, i) => (
            <div key={i}>
              <SectionHeaderSkeleton />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: count }, (_, j) => (
                  <TechItemSkeleton key={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </LoadingShell>
  );
}
