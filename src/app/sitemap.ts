import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/data/products";

export const dynamic = "force-static";

const BASE = "https://medphoto.com.co";

const blogSlugs: { slug: string; lastModified: Date }[] = [
  { slug: "fotografia-splash-con-flash", lastModified: new Date("2026-04-23") },
  { slug: "fotografia-retrato-iluminacion-profesional", lastModified: new Date("2026-04-23") },
  { slug: "como-elegir-paraguas-fotografia", lastModified: new Date("2026-04-23") },
];

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

  const blogUrls = blogSlugs.map(({ slug, lastModified }) => ({
    url: `${BASE}/blog/${slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/tienda/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/guia-roi-profoto/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/nosotros/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: `${BASE}/contacto/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...brandUrls,
    ...productUrls,
    ...blogUrls,
  ];
}
