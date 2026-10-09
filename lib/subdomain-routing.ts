import { SITE_ORIGIN } from "@/lib/seo";

/**
 * Domain ownership classes for the corporate website.
 *
 * DIRECT_PRODUCT = NVG subdomain owned by a product Vercel project — corporate
 * router must not rewrite or claim it (fall through completely).
 */
export type DomainOwnershipClass =
  | "CORPORATE_ROOT"
  | "SUITE_MARKETING"
  | "PRODUCT_MARKETING"
  | "DIRECT_PRODUCT";

export type DomainRegistryEntry = {
  host: string;
  ownership: DomainOwnershipClass;
  /** Internal path rewritten when pathname is `/`. Null = no rewrite. */
  internalPath: string | null;
  notes?: string;
};

/**
 * Explicit ownership registry.
 *
 * - Suite hosts + aviatornetwork. (PRODUCT_MARKETING) → corporate rewrites
 * - naerox. / quadrix. / npc. → DIRECT_PRODUCT — never rewritten by this repo
 * - Aviator production app lives at https://aviatornetwork.com (external origin)
 */
export const DOMAIN_REGISTRY: DomainRegistryEntry[] = [
  {
    host: "northbridgeventuregroup.com",
    ownership: "CORPORATE_ROOT",
    internalPath: null,
  },
  {
    host: "www.northbridgeventuregroup.com",
    ownership: "CORPORATE_ROOT",
    internalPath: null,
  },
  {
    host: "aviation.northbridgeventuregroup.com",
    ownership: "SUITE_MARKETING",
    internalPath: "/suite/aviation",
  },
  {
    host: "games.northbridgeventuregroup.com",
    ownership: "SUITE_MARKETING",
    internalPath: "/suite/games",
  },
  {
    host: "logistics.northbridgeventuregroup.com",
    ownership: "SUITE_MARKETING",
    internalPath: "/suite/logistics",
  },
  {
    host: "digital.northbridgeventuregroup.com",
    ownership: "SUITE_MARKETING",
    internalPath: "/suite/digital",
  },
  {
    host: "ventures.northbridgeventuregroup.com",
    ownership: "SUITE_MARKETING",
    internalPath: "/suite/ventures",
  },
  {
    host: "aviatornetwork.northbridgeventuregroup.com",
    ownership: "PRODUCT_MARKETING",
    internalPath: "/products/aviator-network",
    notes: "Corporate marketing/detail page — NOT the production app.",
  },
  {
    host: "naerox.northbridgeventuregroup.com",
    ownership: "DIRECT_PRODUCT",
    internalPath: null,
    notes: "Actual Naerox product project — corporate router must not claim.",
  },
  {
    host: "quadrix.northbridgeventuregroup.com",
    ownership: "DIRECT_PRODUCT",
    internalPath: null,
    notes: "Actual Quadrix product project — corporate router must not claim.",
  },
  {
    host: "npc.northbridgeventuregroup.com",
    ownership: "DIRECT_PRODUCT",
    internalPath: null,
    notes: "Actual NPC product project — corporate router must not claim.",
  },
];

/** Suite/category host → internal path (derived from registry). */
export const SUITE_HOST_ROUTES: Record<string, string> = Object.fromEntries(
  DOMAIN_REGISTRY.filter((e) => e.ownership === "SUITE_MARKETING" && e.internalPath).map(
    (e) => [e.host, e.internalPath as string],
  ),
);

/** Product-marketing hosts owned by this corporate repo (not live product apps). */
export const PRODUCT_MARKETING_HOST_ROUTES: Record<string, string> = Object.fromEntries(
  DOMAIN_REGISTRY.filter((e) => e.ownership === "PRODUCT_MARKETING" && e.internalPath).map(
    (e) => [e.host, e.internalPath as string],
  ),
);

