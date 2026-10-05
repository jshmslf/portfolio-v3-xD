import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";

/** Visible breadcrumb trail plus its matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={getBreadcrumbSchema(items)} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex min-w-0 items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="truncate text-foreground/80">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-accent-text">
                    {item.name}
                  </Link>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    aria-hidden="true"
                    className="text-[0.625rem] text-border"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
