import { ScrollAnimationWrapper } from "@/components/shared/ScrollAnimationWrapper";

export const metadata = {
  title: "Notícias e Comunicados",
  description:
    "Acompanhe as notícias, comunicados e novidades da Viver Saúde. Informações sobre rede credenciada, benefícios e orientações de saúde.",
};

interface NoticiaItem {
  id: string;
  titulo: string;
  resumo: string;
  data: string;
  fonte: string;
  fonteUrl: string;
  categoria: string;
  categoriaColor: string;
}

const noticias: NoticiaItem[] = [
  {
    id: "chegada-viver-saude-movimenta-planos-rn",
    titulo: "Chegada do Viver Saúde movimenta segmento de planos no estado",
    resumo:
      "O setor de saúde complementar do Rio Grande do Norte recebe novo operador com o lançamento do Viver Saúde em Natal. A empresa propõe um modelo focado em atenção integral e prevenção, com clínicas próprias, rede credenciada e gestão administrativa sediada na capital. Segundo a CEO Dra. Eva Rodrigues, a operadora integra prevenção, acolhimento e qualidade em seu modelo operacional, gerando impacto econômico direto na cadeia produtiva local.",
    data: "10 de novembro de 2025",
    fonte: "Tribuna do Norte",
    fonteUrl:
      "https://tribunadonorte.com.br/economia/chegada-do-viver-saude-movimenta-segmento-de-planos-no-estado/",
    categoria: "Na mídia",
    categoriaColor: "bg-accent/10 text-accent-dark",
  },
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

      {/* News list */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {noticias.map((noticia, idx) => (
              <ScrollAnimationWrapper key={noticia.id} delay={idx * 0.1}>
                <article className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${noticia.categoriaColor}`}
                      >
                        {noticia.categoria}
                      </span>
                      <time className="text-sm text-muted">{noticia.data}</time>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                      {noticia.titulo}
                    </h2>
                    <p className="text-muted leading-relaxed mb-5">{noticia.resumo}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <span className="text-sm text-muted">
                        Fonte:{" "}
                        <a
                          href={noticia.fonteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          {noticia.fonte}
                        </a>
                      </span>
                      <a
                        href={noticia.fonteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                      >
                        Ler matéria completa
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
