import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";

export const metadata = {
  title: "Notícias e Comunicados",
  description:
    "Acompanhe as notícias, comunicados e novidades da Viver Saúde. Informações sobre rede credenciada, benefícios e orientações de saúde.",
};

const categories = [
  { label: "Comunicados", color: "bg-primary/10 text-primary" },
  { label: "Rede", color: "bg-accent/10 text-accent-dark" },
  { label: "Benefícios", color: "bg-primary/10 text-primary" },
  { label: "Orientações", color: "bg-emerald-50 text-emerald-600" },
];

export default function NoticiasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimationWrapper>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Notícias e Comunicados
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Fique por dentro das novidades e informações importantes da Viver Saúde.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <span
                  key={cat.label}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${cat.color}`}
                >
                  {cat.label}
                </span>
              ))}
            </div>
          </ScrollAnimationWrapper>

          {/* Empty State */}
          <ScrollAnimationWrapper>
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Em breve, novidades aqui.
              </h2>
              <p className="text-muted">
                Estamos preparando conteúdos e comunicados para manter você sempre informado. Volte em breve!
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
}
