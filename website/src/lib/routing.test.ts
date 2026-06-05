import { describe, expect, it } from "vitest";
import { buildPublicPath, parsePublicRoute } from "@/lib/routing";

describe("public routing", () => {
  it("builds the Romanian home path", () => {
    expect(buildPublicPath("ro", "home")).toBe("/ro");
  });

  it("builds the English services path", () => {
    expect(buildPublicPath("en", "services")).toBe("/en/services");
  });

  it("parses root to the default Romanian home route", () => {
    expect(parsePublicRoute("/")).toMatchObject({
      language: "ro",
      page: "home",
      canonicalPath: "/ro",
      isNotFound: false,
    });
  });

  it("parses the Romanian services route", () => {
    expect(parsePublicRoute("/ro/servicii")).toMatchObject({
      language: "ro",
      page: "services",
      canonicalPath: "/ro/servicii",
      isNotFound: false,
    });
  });

  it("parses the English work route", () => {
    expect(parsePublicRoute("/en/work")).toMatchObject({
      language: "en",
      page: "work",
      canonicalPath: "/en/work",
      isNotFound: false,
    });
  });

  it("marks invalid routes as not found", () => {
    expect(parsePublicRoute("/en/not-real")).toMatchObject({
      language: "en",
      page: "home",
      canonicalPath: "/en",
      isNotFound: true,
    });
  });
});
