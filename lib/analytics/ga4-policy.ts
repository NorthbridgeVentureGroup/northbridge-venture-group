/** GA4 rules for northbridgeventuregroup.com. Contact and conversation text never leave this module. */

export const GA_MEASUREMENT_ID = "G-GR4VGJBV1L";

export const CONSENT_COOKIE = "nvg_analytics_consent";

export const DESIGNATED_HOSTS = [
  "northbridgeventuregroup.com",
  "www.northbridgeventuregroup.com",
] as const;

const ALLOWED_PARAMS = new Set(["entryPath", "location", "card", "gapClass", "fit", "division"]);

const SAFE_TOKEN = /^[a-z0-9_-]{1,40}$/i;

export function isDesignatedAnalyticsHost(hostname: string | null | undefined): boolean {
  return (DESIGNATED_HOSTS as readonly string[]).includes(String(hostname || "").toLowerCase());
}

export function shouldSendPageView(
  last: { path: string; at: number } | null | undefined,
  pagePath: string,
  now: number,
  windowMs = 1500,
): boolean {
  if (!last) return true;
  if (last.path !== pagePath) return true;
  return now - last.at >= windowMs;
}

/** Query strings stay off the hit. They can carry contact details. */
export function analyticsPagePath(input: string): string {
  const path = input.split("?")[0]?.split("#")[0] || "/";
  if (!path.startsWith("/") || path.includes("@") || /\s/.test(path)) return "/";
  return path.slice(0, 300);
}

export function sanitizeAnalyticsParams(
  payload: Record<string, unknown> = {},
): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (!ALLOWED_PARAMS.has(key)) continue;
    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
      continue;
    }
    const text = String(value).trim();
    if (!SAFE_TOKEN.test(text)) continue;
    clean[key] = text;
  }
  return clean;
}
