"use client";

import Image from "next/image";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { MEDIA } from "@/lib/constants/media";

const supportingImages = [
  MEDIA.nossaCasa.fachada,
  MEDIA.nossaCasa.recepcao,
  MEDIA.nossaCasa.salaAtendimento,
];

export function SpaceGallery() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Conheça nosso espaço
          </h2>
        </ScrollAnimationWrapper>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Featured image */}
          <ScrollAnimationWrapper>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={MEDIA.nossaCasa.casa.src}
                alt={MEDIA.nossaCasa.casa.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </ScrollAnimationWrapper>

          {/* Supporting grid */}
          <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
            {supportingImages.map((img, idx) => (
              <ScrollAnimationWrapper key={idx} delay={idx * 0.12}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
