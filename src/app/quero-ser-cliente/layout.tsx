import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quero Ser Cliente",
  description:
    "Preencha o formulário e entre para a Viver Saúde. Nossa equipe entrará em contato para ajudar você a escolher o plano ideal em Natal/RN.",
};

export default function QueroSerClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
