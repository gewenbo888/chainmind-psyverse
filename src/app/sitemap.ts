import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://chainmind.psyverse.fun";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/architectures`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/trust`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/risks`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/simulate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/psy`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
