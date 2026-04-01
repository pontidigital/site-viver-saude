import { NossaCasaHero } from "@/components/sections/nossa-casa/NossaCasaHero";
import { AmenitiesGrid } from "@/components/sections/nossa-casa/AmenitiesGrid";
import { SpaceGallery } from "@/components/sections/nossa-casa/SpaceGallery";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";

export const metadata = {
  title: "Nossa Casa",
  description:
    "Conheça o espaço da Viver Saúde em Natal/RN. Um ambiente acolhedor e moderno pensado para o seu conforto e bem-estar.",
};

export default function NossaCasaPage() {
  return (
    <>
      <NossaCasaHero />

      {/* Introduction */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimationWrapper>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Mais que uma sede, uma{" "}
                <span className="text-primary">casa viva e acolhedora</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-4">
                Pensamos em bons momentos. Nossa casa reúne bem-estar, lazer e
                cultura em um espaço elegante e acolhedor.
              </p>
              <p className="text-foreground font-semibold text-lg">
                Seja bem-vindo. A casa é sua.
              </p>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      <AmenitiesGrid />
      <SpaceGallery />
      <CTASection />
    </>
  );
}
