import { IntroLoader } from "@/components/ui/intro-loader";
import { LoadingShell } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <LoadingShell label="portfolio" className="flex min-h-svh flex-1 items-center justify-center">
      <IntroLoader />
    </LoadingShell>
  );
}
