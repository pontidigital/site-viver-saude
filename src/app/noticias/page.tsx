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
    id: "tribuna-norte-blog-thiago-cavalcanti",
    titulo: "Viver Saúde",
    resumo:
      "O colunista Thiago Cavalcanti destaca a chegada de um novo plano de saúde em Natal com proposta focada em atendimento integrado e medicina preventiva. Sob liderança comercial de Idris Saldanha, o Viver Saúde contará com infraestrutura própria e rede credenciada de qualidade. A operação será sediada em imóvel histórico no cruzamento das ruas Maxaraguape e Campos Sales, na capital potiguar.",
    data: "11 de novembro de 2025",
    fonte: "Tribuna do Norte — Blog Thiago Cavalcanti",
    fonteUrl: "https://blog.tribunadonorte.com.br/thiagocavalcanti/viver-saude/",
    categoria: "Na mídia",
    categoriaColor: "bg-accent/10 text-accent-dark",
  },
  {
    id: "agorarn-medicina-integrativa",
    titulo: "Viver Saúde chega a Natal com proposta inovadora em medicina integrativa",
    resumo:
      "Sob liderança da CEO Dra. Eva Rodrigues, o Viver Saúde estreia em Natal oferecendo planos adaptáveis, programas de atenção à saúde e acompanhamento contínuo, com clínicas próprias e rede credenciada. A linha de produtos é composta por quatro categorias inspiradas em pedras preciosas — Diamante, Safira, Turmalina e Esmeralda — cada uma com diferentes níveis de cobertura. A proposta da operadora se ancora em medicina integrativa e atenção integral, voltada à prevenção e à qualidade de vida em todas as fases, do recém-nascido ao idoso.",
    data: "11 de novembro de 2025",
    fonte: "Agora RN",
    fonteUrl:
      "https://agorarn.com.br/ultimas/viver-saude-chega-a-natal-proposta-inovadora-medicina-integrativa/",
    categoria: "Na mídia",
    categoriaColor: "bg-accent/10 text-accent-dark",
  },
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
  {
    id: "novonoticias-cuidado-integrado-medicina-preventiva",
    titulo:
      "Viver Saúde chega ao RN com proposta inovadora de cuidado integrado e medicina preventiva",
    resumo:
      "Uma operadora de saúde inédita é lançada em Natal com modelo focado em prevenção e atenção integral. Sob liderança da CEO Dra. Eva Rodrigues, o Viver Saúde integra medicina integrativa, atendimento multiprofissional e tecnologia para tornar o cuidado acessível. A empresa disponibilizará clínicas próprias nas zonas Norte, Sul e Central, com serviços que incluem psicologia, nutrição, yoga e programas voltados ao envelhecimento saudável.",
    data: "10 de novembro de 2025",
    fonte: "NOVO Notícias",
    fonteUrl:
      "https://www.novonoticias.com.br/viver-saude-chega-ao-rn-com-proposta-inovadora-de-cuidado-integrado-e-medicina-preventiva/",
    categoria: "Na mídia",
    categoriaColor: "bg-accent/10 text-accent-dark",
  },
  {
    id: "blogdobg-cuidado-integrado-medicina-preventiva",
    titulo:
      "Viver Saúde chega ao Rio Grande do Norte com proposta inovadora de cuidado integrado e medicina preventiva",
    resumo:
      "O Viver Saúde é lançado em Natal com foco em medicina integrativa e prevenção, contando com clínicas próprias estrategicamente distribuídas pela capital potiguar. A operadora oferece atendimento multiprofissional que integra psicologia, nutrição, yoga e pilates. Destaque para o programa especial voltado ao cuidado do idoso, com atividades regenerativas e inclusivas que visam à longevidade ativa.",
    data: "10 de novembro de 2025",
    fonte: "Blog do BG",
    fonteUrl:
      "https://www.blogdobg.com.br/viver-saude-chega-ao-rio-grande-do-norte-com-proposta-inovadora-de-cuidado-integrado-e-medicina-preventiva/",
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
