import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function MapPlaceholder() {
  return (
    <div
      className="relative h-28 w-full overflow-hidden border border-border bg-background"
      style={{ borderRadius: "var(--radius)" }}
    >
      <svg
        viewBox="0 0 240 112"
        className="absolute inset-0 h-full w-full text-border"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="30" x2="240" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="0" y1="70" x2="240" y2="80" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="0" x2="30" y2="112" stroke="currentColor" strokeWidth="2" />
        <line x1="160" y1="0" x2="175" y2="112" stroke="currentColor" strokeWidth="2" />
        <line x1="100" y1="0" x2="100" y2="112" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <FontAwesomeIcon icon={faLocationDot} className="text-2xl text-accent" />
      </div>
    </div>
  );
}
