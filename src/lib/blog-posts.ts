export type BlogPost = {
  slug: string;
  categoria: string;
  titulo: string;
  descricao: string;
  imagem: string;
  /** Data de publicação real, formato "YYYY-MM-DD". O artigo só fica visível a partir dela. */
  publishedAt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "/blog/tabela-de-revisao-por-quilometragem",
    categoria: "Manutenção",
    titulo:
      "Tabela de revisão por quilometragem: o que trocar a cada 10, 20, 40 e 60 mil km",
    descricao:
      "Tabela completa de revisão do carro por quilometragem. Veja o que trocar em cada etapa, quais itens vencem por tempo e como não perder nenhuma manutenção.",
    imagem: "/images/blog/tabela-revisao-km-hero.jpg",
    publishedAt: "2026-09-12",
  },
  {
    slug: "/blog/quanto-custa-manter-um-carro-por-mes",
    categoria: "Controle de gastos",
    titulo: "Quanto custa manter um carro por mês? A conta que quase ninguém faz certo",
    descricao:
      "Combustível é só uma parte. Veja todos os custos fixos e variáveis de manter um carro por mês.",
    imagem: "/images/blog/quanto-custa-manter-carro-hero.jpg",
    publishedAt: "2026-09-19",
  },
  {
    slug: "/blog/quando-trocar-o-oleo-do-carro",
    categoria: "Manutenção",
    titulo: "Quando trocar o óleo do carro: a resposta completa (não é só 10 mil km)",
    descricao:
      "Mineral, semissintético ou sintético — cada um tem um intervalo diferente. Veja os sinais de óleo vencido e os mitos mais comuns.",
    imagem: "/images/blog/quando-trocar-oleo-hero.jpg",
    publishedAt: "2026-09-26",
  },
  {
    slug: "/blog/historico-de-manutencao-carro-usado",
    categoria: "Comprar e vender",
    titulo: "Histórico de manutenção: por que ele vale mais do que o preço no anúncio",
    descricao:
      "Veja por que o histórico de manutenção pesa tanto na negociação de um carro usado, e como provar que você cuidou do carro.",
    imagem: "/images/blog/historico-manutencao-carro-usado-hero.jpg",
    publishedAt: "2026-10-03",
  },
  {
    slug: "/blog/checklist-manutencao-motorista-de-app",
    categoria: "Motorista de aplicativo",
    titulo: "Checklist de manutenção para motorista de aplicativo: o que checar toda semana",
    descricao:
      "Rodar muito muda tudo na manutenção do carro. Veja o checklist semanal, mensal e por quilometragem pra quem vive de aplicativo.",
    imagem: "/images/blog/checklist-motorista-app-hero.jpg",
    publishedAt: "2026-10-10",
  },
];

/** Horário de Brasília (UTC-3) fixo — evita depender do fuso do servidor. */
export function isPublished(publishedAt: string): boolean {
  return new Date(`${publishedAt}T00:00:00-03:00`).getTime() <= Date.now();
}

export function publishedPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => isPublished(p.publishedAt))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatDateBR(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
