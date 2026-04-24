import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/products";

export const dynamic = "force-static";

const BASE = "https://medphoto.com.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const productUrls = slugs.map(({ marca, slug }) => ({
    url: `${BASE}/tienda/${marca}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const brandUrls = Array.from(new Set(slugs.map((s) => s.marca))).map((marca) => ({
    url: `${BASE}/tienda/${marca}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/tienda/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/nosotros/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: `${BASE}/contacto/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...brandUrls,
    ...productUrls,
  ];
}
