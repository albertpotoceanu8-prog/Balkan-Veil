export type AppMode = "site" | "admin" | "full";

const appModes: AppMode[] = ["site", "admin", "full"];

export function getAppMode(): AppMode {
  const value = import.meta.env.VITE_APP_MODE;
  return appModes.includes(value as AppMode) ? (value as AppMode) : "site";
}
