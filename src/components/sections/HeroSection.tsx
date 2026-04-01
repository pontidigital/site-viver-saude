"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants/site";
import { MEDIA } from "@/lib/constants/media";

export function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-white to-primary-light min-h-[500px] lg:min-h-[auto] flex items-center"
    >
      {/* Background video - subtle, behind all content */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster={MEDIA.hero.video.poster}
        className="absolute inset-0 w-full h-full object-cover opacity-15 z-0"
      >
        <source src={MEDIA.hero.video.src} type="video/mp4" />
      </video>

      {/* Background image with parallax (fallback when video not available) */}
      <motion.div className="absolute inset-0 z-[1]" style={{ y: bgY }}>
        <Image
          src={MEDIA.hero.backgroundDesktop.src}
          alt={MEDIA.hero.backgroundDesktop.alt}
          fill
          className="object-cover object-center opacity-10 hidden lg:block"
          priority
        />
        <Image
          src={MEDIA.hero.backgroundMobile.src}
          alt={MEDIA.hero.backgroundMobile.alt}
          fill
          className="object-cover object-center opacity-10 lg:hidden"
          priority
        />
      </motion.div>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10 lg:pt-12 pb-16 lg:pb-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          {/* Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-accent/10 text-accent-dark font-medium text-sm px-4 py-1.5 rounded-full mb-6">
                Plano de Saúde em Natal/RN
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              A vida é feita de escolhas.{" "}
              <span className="hero-gradient-text">A melhor é viver.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-lg"
            >
              Um plano de saúde para cuidar de você de um jeito mais próximo,
              acolhedor e descomplicado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="animate-pulse-glow rounded-lg">
                <Button href="/quero-ser-cliente" size="lg">
                  Quero contratar
                </Button>
              </div>
              <Button href={WHATSAPP_URL} variant="outline" size="lg" target="_blank">
                Fale com a Viver
              </Button>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-end self-end mb-0"
          >
            <div className="relative mb-0">
              <Image
                src="/images/hero/hero-topo.png"
                alt="Família sorrindo com plano Viver Saúde"
                width={600}
                height={500}
                className="object-contain object-bottom"
                priority
              />
              {/* Floating card with float animation */}
              <motion.div
                className="absolute bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Cuidado próximo</p>
                  <p className="text-xs text-muted">Atendimento acolhedor</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
