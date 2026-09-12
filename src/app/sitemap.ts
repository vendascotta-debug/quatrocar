import type { MetadataRoute } from "next";

const BASE_URL = "https://www.quatrocar.com.br";

/**
 * Sitemap do QuatroCar — versão com o blog.
 *
 * /login e /cadastro NÃO entram aqui de propósito: são páginas de
 * formulário, nunca vão ranquear e só gastam crawl budget.
 *
 * Para cada novo artigo publicado, adicione o slug no array `artigos`.
 */

const artigos = [
  "/blog/tabela-de-revisao-por-quilometragem",
  // "/blog/quanto-custa-manter-um-carro-por-mes",
  // "/blog/quando-trocar-o-oleo-do-carro",
  // "/blog/historico-de-manutencao-carro-usado",
  // "/blog/checklist-manutencao-motorista-de-app",
];

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
    ...artigos.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
