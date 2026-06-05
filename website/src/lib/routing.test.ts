import { describe, expect, it } from "vitest";
import { buildPublicPath, parsePublicRoute } from "@/lib/routing";

describe("public routing", () => {
  it("builds the Romanian home path", () => {
    expect(buildPublicPath("ro", "home")).toBe("/ro");
  });

  it("builds the English services path", () => {
    expect(buildPublicPath("en", "services")).toBe("/en/services");
  });

  it("builds pricing paths", () => {
    expect(buildPublicPath("ro", "pricing")).toBe("/ro/abonamente");
    expect(buildPublicPath("en", "pricing")).toBe("/en/pricing");
  });

  it.each([
    ["/", "ro", "home", "/ro"],
    ["/ro", "ro", "home", "/ro"],
    ["/en", "en", "home", "/en"],
    ["/ro/", "ro", "home", "/ro"],
    ["/en/services/", "en", "services", "/en/services"],
    ["/ro/studio", "ro", "studio", "/ro/studio"],
    ["/en/studio", "en", "studio", "/en/studio"],
    ["/ro/servicii", "ro", "services", "/ro/servicii"],
    ["/en/services", "en", "services", "/en/services"],
    ["/ro/abonamente", "ro", "pricing", "/ro/abonamente"],
    ["/en/pricing", "en", "pricing", "/en/pricing"],
    ["/ro/lucrari", "ro", "work", "/ro/lucrari"],
    ["/en/work", "en", "work", "/en/work"],
    ["/ro/build", "ro", "build", "/ro/build"],
    ["/en/build", "en", "build", "/en/build"],
    ["/ro/protocol", "ro", "protocol", "/ro/protocol"],
    ["/en/protocol", "en", "protocol", "/en/protocol"],
    ["/ro/acces", "ro", "access", "/ro/acces"],
    ["/en/access", "en", "access", "/en/access"],
    ["/servicii", "ro", "services", "/ro/servicii"],
    ["/services", "ro", "services", "/ro/servicii"],
    ["/abonamente", "ro", "pricing", "/ro/abonamente"],
    ["/pricing", "ro", "pricing", "/ro/abonamente"],
    ["/lucrari", "ro", "work", "/ro/lucrari"],
  ] as const)("parses %s", (pathname, language, page, canonicalPath) => {
    expect(parsePublicRoute(pathname)).toMatchObject({
      language,
      page,
      canonicalPath,
      isNotFound: false,
    });
  });

  it.each([
    ["/en/not-real", "en", "/en"],
    ["/ro/ceva/fals", "ro", "/ro"],
    ["/admin", "ro", "/ro"],
  ] as const)("marks %s as not found", (pathname, language, canonicalPath) => {
    expect(parsePublicRoute(pathname)).toMatchObject({
      language,
      page: "home",
      canonicalPath,
      isNotFound: true,
    });
  });
});
