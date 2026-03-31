import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { WHATSAPP_URL } from "@/lib/constants/site";
import type { Metadata } from "next";

interface PlanDocument {
  label: string;
  file: string;
}

interface PlanData {
  name: string;
  slug: string;
  tagline: string;
  image: string;
  description: string;
  highlights: string[];
  targetAudience: string;
  condicoesGerais?: PlanDocument[];
}

const plansData: Record<string, PlanData> = {
  topazio: {
    name: "Topázio",
    slug: "topazio",
    tagline: "Acompanhamento contínuo e foco em prevenção",
    image: "/images/plans/topázio.png",
    description:
      "O plano Topázio foi desenvolvido para quem valoriza o acompanhamento preventivo e o cuidado contínuo. Com foco em consultas regulares e orientação médica, ele garante que você esteja sempre um passo à frente quando o assunto é saúde.",
    highlights: [
      "Consultas com clínico geral e especialistas",
      "Exames preventivos e de rotina",
      "Acompanhamento contínuo de saúde",
      "Acesso à rede credenciada organizada",
      "Atendimento humanizado e próximo",
    ],
    targetAudience:
      "Ideal para quem busca um plano com foco em prevenção e acompanhamento regular, com custo acessível.",
    condicoesGerais: [
      { label: "Topázio CE (Ambulatorial)", file: "/docs/condicoes-gerais/topazio-ce-ambulatorial.pdf" },
    ],
  },
  rubi: {
    name: "Rubi",
    slug: "rubi",
    tagline: "Cobertura completa para todas as fases da vida",
    image: "/images/plans/rubi.png",
    description:
      "O plano Rubi oferece cobertura abrangente para toda a família. Com acesso amplo a especialidades, exames e procedimentos, ele é a escolha certa para quem deseja tranquilidade em todas as fases da vida.",
    highlights: [
      "Ampla cobertura de especialidades médicas",
      "Exames de média e alta complexidade",
      "Internações e procedimentos cirúrgicos",
      "Cobertura para todas as faixas etárias",
      "Rede credenciada completa",
    ],
    targetAudience:
      "Perfeito para famílias que buscam cobertura completa e segurança em todas as situações de saúde.",
    condicoesGerais: [
      { label: "Rubi CA QC", file: "/docs/condicoes-gerais/rubi-ca-qc.pdf" },
      { label: "Rubi CE QC", file: "/docs/condicoes-gerais/rubi-ce-qc.pdf" },
    ],
  },
  esmeralda: {
    name: "Esmeralda",
    slug: "esmeralda",
    tagline: "Estabilidade e cuidado contínuo",
    image: "/images/plans/esmeralda.png",
    description:
      "O plano Esmeralda combina estabilidade com cuidado contínuo. Pensado para quem deseja manter a saúde em dia com tranquilidade e previsibilidade, oferecendo uma experiência consistente e confiável.",
    highlights: [
      "Acompanhamento médico regular",
      "Exames periódicos e preventivos",
      "Consultas com especialistas",
      "Estabilidade no atendimento",
      "Suporte contínuo ao beneficiário",
    ],
    targetAudience:
      "Indicado para quem valoriza estabilidade e quer manter o cuidado com a saúde de forma contínua e organizada.",
  },
  safira: {
    name: "Safira",
    slug: "safira",
    tagline: "Alta qualidade e agilidade no atendimento",
    image: "/images/plans/safira.png",
    description:
      "O plano Safira é para quem não abre mão de qualidade e agilidade. Com acesso facilitado a uma rede de excelência e atendimento rápido, ele proporciona a melhor experiência em cuidados de saúde.",
    highlights: [
      "Atendimento ágil e sem burocracia",
      "Acesso a profissionais de alta qualidade",
      "Exames e procedimentos com rapidez",
      "Rede credenciada premium",
      "Suporte dedicado ao beneficiário",
    ],
    targetAudience:
      "Ideal para quem busca alta qualidade no atendimento com agilidade e conforto.",
    condicoesGerais: [
      { label: "Safira CA QC", file: "/docs/condicoes-gerais/safira-ca-qc.pdf" },
      { label: "Safira PF QC", file: "/docs/condicoes-gerais/safira-pf-qc.pdf" },
    ],
  },
  turmalina: {
    name: "Turmalina",
    slug: "turmalina",
    tagline: "Cobertura essencial para internações",
    image: "/images/plans/turmalina.png",
    description:
      "O plano Turmalina oferece a cobertura essencial para situações que exigem internação. Uma opção estratégica para quem deseja estar protegido nos momentos mais críticos, com segurança e respaldo médico.",
    highlights: [
      "Cobertura para internações clínicas e cirúrgicas",
      "Atendimento de urgência e emergência",
      "Acompanhamento hospitalar completo",
      "Acesso a rede de hospitais credenciados",
      "Proteção nos momentos mais importantes",
    ],
    targetAudience:
      "Indicado para quem busca proteção essencial focada em internações e situações de urgência.",
    condicoesGerais: [
      { label: "Turmalina CA QC", file: "/docs/condicoes-gerais/turmalina-ca-qc.pdf" },
      { label: "Turmalina CE QC", file: "/docs/condicoes-gerais/turmalina-ce-qc.pdf" },
    ],
  },
  quartzo: {
    name: "Quartzo",
    slug: "quartzo",
    tagline: "Proteção acessível para necessidades essenciais",
    image: "/images/plans/quarzo.png",
    description:
      "O plano Quartzo foi pensado para oferecer proteção acessível sem abrir mão do essencial. Com cobertura para as principais necessidades de saúde, é a porta de entrada para quem quer começar a cuidar de si com qualidade.",
    highlights: [
      "Consultas com clínico geral",
      "Exames básicos e essenciais",
      "Atendimento acessível e humanizado",
      "Cobertura para necessidades fundamentais",
      "Melhor custo-benefício da categoria",
    ],
    targetAudience:
      "Perfeito para quem busca um plano acessível que cubra as necessidades essenciais de saúde.",
    condicoesGerais: [
      { label: "Quartzo CA QC", file: "/docs/condicoes-gerais/quartzo-ca-qc.pdf" },
      { label: "Quartzo CE QC", file: "/docs/condicoes-gerais/quartzo-ce-qc.pdf" },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(plansData).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const plan = plansData[slug];

  if (!plan) {
    return { title: "Plano não encontrado" };
  }

  return {
    title: `Plano ${plan.name}`,
    description: `${plan.tagline}. Conheça o plano ${plan.name} da Viver Saúde em Natal/RN.`,
  };
}

export default async function PlanPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const plan = plansData[slug];

  if (!plan) {
    notFound();
  }

  return (
    <>
      {/* Plan Header */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimationWrapper direction="left">
              <p className="text-accent font-semibold mb-2 uppercase tracking-wide text-sm">
                Plano
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {plan.name}
              </h1>
              <p className="text-xl text-white/90 mb-6">{plan.tagline}</p>
              <p className="text-white/80 leading-relaxed mb-8">
                {plan.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/quero-ser-cliente" variant="accent" size="lg">
                  Quero este plano
                </Button>
                <Button
                  href={WHATSAPP_URL}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper direction="right">
              <div className="flex items-center justify-center">
                <Image
                  src={plan.image}
                  alt={`Plano ${plan.name}`}
                  width={400}
                  height={300}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              O que o plano {plan.name} oferece
            </h2>
          </ScrollAnimationWrapper>
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            {plan.highlights.map((highlight, idx) => (
              <ScrollAnimationWrapper key={idx} delay={idx * 0.1}>
                <div className="flex items-start gap-3 p-5 bg-card rounded-xl">
                  <svg
                    className="w-6 h-6 text-accent flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-foreground">{highlight}</span>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Para quem é indicado?
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
              {plan.targetAudience}
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Condições Gerais Download */}
      {plan.condicoesGerais && plan.condicoesGerais.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <ScrollAnimationWrapper>
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Condições Gerais
                </h2>
                <p className="text-muted mb-8">
                  Consulte os documentos com as condições gerais do plano {plan.name}.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {plan.condicoesGerais.map((doc) => (
                    <a
                      key={doc.file}
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-xl text-foreground hover:border-primary hover:text-primary transition-colors text-sm font-medium"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {doc.label}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </section>
      )}

      {/* CTA Bar */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Fale com nossa equipe e contrate o plano {plan.name} hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/quero-ser-cliente" variant="accent" size="lg">
                Quero ser cliente
              </Button>
              <Button
                href={WHATSAPP_URL}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Falar no WhatsApp
              </Button>
              <Button href="/planos" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Ver todos os planos
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
}
