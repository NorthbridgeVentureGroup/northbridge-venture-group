import { describe, expect, it } from "vitest";
import {
  DIRECT_PRODUCT_HOSTS,
  DOMAIN_REGISTRY,
  EXTERNAL_PRODUCT_ORIGINS,
  getDomainEntry,
  isCorporateMarketingHost,
  isDirectProductHost,
  isProductMarketingHost,
  isSuiteHost,
  MARKETING_HOST_ROUTES,
  normalizeHostname,
  resolveMarketingRoute,
  resolveSuiteRoute,
  SUITE_HOST_ROUTES,
  UNCLAIMED_NVG_SUBDOMAINS,
} from "@/lib/subdomain-routing";

describe("domain ownership registry", () => {
  it("classifies corporate, suite, Aviator product-marketing, and direct products", () => {
    expect(getDomainEntry("northbridgeventuregroup.com")?.ownership).toBe(
      "CORPORATE_ROOT",
    );
    expect(getDomainEntry("aviation.northbridgeventuregroup.com")?.ownership).toBe(
      "SUITE_MARKETING",
    );
    expect(
      getDomainEntry("aviatornetwork.northbridgeventuregroup.com")?.ownership,
    ).toBe("PRODUCT_MARKETING");
    expect(getDomainEntry("naerox.northbridgeventuregroup.com")?.ownership).toBe(
      "DIRECT_PRODUCT",
    );
    expect(getDomainEntry("quadrix.northbridgeventuregroup.com")?.ownership).toBe(
      "DIRECT_PRODUCT",
    );
    expect(getDomainEntry("npc.northbridgeventuregroup.com")?.ownership).toBe(
      "DIRECT_PRODUCT",
    );
  });

  it("never puts direct-product hosts in marketing rewrite routes", () => {
    for (const host of DIRECT_PRODUCT_HOSTS) {
      expect(MARKETING_HOST_ROUTES[host]).toBeUndefined();
      expect(resolveMarketingRoute(host, "/")).toBeNull();
      expect(isDirectProductHost(host)).toBe(true);
      expect(isCorporateMarketingHost(host)).toBe(false);
    }
  });

  it("does not rewrite historical or unclaimed NVG labels", () => {
    for (const host of UNCLAIMED_NVG_SUBDOMAINS) {
      expect(MARKETING_HOST_ROUTES[host]).toBeUndefined();
      expect(resolveMarketingRoute(host, "/")).toBeNull();
    }
  });

  it("records external/direct product origin URLs", () => {
    expect(EXTERNAL_PRODUCT_ORIGINS.aviatorNetwork).toBe(
      "https://aviatornetwork.com",
    );
    expect(EXTERNAL_PRODUCT_ORIGINS.naerox).toBe(
      "https://naerox.northbridgeventuregroup.com",
    );
    expect(EXTERNAL_PRODUCT_ORIGINS.quadrix).toBe(
      "https://quadrix.northbridgeventuregroup.com",
    );
    expect(EXTERNAL_PRODUCT_ORIGINS.npc).toBe(
      "https://npc.northbridgeventuregroup.com",
    );
  });

  it("keeps DOMAIN_REGISTRY hosts unique", () => {
    const hosts = DOMAIN_REGISTRY.map((e) => e.host);
    expect(new Set(hosts).size).toBe(hosts.length);
  });
});

describe("suite and product-marketing host routing", () => {
  it("maps every canonical suite host", () => {
    expect(SUITE_HOST_ROUTES).toEqual({
      "aviation.northbridgeventuregroup.com": "/suite/aviation",
      "games.northbridgeventuregroup.com": "/suite/games",
      "logistics.northbridgeventuregroup.com": "/suite/logistics",
      "digital.northbridgeventuregroup.com": "/suite/digital",
      "ventures.northbridgeventuregroup.com": "/suite/ventures",
    });
  });

  it("maps Aviator Network marketing host to the detail page", () => {
    expect(
      resolveMarketingRoute("aviatornetwork.northbridgeventuregroup.com", "/"),
    ).toBe("/products/aviator-network");
  });

  it("normalizes hostnames and strips ports", () => {
    expect(normalizeHostname("AVIATION.NORTHBRIDGEVENTUREGROUP.COM:443")).toBe(
      "aviation.northbridgeventuregroup.com",
    );
    expect(
      resolveMarketingRoute(
        "aviatornetwork.northbridgeventuregroup.com:443",
        "/",
      ),
    ).toBe("/products/aviator-network");
    expect(
      resolveMarketingRoute("naerox.northbridgeventuregroup.com:443", "/"),
    ).toBeNull();
  });

  it("rewrites only the root path of marketing hosts", () => {
    expect(resolveMarketingRoute("aviation.northbridgeventuregroup.com", "/")).toBe(
      "/suite/aviation",
    );
    expect(
      resolveMarketingRoute("aviation.northbridgeventuregroup.com", "/about"),
    ).toBeNull();
    expect(
      resolveMarketingRoute(
        "aviatornetwork.northbridgeventuregroup.com",
        "/products/aviator-network",
      ),
    ).toBeNull();
  });

  it("does not intercept the corporate root domain", () => {
    expect(resolveMarketingRoute("northbridgeventuregroup.com", "/")).toBeNull();
    expect(resolveMarketingRoute("www.northbridgeventuregroup.com", "/")).toBeNull();
  });

  it("does not rewrite unknown hosts", () => {
    expect(resolveMarketingRoute("example.com", "/")).toBeNull();
    expect(resolveMarketingRoute("unknown.northbridgeventuregroup.com", "/")).toBeNull();
  });

  it("keeps resolveSuiteRoute as a compatible alias", () => {
    expect(resolveSuiteRoute("games.northbridgeventuregroup.com", "/")).toBe(
      "/suite/games",
    );
  });

  it("identifies suite vs product-marketing vs direct-product hosts", () => {
    expect(isSuiteHost("aviation.northbridgeventuregroup.com")).toBe(true);
    expect(isProductMarketingHost("aviatornetwork.northbridgeventuregroup.com")).toBe(
      true,
    );
    expect(
      isCorporateMarketingHost("aviatornetwork.northbridgeventuregroup.com"),
    ).toBe(true);
    expect(isCorporateMarketingHost("northbridgeventuregroup.com")).toBe(false);
    expect(isDirectProductHost("naerox.northbridgeventuregroup.com")).toBe(true);
    expect(isDirectProductHost("aviatornetwork.northbridgeventuregroup.com")).toBe(
      false,
    );
  });
});
