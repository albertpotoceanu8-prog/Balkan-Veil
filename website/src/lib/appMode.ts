export type AppMode = "site" | "admin" | "full";

const appModes: AppMode[] = ["site", "admin", "full"];

export function normalizeAppMode(value: unknown): AppMode {
  if (typeof value !== "string") return "site";

  const normalized = value.trim().toLowerCase();
  return appModes.includes(normalized as AppMode) ? (normalized as AppMode) : "site";
}

export function getAppMode(): AppMode {
  return normalizeAppMode(import.meta.env.VITE_APP_MODE);
}
