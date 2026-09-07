import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/veiculos", "/perfil", "/admin", "/api/"],
      },
    ],
    sitemap: "https://www.quatrocar.com.br/sitemap.xml",
  };
}
