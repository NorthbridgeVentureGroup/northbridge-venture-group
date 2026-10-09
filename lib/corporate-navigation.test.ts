import { describe, expect, it } from "vitest";
import {
  corporateOriginHref,
  resolveCorporateNavHref,
} from "@/lib/corporate-navigation";
import { SITE_ORIGIN } from "@/lib/seo";

describe("corporate navigation hrefs", () => {
  it("builds absolute corporate origin hrefs", () => {
    expect(corporateOriginHref("/")).toBe(SITE_ORIGIN);
    expect(corporateOriginHref("/about")).toBe(`${SITE_ORIGIN}/about`);
  });

  it("uses absolute corporate URLs when host is omitted (shared Header/Footer)", () => {
    expect(resolveCorporateNavHref("/about")).toBe(`${SITE_ORIGIN}/about`);
    expect(resolveCorporateNavHref("/")).toBe(SITE_ORIGIN);
  });

  it("keeps relative paths when explicitly on the corporate apex", () => {
    expect(resolveCorporateNavHref("/about", "northbridgeventuregroup.com")).toBe(
      "/about",
    );
    expect(resolveCorporateNavHref("/", "www.northbridgeventuregroup.com")).toBe(
      "/",
    );
  });

  it("absolutizes corporate links on suite hosts", () => {
    expect(
      resolveCorporateNavHref("/about", "aviation.northbridgeventuregroup.com"),
    ).toBe(`${SITE_ORIGIN}/about`);
    expect(
      resolveCorporateNavHref("/", "games.northbridgeventuregroup.com"),
    ).toBe(SITE_ORIGIN);
  });

  it("absolutizes corporate links on product-marketing hosts", () => {
    expect(
      resolveCorporateNavHref(
        "/ventures",
        "aviatornetwork.northbridgeventuregroup.com",
      ),
    ).toBe(`${SITE_ORIGIN}/ventures`);
    expect(
      resolveCorporateNavHref(
        "/?nordy=open&entry=HOME",
        "aviatornetwork.northbridgeventuregroup.com",
      ),
    ).toBe(`${SITE_ORIGIN}/?nordy=open&entry=HOME`);
  });
});
