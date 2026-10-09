import { describe, expect, it } from "vitest";
import {
  normalizeHostname,
  resolveSuiteRoute,
  SUITE_HOST_ROUTES,
} from "@/lib/subdomain-routing";

describe("suite subdomain routing", () => {
  it("maps every canonical suite host", () => {
    expect(SUITE_HOST_ROUTES).toEqual({
      "aviation.northbridgeventuregroup.com": "/suite/aviation",
      "games.northbridgeventuregroup.com": "/suite/games",
      "logistics.northbridgeventuregroup.com": "/suite/logistics",
      "digital.northbridgeventuregroup.com": "/suite/digital",
      "ventures.northbridgeventuregroup.com": "/suite/ventures",
    });
  });

  it("normalizes hostnames and strips ports", () => {
    expect(normalizeHostname("AVIATION.NORTHBRIDGEVENTUREGROUP.COM:443")).toBe(
      "aviation.northbridgeventuregroup.com",
    );
  });

  it("rewrites only the root path of a suite host", () => {
    expect(resolveSuiteRoute("games.northbridgeventuregroup.com", "/")).toBe(
      "/suite/games",
    );
    expect(resolveSuiteRoute("games.northbridgeventuregroup.com", "/about")).toBeNull();
  });

  it("does not intercept the corporate root domain", () => {
    expect(resolveSuiteRoute("northbridgeventuregroup.com", "/")).toBeNull();
  });

  it("does not claim product subdomains owned by other repos", () => {
    expect(resolveSuiteRoute("quadrix.northbridgeventuregroup.com", "/")).toBeNull();
    expect(resolveSuiteRoute("npc.northbridgeventuregroup.com", "/")).toBeNull();
    expect(resolveSuiteRoute("aviatornetwork.northbridgeventuregroup.com", "/")).toBeNull();
  });
});
