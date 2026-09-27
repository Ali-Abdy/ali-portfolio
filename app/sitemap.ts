import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { locales } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return locales.map((lang) => ({
    url: new URL(`/${lang}`, siteUrl).href,
    alternates: {
      languages: {
        de: new URL("/de", siteUrl).href,
        en: new URL("/en", siteUrl).href,
      },
    },
  }));
}
