"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MEDIA } from "@/lib/constants/media";

export function NossaCasaHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] lg:h-[70vh] overflow-hidden">
      <Image
        src={MEDIA.nossaCasa.casa.src}
        alt={MEDIA.nossaCasa.casa.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 flex items-end pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              Nossa Casa
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              Um espaço pensado para acolher você com conforto e cuidado.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
