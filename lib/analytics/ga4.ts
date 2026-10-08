import {
  analyticsPagePath,
  CONSENT_COOKIE,
  GA_MEASUREMENT_ID,
  installPageViewGuard,
  isDesignatedAnalyticsHost,
  sanitizeAnalyticsParams,
  shouldSendPageView,
} from "@/lib/analytics/ga4-policy";

export {
  analyticsPagePath,
  CONSENT_COOKIE,
  GA_MEASUREMENT_ID,
  isDesignatedAnalyticsHost,
  sanitizeAnalyticsParams,
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __nvgGaConfigured?: boolean;
  }
}

let lastPageView: { path: string; at: number } | null = null;
let lastForwarded: { key: string; at: number } | null = null;

export function hasAnalyticsConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").includes(`${CONSENT_COOKIE}=granted`);
}

/** The Google tag stays unloaded until the production host and visitor consent both match. */
export function analyticsCollectionEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (!isDesignatedAnalyticsHost(window.location.hostname)) return false;
  return hasAnalyticsConsent();
}

function writeConsent(value: "granted" | "denied"): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=15552000; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event("nvg-analytics-consent"));
}

export function grantAnalyticsConsent(): void {
  writeConsent("granted");
}

export function denyAnalyticsConsent(): void {
  writeConsent("denied");
}

/** Call after gtag.js loads, so this wrapper sits outside the library's history hook. */
export function armPageViewGuard(): void {
  if (typeof window === "undefined" || !window.dataLayer) return;
  const browser = window as Window & { __nvgHistoryGuard?: boolean };
  installPageViewGuard({
    dataLayer: window.dataLayer,
    get gtag() {
      return browser.gtag;
    },
    set gtag(next) {
      browser.gtag = next;
    },
    history: window.history,
    get guarded() {
      return browser.__nvgHistoryGuard === true;
    },
    set guarded(value) {
      browser.__nvgHistoryGuard = value;
    },
  });
}

/** Returns false until gtag exists, so the caller can retry without a second hit. */
export function sendPageView(pagePath: string): boolean {
  if (!analyticsCollectionEnabled()) return false;
  if (typeof window.gtag !== "function") return false;
  const path = analyticsPagePath(pagePath);
  const now = Date.now();
  if (!shouldSendPageView(lastPageView, path, now)) return true;
  window.gtag("event", "page_view", {
    page_path: path,
    send_to: GA_MEASUREMENT_ID,
  });
  lastPageView = { path, at: now };
  return true;
}

/**
 * Forwards an existing first-party event after consent.
 * `homepage_view` is not forwarded: the Google tag already sends one page_view.
 * Events that happened before consent are not replayed.
 */
export function forwardAnalyticsEvent(
  name: string,
  payload?: Record<string, unknown>,
): void {
  if (name === "homepage_view") return;
  if (!analyticsCollectionEnabled()) return;
  if (typeof window.gtag !== "function") return;
  const params = sanitizeAnalyticsParams(payload);
  const key = `${name}:${JSON.stringify(params)}`;
  const now = Date.now();
  if (lastForwarded && lastForwarded.key === key && now - lastForwarded.at < 1500) return;
  window.gtag("event", name, { ...params, send_to: GA_MEASUREMENT_ID });
  lastForwarded = { key, at: now };
}
