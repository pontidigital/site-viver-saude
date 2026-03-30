import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description:
    "Encontre respostas rápidas para as dúvidas mais comuns sobre a Viver Saúde: portal do cliente, rede credenciada, planos e contato.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
