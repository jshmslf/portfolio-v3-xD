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
      <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-text">
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent-text"
        >
          {viewAllLabel}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
