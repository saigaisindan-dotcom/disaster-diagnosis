import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://disaster-diagnosis.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/hazard`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
