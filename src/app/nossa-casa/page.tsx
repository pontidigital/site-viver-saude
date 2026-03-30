import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { WHATSAPP_URL } from "@/lib/constants/site";

export const metadata = {
  title: "Nossa Casa",
  description:
    "Conheça o espaço da Viver Saúde em Natal/RN. Um ambiente acolhedor e moderno pensado para o seu conforto e bem-estar.",
};

const amenities = [
  "Recepção acolhedora e confortável",
  "Salas de atendimento climatizadas",
  "Acessibilidade para todos os públicos",
  "Ambiente pensado para o bem-estar",
  "Localização estratégica em Natal/RN",
  "Estacionamento para visitantes",
];

const galleryImages = [
  { src: "/images/general/img-quem-somos.jpg", alt: "Fachada da Viver Saúde" },
  { src: "/images/general/img-quem-somos.jpg", alt: "Recepção da Viver Saúde" },
  { src: "/images/general/img-quem-somos.jpg", alt: "Sala de atendimento" },
  { src: "/images/general/img-quem-somos.jpg", alt: "Espaço interno" },
];

export default function NossaCasaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Nossa Casa
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Um espaço pensado para acolher você com conforto e cuidado.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimationWrapper>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Conforto e acolhimento em cada detalhe
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                A sede da Viver Saúde foi planejada para oferecer a melhor experiência aos nossos beneficiários. Desde a recepção até as salas de atendimento, cada espaço reflete nosso compromisso com o bem-estar e a qualidade do cuidado.
              </p>
            </ScrollAnimationWrapper>

            {/* Amenities */}
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {amenities.map((item, idx) => (
                <ScrollAnimationWrapper key={idx} delay={idx * 0.1}>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-xl">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-foreground">{item}</span>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Conheça nosso espaço
            </h2>
          </ScrollAnimationWrapper>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {galleryImages.map((img, idx) => (
              <ScrollAnimationWrapper key={idx} delay={idx * 0.15}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Venha nos visitar
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Estamos esperando você. Agende uma visita ou entre em contato para conhecer nosso espaço.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contato" variant="accent" size="lg">
                Entrar em contato
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
        </div>
      </section>
    </>
  );
}
