"use client";

import Image from "next/image";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { MEDIA } from "@/lib/constants/media";

const galleryImages = [
  MEDIA.nossaCasa.fachada,
  MEDIA.nossaCasa.recepcao,
  MEDIA.nossaCasa.salaAtendimento,
  MEDIA.nossaCasa.espacoInterno,
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

        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {galleryImages.map((img, idx) => (
              <ScrollAnimationWrapper key={idx} delay={idx * 0.12}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
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
