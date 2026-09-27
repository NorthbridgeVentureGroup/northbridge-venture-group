import { SITE_ORIGIN } from "@/lib/seo";

/** Recommended public-demo hostname (Fly/Railway Node; APP_SURFACE=public-demo). */
export const DEFAULT_NOE_DEMO_URL = "https://noe.northbridgeventuregroup.com/";

export const NOE_PILOT_MAILTO =
  "mailto:hello@northbridgeventuregroup.com?subject=NOE%2090-day%20pilot%20request";

/**
 * Absolute CTA href for the NOE public demo landing (`/`).
 * Prefer `NEXT_PUBLIC_NOE_DEMO_URL` for interim hosts; falls back to branded subdomain.
 */
export function noeDemoHref(utmContent: string): string {
  const raw = process.env.NEXT_PUBLIC_NOE_DEMO_URL?.trim() || DEFAULT_NOE_DEMO_URL;
  const url = new URL(raw, SITE_ORIGIN);
  url.searchParams.set("utm_source", "nvg");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "noe_try_demo");
  url.searchParams.set("utm_content", utmContent);
  return url.toString();
}
