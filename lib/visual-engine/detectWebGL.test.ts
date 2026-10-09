import { describe, expect, it } from "vitest";
import { detectWebGL } from "./detectWebGL";

describe("detectWebGL", () => {
  it("returns false in the Node test environment", () => {
    expect(detectWebGL()).toBe(false);
  });
});
