import {
  analyticsLocation,
  analyticsPagePath,
  CONSENT_COOKIE,
  GA_MEASUREMENT_ID,
  installAnalyticsEventGate,
  installPageViewGuard,
  isDesignatedAnalyticsHost,
  sanitizeAnalyticsParams,
  sanitizeCollectUrl,
  shouldSendPageView,
} from "@/lib/analytics/ga4-policy";

export {
  analyticsLocation,
  analyticsPagePath,
  CONSENT_COOKIE,
  GA_MEASUREMENT_ID,
  installAnalyticsEventGate,
  isDesignatedAnalyticsHost,
  sanitizeAnalyticsParams,
  sanitizeCollectUrl,
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __nvgGaConfigured?: boolean;
    __nvgCollectGuard?: boolean;
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

function bodyHasContactData(data: BodyInit | null | undefined): boolean {
  if (typeof data === "string") return /@|%40/i.test(data);
  if (typeof URLSearchParams !== "undefined" && data instanceof URLSearchParams) {
    return /@|%40/i.test(data.toString());
  }
  return false;
}

export function installCollectGuard(): void {
  if (typeof window === "undefined" || window.__nvgCollectGuard) return;
  window.__nvgCollectGuard = true;

  const beacon = navigator.sendBeacon?.bind(navigator);
  if (beacon) {
    navigator.sendBeacon = (url: string | URL, data?: BodyInit | null) => {
      if (bodyHasContactData(data)) return true;
      return beacon(sanitizeCollectUrl(String(url)), data);
    };
  }

  const origFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    if (bodyHasContactData(init?.body)) return Promise.resolve(new Response(null, { status: 204 }));
    if (typeof input === "string" || input instanceof URL) {
      return origFetch(sanitizeCollectUrl(String(input)), init);
    }
    return origFetch(input, init);
  };

  const imageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  if (imageSrc?.get && imageSrc?.set) {
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      configurable: true,
      enumerable: imageSrc.enumerable,
      get() {
        return imageSrc.get!.call(this);
      },
      set(value: string) {
        imageSrc.set!.call(this, sanitizeCollectUrl(String(value)));
      },
    });
  }
}

/** Call after gtag.js loads, so this wrapper sits outside the library's history hook. */
export function armPageViewGuard(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  installAnalyticsEventGate(window.dataLayer, "outer");
  installCollectGuard();
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
  const referrer = document.referrer ? analyticsLocation(document.referrer) : "";
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    ...(referrer ? { page_referrer: referrer } : {}),
    send_to: GA_MEASUREMENT_ID,
    manual_page_view: true,
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
