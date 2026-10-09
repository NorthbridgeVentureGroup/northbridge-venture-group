import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  analyticsLocation,
  analyticsPagePath,
  DESIGNATED_HOSTS,
  GA_MEASUREMENT_ID,
  installAnalyticsEventGate,
  installPageViewGuard,
  isBlockedAnalyticsPush,
  isDesignatedAnalyticsHost,
  sanitizeAnalyticsParams,
  sanitizeCollectUrl,
  shouldSendPageView,
} from "./ga4-policy";

const root = join(__dirname, "../..");

describe("NVG GA4 policy", () => {
  it("uses only the Venture Group measurement id", () => {
    expect(GA_MEASUREMENT_ID).toBe("G-GR4VGJBV1L");
    expect(GA_MEASUREMENT_ID).not.toBe("G-LQ99HX72LY");
  });

  it("loads only on the production host", () => {
    expect([...DESIGNATED_HOSTS]).toEqual([
      "northbridgeventuregroup.com",
      "www.northbridgeventuregroup.com",
    ]);
    expect(isDesignatedAnalyticsHost("northbridgeventuregroup.com")).toBe(true);
    expect(isDesignatedAnalyticsHost("www.northbridgeventuregroup.com")).toBe(true);
    expect(isDesignatedAnalyticsHost("dreduardosuarez.com")).toBe(false);
    expect(isDesignatedAnalyticsHost("northbridge-venture-group.vercel.app")).toBe(false);
    expect(isDesignatedAnalyticsHost("localhost")).toBe(false);
  });

  it("drops the automatic history page view and keeps a later manual one", () => {
    const recorded: unknown[] = [];
    const target = {
      dataLayer: [] as unknown[],
      gtag(...args: unknown[]) {
        recorded.push(args);
        this.dataLayer.push(args);
      },
      history: {
        pushState() {
          target.gtag("event", "page_view", { page_path: "/auto" });
          target.dataLayer.push({ event: "page_view" });
        },
        replaceState() {
          return undefined;
        },
      },
      guarded: false,
    };
    installPageViewGuard(target);
    target.history.pushState();
    expect(recorded).toEqual([]);
    target.gtag("event", "page_view", { page_path: "/privacy" });
    expect(recorded).toEqual([["event", "page_view", { page_path: "/privacy" }]]);
  });

  it("collapses duplicate page views and drops query strings", () => {
    expect(shouldSendPageView(null, "/", 1_000)).toBe(true);
    expect(shouldSendPageView({ path: "/", at: 1_000 }, "/", 1_200)).toBe(false);
    expect(shouldSendPageView({ path: "/", at: 1_000 }, "/privacy", 1_200)).toBe(true);
    expect(analyticsPagePath("/contact?email=person@example.com")).toBe("/contact");
    expect(analyticsPagePath("/privacy#rights")).toBe("/privacy");
  });

  it("drops contact fields and conversation text", () => {
    expect(
      sanitizeAnalyticsParams({
        location: "hero",
        card: "digital",
        name: "Ana",
        email: "ana@example.com",
        message: "Please call me about a private matter",
        entryPath: "GENERAL",
      }),
    ).toEqual({ location: "hero", card: "digital", entryPath: "GENERAL" });
  });

  it("keeps one manual page view and drops history, form, and query strings", () => {
    const dataLayer: unknown[] = [];
    installAnalyticsEventGate(dataLayer);
    dataLayer.push({
      event: "gtm.historyChange-v2",
      "gtm.oldUrl": "https://northbridgeventuregroup.com/?email=person@example.com",
    });
    dataLayer.push({ event: "gtm.formSubmit", message: "private note" });
    dataLayer.push(["event", "page_view", { page_path: "/auto" }]);
    dataLayer.push([
      "event",
      "page_view",
      {
        manual_page_view: true,
        page_path: "/privacy",
        page_location: "https://northbridgeventuregroup.com/privacy?email=person@example.com",
        page_referrer: "https://northbridgeventuregroup.com/?email=person@example.com",
      },
    ]);
    expect(dataLayer).toHaveLength(1);
    const params = (dataLayer[0] as [string, string, Record<string, string>])[2];
    expect(params.manual_page_view).toBeUndefined();
    expect(params.page_location).toBe("https://northbridgeventuregroup.com/privacy");
    expect(params.page_referrer).toBe("https://northbridgeventuregroup.com/");
    expect(isBlockedAnalyticsPush(["event", "contact_submit", { location: "footer" }])).toBe(false);
    expect(analyticsLocation("https://northbridgeventuregroup.com/contact?email=a@b.com")).toBe(
      "https://northbridgeventuregroup.com/contact",
    );
    const clean = new URL(
      sanitizeCollectUrl(
        "https://www.google-analytics.com/g/collect?tid=G-GR4VGJBV1L&dl=https%3A%2F%2Fnorthbridgeventuregroup.com%2Fprivacy&dr=https%3A%2F%2Fnorthbridgeventuregroup.com%2F%3Femail%3Dperson%40example.com&ep.email=person@example.com",
      ),
    );
    expect(clean.searchParams.get("tid")).toBe("G-GR4VGJBV1L");
    expect(clean.searchParams.get("dr")).toBe("https://northbridgeventuregroup.com/");
    expect(clean.searchParams.get("ep.email")).toBeNull();
  });

  it("keeps the Google tag gated and leaves SEO files unchanged in spirit", () => {
    const ga = readFileSync(join(root, "components/analytics/GaScripts.tsx"), "utf8");
    const events = readFileSync(join(root, "lib/nordy/analytics.ts"), "utf8");
    const robots = readFileSync(join(root, "app/robots.ts"), "utf8");
    const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
    expect(ga).toMatch(/send_page_view: false/);
    expect(ga).toMatch(/id="ga4-src"/);
    expect(ga).toMatch(/GA_MEASUREMENT_ID/);
    expect(ga).toMatch(/ad_user_data: 'denied'/);
    expect(ga).toMatch(/installAnalyticsEventGate/);
    expect(ga).not.toMatch(/G-LQ99HX72LY/);
    expect(events).toMatch(/forwardAnalyticsEvent/);
    expect(events).toMatch(/homepage_view/);
    expect(robots).toMatch(/allow: "\/"/);
    expect(layout).toMatch(/index: true/);
    expect(layout).not.toMatch(/noindex/);
  });
});
