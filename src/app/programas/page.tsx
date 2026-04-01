import { Button } from "@/components/ui/Button";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { WHATSAPP_URL } from "@/lib/constants/site";

export const metadata = {
  title: "Programas de Qualidade de Vida",
  description:
    "Conheça os Programas de Qualidade de Vida da Viver Saúde: iniciativas de prevenção, bem-estar e acompanhamento contínuo para beneficiários.",
};

const programas = [
  {
    title: "Programa de Acompanhamento de Crônicos",
    description:
      "Monitoramento contínuo para beneficiários com condições crônicas como diabetes, hipertensão e doenças respiratórias. Acompanhamento regular com equipe multidisciplinar.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Programa Materno-Infantil",
    description:
      "Acompanhamento da gestante e do bebê desde o pré-natal até os primeiros meses de vida, com orientação e suporte especializado.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Programa de Envelhecimento Ativo",
    description:
      "Ações de promoção da saúde voltadas ao público sênior, com foco em autonomia, prevenção de quedas e qualidade de vida.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Programa de Saúde Mental",
    description:
      "Apoio psicológico e psiquiátrico com acompanhamento regular, grupos terapêuticos e orientação para beneficiários e familiares.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Programa de Prevenção e Rastreamento",
    description:
      "Campanhas e ações regulares de rastreamento para detecção precoce de doenças, com foco em exames preventivos e check-ups.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Programa de Atividade Física",
    description:
      "Incentivo à prática de exercícios com orientação profissional, parcerias com academias e atividades em grupo.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function ProgramasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent/5 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <ScrollAnimationWrapper>
            <div className="max-w-3xl">
              <span className="text-accent-dark font-medium text-sm uppercase tracking-wider">
                Qualidade de Vida
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
                Programas de Qualidade de Vida
              </h1>
              <p className="text-lg text-muted leading-relaxed">
                A Viver Saúde vai além do plano. Nossos programas promovem prevenção,
                acompanhamento e bem-estar para que você viva com mais saúde e qualidade.
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Programs list */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {programas.map((programa, index) => (
              <ScrollAnimationWrapper key={index} delay={index * 0.08}>
                <div className="group flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary-light text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {programa.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {programa.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-sm">
                      {programa.description}
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-light">
        <div className="max-w-3xl mx-auto px-4 lg:px-6 text-center">
          <ScrollAnimationWrapper>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Quer saber mais sobre nossos programas?
            </h2>
            <p className="text-muted mb-8">
              Entre em contato com a nossa equipe para conhecer os programas disponíveis para o seu plano.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={WHATSAPP_URL} size="lg" target="_blank">
                Fale com a Viver
              </Button>
              <Button href="/contato" variant="outline" size="lg">
                Entre em contato
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
}
