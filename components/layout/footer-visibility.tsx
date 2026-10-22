"use client";

import { usePathname } from "next/navigation";

// On the home page the credits sit at the bottom of the sidebar, which only
// exists from lg up, so the footer is only needed below that.
export function FooterVisibility({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  return <div className={isHome ? "lg:hidden" : undefined}>{children}</div>;
}
