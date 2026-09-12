import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar conta | QuatroCar",
  robots: { index: false, follow: false },
};

export default function CadastroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
