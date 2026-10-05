import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { BreadcrumbItem } from "@/lib/seo/schema";

export function PageHeader({
  title,
  description,
  breadcrumbs,
}: {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <header>
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl leading-relaxed text-foreground/80">{description}</p>
      )}
    </header>
  );
}
