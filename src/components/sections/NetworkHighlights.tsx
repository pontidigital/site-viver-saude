"use client";

import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { Button } from "@/components/ui/Button";

const networkItems = [
  "Rede hospitalar Hospital Rio Grande",
  "Maternidade Delfin Gonzalez",
  "Hospital Psiquiátrico Villa Vic",
  "Unidades de pronto atendimento e pronto socorro",
  "Unidades próprias Viver Saúde dedicadas à urgência e emergência",
];

export function NetworkHighlights() {
  return (
    <section className="py-20 lg:py-28 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimationWrapper direction="left">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Rede Credenciada
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Proteção de excelência <span className="text-primary">mais próxima de você</span>
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Conte com uma rede ampla e qualificada com tudo que você precisa para se sentir protegido.
            </p>
            <Button href="/rede-credenciada" variant="primary" size="md">
              Ver rede completa
            </Button>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper direction="right">
            <ul className="flex flex-col gap-3">
              {networkItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-white rounded-xl md:rounded-full px-6 py-3.5 text-center text-foreground font-medium text-sm shadow-sm border border-border"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
