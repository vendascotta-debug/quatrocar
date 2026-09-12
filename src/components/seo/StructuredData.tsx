const BASE_URL = "https://www.quatrocar.com.br";

type FaqItem = { q: string; a: string };

export function StructuredData({ faq }: { faq: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "QuatroCar",
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo-lockup.webp`,
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "QuatroCar",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${BASE_URL}/#software`,
        name: "QuatroCar",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        description:
          "A memória do seu carro: histórico de manutenção, abastecimento, documentos e lembretes de manutenção por peça.",
        url: BASE_URL,
        publisher: { "@id": `${BASE_URL}/#organization` },
        offers: {
          "@type": "Offer",
          price: "97.00",
          priceCurrency: "BRL",
          priceValidUntil: "2027-12-31",
          category: "subscription",
          url: `${BASE_URL}#planos`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        inLanguage: "pt-BR",
        mainEntity: faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
