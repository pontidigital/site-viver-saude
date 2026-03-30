import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rede Credenciada",
  description:
    "Encontre hospitais, clínicas, laboratórios e profissionais da rede credenciada Viver Saúde em Natal/RN.",
};

export default function RedeCredenciadaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
