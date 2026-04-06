import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/processing", "/result"] },
    sitemap: "https://disaster-diagnosis.com/sitemap.xml",
  };
}
