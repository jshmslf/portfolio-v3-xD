import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel = "View all",
}: {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          {viewAllLabel}
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      )}
    </div>
  );
}
