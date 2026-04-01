import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { WHATSAPP_URL } from "@/lib/constants/site";

export const metadata = {
  title: "Planos",
  description:
    "Encontre o plano de saúde ideal para você e sua família. Conheça os planos Topázio, Rubi, Esmeralda, Safira, Turmalina, Quartzo, Ametista, Diamante e Turquesa da Viver Saúde.",
};

const plans = [
  {
    name: "Topázio",
    slug: "topazio",
    tagline: "Estabilidade e cuidado contínuo, para quem valoriza equilíbrio e confiança",
    image: "/images/plans/topázio.png",
  },
  {
    name: "Rubi",
    slug: "rubi",
    tagline: "Qualidade e cuidado completo em todas as fases da vida",
    image: "/images/plans/rubi.png",
  },
  {
    name: "Esmeralda",
    slug: "esmeralda",
    tagline: "Cobertura premium com atendimento exclusivo",
    image: "/images/plans/esmeralda.png",
  },
  {
    name: "Safira",
    slug: "safira",
    tagline: "Atenção primária ideal para longevidade, prevenção e qualidade de vida",
    image: "/images/plans/safira.png",
  },
  {
    name: "Turmalina",
    slug: "turmalina",
    tagline: "Cuidado integral com acompanhamento contínuo da saúde",
    image: "/images/plans/turmalina.png",
  },
  {
    name: "Quartzo",
    slug: "quartzo",
    tagline: "Completo e prático, com atendimento ambulatorial e hospitalar",
    image: "/images/plans/quarzo.png",
  },
  {
    name: "Ametista",
    slug: "ametista",
    tagline: "Voltado ao público sênior, com tranquilidade, segurança e acompanhamento próximo",
    image: "/images/plans/ametista.avif",
  },
  {
    name: "Diamante",
    slug: "diamante",
    tagline: "Plano essencial com eficiência, estrutura hospitalar e ambulatorial",
    image: "/images/plans/diamante.avif",
  },
  {
    name: "Turquesa",
    slug: "turquesa",
    tagline: "Atendimento diferenciado com cobertura de alto padrão",
    image: "/images/plans/turquesa.avif",
  },
];

export default function PlanosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Planos
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Encontre a proteção ideal para você e sua família.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <ScrollAnimationWrapper key={plan.slug} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-border overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-[4/3] bg-card flex items-center justify-center p-8">
                    <Image
                      src={plan.image}
                      alt={`Plano ${plan.name}`}
                      width={240}
                      height={180}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h2>
                    <p className="text-muted mb-6 flex-1">{plan.tagline}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button href={`/planos/${plan.slug}`} variant="primary" size="sm" className="flex-1">
                        Saiba mais
                      </Button>
                      <Button href={WHATSAPP_URL} variant="outline" size="sm" className="flex-1">
                        Contratar
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Precisa de ajuda para escolher?
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
              Nossa equipe ajuda você a encontrar o plano certo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/quero-ser-cliente" variant="primary" size="lg">
                Quero ser cliente
              </Button>
              <Button href={WHATSAPP_URL} variant="accent" size="lg">
                Falar no WhatsApp
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
}
