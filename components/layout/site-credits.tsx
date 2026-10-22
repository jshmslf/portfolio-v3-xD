import { VisitorCount } from "@/components/layout/visitor-count";

/** Visitor count over the copyright line; shared by the footer and sidebar. */
export function SiteCredits({
  name,
  visitorTotal,
  className = "",
}: {
  name: string;
  visitorTotal: number | null;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <VisitorCount initialTotal={visitorTotal} />
      <p className="text-xs text-muted">
        © {new Date().getFullYear()} {name}. Made with {"<3"}
      </p>
    </div>
  );
}
