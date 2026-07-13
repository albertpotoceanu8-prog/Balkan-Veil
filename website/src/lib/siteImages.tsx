import { createContext, useContext } from "react";
import type { SiteImages } from "@/data/contentTypes";

export const defaultSiteImages: SiteImages = {
  logo: "/balkan-veil-logo.webp",
  worldMap: "/assets/tactical-world-map-v2.jpg",
};

const SiteImagesContext = createContext<SiteImages>(defaultSiteImages);

export const SiteImagesProvider = SiteImagesContext.Provider;

export function useSiteImages(): SiteImages {
  return useContext(SiteImagesContext);
}
