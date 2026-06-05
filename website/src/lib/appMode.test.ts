import { describe, expect, it } from "vitest";
import { normalizeAppMode } from "@/lib/appMode";

describe("app mode", () => {
  it.each([
    ["site", "site"],
    ["admin", "admin"],
    ["full", "full"],
    [" SITE ", "site"],
    ["ADMIN", "admin"],
    ["Full", "full"],
    [undefined, "site"],
    [null, "site"],
    ["", "site"],
    ["production", "site"],
    ["cms", "site"],
  ] as const)("normalizes %s to %s", (value, expected) => {
    expect(normalizeAppMode(value)).toBe(expected);
  });
});
