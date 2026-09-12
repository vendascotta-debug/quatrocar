import type { MetadataRoute } from "next";
import { publishedPosts } from "@/lib/blog-posts";

// Evita que a Vercel sirva uma cópia antiga em cache na borda (edge) —
// já aconteceu do sitemap ficar dias desatualizado mesmo após novos deploys.
export const revalidate = 0;

const BASE_URL = "https://www.quatrocar.com.br";

/**
 * Sitemap do QuatroCar — versão com o blog.
 *
 * /login e /cadastro NÃO entram aqui de propósito: são páginas de
 * formulário, nunca vão ranquear e só gastam crawl budget (e agora
 * também têm noindex — ver src/app/login/layout.tsx e cadastro/layout.tsx).
 *
 * Os artigos do blog vêm de src/lib/blog-posts.ts e só aparecem aqui
 * a partir da data de publicação (publishedAt) de cada um.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: agora,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: agora,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...publishedPosts().map((post) => ({
      url: `${BASE_URL}${post.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
