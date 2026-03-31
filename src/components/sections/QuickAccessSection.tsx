"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { Button } from "@/components/ui/Button";
import { PORTALS } from "@/lib/constants/site";

export function QuickAccessSection() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <ScrollAnimationWrapper>
          <div className="text-center mb-14">
            <span className="text-accent-dark font-medium text-sm uppercase tracking-wider">
              Acesso rápido
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
              Acesse seus canais digitais
            </h2>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Client card */}
          <ScrollAnimationWrapper delay={0} direction="left">
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden group"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/general/cliente.png"
                  alt="Área do Cliente Viver Saúde"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/20" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-white text-xl font-bold">Área do Cliente</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted text-sm mb-6">
                  Consulte informações e serviços do seu plano em um ambiente seguro.
                </p>
                <Button href={PORTALS.cliente} variant="primary" size="md" className="w-full" target="_blank">
                  Acessar Portal do Cliente
                </Button>
              </div>
            </motion.div>
          </ScrollAnimationWrapper>

          {/* Provider card */}
          <ScrollAnimationWrapper delay={0.15} direction="right">
            <motion.div
              className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden group"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/general/prestador.png"
                  alt="Área do Prestador Viver Saúde"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-dark/80 to-accent/20" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-white text-xl font-bold">Área do Prestador</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted text-sm mb-6">
                  Área exclusiva para prestadores acessarem recursos e informações.
                </p>
                <Button href={PORTALS.prestador} variant="accent" size="md" className="w-full" target="_blank">
                  Acessar Área do Prestador
                </Button>
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
