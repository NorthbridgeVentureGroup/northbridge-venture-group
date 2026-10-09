"use client";

import Link from "next/link";
import { corporateOriginHref } from "@/lib/corporate-navigation";
import type { PublicNavLink } from "@/lib/public-navigation";

type PublicNavLinksProps = {
  links: PublicNavLink[];
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
  listClassName?: string;
  /** When true, emit absolute corporate-origin hrefs (suite/product-marketing safe). */
  preferCorporateOrigin?: boolean;
};

export default function PublicNavLinks({
  links,
  onNavigate,
  className,
  linkClassName = "text-sm font-medium text-silver transition-colors hover:text-white",
  listClassName = "flex items-center gap-5 lg:gap-6",
  preferCorporateOrigin = false,
}: PublicNavLinksProps) {
  return (
    <nav aria-label="Public website" className={className}>
      <ul className={listClassName}>
        {links.map((link) => {
          const href = preferCorporateOrigin
            ? corporateOriginHref(link.href)
            : link.href;

          if (preferCorporateOrigin || href.startsWith("http")) {
            return (
              <li key={`${link.href}-${link.label}`}>
                <a href={href} onClick={onNavigate} className={linkClassName}>
                  {link.label}
                </a>
              </li>
            );
          }

          return (
            <li key={`${link.href}-${link.label}`}>
              <Link href={href} onClick={onNavigate} className={linkClassName}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