/** All corporate-owned marketing hosts that rewrite at `/`. */
export const MARKETING_HOST_ROUTES: Record<string, string> = {
  ...SUITE_HOST_ROUTES,
  ...PRODUCT_MARKETING_HOST_ROUTES,
};

/** Direct product hosts — fall through; never appear in MARKETING_HOST_ROUTES. */
export const DIRECT_PRODUCT_HOSTS: readonly string[] = DOMAIN_REGISTRY.filter(
  (e) => e.ownership === "DIRECT_PRODUCT",
).map((e) => e.host);

/**
 * External / direct product origin URLs used by marketing CTAs.
 * Naerox/Quadrix/NPC run on their NVG product hosts; Aviator production is apex .com.
 */
export const EXTERNAL_PRODUCT_ORIGINS = {
  aviatorNetwork: "https://aviatornetwork.com",
  naerox: "https://naerox.northbridgeventuregroup.com",
  quadrix: "https://quadrix.northbridgeventuregroup.com",
  npc: "https://npc.northbridgeventuregroup.com",
} as const;

/**
 * Historical / stale NVG labels — must never be marketing-rewritten.
 * Public copy uses Naerox only; aerox./noe. are not public brands.
 */
export const HISTORICAL_UNCLAIMED_HOSTS = [
  "aerox.northbridgeventuregroup.com",
  "noe.northbridgeventuregroup.com",
] as const;

/** All hosts the corporate router must refuse to rewrite. */
export const UNCLAIMED_NVG_SUBDOMAINS = [
  ...DIRECT_PRODUCT_HOSTS,
  ...HISTORICAL_UNCLAIMED_HOSTS,
] as const;

/** @deprecated Prefer UNCLAIMED_NVG_SUBDOMAINS / DIRECT_PRODUCT_HOSTS. */
export const PRODUCT_HOSTS = UNCLAIMED_NVG_SUBDOMAINS;

export function normalizeHostname(host: string | null): string {
  if (!host) return "";
  return host.split(":")[0].trim().toLowerCase();
}

export function getDomainEntry(host: string | null): DomainRegistryEntry | undefined {
  const hostname = normalizeHostname(host);
  return DOMAIN_REGISTRY.find((entry) => entry.host === hostname);
}

/**
 * Resolve a corporate marketing host root request to an internal path.
 * Covers SUITE_MARKETING + PRODUCT_MARKETING only.
 * DIRECT_PRODUCT hosts (naerox/quadrix/npc) always return null.
 */
export function resolveMarketingRoute(host: string | null, pathname: string): string | null {
  if (pathname !== "/") return null;
  const hostname = normalizeHostname(host);
  if (!hostname) return null;
  return MARKETING_HOST_ROUTES[hostname] ?? null;
}

/** @deprecated Prefer resolveMarketingRoute. */
export function resolveSuiteRoute(host: string | null, pathname: string): string | null {
  return resolveMarketingRoute(host, pathname);
}

export function isSuiteHost(host: string | null): boolean {
  return getDomainEntry(host)?.ownership === "SUITE_MARKETING";
}

export function isProductMarketingHost(host: string | null): boolean {
  return getDomainEntry(host)?.ownership === "PRODUCT_MARKETING";
}

export function isDirectProductHost(host: string | null): boolean {
  return getDomainEntry(host)?.ownership === "DIRECT_PRODUCT";
}

/** Suite or product-marketing host owned by the corporate project. */
export function isCorporateMarketingHost(host: string | null): boolean {
  const ownership = getDomainEntry(host)?.ownership;
  return ownership === "SUITE_MARKETING" || ownership === "PRODUCT_MARKETING";
}

export function isCorporateRootHost(host: string | null): boolean {
  return getDomainEntry(host)?.ownership === "CORPORATE_ROOT";
}

/** Absolute corporate URL for nav/CTAs when the browser is on a marketing subdomain. */
export function corporateAbsoluteUrl(path = "/"): string {
  const normalized =
    path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${normalized}`;
}
