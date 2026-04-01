"use client";

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

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Client portal */}
          <ScrollAnimationWrapper delay={0} direction="left">
            <div className="bg-white rounded-2xl border border-border p-8 flex flex-col items-center text-center hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Área do Cliente</h3>
              <p className="text-muted text-sm mb-6">
                Consulte informações e serviços do seu plano em um ambiente seguro.
              </p>
              <Button href={PORTALS.cliente} variant="primary" size="md" className="w-full" target="_blank">
                Acessar Portal do Cliente
              </Button>
            </div>
          </ScrollAnimationWrapper>

          {/* Provider portal */}
          <ScrollAnimationWrapper delay={0.15} direction="right">
            <div className="bg-white rounded-2xl border border-border p-8 flex flex-col items-center text-center hover:border-accent/30 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 text-accent-dark rounded-2xl flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Área do Prestador</h3>
              <p className="text-muted text-sm mb-6">
                Área exclusiva para prestadores acessarem recursos e informações.
              </p>
              <Button href={PORTALS.prestador} variant="accent" size="md" className="w-full" target="_blank">
                Acessar Área do Prestador
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
