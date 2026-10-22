"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const numberFormat = new Intl.NumberFormat("en-US");

// The home page mounts two copies (sidebar and mobile footer), and client
// navigations remount them, so the visit is sent once per page load and
// every copy reads the same answer.
let visit: Promise<number | null> | undefined;

function recordVisit() {
  visit ??= fetch("/api/visitors", { method: "POST" })
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { total: number } | null) => data?.total ?? null)
    .catch(() => null);
  return visit;
}

/** "1,234 visitors" — hidden until the count is known (migration 015). */
export function VisitorCount({ initialTotal }: { initialTotal: number | null }) {
  const [total, setTotal] = useState(initialTotal);

  useEffect(() => {
    let active = true;
    recordVisit().then((latest) => {
      // The cached page can lag behind; never show a smaller number.
      if (active && latest !== null) setTotal((current) => Math.max(current ?? 0, latest));
    });
    return () => {
      active = false;
    };
  }, []);

  if (total === null) return null;

  return (
    <p className="flex items-center gap-1.5 text-xs text-muted">
      <FontAwesomeIcon icon={faEye} className="text-accent" />
      {numberFormat.format(total)} {total === 1 ? "visitor" : "visitors"}
    </p>
  );
}
