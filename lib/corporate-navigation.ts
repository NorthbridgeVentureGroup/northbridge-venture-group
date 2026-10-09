import { SITE_ORIGIN } from "@/lib/seo";
import {
  isCorporateMarketingHost,
  normalizeHostname,
} from "@/lib/subdomain-routing";

/**
 * Absolute corporate-origin URL for a site path.
 * Safe on apex and required on suite/product-marketing hosts so Header/Footer
 * never keep visitors on a marketing subdomain for corporate IA.
 */
export function corporateOriginHref(path = "/"): string {
  const normalized =
    path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${normalized}`;
}

/**
 * Resolve a corporate site path for Header/Footer links.
 * - Marketing hosts (suite / product-marketing): always absolute corporate origin.
 * - Corporate apex / unknown: relative path (same-site).
 *
 * Prefer `corporateOriginHref` in shared Header/Footer so SSR and client match
 * and marketing-host visitors always leave for corporate IA.
 */
export function resolveCorporateNavHref(
  path: string,
  host?: string | null,
): string {
  const normalized =
    path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;

  if (host == null) {
    // SSR / shared chrome: absolute corporate origin is correct everywhere and
    // prevents suite/product-marketing hosts from trapping corporate nav.
    return corporateOriginHref(normalized);
  }

  if (isCorporateMarketingHost(host) || isLikelyNeedsAbsolute(host)) {
    return corporateOriginHref(normalized);
  }

  return normalized;
}

function isLikelyNeedsAbsolute(host: string): boolean {
  // Defensive: any non-apex NVG host should leave for corporate IA via absolute links.
  const hostname = normalizeHostname(host);
  if (!hostname) return false;
  if (
    hostname === "northbridgeventuregroup.com" ||
    hostname === "www.northbridgeventuregroup.com"
  ) {
    return false;
  }
  return hostname.endsWith(".northbridgeventuregroup.com");
}

/** Browser helper for client components — reads window.location when available. */
export function resolveCorporateNavHrefFromWindow(path: string): string {
  if (typeof window === "undefined") {
    return corporateOriginHref(path);
  }
  return resolveCorporateNavHref(path, window.location.host);
}
