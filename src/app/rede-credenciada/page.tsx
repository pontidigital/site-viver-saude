"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";
import { WHATSAPP_URL } from "@/lib/constants/site";

interface Provider {
  name: string;
  category: string;
  address?: string;
  featured?: boolean;
}

const featuredProviders: Provider[] = [
  { name: "Hospital Rio Grande", category: "Hospitais", address: "Natal/RN", featured: true },
  { name: "Maternidade Delfin Gonzalez", category: "Hospitais", address: "Natal/RN", featured: true },
  { name: "Villa Vic", category: "Hospitais", address: "Natal/RN", featured: true },
  { name: "Viver Clínica Lagoa Nova", category: "Clínicas", address: "Lagoa Nova, Natal/RN", featured: true },
  { name: "Viver Clínica Zona Norte", category: "Clínicas", address: "Zona Norte, Natal/RN", featured: true },
  { name: "O CASA", category: "Clínicas", address: "Natal/RN", featured: true },
];

const allProviders: Provider[] = [
  ...featuredProviders,
  { name: "Laboratório Potiguar", category: "Laboratórios", address: "Natal/RN" },
  { name: "CDF Diagnosticos", category: "Laboratórios", address: "Natal/RN" },
  { name: "Clínica Oftalmológica Natal", category: "Clínicas", address: "Natal/RN" },
  { name: "Clínica Ortopédica Potiguar", category: "Clínicas", address: "Natal/RN" },
  { name: "Centro de Imagem Natal", category: "Diagnóstico por Imagem", address: "Natal/RN" },
  { name: "Fisio Center", category: "Fisioterapia", address: "Natal/RN" },
  { name: "Pronto Socorro Zona Sul", category: "Pronto Socorro", address: "Natal/RN" },
];

const categories = [
  "Todos",
  "Hospitais",
  "Clínicas",
  "Laboratórios",
  "Diagnóstico por Imagem",
  "Fisioterapia",
  "Pronto Socorro",
];

export default function RedeCredenciadaPage() {
  const [activeTab, setActiveTab] = useState<"principais" | "completa">("principais");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProviders =
    selectedCategory === "Todos"
      ? allProviders
      : allProviders.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Rede Credenciada
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Encontre hospitais, clínicas, laboratórios e profissionais perto de você.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Tab Buttons */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-card rounded-xl p-1.5 border border-border">
              <button
                onClick={() => setActiveTab("principais")}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === "principais"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Principais da Rede
              </button>
              <button
                onClick={() => setActiveTab("completa")}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === "completa"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Rede Completa
              </button>
            </div>
          </div>

          {/* Tab 1: Principais */}
          {activeTab === "principais" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuredProviders.map((provider) => (
                <div
                  key={provider.name}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-muted mb-2">{provider.category}</p>
                  {provider.address && (
                    <p className="text-sm text-muted flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {provider.address}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Completa */}
          {activeTab === "completa" && (
            <>
              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "bg-card text-muted hover:text-foreground border border-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Provider List */}
              <div className="max-w-3xl mx-auto space-y-3">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.name}
                    className="bg-white rounded-xl p-5 shadow-sm border border-border flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-muted">
                        {provider.category}
                        {provider.address && ` - ${provider.address}`}
                      </p>
                    </div>
                    {provider.featured && (
                      <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                        Destaque
                      </span>
                    )}
                  </div>
                ))}
                {filteredProviders.length === 0 && (
                  <p className="text-center text-muted py-8">
                    Nenhum prestador encontrado nesta categoria.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Entre em contato e nossa equipe ajudará você a encontrar o profissional ideal.
          </p>
          <Button href={WHATSAPP_URL} variant="primary" size="lg">
            Falar no WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
