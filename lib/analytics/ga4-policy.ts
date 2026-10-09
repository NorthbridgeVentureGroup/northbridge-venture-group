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

type HistoryMethod = "pushState" | "replaceState";

type GuardTarget = {
  dataLayer: unknown[];
  gtag?: (...args: unknown[]) => void;
  history: Pick<History, HistoryMethod>;
  guarded?: boolean;
};

const BLOCKED_GTM_EVENT = /historyChange|formSubmit|formInteract|formCancel|interactedFormField|user_data/i;

type PushItem = {
  0?: unknown;
  1?: unknown;
  2?: {
    manual_page_view?: boolean;
    user_data?: unknown;
    page_location?: string;
    page_referrer?: string;
  };
  event?: string;
};

/** Automatic history page views keep the previous query string. Manual views opt in. */
export function isBlockedAnalyticsPush(item: unknown): boolean {
  if (!item || typeof item !== "object") return false;
  const command = item as PushItem;
  if (command[0] === "event" && command[1] === "page_view") {
    return command[2]?.manual_page_view !== true;
  }
  if (command[0] === "set" && command[1] === "user_data") return true;
  if (command[0] === "event" && command[2]?.user_data) return true;
  const eventName = typeof command.event === "string" ? command.event : "";
  if (BLOCKED_GTM_EVENT.test(eventName)) return true;
  if (eventName === "page_view") return true;
  return false;
}

export function analyticsLocation(value: string): string {
  const text = String(value || "");
  try {
    const url = new URL(text);
    return `${url.origin}${url.pathname}`;
  } catch {
    const path = text.split("?")[0]?.split("#")[0] || "/";
    return path.startsWith("/") ? path : "/";
  }
}

export function installAnalyticsEventGate(dataLayer: unknown[], position: "inner" | "outer" = "inner"): void {
  const layer = dataLayer as unknown[] & { __nbAnalyticsGate?: string };
  if (!layer) return;
  if (position === "outer") {
    if (layer.__nbAnalyticsGate === "outer") return;
  } else if (layer.__nbAnalyticsGate) {
    return;
  }
  const realPush = dataLayer.push.bind(dataLayer);
  dataLayer.push = (...args: unknown[]) => {
    const item = args[0] as PushItem | undefined;
    if (isBlockedAnalyticsPush(item)) return dataLayer.length;
    const params = item?.[2];
    const manual = params?.manual_page_view === true;
    if (manual && params) {
      if (typeof params.page_location === "string") {
        params.page_location = analyticsLocation(params.page_location);
      }
      if (typeof params.page_referrer === "string") {
        params.page_referrer = analyticsLocation(params.page_referrer);
      }
    }
    const result = realPush(...args);
    if (manual && params) delete params.manual_page_view;
    return result;
  };
  layer.__nbAnalyticsGate = position;
}

export function sanitizeCollectUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  if (!/(^|\.)google-analytics\.com$|(^|\.)analytics\.google\.com$|(^|\.)googletagmanager\.com$/.test(url.hostname)) {
    return raw;
  }
  for (const key of ["dl", "dr"]) {
    const value = url.searchParams.get(key);
    if (!value) continue;
    url.searchParams.set(key, analyticsLocation(value));
  }
  for (const key of [...url.searchParams.keys()]) {
    if (/email|phone|user_data/i.test(key)) url.searchParams.delete(key);
    const value = url.searchParams.get(key);
    if (value && /@|%40/i.test(value)) url.searchParams.delete(key);
  }
  return url.toString();
}

/**
 * GA4's script also emits a page_view when the app changes history.
 * This guard drops those automatic hits. The site sends one sanitized page_view itself.
 */
export function installPageViewGuard(target: GuardTarget): void {
  if (target.guarded) return;
  target.guarded = true;
  installAnalyticsEventGate(target.dataLayer);

  const wrap = (method: HistoryMethod) => {
    const original = target.history[method].bind(target.history) as (...args: unknown[]) => unknown;
    target.history[method] = ((...args: unknown[]) => {
      const realGtag = target.gtag;
      target.gtag = () => undefined;
      try {
        return original(...args);
      } finally {
        target.gtag = realGtag;
      }
    }) as History[HistoryMethod];
  };

  wrap("pushState");
  wrap("replaceState");
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
